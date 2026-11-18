const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.resolve(__dirname, '..', 'public');
const imgDir = path.join(publicDir, 'images');

async function generateCleanHeroBackgrounds() {
  console.log('--- Generating Clean Fluid Hero Backgrounds (without baked-in arch/podium) ---');

  // 1. Desktop hero-bg.webp (2400x1350 for 2x crispness on high DPI)
  const desktopSvg = `
    <svg width="2400" height="1350" viewBox="0 0 2400 1350" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="2400" y2="1350" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#FDF6EC" />
          <stop offset="40%" stop-color="#FAF1E3" />
          <stop offset="75%" stop-color="#E8EFE3" />
          <stop offset="100%" stop-color="#DBE7D5" />
        </linearGradient>
        <radialGradient id="sunbeam" cx="1700" cy="450" r="950" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#FFEBB8" stop-opacity="0.4" />
          <stop offset="50%" stop-color="#E5C07B" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#FDF6EC" stop-opacity="0" />
        </radialGradient>
      </defs>

      <!-- Ambient Gradient Base -->
      <rect width="2400" height="1350" fill="url(#bgGrad)" />
      <circle cx="1700" cy="450" r="950" fill="url(#sunbeam)" />

      <!-- Soft Ambient Glow Circles -->
      <circle cx="1450" cy="480" r="24" fill="#FFEBB8" fill-opacity="0.5" />
      <circle cx="1950" cy="520" r="32" fill="#E5C07B" fill-opacity="0.3" />
      <circle cx="1850" cy="380" r="18" fill="#FFEBB8" fill-opacity="0.6" />
      <circle cx="1580" cy="650" r="16" fill="#C9973A" fill-opacity="0.3" />
    </svg>
  `;

  await sharp(Buffer.from(desktopSvg))
    .webp({ quality: 90 })
    .toFile(path.join(imgDir, 'hero-bg.webp'));
  console.log('✓ Created 2400x1350 public/images/hero-bg.webp');

  // 2. Mobile hero-bg-mobile.webp (1200x1500)
  const mobileSvg = `
    <svg width="1200" height="1500" viewBox="0 0 1200 1500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="mobGrad" x1="0" y1="0" x2="1200" y2="1500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#FDF6EC" />
          <stop offset="35%" stop-color="#FAF1E3" />
          <stop offset="70%" stop-color="#E8EFE3" />
          <stop offset="100%" stop-color="#DCE8D7" />
        </linearGradient>
        <radialGradient id="mobSun" cx="600" cy="1000" r="600" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#FFEBB8" stop-opacity="0.35" />
          <stop offset="70%" stop-color="#FDF6EC" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="1500" fill="url(#mobGrad)" />
      <circle cx="600" cy="1000" r="600" fill="url(#mobSun)" />
    </svg>
  `;

  await sharp(Buffer.from(mobileSvg))
    .webp({ quality: 88 })
    .toFile(path.join(imgDir, 'hero-bg-mobile.webp'));
  console.log('✓ Created 1200x1500 public/images/hero-bg-mobile.webp');
}

generateCleanHeroBackgrounds();
