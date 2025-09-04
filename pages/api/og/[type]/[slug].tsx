import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

export default function handler(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "essay";
  const slug = searchParams.get("slug") || "Untitled";
  const title = String(slug).replace(/[-_]/g, " ");
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b1020, #0c1a2b)",
          color: "white",
          fontSize: 48,
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 20, opacity: 0.7, marginBottom: 12 }}>
          {String(type).toUpperCase()}
        </div>
        <div style={{ fontWeight: 700, lineHeight: 1.2 }}>{title}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
