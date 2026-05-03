export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function caseStudySlug(tag: string, fallbackIndex: number): string {
  const base = (tag.split("·")[0] ?? tag).trim();
  const s = slugify(base);
  return s || `case-${fallbackIndex + 1}`;
}

export function buildCaseStudySlugs(tags: string[]): string[] {
  const out: string[] = [];
  const seen = new Map<string, number>();
  tags.forEach((tag, i) => {
    const base = caseStudySlug(tag, i);
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    out.push(n === 1 ? base : `${base}-${n}`);
  });
  return out;
}
