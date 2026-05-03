import { Layout } from "@/components/layout/Layout";
import { Link } from "wouter";
import { GLOSSARY } from "@/lib/glossary";
import { useSEO } from "@/lib/useSEO";
import { ArrowRight } from "lucide-react";

export default function Glossary() {
  useSEO({
    title: "Sales & CRM Glossary — Leads Rubix",
    description:
      "Plain-English definitions for the sales, CRM, and lead management terms Indian B2B teams actually use. Lead response time, lead scoring, WhatsApp Business API, and more.",
    canonical: "https://leadsrubix.com/glossary",
  });

  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <Layout>
      <section className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6" data-testid="glossary-h1">
            Sales &amp; CRM glossary
          </h1>
          <p className="text-xl text-muted-foreground">
            Plain-English definitions for the terms Indian B2B sales teams actually use. Updated as the field changes.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {sorted.map((entry) => (
              <Link
                key={entry.slug}
                href={`/glossary/${entry.slug}`}
                className="group block p-6 rounded-xl border bg-background hover:border-primary hover:shadow-md transition"
                data-testid={`link-glossary-${entry.slug}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition">
                      {entry.term}
                    </h2>
                    <p className="text-muted-foreground">{entry.oneliner}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
