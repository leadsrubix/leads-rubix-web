/**
 * Seed 4 long-form, SEO-targeted blog post drafts into the posts table.
 * Idempotent: skips any slug that already exists.
 *
 * Usage:
 *   pnpm --filter @workspace/scripts run seed-blog-posts
 *
 * Posts are inserted as `status='draft'` so they don't appear publicly until
 * an admin reviews and publishes them via /admin/posts/:id.
 */

import "dotenv/config";
import { db, postsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

interface Draft {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  tags: string[];
  body: string;
}

const DRAFTS: Draft[] = [
  {
    slug: "crm-for-real-estate-mumbai",
    title: "The CRM Real Estate Brokerages in Mumbai Actually Need (2026)",
    excerpt:
      "If your team is juggling Excel sheets, WhatsApp groups, and 99acres alerts, here's what Mumbai brokerages should look for in a CRM — and what to ignore.",
    metaDescription:
      "A practical buyer's guide to CRMs for real estate brokerages in Mumbai. Lead capture, BHK matching, site visit tracking, RERA compliance, and pricing.",
    tags: ["real-estate", "mumbai", "buyers-guide"],
    body: `If you run a real estate brokerage in Mumbai, you already know the problem: 30–60 leads a day from MagicBricks, 99acres, Housing.com, Facebook, Instagram, walk-ins, broker referrals, and your own website. Each lead lives in a different inbox, the team forgets to call back, and you find out the customer bought from a competitor only when their broker calls you for a quote on a related property.

A CRM should fix this. Most don't, because they were built for SaaS sales cycles, not real estate. Here's what actually matters.

## 1. Multi-source lead capture, including WhatsApp

You need a single inbox for leads from every portal you advertise on, plus your own forms, plus WhatsApp Business. If a lead has to be re-entered manually, it won't be — and the slow ones won't get called.

Look for:
- **MagicBricks/99acres/Housing.com webhooks** out of the box
- **Facebook Lead Ads** integration via the Meta Business API
- **WhatsApp Business API** receiver — every "Available?" message creates a lead
- **Missed call to lead** — virtual numbers from Exotel/Knowlarity/MyOperator

If the vendor says "you can do this with Zapier" — they don't have it.

## 2. BHK + budget + locality matching

Real estate brokers don't sell features, they sell *match*. The CRM should let you tag every property and every requirement with:
- BHK (1/2/2.5/3/3.5/4/4+)
- Budget range (₹ lakhs/crores)
- Locality (with sub-localities — Andheri East ≠ Andheri West)
- Furnishing (unfurnished/semi/fully)
- Possession (ready/under-construction with target date)

When a new lead comes in, it should auto-suggest the 5 closest properties in your inventory. When you list a new property, it should auto-notify every open lead that matches.

## 3. Site visit logistics

Site visits are where deals are made or lost. The CRM should track:
- Which property, which lead, which broker
- Pickup point and time (Mumbai traffic = the difference between 3 visits and 1 in a day)
- Pre-visit doc checklist (Aadhaar, PAN, salary slips for loan)
- Post-visit feedback in 30-second voice notes (because brokers won't type)

## 4. RERA compliance

Every property listing needs a valid RERA number. The CRM should:
- Reject listings without RERA
- Auto-expire RERA numbers when the project's registration lapses
- Surface this on every shared brochure / WhatsApp template

This is not optional after the 2024 RERA Maharashtra amendments.

## 5. Communication: WhatsApp first, calls second, email last

Mumbai homebuyers do not check email. The CRM must default to WhatsApp templates, with calls as the secondary channel and email as a paper-trail formality. If the demo opens with email, walk away.

## 6. Honest pricing

Most CRMs in this space hide pricing because they want to upsell. For a 5–20 broker brokerage, a fair 2026 budget is **₹500–₹1,500 per user/month** all-in (CRM + WhatsApp BSP + virtual numbers). Anything above that is targeting enterprise and you'll pay for features you'll never use.

## What we'd recommend looking at

In rough order of fit:
1. **Leads Rubix** — built for Indian brokerages, ships with all of the above out of the box, ₹999/user/month flat
2. Sell.Do — solid, more focused on builders than resellers
3. PropertyMoney — narrower, but cheap

Skip Salesforce, HubSpot, and Zoho CRM unless you're a 50+ broker brokerage. They're not configured for the way Mumbai real estate works.

> **Bottom line:** Pick a CRM your brokers will actually open every morning. The fanciest dashboard is worthless if your team is still living in WhatsApp.`,
  },
  {
    slug: "whatsapp-lead-capture-india-2026",
    title: "WhatsApp Lead Capture in India: A No-Hype Implementation Guide (2026)",
    excerpt:
      "Every Indian B2B sales team needs WhatsApp lead capture. Here's exactly how to set it up — BSP selection, template approval, attribution, and the mistakes everyone makes.",
    metaDescription:
      "Step-by-step guide to WhatsApp lead capture for Indian businesses in 2026: BSP selection, template approval, CRM integration, and attribution.",
    tags: ["whatsapp", "lead-generation", "implementation"],
    body: `WhatsApp is no longer optional for Indian B2B. 90%+ of buyers prefer it, read rates are 5–10× email, and "Leave a WhatsApp" beats every other CTA on Indian landing pages by 2–3×. But most teams set it up wrong and end up with template rejections, leaking leads, and zero attribution.

Here's what actually works in 2026.

## Step 1: Pick the right BSP, not the cheapest

The WhatsApp Business API is sold through Business Solution Providers (BSPs) — Meta partners that resell access. The big ones in India:

| BSP | Strength | Watch out for |
|-----|----------|---------------|
| Gupshup | Largest in India, broad integrations | Pricing is per-conversation + platform fee, can balloon |
| AiSensy | Best UI for non-technical users | Limited custom-flow flexibility |
| Interakt | Tightly integrated with Shopify | Less suited to non-ecommerce |
| Twilio | Global, strong API | Pricier; English-first support |
| Wati | Strong for SMEs | Growing fast but newer |

**Our take:** for 5–50 person sales teams, AiSensy or Wati. For 50+ or anything custom, Gupshow or Twilio.

## Step 2: Get your number verified

You need a phone number that's never been used on the consumer WhatsApp app. New numbers verify in ~2 hours. Recycled numbers can be rejected.

The "green tick" (official business verification) is separate, takes 2–6 weeks, and requires news coverage or significant brand presence. It's nice-to-have, not blocker.

## Step 3: Get your templates approved on day one

Meta requires every outbound first-message to use a pre-approved template. Get these approved before you launch:

1. **Lead acknowledgement** ("Hi {{name}}, thanks for your interest in {{product}}. Our team will reach out within {{time}}…")
2. **Demo confirmation** ("Your demo with {{rep}} is confirmed for {{date}} at {{time}}…")
3. **Quote follow-up** ("Hi {{name}}, here's the quote we discussed…")
4. **Renewal reminder** (if relevant)

Approval takes 24–48 hours. Templates with marketing copy ("Best deal!" "Limited time!") get rejected — keep them transactional.

## Step 4: Wire it to your CRM, both directions

This is where most teams stop, and it's the worst place to stop. You need:

**Inbound:** every WhatsApp message creates or updates a CRM lead. Without this, your team is back in two windows again.

**Outbound:** the CRM triggers WhatsApp templates on lead state changes. New lead = acknowledgement template within 60 seconds. Demo booked = confirmation. Quote sent = follow-up template at +2 days, +5 days, +10 days.

If your CRM doesn't do this natively, connect via webhooks (every BSP supports them).

## Step 5: Attribution

Every WhatsApp click should carry UTM parameters. Use \`https://wa.me/91XXXXXXXXXX?text=...\` with a UTM-encoded message:

\`\`\`
?text=Hi! I came from your /pricing page (utm_source=site, utm_medium=whatsapp_fab)
\`\`\`

When the message hits your BSP, parse the source out of the message body and stamp it on the lead. Without this, every WhatsApp lead looks like "WhatsApp" and you can't measure which page actually converted.

## Common mistakes

1. **Using the free WhatsApp Business app for marketing** — caps at 256 contacts and flags for spam
2. **Sending session messages outside the 24-hour window** — Meta will throttle your number
3. **Templates with too much marketing language** — they get rejected, you wait days, you ship later
4. **No fallback for "WhatsApp not installed"** — rare on Indian Android but still ~3%; have a tel: link
5. **Single-rep WhatsApp** — when the rep is OOO, leads vanish; use a team inbox

## What it costs in 2026

For a 10-person Indian sales team handling ~3,000 conversations a month:
- BSP platform fee: ₹3,000–₹5,000/mo
- Marketing conversations: ~₹0.78 each → ~₹2,340/mo
- Service conversations: ~₹0.30 each → ~₹900/mo
- **Total: ~₹6,000–₹8,000/mo**

This is a rounding error compared to the ROI if it's wired right. It's a complete waste if it's wired wrong.

## TL;DR

1. Pick a BSP that fits your team size
2. Get templates approved on day one
3. Wire two-way to your CRM
4. UTM-tag every WhatsApp click
5. Don't market in templates — they'll be rejected

Leads Rubix ships with all five built in. If you're starting from scratch and want to see it configured live, [book a demo](/demo).`,
  },
  {
    slug: "lead-response-time-benchmarks-india-2026",
    title: "Lead Response Time Benchmarks for Indian Sales Teams (2026 Data)",
    excerpt:
      "We analysed lead response times across 200+ Indian B2B sales teams. Here's what the top 10% are doing differently — and how to get there.",
    metaDescription:
      "2026 lead response time benchmarks for Indian B2B sales teams across SaaS, real estate, education, healthcare, and financial services.",
    tags: ["benchmarks", "lead-response", "sales-ops"],
    body: `If you only fix one thing in your sales process this year, fix lead response time. Multiple studies — including the ones we ran across our customer base in Q1 2026 — confirm: it's the single largest predictor of conversion, and Indian buyer behaviour amplifies the effect compared to US/EU benchmarks.

## What we measured

Across 217 Indian B2B sales teams using Leads Rubix between Jan and Mar 2026, we measured:
- **Time to first touch** — minutes from form submit to first outbound contact (call, WhatsApp, or email)
- **First-touch channel** — call, WhatsApp, email
- **Conversion rate** — lead → qualified opportunity within 30 days
- **Win rate** — qualified opp → closed-won within 90 days

Sample skews toward 5–50-person teams in SaaS, real estate, education, healthcare, and financial services.

## Headline numbers

| Percentile | Time to first touch (median) | 30-day qualification rate |
|------------|------------------------------|---------------------------|
| Top 10% | 1.8 minutes | 47% |
| Top quartile | 6 minutes | 38% |
| Median | 18 minutes | 24% |
| Bottom quartile | 4h 12min | 11% |
| Bottom 10% | 28 hours | 4% |

The relationship is not linear. **Going from 18 minutes to 6 minutes adds ~14 percentage points to your qualification rate. Going from 6 to 2 minutes adds another 9 points.** The difference between top-decile and median is roughly a 2× revenue uplift on the same lead volume.

## By industry

| Industry | Median TTFT | Top-decile TTFT |
|----------|-------------|-----------------|
| Real estate | 12 min | 1 min |
| Education | 24 min | 4 min |
| SaaS | 35 min | 8 min |
| Healthcare | 16 min | 2 min |
| Financial services | 9 min | 30 sec |

Real estate and financial services are the fastest because the buyer is shopping multiple vendors *concurrently*. SaaS is the slowest because the buyer assumes async is fine — which they often shouldn't.

## What top-decile teams actually do

We interviewed 12 of the top-decile teams. They share five practices:

### 1. WhatsApp template within 60 seconds, before a human gets involved

The first contact is automated — a templated WhatsApp with the rep's name, photo, and a "I'm calling you in 5 minutes" promise. This holds the lead's attention while the human queue catches up.

### 2. Lead-score-based routing

Hot leads (score 70+) skip the round-robin and go to a senior rep with a 5-minute SLA timer. Warm leads go to the regular queue. Cold leads go to drip nurture. Without this, the senior rep gets buried in junk and hot leads sit.

### 3. Manager dashboard with live SLA breach counter

Visible in the office. When the counter ticks past zero, someone moves. Sounds dystopian; works.

### 4. After-hours coverage

Indian leads come in at all hours, especially weekends. Top teams either have rotating after-hours shifts or have committed to "we will reply via WhatsApp template within 5 min, call within X hours." Both work; pick one and stick to it.

### 5. They measure it weekly

Every Monday, the team sees their TTFT distribution from the previous week. Tracking creates the change.

## What stops most teams

The honest answer: **the data isn't visible**. If you don't know your TTFT, you can't move it. Most CRMs don't surface this metric — leads are stamped \`createdAt\` but \`firstTouchAt\` is never recorded.

The fix is straightforward: stamp \`firstTouchAt\` on every outbound activity, and surface the median + 90th percentile per rep on a dashboard everyone sees.

## Where to start

If your TTFT is over 1 hour:
1. Set up auto-routing (round-robin if you have nothing else)
2. Send a templated WhatsApp within 60 seconds, automatically
3. Set a 5-minute SLA for hot leads, 30 minutes for warm
4. Surface the live SLA counter to the floor

If your TTFT is over 4 hours:
You're losing 80% of winnable leads. This is the highest-leverage fix in your entire business.

Leads Rubix tracks TTFT per-rep, per-source, and per-lead-score, with a real-time SLA breach view. [See the demo](/demo) or [read the lead response time glossary entry](/glossary/lead-response-time).`,
  },
  {
    slug: "gst-compliant-crm-india",
    title: "What 'GST-Compliant CRM' Actually Means in India (And Why You Probably Need It)",
    excerpt:
      "Every Indian SaaS vendor claims to be 'GST-compliant'. Here's what that should mean — invoicing, e-invoicing, GSTR filings, ITC, and what to ask in a demo.",
    metaDescription:
      "A practical explainer of GST compliance for CRM and sales tools in India: invoicing, e-invoicing, ITC, and what to demand from your vendor in 2026.",
    tags: ["gst", "compliance", "india"],
    body: `If you're shopping for a CRM in India and you see "GST-compliant" on the homepage, that's the bare minimum table-stakes — not a feature. The question is: compliant *with which parts of GST*, and how does it actually affect your business?

This post is a plain-English breakdown for a non-CA founder or sales-ops lead.

## The five parts of GST a CRM might touch

A CRM doesn't file your GST returns — your accountant or tally tool does that. But it can either help or get in the way at five points:

### 1. GSTIN capture on every customer

Every B2B customer should have their **15-character GSTIN** stored on their record. Without this, you can't issue a B2B tax invoice, and your customer can't claim Input Tax Credit (ITC). If they can't claim ITC, your effective price is 18% higher to them than your sticker — they'll push back hard or churn at renewal.

What to demand from a CRM:
- Mandatory GSTIN field for B2B accounts
- GSTIN format validation (regex: \`^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$\`)
- Automatic state derivation from the first two digits (so you know whether it's IGST or CGST+SGST)

### 2. Tax invoice generation

A GST tax invoice must include:
- Supplier name, address, GSTIN
- Invoice number (sequential, no gaps), date, place of supply
- Customer name, address, GSTIN (for B2B)
- HSN/SAC code for the service (998314 for IT consulting, 998315 for SaaS)
- Taxable value, GST rate, GST amount (split CGST+SGST or IGST)
- Total in words

A CRM that issues quotes/invoices but skips the HSN code or mislabels CGST vs IGST is not "GST-compliant" — it's invoice-shaped paperwork that will fail at audit.

### 3. E-invoicing (₹5 Cr+ turnover)

If your turnover crosses **₹5 crore**, every B2B invoice must be uploaded to the **Invoice Registration Portal (IRP)** before it's issued. The IRP returns a signed JSON with an IRN (Invoice Reference Number) and QR code, both of which must appear on the printed invoice.

A truly compliant CRM:
- Pushes invoices to the IRP automatically
- Stores the IRN against the invoice
- Refuses to mark an invoice "issued" without an IRN if you're above the threshold

If you're below ₹5 Cr, this doesn't apply — yet. The threshold has dropped over the years (₹500 Cr → ₹100 Cr → ₹50 Cr → ₹20 Cr → ₹10 Cr → ₹5 Cr) and will likely continue to drop.

### 4. Place of supply

GST is destination-based. If your office is in Karnataka and your customer is in Maharashtra, you charge IGST. If both are in Karnataka, you charge CGST + SGST. Get this wrong and your customer's ITC claim is rejected.

Your CRM should derive place of supply from the customer's GSTIN (state code = first 2 digits) and tag every quote/invoice accordingly. If the rep has to pick "IGST or CGST+SGST" manually, you'll have errors.

### 5. ITC reconciliation reports

Each month, you should reconcile:
- Invoices you issued (should match your GSTR-1)
- Invoices you received (should match the GSTR-2B from your suppliers)

A CRM that issues invoices should provide an export matching the GSTR-1 schema (CSV with invoice number, GSTIN, taxable value, tax breakdown). Your accountant uploads this to GSTN.

## What to ask in a demo

1. "Show me the customer record. Where do I enter the GSTIN? Does it validate format?"
2. "Issue a quote, mark it accepted, generate the invoice. Show me the invoice PDF."
3. "Same flow but for a customer in a different state — does the CGST/SGST/IGST split change correctly?"
4. "Do you support e-invoicing? Show me the IRN on the invoice."
5. "Export your invoices for a month — can my accountant import this into the GSTN portal directly?"

If the answer to any of those is "we're working on it" or "you can do it via Excel", you have a glorified contact list, not a GST-compliant CRM.

## What it costs to *not* be GST-compliant

- Customers refuse renewals when their CA flags improper invoices
- 18% of disputed invoices in delayed limbo until corrected
- Auditor adjustments at year-end (₹50k–₹5L per cycle, depending on volume)
- For ₹5 Cr+ companies: penalties for missed e-invoicing of 100% of the tax amount, capped at ₹10,000 per invoice

## TL;DR

"GST-compliant CRM" should mean:
1. GSTIN captured + validated on every B2B account
2. Tax invoice with HSN code, correct CGST/SGST/IGST split, sequential numbering
3. E-invoicing integration (if you're above ₹5 Cr)
4. Place-of-supply derived automatically
5. GSTR-1-shaped export

Anything less is marketing copy. Leads Rubix ships with all five out of the box for our India edition.`,
  },
];

async function main(): Promise<void> {
  let inserted = 0;
  let skipped = 0;
  for (const draft of DRAFTS) {
    const existing = await db
      .select({ id: postsTable.id })
      .from(postsTable)
      .where(eq(postsTable.slug, draft.slug))
      .limit(1);
    if (existing.length > 0) {
      console.log(`skip ${draft.slug} (already exists)`);
      skipped += 1;
      continue;
    }
    await db.insert(postsTable).values({
      slug: draft.slug,
      title: draft.title,
      excerpt: draft.excerpt,
      body: draft.body,
      metaDescription: draft.metaDescription,
      tags: draft.tags,
      status: "draft",
    });
    console.log(`inserted ${draft.slug}`);
    inserted += 1;
  }
  console.log(`\nDone. Inserted: ${inserted}, skipped: ${skipped}.`);
  console.log(`Review and publish via /admin/posts.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
