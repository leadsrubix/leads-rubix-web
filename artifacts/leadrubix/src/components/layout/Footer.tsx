import { Link } from "wouter";
import { Building2, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6" data-testid="link-footer-logo">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Building2 size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Leads Rubix</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm">
              The purpose-built CRM for Indian real estate sales teams. Capture, manage, and convert leads from first contact through booking.
            </p>
            <div className="flex gap-4 mb-6">
              <a
                href="https://www.linkedin.com/company/leads-rubix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Leads Rubix on LinkedIn"
                data-testid="link-social-li"
              >
                <Linkedin size={20} />
              </a>
            </div>
            <div className="text-xs text-slate-500 space-y-1 leading-relaxed">
              <p className="font-semibold text-slate-400">Leads Rubix Technologies Pvt. Ltd.</p>
              <p>Registered office: Mumbai, Maharashtra, India</p>
              <p>support@leadsrubix.com  ·  hello@leadsrubix.com</p>
            </div>
          </div>

          {/* Product Col */}
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/features" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-features">Features</Link></li>
              <li><Link href="/solutions" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-solutions">Solutions</Link></li>
              <li><Link href="/integrations" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-integrations">Integrations</Link></li>
              <li><Link href="/pricing" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-pricing">Pricing</Link></li>
              <li><Link href="/security" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-security">Security</Link></li>
              <li><a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-login">Login</a></li>
              <li><a href="https://app.leadsrubix.com/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-signup">Start Free Trial</a></li>
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-about">About Us</Link></li>
              <li><Link href="/compare" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-compare">Compare</Link></li>
              <li><Link href="/case-studies" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-case-studies">Case Studies</Link></li>
              <li><Link href="/demo" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-demo">Book a Demo</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-contact">Contact</Link></li>
              <li><Link href="/faq" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Legal Col */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/privacy" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-privacy">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-terms">Terms & Conditions</Link></li>
              <li><Link href="/refund" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-refund">Refund Policy</Link></li>
              <li><Link href="/cookies" className="text-slate-400 hover:text-white transition-colors" data-testid="link-footer-cookies">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 Leads Rubix Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Made in India  ·  Built for Indian Real Estate
          </p>
        </div>
      </div>
    </footer>
  );
}
