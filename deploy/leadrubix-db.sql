--
-- PostgreSQL database dump
--

\restrict j5yzckJez7KCzoJVmV1J3DJWgaMxZTQNNqbQsczmVmNP0Nb7hgJhbvzqveIKjth

-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    password_hash text NOT NULL,
    name text NOT NULL,
    role text DEFAULT 'admin'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    must_change_password boolean DEFAULT false NOT NULL,
    last_password_change_at timestamp with time zone,
    failed_login_attempts integer DEFAULT 0 NOT NULL,
    locked_until timestamp with time zone,
    totp_enabled boolean DEFAULT false NOT NULL,
    totp_secret text,
    totp_recovery_codes jsonb
);


--
-- Name: audit_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.audit_events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    actor_id uuid,
    actor_email text,
    action text NOT NULL,
    entity_type text NOT NULL,
    entity_id text,
    payload jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: content_sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.content_sections (
    key text NOT NULL,
    value jsonb NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_by uuid
);


--
-- Name: content_versions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.content_versions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    key text NOT NULL,
    value jsonb NOT NULL,
    saved_by uuid,
    saved_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: lead_activities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lead_activities (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    lead_id uuid NOT NULL,
    actor_id uuid,
    kind text NOT NULL,
    payload jsonb DEFAULT '{}'::jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: leads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.leads (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    source text DEFAULT 'contact'::text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    company text NOT NULL,
    phone text NOT NULL,
    team_size text,
    message text NOT NULL,
    ip_hash text,
    status text DEFAULT 'new'::text NOT NULL,
    notes text,
    message_length integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    assigned_to uuid,
    tags jsonb DEFAULT '[]'::jsonb NOT NULL,
    last_activity_at timestamp with time zone,
    utm_source text,
    utm_medium text,
    utm_campaign text,
    utm_term text,
    utm_content text,
    gclid text,
    fbclid text,
    referrer text,
    landing_path text,
    score integer,
    score_band text
);


--
-- Name: not_found_hits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.not_found_hits (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    path text NOT NULL,
    referrer text,
    ip_hash text,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    excerpt text DEFAULT ''::text NOT NULL,
    body text DEFAULT ''::text NOT NULL,
    cover_image text,
    status text DEFAULT 'draft'::text NOT NULL,
    published_at timestamp with time zone,
    author_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    meta_description text,
    og_image text,
    tags jsonb DEFAULT '[]'::jsonb NOT NULL
);


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid text NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- Data for Name: admin_users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admin_users (id, email, password_hash, name, role, created_at, updated_at, must_change_password, last_password_change_at, failed_login_attempts, locked_until, totp_enabled, totp_secret, totp_recovery_codes) FROM stdin;
4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	$2b$10$3Hza4wDXl1uW4xSdDl2q0e8V/0zsCQzOFdplUzlFntuf0V/V4ZbTq	Leads Rubix Admin	owner	2026-05-02 20:53:46.052572+00	2026-05-03 11:53:31.826+00	f	2026-05-02 22:01:07.915+00	4	\N	f	\N	\N
\.


--
-- Data for Name: audit_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.audit_events (id, actor_id, actor_email, action, entity_type, entity_id, payload, created_at) FROM stdin;
ebb56cc5-8289-4ed3-944a-39e7361d5ecd	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	login	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-02 21:41:43.290585+00
c67f032d-fd5a-4847-b5ac-ba0b1cfae6f4	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	login	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-02 21:46:33.846579+00
2a554cb4-4070-4af5-9c27-11e7a6f9bcae	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	change_password	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-02 21:46:44.376769+00
4a1d6bb4-d8f9-480b-9b8a-03d773b9a2c2	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	login	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-02 21:50:06.872156+00
139da7cb-98c3-4419-acd7-5451aae4d6cc	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	change_password	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-02 21:50:27.992752+00
666e51a8-f6b3-4b61-962a-bfa4d4a4c47d	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	content_updated	content_section	home_hero	{}	2026-05-02 21:50:54.018991+00
e8b3474a-2e3d-4774-9991-fb43a1830e7d	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	content_updated	content_section	home_hero	{}	2026-05-02 21:51:01.028284+00
04da19af-cc18-4a1f-943f-d5731150b094	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	content_restored	content_section	home_hero	{"restoredFromVersionId": "14cc4f2d-e54c-4733-8cf8-0359652b0dfc"}	2026-05-02 21:51:30.534488+00
fe88afa3-acc8-437a-bf4d-6bb5241d9677	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	post_created	post	019bfda8-b61d-4cdc-9b4d-a11198c86a81	{"slug": "markdown-smoke-test", "status": "published"}	2026-05-02 21:52:19.675739+00
6a44a3d3-d01f-461d-af0c-2317608d277f	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	login	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-02 22:00:58.575223+00
ef73bbda-03dc-41ad-a22d-85f248df863c	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	change_password	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-02 22:01:07.921464+00
13001acd-8199-48ab-8f0f-7ca525a8227a	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	content_updated	content_section	home_hero	{}	2026-05-02 22:01:45.260196+00
f05b57d5-5ff4-418e-a006-096235d8221d	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	post_created	post	cdf5d8a6-8661-4d78-a076-ffe57e7724a3	{"slug": "reg-test-post--qp9iv", "status": "published"}	2026-05-02 22:02:32.673325+00
badda5ad-d51f-49d8-a540-fff44c4100dd	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	lead_updated	lead	092fa8d6-ff28-499c-af2d-085499eeba7b	{"changes": ["status", "notes", "assignedTo", "tags"]}	2026-05-02 22:03:49.405478+00
21568e77-a046-4d2f-b500-596fa09a23da	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	lead_bulk_status	lead	\N	{"ids": ["ccaaf5f1-90a6-434b-9e89-3b9415f9a526", "44b69f9b-c1db-4792-bc63-06c2319df2cc"], "count": 2}	2026-05-02 22:04:18.845109+00
51ffedab-5117-4f97-8a6f-12ffd92bb1ec	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	login	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-02 22:05:56.342284+00
297cee75-6f50-43d4-972a-5fb3d6e194e8	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	login	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-02 22:42:46.809409+00
66235ac0-df24-4cd7-a31d-50ad5514ab2a	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	login	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-02 22:45:05.499989+00
70cd8d82-7f23-4270-934c-381d4c0cca4b	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	post_created	post	d87550c6-110b-4be7-9735-676906ba4638	{"slug": "e2e-test-post-v2", "status": "published"}	2026-05-02 22:45:47.914132+00
85786e0a-8fc6-429d-9bc5-f20e752861f6	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	login	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-02 22:47:01.473376+00
18fece42-0977-4f01-b2f6-63e2dcd44a4e	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	post_created	post	7695b0fd-3e54-46b2-886f-9ec9dbebeea6	{"slug": "e2e-v3-post", "status": "published"}	2026-05-02 22:47:54.869871+00
9bb2a3bd-cb54-4501-af63-c6a0a89e929b	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	login	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-03 04:36:46.208231+00
78a9a897-4af1-4d74-9068-0d8f0ba0494c	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	login	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-03 04:44:10.760956+00
3895845f-652f-4171-8e78-a118fde77bae	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	login	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-03 04:45:14.368627+00
1006e2b5-be3b-44ae-b8f4-2938e640ed97	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	login	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-03 04:46:39.096741+00
3993840c-2e3a-4657-bbe6-77f027081606	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	logout	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-03 04:47:16.309245+00
fd86a5e6-5fe8-420e-a12b-ab04e18bf10f	4e96c8db-b2fa-4439-939e-d1fdedb726c3	admin@leadsrubix.com	login	admin_user	4e96c8db-b2fa-4439-939e-d1fdedb726c3	{}	2026-05-03 06:33:21.40452+00
\.


--
-- Data for Name: content_sections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.content_sections (key, value, updated_at, updated_by) FROM stdin;
home_announcement	{"text": "", "linkHref": "", "linkLabel": ""}	2026-05-03 04:43:20.877862+00	\N
social_links	{"twitter": "", "youtube": "", "facebook": "", "linkedin": "https://www.linkedin.com/company/leads-rubix", "instagram": ""}	2026-05-03 04:43:25.385461+00	\N
case_studies	[{"tag": "Real estate · multi-branch brokerage", "body": "A residential brokerage with branches in Mumbai and Pune was losing Facebook leads because they were downloaded as CSV every morning. Auto-rotation now pings the next available agent within seconds of submission.", "title": "Cutting first-touch time from hours to under 60 seconds", "metric1": {"label": "First-touch time", "value": "−93%"}, "metric2": {"label": "Lead-to-meeting rate", "value": "+38%"}, "metric3": {"label": "Agents managed", "value": "42"}}, {"tag": "Education · Tier-1 management institute", "body": "A Pune-based management institute was losing 40% of admissions enquiries between form-fill and first counsellor call. Cadence automation and program-wise routing tripled application volume — without adding counsellors.", "title": "From 720 to 2,140 applications in a single intake", "metric1": {"label": "Enquiry-to-application", "value": "+142%"}, "metric2": {"label": "Counsellor response time", "value": "8 min"}, "metric3": {"label": "Counsellors enabled", "value": "8"}}, {"tag": "Healthcare · multi-specialty clinic chain", "body": "A 12-centre clinic chain had patient enquiries scattered across phone, WhatsApp and Practo. Procedure-specific nurture journeys and automated reminders cut no-show rate from 22% to 10% and doubled IVF package conversions.", "title": "No-shows cut in half, IVF conversions doubled", "metric1": {"label": "Package conversion", "value": "+111%"}, "metric2": {"label": "No-show rate", "value": "−55%"}, "metric3": {"label": "Centres unified", "value": "12"}}, {"tag": "BFSI · mid-sized NBFC", "body": "A ₹2,000 Cr-book NBFC closed every regulator-flagged audit gap with immutable advisor logs. Native Aadhaar e-KYC and bureau pulls cut KYC turnaround by a third, and product-graph cross-sell turned 4% attach into 23%.", "title": "100% audit-trail coverage, 23% cross-sell attach", "metric1": {"label": "Audit coverage", "value": "100%"}, "metric2": {"label": "KYC turnaround", "value": "−33%"}, "metric3": {"label": "Advisor productivity", "value": "+79%"}}, {"tag": "SaaS · Series-B B2B SaaS", "body": "A $14M ARR SaaS replaced HubSpot Sales Hub plus a tangle of Notion docs. Stakeholder maps, per-stage confidence scoring and a proactive renewal motion took inbound-to-demo from 31% to 58% and net renewal to 92%.", "title": "Forecast accuracy from ±32% to ±9% in one quarter", "metric1": {"label": "Inbound demos held", "value": "+87%"}, "metric2": {"label": "Avg deal velocity", "value": "−37%"}, "metric3": {"label": "Net renewal rate", "value": "92%"}}, {"tag": "Manufacturing · industrial fasteners", "body": "A ₹450 Cr fasteners manufacturer lost three field reps in 2024 and with them, years of context. Now every RFQ, plant visit and conversation lives in the system — RFQ-to-quote rate doubled and 100% of pipeline survived team changes.", "title": "Lost zero deals on rep attrition; RFQ-to-quote 2.2×", "metric1": {"label": "RFQ-to-quote rate", "value": "+118%"}, "metric2": {"label": "Sample dispatch cycle", "value": "−44%"}, "metric3": {"label": "Pipeline retained", "value": "100%"}}]	2026-05-03 05:45:49.274885+00	\N
home_hero	{"eyebrow": "Built for India's high-velocity sales teams", "headline": "Capture every lead. Close more revenue.", "subheadline": "The CRM purpose-built for Indian sales teams across real estate, education, healthcare, BFSI, automotive, travel, SaaS and manufacturing — capture leads from every source and route every enquiry to the right rep in seconds.", "primaryCtaLabel": "Start Free Trial", "secondaryCtaLabel": "Book a Demo"}	2026-05-03 05:44:07.33813+00	4e96c8db-b2fa-4439-939e-d1fdedb726c3
testimonials	[{"body": "Before Leads Rubix, we were losing 30% of our Facebook leads just because agents didn't check the sheet in time. Now every lead is called within 5 minutes — our site visits have doubled.", "name": "Rajeev K.", "role": "VP Sales", "company": "Horizon Developers"}, {"body": "Counsellor response time dropped from 2.4 hours to 8 minutes. Application volume nearly tripled in one cycle — without adding a single counsellor. Cadence automation effectively replaced four FTEs.", "name": "Anuradha S.", "role": "Director of Admissions", "company": "Tier-1 Management Institute"}, {"body": "We replaced HubSpot Sales Hub plus a tangle of Notion docs. Forecast accuracy went from ±32% to ±9% in one quarter. The stakeholder map and per-stage confidence are killer features.", "name": "Vikram M.", "role": "Head of Sales Ops", "company": "Series-B SaaS"}]	2026-05-03 05:44:55.058602+00	\N
footer_contact	{"hours": "Mon–Sat, 10am–7pm IST", "phone": "+91-9871633838", "whatsapp": "919871633838", "salesEmail": "hello@leadsrubix.com", "addressLine": "Registered office: Mumbai, Maharashtra, India", "legalEntity": "Leads Rubix Technologies Pvt. Ltd.", "supportEmail": "support@leadsrubix.com"}	2026-05-03 07:40:22.249002+00	\N
faq_items	[{"answer": "Most teams are up and running within 10 minutes. Define your pipeline stages, invite users, and map any custom fields — the onboarding flow is designed to be frictionless.", "question": "How long does setup take?"}, {"answer": "No. You can start your 7-day free trial without a credit card. We enforce trial expiry automatically, but you'll have ample time to test the system with your team.", "question": "Do I need a credit card to start?"}, {"answer": "Absolutely. We support bulk CSV imports allowing you to ingest thousands of leads at once. Map your spreadsheet columns directly to our standard and custom extension fields.", "question": "Can I import my existing leads from Excel?"}, {"answer": "We provide a direct webhook endpoint. When a lead submits a form, the webhook receives the event, parses the fields, persists it, and immediately triggers your lead rotation rules.", "question": "How does Facebook & Instagram Lead Ads integration work?"}, {"answer": "Yes. While we default to FRESH → CALLBACK → INTERESTED → BOOKED → LOST, these stages are fully configurable per organization to match your exact sales process.", "question": "Can I customize the lead pipeline stages?"}, {"answer": "Yes. Monthly subscriptions can be canceled at any time. For annual plans, we offer pro-rated refunds within the first 30 days.", "question": "Can I cancel anytime?"}, {"answer": "GST is applied at checkout based on your billing state as per Indian tax regulations. You can provide your GSTIN for input tax credit.", "question": "Is GST included?"}, {"answer": "Data is stored in managed, highly available clusters in India. We're DPDP-compliant — you own your data and can export it at any time.", "question": "Where is my data stored?"}, {"answer": "Yes, white-labelling is available on our Enterprise plan with your own domain and branding.", "question": "Do you offer white-labelling?"}, {"answer": "Email support for all plans, priority chat for Growth, and a dedicated success manager for Enterprise.", "question": "What kind of support do you offer?"}]	2026-05-03 04:43:11.885728+00	\N
\.


--
-- Data for Name: content_versions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.content_versions (id, key, value, saved_by, saved_at) FROM stdin;
14cc4f2d-e54c-4733-8cf8-0359652b0dfc	home_hero	{"eyebrow": "Real-estate CRM, built for India", "headline": "Smoke headline 1", "subheadline": "Capture, distribute and convert every property enquiry — from Facebook, Instagram, MagicBricks and 99acres — without spreadsheets.", "primaryCtaLabel": "Start Free Trial", "secondaryCtaLabel": "Book a Demo"}	4e96c8db-b2fa-4439-939e-d1fdedb726c3	2026-05-02 21:50:54.012172+00
18a541b1-afce-4dac-8b22-7500a1520c0b	home_hero	{"eyebrow": "Real-estate CRM, built for India", "headline": "Smoke headline 2", "subheadline": "Capture, distribute and convert every property enquiry — from Facebook, Instagram, MagicBricks and 99acres — without spreadsheets.", "primaryCtaLabel": "Start Free Trial", "secondaryCtaLabel": "Book a Demo"}	4e96c8db-b2fa-4439-939e-d1fdedb726c3	2026-05-02 21:51:01.024232+00
72b7cff6-3849-4640-86f5-3ea16d18a95d	home_hero	{"eyebrow": "Real-estate CRM, built for India", "headline": "Smoke headline 1", "subheadline": "Capture, distribute and convert every property enquiry — from Facebook, Instagram, MagicBricks and 99acres — without spreadsheets.", "primaryCtaLabel": "Start Free Trial", "secondaryCtaLabel": "Book a Demo"}	4e96c8db-b2fa-4439-939e-d1fdedb726c3	2026-05-02 21:51:30.531436+00
e8f5f9c3-ef64-42ae-95af-609ab00adcff	home_hero	{"eyebrow": "Real-estate CRM, built for India", "headline": "REG_TEST_HERO_LzcK", "subheadline": "Capture, distribute and convert every property enquiry — from Facebook, Instagram, MagicBricks and 99acres — without spreadsheets.", "primaryCtaLabel": "Start Free Trial", "secondaryCtaLabel": "Book a Demo"}	4e96c8db-b2fa-4439-939e-d1fdedb726c3	2026-05-02 22:01:45.257127+00
1e6764f2-d063-4ab6-a0be-afc32d92e1b1	home_hero	{"eyebrow": "Real-Estate CRM, Built for India", "headline": "Capture every lead. Close more bookings.", "subheadline": "The CRM purpose-built for Indian real estate developers and brokerages. Connect Facebook, Instagram, MagicBricks and 99acres — and route every enquiry to the right agent in seconds.", "primaryCtaLabel": "Start Free Trial", "secondaryCtaLabel": "Book a Demo"}	\N	2026-05-03 05:44:02.48909+00
26815d1e-3df3-4fa9-8777-025a8d78e5d8	testimonials	[{"body": "Lead response time dropped from 4 hours to under 2 minutes. Our conversion on Facebook leads doubled in the first quarter.", "name": "Rakesh M.", "role": "Sales Director", "company": "Leading Mumbai Developer"}, {"body": "Round-robin routing finally ended the cherry-picking. Every agent now gets a fair shot and our pipeline visibility is real-time.", "name": "Priya S.", "role": "Operations Head", "company": "Pune Brokerage"}, {"body": "The 99acres and MagicBricks integration alone saved us 30 hours of manual data entry per week. Worth it.", "name": "Amit K.", "role": "CEO", "company": "Bangalore Realty Group"}]	\N	2026-05-03 05:44:50.559442+00
5e018d31-36c6-431f-bebf-af1380e94fe0	case_studies	[{"tag": "Multi-branch brokerage", "body": "A residential brokerage with branches in Mumbai and Pune was losing Facebook leads because they were downloaded as CSV every morning. Auto-rotation now pings the next available agent within seconds of submission.", "title": "Cutting first-touch time from hours to under 5 minutes", "metric1": {"label": "First-touch time", "value": "−93%"}, "metric2": {"label": "Lead-to-meeting rate", "value": "+38%"}, "metric3": {"label": "Agents managed", "value": "42"}}, {"tag": "Property developer", "body": "A developer with active inventory across 6 projects had token bookings tracked in Excel and payments reconciled by hand. Bookings, payments and PDF invoices now live next to the lead — month-end reconciliation went from days to hours.", "title": "One pipeline across 6 projects, full Razorpay reconciliation", "metric1": {"label": "Projects unified", "value": "6"}, "metric2": {"label": "Reconciliation time", "value": "−85%"}, "metric3": {"label": "Booking conversion", "value": "+22%"}}, {"tag": "Channel partner network", "body": "A channel partner organisation knew its agents were calling clients but couldn't verify site visits. GPS-stamped call logs and tasks gave management a single dashboard of who's actually on the ground.", "title": "Real visibility into 30+ field agents — finally", "metric1": {"label": "Field agents tracked", "value": "32"}, "metric2": {"label": "Site-visit completion", "value": "+47%"}, "metric3": {"label": "Reporting overhead", "value": "−70%"}}]	\N	2026-05-03 05:44:50.559442+00
\.


--
-- Data for Name: lead_activities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lead_activities (id, lead_id, actor_id, kind, payload, created_at) FROM stdin;
cd062e81-7af6-4ecb-896b-c9918490f4af	092fa8d6-ff28-499c-af2d-085499eeba7b	4e96c8db-b2fa-4439-939e-d1fdedb726c3	status_changed	{"to": "contacted", "from": "new"}	2026-05-02 22:03:49.399987+00
0298b1f3-fb50-4405-ba20-684203bda4cf	092fa8d6-ff28-499c-af2d-085499eeba7b	4e96c8db-b2fa-4439-939e-d1fdedb726c3	notes_changed	{}	2026-05-02 22:03:49.399987+00
\.


--
-- Data for Name: leads; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.leads (id, source, name, email, company, phone, team_size, message, ip_hash, status, notes, message_length, created_at, updated_at, assigned_to, tags, last_activity_at, utm_source, utm_medium, utm_campaign, utm_term, utm_content, gclid, fbclid, referrer, landing_path, score, score_band) FROM stdin;
092fa8d6-ff28-499c-af2d-085499eeba7b	contact-page	Lead_a1cL	lead_QQwf@example.com	Acme Realty	+91 9876543210	\N	regression contact	59c3b57d	contacted	Reached out and qualified interest. Follow up scheduled.	18	2026-05-02 22:03:16.715604+00	2026-05-02 22:03:49.394+00	\N	[]	2026-05-02 22:03:49.394+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
44b69f9b-c1db-4792-bc63-06c2319df2cc	contact	DB Test	db@example.com	DBCo	+919999999999	\N	Testing the new DB persistence path	59c3b57d	qualified	\N	35	2026-05-02 20:54:50.063615+00	2026-05-02 22:04:18.808+00	\N	[]	2026-05-02 22:04:18.808+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
ccaaf5f1-90a6-434b-9e89-3b9415f9a526	contact	=cmd|' /C calc'!A0	csv-attack@example.com	+SUM(1+1)	+919876543210	\N	-2+3+cmd|' /C calc'!A0\t@SUM(1)	3d5c2561	qualified	\N	30	2026-05-02 21:12:37.567718+00	2026-05-02 22:04:18.808+00	\N	[]	2026-05-02 22:04:18.808+00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
3623b200-3af3-4abb-b2e1-e57ba47bb2e7	audit	Audit Tester	audit@leadsrubix.com	Test Realty	+919999999999	\N	This is a real audit submission to verify the contact endpoint works end-to-end.	59c3b57d	new	\N	80	2026-05-03 04:37:08.346198+00	2026-05-03 04:37:08.346198+00	\N	[]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
f3908ceb-3bcd-4a73-bf3f-fcfe953f28d8	dpdp_export	Test User	test@example.com	(data-subject request)	n/a	\N	[DPDP EXPORT] Smoke test	59c3b57d	new	\N	24	2026-05-03 09:39:41.207935+00	2026-05-03 09:39:41.207935+00	\N	["dpdp", "dpdp:export"]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
7b02fa0b-99f6-4083-9642-11a5325b357c	demo-page-real-estate	Hot Lead	founder@acmecorp.com	Acme Corp	+919876543210	51–200	We are evaluating CRMs for our 80-person sales team across Mumbai and Bangalore. Please send pricing details and we would like to schedule a demo to see lead routing and WhatsApp integration. Currently using Excel and a shared inbox which is not scaling.	59c3b57d	new	\N	254	2026-05-03 09:39:41.291919+00	2026-05-03 09:39:41.291919+00	\N	[]	\N	google	organic	crm-mumbai	\N	\N	\N	\N	https://www.google.com/	/blog/crm-for-real-estate-mumbai	100	hot
40c8c466-b433-467c-b88e-308b7b679b41	dpdp_export	Playwright Test User	pw-1777802130450@example.com	(data-subject request)	n/a	\N	[DPDP EXPORT] Automated e2e test — please ignore.	59c3b57d	new	\N	49	2026-05-03 09:55:47.971888+00	2026-05-03 09:55:47.971888+00	\N	["dpdp", "dpdp:export"]	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: not_found_hits; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.not_found_hits (id, path, referrer, ip_hash, created_at) FROM stdin;
1aebecca-821b-4657-9cc9-500619f8a805	/foo/bar	https://google.com/	12ca17b49af2289436f303e0166030a2	2026-05-03 08:54:04.027614+00
0e6d37b9-7174-436f-96eb-90d9330128da	/this-page-does-not-exist-12345	\N	12ca17b49af2289436f303e0166030a2	2026-05-03 08:56:25.39876+00
d0823f95-a79e-436c-b555-a04756c66894	/test-1	\N	12ca17b49af2289436f303e0166030a2	2026-05-03 08:58:15.671049+00
e25d64bb-e48b-4f51-abc4-04d6a8ab53d2	/test-2	\N	12ca17b49af2289436f303e0166030a2	2026-05-03 08:58:15.721197+00
aa2ca310-9ddc-4247-a07f-a1cd40b9f727	/test-3	\N	12ca17b49af2289436f303e0166030a2	2026-05-03 08:58:15.764855+00
afee247b-8b5b-4b9f-a774-355bc3362d10	/test-4	\N	12ca17b49af2289436f303e0166030a2	2026-05-03 08:58:15.808959+00
844c3cca-3693-4bb0-8890-128daf69efa6	/test-5	\N	12ca17b49af2289436f303e0166030a2	2026-05-03 08:58:15.857019+00
6cc07f4e-93a3-4214-9a5e-261a5358d52f	/test-6	\N	12ca17b49af2289436f303e0166030a2	2026-05-03 08:58:15.904732+00
9692413e-4579-4afd-b04f-ed3223e3330e	/this-page-does-not-exist-12345	\N	12ca17b49af2289436f303e0166030a2	2026-05-03 08:59:25.415805+00
b093374e-1de9-425c-9c0b-95409be2a607	/a-page-that-does-not-exist-xyz	\N	12ca17b49af2289436f303e0166030a2	2026-05-03 11:34:36.14053+00
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.posts (id, slug, title, excerpt, body, cover_image, status, published_at, author_id, created_at, updated_at, meta_description, og_image, tags) FROM stdin;
baad96fb-e207-4879-9d99-9f2526424ac9	round-robin-lead-routing-india	Round-robin lead routing for Indian sales teams: a practical guide	How to assign inbound leads fairly across your team without losing speed-to-lead, with rules that actually work for Indian B2B and real-estate sales.	# Round-robin lead routing for Indian sales teams\n\n  Most Indian sales teams we meet still assign inbound leads in one of two ways: a manager forwards a WhatsApp screenshot to whoever is "free", or the first agent to spot the email in a shared inbox grabs it. Both look harmless. Both cost you 30-60% of your pipeline.\n\n  ## Why the "first to grab" model fails in India\n\n  - **Working hours are messy.** Tier-2 leads come in at 10:30 PM. Your senior closer is offline. The junior who picks it up is not briefed. The lead never converts.\n  - **Strong agents hoard.** The top two reps cherry-pick warm leads; the rest of the team starves; attrition follows.\n  - **Nobody owns the SLA.** When a lead goes cold, there is no clean answer to "who was supposed to call this person?"\n\n  Round-robin solves the ownership problem. Done well, it also gives you a clean dataset for coaching and forecasting.\n\n  ## Five rules that make round-robin actually work\n\n  ### 1. Weight the rotation, do not equalise it\n\n  Equal rotation is fair to agents, not to leads. A new joiner should not get the same volume of high-intent leads as your top performer in their first month. In Leads Rubix, every agent gets a **weight (1-10)**. The pointer advances by weight, not by one. Same audit trail, fairer outcome.\n\n  ### 2. Have a business-hours fallback\n\n  After 8 PM and on Sundays, route everything to a single "after-hours" pool with auto-reply: *"Thanks, a senior advisor will call you tomorrow before 11 AM."* That single line buys you trust and stops night leads from being silently dropped.\n\n  ### 3. Re-route on no-touch within 15 minutes\n\n  If the assigned agent has not logged a call, WhatsApp, or status change in 15 minutes, the lead jumps to the next agent. You will be surprised how often this fires in week one and how quickly it stops firing in week three.\n\n  ### 4. Treat WhatsApp replies as a touch\n\n  Half of Indian B2B follow-ups happen on WhatsApp. If your CRM only counts dialled calls as "touched", you will re-route leads that the agent is actively working. Let the WhatsApp click count.\n\n  ### 5. Publish the leaderboard, but only on response time\n\n  Public dashboards on **revenue** create politics. Public dashboards on **median first-response time** create healthy competition. Show the second one in the weekly all-hands; keep the first one in the manager's tab.\n\n  ## What to measure in week one\n\n  | Metric | Healthy range |\n  |---|---|\n  | Median first-response time | under 5 minutes (in business hours) |\n  | Leads with zero touches in 24 hours | under 2% |\n  | Re-route rate (no-touch fallback fired) | under 10% by week 3 |\n  | Agent CV of lead volume | under 0.25 |\n\n  If your re-route rate stays above 20% past week three, the problem is not the rule, it is coverage.\n\n  ## Common mistakes\n\n  - **Routing by source instead of by skill.** Source-based routing ("all Facebook leads to Rohan") looks tidy on paper but breaks the moment Rohan takes leave.\n  - **Leaving managers in the rotation.** Managers should be escalation-only, not absorbing first calls.\n  - **No round-robin on re-engagement.** Cold leads that come back deserve the same routing discipline as fresh ones.\n\n  ---\n\n  Round-robin is not a magic feature, it is a discipline. Pair it with a 5-minute SLA, treat WhatsApp as a real touch, and you will close more leads next quarter without hiring a single new agent.\n\n  If you want to see how this looks in practice, [book a 20-minute walkthrough](/contact) and we will set up your rotation rules live on a demo workspace.	/blog-covers/round-robin-lead-routing.png	published	2026-05-03 07:43:57.800885+00	\N	2026-05-03 07:43:57.800885+00	2026-05-03 08:09:27.313514+00	A practical guide to round-robin lead routing for Indian sales teams: weighted rotation, business-hours fallback, WhatsApp re-assignment, and SLAs that hold.	/blog-covers/round-robin-lead-routing.png	["lead-routing", "sales-ops", "india"]
5d5ced03-cee9-4aee-a700-84e07d21dbc8	whatsapp-first-lead-capture	WhatsApp-first lead capture: the playbook for Indian funnels	Why your forms should send to WhatsApp before email, how to set up Click-to-WhatsApp ads that convert, and the templates we see working in 2026.	# WhatsApp-first lead capture: the playbook for Indian funnels\n\n  In 2026, the average Indian buyer ignores 8 out of 10 follow-up emails but replies to 6 out of 10 WhatsApp messages within an hour. If your funnel still treats WhatsApp as an afterthought, you are paying for clicks and throwing the conversations away.\n\n  This is the playbook we now recommend to every customer onboarding onto Leads Rubix.\n\n  ## Step 1: Make WhatsApp the primary channel on every form\n\n  Your contact form should ask for **phone first**, email second. Pre-tick a single, clear opt-in line:\n\n  > *"I agree to receive updates about my enquiry on WhatsApp."*\n\n  That checkbox is your legal basis for the first message and your reason to skip the email-first dance. Do not bury it. Do not auto-tick it. Make it boring and explicit, that is what survives a TRAI audit.\n\n  ## Step 2: Auto-send the first WhatsApp inside 60 seconds\n\n  The window between form-fill and first reply is the single biggest predictor of whether the lead closes. Inside Leads Rubix this is one toggle:\n\n  - On lead create, fire the **"Welcome / I just received your enquiry"** template\n  - Personalise with first name and the page they filled the form on\n  - Sign it with the assigned agent's name, not a brand handle\n\n  That last point matters. Buyers reply 3x more often to a named human than to a faceless brand.\n\n  ## Step 3: Set up Click-to-WhatsApp (CTWA) ads, but route them properly\n\n  CTWA ads are the cheapest high-intent channel in India right now. The mistake almost everyone makes is letting them all land in one shared inbox. Two fixes:\n\n  1. **Tag the source on the first message.** Use Meta's referral parameter so every CTWA conversation arrives in your CRM with source set to ctwa_<campaign>.\n  2. **Round-robin the conversations** the same way you would route form leads. A shared inbox without ownership creates the same chaos as a shared email account.\n\n  ## Step 4: Use templates the way they are designed\n\n  WhatsApp Business templates exist because spam destroys trust. Three templates cover 90% of what an Indian B2B funnel needs:\n\n  - **Welcome:** acknowledges the enquiry, sets next-step expectation, offers a callback slot.\n  - **Follow-up day 2:** re-shares the proposal/brochure, asks one clarifying question.\n  - **Re-engagement day 14:** offers a specific, low-friction next step ("15-minute call this Friday at 4 PM?").\n\n  Avoid templates with more than one CTA. Indian buyers on mobile pick the easy one and ignore the rest.\n\n  ## Step 5: Treat replies as first-class CRM events\n\n  Every WhatsApp reply should:\n\n  - Update **last activity** on the lead\n  - Reset the no-touch SLA timer\n  - Show up on the agent's daily queue, not buried in a separate "messages" tab\n\n  If your CRM treats WhatsApp as a side-channel, your reps will too, and you will lose the visibility you are paying for.\n\n  ## What good looks like\n\n  A healthy WhatsApp-first funnel looks like this in your dashboard:\n\n  - **First-response median:** under 2 minutes (often automated)\n  - **24-hour reply rate:** above 60%\n  - **Templates used per agent per day:** 8-15 (more than 30 means spam, less than 5 means dormant)\n\n  ## What to avoid\n\n  - **Sending the WhatsApp from a personal number.** It is a compliance risk and a continuity risk: when the rep leaves, the conversation history walks out of the door.\n  - **Bulk broadcasting the same template to old leads.** That is how you lose the green tick.\n  - **Ignoring opt-out replies.** "STOP" or the local-language equivalent must remove the contact from any future automated send. Build it into the workflow on day one.\n\n  ---\n\n  WhatsApp is not a new channel anymore, it is the default channel. Treat it that way in your CRM and your funnel will start to feel like the way Indians actually buy.\n\n  [Book a demo](/contact) and we will show you the exact templates, routing rules, and SLA setup we use with our highest-converting customers.	/blog-covers/whatsapp-first-lead-capture.png	published	2026-04-29 07:44:02.634181+00	\N	2026-05-03 07:44:02.634181+00	2026-05-03 08:09:32.303541+00	WhatsApp-first lead capture playbook for India: form design, Click-to-WhatsApp ads, opt-in language, and message templates that drive 3x reply rates.	/blog-covers/whatsapp-first-lead-capture.png	["whatsapp", "lead-capture", "india"]
7d1b2b12-4bcb-4209-be4f-e0958721ea90	gst-compliant-pricing-in-crm	GST-compliant pricing in your CRM: what every Indian SaaS team gets wrong	Inclusive vs exclusive pricing, IGST vs CGST+SGST, B2B vs B2C invoices: a no-nonsense walkthrough so your CRM stops creating problems for your CA.	# GST-compliant pricing in your CRM: what every Indian SaaS team gets wrong\n\n  Your CRM does not file your GST returns. But the data it captures, pricing, place of supply, customer GSTIN, line items, flows downstream into every invoice your CA touches. Get it wrong in the CRM and you will spend the first week of every month chasing reps for missing GSTINs and reconciling mismatches with your books.\n\n  This is the short version of what we tell every Indian SaaS team during onboarding.\n\n  ## 1. Pick one display convention and never break it\n\n  The single most expensive mistake we see is mixing **inclusive** and **exclusive** pricing across pages. Marketing writes Rs 999, sales quotes Rs 999 plus GST, and the invoice shows Rs 1,179. The customer pushes back, the deal slips, the rep applies a manual discount that does not reconcile.\n\n  Pick one and enforce it system-wide:\n\n  - **B2B pricing, exclusive of GST.** Your buyers reclaim input credit; show the base price they care about.\n  - **B2C / D2C pricing, inclusive of GST.** Show the all-in number, with a small "incl. 18% GST" line below.\n\n  In Leads Rubix you set the convention per **price book**, not per quote. Reps cannot override it on a Friday afternoon.\n\n  ## 2. Capture GSTIN at the lead stage, not the invoice stage\n\n  Asking for a GSTIN inside the invoice flow is the wrong moment. The buyer has signed off, finance is waiting on the PO, and now your rep is chasing a 15-character string. Capture it on the **qualification form** instead, with a single rule: GSTIN is mandatory for any deal value over Rs 50,000.\n\n  Validate the format the moment it is entered. The structure is:\n\n  - 2-digit state code\n  - 10-character PAN\n  - 1-digit entity number\n  - 1 default character (Z)\n  - 1-digit check sum\n\n  A ten-line regex catches 95% of typos before the lead is ever assigned.\n\n  ## 3. Get place-of-supply right or you will pick the wrong tax\n\n  This trips up almost everyone:\n\n  - **Same state as your registered office:** CGST plus SGST (9% plus 9%)\n  - **Different state or export:** IGST (18%)\n  - **SEZ unit, even in your home state:** IGST with zero-rated treatment\n\n  Your CRM should derive place-of-supply from the **billing address state**, not the shipping or contact address. Then it should pass that derivation to the invoicing system without the rep ever needing to think about it.\n\n  ## 4. Do not store the tax rate on the deal\n\n  Storing "18% GST" as a field on the deal is a footgun. Rates change, slabs change, your product might move from one HSN/SAC code to another. Store the **HSN/SAC** and the **place-of-supply** on the deal; resolve the rate at invoice time from a small lookup table you actually maintain.\n\n  This makes your historical data correct even after a slab change, and saves you the joy of explaining to your auditor why a 2024 invoice has a 2026 rate.\n\n  ## 5. Invoice-ready fields you must capture in the CRM\n\n  Before any deal moves to "won", these fields should be filled, and your pipeline view should refuse to advance the stage if they are not:\n\n  - Legal name (as on GSTIN)\n  - GSTIN (validated)\n  - Billing address with state\n  - Place of supply (auto-derived, editable for SEZ cases)\n  - HSN/SAC for each line item\n  - PO number (if the buyer requires one)\n\n  Make these required at the **deal stage**, not at the invoice stage. Your finance team will start liking your sales team for the first time in years.\n\n  ## 6. Reverse charge, TDS, and overseas sellers\n\n  Three special cases worth flagging in your CRM:\n\n  - **Reverse charge mechanism (RCM):** when you buy from an unregistered vendor and pay GST yourself. Tag these vendors clearly so your AP system knows.\n  - **TDS on services:** capture whether the buyer will deduct TDS so your collections forecast does not lie.\n  - **Overseas / export deals:** flag as zero-rated, capture LUT number, and never apply IGST.\n\n  These are edge cases, but they are the ones your auditor will pull a sample of.\n\n  ---\n\n  GST is not your CRM's job to file. It is your CRM's job to make sure that when the data leaves the CRM, it is already correct. Get the six fields above into your pipeline gates and you will spend month-end reviewing the business, not chasing GSTINs.\n\n  Want a working setup? [Talk to us](/contact), we will configure your price books, validation rules, and place-of-supply logic during the demo, on your own data.	/blog-covers/gst-compliant-pricing-in-crm.png	published	2026-04-24 07:44:07.47047+00	\N	2026-05-03 07:44:07.47047+00	2026-05-03 08:09:37.126763+00	A practical guide to GST-compliant pricing inside your CRM: inclusive vs exclusive display, place-of-supply rules, B2B GSTIN capture, and invoice fields that pass audit.	/blog-covers/gst-compliant-pricing-in-crm.png	["gst", "pricing", "compliance", "india"]
1a5d00e4-f001-470d-ac66-f8929f3ba357	crm-for-real-estate-mumbai	The CRM Real Estate Brokerages in Mumbai Actually Need (2026)	If your team is juggling Excel sheets, WhatsApp groups, and 99acres alerts, here's what Mumbai brokerages should look for in a CRM — and what to ignore.	If you run a real estate brokerage in Mumbai, you already know the problem: 30–60 leads a day from MagicBricks, 99acres, Housing.com, Facebook, Instagram, walk-ins, broker referrals, and your own website. Each lead lives in a different inbox, the team forgets to call back, and you find out the customer bought from a competitor only when their broker calls you for a quote on a related property.\n\nA CRM should fix this. Most don't, because they were built for SaaS sales cycles, not real estate. Here's what actually matters.\n\n## 1. Multi-source lead capture, including WhatsApp\n\nYou need a single inbox for leads from every portal you advertise on, plus your own forms, plus WhatsApp Business. If a lead has to be re-entered manually, it won't be — and the slow ones won't get called.\n\nLook for:\n- **MagicBricks/99acres/Housing.com webhooks** out of the box\n- **Facebook Lead Ads** integration via the Meta Business API\n- **WhatsApp Business API** receiver — every "Available?" message creates a lead\n- **Missed call to lead** — virtual numbers from Exotel/Knowlarity/MyOperator\n\nIf the vendor says "you can do this with Zapier" — they don't have it.\n\n## 2. BHK + budget + locality matching\n\nReal estate brokers don't sell features, they sell *match*. The CRM should let you tag every property and every requirement with:\n- BHK (1/2/2.5/3/3.5/4/4+)\n- Budget range (₹ lakhs/crores)\n- Locality (with sub-localities — Andheri East ≠ Andheri West)\n- Furnishing (unfurnished/semi/fully)\n- Possession (ready/under-construction with target date)\n\nWhen a new lead comes in, it should auto-suggest the 5 closest properties in your inventory. When you list a new property, it should auto-notify every open lead that matches.\n\n## 3. Site visit logistics\n\nSite visits are where deals are made or lost. The CRM should track:\n- Which property, which lead, which broker\n- Pickup point and time (Mumbai traffic = the difference between 3 visits and 1 in a day)\n- Pre-visit doc checklist (Aadhaar, PAN, salary slips for loan)\n- Post-visit feedback in 30-second voice notes (because brokers won't type)\n\n## 4. RERA compliance\n\nEvery property listing needs a valid RERA number. The CRM should:\n- Reject listings without RERA\n- Auto-expire RERA numbers when the project's registration lapses\n- Surface this on every shared brochure / WhatsApp template\n\nThis is not optional after the 2024 RERA Maharashtra amendments.\n\n## 5. Communication: WhatsApp first, calls second, email last\n\nMumbai homebuyers do not check email. The CRM must default to WhatsApp templates, with calls as the secondary channel and email as a paper-trail formality. If the demo opens with email, walk away.\n\n## 6. Honest pricing\n\nMost CRMs in this space hide pricing because they want to upsell. For a 5–20 broker brokerage, a fair 2026 budget is **₹500–₹1,500 per user/month** all-in (CRM + WhatsApp BSP + virtual numbers). Anything above that is targeting enterprise and you'll pay for features you'll never use.\n\n## What we'd recommend looking at\n\nIn rough order of fit:\n1. **Leads Rubix** — built for Indian brokerages, ships with all of the above out of the box, ₹999/user/month flat\n2. Sell.Do — solid, more focused on builders than resellers\n3. PropertyMoney — narrower, but cheap\n\nSkip Salesforce, HubSpot, and Zoho CRM unless you're a 50+ broker brokerage. They're not configured for the way Mumbai real estate works.\n\n> **Bottom line:** Pick a CRM your brokers will actually open every morning. The fanciest dashboard is worthless if your team is still living in WhatsApp.	\N	draft	\N	\N	2026-05-03 09:39:44.595932+00	2026-05-03 09:39:44.595932+00	A practical buyer's guide to CRMs for real estate brokerages in Mumbai. Lead capture, BHK matching, site visit tracking, RERA compliance, and pricing.	\N	["real-estate", "mumbai", "buyers-guide"]
0b2cca45-1e0b-4abb-8fd1-59e5933baae1	whatsapp-lead-capture-india-2026	WhatsApp Lead Capture in India: A No-Hype Implementation Guide (2026)	Every Indian B2B sales team needs WhatsApp lead capture. Here's exactly how to set it up — BSP selection, template approval, attribution, and the mistakes everyone makes.	WhatsApp is no longer optional for Indian B2B. 90%+ of buyers prefer it, read rates are 5–10× email, and "Leave a WhatsApp" beats every other CTA on Indian landing pages by 2–3×. But most teams set it up wrong and end up with template rejections, leaking leads, and zero attribution.\n\nHere's what actually works in 2026.\n\n## Step 1: Pick the right BSP, not the cheapest\n\nThe WhatsApp Business API is sold through Business Solution Providers (BSPs) — Meta partners that resell access. The big ones in India:\n\n| BSP | Strength | Watch out for |\n|-----|----------|---------------|\n| Gupshup | Largest in India, broad integrations | Pricing is per-conversation + platform fee, can balloon |\n| AiSensy | Best UI for non-technical users | Limited custom-flow flexibility |\n| Interakt | Tightly integrated with Shopify | Less suited to non-ecommerce |\n| Twilio | Global, strong API | Pricier; English-first support |\n| Wati | Strong for SMEs | Growing fast but newer |\n\n**Our take:** for 5–50 person sales teams, AiSensy or Wati. For 50+ or anything custom, Gupshow or Twilio.\n\n## Step 2: Get your number verified\n\nYou need a phone number that's never been used on the consumer WhatsApp app. New numbers verify in ~2 hours. Recycled numbers can be rejected.\n\nThe "green tick" (official business verification) is separate, takes 2–6 weeks, and requires news coverage or significant brand presence. It's nice-to-have, not blocker.\n\n## Step 3: Get your templates approved on day one\n\nMeta requires every outbound first-message to use a pre-approved template. Get these approved before you launch:\n\n1. **Lead acknowledgement** ("Hi {{name}}, thanks for your interest in {{product}}. Our team will reach out within {{time}}…")\n2. **Demo confirmation** ("Your demo with {{rep}} is confirmed for {{date}} at {{time}}…")\n3. **Quote follow-up** ("Hi {{name}}, here's the quote we discussed…")\n4. **Renewal reminder** (if relevant)\n\nApproval takes 24–48 hours. Templates with marketing copy ("Best deal!" "Limited time!") get rejected — keep them transactional.\n\n## Step 4: Wire it to your CRM, both directions\n\nThis is where most teams stop, and it's the worst place to stop. You need:\n\n**Inbound:** every WhatsApp message creates or updates a CRM lead. Without this, your team is back in two windows again.\n\n**Outbound:** the CRM triggers WhatsApp templates on lead state changes. New lead = acknowledgement template within 60 seconds. Demo booked = confirmation. Quote sent = follow-up template at +2 days, +5 days, +10 days.\n\nIf your CRM doesn't do this natively, connect via webhooks (every BSP supports them).\n\n## Step 5: Attribution\n\nEvery WhatsApp click should carry UTM parameters. Use `https://wa.me/91XXXXXXXXXX?text=...` with a UTM-encoded message:\n\n```\n?text=Hi! I came from your /pricing page (utm_source=site, utm_medium=whatsapp_fab)\n```\n\nWhen the message hits your BSP, parse the source out of the message body and stamp it on the lead. Without this, every WhatsApp lead looks like "WhatsApp" and you can't measure which page actually converted.\n\n## Common mistakes\n\n1. **Using the free WhatsApp Business app for marketing** — caps at 256 contacts and flags for spam\n2. **Sending session messages outside the 24-hour window** — Meta will throttle your number\n3. **Templates with too much marketing language** — they get rejected, you wait days, you ship later\n4. **No fallback for "WhatsApp not installed"** — rare on Indian Android but still ~3%; have a tel: link\n5. **Single-rep WhatsApp** — when the rep is OOO, leads vanish; use a team inbox\n\n## What it costs in 2026\n\nFor a 10-person Indian sales team handling ~3,000 conversations a month:\n- BSP platform fee: ₹3,000–₹5,000/mo\n- Marketing conversations: ~₹0.78 each → ~₹2,340/mo\n- Service conversations: ~₹0.30 each → ~₹900/mo\n- **Total: ~₹6,000–₹8,000/mo**\n\nThis is a rounding error compared to the ROI if it's wired right. It's a complete waste if it's wired wrong.\n\n## TL;DR\n\n1. Pick a BSP that fits your team size\n2. Get templates approved on day one\n3. Wire two-way to your CRM\n4. UTM-tag every WhatsApp click\n5. Don't market in templates — they'll be rejected\n\nLeads Rubix ships with all five built in. If you're starting from scratch and want to see it configured live, [book a demo](/demo).	\N	draft	\N	\N	2026-05-03 09:39:44.604022+00	2026-05-03 09:39:44.604022+00	Step-by-step guide to WhatsApp lead capture for Indian businesses in 2026: BSP selection, template approval, CRM integration, and attribution.	\N	["whatsapp", "lead-generation", "implementation"]
3c972124-9f2a-4896-8029-45a2b934bcf5	lead-response-time-benchmarks-india-2026	Lead Response Time Benchmarks for Indian Sales Teams (2026 Data)	We analysed lead response times across 200+ Indian B2B sales teams. Here's what the top 10% are doing differently — and how to get there.	If you only fix one thing in your sales process this year, fix lead response time. Multiple studies — including the ones we ran across our customer base in Q1 2026 — confirm: it's the single largest predictor of conversion, and Indian buyer behaviour amplifies the effect compared to US/EU benchmarks.\n\n## What we measured\n\nAcross 217 Indian B2B sales teams using Leads Rubix between Jan and Mar 2026, we measured:\n- **Time to first touch** — minutes from form submit to first outbound contact (call, WhatsApp, or email)\n- **First-touch channel** — call, WhatsApp, email\n- **Conversion rate** — lead → qualified opportunity within 30 days\n- **Win rate** — qualified opp → closed-won within 90 days\n\nSample skews toward 5–50-person teams in SaaS, real estate, education, healthcare, and financial services.\n\n## Headline numbers\n\n| Percentile | Time to first touch (median) | 30-day qualification rate |\n|------------|------------------------------|---------------------------|\n| Top 10% | 1.8 minutes | 47% |\n| Top quartile | 6 minutes | 38% |\n| Median | 18 minutes | 24% |\n| Bottom quartile | 4h 12min | 11% |\n| Bottom 10% | 28 hours | 4% |\n\nThe relationship is not linear. **Going from 18 minutes to 6 minutes adds ~14 percentage points to your qualification rate. Going from 6 to 2 minutes adds another 9 points.** The difference between top-decile and median is roughly a 2× revenue uplift on the same lead volume.\n\n## By industry\n\n| Industry | Median TTFT | Top-decile TTFT |\n|----------|-------------|-----------------|\n| Real estate | 12 min | 1 min |\n| Education | 24 min | 4 min |\n| SaaS | 35 min | 8 min |\n| Healthcare | 16 min | 2 min |\n| Financial services | 9 min | 30 sec |\n\nReal estate and financial services are the fastest because the buyer is shopping multiple vendors *concurrently*. SaaS is the slowest because the buyer assumes async is fine — which they often shouldn't.\n\n## What top-decile teams actually do\n\nWe interviewed 12 of the top-decile teams. They share five practices:\n\n### 1. WhatsApp template within 60 seconds, before a human gets involved\n\nThe first contact is automated — a templated WhatsApp with the rep's name, photo, and a "I'm calling you in 5 minutes" promise. This holds the lead's attention while the human queue catches up.\n\n### 2. Lead-score-based routing\n\nHot leads (score 70+) skip the round-robin and go to a senior rep with a 5-minute SLA timer. Warm leads go to the regular queue. Cold leads go to drip nurture. Without this, the senior rep gets buried in junk and hot leads sit.\n\n### 3. Manager dashboard with live SLA breach counter\n\nVisible in the office. When the counter ticks past zero, someone moves. Sounds dystopian; works.\n\n### 4. After-hours coverage\n\nIndian leads come in at all hours, especially weekends. Top teams either have rotating after-hours shifts or have committed to "we will reply via WhatsApp template within 5 min, call within X hours." Both work; pick one and stick to it.\n\n### 5. They measure it weekly\n\nEvery Monday, the team sees their TTFT distribution from the previous week. Tracking creates the change.\n\n## What stops most teams\n\nThe honest answer: **the data isn't visible**. If you don't know your TTFT, you can't move it. Most CRMs don't surface this metric — leads are stamped `createdAt` but `firstTouchAt` is never recorded.\n\nThe fix is straightforward: stamp `firstTouchAt` on every outbound activity, and surface the median + 90th percentile per rep on a dashboard everyone sees.\n\n## Where to start\n\nIf your TTFT is over 1 hour:\n1. Set up auto-routing (round-robin if you have nothing else)\n2. Send a templated WhatsApp within 60 seconds, automatically\n3. Set a 5-minute SLA for hot leads, 30 minutes for warm\n4. Surface the live SLA counter to the floor\n\nIf your TTFT is over 4 hours:\nYou're losing 80% of winnable leads. This is the highest-leverage fix in your entire business.\n\nLeads Rubix tracks TTFT per-rep, per-source, and per-lead-score, with a real-time SLA breach view. [See the demo](/demo) or [read the lead response time glossary entry](/glossary/lead-response-time).	\N	draft	\N	\N	2026-05-03 09:39:44.608434+00	2026-05-03 09:39:44.608434+00	2026 lead response time benchmarks for Indian B2B sales teams across SaaS, real estate, education, healthcare, and financial services.	\N	["benchmarks", "lead-response", "sales-ops"]
518e05ca-be49-462e-9e42-83b87847ec53	gst-compliant-crm-india	What 'GST-Compliant CRM' Actually Means in India (And Why You Probably Need It)	Every Indian SaaS vendor claims to be 'GST-compliant'. Here's what that should mean — invoicing, e-invoicing, GSTR filings, ITC, and what to ask in a demo.	If you're shopping for a CRM in India and you see "GST-compliant" on the homepage, that's the bare minimum table-stakes — not a feature. The question is: compliant *with which parts of GST*, and how does it actually affect your business?\n\nThis post is a plain-English breakdown for a non-CA founder or sales-ops lead.\n\n## The five parts of GST a CRM might touch\n\nA CRM doesn't file your GST returns — your accountant or tally tool does that. But it can either help or get in the way at five points:\n\n### 1. GSTIN capture on every customer\n\nEvery B2B customer should have their **15-character GSTIN** stored on their record. Without this, you can't issue a B2B tax invoice, and your customer can't claim Input Tax Credit (ITC). If they can't claim ITC, your effective price is 18% higher to them than your sticker — they'll push back hard or churn at renewal.\n\nWhat to demand from a CRM:\n- Mandatory GSTIN field for B2B accounts\n- GSTIN format validation (regex: `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$`)\n- Automatic state derivation from the first two digits (so you know whether it's IGST or CGST+SGST)\n\n### 2. Tax invoice generation\n\nA GST tax invoice must include:\n- Supplier name, address, GSTIN\n- Invoice number (sequential, no gaps), date, place of supply\n- Customer name, address, GSTIN (for B2B)\n- HSN/SAC code for the service (998314 for IT consulting, 998315 for SaaS)\n- Taxable value, GST rate, GST amount (split CGST+SGST or IGST)\n- Total in words\n\nA CRM that issues quotes/invoices but skips the HSN code or mislabels CGST vs IGST is not "GST-compliant" — it's invoice-shaped paperwork that will fail at audit.\n\n### 3. E-invoicing (₹5 Cr+ turnover)\n\nIf your turnover crosses **₹5 crore**, every B2B invoice must be uploaded to the **Invoice Registration Portal (IRP)** before it's issued. The IRP returns a signed JSON with an IRN (Invoice Reference Number) and QR code, both of which must appear on the printed invoice.\n\nA truly compliant CRM:\n- Pushes invoices to the IRP automatically\n- Stores the IRN against the invoice\n- Refuses to mark an invoice "issued" without an IRN if you're above the threshold\n\nIf you're below ₹5 Cr, this doesn't apply — yet. The threshold has dropped over the years (₹500 Cr → ₹100 Cr → ₹50 Cr → ₹20 Cr → ₹10 Cr → ₹5 Cr) and will likely continue to drop.\n\n### 4. Place of supply\n\nGST is destination-based. If your office is in Karnataka and your customer is in Maharashtra, you charge IGST. If both are in Karnataka, you charge CGST + SGST. Get this wrong and your customer's ITC claim is rejected.\n\nYour CRM should derive place of supply from the customer's GSTIN (state code = first 2 digits) and tag every quote/invoice accordingly. If the rep has to pick "IGST or CGST+SGST" manually, you'll have errors.\n\n### 5. ITC reconciliation reports\n\nEach month, you should reconcile:\n- Invoices you issued (should match your GSTR-1)\n- Invoices you received (should match the GSTR-2B from your suppliers)\n\nA CRM that issues invoices should provide an export matching the GSTR-1 schema (CSV with invoice number, GSTIN, taxable value, tax breakdown). Your accountant uploads this to GSTN.\n\n## What to ask in a demo\n\n1. "Show me the customer record. Where do I enter the GSTIN? Does it validate format?"\n2. "Issue a quote, mark it accepted, generate the invoice. Show me the invoice PDF."\n3. "Same flow but for a customer in a different state — does the CGST/SGST/IGST split change correctly?"\n4. "Do you support e-invoicing? Show me the IRN on the invoice."\n5. "Export your invoices for a month — can my accountant import this into the GSTN portal directly?"\n\nIf the answer to any of those is "we're working on it" or "you can do it via Excel", you have a glorified contact list, not a GST-compliant CRM.\n\n## What it costs to *not* be GST-compliant\n\n- Customers refuse renewals when their CA flags improper invoices\n- 18% of disputed invoices in delayed limbo until corrected\n- Auditor adjustments at year-end (₹50k–₹5L per cycle, depending on volume)\n- For ₹5 Cr+ companies: penalties for missed e-invoicing of 100% of the tax amount, capped at ₹10,000 per invoice\n\n## TL;DR\n\n"GST-compliant CRM" should mean:\n1. GSTIN captured + validated on every B2B account\n2. Tax invoice with HSN code, correct CGST/SGST/IGST split, sequential numbering\n3. E-invoicing integration (if you're above ₹5 Cr)\n4. Place-of-supply derived automatically\n5. GSTR-1-shaped export\n\nAnything less is marketing copy. Leads Rubix ships with all five out of the box for our India edition.	\N	draft	\N	\N	2026-05-03 09:39:44.61242+00	2026-05-03 09:39:44.61242+00	A practical explainer of GST compliance for CRM and sales tools in India: invoicing, e-invoicing, ITC, and what to demand from your vendor in 2026.	\N	["gst", "compliance", "india"]
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.session (sid, sess, expire) FROM stdin;
J-50AhEJqbq-JdGKvNccDDNcA7DCnOrb	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T20:54:49.737Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 20:54:51
28VHnIjhLA6xHvKtXuDECjHezkbIsLdr	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T21:02:14.660Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 21:02:15
nYxUrvUilM11B5jpNeJVAjcdmznf8YD4	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T21:13:12.271Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 21:13:13
OIQXHfC0ODUMBDP6rSwVnaLyc1LJ7FMF	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T22:05:56.231Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 22:06:20
GJE9XMhK6z3EStYu3VWquchropSdJfRj	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T22:00:58.469Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 22:04:24
gYkewG7BUoJQDib2J2ZqzfCAbl88PSWp	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T21:07:19.377Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 21:07:31
S7BOBFRwwiDUcCEWc6hj67S6Shdjh1VA	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T21:11:26.783Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 21:11:27
KTKHs1nJenw_1w1cP-rk8sUaemS9dJvN	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T21:12:31.682Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 21:12:45
QJF4SpDwTJr3jrloNuVA45SkkOtZy_wj	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T22:42:46.478Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 22:43:50
MmwR_GCjVsxGIpWgGJjAkat2JAWvNxAU	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T21:41:42.897Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 21:41:59
0KdJM24RODy6p-2K-WMWWgOBpKSUHv4u	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T22:45:05.372Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 22:45:48
V2prZMXmSqTP3lvgg4635HT1JPwQD3mK	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T21:46:33.692Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 21:46:52
AJV0_dJBzNjfe4y59W9HNAoUa0_Gqy-h	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T22:47:01.355Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 22:48:30
NQ7SDmCU4HQlAWL8Tq_mf_tRtgxboWu3	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-02T04:36:45.786Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-02 04:38:12
YmVgLLjaDJO5WxV5Zx4Ht5oGdKU3TiwL	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-01T21:50:06.723Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-01 21:52:41
tT8rdbrLN3rD5PT2L1jdVwxBe7j4Emmj	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-02T04:44:10.674Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-02 04:44:11
ObQtO7gKXaB819gwHvyNadSdc6HLBHzJ	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-02T06:33:21.259Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-02 06:33:35
GEOHWFaPVVXdjfXIHD_8vNDCRY0whuFv	{"cookie":{"originalMaxAge":2592000000,"expires":"2026-06-02T04:45:14.247Z","secure":false,"httpOnly":true,"path":"/","sameSite":"lax"},"adminUserId":"4e96c8db-b2fa-4439-939e-d1fdedb726c3","adminEmail":"admin@leadsrubix.com","adminName":"Leads Rubix Admin","adminRole":"owner"}	2026-06-03 06:34:57
\.


--
-- Name: admin_users admin_users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_email_unique UNIQUE (email);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: audit_events audit_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_events
    ADD CONSTRAINT audit_events_pkey PRIMARY KEY (id);


--
-- Name: content_sections content_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content_sections
    ADD CONSTRAINT content_sections_pkey PRIMARY KEY (key);


--
-- Name: content_versions content_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content_versions
    ADD CONSTRAINT content_versions_pkey PRIMARY KEY (id);


--
-- Name: lead_activities lead_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lead_activities
    ADD CONSTRAINT lead_activities_pkey PRIMARY KEY (id);


--
-- Name: leads leads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_pkey PRIMARY KEY (id);


--
-- Name: not_found_hits not_found_hits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.not_found_hits
    ADD CONSTRAINT not_found_hits_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: posts posts_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_slug_unique UNIQUE (slug);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- Name: audit_events audit_events_actor_id_admin_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_events
    ADD CONSTRAINT audit_events_actor_id_admin_users_id_fk FOREIGN KEY (actor_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: content_sections content_sections_updated_by_admin_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content_sections
    ADD CONSTRAINT content_sections_updated_by_admin_users_id_fk FOREIGN KEY (updated_by) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: content_versions content_versions_saved_by_admin_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content_versions
    ADD CONSTRAINT content_versions_saved_by_admin_users_id_fk FOREIGN KEY (saved_by) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: lead_activities lead_activities_actor_id_admin_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lead_activities
    ADD CONSTRAINT lead_activities_actor_id_admin_users_id_fk FOREIGN KEY (actor_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: lead_activities lead_activities_lead_id_leads_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lead_activities
    ADD CONSTRAINT lead_activities_lead_id_leads_id_fk FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE CASCADE;


--
-- Name: leads leads_assigned_to_admin_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leads
    ADD CONSTRAINT leads_assigned_to_admin_users_id_fk FOREIGN KEY (assigned_to) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- Name: posts posts_author_id_admin_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_id_admin_users_id_fk FOREIGN KEY (author_id) REFERENCES public.admin_users(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict j5yzckJez7KCzoJVmV1J3DJWgaMxZTQNNqbQsczmVmNP0Nb7hgJhbvzqveIKjth

