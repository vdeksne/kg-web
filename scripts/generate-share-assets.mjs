/**
 * Optional: rasterize public/images/kg.svg → static PNGs (e.g. for email or CDN).
 * Social previews use dynamic src/app/opengraph-image.tsx at runtime.
 * Run: npm install && npm run generate:share
 */
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const svgPath = join(root, "public/images/kg.svg");
const svg = readFileSync(svgPath);

const OG_W = 1200;
const OG_H = 630;
const LOGO = 420;

const logoPng = await sharp(svg)
  .resize(LOGO, LOGO, {
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  })
  .png()
  .toBuffer();

const left = Math.round((OG_W - LOGO) / 2);
const top = Math.round((OG_H - LOGO) / 2);

await sharp({
  create: {
    width: OG_W,
    height: OG_H,
    channels: 3,
    background: "#ffffff",
  },
})
  .composite([{ input: logoPng, left, top }])
  .png()
  .toFile(join(root, "public/images/opengraph.png"));

console.log("Wrote public/images/opengraph.png");
