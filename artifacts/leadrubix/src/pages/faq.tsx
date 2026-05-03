import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, HelpCircle } from "lucide-react";
import { useSEO } from "@/lib/useSEO";
import { useContent } from "@/lib/useContent";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_FALLBACK_FOR_JSONLD: FaqItem[] = [
  { question: "How long does setup take?", answer: "Most teams are up and running within 10 minutes. The initial setup involves defining your pipeline stages, inviting users, and mapping any custom fields." },
  { question: "Do I need a credit card to start?", answer: "No. You can start your 7-day free trial without a credit card." },
  { question: "Can I import my existing leads from Excel?", answer: "Yes — bulk CSV import lets you ingest thousands of leads at once and map columns to standard or custom fields." },
  { question: "Is there a mobile app?", answer: "The web app is fully mobile-responsive, with FCM push notifications to native mobile clients." },
  { question: "How does Facebook & Instagram Lead Ads integration work?", answer: "We provide a direct webhook endpoint that receives lead events, parses fields, and immediately triggers your rotation rules." },
  { question: "Can I customize the pipeline stages?", answer: "Yes — pipeline stages are fully configurable per organisation." },
  { question: "Is GST included in the listed price?", answer: "No, GST is added at checkout based on your billing state. You can supply your GSTIN for input tax credit." },
  { question: "Do you offer refunds?", answer: "Monthly plans cancel anytime with no refund for the current cycle. Annual plans are refundable on a pro-rated basis within 30 days." },
];

