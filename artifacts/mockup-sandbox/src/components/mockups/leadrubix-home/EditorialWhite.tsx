import React, { useState } from "react";
import { 
  Building2, 
  Home, 
  Briefcase, 
  Network, 
  Users, 
  Check, 
  ArrowRight,
  Database,
  UserX,
  Clock,
  RefreshCw,
  PhoneCall,
  BarChart3,
  CreditCard,
  Shield,
  Search,
  CheckSquare,
  Globe,
  MapPin,
  ChevronDown,
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  MessageSquare,
  Plus,
  Minus
} from "lucide-react";

export function EditorialWhite() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white text-[#0a0e1a] font-sans selection:bg-[#ff5e3a] selection:text-white">
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      
      {/* 1. Top nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#0a0e1a]/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#ff5e3a] rounded-sm flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-['DM_Serif_Display'] text-2xl tracking-tight">Leads Rubix</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#0a0e1a]/70">
            <a href="#" className="hover:text-[#0a0e1a] transition-colors">Features</a>
            <a href="#" className="hover:text-[#0a0e1a] transition-colors">Pricing</a>
            <a href="#" className="hover:text-[#0a0e1a] transition-colors">Solutions</a>
            <a href="#" className="hover:text-[#0a0e1a] transition-colors">Blog</a>
            <a href="#" className="hover:text-[#0a0e1a] transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hidden md:block text-sm font-medium text-[#0a0e1a]/70 hover:text-[#0a0e1a]">Sign in</a>
            <button className="bg-[#0a0e1a] text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-[#ff5e3a] transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#0a0e1a]/20 rounded-full text-xs font-semibold tracking-wider uppercase text-[#0a0e1a]/60 mb-8">
              Purpose-built for Indian Real Estate
            </div>
            <h1 className="font-['DM_Serif_Display'] text-6xl md:text-7xl leading-[1.05] mb-6">
              Stop losing leads in WhatsApp. <span className="text-[#ff5e3a]">Start closing them.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#0a0e1a]/70 mb-10 leading-relaxed max-w-xl">
              The only CRM that understands the chaos of Indian real estate. Automate lead rotation, track broker performance, and respond in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <button className="bg-[#ff5e3a] text-white px-8 py-4 rounded-sm text-base font-medium hover:bg-[#e04b2a] transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-transparent text-[#0a0e1a] border border-[#0a0e1a]/20 px-8 py-4 rounded-sm text-base font-medium hover:border-[#0a0e1a] hover:bg-[#faf7f2] transition-colors w-full sm:w-auto justify-center">
                Book a Demo
              </button>
            </div>
            <p className="text-sm text-[#0a0e1a]/50 flex items-center gap-2">
              7-day free trial <span className="w-1 h-1 rounded-full bg-[#0a0e1a]/30"></span> No credit card <span className="w-1 h-1 rounded-full bg-[#0a0e1a]/30"></span> Cancel anytime
            </p>
          </div>

          <div className="relative">
            {/* Abstract UI Mockup */}
            <div className="bg-[#faf7f2] rounded-xl border border-[#0a0e1a]/10 p-6 shadow-2xl shadow-[#0a0e1a]/5 relative z-10 transform translate-x-4 rotate-1">
              <div className="flex items-center justify-between mb-8 border-b border-[#0a0e1a]/10 pb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5e3a]/20" />
                  <div className="w-3 h-3 rounded-full bg-[#0a0e1a]/20" />
                  <div className="w-3 h-3 rounded-full bg-[#0a0e1a]/20" />
                </div>
                <div className="text-xs font-semibold text-[#0a0e1a]/40 tracking-widest uppercase">Pipeline</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-4 rounded border border-[#0a0e1a]/5 shadow-sm">
                    <div className="h-2 w-1/3 bg-[#0a0e1a]/10 rounded mb-4" />
                    <div className="h-4 w-2/3 bg-[#0a0e1a]/80 rounded mb-2" />
                    <div className="h-3 w-1/2 bg-[#0a0e1a]/40 rounded mb-4" />
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#0a0e1a]/5">
                      <div className="w-6 h-6 rounded-full bg-[#faf7f2]" />
                      <div className="text-xs text-[#ff5e3a] font-medium">₹{(Math.random() * 10).toFixed(1)} Cr</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white p-5 rounded border border-[#0a0e1a]/5 shadow-sm flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#0a0e1a]/50 font-medium mb-1">New Lead from MagicBricks</div>
                  <div className="font-semibold">Rahul Sharma — 3BHK Andheri</div>
                </div>
                <div className="bg-[#ff5e3a]/10 text-[#ff5e3a] px-3 py-1 rounded text-xs font-medium">
                  Assigned to Amit
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#ff5e3a]/5 to-transparent rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </section>

      {/* 3. Built for pill strip */}
      <section className="border-y border-[#0a0e1a]/10 bg-[#faf7f2] py-8">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold tracking-widest uppercase text-[#0a0e1a]/40 mb-6">Built Exclusively For</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { icon: Building2, text: "Property Developers" },
              { icon: Home, text: "Residential Brokerages" },
              { icon: Briefcase, text: "Commercial Real Estate" },
              { icon: Network, text: "Channel Partners" },
              { icon: Users, text: "Multi-branch Sales Teams" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[#0a0e1a]/80 font-medium">
                <item.icon className="w-4 h-4 text-[#ff5e3a]" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Stats band */}
      <section className="bg-[#0a0e1a] text-[#faf7f2] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Lead Fields Tracked", value: "50+" },
            { label: "Distinct Org Roles", value: "6" },
            { label: "Capture Latency", value: "<1s" },
            { label: "Automated Capture", value: "24/7" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-['DM_Serif_Display'] text-5xl md:text-6xl text-[#ff5e3a] mb-2">{stat.value}</div>
              <div className="text-sm tracking-wider uppercase opacity-70">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. The problem */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-['DM_Serif_Display'] text-4xl md:text-5xl mb-6">Why legacy CRMs fail in Indian Real Estate.</h2>
            <p className="text-lg text-[#0a0e1a]/70">Generic tools weren't built for the scale of site visits, broker networks, and WhatsApp negotiations.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Database,
                title: "Data Chaos",
                desc: "Leads scattered across Excel sheets, WhatsApp chats, and notebooks. No single source of truth for a buyer's journey."
              },
              {
                icon: UserX,
                title: "Zero Accountability",
                desc: "Agents cherry-pick leads. No visibility into who called whom, when, and what was discussed."
              },
              {
                icon: Clock,
                title: "Slow Response Times",
                desc: "Hot leads from 99acres or Facebook sit untouched for hours while competitors call them in minutes."
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#faf7f2] p-10 border border-[#0a0e1a]/10 rounded-sm hover:border-[#ff5e3a]/50 transition-colors">
                <div className="w-12 h-12 bg-white rounded flex items-center justify-center mb-6 shadow-sm border border-[#0a0e1a]/5">
                  <item.icon className="w-6 h-6 text-[#ff5e3a]" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-[#0a0e1a]/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pipeline visualization */}
      <section className="py-24 bg-[#faf7f2] border-y border-[#0a0e1a]/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-['DM_Serif_Display'] text-4xl mb-4">A Pipeline Built for Property Sales</h2>
            <p className="text-[#0a0e1a]/70">Standardized stages that map to how real estate is actually sold.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-2 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-[#0a0e1a]/20 -translate-y-1/2 z-0" />
            
            {[
              { name: "FRESH", color: "bg-blue-50 text-blue-700 border-blue-200" },
              { name: "CALLBACK", color: "bg-amber-50 text-amber-700 border-amber-200" },
              { name: "INTERESTED", color: "bg-purple-50 text-purple-700 border-purple-200" },
              { name: "BOOKED", color: "bg-green-50 text-green-700 border-green-200" },
              { name: "LOST", color: "bg-zinc-50 text-zinc-600 border-zinc-200" }
            ].map((stage, i) => (
              <div key={i} className="relative z-10 flex-1">
                <div className={`bg-white border p-4 shadow-sm ${stage.color}`}>
                  <div className="text-xs font-bold tracking-widest mb-2">{stage.name}</div>
                  <div className="text-2xl font-['DM_Serif_Display'] opacity-80">{Math.floor(Math.random() * 50 + 10)}</div>
                  <div className="text-[10px] uppercase tracking-wider opacity-60 mt-1">Leads</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Features grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-['DM_Serif_Display'] text-4xl md:text-5xl text-center mb-20">Everything you need to close more deals.</h2>
          
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-16">
            {[
              { icon: RefreshCw, title: "Automated Lead Rotation", desc: "Distribute incoming leads instantly based on rules, availability, and performance." },
              { icon: PhoneCall, title: "Call Log Tracking", desc: "Native integration with telephony providers to log every call duration and recording." },
              { icon: BarChart3, title: "Real-time Analytics", desc: "Dashboards tracking site visits, source ROI, and agent conversion rates." },
              { icon: CreditCard, title: "Bookings & Payments", desc: "Generate payment links and track token amounts directly within the deal record." },
              { icon: Shield, title: "Role-Based Access", desc: "Granular permissions ensuring agents only see their leads, while admins see everything." },
              { icon: Search, title: "Multi-Source Capture", desc: "Ingest leads from Facebook, Google, 99acres, MagicBricks, and your website seamlessly." },
              { icon: CheckSquare, title: "Task Management", desc: "Automated follow-up reminders so a hot lead never slips through the cracks." },
              { icon: Globe, title: "Multi-Org Support", desc: "Manage multiple projects, branches, or channel partners from a single master dashboard." },
              { icon: MapPin, title: "GPS Call Tracking", desc: "Verify agent locations during site visits or outdoor meetings for better accountability." }
            ].map((item, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex-shrink-0 mt-1">
                  <item.icon className="w-6 h-6 text-[#0a0e1a]/40 group-hover:text-[#ff5e3a] transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-lg">{item.title}</h3>
                  <p className="text-[#0a0e1a]/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Lead Rotation Deep Dive */}
      <section className="py-32 bg-[#0a0e1a] text-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-[#ff5e3a] font-bold tracking-widest text-xs uppercase mb-4">Core Technology</div>
            <h2 className="font-['DM_Serif_Display'] text-4xl md:text-5xl mb-8">Never let a lead go cold again.</h2>
            <p className="text-[#faf7f2]/70 text-lg mb-12">Our proprietary lead rotation engine ensures every inquiry gets a response within minutes, automatically reassigning leads if an agent is unavailable.</p>
            
            <div className="space-y-8">
              {[
                { step: "01", title: "Lead Arrives", desc: "Captured instantly from any source via API or Webhook." },
                { step: "02", title: "Response Window", desc: "Agent has 15 minutes (customizable) to action the lead." },
                { step: "03", title: "Auto-Reassignment", desc: "If untouched, the lead rotates to the next available agent." },
                { step: "04", title: "Schedule Aware", desc: "Rotation rules respect agent working hours and leaves." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="text-[#ff5e3a] font-['DM_Serif_Display'] text-2xl">{item.step}</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-[#faf7f2]/50 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#faf7f2]/5 rounded-xl border border-[#faf7f2]/10 p-8">
            <div className="space-y-4">
              <div className="bg-[#faf7f2]/10 p-4 rounded border border-[#faf7f2]/20 flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium mb-1">Incoming: Facebook Ads</div>
                  <div className="text-xs text-[#faf7f2]/50">Project: Horizon Towers</div>
                </div>
                <div className="text-xs bg-[#ff5e3a] text-white px-2 py-1 rounded">Just Now</div>
              </div>
              <div className="flex justify-center my-2">
                <ArrowRight className="w-5 h-5 text-[#faf7f2]/30 rotate-90" />
              </div>
              <div className="bg-[#faf7f2] text-[#0a0e1a] p-4 rounded border border-[#faf7f2]/20 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#0a0e1a]/10 flex items-center justify-center font-bold">AS</div>
                <div>
                  <div className="text-sm font-bold">Assigned to Amit Singh</div>
                  <div className="text-xs text-[#0a0e1a]/60">15:00 countdown started</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Six roles cards */}
      <section className="py-32 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-['DM_Serif_Display'] text-4xl mb-4">Built for the entire organization</h2>
            <p className="text-[#0a0e1a]/70">Specific views and permissions for every role in your company.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Super Admin",
              "Organization Admin",
              "Operation Manager",
              "Team Lead",
              "Lead Manager",
              "Sales Agent"
            ].map((role, i) => (
              <div key={i} className="bg-white p-6 border border-[#0a0e1a]/10 rounded shadow-sm hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-full bg-[#ff5e3a]/10 flex items-center justify-center mb-4">
                  <Shield className="w-4 h-4 text-[#ff5e3a]" />
                </div>
                <h3 className="font-bold mb-2">{role}</h3>
                <p className="text-sm text-[#0a0e1a]/60">Customized dashboard and permission set designed specifically for this function.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Integrations strip */}
      <section className="py-16 border-y border-[#0a0e1a]/10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 text-center mb-8">
          <p className="text-xs font-bold tracking-widest uppercase text-[#0a0e1a]/40">Integrates with your stack</p>
        </div>
        <div className="flex gap-16 items-center justify-center flex-wrap max-w-5xl mx-auto opacity-70">
          <div className="flex items-center gap-2 font-bold text-lg"><Facebook className="w-6 h-6" /> Facebook</div>
          <div className="flex items-center gap-2 font-bold text-lg"><Instagram className="w-6 h-6" /> Instagram</div>
          <div className="flex items-center gap-2 font-bold text-lg"><MessageCircle className="w-6 h-6" /> WhatsApp</div>
          <div className="flex items-center gap-2 font-bold text-lg"><CreditCard className="w-6 h-6" /> Razorpay</div>
          <div className="flex items-center gap-2 font-bold text-lg"><Mail className="w-6 h-6" /> SMTP</div>
          <div className="flex items-center gap-2 font-bold text-lg"><MessageSquare className="w-6 h-6" /> SMS</div>
          <div className="flex items-center gap-2 font-bold text-lg"><Database className="w-6 h-6" /> REST API</div>
        </div>
      </section>

      {/* 11. Testimonials */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-['DM_Serif_Display'] text-4xl text-center mb-16">Trusted by top developers</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Before Leads Rubix, we were losing 30% of our Facebook leads just because agents didn't check the sheet in time. Now, every lead is called within 5 minutes. Our site visits have doubled.",
                author: "Rajeev K.",
                role: "VP Sales, Horizon Developers"
              },
              {
                quote: "The role-based access is a game-changer. Our channel partners can only see their own leads, while my central team has full visibility. It eliminated all the daily friction.",
                author: "Sneha P.",
                role: "Operations Head, Metro Realty"
              },
              {
                quote: "Finally, a CRM that understands Indian real estate. The ability to track WhatsApp conversations and token payments in the same timeline has streamlined our entire closing process.",
                author: "Amitab S.",
                role: "Director, Prime Properties"
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#faf7f2] p-8 border border-[#0a0e1a]/10 relative">
                <div className="text-[#ff5e3a] font-['DM_Serif_Display'] text-6xl absolute top-4 left-6 opacity-20">"</div>
                <p className="relative z-10 text-lg leading-relaxed mb-8 italic">"{item.quote}"</p>
                <div>
                  <div className="font-bold">{item.author}</div>
                  <div className="text-sm text-[#0a0e1a]/60">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Pricing */}
      <section className="py-32 bg-[#faf7f2] border-y border-[#0a0e1a]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-['DM_Serif_Display'] text-4xl mb-4">Transparent Pricing</h2>
            <p className="text-[#0a0e1a]/70">No hidden fees. Scale as you grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-white p-8 border border-[#0a0e1a]/10">
              <h3 className="font-bold text-xl mb-2">Starter</h3>
              <p className="text-[#0a0e1a]/60 text-sm mb-6">For small brokerages</p>
              <div className="mb-8">
                <span className="text-3xl font-['DM_Serif_Display']">₹999</span>
                <span className="text-[#0a0e1a]/50 text-sm">/user/mo</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm">
                <li className="flex gap-3"><Check className="w-4 h-4 text-[#ff5e3a] shrink-0" /> Up to 5 users</li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-[#ff5e3a] shrink-0" /> Basic Lead Management</li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-[#ff5e3a] shrink-0" /> Standard Reports</li>
              </ul>
              <button className="w-full py-3 border border-[#0a0e1a] text-[#0a0e1a] font-medium hover:bg-[#0a0e1a] hover:text-white transition-colors">
                Start Trial
              </button>
            </div>

            {/* Growth */}
            <div className="bg-[#0a0e1a] text-white p-8 border border-[#0a0e1a] relative transform md:-translate-y-4 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ff5e3a] text-white text-xs font-bold uppercase tracking-widest px-4 py-1">
                Most Popular
              </div>
              <h3 className="font-bold text-xl mb-2">Growth</h3>
              <p className="text-white/60 text-sm mb-6">For growing developer teams</p>
              <div className="mb-8">
                <span className="text-3xl font-['DM_Serif_Display'] text-[#ff5e3a]">₹1,499</span>
                <span className="text-white/50 text-sm">/user/mo</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm">
                <li className="flex gap-3"><Check className="w-4 h-4 text-[#ff5e3a] shrink-0" /> Unlimited users</li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-[#ff5e3a] shrink-0" /> Auto Lead Rotation</li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-[#ff5e3a] shrink-0" /> Call Tracking Integration</li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-[#ff5e3a] shrink-0" /> WhatsApp API</li>
              </ul>
              <button className="w-full py-3 bg-[#ff5e3a] text-white font-medium hover:bg-[#e04b2a] transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-white p-8 border border-[#0a0e1a]/10">
              <h3 className="font-bold text-xl mb-2">Enterprise</h3>
              <p className="text-[#0a0e1a]/60 text-sm mb-6">For massive scale</p>
              <div className="mb-8">
                <span className="text-3xl font-['DM_Serif_Display']">Custom</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm">
                <li className="flex gap-3"><Check className="w-4 h-4 text-[#ff5e3a] shrink-0" /> Dedicated Account Manager</li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-[#ff5e3a] shrink-0" /> Custom Integrations</li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-[#ff5e3a] shrink-0" /> White-labelling</li>
                <li className="flex gap-3"><Check className="w-4 h-4 text-[#ff5e3a] shrink-0" /> On-premise deployment</li>
              </ul>
              <button className="w-full py-3 border border-[#0a0e1a] text-[#0a0e1a] font-medium hover:bg-[#0a0e1a] hover:text-white transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-['DM_Serif_Display'] text-4xl text-center mb-16">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              { q: "How long is the free trial?", a: "We offer a 7-day full-featured free trial. No credit card is required to sign up." },
              { q: "Can I cancel anytime?", a: "Yes, our subscriptions are month-to-month. You can cancel at any time without penalty." },
              { q: "Do you offer white-labelling?", a: "Yes, white-labelling is available on our Enterprise plan. You can use your own domain and branding." },
              { q: "Is GST included in the pricing?", a: "No, the prices listed are exclusive of 18% GST." },
              { q: "Who owns my data?", a: "You do. We provide easy export tools so you can download your leads and data at any time." },
              { q: "What kind of support do you offer?", a: "We offer email support for all plans, priority chat support for Growth, and a dedicated manager for Enterprise." }
            ].map((faq, i) => (
              <div key={i} className="border border-[#0a0e1a]/10 bg-white">
                <button 
                  className="w-full text-left px-6 py-4 font-bold flex justify-between items-center hover:bg-[#faf7f2] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  {openFaq === i ? <Minus className="w-4 h-4 text-[#ff5e3a]" /> : <Plus className="w-4 h-4 text-[#0a0e1a]/40" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 text-[#0a0e1a]/70 text-sm leading-relaxed border-t border-[#0a0e1a]/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Final CTA */}
      <section className="py-24 bg-[#ff5e3a] text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-['DM_Serif_Display'] text-5xl mb-6">Ready to close more deals?</h2>
          <p className="text-xl text-white/80 mb-10">Join top Indian developers managing their pipeline on Leads Rubix.</p>
          <button className="bg-[#0a0e1a] text-white px-8 py-4 rounded-sm text-lg font-medium hover:bg-white hover:text-[#0a0e1a] transition-colors">
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* 15. Footer */}
      <footer className="bg-[#0a0e1a] text-white/60 py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-[#ff5e3a] rounded-sm flex items-center justify-center">
                <Building2 className="w-3 h-3 text-white" />
              </div>
              <span className="font-['DM_Serif_Display'] text-xl text-white">Leads Rubix</span>
            </div>
            <p className="text-sm">The intelligent CRM for Indian real estate developers and brokers.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#ff5e3a] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#ff5e3a] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#ff5e3a] transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-[#ff5e3a] transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#ff5e3a] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#ff5e3a] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#ff5e3a] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#ff5e3a] transition-colors">Partners</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#ff5e3a] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#ff5e3a] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#ff5e3a] transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-xs text-center border-t border-white/10 pt-8">
          © {new Date().getFullYear()} Leads Rubix Technologies Pvt. Ltd., Mumbai · GSTIN: 27AABCU9603R1ZM
        </div>
      </footer>
    </div>
  );
}
