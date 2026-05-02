import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/lib/useSEO";

export default function Refund() {
  useSEO({
    title: "Refund Policy — Leads Rubix",
    description: "Leads Rubix subscription refund terms — 7-day free trial, monthly cancel-anytime, and 30-day pro-rated refunds for annual plans.",
    canonical: "https://leadsrubix.com/refund",
  });
  return (
    <Layout>
      <div className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Refund Policy</h1>
          <p className="text-muted-foreground">Last updated: 2 May 2026</p>
        </div>
      </div>

      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
          <p>
            We strive to deliver exceptional value with Leads Rubix. This policy outlines the conditions under which refunds are processed for our subscription services, in compliance with standard payment gateway (Razorpay) and Indian banking regulations.
          </p>

          <h2>1. Free Trial Period</h2>
          <p>
            Leads Rubix offers a 7-day free trial for new customers. No credit card is required to begin the trial. This allows you to fully evaluate the platform before making a financial commitment.
          </p>

          <h2>2. Monthly Subscriptions</h2>
          <p>
            Monthly subscriptions are billed in advance on a recurring basis. You may cancel your subscription at any time. However, we do not provide refunds or credits for partial months of service, downgrade refunds, or refunds for months unused with an open account.
          </p>

          <h2>3. Annual Subscriptions</h2>
          <p>
            Annual subscriptions are billed upfront. If you cancel an annual subscription within the first 30 days of the purchase date, you are eligible for a pro-rated refund for the remaining 11 months. After the initial 30 days, annual subscriptions become strictly non-refundable.
          </p>

          <h2>4. Refund Process & Timeline</h2>
          <p>
            If you are eligible for a refund based on the criteria above, the refund will be processed and credited back to your original payment method (via Razorpay). Please allow 5-7 business days for the funds to appear in your account, depending on your bank's processing times.
          </p>

          <h2>5. Non-Eligible Cases</h2>
          <p>Refunds will not be issued in the following scenarios:</p>
          <ul>
            <li>Failure to utilize the platform after payment.</li>
            <li>Termination of your account due to a violation of our Terms & Conditions or Acceptable Use Policy.</li>
            <li>Custom development, onboarding, or training fees, which are inherently non-refundable.</li>
          </ul>

          <h2>6. Contact for Refunds</h2>
          <p>
            To request a refund or if you have billing-related questions, please email us at:
            <br />
            <strong>billing@leadsrubix.com</strong>
          </p>
        </div>
      </div>
    </Layout>
  );
}