import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/lib/useSEO";

export default function Privacy() {
  useSEO({
    title: "Privacy Policy — Leads Rubix",
    description: "How Leads Rubix collects, uses, and protects personal data, and our DPDP Act 2023 compliance and grievance officer details.",
    canonical: "https://leadsrubix.com/privacy",
  });
  return (
    <Layout>
      <div className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: 2 May 2026</p>
        </div>
      </div>

      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
          <p>
            Leads Rubix ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Customer Relationship Management (CRM) platform designed for real estate professionals in India.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We collect several types of information from and about users of our Platform:</p>
          <ul>
            <li><strong>Account Information:</strong> Name, email address, phone number, company name, and role/title when you register for an account.</li>
            <li><strong>Lead Data:</strong> Information you input or import regarding your prospective clients, including their names, contact details, budget, property preferences, and interaction history.</li>
            <li><strong>Call Logs & Telemetry:</strong> When using our mobile application or dialer integrations, we log call durations, timestamps, and GPS coordinates (with proper permissions) to facilitate team accountability.</li>
            <li><strong>Payment Data:</strong> Billing details processed securely via Razorpay. We do not store full credit card numbers on our servers.</li>
            <li><strong>Usage Data:</strong> Information about how you navigate and interact with our platform to help us improve the service.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the collected information for various purposes, including to:</p>
          <ul>
            <li>Provide, operate, and maintain the CRM platform.</li>
            <li>Facilitate lead capture, assignment, and management for your organization.</li>
            <li>Process payments and manage subscriptions.</li>
            <li>Provide customer support and respond to your inquiries.</li>
            <li>Monitor and analyze usage and trends to improve your experience.</li>
            <li>Comply with legal obligations and enforce our Terms of Service.</li>
          </ul>

          <h2>3. Third-Party Services</h2>
          <p>We integrate with trusted third-party services to operate Leads Rubix. These services process data in accordance with their own privacy policies:</p>
          <ul>
            <li><strong>Authentication & Database:</strong> Firebase Auth, Firestore, and MongoDB Atlas for secure data storage and user management.</li>
            <li><strong>Hosting:</strong> AWS Elastic Beanstalk for reliable infrastructure.</li>
            <li><strong>Payments:</strong> Razorpay for processing subscription fees and invoice payments.</li>
            <li><strong>Lead Sources:</strong> Facebook/Instagram Lead Ads via webhook integrations.</li>
            <li><strong>Communications:</strong> SMTP email providers and SMS gateways for notifications.</li>
          </ul>

          <h2>4. Data Retention</h2>
          <p>We retain your personal information and uploaded lead data only for as long as necessary to provide you with our services and fulfill the purposes outlined in this policy. Upon account termination, data is securely deleted in accordance with our retention schedules, unless required otherwise by law.</p>

          <h2>5. Your Data Rights</h2>
          <p>In compliance with applicable laws, including the Digital Personal Data Protection (DPDP) Act 2023 of India, you have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Request correction of inaccurate or incomplete data.</li>
            <li>Request deletion of your data.</li>
            <li>Export your lead data in standard formats (CSV) at any time.</li>
          </ul>

          <h2>6. Security Measures</h2>
          <p>We implement robust security measures to protect your data, including encryption in transit (HTTPS/TLS), JWT-based authentication, and strict role-based access controls (RBAC) ensuring that users only see data appropriate to their permission level.</p>

          <h2>7. DPDP Grievance Officer</h2>
          <p>In compliance with the Digital Personal Data Protection Act, 2023, you may contact our Grievance Officer for any data-related concerns, requests, or complaints:</p>
          <ul>
            <li><strong>Designation:</strong> Grievance Officer / Data Protection Officer, Leads Rubix Technologies Pvt. Ltd.</li>
            <li><strong>Email:</strong> grievance@leadsrubix.com</li>
            <li><strong>Postal address:</strong> Grievance Officer, Leads Rubix Technologies Pvt. Ltd., Mumbai, Maharashtra, India</li>
            <li><strong>Acknowledgement SLA:</strong> within 3 business days</li>
            <li><strong>Resolution SLA:</strong> within 30 days from receipt of a verifiable request, in line with the DPDP Act</li>
          </ul>
          <p>If you are not satisfied with our response, you may approach the Data Protection Board of India.</p>

          <h2>8. Contact Us</h2>
          <p>For general questions about this Privacy Policy or our data practices, please contact us at <strong>privacy@leadsrubix.com</strong>.</p>
        </div>
      </div>
    </Layout>
  );
}