import { Link } from "wouter";
import { Linkedin, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { useContent } from "@/lib/useContent";
import { LogoMark, useBrand } from "./Brand";

interface FooterContact {
  legalEntity: string;
  addressLine: string;
  supportEmail: string;
  salesEmail: string;
  hours?: string;
}

interface SocialLinks {
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
}

interface LinkItem {
  label: string;
  href: string;
}

interface FooterLinks {
  productHeading?: string;
  productLinks?: LinkItem[];
  companyHeading?: string;
  companyLinks?: LinkItem[];
  legalHeading?: string;
  legalLinks?: LinkItem[];
}

const DEFAULT_CONTACT: FooterContact = {
  legalEntity: "Leads Rubix Technologies Pvt. Ltd.",
  addressLine: "Registered office: Mumbai, Maharashtra, India",
  supportEmail: "support@leadsrubix.com",
  salesEmail: "hello@leadsrubix.com",
  hours: "",
};

const DEFAULT_SOCIAL: SocialLinks = {
  linkedin: "https://www.linkedin.com/company/leads-rubix",
  facebook: "",
  instagram: "",
  twitter: "",
  youtube: "",
};

const DEFAULT_FOOTER_LINKS: FooterLinks = {
  productHeading: "Product",
  productLinks: [
    { label: "Features", href: "/features" },
    { label: "Industries", href: "/industries" },
    { label: "Solutions", href: "/solutions" },
    { label: "Integrations", href: "/integrations" },
    { label: "Pricing", href: "/pricing" },
    { label: "Security", href: "/security" },
    { label: "Login", href: "https://app.leadsrubix.com/" },
    { label: "Start Free Trial", href: "https://app.leadsrubix.com/" },
  ],
  companyHeading: "Company",
  companyLinks: [
    { label: "About Us", href: "/about" },
    { label: "Compare", href: "/compare" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Book a Demo", href: "/demo" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/blog" },
    { label: "Changelog", href: "/changelog" },
    { label: "Status", href: "/status" },
  ],
  legalHeading: "Legal",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const SOCIAL_ICONS: Array<{ key: keyof SocialLinks; Icon: typeof Linkedin; label: string; testId: string }> = [
  { key: "linkedin", Icon: Linkedin, label: "Leads Rubix on LinkedIn", testId: "link-social-li" },
  { key: "facebook", Icon: Facebook, label: "Leads Rubix on Facebook", testId: "link-social-fb" },
  { key: "instagram", Icon: Instagram, label: "Leads Rubix on Instagram", testId: "link-social-ig" },
  { key: "twitter", Icon: Twitter, label: "Leads Rubix on X (Twitter)", testId: "link-social-x" },
  { key: "youtube", Icon: Youtube, label: "Leads Rubix on YouTube", testId: "link-social-yt" },
];

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function FooterLink({ item, testId }: { item: LinkItem; testId: string }) {
  const cls = "text-white/65 hover:text-white transition-colors";
  if (isExternal(item.href)) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls} data-testid={testId}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={cls} data-testid={testId}>
      {item.label}
    </Link>
  );
}

export function Footer() {
  const brand = useBrand();
  const contact = useContent<FooterContact>("footer_contact", DEFAULT_CONTACT);
  const social = useContent<SocialLinks>("social_links", DEFAULT_SOCIAL);
  const footerLinks = useContent<FooterLinks>("footer_links", DEFAULT_FOOTER_LINKS);

  const productLinks = footerLinks.productLinks ?? DEFAULT_FOOTER_LINKS.productLinks!;
  const companyLinks = footerLinks.companyLinks ?? DEFAULT_FOOTER_LINKS.companyLinks!;
  const legalLinks = footerLinks.legalLinks ?? DEFAULT_FOOTER_LINKS.legalLinks!;

  const tagline = brand.footerTagline?.trim() || "";
  const bottomLine = brand.bottomLine?.trim() || "";
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#16142B] text-white/70 py-16 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 inline-block" data-testid="link-footer-logo">
              <LogoMark brand={brand} variant="footer" />
            </Link>
            {tagline ? (
              <p className="text-white/60 mb-6 max-w-sm leading-relaxed mt-4">{tagline}</p>
            ) : null}
            <div className="flex gap-4 mb-6 mt-2">
              {SOCIAL_ICONS.map(({ key, Icon, label, testId }) => {
                const href = social?.[key];
                if (!href || !href.trim()) return null;
                return (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white hover:text-[#252140] hover:border-white transition-colors"
                    aria-label={label}
                    data-testid={testId}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
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
            <h4 className="font-semibold text-white mb-4">{footerLinks.productHeading || "Product"}</h4>
            <ul className="flex flex-col gap-3">
              {productLinks.map((item, i) => (
                <li key={`p-${i}`}>
                  <FooterLink item={item} testId={`link-footer-product-${i}`} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{footerLinks.companyHeading || "Company"}</h4>
            <ul className="flex flex-col gap-3">
              {companyLinks.map((item, i) => (
                <li key={`c-${i}`}>
                  <FooterLink item={item} testId={`link-footer-company-${i}`} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">{footerLinks.legalHeading || "Legal"}</h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((item, i) => (
                <li key={`l-${i}`}>
                  <FooterLink item={item} testId={`link-footer-legal-${i}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/55 text-sm">
            © {year} {contact.legalEntity}. All rights reserved.
          </p>
          {bottomLine ? <p className="text-white/55 text-sm">{bottomLine}</p> : null}
        </div>
      </div>
    </footer>
  );
}
