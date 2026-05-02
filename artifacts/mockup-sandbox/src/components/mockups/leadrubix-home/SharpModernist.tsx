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

export function SharpModernist() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-sans selection:bg-[#e63946] selection:text-white">
      <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700;900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{__html: `
        .font-tight { font-family: 'Inter Tight', sans-serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}} />
      
      {/* 1. Top nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#e63946] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-tight font-black text-2xl tracking-tighter uppercase">LEADS RUBIX</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase text-[#0a0a0a]">
            <a href="#" className="hover:text-[#e63946] transition-colors">Features</a>
            <a href="#" className="hover:text-[#e63946] transition-colors">Pricing</a>
            <a href="#" className="hover:text-[#e63946] transition-colors">Solutions</a>
            <a href="#" className="hover:text-[#e63946] transition-colors">Blog</a>
            <a href="#" className="hover:text-[#e63946] transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hidden md:block text-sm font-semibold tracking-wide uppercase text-[#0a0a0a] hover:text-[#e63946]">Sign in</a>
            <button className="bg-[#0a0a0a] text-white px-6 py-2 text-sm font-semibold tracking-wide uppercase hover:bg-[#e63946] transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero */}
      <section className="relative pt-24 pb-32 overflow-hidden border-b border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-8 text-xs font-bold tracking-widest uppercase tabular-nums text-[#0a0a0a]">
              01 — PURPOSE-BUILT FOR INDIAN REAL ESTATE
            </div>
            <h1 className="font-tight font-black text-6xl md:text-[5.5rem] leading-[0.95] tracking-tight mb-8">
              Stop losing leads in WhatsApp.<br/>
              <span className="text-[#e63946]">Start closing them.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#0a0a0a] mb-12 leading-snug font-medium max-w-xl">
              The only CRM that understands the chaos of Indian real estate. Automate lead rotation, track broker performance, and respond in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <button className="bg-[#e63946] text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-[#0a0a0a] transition-colors flex items-center gap-3 w-full sm:w-auto justify-center">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-transparent text-[#0a0a0a] border border-[#0a0a0a] px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-[#0a0a0a] hover:text-white transition-colors w-full sm:w-auto justify-center">
                Book a Demo
              </button>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest tabular-nums text-[#0a0a0a]">
              <span>7-DAY FREE TRIAL</span>
              <span className="w-1 h-1 bg-[#0a0a0a]"></span>
              <span>NO CREDIT CARD</span>
              <span className="w-1 h-1 bg-[#0a0a0a]"></span>
              <span>CANCEL ANYTIME</span>
            </div>
          </div>

          <div className="relative border border-[#0a0a0a] p-4 bg-white shadow-[16px_16px_0_0_rgba(10,10,10,1)]">
            {/* Abstract UI Mockup */}
            <div className="bg-white relative z-10">
              <div className="flex items-center justify-between mb-6 border-b border-[#0a0a0a] pb-4">
                <div className="flex gap-2">
                  <div className="w-4 h-4 border border-[#0a0a0a] bg-[#e63946]" />
                  <div className="w-4 h-4 border border-[#0a0a0a] bg-white" />
                  <div className="w-4 h-4 border border-[#0a0a0a] bg-white" />
                </div>
                <div className="text-xs font-bold text-[#0a0a0a] tracking-widest uppercase tabular-nums">01.01 PIPELINE</div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-4 border border-[#0a0a0a]">
                    <div className="h-1 w-1/3 bg-[#0a0a0a] mb-4" />
                    <div className="h-3 w-2/3 bg-[#0a0a0a] mb-2" />
                    <div className="h-2 w-1/2 bg-[#0a0a0a]/30 mb-4" />
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#0a0a0a]">
                      <div className="w-6 h-6 border border-[#0a0a0a]" />
                      <div className="text-xs text-[#e63946] font-bold tabular-nums">₹{(Math.random() * 10).toFixed(1)} CR</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-white p-4 border border-[#0a0a0a] flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#0a0a0a] mb-1 tabular-nums">NEW LEAD FROM MAGICBRICKS</div>
                  <div className="font-bold text-sm">RAHUL SHARMA — 3BHK ANDHERI</div>
                </div>
                <div className="bg-[#0a0a0a] text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                  ASSIGNED TO AMIT
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Built for pill strip */}
      <section className="border-b border-[#0a0a0a] bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold tracking-widest uppercase tabular-nums text-[#0a0a0a] mb-8">02 — BUILT EXCLUSIVELY FOR</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {[
              { icon: Building2, text: "PROPERTY DEVELOPERS" },
              { icon: Home, text: "RESIDENTIAL BROKERAGES" },
              { icon: Briefcase, text: "COMMERCIAL REAL ESTATE" },
              { icon: Network, text: "CHANNEL PARTNERS" },
              { icon: Users, text: "MULTI-BRANCH SALES TEAMS" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 font-bold text-sm tracking-wide">
                <item.icon className="w-5 h-5 text-[#e63946]" strokeWidth={2.5} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Stats band */}
      <section className="bg-[#0a0a0a] text-white py-24 border-b border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "LEAD FIELDS TRACKED", value: "50", suffix: "+" },
            { label: "DISTINCT ORG ROLES", value: "6", suffix: "" },
            { label: "CAPTURE LATENCY", value: "<1", suffix: "s" },
            { label: "AUTOMATED CAPTURE", value: "24", suffix: "/7" }
          ].map((stat, i) => (
            <div key={i} className="border-l border-white/20 first:border-l-0 pl-12 first:pl-0">
              <div className="flex items-baseline justify-center mb-4">
                <span className="font-tight text-7xl md:text-8xl font-light tracking-tighter leading-none">{stat.value}</span>
                <span className="font-tight text-5xl font-black text-[#e63946] leading-none">{stat.suffix}</span>
              </div>
              <div className="text-[10px] font-bold tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. The problem */}
      <section className="py-32 border-b border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <div className="text-xs font-bold tracking-widest uppercase tabular-nums text-[#0a0a0a] mb-6">03 — THE PROBLEM</div>
            <h2 className="font-tight font-black text-5xl md:text-6xl tracking-tight leading-[1.1] max-w-4xl mb-8">
              Why legacy CRMs fail in Indian Real Estate.
            </h2>
            <p className="text-xl font-medium text-[#0a0a0a] max-w-2xl leading-relaxed">
              Generic tools weren't built for the scale of site visits, broker networks, and WhatsApp negotiations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-0 border border-[#0a0a0a]">
            {[
              {
                icon: Database,
                title: "DATA CHAOS",
                desc: "Leads scattered across Excel sheets, WhatsApp chats, and notebooks. No single source of truth for a buyer's journey."
              },
              {
                icon: UserX,
                title: "ZERO ACCOUNTABILITY",
                desc: "Agents cherry-pick leads. No visibility into who called whom, when, and what was discussed."
              },
              {
                icon: Clock,
                title: "SLOW RESPONSE TIMES",
                desc: "Hot leads from 99acres or Facebook sit untouched for hours while competitors call them in minutes."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 border-r last:border-r-0 border-[#0a0a0a]">
                <div className="w-16 h-16 border-2 border-[#0a0a0a] flex items-center justify-center mb-8 bg-[#0a0a0a] text-white">
                  <item.icon className="w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-wide mb-6">{item.title}</h3>
                <p className="text-base font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pipeline visualization */}
      <section className="py-32 bg-white border-b border-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="text-xs font-bold tracking-widest uppercase tabular-nums text-[#0a0a0a] mb-6">04 — THE PIPELINE</div>
              <h2 className="font-tight font-black text-5xl tracking-tight leading-[1.1]">A Pipeline Built for<br/>Property Sales</h2>
            </div>
            <p className="text-lg font-medium text-[#0a0a0a] max-w-sm">Standardized stages that map to how real estate is actually sold.</p>
          </div>
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-0 border border-[#0a0a0a]">
            {[
              { name: "FRESH" },
              { name: "CALLBACK" },
              { name: "INTERESTED" },
              { name: "BOOKED" },
              { name: "LOST" }
            ].map((stage, i) => (
              <div key={i} className="flex-1 bg-white border-r last:border-r-0 border-b md:border-b-0 border-[#0a0a0a] p-8 relative group hover:bg-[#0a0a0a] hover:text-white transition-colors">
                <div className="text-[10px] font-bold tracking-widest uppercase mb-4">{stage.name}</div>
                <div className="font-tight text-5xl font-black tracking-tighter tabular-nums mb-2">{Math.floor(Math.random() * 50 + 10)}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#e63946] group-hover:text-[#e63946]">LEADS</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Features grid */}
      <section className="py-32 border-b border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 text-center">
            <div className="text-xs font-bold tracking-widest uppercase tabular-nums text-[#0a0a0a] mb-6">05 — FEATURES</div>
            <h2 className="font-tight font-black text-5xl md:text-6xl tracking-tight max-w-4xl mx-auto">Everything you need to close more deals.</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-0 border-t border-l border-[#0a0a0a]">
            {[
              { icon: RefreshCw, title: "AUTOMATED LEAD ROTATION", desc: "Distribute incoming leads instantly based on rules, availability, and performance." },
              { icon: PhoneCall, title: "CALL LOG TRACKING", desc: "Native integration with telephony providers to log every call duration and recording." },
              { icon: BarChart3, title: "REAL-TIME ANALYTICS", desc: "Dashboards tracking site visits, source ROI, and agent conversion rates." },
              { icon: CreditCard, title: "BOOKINGS & PAYMENTS", desc: "Generate payment links and track token amounts directly within the deal record." },
              { icon: Shield, title: "ROLE-BASED ACCESS", desc: "Granular permissions ensuring agents only see their leads, while admins see everything." },
              { icon: Search, title: "MULTI-SOURCE CAPTURE", desc: "Ingest leads from Facebook, Google, 99acres, MagicBricks, and your website seamlessly." },
              { icon: CheckSquare, title: "TASK MANAGEMENT", desc: "Automated follow-up reminders so a hot lead never slips through the cracks." },
              { icon: Globe, title: "MULTI-ORG SUPPORT", desc: "Manage multiple projects, branches, or channel partners from a single master dashboard." },
              { icon: MapPin, title: "GPS CALL TRACKING", desc: "Verify agent locations during site visits or outdoor meetings for better accountability." }
            ].map((item, i) => (
              <div key={i} className="p-10 border-b border-r border-[#0a0a0a] group hover:bg-[#0a0a0a] hover:text-white transition-colors">
                <div className="mb-6 text-[#e63946]">
                  <item.icon className="w-8 h-8" strokeWidth={2} />
                </div>
                <h3 className="font-black text-lg tracking-wide uppercase mb-4">{item.title}</h3>
                <p className="text-sm font-medium leading-relaxed group-hover:text-white/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Lead Rotation Deep Dive */}
      <section className="py-32 border-b border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase tabular-nums text-[#0a0a0a] mb-6">06 — CORE TECHNOLOGY</div>
            <h2 className="font-tight font-black text-5xl md:text-6xl tracking-tight leading-[1.1] mb-8">Never let a lead<br/>go cold again.</h2>
            <p className="text-xl font-medium mb-16 leading-relaxed">Our proprietary lead rotation engine ensures every inquiry gets a response within minutes, automatically reassigning leads if an agent is unavailable.</p>
            
            <div className="space-y-0 border-t border-[#0a0a0a]">
              {[
                { step: "01", title: "LEAD ARRIVES", desc: "Captured instantly from any source via API or Webhook." },
                { step: "02", title: "RESPONSE WINDOW", desc: "Agent has 15 minutes (customizable) to action the lead." },
                { step: "03", title: "AUTO-REASSIGNMENT", desc: "If untouched, the lead rotates to the next available agent." },
                { step: "04", title: "SCHEDULE AWARE", desc: "Rotation rules respect agent working hours and leaves." }
              ].map((item, i) => (
                <div key={i} className="flex gap-8 py-6 border-b border-[#0a0a0a]">
                  <div className="font-tight font-black text-2xl tabular-nums text-[#e63946]">{item.step}</div>
                  <div>
                    <h4 className="font-black text-base uppercase tracking-wide mb-2">{item.title}</h4>
                    <p className="font-medium text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white border-2 border-[#0a0a0a] p-10 shadow-[16px_16px_0_0_#0a0a0a]">
            <div className="space-y-6">
              <div className="p-6 border border-[#0a0a0a] flex justify-between items-center bg-[#0a0a0a] text-white">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-2 tabular-nums">INCOMING: FACEBOOK ADS</div>
                  <div className="text-sm font-bold">PROJECT: HORIZON TOWERS</div>
                </div>
                <div className="bg-[#e63946] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest">JUST NOW</div>
              </div>
              <div className="flex justify-center my-4">
                <ArrowRight className="w-6 h-6 text-[#0a0a0a] rotate-90" strokeWidth={3} />
              </div>
              <div className="p-6 border border-[#0a0a0a] flex items-center gap-6">
                <div className="w-12 h-12 border border-[#0a0a0a] bg-[#e63946] text-white flex items-center justify-center font-black text-lg">AS</div>
                <div>
                  <div className="text-sm font-black uppercase tracking-wide mb-1">ASSIGNED TO AMIT SINGH</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest tabular-nums text-[#e63946]">15:00 COUNTDOWN STARTED</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Six roles cards */}
      <section className="py-32 bg-white border-b border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20 text-center">
            <div className="text-xs font-bold tracking-widest uppercase tabular-nums text-[#0a0a0a] mb-6">07 — ARCHITECTURE</div>
            <h2 className="font-tight font-black text-5xl tracking-tight mb-6">Built for the entire organization</h2>
            <p className="text-lg font-medium">Specific views and permissions for every role in your company.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-[#0a0a0a]">
            {[
              "SUPER ADMIN",
              "ORGANIZATION ADMIN",
              "OPERATION MANAGER",
              "TEAM LEAD",
              "LEAD MANAGER",
              "SALES AGENT"
            ].map((role, i) => (
              <div key={i} className="p-10 border-b border-r border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white transition-colors group">
                <div className="w-12 h-12 border border-[#0a0a0a] group-hover:border-white flex items-center justify-center mb-8 bg-white group-hover:bg-[#0a0a0a]">
                  <Shield className="w-6 h-6 text-[#0a0a0a] group-hover:text-white" strokeWidth={2} />
                </div>
                <h3 className="font-black text-xl tracking-wide mb-4">{role}</h3>
                <p className="font-medium text-sm leading-relaxed">Customized dashboard and permission set designed specifically for this function.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Integrations strip */}
      <section className="py-20 border-b border-[#0a0a0a] bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <p className="text-xs font-bold tracking-widest uppercase tabular-nums">08 — INTEGRATIONS</p>
        </div>
        <div className="flex gap-16 items-center justify-center flex-wrap max-w-6xl mx-auto">
          {[
            { icon: Facebook, name: "FACEBOOK" },
            { icon: Instagram, name: "INSTAGRAM" },
            { icon: MessageCircle, name: "WHATSAPP" },
            { icon: CreditCard, name: "RAZORPAY" },
            { icon: Mail, name: "SMTP" },
            { icon: MessageSquare, name: "SMS" },
            { icon: Database, name: "REST API" }
          ].map((int, i) => (
            <div key={i} className="flex items-center gap-3 font-black text-xl tracking-wide">
              <int.icon className="w-8 h-8 text-[#e63946]" strokeWidth={2} />
              {int.name}
            </div>
          ))}
        </div>
      </section>

      {/* 11. Testimonials */}
      <section className="py-32 border-b border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <div className="text-xs font-bold tracking-widest uppercase tabular-nums text-[#0a0a0a] mb-6">09 — TESTIMONIALS</div>
            <h2 className="font-tight font-black text-5xl tracking-tight">Trusted by top developers</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-0 border border-[#0a0a0a]">
            {[
              {
                quote: "Before Leads Rubix, we were losing 30% of our Facebook leads just because agents didn't check the sheet in time. Now, every lead is called within 5 minutes. Our site visits have doubled.",
                author: "RAJEEV K.",
                role: "VP SALES, HORIZON DEVELOPERS"
              },
              {
                quote: "The role-based access is a game-changer. Our channel partners can only see their own leads, while my central team has full visibility. It eliminated all the daily friction.",
                author: "SNEHA P.",
                role: "OPERATIONS HEAD, METRO REALTY"
              },
              {
                quote: "Finally, a CRM that understands Indian real estate. The ability to track WhatsApp conversations and token payments in the same timeline has streamlined our entire closing process.",
                author: "AMITAB S.",
                role: "DIRECTOR, PRIME PROPERTIES"
              }
            ].map((item, i) => (
              <div key={i} className="p-12 border-r last:border-r-0 border-[#0a0a0a] flex flex-col justify-between">
                <div className="font-tight text-7xl font-black text-[#e63946] mb-6 leading-none">"</div>
                <p className="font-medium text-lg leading-relaxed mb-12">"{item.quote}"</p>
                <div className="border-t border-[#0a0a0a] pt-6">
                  <div className="font-black text-base tracking-wide mb-1">{item.author}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#e63946]">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Pricing */}
      <section className="py-32 border-b border-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-xs font-bold tracking-widest uppercase tabular-nums text-[#0a0a0a] mb-6">10 — PRICING</div>
            <h2 className="font-tight font-black text-5xl tracking-tight mb-6">Transparent Pricing</h2>
            <p className="text-lg font-medium">No hidden fees. Scale as you grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-0 max-w-6xl mx-auto border border-[#0a0a0a]">
            {/* Starter */}
            <div className="p-12 border-r border-b md:border-b-0 border-[#0a0a0a]">
              <h3 className="font-black text-2xl tracking-wide uppercase mb-2">STARTER</h3>
              <p className="font-medium text-sm mb-12">For small brokerages</p>
              <div className="mb-12 flex items-baseline gap-2">
                <span className="font-tight font-black text-5xl tabular-nums tracking-tighter">₹999</span>
                <span className="text-xs font-bold uppercase tracking-widest">/USER/MO</span>
              </div>
              <ul className="space-y-6 mb-12 font-medium text-sm">
                <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#e63946] shrink-0" strokeWidth={3} /> UP TO 5 USERS</li>
                <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#e63946] shrink-0" strokeWidth={3} /> BASIC LEAD MANAGEMENT</li>
                <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#e63946] shrink-0" strokeWidth={3} /> STANDARD REPORTS</li>
              </ul>
              <button className="w-full py-4 border-2 border-[#0a0a0a] text-[#0a0a0a] font-black tracking-widest uppercase text-sm hover:bg-[#0a0a0a] hover:text-white transition-colors">
                START TRIAL
              </button>
            </div>

            {/* Growth */}
            <div className="p-12 border-r border-b md:border-b-0 border-[#0a0a0a] bg-[#0a0a0a] text-white relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#e63946] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 border-2 border-[#0a0a0a]">
                MOST POPULAR
              </div>
              <h3 className="font-black text-2xl tracking-wide uppercase mb-2">GROWTH</h3>
              <p className="font-medium text-sm mb-12 opacity-80">For growing developer teams</p>
              <div className="mb-12 flex items-baseline gap-2">
                <span className="font-tight font-black text-5xl tabular-nums tracking-tighter text-[#e63946]">₹1,499</span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-80">/USER/MO</span>
              </div>
              <ul className="space-y-6 mb-12 font-medium text-sm">
                <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#e63946] shrink-0" strokeWidth={3} /> UNLIMITED USERS</li>
                <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#e63946] shrink-0" strokeWidth={3} /> AUTO LEAD ROTATION</li>
                <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#e63946] shrink-0" strokeWidth={3} /> CALL TRACKING INTEGRATION</li>
                <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#e63946] shrink-0" strokeWidth={3} /> WHATSAPP API</li>
              </ul>
              <button className="w-full py-4 bg-[#e63946] text-white font-black tracking-widest uppercase text-sm hover:bg-white hover:text-[#0a0a0a] transition-colors">
                START FREE TRIAL
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-12">
              <h3 className="font-black text-2xl tracking-wide uppercase mb-2">ENTERPRISE</h3>
              <p className="font-medium text-sm mb-12">For massive scale</p>
              <div className="mb-12 flex items-baseline gap-2">
                <span className="font-tight font-black text-5xl tracking-tighter">CUSTOM</span>
              </div>
              <ul className="space-y-6 mb-12 font-medium text-sm">
                <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#e63946] shrink-0" strokeWidth={3} /> DEDICATED ACCOUNT MANAGER</li>
                <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#e63946] shrink-0" strokeWidth={3} /> CUSTOM INTEGRATIONS</li>
                <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#e63946] shrink-0" strokeWidth={3} /> WHITE-LABELLING</li>
                <li className="flex gap-4 items-center"><Check className="w-5 h-5 text-[#e63946] shrink-0" strokeWidth={3} /> ON-PREMISE DEPLOYMENT</li>
              </ul>
              <button className="w-full py-4 border-2 border-[#0a0a0a] text-[#0a0a0a] font-black tracking-widest uppercase text-sm hover:bg-[#0a0a0a] hover:text-white transition-colors">
                CONTACT SALES
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="py-32 border-b border-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-xs font-bold tracking-widest uppercase tabular-nums text-[#0a0a0a] mb-6">11 — FAQ</div>
            <h2 className="font-tight font-black text-5xl tracking-tight">Frequently Asked Questions</h2>
          </div>
          
          <div className="border-t border-[#0a0a0a]">
            {[
              { q: "HOW LONG IS THE FREE TRIAL?", a: "We offer a 7-day full-featured free trial. No credit card is required to sign up." },
              { q: "CAN I CANCEL ANYTIME?", a: "Yes, our subscriptions are month-to-month. You can cancel at any time without penalty." },
              { q: "DO YOU OFFER WHITE-LABELLING?", a: "Yes, white-labelling is available on our Enterprise plan. You can use your own domain and branding." },
              { q: "IS GST INCLUDED IN THE PRICING?", a: "No, the prices listed are exclusive of 18% GST." },
              { q: "WHO OWNS MY DATA?", a: "You do. We provide easy export tools so you can download your leads and data at any time." },
              { q: "WHAT KIND OF SUPPORT DO YOU OFFER?", a: "We offer email support for all plans, priority chat support for Growth, and a dedicated manager for Enterprise." }
            ].map((faq, i) => (
              <div key={i} className="border-b border-[#0a0a0a]">
                <button 
                  className="w-full text-left py-8 font-black text-lg tracking-wide uppercase flex justify-between items-center group hover:text-[#e63946] transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  {openFaq === i ? <Minus className="w-6 h-6 text-[#e63946]" strokeWidth={3} /> : <Plus className="w-6 h-6 text-[#0a0a0a] group-hover:text-[#e63946]" strokeWidth={3} />}
                </button>
                {openFaq === i && (
                  <div className="pb-8 text-base font-medium leading-relaxed max-w-3xl">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Final CTA */}
      <section className="py-32 bg-[#e63946] text-white text-center border-b border-[#0a0a0a]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-[10px] font-bold tracking-widest uppercase tabular-nums mb-8 border border-white px-4 py-2 inline-block">12 — GET STARTED</div>
          <h2 className="font-tight font-black text-6xl md:text-7xl tracking-tighter mb-8 leading-[0.95]">Ready to close more deals?</h2>
          <p className="text-2xl font-medium mb-12">Join top Indian developers managing their pipeline on Leads Rubix.</p>
          <button className="bg-[#0a0a0a] text-white px-10 py-5 text-sm font-black tracking-widest uppercase hover:bg-white hover:text-[#0a0a0a] transition-colors border-2 border-[#0a0a0a]">
            START YOUR FREE TRIAL
          </button>
        </div>
      </section>

      {/* 15. Footer */}
      <footer className="bg-[#0a0a0a] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-16 mb-24">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-[#e63946] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-tight font-black text-2xl tracking-tighter uppercase">LEADS RUBIX</span>
            </div>
            <p className="font-medium text-sm leading-relaxed opacity-80">The intelligent CRM for Indian real estate developers and brokers.</p>
          </div>
          <div>
            <h4 className="font-black text-sm tracking-widest uppercase mb-8 text-[#e63946]">PRODUCT</h4>
            <ul className="space-y-4 font-bold text-sm tracking-wide uppercase">
              <li><a href="#" className="hover:text-[#e63946] transition-colors">FEATURES</a></li>
              <li><a href="#" className="hover:text-[#e63946] transition-colors">PRICING</a></li>
              <li><a href="#" className="hover:text-[#e63946] transition-colors">INTEGRATIONS</a></li>
              <li><a href="#" className="hover:text-[#e63946] transition-colors">CHANGELOG</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-sm tracking-widest uppercase mb-8 text-[#e63946]">COMPANY</h4>
            <ul className="space-y-4 font-bold text-sm tracking-wide uppercase">
              <li><a href="#" className="hover:text-[#e63946] transition-colors">ABOUT US</a></li>
              <li><a href="#" className="hover:text-[#e63946] transition-colors">CAREERS</a></li>
              <li><a href="#" className="hover:text-[#e63946] transition-colors">CONTACT</a></li>
              <li><a href="#" className="hover:text-[#e63946] transition-colors">PARTNERS</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-sm tracking-widest uppercase mb-8 text-[#e63946]">LEGAL</h4>
            <ul className="space-y-4 font-bold text-sm tracking-wide uppercase">
              <li><a href="#" className="hover:text-[#e63946] transition-colors">PRIVACY POLICY</a></li>
              <li><a href="#" className="hover:text-[#e63946] transition-colors">TERMS OF SERVICE</a></li>
              <li><a href="#" className="hover:text-[#e63946] transition-colors">REFUND POLICY</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-[10px] font-bold tracking-widest uppercase flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/20">
          <div>© {new Date().getFullYear()} LEADS RUBIX TECHNOLOGIES PVT. LTD., MUMBAI</div>
          <div>GSTIN: 27AABCU9603R1ZM</div>
        </div>
      </footer>
    </div>
  );
}
