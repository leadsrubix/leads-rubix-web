import { Layout } from "@/components/layout/Layout";
import { useSEO } from "@/lib/useSEO";

export default function Cookies() {
  useSEO({
    title: "Cookie Policy — Leads Rubix",
    description: "How Leads Rubix uses cookies and similar technologies, the categories of cookies we set, and how to control them.",
    canonical: "https://leadsrubix.com/cookies",
  });
  return (
    <Layout>
      <div className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">Last updated: 2 May 2026</p>
        </div>
      </div>

      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl prose prose-slate">
          <p>
            This Cookie Policy explains how Leads Rubix uses cookies and similar technologies to recognize you when you visit our website and use our platform.
          </p>

          <h2>1. What are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by online service providers to facilitate and help make the interaction between users and websites faster and easier, as well as to provide reporting information.
          </p>

          <h2>2. Types of Cookies We Use</h2>
          <p>We use the following types of cookies strictly for operational and analytical purposes:</p>
          <ul>
            <li><strong>Strictly Necessary Cookies:</strong> Essential for the operation of the CRM. These include authentication cookies (JWT tokens) that keep you logged in and secure your session.</li>
            <li><strong>Functional Cookies:</strong> Used to remember your preferences and settings (e.g., UI theme, table view settings) to enhance your experience.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how the platform is being used so we can improve performance and design.</li>
          </ul>
          <p><strong>Note:</strong> We do <em>not</em> use third-party advertising or tracking cookies designed to follow you across the internet.</p>

          <h2>3. Third-Party Cookies</h2>
          <p>
            Some features of our platform rely on third-party services that may set their own cookies:
          </p>
          <ul>
            <li><strong>Razorpay:</strong> Used securely during the checkout and billing process to handle payment sessions.</li>
            <li><strong>Google Analytics (if deployed):</strong> Used purely for aggregated, anonymized usage statistics.</li>
          </ul>

          <h2>4. Managing Cookies</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, but your access to essential functionality within the Leads Rubix application will be severely restricted (e.g., you will be unable to log in).
          </p>

          <h2>5. Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this policy regularly to stay informed.
          </p>

          <h2>6. Contact</h2>
          <p>
            If you have questions about our use of cookies, please contact us at: <strong>info@leadsrubix.com</strong>
          </p>
        </div>
      </div>
    </Layout>
  );
}