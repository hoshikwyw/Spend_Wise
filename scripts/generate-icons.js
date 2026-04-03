// Run: node scripts/generate-icons.js
// Generates PNG icons from SVG for PWA manifest
// Requires no dependencies — uses inline SVG to canvas via a simple approach

const fs = require("fs");
const { createCanvas } = (() => {
  try {
    return require("canvas");
  } catch {
    return { createCanvas: null };
  }
})();

const SVG_192 = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7C3AED"/>
      <stop offset="100%" stop-color="#8B5CF6"/>
    </linearGradient>
  </defs>
  <rect width="192" height="192" rx="42" fill="url(#g)"/>
  <text x="96" y="108" text-anchor="middle" font-size="80" font-family="Arial" fill="white" dominant-baseline="middle">💰</text>
</svg>`;

const SVG_512 = SVG_192.replace(/192/g, "512").replace('rx="42"', 'rx="112"').replace('x="96" y="108"', 'x="256" y="280"').replace('font-size="80"', 'font-size="200"');

// Write SVG versions as fallback
fs.writeFileSync("public/icons/icon-192.svg", SVG_192);
fs.writeFileSync("public/icons/icon-512.svg", SVG_512);

console.log("SVG icons generated at public/icons/");
console.log("For PNG icons, use an online SVG-to-PNG converter or install the 'canvas' npm package.");
console.log("You can also use https://realfavicongenerator.net to generate all icon sizes.");
