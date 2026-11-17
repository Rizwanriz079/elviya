const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Transparent isolated SVG to PNG: leaf-1, leaf-2, leaf-3
const leaf1Svg = `
<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leafGrad1" x1="40" y1="20" x2="200" y2="220" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#4C8C4A" />
      <stop offset="60%" stop-color="#2F5D3A" />
      <stop offset="100%" stop-color="#16301F" />
    </linearGradient>
  </defs>
  <path d="M120 20 C60 50 40 120 50 180 C60 205 90 220 120 220 C150 220 180 205 190 180 C200 120 180 50 120 20 Z" fill="url(#leafGrad1)" />
  <path d="M120 30 C120 90 120 150 120 215" stroke="#E5C07B" stroke-width="2.5" stroke-linecap="round" />
  <path d="M120 70 Q95 90 70 95" stroke="#E5C07B" stroke-width="1.5" stroke-linecap="round" opacity="0.6" />
  <path d="M120 100 Q145 120 170 125" stroke="#E5C07B" stroke-width="1.5" stroke-linecap="round" opacity="0.6" />
  <path d="M120 130 Q95 150 75 155" stroke="#E5C07B" stroke-width="1.5" stroke-linecap="round" opacity="0.6" />
  <path d="M120 160 Q145 175 165 180" stroke="#E5C07B" stroke-width="1.5" stroke-linecap="round" opacity="0.6" />
</svg>
`;

const leaf2Svg = `
<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leafGrad2" x1="20" y1="40" x2="220" y2="200" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#67A865" />
      <stop offset="50%" stop-color="#3D7549" />
      <stop offset="100%" stop-color="#1E3F27" />
    </linearGradient>
  </defs>
  <path d="M30 60 C80 30 160 50 210 120 C170 180 90 180 40 130 C20 100 20 80 30 60 Z" fill="url(#leafGrad2)" />
  <path d="M35 65 Q115 110 205 120" stroke="#C9973A" stroke-width="2" stroke-linecap="round" />
  <path d="M70 85 Q90 60 110 50" stroke="#C9973A" stroke-width="1.2" stroke-linecap="round" opacity="0.5" />
  <path d="M110 105 Q135 75 155 70" stroke="#C9973A" stroke-width="1.2" stroke-linecap="round" opacity="0.5" />
  <path d="M110 105 Q100 135 90 150" stroke="#C9973A" stroke-width="1.2" stroke-linecap="round" opacity="0.5" />
</svg>
`;

const leaf3Svg = `
<svg width="240" height="240" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="leafGrad3" x1="60" y1="20" x2="180" y2="220" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#80BE7E" />
      <stop offset="60%" stop-color="#4C8C4A" />
      <stop offset="100%" stop-color="#2F5D3A" />
    </linearGradient>
  </defs>
  <path d="M120 15 C80 50 65 110 75 175 C85 205 105 225 120 225 C135 225 155 205 165 175 C175 110 160 50 120 15 Z" fill="url(#leafGrad3)" />
  <path d="M120 25 V215" stroke="#E5C07B" stroke-width="2" stroke-linecap="round" />
</svg>
`;

// 2. Transparent isolated oil drops: drop-1, drop-2, drop-3
const drop1Svg = `
<svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dropGrad1" x1="20" y1="10" x2="100" y2="140" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFEBB8" />
      <stop offset="35%" stop-color="#E5C07B" />
      <stop offset="70%" stop-color="#C9973A" />
      <stop offset="100%" stop-color="#8F6218" />
    </linearGradient>
    <radialGradient id="dropGlow" cx="45" cy="45" r="30" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.8" />
      <stop offset="60%" stop-color="#FFEBB8" stop-opacity="0.2" />
      <stop offset="100%" stop-color="#FFEBB8" stop-opacity="0" />
    </radialGradient>
  </defs>
  <path d="M60 10 C60 10 20 60 20 95 C20 125 38 145 60 145 C82 145 100 125 100 95 C100 60 60 10 60 10 Z" fill="url(#dropGrad1)" />
  <ellipse cx="48" cy="70" rx="14" ry="22" fill="url(#dropGlow)" />
  <circle cx="44" cy="55" r="4" fill="#FFFFFF" opacity="0.9" />
</svg>
`;

