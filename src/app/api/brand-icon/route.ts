import { NextResponse } from "next/server";
import sharp from "sharp";
import { readBrandShareAssetBuffer } from "@/lib/brand/share-asset";

export const runtime = "nodejs";

const SIZE = 512;

/** PNG favicon / link-preview thumbnail — same source as OG (`BRAND_SHARE_ASSET` or `images/kg.svg`). */
export async function GET() {
  try {
    const input = await readBrandShareAssetBuffer();
    const png = await sharp(input)
      .resize(SIZE, SIZE, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 1 },
      })
      .png()
      .toBuffer();

    return new NextResponse(new Uint8Array(png), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (e) {
    console.error("[brand-icon]", e);
    return new NextResponse("Icon generation failed", { status: 500 });
  }
}
