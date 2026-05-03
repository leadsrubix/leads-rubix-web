import { Layout } from "@/components/layout/Layout";
import { Link, useParams } from "wouter";
import { findGlossaryEntry, GLOSSARY } from "@/lib/glossary";
import { useSEO } from "@/lib/useSEO";
import NotFound from "./not-found";
import { ChevronLeft } from "lucide-react";
import { useMemo } from "react";

// Tiny markdown-ish renderer for glossary entries — supports paragraphs,
// **bold**, [text](url) links, simple bullet lists, and pipe-tables.
// We render to React rather than HTML to keep XSS surface zero.
const INTERNAL_PATH_RE = /^\/(?!\/)/;
const SAFE_EXTERNAL_RE = /^(https?:|mailto:|tel:)/i;

function sanitizeHref(raw: string): { kind: "internal" | "external"; href: string } | null {
  const href = raw.trim();
  if (INTERNAL_PATH_RE.test(href)) return { kind: "internal", href };
  if (SAFE_EXTERNAL_RE.test(href)) return { kind: "external", href };
  return null;
}

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // First parse markdown links [label](href), then bold within remainders.
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = linkRe.exec(text)) !== null) {
    const before = text.slice(last, m.index);
    if (before) parts.push(...renderBold(before, key++));
    const rawHref = m[2]!;
    const label = m[1]!;
    const safe = sanitizeHref(rawHref);
    if (!safe) {
      parts.push(<span key={`l${key++}`}>{label}</span>);
    } else if (safe.kind === "internal") {
      parts.push(
        <Link key={`l${key++}`} href={safe.href} className="text-primary underline underline-offset-2 hover:no-underline">
          {label}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={`l${key++}`}
          href={safe.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:no-underline"
        >
          {label}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  const rest = text.slice(last);
  if (rest) parts.push(...renderBold(rest, key++));
  return parts;
}

function renderBold(text: string, base: number): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      <strong key={`b${base}-${i++}`} className="font-semibold text-foreground">
        {m[1]}
      </strong>,
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function renderBody(body: string): React.ReactNode {
  const blocks = body.split(/\n\n+/);
  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    // Pipe table: any block whose first two lines start and end with |
    const lines = trimmed.split("\n");
    if (lines.length >= 2 && lines[0]!.startsWith("|") && lines[1]!.includes("---")) {
      const headers = lines[0]!.split("|").slice(1, -1).map((s) => s.trim());
      const rows = lines.slice(2).map((row) => row.split("|").slice(1, -1).map((s) => s.trim()));
      return (
        <div key={idx} className="my-6 overflow-x-auto">
          <table className="w-full text-sm border rounded-lg overflow-hidden">
            <thead className="bg-slate-50">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="text-left px-4 py-2 font-semibold border-b">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b last:border-b-0">
                  {r.map((c, j) => (
                    <td key={j} className="px-4 py-2">{renderInline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (trimmed.split("\n").every((l) => /^(\d+\.|[-*])\s/.test(l))) {
      const ordered = /^\d+\./.test(trimmed);
      const items = trimmed.split("\n").map((l) => l.replace(/^(\d+\.|[-*])\s+/, ""));
      const Tag = ordered ? "ol" : "ul";
      return (
        <Tag
          key={idx}
          className={`my-4 space-y-2 ${ordered ? "list-decimal" : "list-disc"} pl-6 text-muted-foreground`}
        >
          {items.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </Tag>
      );
    }
    return (
      <p key={idx} className="my-4 text-muted-foreground leading-relaxed">
        {renderInline(trimmed)}
      </p>
    );
  });
}

export default function GlossaryDetail() {
  const params = useParams<{ slug: string }>();
  const entry = findGlossaryEntry(params.slug ?? "");

  useSEO({
    title: entry ? `${entry.term} — Leads Rubix Glossary` : "Glossary — Leads Rubix",
    description: entry?.oneliner ?? "Sales and CRM glossary",
    canonical: entry ? `https://leadsrubix.com/glossary/${entry.slug}` : undefined,
  });

  const related = useMemo(() => {
    if (!entry?.related) return [];
    return entry.related
      .map((slug) => GLOSSARY.find((e) => e.slug === slug))
      .filter((x): x is (typeof GLOSSARY)[number] => Boolean(x));
  }, [entry]);

  if (!entry) return <NotFound />;

  return (
    <Layout>
      <article className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            href="/glossary"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            data-testid="link-glossary-back"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> All glossary terms
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" data-testid="glossary-detail-h1">
            {entry.term}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">{entry.oneliner}</p>
          <div className="prose-content">{renderBody(entry.body)}</div>

          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t">
              <h2 className="text-lg font-semibold mb-4">Related terms</h2>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/glossary/${r.slug}`} className="text-primary hover:underline">
                      {r.term}
                    </Link>
                    <span className="text-muted-foreground"> — {r.oneliner}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
            <h3 className="font-semibold mb-2">Want this built into your CRM?</h3>
            <p className="text-muted-foreground mb-4">
              Leads Rubix ships with response-time tracking, lead scoring, and WhatsApp routing out of the box. Configured for Indian sales teams.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center text-primary font-semibold hover:underline"
              data-testid="link-glossary-demo"
            >
              Book a 30-minute demo →
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}
