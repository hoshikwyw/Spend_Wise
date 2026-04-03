const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const iconsDir = path.join(__dirname, "..", "public", "icons");

async function generate() {
  // Generate 192x192 PNG
  await sharp(path.join(iconsDir, "icon-192.svg"))
    .resize(192, 192)
    .png()
    .toFile(path.join(iconsDir, "icon-192.png"));
  console.log("Created icon-192.png");

  // Generate 512x512 PNG
  await sharp(path.join(iconsDir, "icon-512.svg"))
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, "icon-512.png"));
  console.log("Created icon-512.png");

  // Generate apple touch icon (180x180)
  await sharp(path.join(iconsDir, "icon-192.svg"))
    .resize(180, 180)
    .png()
    .toFile(path.join(iconsDir, "apple-touch-icon.png"));
  console.log("Created apple-touch-icon.png");

  // Generate favicon (32x32)
  await sharp(path.join(iconsDir, "favicon.svg"))
    .resize(32, 32)
    .png()
    .toFile(path.join(iconsDir, "favicon.png"));
  console.log("Created favicon.png");

  console.log("All icons generated!");
}

generate().catch(console.error);
