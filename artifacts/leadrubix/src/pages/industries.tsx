import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { useContent } from "@/lib/useContent";
import {
  DEFAULT_INDUSTRIES,
  getIndustryIcon,
  type IndustriesContent,
} from "@/lib/industryIcons";

export default function Industries() {
  useSEO({
    title: "Industries — Leads Rubix CRM | Built for every team that sells",
    description:
      "Leads Rubix adapts to the way your industry sells — real estate, education, healthcare, automotive, BFSI, travel, SaaS and manufacturing. See how teams like yours win.",
    canonical: "https://leadsrubix.com/industries",
  });

  const data = useContent<IndustriesContent>("industries", DEFAULT_INDUSTRIES);
  const items = data.items ?? [];

  return (
    <Layout>
      <section className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block bg-[#252140]/5 text-[#252140] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
              {data.eyebrow}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-[#252140]">
              {data.headline}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">{data.subheadline}</p>
          </div>

          {items.length === 0 ? (
            <p className="text-center text-muted-foreground">No industries configured yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {items.map((it) => {
                const Icon = getIndustryIcon(it.icon);
                return (
                  <Link
                    key={it.slug}
                    href={`/industries/${it.slug}`}
                    className="group p-6 rounded-2xl border border-border bg-card hover:border-[#252140]/40 hover:shadow-lg transition-all"
                    data-testid={`card-industry-${it.slug}`}
                  >
                    <div className="h-12 w-12 rounded-xl bg-[#252140]/5 text-[#252140] flex items-center justify-center mb-4 group-hover:bg-[#252140] group-hover:text-white transition-colors">
                      <Icon size={24} />
                    </div>
                    <h2 className="text-xl font-bold mb-1 text-[#252140]">{it.name}</h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{it.tagline}</p>
                    <span className="text-sm font-semibold text-[#252140] inline-flex items-center gap-1">
                      Explore <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-[#252140]">
            Don't see your industry?
          </h2>
          <p className="text-muted-foreground mb-6">
            Leads Rubix is fully configurable — custom pipelines, custom fields, and custom roles
            mean it adapts to any sales motion. Talk to us about your specific workflow.
          </p>
          <Button asChild size="lg" data-testid="btn-industries-demo">
            <Link href="/demo">
              Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
