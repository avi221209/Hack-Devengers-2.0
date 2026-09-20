"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Clock,
  MapPin,
  MessageCircle,
  HelpCircle,
  Languages,
  Loader2,
  AlertCircle,
  Store,
  CheckCircle2,
  Eye,
  Smartphone,
  PhoneCall,
  QrCode,
  Tag,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CategoryIcon } from "@/components/CategoryIcon";
import { DevFallbackBanner } from "@/components/shared/DevFallbackBanner";
import { WizardSteps } from "@/components/creation/WizardSteps";
import { ServiceInputList } from "@/components/creation/ServiceInputList";
import { ThemePicker } from "@/components/creation/ThemePicker";
import { BusinessCategory, ServiceItem, SupportedLanguage, ThemeColor } from "@/lib/types";
import { translations } from "@/lib/translations";
import { normalizeIndianPhone, validateBusinessInput } from "@/lib/validation";

const CATEGORIES: BusinessCategory[] = [
  "Tailoring",
  "Tuition/Education",
  "Clinic/Healthcare",
  "Mechanic/Repair",
  "Food/Catering",
  "Salon/Beauty",
  "Other",
];

const THEME_ACCENTS: Record<ThemeColor, { bg: string; text: string; border: string; lightBg: string }> = {
  terracotta: { bg: "bg-[#C2410C]", text: "text-[#C2410C]", border: "border-[#C2410C]", lightBg: "bg-[#FFF7ED]" },
  mustard: { bg: "bg-[#D97706]", text: "text-[#D97706]", border: "border-[#D97706]", lightBg: "bg-[#FEF3C7]" },
  forest: { bg: "bg-[#15803D]", text: "text-[#15803D]", border: "border-[#15803D]", lightBg: "bg-[#F0FDF4]" },
  clean: { bg: "bg-[#4F46E5]", text: "text-[#4F46E5]", border: "border-[#4F46E5]", lightBg: "bg-[#EEF2FF]" },
  warm: { bg: "bg-[#DB2777]", text: "text-[#DB2777]", border: "border-[#DB2777]", lightBg: "bg-[#FDF2F8]" },
};

