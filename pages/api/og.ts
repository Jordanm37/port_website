import type { NextApiRequest, NextApiResponse } from "next";

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    title = "",
    dek = "",
    date = "",
    tags = "",
    accent = "",
    brand = "Jordan Moshcovitis",
  } = req.query as Record<string, string>;
  const safeTitle = escapeHtml(title).slice(0, 120);
  const safeDek = escapeHtml(dek).slice(0, 200);
  const safeDate = escapeHtml(date);
  const tagList = (tags || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 4);
  const accentColor = accent || "oklch(0.68 0.16 280)";

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#f7f7f7"/>
      </linearGradient>
      <style><![CDATA[
        .title { font: 700 60px Inter, ui-sans-serif, system-ui; fill: #111; }
        .dek { font: 400 30px Inter, ui-sans-serif, system-ui; fill: #444; }
        .meta { font: 500 22px Inter, ui-sans-serif, system-ui; fill: #555; }
        .tag { font: 500 18px Inter, ui-sans-serif, system-ui; fill: #374151; }
        .brand { font: 600 22px Inter, ui-sans-serif, system-ui; fill: #111; }
      ]]></style>
    </defs>
    <rect width="1200" height="630" fill="url(#g)" />
    <g opacity="0.2" stroke="${accentColor}" fill="none">
      <path d="M0,520 C160,480 320,560 480,500 C640,440 800,540 960,500 C1120,460 1200,520 1200,520" stroke-width="3"/>
      <path d="M0,420 C160,380 320,460 480,400 C640,340 800,440 960,400 C1120,360 1200,420 1200,420" stroke-width="1.5"/>
    </g>
    <g transform="translate(80,90)">
      <foreignObject x="0" y="0" width="1000" height="220">
        <div xmlns="http://www.w3.org/1999/xhtml" style="display:flex;align-items:flex-end;height:100%;">
          <div class="title" style="line-height:1.1;">${safeTitle}</div>
        </div>
      </foreignObject>
      <foreignObject x="0" y="220" width="1000" height="140">
        <div xmlns="http://www.w3.org/1999/xhtml" class="dek" style="line-height:1.35;color:#444">${safeDek}</div>
      </foreignObject>
      <text x="0" y="400" class="meta">${safeDate}</text>
      ${tagList
        .map(
          (t, i) =>
            `<rect x="${i * 150}" y="440" rx="10" ry="10" width="130" height="40" fill="#e5e7eb"/>
             <text x="${i * 150 + 14}" y="467" class="tag">${escapeHtml(t)}</text>`
        )
        .join("")}
    </g>
    <g transform="translate(80,560)">
      <circle cx="0" cy="-6" r="4" fill="${accentColor}"/>
      <text x="12" y="0" class="brand">${escapeHtml(brand)}</text>
    </g>
  </svg>`;

  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).send(svg);
}