const drop2Svg = `
<svg width="90" height="110" viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dropGrad2" x1="15" y1="10" x2="75" y2="105" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFF2D6" />
      <stop offset="40%" stop-color="#E5C07B" />
      <stop offset="85%" stop-color="#B88528" />
    </linearGradient>
  </defs>
  <path d="M45 10 C45 10 15 48 15 75 C15 96 28 105 45 105 C62 105 75 96 75 75 C75 48 45 10 45 10 Z" fill="url(#dropGrad2)" />
  <ellipse cx="36" cy="55" rx="8" ry="14" fill="#FFFFFF" opacity="0.6" />
</svg>
`;

const drop3Svg = `
<svg width="70" height="90" viewBox="0 0 70 90" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dropGrad3" x1="10" y1="5" x2="60" y2="85" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFF6E0" />
      <stop offset="50%" stop-color="#C9973A" />
      <stop offset="100%" stop-color="#734C0A" />
    </linearGradient>
  </defs>
  <path d="M35 8 C35 8 12 38 12 60 C12 76 22 85 35 85 C48 85 58 76 58 60 C58 38 35 8 35 8 Z" fill="url(#dropGrad3)" />
  <circle cx="28" cy="45" r="5" fill="#FFFFFF" opacity="0.75" />
</svg>
`;

// 3. Step SVGs (step-1..4.svg) as single-weight forest-green line art with small gold accent
const step1Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#2F5D3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- Fresh neem branch -->
  <path d="M20 85 Q50 60 80 20" stroke="#2F5D3A" stroke-width="2.5" />
  <path d="M40 70 Q30 55 22 55 Q35 68 40 70 Z" fill="#2F5D3A" fill-opacity="0.12" />
  <path d="M50 55 Q65 42 75 45 Q62 58 50 55 Z" fill="#2F5D3A" fill-opacity="0.12" />
  <path d="M60 40 Q45 28 38 30 Q52 42 60 40 Z" fill="#2F5D3A" fill-opacity="0.12" />
  <path d="M72 28 Q85 18 90 22 Q82 32 72 28 Z" fill="#2F5D3A" fill-opacity="0.12" />
  <!-- Small gold accent dew drop -->
  <circle cx="78" cy="24" r="3.5" fill="#C9973A" stroke="#C9973A" stroke-width="1" />
</svg>
`;

const step2Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#2F5D3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- Washing leaves in a ceramic bowl -->
  <path d="M15 48 C15 78 85 78 85 48 Z" stroke="#2F5D3A" stroke-width="2.5" />
  <path d="M20 48 Q50 44 80 48" stroke="#2F5D3A" stroke-dasharray="3 3" />
  <path d="M35 44 C35 32 45 25 55 35 Q45 42 35 44 Z" fill="#2F5D3A" fill-opacity="0.12" />
  <path d="M48 40 C52 26 66 28 64 38 Z" fill="#2F5D3A" fill-opacity="0.12" />
  <!-- Water ripples -->
  <path d="M25 58 Q50 64 75 58" stroke="#4C8C4A" stroke-width="1.5" />
  <!-- Small gold water sparkle -->
  <circle cx="68" cy="30" r="3" fill="#C9973A" stroke="#C9973A" />
</svg>
`;

const step3Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#2F5D3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- Pouring virgin coconut oil into pot with neem -->
  <path d="M22 65 C22 85 78 85 78 65 L72 45 L28 45 Z" stroke="#2F5D3A" stroke-width="2.5" />
  <path d="M25 45 Q50 40 75 45" />
  <path d="M70 20 L85 28 L78 35" stroke="#2F5D3A" stroke-width="2" />
  <!-- Golden oil stream -->
  <path d="M74 32 C65 40 52 48 50 62" stroke="#C9973A" stroke-width="2.5" stroke-linecap="round" />
  <circle cx="50" cy="66" r="3" fill="#C9973A" />
</svg>
`;

const step4Svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" stroke="#2F5D3A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <!-- Hand holding small glass bottle -->
  <rect x="42" y="38" width="22" height="42" rx="4" stroke="#2F5D3A" stroke-width="2" />
  <rect x="46" y="28" width="14" height="10" rx="1.5" stroke="#2F5D3A" stroke-width="1.8" />
  <line x1="42" y1="52" x2="64" y2="52" stroke="#4C8C4A" stroke-width="1.2" />
  <line x1="42" y1="64" x2="64" y2="64" stroke="#4C8C4A" stroke-width="1.2" />
  <!-- Hand silhouette contour -->
  <path d="M20 62 C26 55 38 52 42 56 L42 74 C36 78 26 76 20 68 Z" stroke="#2F5D3A" fill="#2F5D3A" fill-opacity="0.08" />
  <!-- Small gold seal accent -->
  <circle cx="53" cy="58" r="3.5" fill="#C9973A" stroke="#C9973A" />
</svg>
`;

