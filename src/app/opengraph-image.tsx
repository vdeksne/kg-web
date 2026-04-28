import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";

export const runtime = "nodejs";

export const alt = "Kaspars Groza — Portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const LOGO_PX = 420;

export default async function OpengraphImage() {
  const svg = await readFile(
    join(process.cwd(), "public/images/kg.svg"),
  );

  const logoPng = await sharp(svg)
    .resize(LOGO_PX, LOGO_PX, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toBuffer();

  const src = `data:image/png;base64,${logoPng.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse / Satori */}
        <img src={src} width={LOGO_PX} height={LOGO_PX} alt="" />
      </div>
    ),
    {
      ...size,
    },
  );
}
