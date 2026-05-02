import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, Building2 } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/features", label: "Features" },
    { href: "/solutions", label: "Solutions" },
    { href: "/integrations", label: "Integrations" },
    { href: "/pricing", label: "Pricing" },
    { href: "/security", label: "Security" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <Building2 size={24} />
          </div>
          <span className="font-bold text-xl tracking-tight text-primary">Leads Rubix</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-signin">
            Sign In
          </a>
          <Button asChild data-testid="btn-freetrial">
            <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">
              Start Free Trial
            </a>
          </Button>
        </div>

        {/* Mobile Nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="md:hidden" data-testid="btn-mobile-menu">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-2 py-1 text-lg font-medium hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                <Button variant="outline" asChild className="w-full justify-center" data-testid="btn-mobile-signin">
                  <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">
                    Sign In
                  </a>
                </Button>
                <Button asChild className="w-full justify-center" data-testid="btn-mobile-freetrial">
                  <a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer">
                    Start Free Trial
                  </a>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