// 4. Background WebP generators:
// 1. hero-bg.webp (16:9 1920x1080)
const heroBgSvg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1920" y2="1080" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FDF6EC" />
      <stop offset="45%" stop-color="#F9EEDD" />
      <stop offset="75%" stop-color="#E8EFE3" />
      <stop offset="100%" stop-color="#D7E4D0" />
    </linearGradient>
    <radialGradient id="sunbeam" cx="1380" cy="350" r="800" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFEBB8" stop-opacity="0.45" />
      <stop offset="50%" stop-color="#E5C07B" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#FDF6EC" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="podiumGrad" cx="1380" cy="740" r="320" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#E2D4BE" />
      <stop offset="70%" stop-color="#CABAA0" />
      <stop offset="100%" stop-color="#A8967C" />
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#bgGrad)" />
  <circle cx="1380" cy="350" r="800" fill="url(#sunbeam)" />

  <!-- Botanical Arch Window Frame on Right -->
  <path d="M 1120 860 L 1120 480 A 260 260 0 0 1 1640 480 L 1640 860 Z" fill="#E8EFE3" fill-opacity="0.45" stroke="#C9973A" stroke-width="3" stroke-opacity="0.4" />
  <path d="M 1150 860 L 1150 490 A 230 230 0 0 1 1610 490 L 1610 860 Z" fill="#FDF6EC" fill-opacity="0.6" />

  <!-- Natural Wooden Slice Podium -->
  <ellipse cx="1380" cy="850" rx="260" ry="60" fill="#2B1D0E" fill-opacity="0.1" />
  <ellipse cx="1380" cy="840" rx="240" ry="48" fill="url(#podiumGrad)" stroke="#C9973A" stroke-width="2" stroke-opacity="0.5" />
  <ellipse cx="1380" cy="838" rx="220" ry="42" fill="#EADCC7" fill-opacity="0.6" />

  <!-- Floating Warm Bokeh -->
  <circle cx="1180" cy="380" r="18" fill="#FFEBB8" fill-opacity="0.6" />
  <circle cx="1560" cy="420" r="28" fill="#E5C07B" fill-opacity="0.4" />
  <circle cx="1480" cy="300" r="14" fill="#FFEBB8" fill-opacity="0.7" />
  <circle cx="1260" cy="520" r="12" fill="#C9973A" fill-opacity="0.4" />
