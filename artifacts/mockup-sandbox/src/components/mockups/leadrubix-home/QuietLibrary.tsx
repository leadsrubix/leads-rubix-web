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
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
  MessageSquare,
  Plus,
  Minus
} from "lucide-react";

export function QuietLibrary() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#f7f5f1] text-[#2a2622] font-sans selection:bg-[#7a1f2b] selection:text-white">
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      
      {/* 1. Top nav */}
      <nav className="sticky top-0 z-50 bg-[#f7f5f1]/90 backdrop-blur-md border-b border-[#2a2622]/10">
        <div className="max-w-6xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#2a2622]/20 flex items-center justify-center bg-[#fbfaf7]">
              <Building2 className="w-4 h-4 text-[#2a2622]" />
            </div>
            <span className="font-['Fraunces'] text-xl tracking-wide font-medium">Leads Rubix</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[15px] font-medium text-[#6f6a63]">
            <a href="#" className="hover:text-[#2a2622] transition-colors">Features</a>
            <a href="#" className="hover:text-[#2a2622] transition-colors">Pricing</a>
            <a href="#" className="hover:text-[#2a2622] transition-colors">Solutions</a>
            <a href="#" className="hover:text-[#2a2622] transition-colors">Blog</a>
            <a href="#" className="hover:text-[#2a2622] transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hidden md:block text-[15px] font-medium text-[#6f6a63] hover:text-[#2a2622]">Sign in</a>
            <button className="bg-[#7a1f2b] text-[#fbfaf7] px-6 py-2.5 text-[15px] font-medium hover:bg-[#5a1620] transition-colors border border-[#7a1f2b]">
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 font-['Fraunces'] text-xs font-semibold tracking-[0.2em] uppercase text-[#6f6a63] mb-10">
              <div className="w-1.5 h-1.5 bg-[#7a1f2b] rounded-full" />
              Purpose-built for Indian Real Estate
            </div>
            <h1 className="font-['Fraunces'] text-6xl md:text-7xl leading-[1.1] mb-8 font-medium">
              Stop losing leads in WhatsApp. <span className="italic text-[#7a1f2b]">Start closing them.</span>
            </h1>
            <p className="text-[16px] text-[#6f6a63] mb-12 leading-loose max-w-xl">
              The only CRM that understands the chaos of Indian real estate. Automate lead rotation, track broker performance, and respond in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
              <button className="bg-[#7a1f2b] text-[#fbfaf7] px-8 py-4 text-[15px] font-medium hover:bg-[#5a1620] transition-colors flex items-center gap-3 w-full sm:w-auto justify-center border border-[#7a1f2b]">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-transparent text-[#2a2622] border border-[#2a2622]/20 px-8 py-4 text-[15px] font-medium hover:border-[#2a2622] hover:bg-[#fbfaf7] transition-colors w-full sm:w-auto justify-center">
                Book a Demo
              </button>
            </div>
            <p className="text-sm text-[#6f6a63] flex items-center gap-3">
              7-day free trial <span className="w-px h-3 bg-[#2a2622]/20"></span> No credit card <span className="w-px h-3 bg-[#2a2622]/20"></span> Cancel anytime
            </p>
          </div>

          <div className="relative">
            {/* Abstract UI Mockup */}
            <div className="bg-[#fbfaf7] border border-[#2a2622]/10 p-8 relative z-10 transform translate-x-4">
              <div className="flex items-center justify-between mb-10 border-b border-[#2a2622]/10 pb-4">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 bg-[#2a2622]/10" />
                  <div className="w-2.5 h-2.5 bg-[#2a2622]/10" />
                  <div className="w-2.5 h-2.5 bg-[#2a2622]/10" />
                </div>
                <div className="font-['Fraunces'] text-[10px] font-semibold text-[#6f6a63] tracking-[0.2em] uppercase">Pipeline</div>
              </div>
              
              <div className="grid grid-cols-3 gap-5 mb-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-[#f7f5f1] p-5 border border-[#2a2622]/10">
                    <div className="h-px w-1/3 bg-[#2a2622]/20 mb-5" />
                    <div className="h-3 w-2/3 bg-[#2a2622]/80 mb-3" />
                    <div className="h-2 w-1/2 bg-[#2a2622]/40 mb-6" />
                    <div className="flex justify-between items-center mt-5 pt-5 border-t border-[#2a2622]/10">
                      <div className="w-5 h-5 bg-[#2a2622]/5" />
                      <div className="text-xs text-[#2a2622] font-medium font-['Fraunces']">₹{(Math.random() * 10).toFixed(1)} Cr</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-[#f7f5f1] p-6 border border-[#2a2622]/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#6f6a63] font-medium mb-2 font-['Fraunces'] uppercase tracking-wider">New Lead from MagicBricks</div>
                  <div className="font-medium text-[#2a2622]">Rahul Sharma — 3BHK Andheri</div>
                </div>
                <div className="border border-[#7a1f2b]/20 text-[#7a1f2b] px-3 py-1.5 text-xs font-medium">
                  Assigned to Amit
                </div>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#fbfaf7] -z-10 rounded-full blur-[100px] opacity-50" />
          </div>
        </div>
      </section>

      {/* 3. Built for pill strip */}
      <section className="border-y border-[#2a2622]/10 bg-[#fbfaf7] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center font-['Fraunces'] text-xs font-semibold tracking-[0.2em] uppercase text-[#6f6a63] mb-8">Built Exclusively For</p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {[
              { icon: Building2, text: "Property Developers" },
              { icon: Home, text: "Residential Brokerages" },
              { icon: Briefcase, text: "Commercial Real Estate" },
              { icon: Network, text: "Channel Partners" },
              { icon: Users, text: "Multi-branch Sales Teams" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-[#2a2622] font-medium">
                <item.icon className="w-4 h-4 text-[#6f6a63]" />
                <span className="text-[15px]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Stats band */}
      <section className="bg-[#4a131a] text-[#fbfaf7] py-28 border-y border-[#7a1f2b]">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
          {[
            { label: "Lead Fields Tracked", value: "50+" },
            { label: "Distinct Org Roles", value: "6" },
            { label: "Capture Latency", value: "<1s" },
            { label: "Automated Capture", value: "24/7" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="font-['Fraunces'] text-5xl md:text-6xl mb-4 font-medium tracking-tight text-[#fbfaf7]">{stat.value}</div>
              <div className="font-['Fraunces'] text-xs tracking-[0.2em] uppercase text-[#fbfaf7]/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. The problem */}
      <section className="py-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl mb-8 font-medium leading-[1.15]">Why legacy CRMs fail in Indian Real Estate.</h2>
            <p className="text-[16px] text-[#6f6a63] leading-loose">Generic tools weren't built for the scale of site visits, broker networks, and WhatsApp negotiations.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
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
              <div key={i} className="bg-[#fbfaf7] p-12 border-t border-[#2a2622]/10 hover:border-[#7a1f2b]/30 transition-colors">
                <div className="mb-8">
                  <item.icon className="w-6 h-6 text-[#2a2622]" />
                </div>
                <h3 className="font-['Fraunces'] text-2xl font-medium mb-5">{item.title}</h3>
                <p className="text-[#6f6a63] leading-loose text-[15px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pipeline visualization */}
      <section className="py-32 bg-[#fbfaf7] border-y border-[#2a2622]/10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl mb-6 font-medium">A Pipeline Built for Property Sales</h2>
            <p className="text-[#6f6a63] text-[16px]">Standardized stages that map to how real estate is actually sold.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 md:gap-0 relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-[#2a2622]/10 -translate-y-1/2 z-0" />
            
            {[
              { name: "FRESH" },
              { name: "CALLBACK" },
              { name: "INTERESTED" },
              { name: "BOOKED" },
              { name: "LOST" }
            ].map((stage, i) => (
              <div key={i} className="relative z-10 flex-1 md:px-3">
                <div className="bg-[#f7f5f1] border border-[#2a2622]/20 p-6 text-center">
                  <div className="font-['Fraunces'] text-[10px] font-semibold tracking-[0.2em] mb-4 text-[#6f6a63] uppercase">{stage.name}</div>
                  <div className="text-3xl font-['Fraunces'] font-medium text-[#2a2622]">{Math.floor(Math.random() * 50 + 10)}</div>
                  <div className="text-[10px] uppercase tracking-widest text-[#6f6a63] mt-2">Leads</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Features grid */}
      <section className="py-40">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-center mb-24 font-medium">Everything you need to close more deals.</h2>
          
          <div className="grid md:grid-cols-3 gap-x-12 gap-y-20">
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
              <div key={i} className="flex gap-5 group">
                <div className="flex-shrink-0 mt-1">
                  <item.icon className="w-5 h-5 text-[#6f6a63] group-hover:text-[#7a1f2b] transition-colors" />
                </div>
                <div>
                  <h3 className="font-['Fraunces'] text-xl font-medium mb-3 text-[#2a2622]">{item.title}</h3>
                  <p className="text-[#6f6a63] text-[15px] leading-loose">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Lead Rotation Deep Dive */}
      <section className="py-40 bg-[#fbfaf7] border-y border-[#2a2622]/10">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="flex items-center gap-3 font-['Fraunces'] text-xs font-semibold tracking-[0.2em] uppercase text-[#6f6a63] mb-8">
              <div className="w-1.5 h-1.5 bg-[#7a1f2b] rounded-full" />
              Core Technology
            </div>
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl mb-8 font-medium leading-[1.1]">Never let a lead go cold again.</h2>
            <p className="text-[#6f6a63] text-[16px] leading-loose mb-16">Our proprietary lead rotation engine ensures every inquiry gets a response within minutes, automatically reassigning leads if an agent is unavailable.</p>
            
            <div className="space-y-12 border-l border-[#2a2622]/10 pl-8 ml-2">
              {[
                { step: "01", title: "Lead Arrives", desc: "Captured instantly from any source via API or Webhook." },
                { step: "02", title: "Response Window", desc: "Agent has 15 minutes (customizable) to action the lead." },
                { step: "03", title: "Auto-Reassignment", desc: "If untouched, the lead rotates to the next available agent." },
                { step: "04", title: "Schedule Aware", desc: "Rotation rules respect agent working hours and leaves." }
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[45px] top-1 bg-[#fbfaf7] py-1 text-[#6f6a63] font-['Fraunces'] text-sm italic">{item.step}</div>
                  <div>
                    <h4 className="font-['Fraunces'] text-lg font-medium mb-2 text-[#2a2622]">{item.title}</h4>
                    <p className="text-[#6f6a63] text-[15px] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#f7f5f1] border border-[#2a2622]/10 p-10">
            <div className="space-y-6">
              <div className="bg-[#fbfaf7] p-5 border border-[#2a2622]/10 flex justify-between items-center">
                <div>
                  <div className="text-[14px] font-medium mb-1 text-[#2a2622]">Incoming: Facebook Ads</div>
                  <div className="text-[13px] text-[#6f6a63]">Project: Horizon Towers</div>
                </div>
                <div className="text-[11px] font-medium border border-[#2a2622]/20 text-[#2a2622] px-3 py-1 uppercase tracking-wider">Just Now</div>
              </div>
              <div className="flex justify-center my-4">
                <ArrowRight className="w-5 h-5 text-[#2a2622]/30 rotate-90" />
              </div>
              <div className="bg-[#fbfaf7] p-5 border border-[#2a2622]/10 flex items-center gap-5">
                <div className="w-10 h-10 bg-[#f7f5f1] border border-[#2a2622]/10 flex items-center justify-center font-['Fraunces'] font-medium text-[#2a2622]">AS</div>
                <div>
                  <div className="text-[14px] font-medium text-[#2a2622] mb-1">Assigned to Amit Singh</div>
                  <div className="text-[13px] text-[#6f6a63]">15:00 countdown started</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Six roles cards */}
      <section className="py-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl mb-6 font-medium">Built for the entire organization</h2>
            <p className="text-[#6f6a63] text-[16px]">Specific views and permissions for every role in your company.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Super Admin",
              "Organization Admin",
              "Operation Manager",
              "Team Lead",
              "Lead Manager",
              "Sales Agent"
            ].map((role, i) => (
              <div key={i} className="bg-[#fbfaf7] p-8 border-t border-[#2a2622]/10 hover:border-[#7a1f2b]/30 transition-colors">
                <div className="w-10 h-10 border border-[#2a2622]/10 flex items-center justify-center mb-6 bg-[#f7f5f1]">
                  <Shield className="w-4 h-4 text-[#2a2622]" />
                </div>
                <h3 className="font-['Fraunces'] text-xl font-medium mb-3">{role}</h3>
                <p className="text-[15px] text-[#6f6a63] leading-loose">Customized dashboard and permission set designed specifically for this function.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Integrations strip */}
      <section className="py-24 border-y border-[#2a2622]/10 bg-[#fbfaf7]">
        <div className="max-w-6xl mx-auto px-6 text-center mb-12">
          <p className="font-['Fraunces'] text-xs font-semibold tracking-[0.2em] uppercase text-[#6f6a63]">Integrates with your stack</p>
        </div>
        <div className="flex gap-16 items-center justify-center flex-wrap max-w-4xl mx-auto opacity-60">
          <div className="flex items-center gap-3 font-medium text-[15px]"><Facebook className="w-5 h-5" /> Facebook</div>
          <div className="flex items-center gap-3 font-medium text-[15px]"><Instagram className="w-5 h-5" /> Instagram</div>
          <div className="flex items-center gap-3 font-medium text-[15px]"><MessageCircle className="w-5 h-5" /> WhatsApp</div>
          <div className="flex items-center gap-3 font-medium text-[15px]"><CreditCard className="w-5 h-5" /> Razorpay</div>
          <div className="flex items-center gap-3 font-medium text-[15px]"><Mail className="w-5 h-5" /> SMTP</div>
          <div className="flex items-center gap-3 font-medium text-[15px]"><MessageSquare className="w-5 h-5" /> SMS</div>
          <div className="flex items-center gap-3 font-medium text-[15px]"><Database className="w-5 h-5" /> REST API</div>
        </div>
      </section>

      {/* 11. Testimonials */}
      <section className="py-40">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-center mb-24 font-medium">Trusted by top developers</h2>
          
          <div className="grid md:grid-cols-3 gap-10">
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
              <div key={i} className="bg-[#fbfaf7] p-10 border border-[#2a2622]/10 relative">
                <div className="text-[#2a2622]/10 font-['Fraunces'] text-6xl absolute top-6 left-6 leading-none">"</div>
                <p className="relative z-10 text-[15px] leading-loose mb-10 text-[#2a2622] pt-4">"{item.quote}"</p>
                <div>
                  <div className="font-medium text-[#2a2622] mb-1">{item.author}</div>
                  <div className="text-[13px] text-[#6f6a63]">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Pricing */}
      <section className="py-40 bg-[#fbfaf7] border-y border-[#2a2622]/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="font-['Fraunces'] text-4xl md:text-5xl mb-6 font-medium">Transparent Pricing</h2>
            <p className="text-[#6f6a63] text-[16px]">No hidden fees. Scale as you grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-[#f7f5f1] p-10 border-t border-[#2a2622]/10 hover:border-[#2a2622]/30 transition-colors">
              <h3 className="font-['Fraunces'] text-2xl font-medium mb-2">Starter</h3>
              <p className="text-[#6f6a63] text-[15px] mb-8">For small brokerages</p>
              <div className="mb-10">
                <span className="text-4xl font-['Fraunces'] font-medium">₹999</span>
                <span className="text-[#6f6a63] text-[15px] ml-2">/user/mo</span>
              </div>
              <ul className="space-y-5 mb-10 text-[15px] text-[#6f6a63]">
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#2a2622] shrink-0" /> Up to 5 users</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#2a2622] shrink-0" /> Basic Lead Management</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#2a2622] shrink-0" /> Standard Reports</li>
              </ul>
              <button className="w-full py-3.5 border border-[#2a2622]/20 text-[#2a2622] font-medium hover:bg-[#fbfaf7] transition-colors text-[15px]">
                Start Trial
              </button>
            </div>

            {/* Growth */}
            <div className="bg-[#2a2622] text-[#fbfaf7] p-10 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#7a1f2b] text-[#fbfaf7] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 font-['Fraunces']">
                Most Popular
              </div>
              <h3 className="font-['Fraunces'] text-2xl font-medium mb-2 text-[#fbfaf7]">Growth</h3>
              <p className="text-[#fbfaf7]/60 text-[15px] mb-8">For growing developer teams</p>
              <div className="mb-10">
                <span className="text-4xl font-['Fraunces'] font-medium text-[#fbfaf7]">₹1,499</span>
                <span className="text-[#fbfaf7]/50 text-[15px] ml-2">/user/mo</span>
              </div>
              <ul className="space-y-5 mb-10 text-[15px] text-[#fbfaf7]/80">
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#fbfaf7]/50 shrink-0" /> Unlimited users</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#fbfaf7]/50 shrink-0" /> Auto Lead Rotation</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#fbfaf7]/50 shrink-0" /> Call Tracking Integration</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#fbfaf7]/50 shrink-0" /> WhatsApp API</li>
              </ul>
              <button className="w-full py-3.5 bg-[#fbfaf7] text-[#2a2622] font-medium hover:bg-[#f7f5f1] transition-colors text-[15px]">
                Start Free Trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-[#f7f5f1] p-10 border-t border-[#2a2622]/10 hover:border-[#2a2622]/30 transition-colors">
              <h3 className="font-['Fraunces'] text-2xl font-medium mb-2">Enterprise</h3>
              <p className="text-[#6f6a63] text-[15px] mb-8">For massive scale</p>
              <div className="mb-10">
                <span className="text-4xl font-['Fraunces'] font-medium">Custom</span>
              </div>
              <ul className="space-y-5 mb-10 text-[15px] text-[#6f6a63]">
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#2a2622] shrink-0" /> Dedicated Account Manager</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#2a2622] shrink-0" /> Custom Integrations</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#2a2622] shrink-0" /> White-labelling</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#2a2622] shrink-0" /> On-premise deployment</li>
              </ul>
              <button className="w-full py-3.5 border border-[#2a2622]/20 text-[#2a2622] font-medium hover:bg-[#fbfaf7] transition-colors text-[15px]">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="py-40">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-center mb-20 font-medium">Frequently Asked Questions</h2>
          
          <div className="space-y-0 border-t border-[#2a2622]/10">
            {[
              { q: "How long is the free trial?", a: "We offer a 7-day full-featured free trial. No credit card is required to sign up." },
              { q: "Can I cancel anytime?", a: "Yes, our subscriptions are month-to-month. You can cancel at any time without penalty." },
              { q: "Do you offer white-labelling?", a: "Yes, white-labelling is available on our Enterprise plan. You can use your own domain and branding." },
              { q: "Is GST included in the pricing?", a: "No, the prices listed are exclusive of 18% GST." },
              { q: "Who owns my data?", a: "You do. We provide easy export tools so you can download your leads and data at any time." },
              { q: "What kind of support do you offer?", a: "We offer email support for all plans, priority chat support for Growth, and a dedicated manager for Enterprise." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#2a2622]/10 bg-[#f7f5f1]">
                <button 
                  className="w-full text-left py-6 font-medium text-[16px] text-[#2a2622] flex justify-between items-center hover:text-[#7a1f2b] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  {openFaq === i ? <Minus className="w-4 h-4 text-[#7a1f2b]" /> : <Plus className="w-4 h-4 text-[#2a2622]/40" />}
                </button>
                {openFaq === i && (
                  <div className="pb-8 text-[#6f6a63] text-[15px] leading-loose">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Final CTA */}
      <section className="py-32 bg-[#4a131a] text-[#fbfaf7] text-center border-y border-[#7a1f2b]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-['Fraunces'] text-5xl mb-8 font-medium">Ready to close more deals?</h2>
          <p className="text-[16px] text-[#fbfaf7]/70 mb-12">Join top Indian developers managing their pipeline on Leads Rubix.</p>
          <button className="bg-[#fbfaf7] text-[#2a2622] px-8 py-4 text-[15px] font-medium hover:bg-[#f7f5f1] transition-colors">
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* 15. Footer */}
      <footer className="bg-[#fbfaf7] text-[#6f6a63] py-24 border-t border-[#2a2622]/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-16 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-6 border border-[#2a2622]/20 bg-[#f7f5f1] flex items-center justify-center">
                <Building2 className="w-3 h-3 text-[#2a2622]" />
              </div>
              <span className="font-['Fraunces'] text-xl font-medium text-[#2a2622]">Leads Rubix</span>
            </div>
            <p className="text-[14px] leading-relaxed">The intelligent CRM for Indian real estate developers and brokers.</p>
          </div>
          <div>
            <h4 className="text-[#2a2622] font-['Fraunces'] font-semibold mb-6 uppercase tracking-[0.2em] text-[10px]">Product</h4>
            <ul className="space-y-4 text-[14px]">
              <li><a href="#" className="hover:text-[#7a1f2b] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#7a1f2b] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#7a1f2b] transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-[#7a1f2b] transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#2a2622] font-['Fraunces'] font-semibold mb-6 uppercase tracking-[0.2em] text-[10px]">Company</h4>
            <ul className="space-y-4 text-[14px]">
              <li><a href="#" className="hover:text-[#7a1f2b] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#7a1f2b] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#7a1f2b] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#7a1f2b] transition-colors">Partners</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[#2a2622] font-['Fraunces'] font-semibold mb-6 uppercase tracking-[0.2em] text-[10px]">Legal</h4>
            <ul className="space-y-4 text-[14px]">
              <li><a href="#" className="hover:text-[#7a1f2b] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#7a1f2b] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#7a1f2b] transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 text-[13px] text-center border-t border-[#2a2622]/10 pt-10">
          © {new Date().getFullYear()} Leads Rubix Technologies Pvt. Ltd., Mumbai · GSTIN: 27AABCU9603R1ZM
        </div>
      </footer>
    </div>
  );
}
