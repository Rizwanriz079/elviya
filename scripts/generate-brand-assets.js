const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const appDir = path.join(rootDir, 'src', 'app');
const productAppDir = path.join(appDir, 'product');
const leafAlphaPath = path.join(publicDir, 'images', 'leaf-alpha.png');
const bottleNeemPath = path.join(publicDir, 'images', 'bottle-neem.png');

function createIco(pngBuffers, sizes) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(numImages, 4); // count

  let offset = headerSize + dirEntrySize * numImages;
  const dirEntries = [];
  for (let i = 0; i < numImages; i++) {
    const buf = pngBuffers[i];
    const size = sizes[i];
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(buf.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += buf.length;
  }
  return Buffer.concat([header, ...dirEntries, ...pngBuffers]);
}

async function buildIcons() {
  console.log('--- Generating Brand Icons ---');

  // 1. High-res icon.png (512x512)
  // Background: Cream #FDF6EC with gold accent ring and centered leaf
  const iconSvg512 = `
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" rx="112" fill="#FDF6EC"/>
      <circle cx="256" cy="256" r="236" fill="none" stroke="#C9973A" stroke-width="4" stroke-opacity="0.4"/>
      <circle cx="256" cy="256" r="226" fill="none" stroke="#2F5D3A" stroke-width="1.5" stroke-opacity="0.25"/>
    </svg>
  `;
  const leafResized512 = await sharp(leafAlphaPath)
    .resize(340, 222, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const icon512Buffer = await sharp(Buffer.from(iconSvg512))
    .composite([{ input: leafResized512, top: 145, left: 86 }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(appDir, 'icon.png'), icon512Buffer);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), icon512Buffer);
  fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512Buffer);
  console.log('✓ Created src/app/icon.png & public/icon-512.png (512x512)');

  // 2. Apple Touch Icon (180x180)
  // Cream #FDF6EC background, gold border, centered leaf
  const appleSvg180 = `
    <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" fill="#FDF6EC"/>
      <rect x="6" y="6" width="168" height="168" rx="36" fill="none" stroke="#C9973A" stroke-width="2.5" stroke-opacity="0.7"/>
      <circle cx="90" cy="90" r="76" fill="none" stroke="#2F5D3A" stroke-width="1" stroke-opacity="0.2"/>
    </svg>
  `;
  const leafResized180 = await sharp(leafAlphaPath)
    .resize(120, 78, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const appleIcon180 = await sharp(Buffer.from(appleSvg180))
    .composite([{ input: leafResized180, top: 51, left: 30 }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), appleIcon180);
  fs.writeFileSync(path.join(publicDir, 'apple-icon.png'), appleIcon180);
  console.log('✓ Created src/app/apple-icon.png & public/apple-icon.png (180x180)');

  // 3. Android icon-192.png (192x192) - safe zone maskable
  const androidSvg192 = `
    <svg width="192" height="192" viewBox="0 0 192 192" xmlns="http://www.w3.org/2000/svg">
      <rect width="192" height="192" fill="#FDF6EC"/>
      <circle cx="96" cy="96" r="88" fill="none" stroke="#C9973A" stroke-width="2" stroke-opacity="0.5"/>
      <circle cx="96" cy="96" r="76" fill="#F5E8D3" fill-opacity="0.3"/>
    </svg>
  `;
  const leafResized192 = await sharp(leafAlphaPath)
    .resize(118, 77, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const androidIcon192 = await sharp(Buffer.from(androidSvg192))
    .composite([{ input: leafResized192, top: 57, left: 37 }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(publicDir, 'icon-192.png'), androidIcon192);
  console.log('✓ Created public/icon-192.png (192x192)');

  // 4. Multi-size favicon.ico (16x16, 32x32, 48x48)
  const sizes = [16, 32, 48];
  const icoBuffers = [];

  for (const s of sizes) {
    // Subtle cream circular backing so dark and light browser tabs both look crisp
    const bgSvg = `
      <svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${s/2}" cy="${s/2}" r="${s/2 - 0.5}" fill="#FDF6EC"/>
        <circle cx="${s/2}" cy="${s/2}" r="${s/2 - 0.5}" fill="none" stroke="#C9973A" stroke-width="${Math.max(0.5, s/32)}"/>
      </svg>
    `;
    const leafW = Math.round(s * 0.75);
    const leafH = Math.round(leafW * (244 / 374));
    const leafBuf = await sharp(leafAlphaPath)
      .resize(leafW, leafH, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    const top = Math.round((s - leafH) / 2);
    const left = Math.round((s - leafW) / 2);

    const buf = await sharp(Buffer.from(bgSvg))
      .composite([{ input: leafBuf, top, left }])
      .png()
      .toBuffer();
    icoBuffers.push(buf);
  }

  const multiIco = createIco(icoBuffers, sizes);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), multiIco);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), multiIco);
  console.log('✓ Created src/app/favicon.ico & public/favicon.ico (multi-size: 16, 32, 48)');

  // 5. Manifest webmanifest
  const manifest = {
    name: "Elvia Herbals",
    short_name: "Elvia",
    description: "Pure Homemade Herbal Oils from Kerala",
    start_url: "/",
    display: "standalone",
    background_color: "#FDF6EC",
    theme_color: "#2F5D3A",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  };
  fs.writeFileSync(path.join(publicDir, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2));
  fs.writeFileSync(path.join(publicDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('✓ Created public/manifest.webmanifest & manifest.json');
}

async function buildSocialPreviews() {
  console.log('--- Generating Social Share Previews (1200x630) ---');

  // Resize bottle with warm soft drop-shadow
  const bottleBuffer = await sharp(bottleNeemPath)
    .resize(null, 500, { fit: 'inside' })
    .toBuffer();
  const bottleMeta = await sharp(bottleBuffer).metadata();

  // Resize leaf for OG watermark
  const leafOgBuf = await sharp(leafAlphaPath)
    .resize(110, 72, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // 1. Home OpenGraph / Twitter preview (1200x630)
  const homeOgSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="radialGlow" cx="78%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#E5C07B" stop-opacity="0.32" />
          <stop offset="60%" stop-color="#FDF6EC" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#FDF6EC" stop-opacity="1" />
        </radialGradient>
        <pattern id="botanicalGrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1.2" fill="#2F5D3A" fill-opacity="0.08" />
        </pattern>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="#FDF6EC" />
      <rect width="1200" height="630" fill="url(#radialGlow)" />
      <rect width="1200" height="630" fill="url(#botanicalGrid)" />

      <!-- Outer botanical border -->
      <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="#C9973A" stroke-width="2" stroke-opacity="0.45" />
      <rect x="32" y="32" width="1136" height="566" rx="12" fill="none" stroke="#2F5D3A" stroke-width="1" stroke-opacity="0.25" />

      <!-- Left Column Text Content -->
      <!-- Eyebrow Badge -->
      <g transform="translate(70, 75)">
        <rect width="260" height="32" rx="16" fill="#2F5D3A" fill-opacity="0.08" stroke="#2F5D3A" stroke-width="1" stroke-opacity="0.2" />
        <text x="130" y="21" font-family="serif" font-size="11" font-weight="600" letter-spacing="2.5" fill="#2F5D3A" text-anchor="middle">KERALA BOTANICAL HERBAL CARE</text>
      </g>

      <!-- Brand Heading -->
      <text x="70" y="165" font-family="Georgia, 'Playfair Display', serif" font-size="54" font-weight="700" fill="#16301F" letter-spacing="-0.5">Elvia Herbals</text>

      <!-- Tagline -->
      <text x="70" y="215" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="600" fill="#2F5D3A">Pure Homemade Herbal Oils</text>
      <text x="70" y="250" font-family="Georgia, serif" font-style="italic" font-size="20" fill="#C9973A">Made by hand, with love.</text>

      <!-- Description / Features -->
      <g transform="translate(70, 285)">
        <!-- Bullet 1 -->
        <circle cx="10" cy="15" r="4" fill="#C9973A" />
        <text x="24" y="20" font-family="system-ui, sans-serif" font-size="16" font-weight="500" fill="#2B1D0E">Handmade in small batches in Kerala</text>

        <!-- Bullet 2 -->
        <circle cx="10" cy="45" r="4" fill="#C9973A" />
        <text x="24" y="50" font-family="system-ui, sans-serif" font-size="16" font-weight="500" fill="#2B1D0E">Pure virgin coconut oil &amp; fresh neem leaves</text>

        <!-- Bullet 3 -->
        <circle cx="10" cy="75" r="4" fill="#C9973A" />
        <text x="24" y="80" font-family="system-ui, sans-serif" font-size="16" font-weight="500" fill="#2B1D0E">Zero chemicals, zero artificial preservatives</text>

        <!-- Bullet 4 -->
        <circle cx="10" cy="105" r="4" fill="#C9973A" />
        <text x="24" y="110" font-family="system-ui, sans-serif" font-size="16" font-weight="500" fill="#2B1D0E">Pure Neem Oil 100ml — ₹269 | Delivery across India</text>
      </g>

      <!-- WhatsApp Order CTA Pill -->
      <g transform="translate(70, 440)">
        <rect width="360" height="56" rx="28" fill="#25D366" />
        <text x="180" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF" text-anchor="middle">Order on WhatsApp: +91 9207067522</text>
      </g>

      <!-- Footer URL -->
      <text x="70" y="555" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#8C7355" letter-spacing="1">elviaherbals.com  •  @elviaherbals  •  Kerala, India</text>

      <!-- Bottle Podium Glow behind bottle -->
      <ellipse cx="940" cy="510" rx="190" ry="24" fill="#16301F" fill-opacity="0.14" filter="blur(6px)" />
    </svg>
  `;

  const bottleLeft = 940 - Math.round(bottleMeta.width / 2);
  const bottleTop = 505 - bottleMeta.height;

  const homeOgBuffer = await sharp(Buffer.from(homeOgSvg))
    .composite([
      { input: bottleBuffer, top: bottleTop, left: bottleLeft },
      { input: leafOgBuf, top: 62, left: 345 }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(appDir, 'opengraph-image.png'), homeOgBuffer);
  fs.writeFileSync(path.join(appDir, 'twitter-image.png'), homeOgBuffer);
  fs.writeFileSync(path.join(publicDir, 'images', 'og-base.png'), homeOgBuffer);
  console.log('✓ Created src/app/opengraph-image.png & twitter-image.png (1200x630)');

  // 2. Product-specific OpenGraph / Twitter preview (1200x630)
  const productOgSvg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="prodRadialGlow" cx="78%" cy="50%" r="55%">
          <stop offset="0%" stop-color="#E5C07B" stop-opacity="0.38" />
          <stop offset="60%" stop-color="#FDF6EC" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#FDF6EC" stop-opacity="1" />
        </radialGradient>
      </defs>

      <!-- Background -->
      <rect width="1200" height="630" fill="#FDF6EC" />
      <rect width="1200" height="630" fill="url(#prodRadialGlow)" />

      <!-- Border -->
      <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="#C9973A" stroke-width="2" stroke-opacity="0.5" />
      <rect x="32" y="32" width="1136" height="566" rx="12" fill="none" stroke="#2F5D3A" stroke-width="1" stroke-opacity="0.25" />

      <!-- Left Column Text Content -->
      <g transform="translate(70, 75)">
        <rect width="210" height="32" rx="16" fill="#2F5D3A" fill-opacity="0.08" stroke="#2F5D3A" stroke-width="1" stroke-opacity="0.2" />
        <text x="105" y="21" font-family="serif" font-size="11" font-weight="600" letter-spacing="2.5" fill="#2F5D3A" text-anchor="middle">ELVIA HERBALS • KERALA</text>
      </g>

      <!-- Product Title -->
      <text x="70" y="165" font-family="Georgia, 'Playfair Display', serif" font-size="52" font-weight="700" fill="#16301F">Pure Neem Oil</text>
      <text x="70" y="215" font-family="system-ui, sans-serif" font-size="24" font-weight="600" fill="#2F5D3A">100ml Glass Bottle • In Stock</text>

      <!-- Price Box -->
      <g transform="translate(70, 245)">
        <rect width="320" height="64" rx="12" fill="#FFFFFF" stroke="#C9973A" stroke-width="1" stroke-opacity="0.4" />
        <text x="24" y="44" font-family="Georgia, serif" font-size="34" font-weight="700" fill="#16301F">₹269</text>
        <text x="110" y="40" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#6B5E51">Kerala Delivery +₹50</text>
      </g>

      <!-- Ingredients / Benefits -->
      <g transform="translate(70, 340)">
        <text x="0" y="20" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#2B1D0E">Ingredients: Pure Virgin Coconut Oil + Fresh Neem</text>
        <text x="0" y="48" font-family="system-ui, sans-serif" font-size="15" font-weight="400" fill="#4A3F35">Traditionally used for healthy hair, a clean scalp &amp; clear skin.</text>
        <text x="0" y="74" font-family="system-ui, sans-serif" font-size="15" font-weight="400" fill="#4A3F35">100% Pure • Handmade in Small Batches • Zero Chemicals</text>
      </g>

      <!-- WhatsApp Order CTA Pill -->
      <g transform="translate(70, 450)">
        <rect width="380" height="56" rx="28" fill="#25D366" />
        <text x="190" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF" text-anchor="middle">Order on WhatsApp: +91 9207067522</text>
      </g>

      <text x="70" y="555" font-family="system-ui, sans-serif" font-size="14" font-weight="500" fill="#8C7355" letter-spacing="1">elviaherbals.com/product  •  Delivery Across India</text>

      <!-- Bottle Podium Glow -->
      <ellipse cx="940" cy="510" rx="190" ry="24" fill="#16301F" fill-opacity="0.14" filter="blur(6px)" />
    </svg>
  `;

  const productOgBuffer = await sharp(Buffer.from(productOgSvg))
    .composite([
      { input: bottleBuffer, top: bottleTop, left: bottleLeft },
      { input: leafOgBuf, top: 62, left: 295 }
    ])
    .png()
    .toBuffer();

  if (!fs.existsSync(productAppDir)) {
    fs.mkdirSync(productAppDir, { recursive: true });
  }
  fs.writeFileSync(path.join(productAppDir, 'opengraph-image.png'), productOgBuffer);
  fs.writeFileSync(path.join(productAppDir, 'twitter-image.png'), productOgBuffer);
  fs.writeFileSync(path.join(publicDir, 'images', 'neem-oil-og.jpg'), productOgBuffer);
  console.log('✓ Created src/app/product/opengraph-image.png & twitter-image.png (1200x630)');
}

async function main() {
  try {
    await buildIcons();
    await buildSocialPreviews();
    console.log('\n✨ Brand assets and social previews generated successfully!');
  } catch (err) {
    console.error('Error generating brand assets:', err);
    process.exit(1);
  }
}

main();
