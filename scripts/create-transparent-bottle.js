const sharp = require('sharp');
const fs = require('fs');

async function extractBottle() {
  const inputPath = 'public/images/neem-oil.png';
  const outputPath = 'public/images/bottle-neem.png';

  const { data, info } = await sharp(inputPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const rgba = Buffer.alloc(width * height * 4);

  // Background sampling from corners:
  // Top-left, top-right, bottom-left, bottom-right corners
  const bgSamples = [
    [data[0], data[1], data[2]],
    [data[(width - 1) * 3], data[(width - 1) * 3 + 1], data[(width - 1) * 3 + 2]],
    [data[(height - 1) * width * 3], data[(height - 1) * width * 3 + 1], data[(height - 1) * width * 3 + 2]],
    [data[((height - 1) * width + width - 1) * 3], data[((height - 1) * width + width - 1) * 3 + 1], data[((height - 1) * width + width - 1) * 3 + 2]],
  ];
  console.log('Corner bg samples:', bgSamples);

  // Calculate average background color
  const avgBg = [
    Math.round(bgSamples.reduce((s, c) => s + c[0], 0) / bgSamples.length),
    Math.round(bgSamples.reduce((s, c) => s + c[1], 0) / bgSamples.length),
    Math.round(bgSamples.reduce((s, c) => s + c[2], 0) / bgSamples.length),
  ];
  console.log('Average BG:', avgBg);

  // Breadth-first flood fill from boundaries to identify all exterior background pixels
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  function colorDiff(r, g, b, targetR, targetG, targetB) {
    return Math.sqrt(
      (r - targetR) ** 2 +
      (g - targetG) ** 2 +
      (b - targetB) ** 2
    );
  }

  // Enqueue borders
  for (let x = 0; x < width; x++) {
    queue[tail++] = x; // y = 0
    visited[x] = 1;
    const btmIdx = (height - 1) * width + x;
    queue[tail++] = btmIdx;
    visited[btmIdx] = 1;
  }
  for (let y = 1; y < height - 1; y++) {
    const leftIdx = y * width;
    queue[tail++] = leftIdx;
    visited[leftIdx] = 1;
    const rightIdx = y * width + width - 1;
    queue[tail++] = rightIdx;
    visited[rightIdx] = 1;
  }

  // Flood fill background
  const threshold = 52; // Threshold for background similarity
  while (head < tail) {
    const idx = queue[head++];
    const x = idx % width;
    const y = Math.floor(idx / width);

    const neighbors = [
      x > 0 ? idx - 1 : -1,
      x < width - 1 ? idx + 1 : -1,
      y > 0 ? idx - width : -1,
      y < height - 1 ? idx + width : -1,
    ];

    for (const n of neighbors) {
      if (n !== -1 && !visited[n]) {
        const r = data[n * 3];
        const g = data[n * 3 + 1];
        const b = data[n * 3 + 2];
        const diff = colorDiff(r, g, b, avgBg[0], avgBg[1], avgBg[2]);
        if (diff < threshold) {
          visited[n] = 1;
          queue[tail++] = n;
        }
      }
    }
  }

  // Create RGBA image with smooth antialiasing mask
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];

    rgba[i * 4] = r;
    rgba[i * 4 + 1] = g;
    rgba[i * 4 + 2] = b;

    if (visited[i]) {
      rgba[i * 4 + 3] = 0; // Fully transparent
    } else {
      // Check distance to nearest transparent pixel for soft edge
      rgba[i * 4 + 3] = 255;
    }
  }

  // Feather edges by 1px
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      if (rgba[idx * 4 + 3] === 255) {
        // If adjacent to a 0-alpha pixel, make it semi-transparent
        if (
          rgba[(idx - 1) * 4 + 3] === 0 ||
          rgba[(idx + 1) * 4 + 3] === 0 ||
          rgba[(idx - width) * 4 + 3] === 0 ||
          rgba[(idx + width) * 4 + 3] === 0
        ) {
          rgba[idx * 4 + 3] = 160;
        }
      }
    }
  }

  await sharp(rgba, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log('Created transparent bottle:', outputPath);
}

extractBottle().catch(console.error);
