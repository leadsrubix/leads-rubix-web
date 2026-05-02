import React from "react";
import {
  ArrowRight,
  Check,
  Building,
  Briefcase,
  Store,
  Users,
  Building2,
  Phone,
  BarChart,
  Calendar,
  Lock,
  Globe,
  ListTodo,
  Network,
  MapPin,
  Clock,
  Shield,
  Zap,
  Menu,
  ChevronDown,
  ChevronRight,
  Star,
  Quote
} from "lucide-react";

export const PremiumIndigo = () => {
  return (
    <div className="min-h-screen font-sans bg-white text-slate-900 selection:bg-cyan-400/30 selection:text-cyan-900">
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{ __html: `
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
        }
        .hero-gradient {
          background: linear-gradient(135deg, #1e1b4b 0%, #4338ca 50%, #7c3aed 100%);
        }
        .glow-effect {
          box-shadow: 0 0 80px 20px rgba(124, 58, 237, 0.15);
        }
      `}} />

      {/* 1. Top nav */}
      <nav className="absolute top-0 w-full z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
              <Building2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Leads Rubix</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/80">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors flex items-center gap-1">Solutions <ChevronDown className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-white/90 hover:text-white">Sign in</a>
            <button className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 px-5 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              Start Free Trial
            </button>
          </div>
          
          <button className="lg:hidden text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* 2. Hero */}
      <header className="hero-gradient relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-400/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-6 border-cyan-400/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Purpose-built for Indian Real Estate
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                Stop losing leads in WhatsApp. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Start closing them.</span>
              </h1>
              
              <p className="text-lg text-indigo-100/80 mb-10 leading-relaxed max-w-xl">
                The only CRM that captures, rotates, and tracks every real estate lead in under a second. Designed specifically for the fast-paced Indian property market.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </button>
                <button className="glass-panel text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-colors flex items-center justify-center gap-2">
                  Book a Demo
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-indigo-200/60 font-medium">
                <Check className="w-4 h-4 text-cyan-400" /> 7-day free trial
                <span className="mx-2">·</span>
                <Check className="w-4 h-4 text-cyan-400" /> No credit card
                <span className="mx-2">·</span>
                <Check className="w-4 h-4 text-cyan-400" /> Cancel anytime
              </div>
            </div>

            {/* Hero Visual Mockup */}
            <div className="relative lg:-mr-32 glow-effect">
              <div className="glass-panel rounded-2xl p-4 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 border-white/20 shadow-2xl bg-[#0f172a]/80">
                {/* Mock UI Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="w-32 h-2 rounded bg-slate-700" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-800" />
                    <div className="w-8 h-8 rounded-full bg-cyan-900 border border-cyan-700" />
                  </div>
                </div>

                {/* Mock Pipeline */}
                <div className="flex gap-4">
                  {[
                    { title: "Fresh Leads", count: 12, color: "border-blue-500", items: 3 },
                    { title: "Site Visit", count: 5, color: "border-purple-500", items: 2 },
                    { title: "Negotiation", count: 2, color: "border-amber-500", items: 1 }
                  ].map((col, i) => (
                    <div key={i} className="flex-1 min-w-[200px] bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-semibold text-slate-300">{col.title}</span>
                        <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{col.count}</span>
                      </div>
                      <div className="space-y-3">
                        {Array.from({ length: col.items }).map((_, j) => (
                          <div key={j} className={`bg-slate-800 rounded-lg p-3 border-l-2 ${col.color} shadow-sm`}>
                            <div className="w-3/4 h-2 rounded bg-slate-600 mb-2" />
                            <div className="w-1/2 h-2 rounded bg-slate-700 mb-3" />
                            <div className="flex justify-between items-center">
                              <div className="flex -space-x-1">
                                <div className="w-5 h-5 rounded-full bg-slate-600 border border-slate-800" />
                                <div className="w-5 h-5 rounded-full bg-slate-500 border border-slate-800" />
                              </div>
                              <span className="text-[10px] text-slate-500">2h ago</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Built for pill strip */}
      <section className="bg-[#0f172a] border-b border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-70">
            <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest hidden lg:block">Built strictly for:</span>
            {[
              { icon: Building, text: "Property Developers" },
              { icon: Store, text: "Residential Brokerages" },
              { icon: Building2, text: "Commercial Real Estate" },
              { icon: Network, text: "Channel Partners" },
              { icon: Users, text: "Multi-branch Teams" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-300">
                <item.icon className="w-5 h-5 text-cyan-400" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Stats band */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            {[
              { stat: "50+", label: "Real Estate Lead Fields" },
              { stat: "6", label: "Pre-configured Roles" },
              { stat: "<1s", label: "Capture Latency" },
              { stat: "24/7", label: "Automated Lead Capture" }
            ].map((s, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-4xl md:text-5xl font-extrabold text-[#1e1b4b] mb-2">{s.stat}</div>
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The problem */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e1b4b] mb-4">
              Real estate sales shouldn't be this messy.
            </h2>
            <p className="text-lg text-slate-600">
              Generic CRMs require months of setup. Excel sheets lead to data leaks. WhatsApp groups hide accountability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Data Chaos",
                desc: "Leads scattered across WhatsApp, Excel, diaries, and generic CRMs. No single source of truth for your inventory and prospects.",
                icon: BarChart
              },
              {
                title: "Zero Accountability",
                desc: "Agents cherry-pick leads. Follow-ups are missed. Managers have no visibility into what happens after a lead is assigned.",
                icon: Shield
              },
              {
                title: "Slow Response Times",
                desc: "By the time a lead gets assigned manually from an Excel sheet to an agent, they've already booked a site visit with your competitor.",
                icon: Clock
              }
            ].map((card, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mb-6">
                  <card.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pipeline visualization */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-cyan-600" />
            </div>
            <h2 className="text-3xl font-bold text-[#1e1b4b]">The Perfect Real Estate Pipeline</h2>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl">
            Track exactly where money is stuck. Our purpose-built pipeline matches how Indian real estate actually works.
          </p>
        </div>

        <div className="w-full overflow-x-auto pb-8 hide-scrollbar">
          <div className="max-w-7xl mx-auto px-6 min-w-[1000px]">
            <div className="flex items-stretch gap-4 relative">
              {/* Connecting line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0" />
              
              {[
                { name: "FRESH", count: 42, color: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-50" },
                { name: "CALLBACK", count: 18, color: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
                { name: "INTERESTED", count: 24, color: "bg-purple-500", text: "text-purple-700", bg: "bg-purple-50" },
                { name: "BOOKED", count: 8, color: "bg-green-500", text: "text-green-700", bg: "bg-green-50" },
                { name: "LOST", count: 112, color: "bg-red-500", text: "text-red-700", bg: "bg-red-50" }
              ].map((stage, i) => (
                <div key={i} className="flex-1 relative z-10">
                  <div className={`bg-white border-2 border-slate-100 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition-colors group cursor-pointer`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        <span className="font-bold text-slate-800 text-sm tracking-wide">{stage.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-xs font-bold ${stage.bg} ${stage.text}`}>
                        {stage.count}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="h-10 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-slate-100 transition-colors" />
                      <div className="h-10 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-slate-100 transition-colors" />
                      {i === 0 && <div className="h-10 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-slate-100 transition-colors" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Features grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e1b4b] mb-4">Everything you need. Nothing you don't.</h2>
            <p className="text-lg text-slate-600">Built without the bloat of traditional enterprise CRMs.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Automated Lead Rotation", desc: "Round-robin, weighted, or performance-based lead assignment rules." },
              { icon: Phone, title: "Call Log Tracking", desc: "Auto-log inbound/outbound calls and record conversations for quality." },
              { icon: BarChart, title: "Real-time Analytics", desc: "Live dashboards for site visits, bookings, and agent performance." },
              { icon: Building, title: "Bookings & Payments", desc: "Track token amounts, booking forms, and payment schedules." },
              { icon: Lock, title: "Role-Based Access", desc: "Granular permissions so agents only see what they are assigned." },
              { icon: Globe, title: "Multi-Source Capture", desc: "API integrations for FB, 99acres, MagicBricks, and landing pages." },
              { icon: ListTodo, title: "Task Management", desc: "Automated follow-up reminders and site visit scheduling." },
              { icon: Network, title: "Multi-Org Support", desc: "Manage multiple projects, brokerages, or channel partners in one place." },
              { icon: MapPin, title: "GPS Call Tracking", desc: "Verify agent locations during scheduled site visits." }
            ].map((feat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow group">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors">
                  <feat.icon className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Lead Rotation deep-dive */}
      <section className="py-24 bg-[#1e1b4b] text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-cyan-400 font-semibold tracking-wider uppercase text-sm mb-4">Core Feature</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Never lose a hot lead to a slow agent again.</h2>
              <p className="text-indigo-200 text-lg mb-10">
                Our intelligent rotation engine ensures leads are worked immediately. If an agent doesn't respond, the system reassigns it automatically.
              </p>

              <div className="space-y-6">
                {[
                  { num: "01", title: "Lead Arrives", desc: "Instant capture from Facebook, web, or property portals." },
                  { num: "02", title: "Response Window", desc: "Agent gets 5 minutes to claim and call the prospect." },
                  { num: "03", title: "Auto-Reassignment", desc: "If missed, lead rolls to the next available agent." },
                  { num: "04", title: "Schedule Aware", desc: "Routes around agent working hours and holidays." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full border border-indigo-400/30 flex items-center justify-center text-cyan-400 font-bold shrink-0 bg-indigo-900/50">
                      {step.num}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                      <p className="text-indigo-200/80 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 to-indigo-500 rounded-3xl blur-2xl opacity-20" />
              <div className="glass-panel rounded-3xl p-8 relative">
                <div className="flex flex-col gap-4">
                  <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold">R</div>
                      <div>
                        <div className="font-semibold text-white">Rahul Sharma</div>
                        <div className="text-xs text-green-400">Available</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Leads assigned today</div>
                      <div className="font-bold text-xl text-white">12</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center py-2 text-cyan-400">
                    <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
                  </div>

                  <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-xl p-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-indigo-900">
                      <div className="h-full bg-cyan-400 w-2/3 animate-pulse" />
                    </div>
                    <div className="flex justify-between items-start mb-3 mt-2">
                      <span className="bg-red-500/20 text-red-300 text-xs px-2 py-1 rounded font-medium">HOT LEAD</span>
                      <span className="text-xs text-indigo-200">04:59 to claim</span>
                    </div>
                    <div className="font-semibold text-white mb-1">Rajesh Kumar - 3BHK Enquiry</div>
                    <div className="text-sm text-indigo-200 mb-4">Budget: ₹1.5Cr - ₹2.0Cr</div>
                    <button className="w-full bg-cyan-400 text-slate-900 py-2 rounded-lg font-bold text-sm hover:bg-cyan-300 transition-colors">
                      Claim Lead
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Roles */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1e1b4b] mb-4">Built for every level of your organization</h2>
            <p className="text-lg text-slate-600">Pre-configured roles that map perfectly to real estate hierarchies.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Super Admin", "Organization Admin", "Operation Manager", "Team Lead", "Lead Manager", "Sales Agent"
            ].map((role, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 text-center hover:border-indigo-300 hover:shadow-md transition-all cursor-default">
                <div className="w-10 h-10 mx-auto rounded-full bg-indigo-50 flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="font-bold text-sm text-slate-800">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Integrations */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Connects with your existing tools</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Mock logos text for simplicity, normally SVGs */}
            <span className="text-xl font-bold text-[#1877F2]">Facebook</span>
            <span className="text-xl font-bold text-[#E4405F]">Instagram</span>
            <span className="text-xl font-bold text-[#25D366]">WhatsApp</span>
            <span className="text-xl font-bold text-[#0D2366]">Razorpay</span>
            <span className="text-xl font-bold text-slate-800">REST API</span>
          </div>
        </div>
      </section>

      {/* 11. Outcomes / Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1e1b4b] text-center mb-16">Trusted by top developers & brokers</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Before Leads Rubix, we were losing 30% of our Facebook leads because agents weren't calling fast enough. Now our average response time is under 2 minutes.",
                author: "Sanjay Mehta",
                role: "Director of Sales, Horizon Developers"
              },
              {
                quote: "The multi-branch support is a gamechanger. I can view pipeline health across our Mumbai, Pune, and Bangalore offices from a single dashboard.",
                author: "Priya Desai",
                role: "Operations Head, Elite Realty"
              },
              {
                quote: "No more messy Excel sheets. Our agents love the mobile interface for quick site-visit updates. Conversion rates are up 18% this quarter.",
                author: "Amit Patel",
                role: "Founder, PropConnect Brokerage"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-indigo-100" />
                <div className="flex gap-1 mb-6 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-slate-700 italic mb-6 leading-relaxed relative z-10">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-slate-900">{t.author}</div>
                  <div className="text-sm text-slate-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Pricing */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1e1b4b] mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-slate-600">Start free for 7 days. No credit card required.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="border border-slate-200 rounded-3xl p-8 hover:border-indigo-300 transition-colors">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
              <p className="text-sm text-slate-500 mb-6">For small teams getting started</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900">₹999</span>
                <span className="text-slate-500">/user/mo</span>
              </div>
              <button className="w-full py-3 rounded-full border-2 border-[#1e1b4b] text-[#1e1b4b] font-bold hover:bg-slate-50 transition-colors mb-8">
                Start Trial
              </button>
              <ul className="space-y-4">
                {['Up to 5 users', 'Basic Lead Management', 'WhatsApp Integration', 'Email Support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-green-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Growth */}
            <div className="border-2 border-indigo-600 rounded-3xl p-8 relative transform md:-translate-y-4 shadow-xl shadow-indigo-100 bg-white">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Growth</h3>
              <p className="text-sm text-slate-500 mb-6">For growing brokerages</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900">₹1,499</span>
                <span className="text-slate-500">/user/mo</span>
              </div>
              <button className="w-full py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors mb-8 shadow-lg shadow-indigo-200">
                Start Trial
              </button>
              <ul className="space-y-4">
                {['Unlimited users', 'Advanced Lead Rotation', 'All API Integrations', 'Custom Roles', 'Priority Support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-green-500 shrink-0" /> <span className="font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise */}
            <div className="border border-slate-200 rounded-3xl p-8 hover:border-indigo-300 transition-colors">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h3>
              <p className="text-sm text-slate-500 mb-6">For large developers</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900">Custom</span>
              </div>
              <button className="w-full py-3 rounded-full border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-colors mb-8">
                Contact Sales
              </button>
              <ul className="space-y-4">
                {['Multi-branch setup', 'Dedicated Account Manager', 'Custom Development', 'White-labelling options'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-green-500 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#1e1b4b] text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How long is the free trial?", a: "You get full access to the Growth plan features for 7 days. No credit card is required to sign up." },
              { q: "Can I cancel anytime?", a: "Yes, Leads Rubix is a pay-as-you-go service with no long-term lock-in contracts." },
              { q: "Do you offer white-labelling?", a: "Yes, white-labelling is available on our Enterprise plan. Contact sales for details." },
              { q: "Is GST included in the pricing?", a: "No, 18% GST is applicable over and above the listed prices as per government regulations." },
              { q: "Who owns my data?", a: "You do. We provide easy export options so you can download your complete database at any time." },
              { q: "What kind of support do you provide?", a: "Starter plans include email support. Growth includes priority chat, and Enterprise gets a dedicated account manager." }
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-2xl border border-slate-200 group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-slate-800">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Final CTA */}
      <section className="hero-gradient relative py-24 overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to stop leaking leads?</h2>
          <p className="text-xl text-indigo-100/80 mb-10">
            Join hundreds of Indian real estate teams closing more deals with Leads Rubix.
          </p>
          <button className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(34,211,238,0.5)]">
            Start Your 7-Day Free Trial
          </button>
          <p className="mt-6 text-sm text-indigo-200/60">Takes less than 2 minutes to set up.</p>
        </div>
      </section>

      {/* 15. Footer */}
      <footer className="bg-[#0a0e1a] text-slate-400 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                  <Building2 className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Leads Rubix</span>
              </div>
              <p className="text-sm mb-6 max-w-xs">
                The purpose-built CRM for Indian real estate. Capture, rotate, and close faster.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Solutions</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Property Developers</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Brokerages</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Channel Partners</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <div>&copy; {new Date().getFullYear()} Leads Rubix Technologies Pvt. Ltd. All rights reserved.</div>
            <div>Mumbai, Maharashtra · GSTIN: 27AABCT1234E1Z5</div>
          </div>
        </div>
      </footer>
    </div>
  );
};
