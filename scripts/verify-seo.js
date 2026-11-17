const http = require('http');

const routes = ['/', '/product', '/about', '/contact', '/privacy', '/terms'];

async function inspectHtml() {
  for (const r of routes) {
    await new Promise((resolve) => {
      http.get('http://127.0.0.1:3001' + r, (res) => {
        let html = '';
        res.on('data', (chunk) => (html += chunk));
        res.on('end', () => {
          const titleMatch = html.match(/<title>([^<]+)<\/title>/);
          const descMatch = html.match(/<meta name="description" content="([^"]+)"/);
          const ogImgMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
          const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
          console.log('\n=== Route:', r, '===');
          console.log('Status:', res.statusCode);
          console.log('Title (' + (titleMatch ? titleMatch[1].length : 0) + ' chars):', titleMatch ? titleMatch[1] : 'NONE');
          console.log('Desc (' + (descMatch ? descMatch[1].length : 0) + ' chars):', descMatch ? descMatch[1] : 'NONE');
          console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NONE');
          console.log('OG Image:', ogImgMatch ? ogImgMatch[1] : 'NONE');
          resolve();
        });
      });
    });
  }
}

inspectHtml();