export default function FAQ() {
  const cmsItems = useContent<FaqItem[]>("faq_items", []);
  const flatFaqs: FaqItem[] = cmsItems.length > 0 ? cmsItems : FAQ_FALLBACK_FOR_JSONLD;
  useSEO({
    title: "FAQ — Leads Rubix CRM for India",
    description:
      "Answers to the most common questions about Leads Rubix — pricing, free trial, Facebook Lead Ads, custom fields, roles, security, GST, and more.",
    canonical: "https://leadsrubix.com/faq",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: flatFaqs.slice(0, 30).map((it) => ({
        "@type": "Question",
        name: it.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: it.answer,
        },
      })),
    },
  });
  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        {
          q: "How long does setup take?",
          a: "Most teams are up and running within 10 minutes. The initial setup involves defining your pipeline stages, inviting users, and mapping any custom fields. Our onboarding flow is designed to be frictionless."
        },
        {
          q: "Do I need a credit card to start?",
          a: "No. You can start your 7-day free trial without a credit card. We enforce trial expiry automatically, but you'll have ample time to test the system with your team."
        },
        {
          q: "Can I import my existing leads from Excel?",
          a: "Absolutely. We support bulk CSV imports allowing you to ingest thousands of leads at once. You can map your spreadsheet columns directly to our standard and custom extension fields."
        },
        {
          q: "Is there a mobile app?",
          a: "The web application is fully mobile-responsive for agents on the go. We also integrate with Firebase Cloud Messaging (FCM) to deliver native push notifications directly to mobile clients."
        },
        {
          q: "What does onboarding look like?",
          a: "Our team provides dedicated support during your trial. We assist with Facebook/Instagram webhook configuration, user role setup, and mapping out your automated lead rotation rules."
        }
      ]
    },
    {
      title: "Lead Management",
      questions: [
        {
          q: "How does Facebook & Instagram Lead Ads integration work?",
          a: "We provide a direct webhook endpoint. When a lead submits a form on Facebook or Instagram, the webhook receives the event, parses the 50+ fields, inserts it into MongoDB, and immediately kicks off your lead rotation rules."
        },
        {
          q: "What happens if my agent doesn't respond to a lead?",
          a: "Our automated lead rotation system handles this. You can configure a time window; if a lead isn't contacted within that window, the Bull job queue reassigns it via round-robin to the next available agent, respecting working hours and holidays."
        },
        {
          q: "Can I customize the lead pipeline stages?",
          a: "Yes. While we default to FRESH → CALLBACK → INTERESTED → BOOKED → LOST, these stages are fully configurable per organization to match your exact sales process."
        },
        {
          q: "Can I add custom fields?",
          a: "Yes. Every lead record supports up to 6 custom extension fields (field_one through field_six) where you can define industry-specific data labels for your organization."
        },
        {
          q: "How are duplicate leads handled?",
          a: "We have a configurable 'allowDuplicateLeads' flag per organization. You can choose to strictly block duplicates based on phone/email or allow them if your workflow requires tracking repeat inquiries separately."
        }
      ]
    },
    {
      title: "Pricing & Billing",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We process payments via Razorpay, which supports UPI, all major Credit/Debit Cards, and Net Banking."
        },
        {
          q: "Can I cancel anytime?",
          a: "Yes. Monthly subscriptions can be canceled at any time. For annual plans, we offer pro-rated refunds within the first 30 days."
        },
        {
          q: "Do you offer annual discounts?",
          a: "Yes, annual commitments receive a significant discount compared to month-to-month billing. Contact our sales team for Enterprise volume discounts."
        },
        {
          q: "Is GST included?",
          a: "GST is applied at checkout based on your billing state as per Indian tax regulations. You can provide your GSTIN for input tax credit."
        }
      ]
    },
    {
      title: "Integrations",
      questions: [
        {
          q: "What do you integrate with?",
          a: "Currently, we offer native integrations with Facebook Lead Ads, Instagram Lead Ads, Razorpay, Nodemailer (SMTP), and various SMS gateways. LinkedIn and WhatsApp Business integrations are coming soon."
        },
        {
          q: "Is there an API?",
          a: "Yes. We offer a comprehensive REST API secured by JWT API Tokens, alongside Socket.IO for real-time events. You can manage API tokens directly from your organization settings."
        },
        {
          q: "Do you support WhatsApp?",
          a: "The UI screens for WhatsApp Business integration are already available in the app, and the backend integration is currently in development and launching soon."
        },
        {
          q: "Do you have webhooks?",
          a: "Yes, we support incoming webhooks for lead capture from any third-party source."
        }
      ]
    },
    {
      title: "Roles & Teams",
      questions: [
        {
          q: "What roles do you support?",
          a: "We support 6 distinct roles: Super Admin (cross-org), Organization Admin, Operation Manager, Team Lead, Lead Manager, and Sales Agent. Each role has specific visibility and management permissions."
        },
        {
          q: "Can I restrict an agent to specific branches?",
          a: "Yes. Our branch-level permissions allow you to restrict users so they only see and interact with leads assigned to their specific physical or logical branch."
        },
        {
          q: "How does the reporting hierarchy work?",
          a: "Visibility cascades upwards. A Team Lead sees their own assigned leads plus all leads assigned to any agents reporting to them. Organization Admins see the entire pipeline."
        }
      ]
    },
    {
      title: "Security & Data",
      questions: [
        {
          q: "Where is my data stored?",
          a: "Data is stored in managed, highly available MongoDB Atlas clusters, utilizing Firebase for authentication and secure file storage."
        },
        {
          q: "Are payments secure?",
          a: "Yes. We use Razorpay with strict server-side HMAC-SHA256 signature verification. Payment secrets are never exposed to the frontend browser."
        },
        {
          q: "Are you DPDP compliant?",
          a: "Yes. Leads Rubix complies with the Digital Personal Data Protection Act (DPDP) 2023. You own your data; we are simply the custodian."
        },
        {
          q: "Can I export my data?",
          a: "Yes. Organization Admins can export lead data, call logs, and reports at any time for external analysis or backup."
        }
      ]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">Everything you need to know about using Leads Rubix for your sales team — whatever industry you're in.</p>
        </div>
      </section>

      {/* FAQ Accordions */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {cmsItems.length > 0 ? (
            <div data-testid="faq-cms">
              <h2 className="text-2xl font-bold mb-6">Common questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {cmsItems.map((item, i) => (
                  <AccordionItem key={i} value={`cms-${i}`}>
                    <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed whitespace-pre-wrap">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ) : (
          <div className="flex flex-col gap-16">
            {faqCategories.map((category, idx) => (
              <div key={idx}>
                <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={i} value={`item-${idx}-${i}`}>
                      <AccordionTrigger className="text-left font-semibold text-lg hover:text-primary transition-colors">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-slate-50 border-t text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg text-muted-foreground mb-8">Our team is ready to help you understand how Leads Rubix can fit your specific workflow.</p>
          <Button size="lg" asChild data-testid="btn-faq-contact">
            <Link href="/contact">Talk to us <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
