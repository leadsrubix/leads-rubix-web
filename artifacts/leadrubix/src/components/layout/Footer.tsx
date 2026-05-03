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
    <footer className="bg-[#252140] text-[#F1F1F9]/70 py-16 border-t border-[#252140]/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6" data-testid="link-footer-logo">
              <div className="bg-[#252140] text-[#FFFFFF] p-1.5 rounded-lg">
                <Building2 size={24} />
              </div>
              <span className="font-['Fraunces'] font-medium text-2xl tracking-tight text-[#F1F1F9]">Leads Rubix</span>
            </Link>
            <p className="text-[#F1F1F9]/70 mb-6 max-w-sm">
              The purpose-built CRM for Indian real estate sales teams. Capture, manage, and convert leads from first contact through booking.
            </p>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.linkedin.com/company/leads-rubix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors"
                aria-label="Leads Rubix on LinkedIn"
                data-testid="link-social-li"
              >
                <Linkedin size={20} />
              </a>
            </div>
            <div className="text-xs text-[#FFFFFF]/60 space-y-1 leading-relaxed" data-testid="footer-contact">
              <p className="font-semibold text-[#F1F1F9]/80">{contact.legalEntity}</p>
              <p>{contact.addressLine}</p>
              <p>
                {contact.supportEmail}
                {contact.salesEmail ? `  ·  ${contact.salesEmail}` : ""}
              </p>
              {contact.hours ? <p>{contact.hours}</p> : null}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-[#FFFFFF] mb-4">Product</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/features" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-features">Features</Link></li>
              <li><Link href="/solutions" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-solutions">Solutions</Link></li>
              <li><Link href="/integrations" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-integrations">Integrations</Link></li>
              <li><Link href="/pricing" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-pricing">Pricing</Link></li>
              <li><Link href="/security" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-security">Security</Link></li>
              <li><a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-login">Login</a></li>
              <li><a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-signup">Start Free Trial</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#FFFFFF] mb-4">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-about">About Us</Link></li>
              <li><Link href="/compare" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-compare">Compare</Link></li>
              <li><Link href="/case-studies" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-case-studies">Case Studies</Link></li>
              <li><Link href="/demo" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-demo">Book a Demo</Link></li>
              <li><Link href="/contact" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-contact">Contact</Link></li>
              <li><Link href="/faq" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-faq">FAQ</Link></li>
              <li><Link href="/blog" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-blog">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[#FFFFFF] mb-4">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/privacy" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-terms">Terms & Conditions</Link></li>
              <li><Link href="/refund" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-refund">Refund Policy</Link></li>
              <li><Link href="/cookies" className="text-[#F1F1F9]/70 hover:text-[#252140] transition-colors" data-testid="link-footer-cookies">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#252140]/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#FFFFFF]/60 text-sm">
            © 2026 {contact.legalEntity}. All rights reserved.
          </p>
          <p className="text-[#FFFFFF]/60 text-sm">
            Made in India  ·  Built for Indian Real Estate
          </p>
        </div>
      </div>
    </footer>
  );
}
