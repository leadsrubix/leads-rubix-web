import type { IndustriesContent, IndustryItem } from "@/lib/industryIcons";

export const INDUSTRIES_DEFAULT: IndustriesContent = {
  eyebrow: "Built for every industry",
  headline: "One CRM. Every team that sells.",
  subheadline:
    "Leads Rubix adapts to the way your industry sells — from real estate site visits to SaaS demos to clinic appointments. Pick your vertical to see how teams like yours win with Leads Rubix.",
  items: [
    {
      slug: "real-estate",
      name: "Real Estate",
      icon: "Building2",
      tagline: "Capture every property enquiry. Close more bookings.",
      description:
        "From Facebook lead ads and 99acres to walk-ins and channel partners — capture every enquiry, route it to the right agent in seconds, and track every site visit through booking and registration.",
      longDescription:
        "Real estate sales lives or dies on speed. The first agent to call back wins the deal — and most teams lose 40% of their leads to slow follow-up alone. Leads Rubix is purpose-built for Indian developers, brokerages and channel partners. We connect to every source you advertise on, route enquiries by language and project preference, and track every interaction from first call through site visit, booking, agreement, and possession. No more lost WhatsApp leads. No more attribution disputes. No more agents managing pipelines on paper.",
      heroStat: { value: "<60s", label: "average first-call response time" },
      leadSources: [
        "Facebook & Instagram Lead Ads",
        "Google Ads & Display",
        "MagicBricks, 99acres, Housing.com",
        "Channel partner referrals",
        "Website forms & WhatsApp clicks",
        "Walk-ins at site office",
      ],
      roles: [
        "Sales Head",
        "Pre-sales callers",
        "Closing managers",
        "Channel partner manager",
        "CRM admin",
      ],
      useCases: [
        "Auto-capture leads from Facebook, Instagram, MagicBricks, 99acres and Housing.com",
        "Round-robin distribution to agents based on language, project, or working hours",
        "Site-visit scheduling with GPS-verified check-ins",
        "Booking module with token, agreement, registration and possession tracking",
        "Razorpay-backed token payments with auto-generated GST invoices",
        "Channel partner portal with login, lead submission and commission tracking",
        "WhatsApp Business API for two-way conversations from inside the CRM",
      ],
      painPoints: [
        "Leads lost in WhatsApp groups and personal phones",
        "Channel partner attribution disputes between sales reps",
        "Agents skipping site-visit logs — no way to coach them",
        "No visibility into which projects or sources are actually closing",
        "Bookings managed in Excel, payments reconciled manually",
      ],
      kpis: [
        { value: "60%", label: "faster first-touch" },
        { value: "3.2x", label: "site-visits per lead" },
        { value: "27%", label: "more bookings closed" },
      ],
      features: [
        "Project & inventory pipelines",
        "Channel partner portal",
        "Booking & possession workflow",
        "GPS-verified site visits",
        "Razorpay token payments + GST invoices",
        "WhatsApp Business inbox",
      ],
      workflow: [
        {
          title: "Capture every enquiry",
          description:
            "Connect Facebook, Google, 99acres, MagicBricks and Housing.com. Every form-fill, click and call lands in Leads Rubix in seconds with the source, campaign and project tagged.",
        },
        {
          title: "Auto-route to the right agent",
          description:
            "Distribute by project preference, language, budget or working hours. Lead-not-touched alerts fire after 5 minutes so nothing slips through.",
        },
        {
          title: "Schedule and verify site visits",
          description:
            "Agents schedule slots from the CRM, customers get WhatsApp reminders, and GPS check-in confirms the agent actually showed up.",
        },
        {
          title: "Close, collect token, and track to possession",
          description:
            "Move from interested → booked → agreement → registration. Razorpay handles the token, the system auto-generates the GST invoice and tracks every milestone to possession.",
        },
      ],
      integrations: [
        "Facebook Lead Ads",
        "MagicBricks",
        "99acres",
        "Housing.com",
        "Razorpay",
        "WhatsApp Business API",
        "Google Ads",
        "Tally / Zoho Books",
      ],
      testimonial: {
        quote:
          "We used to lose 30% of our enquiries because no agent picked up the call in time. With Leads Rubix's auto-routing and 5-minute alerts, our first-touch is now under a minute. Bookings up 27% in two quarters.",
        author: "Rohan Mehta",
        role: "VP Sales",
        company: "Mid-size Mumbai developer (3,000-unit portfolio)",
      },
      faq: [
        {
          question: "Will it work for both new launches and resale?",
          answer:
            "Yes. Use project-wise pipelines for new launches and a separate resale pipeline for secondary inventory. Each has its own stages, fields and routing rules.",
        },
        {
          question: "How are channel partner leads attributed?",
          answer:
            "Channel partners get their own login, submit leads through a portal, and every lead is automatically tagged to the partner. Commission tracking, payouts and disputes are handled inside the CRM with a full audit trail.",
        },
        {
          question: "Can I take token payments from the CRM?",
          answer:
            "Yes — Razorpay is built in. Generate a payment link from any lead, and once paid the system creates a GST invoice and moves the lead to 'Booked' automatically.",
        },
        {
          question: "Does it work on mobile for field agents?",
          answer:
            "Fully. Agents check in to site visits with GPS, log notes by voice, send WhatsApp messages and update bookings — all from their phone.",
        },
      ],
      ctaLabel: "See real-estate playbook",
      ctaHref: "/demo",
    },
    {
      slug: "education",
      name: "Education & EdTech",
      icon: "GraduationCap",
      tagline: "From enquiry to enrolment, without losing a single applicant.",
      description:
        "Universities, coaching institutes and EdTech companies use Leads Rubix to manage admissions enquiries, counsellor productivity, and the full applicant journey from form-fill to fee payment.",
      longDescription:
        "Admissions cycles are short, intense, and unforgiving. A counsellor who calls in 2 minutes converts 3x better than one who calls in 2 hours — and most institutions don't even know which counsellors are slow. Leads Rubix gives admissions heads complete visibility into every enquiry, from the moment a prospective student fills your enquiry form to the moment they pay their fees. Auto-route by program, automate the calling cadence, and track each applicant through interview and offer to enrolment.",
      heroStat: { value: "2.4x", label: "enquiry-to-application conversion" },
      leadSources: [
        "Website enquiry forms",
        "Meta lead ads (Facebook & Instagram)",
        "Education aggregators (Shiksha, Collegedunia)",
        "Webinar and event sign-ups",
        "Referrals from current students",
        "Walk-ins at campus",
      ],
      roles: [
        "Admissions Director",
        "Counsellors & telecallers",
        "Program coordinators",
        "Finance / fee collection team",
      ],
      useCases: [
        "Capture admission enquiries from website forms, Meta lead ads and education aggregators",
        "Auto-route by program, campus or course preference",
        "Counsellor calling cadence with course-aware scripts",
        "Application status tracking — enquiry → application → interview → offer → enrolment",
        "Fee collection workflow with payment links and receipts",
        "Webinar and open-house attendee follow-up automation",
        "Scholarship and education-loan partner workflows",
      ],
      painPoints: [
        "Drop-offs between enquiry and counsellor follow-up",
        "No single view of applicant across multiple programs",
        "Manual reconciliation of fee payments",
        "Counsellor productivity is invisible — no idea who's actually dialling",
        "Webinar attendees disappear after the event",
      ],
      kpis: [
        { value: "2.4x", label: "enquiry-to-application" },
        { value: "45%", label: "faster counsellor response" },
        { value: "18%", label: "higher enrolment rate" },
      ],
      features: [
        "Program-wise pipelines",
        "Counsellor performance dashboards",
        "Applicant document tracking",
        "Calling cadence automation",
        "Fee links + receipts",
        "Webinar attendee sync",
      ],
      workflow: [
        {
          title: "Centralise every enquiry",
          description:
            "Pull enquiries from your website, Meta ads, Shiksha, Collegedunia and webinars into one inbox — no more spreadsheets per source.",
        },
        {
          title: "Match to the right counsellor",
          description:
            "Route by program, campus or language. New leads land with the counsellor who knows the course, with course-specific scripts ready.",
        },
        {
          title: "Run the calling cadence",
          description:
            "Day 1: introductory call. Day 2: follow-up email. Day 4: WhatsApp nudge. Day 7: final reminder. The system schedules every touch and flags drop-offs.",
        },
        {
          title: "Track to enrolment and fee payment",
          description:
            "Applicants flow through application → interview → offer → enrolment. Generate fee payment links from the CRM, log receipts and report on funnel conversion by program.",
        },
      ],
      integrations: [
        "Meta Lead Ads",
        "Google Ads",
        "Shiksha & Collegedunia",
        "Razorpay & PayU",
        "Zoom / Google Meet",
        "WhatsApp Business API",
        "Email (SES, SendGrid)",
      ],
      testimonial: {
        quote:
          "We added 1,400 applications to our intake without adding counsellors. The cadence automation does what 4 callers used to do, and the dashboard finally tells me who's converting and who isn't.",
        author: "Dr. Anita Rao",
        role: "Director of Admissions",
        company: "Tier-1 management institute, Pune",
      },
      faq: [
        {
          question: "Can we run separate intakes for different programs?",
          answer:
            "Yes — each program has its own pipeline, fields, and counsellor team. You can run undergraduate, graduate and executive intakes in parallel without them mixing.",
        },
        {
          question: "How does it handle the application document checklist?",
          answer:
            "Each application carries a configurable checklist (10th, 12th, statement of purpose, work-ex letters, etc). Applicants get a portal link to upload, and counsellors see status in real time.",
        },
        {
          question: "Does it integrate with our exam / scholarship platform?",
          answer:
            "Most platforms expose APIs and we offer a REST/webhook integration. We've connected to entrance-exam vendors, education-loan partners and scholarship providers in past deployments.",
        },
        {
          question: "Can counsellors call from inside the CRM?",
          answer:
            "Yes — click-to-call with auto-logging and recording, plus WhatsApp templates and email cadences are all built in.",
        },
      ],
      ctaLabel: "See education playbook",
      ctaHref: "/demo",
    },
    {
      slug: "healthcare",
      name: "Healthcare & Clinics",
      icon: "Stethoscope",
      tagline: "Every patient enquiry answered. Every appointment kept.",
      description:
        "Hospitals, multi-specialty clinics and aesthetic centres use Leads Rubix to manage patient enquiries, appointment booking, treatment packages and follow-up cycles — while staying patient-data conscious.",
      longDescription:
        "Patients today shop for healthcare like they shop for everything else — comparing options, reading reviews, and expecting an instant response. Whether it's a dental package, a fertility consultation or a knee-replacement second opinion, the clinic that responds first wins the patient. Leads Rubix gives healthcare teams a HIPAA-conscious workflow to capture enquiries from Practo, Justdial, ads and walk-ins, schedule appointments around real doctor availability, and run structured follow-ups for elective procedures and chronic care.",
      heroStat: { value: "55%", label: "fewer no-shows" },
      leadSources: [
        "Practo, Justdial, Lybrate",
        "Google Ads & call ads",
        "Website chat and forms",
        "Walk-ins and referrals",
        "Insurance / TPA partners",
      ],
      roles: [
        "Patient relationship managers",
        "Front-desk & appointments team",
        "Treatment counsellors",
        "Department heads",
      ],
      useCases: [
        "Capture enquiries from Practo, Justdial, website chat and call ads",
        "Appointment scheduling with doctor availability sync",
        "Treatment-package nurturing for elective procedures",
        "Follow-up reminders for chronic care and post-op",
        "Patient consent and record handling with role-based access",
        "Treatment package quotes and discount approvals",
        "Insurance / TPA pre-authorisation tracking",
      ],
      painPoints: [
        "Missed appointments from late follow-ups",
        "Patient enquiries scattered across phone, WhatsApp and email",
        "No visibility into counsellor-to-doctor handoff",
        "Elective-procedure leads go cold without nurture",
        "Compliance risk from undocumented patient communication",
      ],
      kpis: [
        { value: "55%", label: "fewer missed appointments" },
        { value: "2.1x", label: "package conversions" },
        { value: "40%", label: "faster enquiry response" },
      ],
      features: [
        "Doctor & department pipelines",
        "Appointment + reminders",
        "Role-based access for patient data",
        "Package & quote builder",
        "Consent & document storage",
        "TPA pre-auth tracking",
      ],
      workflow: [
        {
          title: "Capture from every patient channel",
          description:
            "Practo, Justdial, Google call ads, website chat and walk-ins all flow into one queue, tagged by department and source.",
        },
        {
          title: "Book against real doctor calendars",
          description:
            "The CRM syncs with doctor schedules so the front desk only offers slots that are actually available, with WhatsApp confirmations sent automatically.",
        },
        {
          title: "Nurture elective procedures",
          description:
            "Cosmetic, dental, fertility and ortho leads flow into a structured nurture sequence with package quotes, financing options and consult bookings.",
        },
        {
          title: "Follow up post-visit",
          description:
            "Reminders for chronic care, post-op check-ins and review prompts keep patients engaged and improve outcomes.",
        },
      ],
      integrations: [
        "Practo",
        "Justdial",
        "WhatsApp Business API",
        "HIS / EMR systems (REST)",
        "Razorpay",
        "TPA portals",
        "Google Calendar",
      ],
      testimonial: {
        quote:
          "Our IVF enquiry-to-consult rate doubled. The structured nurture for high-ticket procedures is what changed it — patients get the information they need, when they need it, without our counsellors burning out.",
        author: "Dr. Meera Iyer",
        role: "Clinical Director",
        company: "Multi-specialty clinic chain (12 centres)",
      },
      faq: [
        {
          question: "How do you handle patient privacy?",
          answer:
            "Role-based access ensures only authorised staff see clinical notes. Patient communication is logged for audit, and data residency can be configured to keep records in India.",
        },
        {
          question: "Can it integrate with our HIS or EMR?",
          answer:
            "Yes via REST APIs and webhooks. Common integrations include appointment sync, patient demographics and discharge summary triggers.",
        },
        {
          question: "Does it handle multi-location clinics?",
          answer:
            "Built for it. Each centre has its own queue, its own doctors, its own KPIs — and HQ sees a roll-up view across the chain.",
        },
        {
          question: "Can patients book themselves?",
          answer:
            "Yes — embed the booking widget on your website, or share a link via WhatsApp. Self-booked appointments land directly in the CRM and the doctor's calendar.",
        },
      ],
      ctaLabel: "See healthcare playbook",
      ctaHref: "/demo",
    },
    {
      slug: "automotive",
      name: "Automotive & Dealerships",
      icon: "Car",
      tagline: "Showroom visits to test drives to deliveries — tracked end-to-end.",
      description:
        "Car, two-wheeler and commercial-vehicle dealerships use Leads Rubix to manage walk-ins, online enquiries, test-drive scheduling, finance handoffs and delivery follow-up.",
      longDescription:
        "Dealership sales is a team sport — sales consultants, test-drive coordinators, finance partners and delivery teams all touch the customer. Leads Rubix is the single workspace that ties them together. From the moment someone clicks an OEM portal ad to the moment they drive their new car off the lot, every interaction is captured, every handoff is logged, and every lost lead has a reason. Result: shorter sales cycles, higher accessory attach rates, and dealer principals who finally know what their team is doing.",
      heroStat: { value: "35%", label: "more test drives completed" },
      leadSources: [
        "OEM portals (Maruti, Tata, Hyundai)",
        "Cars24, CarDekho, CarWale",
        "Showroom walk-ins",
        "Used-car aggregators",
        "Service-to-sales referrals",
      ],
      roles: [
        "Sales consultants",
        "Test-drive coordinators",
        "Finance & insurance manager",
        "Delivery team",
        "Dealer principal",
      ],
      useCases: [
        "Capture leads from Cars24, CarDekho, OEM portals and showroom walk-ins",
        "Test-drive scheduling with calendar slots and reminder SMS",
        "Variant & accessory upsell tracking",
        "Finance & insurance partner handoffs",
        "Delivery, registration and post-sale survey workflows",
        "Service-to-sales lead farming",
        "Used-car valuation and exchange tracking",
      ],
      painPoints: [
        "Test-drive no-shows from late confirmations",
        "Lost cross-sell opportunities for accessories and finance",
        "No view of dealer rep productivity",
        "Used-car exchanges handled on paper",
        "Service customers never re-targeted for upgrades",
      ],
      kpis: [
        { value: "35%", label: "more test drives completed" },
        { value: "22%", label: "higher accessory attach" },
        { value: "50%", label: "faster lead response" },
      ],
      features: [
        "Variant & inventory pipelines",
        "Test-drive scheduler",
        "Finance partner integrations",
        "Accessory & upsell tracking",
        "Delivery checklist",
        "Service-to-sales nurture",
      ],
      workflow: [
        {
          title: "Single inbox for every channel",
          description:
            "OEM portals, Cars24, CarDekho, walk-ins and call ads all flow into one queue, tagged by model interest and finance need.",
        },
        {
          title: "Schedule test drives that actually happen",
          description:
            "Slots tied to consultant availability, SMS + WhatsApp reminders, and a 24-hour pre-confirmation reduces no-shows by a third.",
        },
        {
          title: "Coordinate finance and exchange",
          description:
            "Hand off to your finance manager and used-car evaluator from inside the lead, with status tracked and SLA timers.",
        },
        {
          title: "Deliver, follow up, repeat",
          description:
            "Delivery checklist, NPS survey post-handover, and a 90-day service nurture so the customer comes back for the upgrade in 4 years.",
        },
      ],
      integrations: [
        "OEM dealer portals",
        "Cars24 & CarDekho",
        "Bank & NBFC finance APIs",
        "WhatsApp Business API",
        "DMS systems",
        "SMS gateways",
      ],
      testimonial: {
        quote:
          "We finally know which consultants close and which ones leak leads. Test-drive completion is up 35% and accessory attach has never been higher. The dealer principal looks at one dashboard, every morning.",
        author: "Pranav Shah",
        role: "General Manager",
        company: "Multi-brand dealership group, Gujarat",
      },
      faq: [
        {
          question: "Can it handle multiple brands at one dealer group?",
          answer:
            "Yes. Each brand has its own pipeline, KPIs and consultant team — and the group dashboard rolls them all up.",
        },
        {
          question: "Does it integrate with the OEM DMS?",
          answer:
            "We support REST integrations with most major OEM dealer management systems for inventory, pricing and bookings sync.",
        },
        {
          question: "How do exchanges and used-car valuations work?",
          answer:
            "Each lead can carry an exchange vehicle with photos, valuation and approval workflow. The used-car team gets a clean handoff.",
        },
        {
          question: "Can it re-target old service customers for new sales?",
          answer:
            "Yes — a service-to-sales nurture surfaces customers whose vehicles are 3-4 years old and seeds them into your sales pipeline automatically.",
        },
      ],
      ctaLabel: "See automotive playbook",
      ctaHref: "/demo",
    },
    {
      slug: "financial-services",
      name: "Banking & Financial Services",
      icon: "Banknote",
      tagline: "Compliant, audit-ready lead flow for loans, insurance and wealth.",
      description:
        "NBFCs, insurance brokers, wealth managers and fintechs use Leads Rubix to capture loan/policy enquiries, run KYC handoffs, and manage advisor productivity — with full audit trail.",
      longDescription:
        "Financial services lives under a microscope. Every advisor conversation, every quote, every consent — all of it has to be auditable, all the time. Leads Rubix gives BFSI teams the speed of a modern CRM with the compliance posture regulators expect. Capture loan and policy enquiries from any channel, route to the right advisor by product, run KYC checklists with SLA timers, and produce a full audit log of every state change for IRDAI, RBI or internal review.",
      heroStat: { value: "100%", label: "audit-trail coverage" },
      leadSources: [
        "Website calculators (EMI, premium, SIP)",
        "Aggregators (BankBazaar, PolicyBazaar, Paisabazaar)",
        "Branch walk-ins",
        "Call ads",
        "Existing customer cross-sell",
      ],
      roles: [
        "Relationship managers",
        "Advisors & agents",
        "Underwriters",
        "Compliance officer",
        "Branch managers",
      ],
      useCases: [
        "Capture leads from website calculators, partner aggregators and call ads",
        "Auto-assign by product (home loan, personal loan, term insurance, mutual fund)",
        "KYC document checklist tracking",
        "Underwriter / branch handoffs with SLA timers",
        "Audit trail for every state change — required for compliance",
        "Cross-sell triggers based on existing customer data",
        "Policy renewal and EMI default workflows",
      ],
      painPoints: [
        "Compliance risk from undocumented advisor conversations",
        "Drop-offs at KYC and document upload",
        "Branch escalations without a clear paper trail",
        "Lead leakage across product lines (home loan customer never offered insurance)",
        "Renewal cycles managed in spreadsheets",
      ],
      kpis: [
        { value: "100%", label: "audit-trail coverage" },
        { value: "30%", label: "faster KYC completion" },
        { value: "1.8x", label: "advisor productivity" },
      ],
      features: [
        "Product-wise pipelines",
        "KYC checklist & SLAs",
        "Full audit log of every action",
        "Cross-sell triggers",
        "Renewal automation",
        "Document e-signing",
      ],
      workflow: [
        {
          title: "Capture compliant enquiries",
          description:
            "EMI calculators, premium tools and aggregator partners feed leads in with full consent capture and source attribution.",
        },
        {
          title: "Route by product and territory",
          description:
            "A home-loan enquiry from Bangalore lands with a Bangalore HL advisor. A term-insurance lead lands with the right insurance specialist.",
        },
        {
          title: "Run KYC with SLA discipline",
          description:
            "Each lead carries a KYC checklist with timers. The system nudges advisors and customers, escalates when SLAs slip and flags compliance gaps.",
        },
        {
          title: "Disburse, renew and cross-sell",
          description:
            "Once disbursed, the customer enters the renewal nurture and cross-sell engine — every interaction logged, every consent on record.",
        },
      ],
      integrations: [
        "PolicyBazaar / BankBazaar",
        "Aadhaar e-KYC vendors",
        "Bureau APIs (CIBIL, Experian)",
        "Loan management systems",
        "DocuSign / Leegality e-sign",
        "WhatsApp Business API",
      ],
      testimonial: {
        quote:
          "Our compliance team is finally calm. Every lead, every advisor call, every consent — it's all logged, time-stamped and exportable. KYC turn-around is down 30% and our auditors stopped finding gaps.",
        author: "Vikram Iyer",
        role: "Head of Operations",
        company: "Mid-sized NBFC, ₹2,000 Cr book",
      },
      faq: [
        {
          question: "Is it audit-ready for IRDAI / RBI?",
          answer:
            "Every state change, every advisor action, every document upload is timestamped and exportable. Audit logs are immutable and retained per your data-retention policy.",
        },
        {
          question: "How does it handle multi-product cross-sell?",
          answer:
            "A single customer record carries every product they hold. Cross-sell triggers fire when, e.g., a home-loan disbursal happens — your insurance team gets the lead automatically.",
        },
        {
          question: "Can advisors work from a mobile app?",
          answer:
            "Yes. Field advisors capture leads, run KYC, collect signatures and update SLAs from a phone, online or offline.",
        },
        {
          question: "Does it support white-label for partner channels?",
          answer:
            "Yes — partner advisors can use a co-branded portal that funnels leads into your central pipeline.",
        },
      ],
      ctaLabel: "See BFSI playbook",
      ctaHref: "/demo",
    },
    {
      slug: "travel",
      name: "Travel & Hospitality",
      icon: "Plane",
      tagline: "Turn enquiries into itineraries — and itineraries into bookings.",
      description:
        "Travel agencies, DMCs, hotels and resort chains use Leads Rubix to capture trip enquiries, build itineraries, send proposals and close bookings — across phone, WhatsApp and OTA channels.",
      longDescription:
        "Travel is an emotion-led, comparison-heavy purchase. The first agent to send a beautiful, accurate itinerary wins the booking. Leads Rubix is built for travel teams who live on WhatsApp — capture every enquiry, build itineraries with hotels, transfers and inclusions, send branded proposals as PDF, and track quote acceptance in one workflow. Plus, post-trip reactivation gets your past travellers booking with you again.",
      heroStat: { value: "2.8x", label: "itineraries built per agent per day" },
      leadSources: [
        "Website forms",
        "Meta ads (FB / Instagram)",
        "MakeMyTrip & Booking.com",
        "Google travel ads",
        "Past traveller referrals",
        "Corporate enquiry email",
      ],
      roles: [
        "Travel consultants",
        "Itinerary designers",
        "Group / MICE coordinators",
        "Operations team",
      ],
      useCases: [
        "Capture leads from website, Meta ads, MakeMyTrip and Booking.com",
        "Itinerary builder with day-wise plans, hotels and inclusions",
        "Quote versioning and approval flow",
        "Group / corporate booking handling",
        "Post-trip review and repeat booking nurture",
        "Visa & document tracking",
        "Supplier and DMC margin management",
      ],
      painPoints: [
        "Lost bookings from slow itinerary turnaround",
        "Discount mistakes from manual quoting",
        "No reactivation of past travellers",
        "Group bookings managed in chaotic email chains",
        "Margin leakage with no visibility into supplier rates",
      ],
      kpis: [
        { value: "2.8x", label: "itineraries per agent" },
        { value: "33%", label: "higher repeat bookings" },
        { value: "40%", label: "faster quote turnaround" },
      ],
      features: [
        "Itinerary & quote builder",
        "Group booking pipelines",
        "Past-traveller reactivation",
        "Supplier rate cards",
        "Visa/document checklist",
        "Branded proposal PDFs",
      ],
      workflow: [
        {
          title: "Capture every traveller enquiry",
          description:
            "Forms, Meta ads, MMT and Booking.com flow into one inbox with traveller intent (destination, dates, pax) pre-tagged.",
        },
        {
          title: "Build the itinerary in minutes",
          description:
            "Drag-and-drop day-wise plans, plug in hotels and transfers from your supplier rate card, and send a branded PDF proposal.",
        },
        {
          title: "Negotiate, version, and close",
          description:
            "Quote v1, v2, v3 — all tracked. Approval flow for high-discount quotes, and live status on what the customer has read or accepted.",
        },
        {
          title: "Operate the trip and re-engage",
          description:
            "Visa docs, vouchers, on-trip support — all in one place. After the trip, reviews and reactivation nurture turn one booking into many.",
        },
      ],
      integrations: [
        "MakeMyTrip & Booking.com",
        "GDS (Amadeus, Sabre)",
        "WhatsApp Business API",
        "Razorpay & Stripe",
        "DocuSign for confirmations",
        "Google & Meta Ads",
      ],
      testimonial: {
        quote:
          "We were losing bookings to OTAs because we couldn't send a quote fast enough. Now our consultants send a personalised PDF in 20 minutes flat. Our 2024 GMV is up 60%.",
        author: "Priya Krishnan",
        role: "Founder",
        company: "Boutique luxury travel agency",
      },
      faq: [
        {
          question: "Does it handle group / MICE enquiries?",
          answer:
            "Yes — group enquiries get their own pipeline with pax management, room-mix tracking and supplier coordination workflows.",
        },
        {
          question: "Can we manage our supplier rate cards in the CRM?",
          answer:
            "Yes — store hotel, transfer and activity rates per season. Itinerary builder pulls from these so quotes are accurate and margin-protected.",
        },
        {
          question: "How do branded PDF proposals work?",
          answer:
            "We generate a designed, on-brand PDF from the itinerary you build — including images, day-wise plans, inclusions and pricing. The customer can view it online with read receipts.",
        },
        {
          question: "Can past travellers be re-engaged automatically?",
          answer:
            "Yes — based on past trip type, season and time elapsed, customers flow into reactivation campaigns over WhatsApp and email.",
        },
      ],
      ctaLabel: "See travel playbook",
      ctaHref: "/demo",
    },
    {
      slug: "saas",
      name: "SaaS & IT Services",
      icon: "Server",
      tagline: "From inbound demo request to closed-won — without spreadsheets.",
      description:
        "B2B SaaS companies and IT services firms use Leads Rubix to manage inbound leads, demo scheduling, multi-stakeholder deal cycles and renewals — with API-first integrations into their stack.",
      longDescription:
        "B2B SaaS is the hardest sales motion to systematize: long cycles, multiple stakeholders, evolving objections, and reps who all sell differently. Leads Rubix gives revenue teams the structure they need without the spreadsheets. Inbound demo requests routed in seconds, stakeholder maps for every account, deal-stage discipline, quote and contract milestones, and a renewal motion that's actually proactive. Plus a REST API so your developers can wire it into the rest of your stack without an integration tax.",
      heroStat: { value: "1.6x", label: "deal velocity (Lead → Closed-Won)" },
      leadSources: [
        "Website demo / contact forms",
        "Content downloads & gated assets",
        "LinkedIn ads & InMail",
        "G2 / Capterra / Gartner",
        "Outbound prospecting",
        "Partner / channel referrals",
      ],
      roles: [
        "Inbound SDRs",
        "Account executives",
        "Solutions engineers",
        "Customer success / renewal managers",
        "Revenue ops",
      ],
      useCases: [
        "Capture demo requests from website, LinkedIn and content downloads",
        "Auto-assign by territory, vertical or company size",
        "Multi-stakeholder deal tracking with stakeholder map",
        "Quote, e-sign and contract milestones",
        "Renewal & expansion playbooks for customer success",
        "Forecasting with confidence levels per stage",
        "PQL (product-qualified lead) handoff from product analytics",
      ],
      painPoints: [
        "Reps managing pipelines in their head and in spreadsheets",
        "Slow demo scheduling killing inbound conversion",
        "No structured renewal motion",
        "PQLs and inbound demos lost between marketing and sales",
        "Forecasting is a guess, not a science",
      ],
      kpis: [
        { value: "40%", label: "more inbound demos held" },
        { value: "1.6x", label: "deal velocity" },
        { value: "92%", label: "renewal rate" },
      ],
      features: [
        "Stakeholder maps",
        "REST API & webhooks",
        "Renewal playbooks",
        "Forecast confidence",
        "PQL ingest from analytics",
        "Quote & e-sign",
      ],
      workflow: [
        {
          title: "Inbound, instantly routed",
          description:
            "Demo requests get routed by territory, ICP and company size in under 30 seconds, with calendar links sent automatically — no more 'we'll get back to you tomorrow'.",
        },
        {
          title: "Map the buying committee",
          description:
            "Each opportunity carries a stakeholder map: champion, economic buyer, technical evaluator, blocker. AEs always know who they're missing.",
        },
        {
          title: "Run a clean deal stage",
          description:
            "Discovery → demo → POC → proposal → contract. Each stage has exit criteria, confidence levels and a clear next step.",
        },
        {
          title: "Renew and expand",
          description:
            "CSMs see renewal risk, expansion opportunities and at-risk accounts. The system surfaces the next play, not just a list of accounts.",
        },
      ],
      integrations: [
        "Stripe / Razorpay",
        "DocuSign / PandaDoc",
        "Slack & Microsoft Teams",
        "HubSpot / Marketo",
        "Segment & product analytics",
        "Gmail / Outlook",
        "Calendly",
      ],
      testimonial: {
        quote:
          "We replaced HubSpot Sales Hub and a custom Notion stack with Leads Rubix. Pipeline visibility went from monthly guesswork to live dashboards, and our renewal rate climbed to 92% in the first year.",
        author: "Aditya Menon",
        role: "VP Revenue",
        company: "Series-B SaaS, $14M ARR",
      },
      faq: [
        {
          question: "Does it have a REST API and webhooks?",
          answer:
            "Yes — fully documented REST API and outbound webhooks for every entity. Build whatever integration you need without us in the loop.",
        },
        {
          question: "Can we ingest product-qualified leads (PQLs)?",
          answer:
            "Connect Segment, Mixpanel or your own event stream. Define PQL criteria, and qualifying users land in your sales pipeline with the trigger event attached.",
        },
        {
          question: "How does forecasting work?",
          answer:
            "Each stage has a default confidence level which reps can override. The system rolls up weighted pipeline by month and quarter, with variance tracking versus actuals.",
        },
        {
          question: "Does it support multi-currency and global teams?",
          answer:
            "Yes — multi-currency deals, timezone-aware scheduling, and territory routing are first-class.",
        },
      ],
      ctaLabel: "See SaaS playbook",
      ctaHref: "/demo",
    },
    {
      slug: "manufacturing",
      name: "Manufacturing & B2B Distribution",
      icon: "Factory",
      tagline: "Long sales cycles, multiple plants, one source of truth.",
      description:
        "Industrial manufacturers, distributors and channel-led B2B businesses use Leads Rubix to manage RFQs, sample requests, plant visits and multi-quarter negotiations across territories.",
      longDescription:
        "Industrial sales is slow, technical and territorial — and most CRMs are built for fast-moving B2C use cases. Leads Rubix is different. We model the way industrial deals actually move: RFQ in, samples out, plant visit, technical approval, commercial negotiation, annual contract. Reps in the field, regional managers in the middle, leadership at the top — every layer sees what they need, every handoff is documented, and rep attrition no longer wipes out years of pipeline.",
      heroStat: { value: "100%", label: "pipeline retained on rep change" },
      leadSources: [
        "IndiaMART & TradeIndia",
        "Website RFQ form",
        "Trade shows & conferences",
        "Existing distributor channels",
        "Field rep prospecting",
        "Tender portals",
      ],
      roles: [
        "Field sales reps",
        "Regional sales managers",
        "Inside sales / RFQ desk",
        "Plant / production coordinators",
        "Distribution partners",
      ],
      useCases: [
        "Capture RFQs from website, IndiaMART and TradeIndia",
        "Sample dispatch & follow-up tracking",
        "Plant visit scheduling and trip reports",
        "Multi-territory rep ownership with handoffs",
        "Annual contract & rate-card negotiation tracking",
        "Distributor onboarding and primary/secondary sales tracking",
        "Tender response workflow with deadline alerts",
      ],
      painPoints: [
        "RFQ enquiries lost between sales and plant teams",
        "No visibility into long-cycle deals",
        "Rep attrition causing pipeline loss",
        "Sample dispatch tracked in WhatsApp groups",
        "Distributor secondary sales invisible to HQ",
      ],
      kpis: [
        { value: "2.2x", label: "RFQ-to-quote rate" },
        { value: "45%", label: "shorter sample cycle" },
        { value: "100%", label: "pipeline retained on rep change" },
      ],
      features: [
        "RFQ & sample tracking",
        "Territory ownership rules",
        "Multi-quarter pipeline views",
        "Distributor portal",
        "Tender response workflow",
        "Trip reports from mobile",
      ],
      workflow: [
        {
          title: "Centralise every RFQ",
          description:
            "IndiaMART, TradeIndia, website forms and tender portals feed into one queue, with product, quantity and territory pre-tagged.",
        },
        {
          title: "Quote, sample, and visit",
          description:
            "Issue quotes, dispatch samples with tracking, and schedule plant visits — the system follows up on each on a defined cadence.",
        },
        {
          title: "Negotiate the annual contract",
          description:
            "Multi-month negotiation tracked across stages: technical approval, commercial T&C, rate card, MoU. Every email, every call, every concession logged.",
        },
        {
          title: "Manage the distributor channel",
          description:
            "Distributors get a portal for orders, secondary sales reporting and incentive tracking. HQ finally sees what's happening downstream.",
        },
      ],
      integrations: [
        "IndiaMART & TradeIndia",
        "Tally / SAP / Oracle ERP",
        "WhatsApp Business API",
        "GST e-invoicing",
        "Logistics tracking APIs",
        "Tender portals (GeM, IREPS)",
      ],
      testimonial: {
        quote:
          "We lost three reps in 2024 and didn't lose a single deal — every conversation, every visit report, every negotiation step was in Leads Rubix. Our regional managers picked up exactly where the reps left off.",
        author: "Suresh Pillai",
        role: "National Sales Head",
        company: "Industrial fasteners manufacturer (₹450 Cr)",
      },
      faq: [
        {
          question: "Can field reps work offline?",
          answer:
            "Yes. The mobile app caches plant visits, trip reports and contact updates offline and syncs when the rep gets back online.",
        },
        {
          question: "How do tenders work?",
          answer:
            "Each tender carries deadlines, document checklists, and approval workflows for technical and commercial bids. Alerts fire as deadlines approach.",
        },
        {
          question: "Does it integrate with our ERP for orders and invoicing?",
          answer:
            "Yes — bi-directional integrations with Tally, SAP, Oracle and similar. Won deals push to ERP, invoice and payment status flow back into the CRM.",
        },
        {
          question: "What about distributor secondary sales?",
          answer:
            "Distributors report their secondary sales through a portal or mobile app. HQ sees full down-channel visibility for forecasting and incentives.",
        },
      ],
      ctaLabel: "See manufacturing playbook",
      ctaHref: "/demo",
    },
  ],
};

export type { IndustryItem };
