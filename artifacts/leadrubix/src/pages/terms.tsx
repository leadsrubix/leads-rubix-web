import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/lib/useSEO";

export default function Terms() {
  useSEO({
    title: "Terms & Conditions — Leads Rubix",
    description: "The terms governing use of the Leads Rubix CRM platform — eligibility, billing, acceptable use, data ownership and jurisdiction.",
    canonical: "https://leadsrubix.com/terms",
  });
  return (
    <Layout>
      <div className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground">Last updated: 2 May 2026</p>
        </div>
      </div>

      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Leads Rubix platform, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you may not use our services.
          </p>

          <h2>2. Service Description</h2>
          <p>
            Leads Rubix provides a cloud-based Customer Relationship Management (CRM) platform tailored for India's high-velocity sales teams across industries including real estate, education, healthcare, financial services, automotive, travel, SaaS and manufacturing. The service includes lead capture, automated routing, call tracking, payments and reporting features.
          </p>

          <h2>3. Eligibility & Accounts</h2>
          <p>
            You must be at least 18 years old to use the Service. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h2>4. Subscription & Billing</h2>
          <p>
            Leads Rubix is offered on a subscription basis (monthly or annually). Payments are processed securely through Razorpay. By providing a payment method, you authorize us to charge the applicable fees on a recurring basis. All fees are non-refundable except as expressly stated in our Refund Policy.
          </p>

          <h2>5. Acceptable Use Policy</h2>
          <p>You agree not to use the Service to:</p>
          <ul>
            <li>Send unsolicited communications or spam.</li>
            <li>Store or transmit illicit, unlawful, or infringing material.</li>
            <li>Upload lead data that was not lawfully acquired in compliance with applicable data protection laws.</li>
            <li>Attempt to bypass or compromise the security mechanisms of the platform.</li>
          </ul>

          <h2>6. Data Ownership & Custodianship</h2>
          <p>
            <strong>You own your data:</strong> All lead data, contacts, and materials you upload remain your exclusive property. Leads Rubix acts solely as a data custodian to process this information on your behalf to provide the Service.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            The Leads Rubix platform, including its software, designs, trademarks, and proprietary algorithms, is the exclusive intellectual property of Leads Rubix. You are granted a limited, non-exclusive, non-transferable license to use the platform during your subscription term.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Leads Rubix shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, or data resulting from your use of the platform.
          </p>

          <h2>9. Governing Law & Jurisdiction</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Mumbai, Maharashtra.
          </p>

          <h2>10. Contact</h2>
          <p>
            For legal inquiries, please contact: <strong>legal@leadsrubix.com</strong>
          </p>
        </div>
      </div>
    </Layout>
  );
}