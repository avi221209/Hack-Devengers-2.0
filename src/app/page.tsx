"use client";

import React, { useState } from "react";
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
  Search,
  Scissors,
  GraduationCap,
  Utensils,
  Wrench,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { DevFallbackBanner } from "@/components/shared/DevFallbackBanner";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"garage" | "tailor" | "coaching" | "tiffin">("garage");

  const previewCards = {
    garage: {
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
    },
    tailor: {
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
    },
    coaching: {
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
      color: "#D97706",
      bgColor: "#FEF3C7",
    },
    tiffin: {
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
    },
  };

  const currentPreview = previewCards[activeTab];

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF6]">
      <DevFallbackBanner />
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative pt-8 pb-16 px-4 sm:px-6 overflow-hidden">
          {/* Subtle Decorative Background Blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-[#FFEDD5]/60 to-transparent blur-3xl -z-10 pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFEDD5] border border-[#FDBA74]/50 text-[#C2410C] text-xs sm:text-sm font-extrabold shadow-2xs mb-6">
              <Sparkles className="w-4 h-4 text-[#EA580C]" />
              <span>⚡ 2 Minutes • 100% Free • No Coding or Designer Needed</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1C1917] tracking-tight leading-[1.15] mb-5 font-[family-name:var(--font-heading)]">
              Take Your Business Online in{" "}
              <span className="text-[#C2410C] underline decoration-[#FDBA74] decoration-wavy decoration-2">
                2 Minutes
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-[#57534E] max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
              Create a professional digital storefront for your local business — no coding, no designer, no technical knowledge required.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto mb-10">
              <Link
                href="/create"
                className="tap-target w-full sm:w-auto px-8 py-4 bg-[#C2410C] hover:bg-[#9A3412] active:scale-98 text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-lg shadow-orange-900/20 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Create My Storefront</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={`/store/${currentPreview.slug}`}
                className="tap-target w-full sm:w-auto px-6 py-4 bg-white hover:bg-[#F5EEDD] border border-[#D6C7B2] active:scale-98 text-[#1C1917] font-bold text-sm sm:text-base rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4 text-[#78716C]" />
                <span>See Live Demo</span>
              </Link>
            </div>

            {/* Mini Trust Points */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-[#78716C]">
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

        {/* Live Interactive Preview Section */}
        <section className="px-4 sm:px-6 py-8 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">
              Real Micro-Business Examples
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C1917] mt-1 font-[family-name:var(--font-heading)]">
              Interactive Storefront Preview
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab("garage")}
              className={`tap-target px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === "garage"
                  ? "bg-[#D97706] text-white shadow-xs"
                  : "bg-white text-[#57534E] border border-[#E8DECB] hover:bg-[#F5EEDD]"
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Auto Garage (गॅरेज)</span>
            </button>

            <button
              onClick={() => setActiveTab("tailor")}
              className={`tap-target px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === "tailor"
                  ? "bg-[#C2410C] text-white shadow-xs"
                  : "bg-white text-[#57534E] border border-[#E8DECB] hover:bg-[#F5EEDD]"
              }`}
            >
              <Scissors className="w-4 h-4" />
              <span>Tailoring (दर्जी / शिंपी)</span>
            </button>

            <button
              onClick={() => setActiveTab("coaching")}
              className={`tap-target px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === "coaching"
                  ? "bg-[#C2410C] text-white shadow-xs"
                  : "bg-white text-[#57534E] border border-[#E8DECB] hover:bg-[#F5EEDD]"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Tuition (ट्यूशन / क्लासेस)</span>
            </button>

            <button
              onClick={() => setActiveTab("tiffin")}
              className={`tap-target px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 shrink-0 ${
                activeTab === "tiffin"
                  ? "bg-[#15803D] text-white shadow-xs"
                  : "bg-white text-[#57534E] border border-[#E8DECB] hover:bg-[#F5EEDD]"
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>Home Food (घरगुती जेवण)</span>
            </button>
          </div>

          {/* Interactive Card Preview */}
          <div className="dukaan-card-elevated border-t-4 border-[#C2410C] p-5 sm:p-7 max-w-xl mx-auto relative overflow-hidden">
            {/* Header Badge */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#FFEDD5] text-[#C2410C]">
                {React.createElement(currentPreview.icon, { className: "w-3.5 h-3.5" })}
                <span>{currentPreview.category}</span>
              </span>

              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F0FDF4] text-[#15803D] border border-green-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-ping" />
                Open Now
              </span>
            </div>

            {/* Business Title & Tagline */}
            <h3 className="text-xl sm:text-2xl font-black text-[#1C1917] tracking-tight font-[family-name:var(--font-heading)]">
              {currentPreview.name}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[#C2410C] mt-1 italic">
              &ldquo;{currentPreview.tagline}&rdquo;
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-1.5 my-4">
              {currentPreview.chips.map((chip, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#F5EEDD] text-[#57534E] font-medium text-xs"
                >
                  ✓ {chip}
                </span>
              ))}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#F0E6D6] text-xs text-[#57534E] my-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C2410C] shrink-0" />
                <span>{currentPreview.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C2410C] shrink-0" />
                <span className="truncate">{currentPreview.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 mt-4">
              <Link
                href={`/store/${currentPreview.slug}`}
                className="tap-target py-2.5 px-3 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </Link>
              <Link
                href={`/store/${currentPreview.slug}`}
                className="tap-target py-2.5 px-3 rounded-xl bg-[#F5EEDD] text-[#1C1917] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-[#E8DECB]"
              >
                <QrCode className="w-4 h-4" />
                <span>View Full Store</span>
              </Link>
            </div>

            {/* Quote badge */}
            <div className="mt-4 p-3 rounded-xl bg-[#FCFAF6] border border-[#F0E6D6] text-xs text-[#57534E]">
              <p className="italic">&ldquo;{currentPreview.quote}&rdquo;</p>
              <p className="font-bold text-[#1C1917] mt-1 text-[11px]">— {currentPreview.author}</p>
            </div>
          </div>
        </section>

        {/* 3-Step Simple Process Section */}
        <section className="px-4 sm:px-6 py-12 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1C1917] font-[family-name:var(--font-heading)]">
              How Dukaan Ready Works
            </h2>
            <p className="text-sm text-[#78716C] mt-1">
              If you know how to send a WhatsApp message, you can put your business online right now.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="dukaan-card p-6 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FFEDD5] text-[#C2410C] font-black text-2xl flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="font-bold text-lg text-[#1C1917] mb-2">Tell Us About Your Shop</h3>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Enter your shop name, offerings, timings, and WhatsApp number in English, Hindi, or Marathi.
              </p>
            </div>

            <div className="dukaan-card p-6 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#FEF3C7] text-[#D97706] font-black text-2xl flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="font-bold text-lg text-[#1C1917] mb-2">AI Creates Your Storefront</h3>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Our AI writes an authentic tagline, warm customer story, structured service menu, and custom theme.
              </p>
            </div>

            <div className="dukaan-card p-6 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] text-[#15803D] font-black text-2xl flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="font-bold text-lg text-[#1C1917] mb-2">Share Link & Print QR</h3>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Receive your permanent storefront URL, stick the QR poster on your shop counter, and get leads!
              </p>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#C2410C] to-[#EA580C] text-white text-center shadow-xl shadow-orange-900/15">
            <h3 className="text-2xl sm:text-3xl font-black mb-2 font-[family-name:var(--font-heading)]">
              Take your business online in 2 minutes.
            </h3>
            <p className="text-orange-100 text-sm sm:text-base max-w-xl mx-auto mb-6">
              AI-powered digital storefronts for India&apos;s micro-businesses. No coding. No designer. No technical skills required.
            </p>
            <Link
              href="/create"
              className="tap-target inline-flex items-center gap-2 px-8 py-4 bg-white text-[#C2410C] hover:bg-orange-50 font-extrabold text-base rounded-2xl shadow-md transition-all active:scale-98"
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
          <div className="flex items-center gap-4 font-medium">
            <Link href="/create" className="hover:text-[#C2410C]">Create Store</Link>
            <Link href="/my-storefronts" className="hover:text-[#C2410C]">Find By Phone</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
