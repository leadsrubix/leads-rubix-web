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
    { href: "/compare", label: "Compare" },
    { href: "/security", label: "Security" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#252140]/20 bg-[#FAFAFD]/90 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
          <div className="bg-[#252140] text-[#FFFFFF] p-1.5 rounded-lg">
            <Building2 size={24} />
          </div>
          <span className="font-['Fraunces'] font-medium text-2xl tracking-tight text-[#252140]">Leads Rubix</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#252140]/70 hover:text-[#252140] transition-colors"
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://app.leadsrubix.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#252140]/70 hover:text-[#252140] transition-colors"
            data-testid="link-signin"
          >
            Sign In
          </a>
          <a
            href="https://app.leadsrubix.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#252140] text-[#FFFFFF] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#252140] shadow-lg shadow-slate-900/5 transition-all duration-300"
            data-testid="btn-freetrial"
          >
            Start Free Trial
          </a>
        </div>

        {/* Mobile Nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="md:hidden text-[#252140] hover:text-[#252140]" data-testid="btn-mobile-menu">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#FAFAFD] border-l border-[#252140]/20">
            <nav className="flex flex-col gap-4 mt-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-2 py-1 text-lg font-medium text-[#252140]/80 hover:text-[#252140] transition-colors"
                  onClick={() => setIsOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[#252140]/20">
                <a
                  href="https://app.leadsrubix.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center px-6 py-2.5 rounded-full text-sm font-medium border border-[#252140]/30 text-[#252140] hover:bg-[#F0F0F7] transition-colors"
                  data-testid="btn-mobile-signin"
                >
                  Sign In
                </a>
                <a
                  href="https://app.leadsrubix.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-[#252140] text-[#FFFFFF] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#252140] transition-colors"
                  data-testid="btn-mobile-freetrial"
                >
                  Start Free Trial
                </a>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
