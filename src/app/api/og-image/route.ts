import { NextResponse } from "next/server";
import sharp from "sharp";
import { readBrandShareAssetBuffer } from "@/lib/brand/share-asset";

export const runtime = "nodejs";

const OG_W = 1200;
const OG_H = 630;
/** Max bounding box for the mark inside the OG canvas (wide assets e.g. signatures use full width). */
const INSET_MAX_W = 920;
const INSET_MAX_H = 500;

/** Open Graph / social preview — raster from `BRAND_SHARE_ASSET` or default `images/kg.svg`. */
export async function GET() {
  try {
    const input = await readBrandShareAssetBuffer();
    const logoPng = await sharp(input)
      .resize(INSET_MAX_W, INSET_MAX_H, {
        fit: "inside",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()
      .toBuffer();

    const meta = await sharp(logoPng).metadata();
    const w = meta.width ?? INSET_MAX_W;
    const h = meta.height ?? INSET_MAX_H;
    const left = Math.round((OG_W - w) / 2);
    const top = Math.round((OG_H - h) / 2);

    const png = await sharp({
      create: {
        width: OG_W,
        height: OG_H,
        channels: 3,
        background: "#ffffff",
      },
    })
      .composite([{ input: logoPng, left, top }])
      .png()
      .toBuffer();

    return new NextResponse(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (e) {
    console.error("[og-image]", e);
    return new NextResponse("Open Graph image failed", { status: 500 });
  }
}
