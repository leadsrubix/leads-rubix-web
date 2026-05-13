import { useEffect } from "react";

type SEOOptions = {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

type SeoGlobal = {
  siteName?: string;
  titleSuffix?: string;
  defaultDescription?: string;
  defaultOgImage?: string;
  twitterHandle?: string;
  themeColor?: string;
  geoRegion?: string;
  geoPlacename?: string;
  geoPosition?: string;
};

const HARDCODED_FALLBACK: Required<SeoGlobal> = {
  siteName: "Leads Rubix",
  titleSuffix: "",
  defaultDescription: "",
  defaultOgImage: "https://leadsrubix.com/opengraph.jpg",
  twitterHandle: "",
  themeColor: "#252140",
  geoRegion: "IN-MH",
  geoPlacename: "Mumbai",
  geoPosition: "19.0760;72.8777",
};

let cachedSeo: Required<SeoGlobal> = HARDCODED_FALLBACK;
let seoFetched = false;
const seoListeners = new Set<() => void>();

function loadSeoGlobal() {
  if (seoFetched || typeof window === "undefined") return;
  seoFetched = true;
  fetch(`/api/content/seo_global`, { credentials: "same-origin" })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => {
      if (d?.ok && d.value && typeof d.value === "object") {
        cachedSeo = { ...HARDCODED_FALLBACK, ...(d.value as SeoGlobal) };
        seoListeners.forEach((fn) => fn());
      } else {
        // 404 (key not yet authored) — allow a retry on next mount cycle
        seoFetched = false;
      }
    })
    .catch(() => {
      seoFetched = false;
    });
}

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

function applySeo(opts: SEOOptions, seo: Required<SeoGlobal>) {
  const { title, description, canonical, ogImage, jsonLd } = opts;
  // Apply title suffix from CMS if not already present
  const finalTitle = seo.titleSuffix && !title.endsWith(seo.titleSuffix)
    ? `${title}${seo.titleSuffix}`
    : title;
  document.title = finalTitle;
  const finalDescription = description ?? seo.defaultDescription;
  if (finalDescription) {
    setMeta("description", finalDescription);
    setMeta("og:description", finalDescription, true);
    setMeta("twitter:description", finalDescription);
  }
  setMeta("og:title", finalTitle, true);
  setMeta("twitter:title", finalTitle);
  setMeta("og:site_name", seo.siteName, true);
  setMeta("og:type", "website", true);
  setMeta("twitter:card", "summary_large_image");
  if (seo.twitterHandle) {
    setMeta("twitter:site", seo.twitterHandle);
    setMeta("twitter:creator", seo.twitterHandle);
  }
  if (canonical) {
    setCanonical(canonical);
    setMeta("og:url", canonical, true);
    setLang(canonical);
  }
  setMeta("geo.region", seo.geoRegion);
  setMeta("geo.placename", seo.geoPlacename);
  setMeta("geo.position", seo.geoPosition);
  setMeta("ICBM", seo.geoPosition.replace(";", ", "));
  setMeta("og:locale", "en_IN", true);
  const finalOgImage = ogImage ?? seo.defaultOgImage;
  setMeta("og:image", finalOgImage, true);
  setMeta("twitter:image", finalOgImage);
  setJsonLd(jsonLd);
}

export function useSEO(opts: SEOOptions) {
  const { title, description, canonical, ogImage, jsonLd } = opts;
  useEffect(() => {
    loadSeoGlobal();
    applySeo({ title, description, canonical, ogImage, jsonLd }, cachedSeo);
    // Re-apply if seo_global arrives later
    const reapply = () =>
      applySeo({ title, description, canonical, ogImage, jsonLd }, cachedSeo);
    seoListeners.add(reapply);
    return () => {
      seoListeners.delete(reapply);
      setJsonLd(undefined);
    };
  }, [title, description, canonical, ogImage, JSON.stringify(jsonLd)]);
}