</svg>
`;

// 2. hero-bg-mobile.webp (4:5 1080x1350)
const heroBgMobileSvg = `
<svg width="1080" height="1350" viewBox="0 0 1080 1350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mobGrad" x1="0" y1="0" x2="1080" y2="1350" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FDF6EC" />
      <stop offset="40%" stop-color="#F7EEE0" />
      <stop offset="70%" stop-color="#E8EFE3" />
      <stop offset="100%" stop-color="#DCE8D7" />
    </linearGradient>
    <radialGradient id="mobSun" cx="540" cy="950" r="500" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFEBB8" stop-opacity="0.4" />
      <stop offset="70%" stop-color="#FDF6EC" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1080" height="1350" fill="url(#mobGrad)" />
  <circle cx="540" cy="950" r="500" fill="url(#mobSun)" />

  <!-- Arch Frame Center Lower -->
  <path d="M 240 1150 L 240 780 A 300 300 0 0 1 840 780 L 840 1150 Z" fill="#E8EFE3" fill-opacity="0.4" stroke="#C9973A" stroke-width="2" stroke-opacity="0.4" />

  <!-- Podium Center -->
  <ellipse cx="540" cy="1150" rx="300" ry="70" fill="#2B1D0E" fill-opacity="0.08" />
  <ellipse cx="540" cy="1140" rx="270" ry="55" fill="#DFCBB2" stroke="#C9973A" stroke-width="2" stroke-opacity="0.5" />
</svg>
`;

// 3. bg-forest.webp (Dark moody macro leaves + gold bokeh)
const bgForestSvg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="forestDarkGrad" x1="0" y1="0" x2="1920" y2="1080" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#16301F" />
      <stop offset="45%" stop-color="#1E3F27" />
      <stop offset="85%" stop-color="#122518" />
      <stop offset="100%" stop-color="#0E1E13" />
    </linearGradient>
    <radialGradient id="forestGlow" cx="960" cy="540" r="600" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2F5D3A" stop-opacity="0.5" />
      <stop offset="50%" stop-color="#C9973A" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#16301F" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#forestDarkGrad)" />
  <circle cx="960" cy="540" r="600" fill="url(#forestGlow)" />
  <!-- Golden Bokeh Orbs -->
  <circle cx="280" cy="220" r="45" fill="#E5C07B" fill-opacity="0.12" />
  <circle cx="1650" cy="310" r="60" fill="#C9973A" fill-opacity="0.1" />
  <circle cx="340" cy="850" r="50" fill="#FFEBB8" fill-opacity="0.08" />
  <circle cx="1520" cy="800" r="75" fill="#E5C07B" fill-opacity="0.09" />
</svg>
`;

// 4. bg-cream-leaves.webp (Cream paper + botanical edge silhouettes)
const bgCreamLeavesSvg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="1080" fill="#FDF6EC" />
  <!-- Top Right Neem Branch Silhouettes -->
  <path d="M 1600 0 Q 1750 150 1920 180" stroke="#4C8C4A" stroke-width="2" stroke-opacity="0.2" fill="none" />
  <ellipse cx="1780" cy="90" rx="35" ry="12" transform="rotate(35 1780 90)" fill="#2F5D3A" fill-opacity="0.06" />
  <ellipse cx="1840" cy="130" rx="40" ry="14" transform="rotate(20 1840 130)" fill="#2F5D3A" fill-opacity="0.06" />
  <!-- Bottom Left Neem Branch Silhouettes -->
  <path d="M 0 920 Q 180 940 320 1080" stroke="#4C8C4A" stroke-width="2" stroke-opacity="0.2" fill="none" />
  <ellipse cx="120" cy="980" rx="35" ry="12" transform="rotate(-30 120 980)" fill="#2F5D3A" fill-opacity="0.06" />
  <ellipse cx="210" cy="1020" rx="40" ry="14" transform="rotate(-45 210 1020)" fill="#2F5D3A" fill-opacity="0.06" />
</svg>
`;

// 5. bg-sage.webp (Soft sage gradient)
const bgSageSvg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sageGrad" x1="0" y1="0" x2="1920" y2="1080" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#E8EFE3" />
      <stop offset="50%" stop-color="#DFE9DA" />
      <stop offset="100%" stop-color="#D5E2D0" />
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#sageGrad)" />
</svg>
`;

// 6. almond-scene.webp (4:5 1080x1350 warm beige podium scene)
const almondSceneSvg = `
<svg width="1080" height="1350" viewBox="0 0 1080 1350" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="almondGrad" x1="0" y1="0" x2="1080" y2="1350" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FAF1E6" />
      <stop offset="50%" stop-color="#F2E4D2" />
      <stop offset="100%" stop-color="#E5D1BA" />
    </linearGradient>
  </defs>
  <rect width="1080" height="1350" fill="url(#almondGrad)" />
  <!-- Warm stone podium -->
  <ellipse cx="540" cy="1020" rx="280" ry="65" fill="#2B1D0E" fill-opacity="0.08" />
  <ellipse cx="540" cy="1010" rx="250" ry="50" fill="#E8D5C0" stroke="#C9973A" stroke-width="2" stroke-opacity="0.4" />
</svg>
`;

// 7. about-hero.webp
const aboutHeroSvg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="aboutGrad" x1="0" y1="0" x2="1920" y2="1080" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FDF6EC" />
      <stop offset="50%" stop-color="#F7EEE0" />
      <stop offset="100%" stop-color="#E8EFE3" />
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#aboutGrad)" />
  <circle cx="1400" cy="540" r="420" fill="#E0B35C" fill-opacity="0.12" />
</svg>
`;

// 8. contact-bg.webp
const contactBgSvg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1920" height="1080" fill="#FDF6EC" />
  <circle cx="100" cy="100" r="300" fill="#E8EFE3" fill-opacity="0.8" />
  <circle cx="1820" cy="100" r="320" fill="#E8EFE3" fill-opacity="0.8" />
  <circle cx="100" cy="980" r="280" fill="#E8EFE3" fill-opacity="0.7" />
  <circle cx="1820" cy="980" r="300" fill="#E8EFE3" fill-opacity="0.7" />
</svg>
`;

// 9. cta-bg.webp (Golden hour bokeh)
const ctaBgSvg = `
<svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ctaGrad" x1="0" y1="0" x2="1920" y2="1080" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#16301F" />
      <stop offset="50%" stop-color="#1E3F27" />
      <stop offset="100%" stop-color="#122518" />
    </linearGradient>
    <radialGradient id="ctaGoldGlow" cx="960" cy="540" r="700" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#C9973A" stop-opacity="0.35" />
      <stop offset="60%" stop-color="#E5C07B" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#16301F" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#ctaGrad)" />
  <circle cx="960" cy="540" r="700" fill="url(#ctaGoldGlow)" />
  <circle cx="350" cy="300" r="80" fill="#FFEBB8" fill-opacity="0.15" />
  <circle cx="1580" cy="400" r="90" fill="#E5C07B" fill-opacity="0.12" />
</svg>
`;

// 10. og-base.webp (1200x630)
const ogBaseSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ogGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#16301F" />
      <stop offset="60%" stop-color="#1E3F27" />
      <stop offset="100%" stop-color="#0E1E13" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#ogGrad)" />
  <circle cx="900" cy="315" r="300" fill="#C9973A" fill-opacity="0.25" />
</svg>
`;

async function buildAll() {
  // Write SVGs for steps
  fs.writeFileSync(path.join(outDir, 'step-1.svg'), step1Svg.trim());
  fs.writeFileSync(path.join(outDir, 'step-2.svg'), step2Svg.trim());
  fs.writeFileSync(path.join(outDir, 'step-3.svg'), step3Svg.trim());
  fs.writeFileSync(path.join(outDir, 'step-4.svg'), step4Svg.trim());
  console.log('Saved step 1-4 SVGs');

  // Generate transparent PNGs
  await sharp(Buffer.from(leaf1Svg)).png().toFile(path.join(outDir, 'leaf-1.png'));
  await sharp(Buffer.from(leaf2Svg)).png().toFile(path.join(outDir, 'leaf-2.png'));
  await sharp(Buffer.from(leaf3Svg)).png().toFile(path.join(outDir, 'leaf-3.png'));
  console.log('Saved leaf 1-3 PNGs');

  await sharp(Buffer.from(drop1Svg)).png().toFile(path.join(outDir, 'drop-1.png'));
  await sharp(Buffer.from(drop2Svg)).png().toFile(path.join(outDir, 'drop-2.png'));
  await sharp(Buffer.from(drop3Svg)).png().toFile(path.join(outDir, 'drop-3.png'));
  console.log('Saved drop 1-3 PNGs');

  // Generate WebPs
  const webpOptions = { quality: 85, effort: 4 };

  await sharp(Buffer.from(heroBgSvg)).webp(webpOptions).toFile(path.join(outDir, 'hero-bg.webp'));
  await sharp(Buffer.from(heroBgMobileSvg)).webp(webpOptions).toFile(path.join(outDir, 'hero-bg-mobile.webp'));
  await sharp(Buffer.from(bgForestSvg)).webp(webpOptions).toFile(path.join(outDir, 'bg-forest.webp'));
  await sharp(Buffer.from(bgCreamLeavesSvg)).webp(webpOptions).toFile(path.join(outDir, 'bg-cream-leaves.webp'));
  await sharp(Buffer.from(bgSageSvg)).webp(webpOptions).toFile(path.join(outDir, 'bg-sage.webp'));
  await sharp(Buffer.from(almondSceneSvg)).webp(webpOptions).toFile(path.join(outDir, 'almond-scene.webp'));
  await sharp(Buffer.from(aboutHeroSvg)).webp(webpOptions).toFile(path.join(outDir, 'about-hero.webp'));
  await sharp(Buffer.from(contactBgSvg)).webp(webpOptions).toFile(path.join(outDir, 'contact-bg.webp'));
  await sharp(Buffer.from(ctaBgSvg)).webp(webpOptions).toFile(path.join(outDir, 'cta-bg.webp'));
  await sharp(Buffer.from(ogBaseSvg)).webp(webpOptions).toFile(path.join(outDir, 'og-base.webp'));

  console.log('All WebP background assets generated successfully!');
}

buildAll().catch(console.error);
