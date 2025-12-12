const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const logoPath = path.join(publicDir, 'images', 'logo.jpg');

async function createFavicons() {
  try {
    console.log('Creating favicon files from logo.jpg...');

    // Create icon.png (32x32)
    await sharp(logoPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'icon.png'));
    console.log('✅ Created icon.png (32x32)');

    // Create apple-icon.png (180x180)
    await sharp(logoPath)
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(path.join(publicDir, 'apple-icon.png'));
    console.log('✅ Created apple-icon.png (180x180)');

    // Create favicon.ico (32x32) - first create a temp PNG
    const faviconPngPath = path.join(publicDir, 'favicon-temp.png');
    await sharp(logoPath)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(faviconPngPath);

    // For .ico, we'll just use the PNG and rename it
    // Most modern browsers support PNG favicons
    const faviconData = fs.readFileSync(faviconPngPath);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), faviconData);
    fs.unlinkSync(faviconPngPath); // Remove temp file
    console.log('✅ Created favicon.ico (32x32)');

    console.log('\n✨ All favicon files created successfully!');
    console.log('\nFiles created:');
    console.log('  - public/favicon.ico');
    console.log('  - public/icon.png');
    console.log('  - public/apple-icon.png');
    console.log('\n🚀 Your logo will now appear in browser tabs and search results!');

  } catch (error) {
    console.error('❌ Error creating favicons:', error);
    process.exit(1);
  }
}

createFavicons();
