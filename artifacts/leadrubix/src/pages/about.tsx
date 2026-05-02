import { Layout } from "@/components/layout/Layout";

export default function About() {
  return (
    <Layout>
      <div className="py-20 bg-slate-50 border-b">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Built for Indian Real Estate</h1>
          <p className="text-xl text-muted-foreground">Our mission is to bring structure, accountability, and speed to property sales teams across India.</p>
        </div>
      </div>

      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl prose prose-lg prose-slate">
          <h2>The Problem</h2>
          <p>
            For too long, Indian real estate teams have operated in chaos. Leads generated from expensive Facebook campaigns end up scattered across personal WhatsApp chats, disjointed spreadsheets, and forgotten notebooks. Vital follow-ups are missed, team performance is invisible, and millions in potential revenue are lost simply because of bad data management.
          </p>

          <h2>The Solution</h2>
          <p>
            Leads Rubix was engineered from the ground up to solve this exact problem. We aren't a generic CRM trying to serve a hundred different industries. We are a specialized tool built strictly for the workflows, hierarchies, and realities of selling property in India. 
          </p>
          <p>
            We capture leads instantly, enforce round-robin distribution so no lead sits idle, and track every single interaction—down to the GPS coordinates of a site visit or a sales call.
          </p>

          <h2>Who We Serve</h2>
          <p>
            <strong>Property Developers:</strong> Manage massive lead volumes across multiple projects with tight access controls and clear top-down visibility.
            <br />
            <strong>Brokerages:</strong> Arm your agents with the tools they need to follow up faster, while ensuring the brokerage retains ownership of all lead data.
            <br />
            <strong>High-Volume Sales Teams:</strong> Eliminate the manual busywork of assigning leads and generating reports.
          </p>

          <h2>Our Approach</h2>
          <p>
            We believe in software that gets out of the way. Leads Rubix is fast to deploy, requires minimal training, and focuses entirely on the metrics that matter: response times, activity levels, and booked revenue.
          </p>
        </div>
      </div>
    </Layout>
  );
}