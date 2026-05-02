import React, { useState } from 'react';
import { 
  ArrowRight, Check, Menu, X, Building2, Home, Briefcase, Network, 
  Users, Zap, BarChart3, CreditCard, Shield, Smartphone, ListTodo, 
  Globe, MapPin, Facebook, MessageCircle, Mail, Phone, Terminal, 
  ChevronDown, Play, LayoutGrid, UserPlus, Calendar, Clock, Lock
} from 'lucide-react';

export function RealEstateEarth() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Noise overlay style
  const noiseStyle = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
  };

  return (
    <div className="min-h-screen bg-[#fbf7f0] text-[#14532d] font-['Inter',sans-serif] relative overflow-hidden selection:bg-[#c2410c] selection:text-[#fbf7f0]">
      {/* Fonts & Noise */}
      <link href="https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,400..700;1,400..700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.4] mix-blend-multiply" style={noiseStyle}></div>

      {/* 1. Top Nav */}
      <nav className="sticky top-0 z-40 w-full border-b border-[#14532d]/10 bg-[#fbf7f0]/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#14532d] text-[#fbf7f0]">
                <Building2 size={24} strokeWidth={1.5} />
              </div>
              <span className="font-['Cormorant',serif] text-2xl font-bold tracking-tight text-[#14532d]">
                Leads Rubix
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-[#14532d]/80 hover:text-[#c2410c] transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-[#14532d]/80 hover:text-[#c2410c] transition-colors">Pricing</a>
              <a href="#solutions" className="text-sm font-medium text-[#14532d]/80 hover:text-[#c2410c] transition-colors">Solutions</a>
              <a href="#blog" className="text-sm font-medium text-[#14532d]/80 hover:text-[#c2410c] transition-colors">Blog</a>
              <a href="#contact" className="text-sm font-medium text-[#14532d]/80 hover:text-[#c2410c] transition-colors">Contact</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="text-sm font-medium text-[#14532d] hover:text-[#c2410c] transition-colors">
                Sign in
              </button>
              <button className="rounded-md bg-[#14532d] px-5 py-2.5 text-sm font-medium text-[#fbf7f0] hover:bg-[#c2410c] transition-colors shadow-sm">
                Start Free Trial
              </button>
            </div>

            <button 
              className="md:hidden text-[#14532d]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-[#c2410c]/30 bg-[#c2410c]/5 px-3 py-1 text-sm font-medium text-[#c2410c] mb-6">
                <span className="flex h-2 w-2 rounded-full bg-[#c2410c] mr-2"></span>
                Purpose-built for Indian Real Estate
              </div>
              <h1 className="font-['Cormorant',serif] text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-[#14532d] mb-6">
                Stop losing leads in WhatsApp.<br className="hidden sm:block"/> Start closing them.
              </h1>
              <p className="text-lg text-[#14532d]/70 mb-8 max-w-lg leading-relaxed">
                The only CRM designed specifically for Indian property developers and brokerages. Automate lead rotation, track agent performance, and never miss a follow-up again.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="inline-flex items-center justify-center rounded-md bg-[#c2410c] px-6 py-3.5 text-base font-medium text-white shadow-lg shadow-[#c2410c]/20 hover:bg-[#a0360a] transition-all">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="inline-flex items-center justify-center rounded-md border border-[#14532d]/20 bg-white/50 px-6 py-3.5 text-base font-medium text-[#14532d] hover:bg-white hover:border-[#14532d]/40 transition-all backdrop-blur-sm">
                  <Play className="mr-2 h-5 w-5 text-[#14532d]/60" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-[#14532d]/60 font-medium">
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#c2410c]" /> 7-day free trial</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#c2410c]" /> No credit card</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#c2410c]" /> Cancel anytime</span>
              </div>
            </div>

            {/* Hero Visual - Dashboard Mockup */}
            <div className="relative lg:h-[600px] w-full mt-10 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#14532d]/10 to-transparent rounded-3xl transform rotate-3 scale-105 border border-[#14532d]/5"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl shadow-[#14532d]/10 border border-[#14532d]/10 overflow-hidden h-full flex flex-col">
                {/* Mockup Header */}
                <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-gray-50/50">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="h-6 w-px bg-gray-200 ml-2"></div>
                    <span className="text-xs font-semibold text-gray-500 flex items-center gap-2"><LayoutGrid size={14} /> Pipeline View</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-48 h-8 bg-white border border-gray-200 rounded-md flex items-center px-3">
                      <span className="text-xs text-gray-400">Search leads...</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#14532d] to-[#257342] text-white flex items-center justify-center text-xs font-bold">
                      AJ
                    </div>
                  </div>
                </div>
                
                {/* Mockup Body - Pipeline */}
                <div className="flex-1 p-6 bg-gray-50/30 flex gap-4 overflow-hidden">
                  {/* Column 1 */}
                  <div className="flex-1 flex flex-col gap-3 min-w-[200px]">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                      <span className="text-xs font-bold text-gray-700">FRESH LEADS</span>
                      <span className="text-xs font-semibold bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">12</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-semibold text-gray-800">Rahul Sharma</span>
                        <span className="text-[10px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">Facebook</span>
                      </div>
                      <span className="text-xs text-gray-500 block mb-3">Looking for 3BHK in Andheri</span>
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                        <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock size={10} /> 10m ago</span>
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">S</div>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm opacity-70">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-semibold text-gray-800">Priya Patel</span>
                        <span className="text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded">WhatsApp</span>
                      </div>
                      <span className="text-xs text-gray-500 block mb-3">Lodha Woods Inquiry</span>
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                        <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock size={10} /> 1h ago</span>
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">R</div>
                      </div>
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="flex-1 flex flex-col gap-3 min-w-[200px]">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                      <span className="text-xs font-bold text-amber-700">FOLLOW UP</span>
                      <span className="text-xs font-semibold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">8</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-amber-200 shadow-sm relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400"></div>
                      <div className="flex justify-between items-start mb-2 pl-2">
                        <span className="text-sm font-semibold text-gray-800">Amit Kumar</span>
                        <span className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">99Acres</span>
                      </div>
                      <span className="text-xs text-gray-500 block mb-3 pl-2">Site visit scheduled</span>
                      <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50 pl-2">
                        <span className="text-[10px] text-amber-600 font-medium flex items-center gap-1"><Calendar size={10} /> Today, 4 PM</span>
                        <div className="w-5 h-5 rounded-full bg-[#14532d] flex items-center justify-center text-[10px] font-bold text-white">AJ</div>
                      </div>
                    </div>
                  </div>

                  {/* Column 3 */}
                  <div className="hidden sm:flex flex-1 flex-col gap-3 min-w-[200px] opacity-60">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                      <span className="text-xs font-bold text-[#14532d]">SITE VISIT</span>
                      <span className="text-xs font-semibold bg-green-100 text-[#14532d] px-2 py-0.5 rounded-full">3</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                      <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-32 bg-gray-100 rounded mb-4"></div>
                      <div className="h-8 w-full bg-gray-50 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Built For Pill Strip */}
      <section className="border-y border-[#14532d]/10 bg-white/40 backdrop-blur-sm py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold tracking-wider text-[#14532d]/50 uppercase mb-6">Built explicitly for</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 rounded-full border border-[#14532d]/10 bg-white px-4 py-2 text-sm font-medium text-[#14532d]/80 shadow-sm">
              <Building2 className="h-4 w-4 text-[#c2410c]" /> Property Developers
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#14532d]/10 bg-white px-4 py-2 text-sm font-medium text-[#14532d]/80 shadow-sm">
              <Home className="h-4 w-4 text-[#c2410c]" /> Residential Brokerages
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#14532d]/10 bg-white px-4 py-2 text-sm font-medium text-[#14532d]/80 shadow-sm">
              <Briefcase className="h-4 w-4 text-[#c2410c]" /> Commercial Real Estate
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#14532d]/10 bg-white px-4 py-2 text-sm font-medium text-[#14532d]/80 shadow-sm">
              <Network className="h-4 w-4 text-[#c2410c]" /> Channel Partners
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#14532d]/10 bg-white px-4 py-2 text-sm font-medium text-[#14532d]/80 shadow-sm">
              <Users className="h-4 w-4 text-[#c2410c]" /> Multi-branch Sales Teams
            </div>
          </div>
        </div>
      </section>

      {/* 4. Stats Band */}
      <section className="py-20 bg-[#14532d] text-[#fbf7f0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[#fbf7f0]/10">
            <div className="text-center px-4">
              <div className="font-['Cormorant',serif] text-5xl font-bold text-[#c2410c] mb-2">50+</div>
              <div className="text-sm font-medium text-[#fbf7f0]/80">Custom lead fields tailored for real estate</div>
            </div>
            <div className="text-center px-4">
              <div className="font-['Cormorant',serif] text-5xl font-bold text-[#c2410c] mb-2">6</div>
              <div className="text-sm font-medium text-[#fbf7f0]/80">Pre-configured organizational roles</div>
            </div>
            <div className="text-center px-4">
              <div className="font-['Cormorant',serif] text-5xl font-bold text-[#c2410c] mb-2">&lt;1s</div>
              <div className="text-sm font-medium text-[#fbf7f0]/80">Capture latency from portal to agent</div>
            </div>
            <div className="text-center px-4">
              <div className="font-['Cormorant',serif] text-5xl font-bold text-[#c2410c] mb-2">24/7</div>
              <div className="text-sm font-medium text-[#fbf7f0]/80">Automated lead capture & assignment</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Problem */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Cormorant',serif] text-4xl sm:text-5xl font-bold text-[#14532d] mb-6">
              Why generic CRMs fail real estate teams
            </h2>
            <p className="text-lg text-[#14532d]/70">
              Spreadsheets are messy, WhatsApp chats get lost, and standard CRMs don't understand site visits, channel partners, or project towers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-[#14532d]/10 shadow-lg shadow-[#14532d]/5 hover:border-[#c2410c]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-6 border border-red-100">
                <LayoutGrid className="text-red-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#14532d] mb-3">Data Chaos</h3>
              <p className="text-[#14532d]/70 leading-relaxed">
                Leads scattered across WhatsApp, Excel sheets, and email. No single source of truth for a prospect's history and requirements.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-[#14532d]/10 shadow-lg shadow-[#14532d]/5 hover:border-[#c2410c]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-6 border border-amber-100">
                <Users className="text-amber-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#14532d] mb-3">Zero Accountability</h3>
              <p className="text-[#14532d]/70 leading-relaxed">
                No visibility into who called whom, what was discussed, or why a hot lead went cold. Managers are flying blind.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-[#14532d]/10 shadow-lg shadow-[#14532d]/5 hover:border-[#c2410c]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 border border-blue-100">
                <Clock className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-[#14532d] mb-3">Slow Response Times</h3>
              <p className="text-[#14532d]/70 leading-relaxed">
                In real estate, speed is everything. Taking hours to assign a Facebook lead means losing the deal to a competitor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Pipeline Visualization */}
      <section className="py-24 bg-[#1a3a2e] text-[#fbf7f0] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={noiseStyle}></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Cormorant',serif] text-4xl sm:text-5xl font-bold mb-6">
              A pipeline built for property sales
            </h2>
            <p className="text-lg text-[#fbf7f0]/70">
              Track prospects through the exact journey they take—from initial inquiry to token amount.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 overflow-x-auto pb-8 snap-x">
            {[
              { title: "FRESH", desc: "Auto-captured", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
              { title: "CALLBACK", desc: "Agent assigned", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
              { title: "INTERESTED", desc: "Site visit done", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
              { title: "BOOKED", desc: "Token received", color: "bg-green-500/20 text-green-300 border-green-500/30" },
              { title: "LOST", desc: "Dropped / Unqualified", color: "bg-red-500/20 text-red-300 border-red-500/30" }
            ].map((stage, idx) => (
              <React.Fragment key={stage.title}>
                <div className={`flex-shrink-0 snap-center w-48 rounded-xl border p-4 bg-[#14532d] shadow-xl relative ${stage.color}`}>
                  <div className="font-bold tracking-wider text-sm mb-1">{stage.title}</div>
                  <div className="text-xs opacity-70">{stage.desc}</div>
                </div>
                {idx < 4 && (
                  <ArrowRight className="hidden md:block h-6 w-6 text-[#fbf7f0]/30 flex-shrink-0" />
                )}
                {idx < 4 && (
                  <ChevronDown className="md:hidden h-6 w-6 text-[#fbf7f0]/30 flex-shrink-0 my-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Features Grid */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="font-['Cormorant',serif] text-4xl sm:text-5xl font-bold text-[#14532d] mb-6">
              Everything you need to close more properties
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[
              { icon: Zap, title: "Automated Lead Rotation", desc: "Distribute leads instantly based on performance, availability, or round-robin rules." },
              { icon: Phone, title: "Call Log Tracking", desc: "Log every interaction automatically. Know exactly how many calls it takes to book a visit." },
              { icon: BarChart3, title: "Real-time Analytics", desc: "Track conversions by project, source, or individual sales executive in real-time." },
              { icon: CreditCard, title: "Bookings & Payments", desc: "Record token amounts, generate receipts, and track payment schedules directly in the CRM." },
              { icon: Shield, title: "Role-Based Access", desc: "Control who sees what. Keep sensitive data secure across your entire hierarchy." },
              { icon: Globe, title: "Multi-Source Capture", desc: "Integrate with 99Acres, MagicBricks, Facebook Ads, and your website seamlessly." },
              { icon: ListTodo, title: "Task Management", desc: "Automate follow-up reminders so agents never miss a scheduled callback." },
              { icon: Network, title: "Multi-Org Support", desc: "Manage multiple projects, brokerages, or channel partners from a single master dashboard." },
              { icon: MapPin, title: "GPS Call Tracking", desc: "Verify agent locations during site visits and track on-ground sales activities." }
            ].map((feature, idx) => (
              <div key={idx} className="group">
                <div className="w-10 h-10 rounded-lg bg-[#c2410c]/10 flex items-center justify-center mb-4 group-hover:bg-[#c2410c] transition-colors duration-300">
                  <feature.icon className="h-5 w-5 text-[#c2410c] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#14532d] mb-2">{feature.title}</h3>
                <p className="text-[#14532d]/70 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Lead Rotation Deep Dive */}
      <section className="py-24 bg-white border-y border-[#14532d]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-['Cormorant',serif] text-4xl sm:text-5xl font-bold text-[#14532d] mb-6">
                Never let a hot lead go cold again.
              </h2>
              <p className="text-lg text-[#14532d]/70 mb-10">
                Our intelligent routing engine ensures every inquiry is handled within minutes, dynamically bypassing unavailable agents.
              </p>

              <div className="space-y-8">
                {[
                  { step: "01", title: "Lead Arrives", desc: "A new inquiry drops from a Facebook Ad for your latest luxury project." },
                  { step: "02", title: "Response Window", desc: "Assigned to Agent A. They have 15 minutes to initiate contact." },
                  { step: "03", title: "Auto-Reassignment", desc: "If missed, the lead is automatically rotated to Agent B to ensure quick response." },
                  { step: "04", title: "Schedule Aware", desc: "Routing logic respects shift timings, holidays, and current workload." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 font-['Cormorant',serif] text-2xl font-bold text-[#c2410c]/50">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[#14532d] mb-1">{item.title}</h4>
                      <p className="text-[#14532d]/70 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-[500px] rounded-2xl bg-[#fbf7f0] border border-[#14532d]/10 p-8 flex flex-col justify-center overflow-hidden shadow-inner">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(194,65,12,0.05)_0%,transparent_100%)]"></div>
               {/* Visual interpretation of routing */}
               <div className="relative z-10 space-y-4">
                 <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex items-center justify-between transform -translate-x-4">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><Facebook className="text-blue-600 h-5 w-5" /></div>
                     <div>
                       <div className="font-bold text-sm">New Lead: 3BHK Apartment</div>
                       <div className="text-xs text-gray-500">Source: FB Lead Ads</div>
                     </div>
                   </div>
                   <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Just Now</span>
                 </div>
                 
                 <div className="flex justify-center py-2">
                   <ArrowDownLine />
                 </div>

                 <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between opacity-50">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">V</div>
                     <div>
                       <div className="font-bold text-sm">Agent: Vikram</div>
                       <div className="text-xs text-red-500">Missed 15m window</div>
                     </div>
                   </div>
                   <X className="text-red-500 h-5 w-5" />
                 </div>

                 <div className="flex justify-center py-2">
                   <ArrowDownLine />
                 </div>

                 <div className="bg-white p-4 rounded-xl border border-green-200 shadow-md flex items-center justify-between transform translate-x-4 ring-2 ring-green-500/20">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700">S</div>
                     <div>
                       <div className="font-bold text-sm">Agent: Sneha</div>
                       <div className="text-xs text-green-600">Reassigned • Calling now</div>
                     </div>
                   </div>
                   <Check className="text-green-500 h-5 w-5" />
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Roles Cards */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Cormorant',serif] text-4xl sm:text-5xl font-bold text-[#14532d] mb-6">
              Built for every layer of your hierarchy
            </h2>
            <p className="text-lg text-[#14532d]/70">
              Stop fighting with permissions. We mapped the exact org structure of Indian real estate companies into our DNA.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Super Admin", desc: "Full control over the platform, billing, and global settings.", icon: Shield },
              { title: "Organization Admin", desc: "Manage specific companies, projects, or branches within the network.", icon: Building2 },
              { title: "Operation Manager", desc: "Oversee daily processes, lead quality, and team metrics.", icon: Briefcase },
              { title: "Team Lead", desc: "Manage a pod of agents, monitor calls, and approve special discounts.", icon: Users },
              { title: "Lead Manager", desc: "Qualify incoming raw leads before distributing to the sales floor.", icon: ListTodo },
              { title: "Sales Agent", desc: "Focused view on assigned leads, daily follow-ups, and site visits.", icon: UserPlus }
            ].map((role, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-[#14532d]/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#fbf7f0] flex items-center justify-center text-[#14532d]">
                    <role.icon size={18} />
                  </div>
                  <h3 className="font-bold text-[#14532d]">{role.title}</h3>
                </div>
                <p className="text-sm text-[#14532d]/70">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Integrations */}
      <section className="py-16 bg-[#1a3a2e] text-[#fbf7f0] border-y border-[#14532d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold tracking-wider text-[#fbf7f0]/50 uppercase mb-8">Seamlessly connects with your existing stack</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-bold text-lg"><Facebook /> Facebook Ads</div>
            <div className="flex items-center gap-2 font-bold text-lg"><MessageCircle /> WhatsApp API</div>
            <div className="flex items-center gap-2 font-bold text-lg"><Smartphone /> SMS & FCM</div>
            <div className="flex items-center gap-2 font-bold text-lg"><CreditCard /> Razorpay</div>
            <div className="flex items-center gap-2 font-bold text-lg"><Mail /> SMTP</div>
            <div className="flex items-center gap-2 font-bold text-lg"><Terminal /> REST API</div>
          </div>
        </div>
      </section>

      {/* 11. Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-['Cormorant',serif] text-4xl sm:text-5xl font-bold text-[#14532d] text-center mb-16">
            Trusted by top developers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#14532d]/10 relative">
              <div className="absolute top-8 right-8 text-[#c2410c] opacity-20 font-serif text-6xl">"</div>
              <p className="text-[#14532d]/80 relative z-10 mb-8 italic">
                "Before Leads Rubix, we lost track of 30% of our Facebook leads because agents wouldn't update the Excel sheet. Now, we have 100% visibility into every site visit and follow-up."
              </p>
              <div>
                <div className="font-bold text-[#14532d]">Rajesh Verma</div>
                <div className="text-sm text-[#14532d]/60">VP Sales, Horizon Developers</div>
              </div>
            </div>
            
            <div className="bg-[#14532d] p-8 rounded-2xl border border-[#14532d] relative text-[#fbf7f0] transform md:-translate-y-4 shadow-xl shadow-[#14532d]/20">
              <div className="absolute top-8 right-8 text-[#c2410c] opacity-40 font-serif text-6xl">"</div>
              <p className="text-[#fbf7f0]/90 relative z-10 mb-8 italic">
                "The auto-rotation feature changed our lives. If a lead drops at 9 PM, it's immediately assigned to the night-shift agent. Our conversion rate jumped by 18% in two months."
              </p>
              <div>
                <div className="font-bold">Ananya Singh</div>
                <div className="text-sm text-[#fbf7f0]/60">Director, Elite PropMart Brokerage</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-[#14532d]/10 relative">
              <div className="absolute top-8 right-8 text-[#c2410c] opacity-20 font-serif text-6xl">"</div>
              <p className="text-[#14532d]/80 relative z-10 mb-8 italic">
                "We manage 4 different projects across Pune. Having a centralized dashboard that handles multi-org permissions perfectly means our data stays secure while upper management gets the big picture."
              </p>
              <div>
                <div className="font-bold text-[#14532d]">Vikram Desai</div>
                <div className="text-sm text-[#14532d]/60">Operations Head, Vastu Spaces</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Pricing Teaser */}
      <section id="pricing" className="py-24 bg-white border-y border-[#14532d]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-['Cormorant',serif] text-4xl sm:text-5xl font-bold text-[#14532d] mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-[#14532d]/70">
              No hidden fees. Pay only for the users you need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-[#fbf7f0] rounded-2xl p-8 border border-[#14532d]/10 text-center flex flex-col">
              <h3 className="text-xl font-bold text-[#14532d] mb-2">Starter</h3>
              <p className="text-sm text-[#14532d]/60 mb-6">For small agencies starting out</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-[#14532d]">₹999</span>
                <span className="text-[#14532d]/60">/user/mo</span>
              </div>
              <ul className="text-left space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-[#14532d]/80"><Check className="h-5 w-5 text-[#c2410c] flex-shrink-0" /> Up to 5 users</li>
                <li className="flex items-start gap-3 text-sm text-[#14532d]/80"><Check className="h-5 w-5 text-[#c2410c] flex-shrink-0" /> Basic lead management</li>
                <li className="flex items-start gap-3 text-sm text-[#14532d]/80"><Check className="h-5 w-5 text-[#c2410c] flex-shrink-0" /> Facebook & WhatsApp integration</li>
              </ul>
              <button className="w-full py-3 rounded-md border border-[#14532d] text-[#14532d] font-bold hover:bg-[#14532d] hover:text-white transition-colors">
                Start Trial
              </button>
            </div>

            {/* Growth */}
            <div className="bg-[#14532d] rounded-2xl p-8 border border-[#14532d] text-center flex flex-col relative shadow-2xl shadow-[#14532d]/20 transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#c2410c] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Growth</h3>
              <p className="text-sm text-[#fbf7f0]/60 mb-6">For growing real estate teams</p>
              <div className="mb-8">
                <span className="text-4xl font-bold text-white">₹1,499</span>
                <span className="text-[#fbf7f0]/60">/user/mo</span>
              </div>
              <ul className="text-left space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-[#fbf7f0]/90"><Check className="h-5 w-5 text-[#c2410c] flex-shrink-0" /> Up to 50 users</li>
                <li className="flex items-start gap-3 text-sm text-[#fbf7f0]/90"><Check className="h-5 w-5 text-[#c2410c] flex-shrink-0" /> Advanced routing rules</li>
                <li className="flex items-start gap-3 text-sm text-[#fbf7f0]/90"><Check className="h-5 w-5 text-[#c2410c] flex-shrink-0" /> Custom roles & permissions</li>
                <li className="flex items-start gap-3 text-sm text-[#fbf7f0]/90"><Check className="h-5 w-5 text-[#c2410c] flex-shrink-0" /> Analytics dashboard</li>
              </ul>
              <button className="w-full py-3 rounded-md bg-[#c2410c] text-white font-bold hover:bg-[#a0360a] transition-colors shadow-lg shadow-[#c2410c]/20">
                Start Trial
              </button>
            </div>

            {/* Enterprise */}
            <div className="bg-[#fbf7f0] rounded-2xl p-8 border border-[#14532d]/10 text-center flex flex-col">
              <h3 className="text-xl font-bold text-[#14532d] mb-2">Enterprise</h3>
              <p className="text-sm text-[#14532d]/60 mb-6">For massive developer networks</p>
              <div className="mb-8 mt-2">
                <span className="text-3xl font-bold text-[#14532d]">Custom Pricing</span>
              </div>
              <ul className="text-left space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3 text-sm text-[#14532d]/80"><Check className="h-5 w-5 text-[#c2410c] flex-shrink-0" /> Unlimited users</li>
                <li className="flex items-start gap-3 text-sm text-[#14532d]/80"><Check className="h-5 w-5 text-[#c2410c] flex-shrink-0" /> Multi-org architecture</li>
                <li className="flex items-start gap-3 text-sm text-[#14532d]/80"><Check className="h-5 w-5 text-[#c2410c] flex-shrink-0" /> White-labeling options</li>
                <li className="flex items-start gap-3 text-sm text-[#14532d]/80"><Check className="h-5 w-5 text-[#c2410c] flex-shrink-0" /> Dedicated success manager</li>
              </ul>
              <button className="w-full py-3 rounded-md border border-[#14532d] text-[#14532d] font-bold hover:bg-[#14532d] hover:text-white transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-['Cormorant',serif] text-4xl font-bold text-[#14532d] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: "How long is the free trial?", a: "We offer a 7-day fully featured free trial. No credit card is required to sign up." },
              { q: "Can I cancel anytime?", a: "Yes, Leads Rubix is a month-to-month service. You can cancel your subscription at any time without penalty." },
              { q: "Do you offer white-labelling?", a: "Yes, white-labelling (custom domain, your logo) is available on our Enterprise plan." },
              { q: "Is GST included in the pricing?", a: "No, 18% GST is applicable on top of the listed prices as per Indian tax regulations." },
              { q: "Who owns my data?", a: "You do. We provide easy 1-click exports of all your leads and data. We never sell or share your data with third parties." },
              { q: "What kind of support do you provide?", a: "All plans include email support. Growth and Enterprise plans include priority phone support and a dedicated account manager." }
            ].map((faq, idx) => (
              <details key={idx} className="group bg-white rounded-lg border border-[#14532d]/10 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-semibold text-[#14532d]">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 text-[#14532d]/50 transition-transform group-open:-rotate-180" />
                </summary>
                <div className="px-6 pb-6 text-[#14532d]/70 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Final CTA */}
      <section className="py-24 bg-[#14532d] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={noiseStyle}></div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="font-['Cormorant',serif] text-4xl sm:text-6xl font-bold text-[#fbf7f0] mb-6">
            Ready to organize your sales?
          </h2>
          <p className="text-xl text-[#fbf7f0]/80 mb-10 max-w-2xl mx-auto">
            Join hundreds of Indian real estate developers who are closing more deals with Leads Rubix.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center rounded-md bg-[#c2410c] px-8 py-4 text-lg font-medium text-white shadow-xl hover:bg-[#a0360a] transition-all">
              Start your free trial
            </button>
            <button className="inline-flex items-center justify-center rounded-md bg-white/10 px-8 py-4 text-lg font-medium text-white hover:bg-white/20 transition-all border border-white/20">
              Talk to sales
            </button>
          </div>
        </div>
      </section>

      {/* 15. Footer */}
      <footer className="bg-[#0f3d22] text-[#fbf7f0]/60 py-16 border-t border-white/10 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-[#c2410c] text-white">
                  <Building2 size={18} strokeWidth={2} />
                </div>
                <span className="font-['Cormorant',serif] text-xl font-bold text-white">Leads Rubix</span>
              </div>
              <p className="text-sm mb-6 max-w-xs">
                The intelligent CRM purpose-built to help Indian real estate teams capture, route, and close more properties.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Mail size={20} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#c2410c] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#c2410c] transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-[#c2410c] transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-[#c2410c] transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#c2410c] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#c2410c] transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-[#c2410c] transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-[#c2410c] transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-[#c2410c] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#c2410c] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#c2410c] transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Leads Rubix Technologies Pvt. Ltd. All rights reserved.</p>
            <p>Made with precision in Mumbai, India. GSTIN: 27AABCL3518Q1Z1</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ArrowDownLine() {
  return (
    <svg width="2" height="40" viewBox="0 0 2 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 0V40" stroke="#c2410c" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  );
}
