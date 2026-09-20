"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Store,
  Sparkles,
  ArrowRight,
  MessageCircle,
  QrCode,
  MapPin,
  Clock,
  CheckCircle2,
  PhoneCall,
  Scissors,
  GraduationCap,
  Utensils,
  Wrench,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  Smartphone,
  CheckCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { DevFallbackBanner } from "@/components/shared/DevFallbackBanner";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"garage" | "tailor" | "coaching" | "tiffin">("garage");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const previewCards = [
    {
      id: "garage" as const,
      category: "Mechanic / Repair",
      slug: "sai-krupa-auto-garage",
      badge: "गॅरेज / मेकॅनिक",
      icon: Wrench,
      name: "Sai Krupa Auto Garage",
      tagline: "Honest Diagnostics, Genuine Spare Parts & Reliable Servicing You Can Count On",
      location: "Station Road, Kolhapur",
      hours: "9:00 AM – 8:30 PM",
      phone: "98230 11223",
      chips: ["Full Bike Servicing", "100% Genuine Parts", "24/7 Breakdown Towing", "Same-Day Return"],
      quote: "Customers now scan my shop poster QR and message directly on WhatsApp before coming!",
      author: "Ramesh Patil, Master Mechanic",
      color: "#D97706",
      bgColor: "#FEF3C7",
      themeName: "Mustard Gold Theme",
    },
    {
      id: "tailor" as const,
      category: "Tailoring & Boutique",
      slug: "shree-ganesh-tailors-pune",
      badge: "दर्जी / शिंपी",
      icon: Scissors,
      name: "Shree Ganesh Tailors & Boutique",
      tagline: "Flawless Stitching, Perfect Fit & Timely Delivery — Trusted by Pune Families for 18+ Yrs",
      location: "Kothrud, Pune",
      hours: "10:00 AM – 8:30 PM",
      phone: "98220 12345",
      chips: ["Bridal Blouses", "Fall-Pico", "Suit Alterations", "24hr Express"],
      quote: "My customers now message directly on WhatsApp with saree photos!",
      author: "Prakash Shinde, Master Tailor",
      color: "#C2410C",
      bgColor: "#FFF7ED",
      themeName: "Terracotta Earth Theme",
    },
    {
      id: "coaching" as const,
      category: "Tuition / Coaching",
      slug: "bright-future-classes",
      badge: "ट्यूशन / शिकवणी",
      icon: GraduationCap,
      name: "Bright Future Coaching Classes",
      tagline: "Empowering Students to Score 90%+ with Concept-First Learning in Borivali",
      location: "Borivali West, Mumbai",
      hours: "4:00 PM – 9:00 PM",
      phone: "98190 98765",
      chips: ["Class 9-10 CBSE", "Maths & Science", "Mock Tests", "Small Batches"],
      quote: "Parents in my locality found my timings and syllabus right on Google Maps.",
      author: "Prof. R.K. Sharma",
      color: "#4F46E5",
      bgColor: "#EEF2FF",
      themeName: "Royal Blue Theme",
    },
    {
      id: "tiffin" as const,
      category: "Home Kitchen & Tiffin",
      slug: "aais-home-kitchen",
      badge: "घरगुती जेवण / डबा",
      icon: Utensils,
      name: "Aai's Home Kitchen & Tiffin",
      tagline: "Ghar Jaisa Pure Swad, Maa Jaisa Pyaar — Fresh & Warm Homestyle Tiffins",
      location: "Sector 14, Vashi, Navi Mumbai",
      hours: "11:00 AM – 9:30 PM",
      phone: "99300 54321",
      chips: ["Daily Veg Thali", "Pure Ghee Phulkas", "Monthly Dabba", "Zero Preservatives"],
      quote: "I stuck the QR code poster on my gate. Orders doubled in 2 weeks!",
      author: "Savita Tai Patil, Home Chef",
      color: "#15803D",
      bgColor: "#F0FDF4",
      themeName: "Forest Green Theme",
    },
  ];

  const currentPreviewIdx = previewCards.findIndex((c) => c.id === activeTab);
  const currentPreview = previewCards[currentPreviewIdx >= 0 ? currentPreviewIdx : 0];

  // Auto rotate carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const idx = previewCards.findIndex((c) => c.id === prev);
        const nextIdx = (idx + 1) % previewCards.length;
        return previewCards[nextIdx].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleNextTab = () => {
    setIsAutoPlaying(false);
    const nextIdx = (currentPreviewIdx + 1) % previewCards.length;
    setActiveTab(previewCards[nextIdx].id);
  };

  const handlePrevTab = () => {
    setIsAutoPlaying(false);
    const prevIdx = (currentPreviewIdx - 1 + previewCards.length) % previewCards.length;
    setActiveTab(previewCards[prevIdx].id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF6] bg-bazaar-pattern selection:bg-[#FFEDD5] selection:text-[#C2410C]">
      <DevFallbackBanner />
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION — Warm, Tactile Indian Bazaar Aesthetic */}
        <section className="relative pt-6 sm:pt-10 pb-16 px-4 sm:px-6 overflow-hidden bg-bazaar-hero border-b border-[#F0E6D6]">
          {/* Subtle Ambient Decorative Gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-radial from-[#FDBA74]/30 via-[#FEF3C7]/20 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Top Pill — Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-[#FDBA74] text-[#C2410C] text-xs sm:text-sm font-extrabold shadow-sm mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C2410C] animate-ping shrink-0" />
              <Sparkles className="w-4 h-4 text-[#EA580C]" />
              <span>Built for India&apos;s Local Shop Owners • 2 Minutes • 100% Free</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1C1917] tracking-tight leading-[1.15] mb-5 font-[family-name:var(--font-heading)]">
              Take Your Local Business Online in{" "}
              <span className="text-[#C2410C] relative inline-block">
                2 Minutes
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#FDBA74]" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0 100 15" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-[#57534E] max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
              Create a warm, professional digital storefront for your shop — no coding, no designer, no technical knowledge needed. Connect with customers directly on WhatsApp.
            </p>

            {/* CTAs — High Contrast Primary CTA + Clear Secondary Link */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto mb-10">
              {/* PRIMARY CTA */}
              <Link
                href="/create"
                className="tap-target w-full sm:w-auto px-9 py-4.5 bg-gradient-to-r from-[#C2410C] via-[#EA580C] to-[#D97706] hover:from-[#9A3412] hover:to-[#C2410C] active:scale-98 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-xl shadow-orange-900/25 transition-all flex items-center justify-center gap-3 group border border-orange-400/30"
              >
                <span>Create My Free Storefront</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              {/* SECONDARY LINK */}
              <Link
                href={`/store/${currentPreview.slug}`}
                className="tap-target w-full sm:w-auto px-5 py-3.5 bg-white/80 hover:bg-[#FFF7ED] border border-[#D6C7B2] text-[#57534E] hover:text-[#C2410C] font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 group shadow-2xs"
              >
                <ExternalLink className="w-4 h-4 text-[#C2410C] group-hover:scale-110 transition-transform" />
                <span>See Live Demo Store</span>
              </Link>
            </div>

            {/* Mini Trust Points with Bazaar Touch */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs sm:text-sm font-bold text-[#57534E] bg-white/60 backdrop-blur-xs p-3.5 rounded-2xl border border-[#F0E6D6] max-w-2xl mx-auto shadow-2xs">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                Direct WhatsApp Chat
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                Google Maps Included
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                Printable QR Poster
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                Hindi / Marathi Support
              </span>
            </div>
          </div>
        </section>

        {/* 2. INTERACTIVE CATEGORY CAROUSEL — LIVE THEME SWAPPING */}
        <section className="px-4 sm:px-6 py-12 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#C2410C] uppercase tracking-wider bg-[#FFEDD5] px-3 py-1 rounded-full border border-[#FDBA74]/50">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Category Personalization</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C1917] mt-2 font-[family-name:var(--font-heading)]">
              Real Micro-Business Storefront Preview
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1 max-w-lg mx-auto">
              Watch how Dukaan Ready automatically customizes themes, tags, and layouts for different shop categories.
            </p>
          </div>

          {/* Carousel Category Tabs */}
          <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
            {previewCards.map((card) => {
              const IconComp = card.icon;
              const isActive = activeTab === card.id;
              return (
                <button
                  key={card.id}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveTab(card.id);
                  }}
                  className={`tap-target px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 shrink-0 ${
                    isActive
                      ? "bg-[#1C1917] text-white shadow-md scale-102"
                      : "bg-white text-[#57534E] border border-[#E8DECB] hover:bg-[#F5EEDD]"
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? "text-[#FDBA74]" : "text-[#78716C]"}`} />
                  <span>{card.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Card Container with Carousel Controls */}
          <div className="relative max-w-2xl mx-auto">
            {/* Left/Right Carousel Controls */}
            <button
              onClick={handlePrevTab}
              className="absolute left-[-16px] sm:left-[-24px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#D6C7B2] shadow-md flex items-center justify-center text-[#1C1917] hover:bg-[#FFF7ED] transition-colors"
              aria-label="Previous Category"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextTab}
              className="absolute right-[-16px] sm:right-[-24px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-[#D6C7B2] shadow-md flex items-center justify-center text-[#1C1917] hover:bg-[#FFF7ED] transition-colors"
              aria-label="Next Category"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Live Rendered Storefront Card */}
            <div
              className="dukaan-card-elevated p-6 sm:p-8 relative overflow-hidden transition-all duration-300 border-t-8"
              style={{ borderTopColor: currentPreview.color }}
            >
              {/* Theme Badge Indicator */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full"
                  style={{ backgroundColor: currentPreview.bgColor, color: currentPreview.color }}
                >
                  {React.createElement(currentPreview.icon, { className: "w-4 h-4" })}
                  <span>{currentPreview.category}</span>
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#78716C] bg-[#FCFAF6] px-2.5 py-0.5 rounded-full border border-[#E8DECB]">
                    {currentPreview.themeName}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F0FDF4] text-[#15803D] border border-green-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-ping" />
                    Open Now
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight font-[family-name:var(--font-heading)]">
                {currentPreview.name}
              </h3>
              <p
                className="text-xs sm:text-sm font-semibold mt-1.5 italic leading-relaxed"
                style={{ color: currentPreview.color }}
              >
                &ldquo;{currentPreview.tagline}&rdquo;
              </p>

              {/* Offerings Chips */}
              <div className="flex flex-wrap gap-1.5 my-4 pt-2">
                {currentPreview.chips.map((chip, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-[#F5EEDD] text-[#44403C] font-semibold text-xs flex items-center gap-1"
                  >
                    <Check className="w-3 h-3 text-[#15803D]" />
                    <span>{chip}</span>
                  </span>
                ))}
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#F0E6D6] text-xs text-[#57534E] my-4">
                <div className="flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4 shrink-0" style={{ color: currentPreview.color }} />
                  <span>{currentPreview.hours}</span>
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <MapPin className="w-4 h-4 shrink-0" style={{ color: currentPreview.color }} />
                  <span className="truncate">{currentPreview.location}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Link
                  href={`/store/${currentPreview.slug}`}
                  className="tap-target py-3 px-4 rounded-xl bg-[#25D366] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm shadow-green-900/15"
                >
                  <MessageCircle className="w-4.5 h-4.5 fill-white" />
                  <span>Chat on WhatsApp</span>
                </Link>
                <Link
                  href={`/store/${currentPreview.slug}`}
                  className="tap-target py-3 px-4 rounded-xl bg-[#F5EEDD] hover:bg-[#E8DECB] text-[#1C1917] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#D6C7B2]"
                >
                  <QrCode className="w-4 h-4 text-[#C2410C]" />
                  <span>View Full Store</span>
                </Link>
              </div>

              {/* Testimonial Quote */}
              <div className="mt-5 p-3.5 rounded-xl bg-[#FFFDF9] border border-[#F0E6D6] text-xs text-[#57534E] flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFEDD5] text-[#C2410C] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  ⭐
                </div>
                <div>
                  <p className="italic font-medium">&ldquo;{currentPreview.quote}&rdquo;</p>
                  <p className="font-extrabold text-[#1C1917] mt-1 text-[11px]">— {currentPreview.author}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. WHATSAPP CHAT BUBBLE TESTIMONIALS SECTION */}
        <section className="px-4 sm:px-6 py-12 max-w-4xl mx-auto border-t border-[#F0E6D6]">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#15803D] uppercase tracking-wider bg-[#F0FDF4] px-3 py-1 rounded-full border border-green-200">
              <MessageCircle className="w-3.5 h-3.5 fill-[#15803D]" />
              <span>Real Customer Stories</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C1917] mt-2 font-[family-name:var(--font-heading)]">
              Loved by Shop Owners Across India
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1">
              See how local businesses use Dukaan Ready to turn WhatsApp messages into paying customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp Chat Bubble 1 */}
            <div className="rounded-2xl border border-[#075E54]/30 bg-[#E5DDD5] overflow-hidden shadow-md">
              {/* WhatsApp Header */}
              <div className="bg-[#075E54] text-white p-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                  RP
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs truncate">Ramesh Patil (Mechanic)</h4>
                  <p className="text-[10px] text-green-200">Kolhapur • Online</p>
                </div>
                <MessageCircle className="w-4 h-4 text-white" />
              </div>

              {/* Chat Canvas */}
              <div className="p-4 space-y-3 text-xs bg-[radial-gradient(#CBD5E1_0.75px,transparent_0.75px)] [background-size:12px_12px]">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs text-[#1C1917] max-w-[90%]">
                  <p className="font-medium">
                    &ldquo;Main pehle customer ko rates batane ke liye gallery dhoondhta tha. Ab seedha Dukaan Ready link bhejta hu. Full professional feel!&rdquo;
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#78716C]">
                    <span>10:24 AM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />
                  </div>
                </div>

                <div className="bg-[#DCF8C6] p-2.5 rounded-2xl rounded-tr-none shadow-xs text-[#1C1917] ml-auto max-w-[85%]">
                  <p className="font-semibold text-[11px] text-[#075E54]">✓ Dukaan Ready QR Poster Active</p>
                  <p className="text-[10px] text-[#57534E]">142 storefront visits this week!</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Chat Bubble 2 */}
            <div className="rounded-2xl border border-[#075E54]/30 bg-[#E5DDD5] overflow-hidden shadow-md">
              {/* WhatsApp Header */}
              <div className="bg-[#075E54] text-white p-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-xs">
                  PS
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs truncate">Prakash Shinde (Tailor)</h4>
                  <p className="text-[10px] text-green-200">Kothrud, Pune • Online</p>
                </div>
                <MessageCircle className="w-4 h-4 text-white" />
              </div>

              {/* Chat Canvas */}
              <div className="p-4 space-y-3 text-xs bg-[radial-gradient(#CBD5E1_0.75px,transparent_0.75px)] [background-size:12px_12px]">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs text-[#1C1917] max-w-[90%]">
                  <p className="font-medium">
                    &ldquo;Diwali season me blouse order inquiries handle karna bohot easy ho gaya. Customer price dekh ke hi WhatsApp call karte hai.&rdquo;
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#78716C]">
                    <span>11:15 AM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />
                  </div>
                </div>

                <div className="bg-[#DCF8C6] p-2.5 rounded-2xl rounded-tr-none shadow-xs text-[#1C1917] ml-auto max-w-[85%]">
                  <p className="font-semibold text-[11px] text-[#075E54]">✓ 64 WhatsApp Leads Generated</p>
                  <p className="text-[10px] text-[#57534E]">Pune Tailoring Community</p>
                </div>
              </div>
            </div>

            {/* WhatsApp Chat Bubble 3 */}
            <div className="rounded-2xl border border-[#075E54]/30 bg-[#E5DDD5] overflow-hidden shadow-md">
              {/* WhatsApp Header */}
              <div className="bg-[#075E54] text-white p-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                  ST
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs truncate">Savita Tai (Home Kitchen)</h4>
                  <p className="text-[10px] text-green-200">Vashi, Navi Mumbai • Online</p>
                </div>
                <MessageCircle className="w-4 h-4 text-white" />
              </div>

              {/* Chat Canvas */}
              <div className="p-4 space-y-3 text-xs bg-[radial-gradient(#CBD5E1_0.75px,transparent_0.75px)] [background-size:12px_12px]">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-xs text-[#1C1917] max-w-[90%]">
                  <p className="font-medium">
                    &ldquo;Maine gate pe A4 poster lagaya. Building ke IT workers QR scan karke monthly dabba subscribe kar rahe hai!&rdquo;
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#78716C]">
                    <span>02:40 PM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />
                  </div>
                </div>

                <div className="bg-[#DCF8C6] p-2.5 rounded-2xl rounded-tr-none shadow-xs text-[#1C1917] ml-auto max-w-[85%]">
                  <p className="font-semibold text-[11px] text-[#075E54]">✓ Monthly Dabba Subscription</p>
                  <p className="text-[10px] text-[#57534E]">Orders doubled in 2 weeks!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS — 3 SIMPLE STEPS */}
        <section className="px-4 sm:px-6 py-12 max-w-4xl mx-auto border-t border-[#F0E6D6]">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C1917] font-[family-name:var(--font-heading)]">
              How Dukaan Ready Works
            </h2>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1">
              If you know how to send a WhatsApp message, you can put your business online right now.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="dukaan-card p-6 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FFEDD5] text-[#C2410C] font-black text-2xl flex items-center justify-center mb-4 border border-[#FDBA74]">
                1
              </div>
              <h3 className="font-extrabold text-base text-[#1C1917] mb-2 font-[family-name:var(--font-heading)]">
                Tell Us About Your Shop
              </h3>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Enter your shop name, offerings, timings, and WhatsApp number in English, Hindi, or Marathi.
              </p>
            </div>

            <div className="dukaan-card p-6 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FEF3C7] text-[#D97706] font-black text-2xl flex items-center justify-center mb-4 border border-amber-300">
                2
              </div>
              <h3 className="font-extrabold text-base text-[#1C1917] mb-2 font-[family-name:var(--font-heading)]">
                AI Creates Your Storefront
              </h3>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Our AI writes an authentic tagline, warm customer story, structured service menu, and custom theme.
              </p>
            </div>

            <div className="dukaan-card p-6 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] text-[#15803D] font-black text-2xl flex items-center justify-center mb-4 border border-green-300">
                3
              </div>
              <h3 className="font-extrabold text-base text-[#1C1917] mb-2 font-[family-name:var(--font-heading)]">
                Share Link & Print QR
              </h3>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Receive your permanent storefront URL, stick the QR poster on your shop counter, and get leads!
              </p>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#C2410C] via-[#EA580C] to-[#D97706] text-white text-center shadow-xl shadow-orange-900/20 border border-orange-400/30">
            <h3 className="text-2xl sm:text-4xl font-black mb-2 font-[family-name:var(--font-heading)]">
              Take your business online in 2 minutes.
            </h3>
            <p className="text-orange-100 text-sm sm:text-base max-w-xl mx-auto mb-6">
              AI-powered digital storefronts for India&apos;s micro-businesses. No coding. No designer. No technical skills required.
            </p>
            <Link
              href="/create"
              className="tap-target inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#C2410C] hover:bg-orange-50 font-extrabold text-base rounded-2xl shadow-md transition-all active:scale-98"
            >
              <span>Create My Storefront Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#F0E6D6] bg-white py-8 px-4 text-center text-xs text-[#78716C]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-[#1C1917]">
            <Store className="w-4 h-4 text-[#C2410C]" />
            <span>Dukaan Ready — Digital India Micro-Business Storefronts</span>
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <Link href="/create" className="hover:text-[#C2410C]">Create Store</Link>
            <Link href="/my-storefronts" className="hover:text-[#C2410C]">Find By Phone</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
