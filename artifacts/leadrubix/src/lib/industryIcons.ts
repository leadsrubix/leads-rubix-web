import {
  Building2,
  GraduationCap,
  Stethoscope,
  Car,
  Banknote,
  Plane,
  Server,
  Factory,
  ShoppingBag,
  Briefcase,
  HeartPulse,
  Hammer,
  type LucideIcon,
} from "lucide-react";

export const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  Building2,
  GraduationCap,
  Stethoscope,
  Car,
  Banknote,
  Plane,
  Server,
  Factory,
  ShoppingBag,
  Briefcase,
  HeartPulse,
  Hammer,
};

export function getIndustryIcon(name?: string): LucideIcon {
  if (name && INDUSTRY_ICONS[name]) return INDUSTRY_ICONS[name];
  return Building2;
}

export interface IndustryKpi {
  value: string;
  label: string;
}

export interface IndustryWorkflowStep {
  title: string;
  description: string;
}

export interface IndustryFaq {
  question: string;
  answer: string;
}

export interface IndustryTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface IndustryHeroStat {
  value: string;
  label: string;
}

export interface IndustryItem {
  slug: string;
  name: string;
  icon?: string;
  tagline: string;
  description: string;
  longDescription?: string;
  heroStat?: IndustryHeroStat;
  leadSources?: string[];
  roles?: string[];
  useCases: string[];
  painPoints: string[];
  kpis: IndustryKpi[];
  features: string[];
  workflow?: IndustryWorkflowStep[];
  integrations?: string[];
  testimonial?: IndustryTestimonial;
  faq?: IndustryFaq[];
  ctaLabel?: string;
  ctaHref?: string;
}

export interface IndustriesContent {
  eyebrow: string;
  headline: string;
  subheadline: string;
  items: IndustryItem[];
}

export { INDUSTRIES_DEFAULT as DEFAULT_INDUSTRIES } from "./industriesData";
