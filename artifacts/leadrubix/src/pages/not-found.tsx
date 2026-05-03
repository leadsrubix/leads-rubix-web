import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/useSEO";
import { ArrowLeft, Home, MessageSquare, BookOpen } from "lucide-react";

export default function NotFound() {
  useSEO({
    title: "Page not found — Leads Rubix",
    description:
      "The page you were looking for has moved or no longer exists. Browse our product, blog, or contact our India sales team.",
    canonical: "https://leadsrubix.com/404",
  });

  return (
    <Layout>
      <section className="py-20 md:py-28">
        <div className="container max-w-3xl text-center">
          <p className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
            404
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-[#252140]">
            We couldn't find that page.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            The link may be old, the page may have moved, or you may have typed the
            URL by hand. Pick one of the routes below — most visitors find what they
            need within a click.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" data-testid="btn-404-home">
              <Link href="/">
                <Home className="size-4 mr-2" /> Back to home
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" data-testid="btn-404-blog">
              <Link href="/blog">
                <BookOpen className="size-4 mr-2" /> Read the blog
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" data-testid="btn-404-contact">
              <Link href="/contact">
                <MessageSquare className="size-4 mr-2" /> Talk to sales
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            {[
              { href: "/features", label: "Features" },
              { href: "/pricing", label: "Pricing" },
              { href: "/industries", label: "Industries" },
              { href: "/case-studies", label: "Case studies" },
              { href: "/integrations", label: "Integrations" },
              { href: "/security", label: "Security" },
              { href: "/about", label: "About" },
              { href: "/faq", label: "FAQ" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-md border bg-card px-3 py-2 hover:border-[#252140] hover:text-[#252140] transition-colors"
                data-testid={`link-404-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <p className="mt-12 text-sm text-muted-foreground inline-flex items-center gap-1">
            <ArrowLeft className="size-3.5" />
            Or use your browser's back button to retrace your steps.
          </p>
        </div>
      </section>
    </Layout>
  );
}
