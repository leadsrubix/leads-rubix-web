export function readingTimeMinutes(text: string, wpm = 220): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}

export interface TocHeading {
  level: 2 | 3;
  text: string;
  id: string;
}

export function extractToc(markdown: string): TocHeading[] {
  const lines = markdown.split(/\r?\n/);
  const headings: TocHeading[] = [];
  let inCodeFence = false;
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (/^\s*```/.test(line)) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const level = m[1]!.length as 2 | 3;
    const text = m[2]!;
    const id = text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
    if (id) headings.push({ level, text, id });
  }
  return headings;
}
