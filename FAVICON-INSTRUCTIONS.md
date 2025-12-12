# Favicon & Logo Setup for Elvia Herbals

## 📌 Purpose
To display your **Elvia Herbals logo** next to the website link in Google search results and browser tabs.

---

## 🖼️ Required Files

You need to create these image files from your logo and place them in the `public` folder:

### 1. **favicon.ico** (Browser tab icon)
- **Location:** `public/favicon.ico`
- **Size:** 32x32 pixels (or 16x16)
- **Format:** .ico file
- **Use:** Shows in browser tabs, bookmarks

### 2. **icon.png** (General icon)
- **Location:** `public/icon.png`
- **Sizes:** 32x32 and 16x16 pixels
- **Format:** PNG with transparent background
- **Use:** Modern browsers

### 3. **apple-icon.png** (iOS/Apple devices)
- **Location:** `public/apple-icon.png`
- **Size:** 180x180 pixels
- **Format:** PNG
- **Use:** When users save your site to iOS home screen

---

## 🎨 How to Create These Files

### Option 1: Online Favicon Generator (Easiest)
1. Go to: https://favicon.io/favicon-converter/
2. Upload your Elvia Herbals logo (square version works best)
3. Download the generated files
4. Copy these files to your `public` folder:
   - `favicon.ico`
   - `favicon-32x32.png` → Rename to `icon.png`
   - `apple-touch-icon.png` → Rename to `apple-icon.png`

### Option 2: Manual Creation
If you have your logo in PNG format:

1. **For favicon.ico:**
   - Resize your logo to 32x32 pixels
   - Convert to .ico format using: https://convertio.co/png-ico/
   - Save as `favicon.ico` in `public` folder

2. **For icon.png:**
   - Resize your logo to 32x32 pixels (keep PNG format)
   - Save as `icon.png` in `public` folder

3. **For apple-icon.png:**
   - Resize your logo to 180x180 pixels
   - Save as `apple-icon.png` in `public` folder

---

## 📁 Final File Structure

After creating the files, your public folder should look like:

```
public/
├── favicon.ico          ← 32x32 .ico file
├── icon.png            ← 32x32 PNG
├── apple-icon.png      ← 180x180 PNG
├── manifest.json       ← Already created ✓
├── robots.txt          ← Already created ✓
└── images/
    ├── logo.jpg        ← Your existing logo
    ├── product-main.jpg
    └── ...
```

---

## ✅ Verification

After uploading these files and deploying:

1. **Browser Tab Test:**
   - Visit www.elviaherbals.com
   - Check if your logo appears in the browser tab

2. **Google Search Test:**
   - After 1-2 weeks of being indexed
   - Search "Elvia Herbals"
   - Your logo should appear next to the website link

---

## 🎯 Logo Tips for Best Results

1. **Square Logo Works Best:**
   - Use a square version of your logo (1:1 ratio)
   - If your logo is rectangular, add padding to make it square

2. **Simple is Better:**
   - Favicon is very small (32x32 pixels)
   - Use a simplified version if your logo has too much detail
   - High contrast works best

3. **Background:**
   - Transparent background is ideal
   - Or use your brand color (#D9A441 gold)

4. **File Size:**
   - Keep files under 100KB each
   - Smaller is faster

---

## 🚀 Quick Action

**If you already have your logo file:**
1. Send it to a developer or use https://favicon.io/favicon-converter/
2. Generate the 3 required files
3. Upload to `public/` folder
4. Redeploy your website
5. Your logo will show up in 24-48 hours!

---

## 📝 Notes

- Favicon setup is now configured in `src/app/layout.tsx` ✅
- All icon paths are set correctly ✅
- You just need to create and upload the actual image files
- After deployment, clear browser cache to see changes immediately

