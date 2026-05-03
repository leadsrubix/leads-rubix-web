import { useEffect } from "react";

type SEOOptions = {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? "property" : "name";
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

const HREFLANG_ATTR = "data-leadsrubix-hreflang";

/**
 * Set the document language. We're a single-locale site (en-IN), so per
 * Google's hreflang guidance ("A page must have at least two language/locale
 * versions to use hreflang"), we set <html lang> instead of emitting
 * self-referential hreflang link tags. The attribute below is retained so
 * any previously-injected hreflang nodes are cleaned up on navigation.
 */
function setLang(_canonical: string) {
  document.head
    .querySelectorAll<HTMLLinkElement>(`link[${HREFLANG_ATTR}]`)
    .forEach((node) => node.remove());
  if (document.documentElement.getAttribute("lang") !== "en-IN") {
    document.documentElement.setAttribute("lang", "en-IN");
  }
}

const JSONLD_ATTR = "data-leadsrubix-jsonld";

function setJsonLd(payload: SEOOptions["jsonLd"]) {
  document.head
    .querySelectorAll<HTMLScriptElement>(`script[${JSONLD_ATTR}]`)
    .forEach((node) => node.remove());
  if (!payload) return;
  const items = Array.isArray(payload) ? payload : [payload];
  items.forEach((item) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(JSONLD_ATTR, "true");
    script.textContent = JSON.stringify(item);
    document.head.appendChild(script);
  });
}

export function useSEO({ title, description, canonical, ogImage, jsonLd }: SEOOptions) {
  useEffect(() => {
    document.title = title;
    if (description) {
      setMeta("description", description);
      setMeta("og:description", description, true);
      setMeta("twitter:description", description);
    }
    setMeta("og:title", title, true);
    setMeta("twitter:title", title);
    setMeta("og:site_name", "Leads Rubix", true);
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    if (canonical) {
      setCanonical(canonical);
      setMeta("og:url", canonical, true);
      setLang(canonical);
    }
    // Geo signals — Mumbai HQ, services across India.
    setMeta("geo.region", "IN-MH");
    setMeta("geo.placename", "Mumbai");
    setMeta("geo.position", "19.0760;72.8777");
    setMeta("ICBM", "19.0760, 72.8777");
    setMeta("og:locale", "en_IN", true);
    const finalOgImage = ogImage ?? "https://leadsrubix.com/opengraph.jpg";
    setMeta("og:image", finalOgImage, true);
    setMeta("twitter:image", finalOgImage);
    setJsonLd(jsonLd);
    return () => {
      setJsonLd(undefined);
    };
  }, [title, description, canonical, ogImage, JSON.stringify(jsonLd)]);
}
