import { Router, type IRouter } from "express";
import { z } from "zod";

// Dynamic Open Graph image generator — returns SVG (1200x630) which all major
// social platforms (Facebook, Twitter/X, LinkedIn, WhatsApp, Slack) accept.
// Zero new dependencies; cached aggressively at the edge.

const router: IRouter = Router();

const Query = z.object({
  title: z.string().min(1).max(160).default("Leads Rubix"),
  category: z.string().max(40).optional(),
  author: z.string().max(60).optional(),
});

const BRAND = "#252140";
const ACCENT = "#7C5CFF";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Crude word-wrap: greedy fill at ~22 chars per line for the headline font size.
function wrap(text: string, maxCharsPerLine: number, maxLines: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length <= maxCharsPerLine) {
      cur = (cur + " " + w).trim();
    } else {
      if (cur) lines.push(cur);
      cur = w;
      if (lines.length >= maxLines) break;
    }
  }
  if (cur && lines.length < maxLines) lines.push(cur);
  if (lines.length === maxLines) {
    const last = lines[maxLines - 1]!;
    if (last.length > maxCharsPerLine - 1) {
      lines[maxLines - 1] = last.slice(0, maxCharsPerLine - 1).trimEnd() + "…";
    }
  }
  return lines;
}

router.get("/og", (req, res) => {
  const parsed = Query.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).type("text/plain").send("invalid og query");
    return;
  }
  const { title, category, author } = parsed.data;
  const titleLines = wrap(escapeXml(title), 26, 4);
  const cat = category ? escapeXml(category.toUpperCase()) : "LEADS RUBIX";
  const authorText = author ? `By ${escapeXml(author)}` : "leadsrubix.com";

  const titleY = 280;
  const lineH = 78;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${BRAND}"/>
      <stop offset="1" stop-color="#15122B"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.6">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g font-family="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" fill="#fff">
    <g transform="translate(80, 80)">
      <rect x="0" y="0" width="44" height="44" rx="10" fill="${ACCENT}"/>
      <text x="58" y="32" font-size="28" font-weight="700">Leads Rubix</text>
    </g>
    <text x="80" y="200" font-size="22" font-weight="600" letter-spacing="3" fill="${ACCENT}">${cat}</text>
    ${titleLines
      .map(
        (line, i) =>
          `<text x="80" y="${titleY + i * lineH}" font-size="64" font-weight="800" letter-spacing="-1">${line}</text>`,
      )
      .join("\n    ")}
    <g transform="translate(80, 540)">
      <text font-size="22" fill="rgba(255,255,255,0.75)">${escapeXml(authorText)}</text>
    </g>
    <g transform="translate(1040, 540)">
      <text text-anchor="end" font-size="22" font-weight="600" fill="rgba(255,255,255,0.75)">leadsrubix.com</text>
    </g>
  </g>
</svg>`;

  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader(
    "Cache-Control",
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
  );
  res.send(svg);
});

export default router;
