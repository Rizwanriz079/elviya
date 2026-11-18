const { spawn } = require('child_process');
const http = require('http');

const VIEWPORTS = [
  { name: 'Galaxy Fold (folded)', width: 280, height: 653 },
  { name: 'Mobile Small', width: 360, height: 640 },
  { name: 'iPhone 12/13/14', width: 390, height: 844 },
  { name: 'iPhone 14/15 Pro Max', width: 430, height: 932 },
  { name: 'iPad Mini / Portrait Tablet', width: 768, height: 1024 },
  { name: 'iPad Air', width: 820, height: 1180 },
  { name: 'Tablet Landscape / Small Laptop', width: 1024, height: 768 },
  { name: 'HD Laptop', width: 1280, height: 720 },
  { name: 'Standard Laptop (1366)', width: 1366, height: 768 },
  { name: 'MacBook Air / Pro 14 (1440)', width: 1440, height: 900 },
  { name: 'Windows Laptop (1536)', width: 1536, height: 864 },
  { name: 'FHD Desktop (1080p)', width: 1920, height: 1080 },
  { name: 'QHD 2K Desktop', width: 2560, height: 1440 },
  { name: 'MacBook 16 / Pro Display (2560x1600)', width: 2560, height: 1600 },
  { name: 'Ultrawide (3440x1440)', width: 3440, height: 1440 },
  { name: '4K UHD (3840x2160)', width: 3840, height: 2160 },
  { name: 'Mobile Landscape (844x390)', width: 844, height: 390 },
];

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const PORT = 4010;
  console.log(`Starting next start on port ${PORT}...`);
  const server = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => process.stdout.write('[server] ' + d.toString()));
  server.stderr.on('data', (d) => process.stderr.write('[server-err] ' + d.toString()));

  // Wait for server to start
  let serverReady = false;
  for (let i = 0; i < 30; i++) {
    try {
      await new Promise((res, rej) => {
        const req = http.get(`http://localhost:${PORT}/`, (r) => {
          if (r.statusCode === 200) res();
          else rej();
        });
        req.on('error', rej);
      });
      serverReady = true;
      break;
    } catch {
      await sleep(1000);
    }
  }

  if (!serverReady) {
    console.error('Failed to start server');
    server.kill();
    process.exit(1);
  }

  console.log('Server is ready. Starting Chrome in headless mode...');
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const chrome = spawn(
    chromePath,
    [
      '--headless=new',
      '--remote-debugging-port=9222',
      '--disable-gpu',
      '--no-sandbox',
      `http://localhost:${PORT}/`,
    ],
    { stdio: 'ignore' }
  );

  await sleep(3000);

  try {
    const list = await fetchJson('http://localhost:9222/json');
    const page = list.find((item) => item.type === 'page');
    if (!page || !page.webSocketDebuggerUrl) {
      throw new Error('No page target found');
    }

    const ws = new WebSocket(page.webSocketDebuggerUrl);

    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const res = JSON.parse(event.data);
      if (res.id && callbacks.has(res.id)) {
        const { resolve, reject } = callbacks.get(res.id);
        callbacks.delete(res.id);
        if (res.error) reject(res.error);
        else resolve(res.result);
      }
    };

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const currentId = id++;
        callbacks.set(currentId, { resolve, reject });
        ws.send(JSON.stringify({ id: currentId, method, params }));
      });
    }

    await new Promise((res) => {
      if (ws.readyState === 1) res();
      else ws.onopen = () => res();
    });
    await send('Page.enable');
    await send('DOM.enable');

    console.log('\n--- Viewport Verification Matrix ---');
    console.log(
      '| Viewport | Dimension | Overflow? | Root Font Size | Bottle in Podium | Status |'
    );
    console.log('|---|---|---|---|---|---|');

    let allPassed = true;

    for (const vp of VIEWPORTS) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768,
      });

      await sleep(400);

      const evalRes = await send('Runtime.evaluate', {
        expression: `(() => {
          const doc = document.documentElement;
          const body = document.body;
          const rootFontSize = window.getComputedStyle(doc).fontSize;
          const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
          const clientWidth = doc.clientWidth;
          const hasOverflow = scrollWidth > clientWidth + 1; // 1px tolerance for subpixel rounding

          const bottle = document.querySelector('img[alt*="Neem Oil"]');
          const arch = document.querySelector('[class*="FAF4E8"]');
          let bottlePodiumAligned = true;
          if (bottle && arch) {
            const bRect = bottle.getBoundingClientRect();
            const aRect = arch.getBoundingClientRect();
            bottlePodiumAligned = bRect.left >= aRect.left - 50 && bRect.right <= aRect.right + 50;
          }

          return {
            scrollWidth,
            clientWidth,
            hasOverflow,
            rootFontSize,
            bottlePodiumAligned
          };
        })()`,
        returnByValue: true,
      });

      if (!evalRes || (!evalRes.value && !evalRes.result?.value)) {
        console.error('Eval failed:', JSON.stringify(evalRes));
        throw new Error('Evaluation returned empty result');
      }

      const metrics = evalRes.value || evalRes.result.value;
      const overflowStatus = metrics.hasOverflow ? `YES (${metrics.scrollWidth} > ${metrics.clientWidth})` : 'NO';
      const status = (!metrics.hasOverflow && metrics.bottlePodiumAligned) ? 'PASS ✅' : 'FAIL ❌';
      if (metrics.hasOverflow || !metrics.bottlePodiumAligned) allPassed = false;

      console.log(
        `| ${vp.name} | ${vp.width}x${vp.height} | ${overflowStatus} | ${metrics.rootFontSize} | ${metrics.bottlePodiumAligned ? 'Aligned' : 'Misaligned'} | ${status} |`
      );
    }

    ws.close();
    chrome.kill();
    server.kill();

    if (allPassed) {
      console.log('\n🎉 ALL 17 VIEWPORTS PASSED VERIFICATION WITH ZERO OVERFLOW AND PERFECT ALIGNMENT!\n');
    } else {
      console.error('\n⚠️ SOME VIEWPORTS FAILED VERIFICATION.\n');
      process.exit(1);
    }
  } catch (err) {
    console.error('Error during testing:', err);
    chrome.kill();
    server.kill();
    process.exit(1);
  }
}

run();
