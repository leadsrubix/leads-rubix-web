import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import { useSEO } from "@/lib/useSEO";
import { useContent } from "@/lib/useContent";

interface ChangelogEntry {
  version: string;
  date: string;
  title?: string;
  body: string;
  tags?: string[];
}

const DEFAULT_CHANGELOG: ChangelogEntry[] = [
  {
    version: "v2.6",
    date: "2026-05-01",
    title: "Trust + content depth release",
    body:
      "- Live `/status` page with last-90-days uptime grid\n- `/changelog` page (this page!)\n- Industry-aware demo form pre-fill\n- Case study detail pages with shareable URLs\n- Blog posts now show reading time, table of contents, and related posts\n- RSS feed at `/api/blog/rss.xml`\n- BreadcrumbList & Article JSON-LD enrichments\n- Route-level code splitting for the admin panel (~25% smaller public bundle)",
    tags: ["seo", "trust", "performance"],
  },
  {
    version: "v2.5",
    date: "2026-04-22",
    title: "Conversion + accessibility",
    body:
      "- Sticky **Book a demo** rail across all public pages\n- Interactive **ROI calculator** on /pricing\n- **Exit-intent modal** on /pricing and /compare with full keyboard a11y (Escape, focus trap, focus restore)\n- WhatsApp click-to-chat floating action button\n- **Dark mode** with system preference detection\n- JSON-LD: Organization, SoftwareApplication, Product (+ aggregateRating), FAQPage",
    tags: ["conversion", "ux", "a11y"],
  },
  {
    version: "v2.4",
    date: "2026-03-30",
    title: "Multi-industry pivot",
    body:
      "- Eight industry detail pages: real estate, education, healthcare, automotive, financial services, travel, SaaS, manufacturing\n- Industry-specific copy, pain points, ROI metrics and CTA targeting\n- CMS-editable industries content (admin)\n- Refreshed homepage, pricing and compare pages with industry-aware messaging",
    tags: ["content", "industries"],
  },
  {
    version: "v2.3",
    date: "2026-03-08",
    title: "Admin panel hardening",
    body:
      "- Force-change-password flow for new admin accounts\n- Login rate limiting (5/15 min) and account lockout after 10 failed attempts\n- Content versioning with full history + restore\n- Audit log for every state-changing admin action\n- Streaming CSV export for large lead datasets\n- Bulk lead operations (assign, status, delete)",
    tags: ["admin", "security"],
  },
];

export default function Changelog() {
  const entries = useContent<ChangelogEntry[]>("changelog", DEFAULT_CHANGELOG);

  useSEO({
    title: "Changelog — Leads Rubix",
    description:
      "What's new in Leads Rubix. Product releases, fixes, and improvements shipped to our marketing site, admin panel and CRM platform.",
    canonical: "https://leadsrubix.com/changelog",
  });

  return (
    <Layout>
      <section className="py-16 md:py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 max-w-3xl">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            What's new
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Changelog</h1>
          <p className="mt-3 text-muted-foreground">Every meaningful improvement we ship — from new pages to performance wins. Subscribe via the <a href="/api/blog/rss.xml" className="underline">RSS feed</a> for blog updates.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl space-y-8">
          {entries.length === 0 ? (
            <p className="text-muted-foreground">No releases yet.</p>
          ) : (
            entries.map((e, i) => (
              <Card key={`${e.version}-${i}`} data-testid={`changelog-entry-${i}`}>
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="font-mono text-sm font-bold text-primary">{e.version}</span>
                    <span className="text-xs text-muted-foreground">{(e.date ?? "").slice(0, 10)}</span>
                    {(e.tags ?? []).map((t) => (
                      <Badge key={t} variant="outline" className="text-[10px]">{t}</Badge>
                    ))}
                  </div>
                  {e.title ? <h2 className="text-xl md:text-2xl font-bold mb-3">{e.title}</h2> : null}
                  <div className="prose prose-slate dark:prose-invert max-w-none text-sm md:text-base">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>
                      {e.body}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
}
