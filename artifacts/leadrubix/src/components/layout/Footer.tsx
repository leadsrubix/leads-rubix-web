import { Link } from "wouter";
import { Building2, Linkedin } from "lucide-react";
import { useContent } from "@/lib/useContent";

interface FooterContact {
  legalEntity: string;
  addressLine: string;
  supportEmail: string;
  salesEmail: string;
  hours?: string;
}

const DEFAULT_CONTACT: FooterContact = {
  legalEntity: "Leads Rubix Technologies Pvt. Ltd.",
  addressLine: "Registered office: Mumbai, Maharashtra, India",
  supportEmail: "support@leadsrubix.com",
  salesEmail: "hello@leadsrubix.com",
  hours: "",
};

export function Footer() {
  const contact = useContent<FooterContact>("footer_contact", DEFAULT_CONTACT);

  return (
    <footer className="bg-[#16142B] text-white/70 py-16 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6" data-testid="link-footer-logo">
              <div className="bg-white text-[#252140] p-1.5 rounded-lg">
                <Building2 size={24} />
              </div>
              <span className="font-['Fraunces'] font-medium text-2xl tracking-tight text-white">Leads Rubix</span>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm leading-relaxed">
              The purpose-built CRM for Indian real estate sales teams. Capture, manage, and convert leads from first contact through booking.
            </p>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.linkedin.com/company/leads-rubix"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#252140] hover:border-white transition-colors"
                aria-label="Leads Rubix on LinkedIn"
                data-testid="link-social-li"
              >
                <Linkedin size={18} />
              </a>
            </div>
            <div className="text-xs text-white/55 space-y-1 leading-relaxed" data-testid="footer-contact">
              <p className="font-semibold text-white/80">{contact.legalEntity}</p>
              <p>{contact.addressLine}</p>
              <p>
                {contact.supportEmail}
                {contact.salesEmail ? `  ·  ${contact.salesEmail}` : ""}
              </p>
              {contact.hours ? <p>{contact.hours}</p> : null}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/features" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-features">Features</Link></li>
              <li><Link href="/solutions" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-solutions">Solutions</Link></li>
              <li><Link href="/integrations" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-integrations">Integrations</Link></li>
              <li><Link href="/pricing" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-pricing">Pricing</Link></li>
              <li><Link href="/security" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-security">Security</Link></li>
              <li><a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-login">Login</a></li>
              <li><a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-signup">Start Free Trial</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-about">About Us</Link></li>
              <li><Link href="/compare" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-compare">Compare</Link></li>
              <li><Link href="/case-studies" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-case-studies">Case Studies</Link></li>
              <li><Link href="/demo" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-demo">Book a Demo</Link></li>
              <li><Link href="/contact" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-contact">Contact</Link></li>
              <li><Link href="/faq" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-faq">FAQ</Link></li>
              <li><Link href="/blog" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-blog">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/privacy" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-terms">Terms & Conditions</Link></li>
              <li><Link href="/refund" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-refund">Refund Policy</Link></li>
              <li><Link href="/cookies" className="text-white/65 hover:text-white transition-colors" data-testid="link-footer-cookies">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/55 text-sm">
            © 2026 {contact.legalEntity}. All rights reserved.
          </p>
          <p className="text-white/55 text-sm">
            Made in India  ·  Built for Indian Real Estate
          </p>
        </div>
      </div>
    </footer>
  );
}