export default function CreateStorefrontPage() {
  const router = useRouter();

  // Language state
  const [lang, setLang] = useState<SupportedLanguage>("en");
  const t = translations[lang];

  // Mobile View Switch: "form" vs "preview"
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");

  // Wizard Step (1 to 6)
  const [step, setStep] = useState<number>(1);

  // Form State
  const [name, setName] = useState("");
  const [category, setCategory] = useState<BusinessCategory>("Tailoring");
  const [customServices, setCustomServices] = useState<ServiceItem[]>([]);
  const [servicesText, setServicesText] = useState("");
  const [timings, setTimings] = useState("10:00 AM – 8:30 PM (Mon-Sat)");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [description, setDescription] = useState("");
  const [themeColor, setThemeColor] = useState<ThemeColor>("terracotta");

  // Loading & error states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
    setWhatsapp(cleaned);
  };

  // Step Validation
  const validateStep1 = () => {
    if (!name.trim()) {
      setFieldErrors({ name: "Please enter your business name." });
      return false;
    }
    setFieldErrors({});
    return true;
  };

  const validateStep2 = () => {
    if (customServices.length === 0 && !servicesText.trim()) {
      setFieldErrors({ services: "Please add at least one service or product offering." });
      return false;
    }
    setFieldErrors({});
    return true;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!address.trim()) errs.address = "Please enter your shop location/address.";
    if (!whatsapp.trim() || !normalizeIndianPhone(whatsapp)) {
      errs.whatsapp = "Please enter a valid 10-digit Indian WhatsApp number.";
    }
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return false;
    }
    setFieldErrors({});
    return true;
  };

  const handleNextStep = () => {
    setErrorMsg("");
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    setStep((prev) => Math.min(prev + 1, 6));
  };

  const handlePrevStep = () => {
    setErrorMsg("");
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const combinedServices = customServices.length > 0
      ? customServices.map((s) => s.name).join(", ")
      : servicesText;

    const validation = validateBusinessInput({
      name,
      category,
      services: combinedServices,
      address,
      whatsapp_number: whatsapp,
    });

    if (!validation.isValid) {
      setErrorMsg(Object.values(validation.errors)[0]);
      return;
    }

    setIsSubmitting(true);
    setSubmitStep(1);

    const stepInterval = setInterval(() => {
      setSubmitStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 850);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          category,
          services: combinedServices,
          custom_services: customServices,
          timings,
          address,
          city,
          state,
          whatsapp_number: whatsapp,
          price_range: priceRange,
          raw_description: description,
          theme_color: themeColor,
          language: lang,
        }),
      });

      clearInterval(stepInterval);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate storefront");
      }

      const result = await response.json();

      // Confetti celebration micro-interaction
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.6 },
      });

      try {
        const stored = JSON.parse(localStorage.getItem("my_dukaans") || "[]");
        if (!stored.includes(result.business.slug)) {
          stored.unshift(result.business.slug);
          localStorage.setItem("my_dukaans", JSON.stringify(stored));
        }
      } catch {
        // Safe ignore
      }

      router.push(result.redirectUrl || `/store/${result.business.slug}`);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsSubmitting(false);
      setErrorMsg(err.message || "Something went wrong. Please check details and try again.");
    }
  };

  const activeThemeAccent = THEME_ACCENTS[themeColor] || THEME_ACCENTS.terracotta;

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF6] bg-bazaar-pattern">
      <DevFallbackBanner />
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 sm:py-8">
        {/* Top Navigation & Persistent Language Selector Pill */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 bg-white p-3 rounded-2xl border border-[#F0E6D6] shadow-2xs">
          <Link
            href="/"
            className="tap-target px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5EEDD] transition-colors flex items-center gap-1.5 shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-[#C2410C]" />
            <span>{t.common.back}</span>
          </Link>

          {/* Persistent Language Selector Pill */}
          <div className="flex items-center gap-1.5 bg-[#FFF7ED] p-1.5 rounded-full border border-[#FDBA74]/50 shadow-2xs">
            <span className="text-xs font-black text-[#C2410C] px-2 flex items-center gap-1">
              <Languages className="w-3.5 h-3.5" />
              <span>Language:</span>
            </span>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`tap-target px-3 py-1 text-xs font-black rounded-full transition-all ${
                lang === "en" ? "bg-[#C2410C] text-white shadow-2xs" : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang("hi")}
              className={`tap-target px-3 py-1 text-xs font-black rounded-full transition-all ${
                lang === "hi" ? "bg-[#C2410C] text-white shadow-2xs" : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setLang("mr")}
              className={`tap-target px-3 py-1 text-xs font-black rounded-full transition-all ${
                lang === "mr" ? "bg-[#C2410C] text-white shadow-2xs" : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              मराठी
            </button>
          </div>
        </div>

        {/* Mobile View Selector Toggle (Form vs Live Preview) */}
        <div className="lg:hidden flex items-center bg-white p-1 rounded-2xl border border-[#E8DECB] mb-6 shadow-2xs">
          <button
            type="button"
            onClick={() => setMobileTab("form")}
            className={`tap-target flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              mobileTab === "form" ? "bg-[#C2410C] text-white shadow-2xs" : "text-[#57534E]"
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Form Wizard</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("preview")}
            className={`tap-target flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              mobileTab === "preview" ? "bg-[#C2410C] text-white shadow-2xs" : "text-[#57534E]"
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Live Storefront Preview</span>
          </button>
        </div>

        {/* Main Side-by-Side Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Intake Form Wizard (lg:col-span-7) */}
          <div className={`lg:col-span-7 ${mobileTab === "preview" ? "hidden lg:block" : "block"}`}>
            <div className="dukaan-card-elevated p-6 sm:p-8 relative overflow-hidden">
              {/* Header */}
              <div className="border-b border-[#F0E6D6] pb-5 mb-6">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFEDD5] text-[#C2410C] text-xs font-extrabold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.tagline}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight font-[family-name:var(--font-heading)]">
                  {t.formTitle}
                </h1>
                <p className="text-xs sm:text-sm text-[#78716C] mt-1 font-medium">
                  {t.formSubtitle}
                </p>
              </div>

              {/* Persistent Wizard Progress Bar Component */}
              <WizardSteps currentStep={step} onStepClick={(s) => setStep(s)} />

              {/* Global Error Banner */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-bold">Notice:</p>
                    <p>{errorMsg}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* STEP 1: BUSINESS BASICS */}
                {step === 1 && (
                  <div className="space-y-6 animate-slide-up">
                    <div>
                      <h2 className="text-lg font-black text-[#1C1917] mb-1 font-[family-name:var(--font-heading)]">
                        Step 1: Tell us about your business
                      </h2>
                      <p className="text-xs sm:text-sm text-[#78716C]">
                        Enter your official shop name and select your industry category.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#1C1917] mb-2">
                        {t.labels.businessName} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t.labels.businessNamePlaceholder}
                        className="w-full tap-target px-4 py-3.5 text-base rounded-xl border border-[#D6C7B2] bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C] font-semibold"
                      />
                      {fieldErrors.name && (
                        <p className="text-xs text-red-600 mt-1.5 font-bold">{fieldErrors.name}</p>
                      )}
                      <p className="text-xs text-[#78716C] mt-1.5 flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5 text-[#C2410C]" />
                        <span>{t.labels.businessNameHelp}</span>
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#1C1917] mb-2">
                        {t.labels.category} <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {CATEGORIES.map((cat) => {
                          const catData = t.categories[cat];
                          const isSelected = category === cat;
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setCategory(cat)}
                              className={`tap-target p-3.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                                isSelected
                                  ? "border-[#C2410C] bg-[#FFF7ED] text-[#C2410C] font-black shadow-xs"
                                  : "border-[#E8DECB] bg-white text-[#57534E] hover:bg-[#F5EEDD] font-bold"
                              }`}
                            >
                              <CategoryIcon
                                category={cat}
                                className={`w-4 h-4 shrink-0 ${isSelected ? "text-[#C2410C]" : "text-[#78716C]"}`}
                              />
                              <span className="text-xs sm:text-sm truncate">
                                {catData?.label || cat}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: WHAT YOU OFFER */}
                {step === 2 && (
                  <div className="space-y-6 animate-slide-up">
                    <div>
                      <h2 className="text-lg font-black text-[#1C1917] mb-1 font-[family-name:var(--font-heading)]">
                        Step 2: What services or products do you offer?
                      </h2>
                      <p className="text-xs sm:text-sm text-[#78716C]">
                        Add items dynamically with prices. Customers will inquire directly on WhatsApp!
                      </p>
                    </div>

                    <ServiceInputList
                      services={customServices}
                      onChange={(items) => setCustomServices(items)}
                      categorySuggestions={t.categories[category]?.suggestions || []}
                    />

                    {fieldErrors.services && (
                      <p className="text-xs text-red-600 font-bold">{fieldErrors.services}</p>
                    )}

                    <div>
                      <label className="block text-sm font-bold text-[#1C1917] mb-1.5">
                        Overall Price Range (Optional)
                      </label>
                      <input
                        type="text"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        placeholder="e.g. ₹120 – ₹2,500 or ₹1,500 / month"
                        className="w-full tap-target px-4 py-3 text-sm sm:text-base rounded-xl border border-[#D6C7B2] bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C] font-semibold"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 3: CONTACT & LOCATION */}
                {step === 3 && (
                  <div className="space-y-6 animate-slide-up">
                    <div>
                      <h2 className="text-lg font-black text-[#1C1917] mb-1 font-[family-name:var(--font-heading)]">
                        Step 3: Contact & Location details
                      </h2>
                      <p className="text-xs sm:text-sm text-[#78716C]">
                        Customers will click to message your WhatsApp number and get Google Maps directions.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#1C1917] mb-2">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center rounded-xl border border-[#D6C7B2] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#C2410C]">
                        <div className="px-4 py-3.5 bg-[#F5EEDD] border-r border-[#D6C7B2] text-sm font-black text-[#44403C] flex items-center gap-1.5 shrink-0">
                          <span className="text-base">🇮🇳</span>
                          <span>+91</span>
                        </div>
                        <input
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={handlePhoneChange}
                          placeholder="e.g. 9822012345"
                          className="w-full tap-target px-4 py-3.5 text-base outline-none bg-transparent font-bold"
                        />
                        <div className="pr-4 text-[#25D366]">
                          <MessageCircle className="w-6 h-6 fill-[#25D366]" />
                        </div>
                      </div>
                      {fieldErrors.whatsapp && (
                        <p className="text-xs text-red-600 mt-1.5 font-bold">{fieldErrors.whatsapp}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#1C1917] mb-2">
                        Shop Address / Landmark <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Shop No. 7, Near Ganpati Chowk, Kothrud"
                          className="w-full tap-target px-4 py-3.5 pl-11 text-base rounded-xl border border-[#D6C7B2] bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C] font-semibold"
                        />
                        <MapPin className="w-5 h-5 text-[#C2410C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {fieldErrors.address && (
                        <p className="text-xs text-red-600 mt-1.5 font-bold">{fieldErrors.address}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#1C1917] mb-1">City</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Pune or Mumbai"
                          className="w-full tap-target px-3.5 py-3 text-sm rounded-xl border border-[#D6C7B2] bg-white font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1C1917] mb-1">State</label>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="e.g. Maharashtra"
                          className="w-full tap-target px-3.5 py-3 text-sm rounded-xl border border-[#D6C7B2] bg-white font-semibold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: BUSINESS HOURS */}
                {step === 4 && (
                  <div className="space-y-6 animate-slide-up">
                    <div>
                      <h2 className="text-lg font-black text-[#1C1917] mb-1 font-[family-name:var(--font-heading)]">
                        Step 4: Business Hours
                      </h2>
                      <p className="text-xs sm:text-sm text-[#78716C]">
                        Specify when your shop is open for customers.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#1C1917] mb-2">
                        Shop Timings & Schedule
                      </label>
                      <input
                        type="text"
                        required
                        value={timings}
                        onChange={(e) => setTimings(e.target.value)}
                        placeholder="e.g. 10:00 AM – 8:30 PM (Mon-Sat)"
                        className="w-full tap-target px-4 py-3.5 text-base rounded-xl border border-[#D6C7B2] bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C] font-semibold"
                      />
                      <div className="flex flex-wrap gap-2 mt-3">
                        {Object.entries(t.labels.timingPresets).map(([key, val]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setTimings(val)}
                            className="tap-target px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-[#E8DECB] hover:bg-[#F5EEDD] text-[#57534E] flex items-center gap-1.5 transition-colors"
                          >
                            <Clock className="w-3.5 h-3.5 text-[#C2410C]" />
                            <span>{val}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: BRANDING & THEME */}
                {step === 5 && (
                  <div className="space-y-6 animate-slide-up">
                    <div>
                      <h2 className="text-lg font-black text-[#1C1917] mb-1 font-[family-name:var(--font-heading)]">
                        Step 5: Visual Theme & Owner Story
                      </h2>
                      <p className="text-xs sm:text-sm text-[#78716C]">
                        Choose a color theme and share optional notes about your experience.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm sm:text-base font-bold text-[#1C1917] mb-2">
                        Select Visual Storefront Theme
                      </label>
                      <ThemePicker
                        selectedTheme={themeColor}
                        onChange={(thm) => setThemeColor(thm)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#1C1917] mb-1.5">
                        Owner Notes / Customer Promise (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Over 15 years experience in custom ladies ethnic wear. Known for fast delivery."
                        className="w-full p-4 text-sm rounded-xl border border-[#D6C7B2] bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C] resize-none font-medium"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 6: PREVIEW & PUBLISH */}
                {step === 6 && (
                  <div className="space-y-6 animate-slide-up">
                    <div>
                      <h2 className="text-lg font-black text-[#1C1917] mb-1 flex items-center gap-2 font-[family-name:var(--font-heading)]">
                        <Eye className="w-5 h-5 text-[#C2410C]" />
                        <span>Step 6: Preview & Publish Storefront</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-[#78716C]">
                        Review your details before AI crafts your official digital storefront.
                      </p>
                    </div>

                    {/* Final Confirmation Banner */}
                    <div className="dukaan-card p-5 border-2 border-[#C2410C] bg-[#FFF7ED] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#FFEDD5] text-[#C2410C]">
                          {category}
                        </span>
                        <span className="text-xs font-bold text-[#15803D]">Theme: {themeColor}</span>
                      </div>

                      <h3 className="text-2xl font-black text-[#1C1917]">{name || "Your Business Name"}</h3>

                      <div className="text-xs text-[#57534E] space-y-1 font-medium">
                        <p>📍 {address} {city ? `, ${city}` : ""}</p>
                        <p>💬 WhatsApp: +91 {whatsapp || "98XXXXXXXX"}</p>
                        <p>⏰ {timings}</p>
                      </div>

                      {customServices.length > 0 && (
                        <div className="pt-2 border-t border-[#F0E6D6]">
                          <span className="text-xs font-bold text-[#1C1917] block mb-1">Services ({customServices.length}):</span>
                          <div className="flex flex-wrap gap-1.5">
                            {customServices.map((s, i) => (
                              <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-white border border-[#E8DECB] text-[#44403C] font-semibold">
                                ✓ {s.name} {s.price ? `(${s.price})` : ""}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`tap-target w-full py-4.5 px-6 rounded-2xl text-white font-black text-base sm:text-lg shadow-xl shadow-orange-900/25 transition-all flex items-center justify-center gap-2.5 ${
                          isSubmitting
                            ? "bg-[#A8A29E] cursor-not-allowed"
                            : "bg-gradient-to-r from-[#C2410C] to-[#EA580C] hover:from-[#9A3412] hover:to-[#C2410C] active:scale-98"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin text-white" />
                            <span>
                              {submitStep === 1
                                ? "Connecting to AI Provider Engine..."
                                : submitStep === 2
                                ? "Structuring Services & Copy..."
                                : "Publishing Your Digital Dukaan..."}
                            </span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 text-amber-200" />
                            <span>Create My Storefront Now</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons (Next / Prev) */}
                <div className="flex items-center justify-between gap-3 pt-6 border-t border-[#F0E6D6] mt-6">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={isSubmitting}
                      className="tap-target px-5 py-3 rounded-xl border border-[#D6C7B2] bg-white text-xs sm:text-sm font-bold text-[#1C1917] hover:bg-[#F5EEDD] transition-colors"
                    >
                      Previous Step
                    </button>
                  ) : <div />}

                  {step < 6 && (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="tap-target px-7 py-3 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-xs transition-colors"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Live-Updating Mini Storefront Preview Panel (lg:col-span-5) */}
          <div className={`lg:col-span-5 ${mobileTab === "form" ? "hidden lg:block" : "block"} sticky top-20`}>
            <div className="dukaan-card-elevated p-5 sm:p-6 bg-white relative border-t-8 transition-all duration-200 shadow-xl" style={{ borderTopColor: activeThemeAccent.bg.replace("bg-[", "").replace("]", "") }}>
              {/* Preview Header Badge */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#F0E6D6]">
                <span className="text-xs font-black text-[#C2410C] flex items-center gap-1.5 uppercase tracking-wider">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Storefront Preview</span>
                </span>
                <span className="text-[10px] font-bold text-[#15803D] bg-[#F0FDF4] px-2 py-0.5 rounded-full border border-green-200">
                  Updates in Real Time
                </span>
              </div>

              {/* Dynamic Live Mock Storefront Card */}
              <div className="space-y-3.5">
                {/* Category & Status Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${activeThemeAccent.lightBg} ${activeThemeAccent.text}`}>
                    <CategoryIcon category={category} className="w-3 h-3" />
                    <span>{category}</span>
                  </span>
                  <span className="text-[10px] font-semibold text-[#15803D] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-ping" />
                    Verified Storefront
                  </span>
                </div>

                {/* Live Business Name */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#1C1917] leading-tight font-[family-name:var(--font-heading)]">
                    {name.trim() || "Your Shop Name"}
                  </h3>
                  <p className={`text-xs font-semibold mt-1 italic ${activeThemeAccent.text}`}>
                    &ldquo;{category} Services & Local Expertise&rdquo;
                  </p>
                </div>

                {/* Services Live Counter */}
                <div className="p-3 rounded-xl bg-[#FCFAF6] border border-[#E8DECB] space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#1C1917]">
                    <span>Services Catalog</span>
                    <span className="text-[10px] text-[#78716C]">{customServices.length} items added</span>
                  </div>

                  {customServices.length > 0 ? (
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {customServices.slice(0, 4).map((srv, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs p-1.5 bg-white rounded-lg border border-[#F0E6D6]">
                          <span className="font-semibold text-[#1C1917] truncate">{srv.name}</span>
                          {srv.price && (
                            <span className="text-[10px] font-bold text-[#D97706] bg-[#FEF3C7] px-1.5 py-0.5 rounded">
                              {srv.price}
                            </span>
                          )}
                        </div>
                      ))}
                      {customServices.length > 4 && (
                        <p className="text-[10px] text-[#78716C] text-center font-medium">+ {customServices.length - 4} more items</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-[#A8A29E] italic text-center py-2">
                      Start typing your services to see them appear here live...
                    </p>
                  )}
                </div>

                {/* Contact & Location Details */}
                <div className="space-y-2 text-xs text-[#57534E]">
                  <div className="flex items-center gap-2 font-medium">
                    <MapPin className="w-4 h-4 text-[#C2410C] shrink-0" />
                    <span className="truncate">{address.trim() || "Shop Address & Landmark"} {city ? `, ${city}` : ""}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Clock className="w-4 h-4 text-[#C2410C] shrink-0" />
                    <span>{timings || "Shop Timings"}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                    <span>WhatsApp: +91 {whatsapp || "98XXXXXXXX"}</span>
                  </div>
                </div>

                {/* Mock CTA Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F0E6D6]">
                  <div className="py-2.5 px-3 rounded-xl bg-[#25D366] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-2xs opacity-90">
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Chat WhatsApp</span>
                  </div>
                  <div className="py-2.5 px-3 rounded-xl bg-[#F5EEDD] text-[#1C1917] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#D6C7B2] opacity-90">
                    <QrCode className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span>Print QR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
