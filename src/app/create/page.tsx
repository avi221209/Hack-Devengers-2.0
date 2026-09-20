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
  Tag,
  Languages,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Store,
  Scissors,
  GraduationCap,
  Utensils,
  Wrench,
  Stethoscope,
  Eye,
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

export default function CreateStorefrontPage() {
  const router = useRouter();

  // Language state
  const [lang, setLang] = useState<SupportedLanguage>("en");
  const t = translations[lang];

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

  // Step 1 Validation
  const validateStep1 = () => {
    if (!name.trim()) {
      setFieldErrors({ name: "Please enter your business name." });
      return false;
    }
    setFieldErrors({});
    return true;
  };

  // Step 2 Validation
  const validateStep2 = () => {
    if (customServices.length === 0 && !servicesText.trim()) {
      setFieldErrors({ services: "Please add at least one service or product offering." });
      return false;
    }
    setFieldErrors({});
    return true;
  };

  // Step 3 Validation
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

    // Full validation check
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

      // Confetti celebration
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      // Save created store slug into client localStorage for offline quick lookup
      try {
        const stored = JSON.parse(localStorage.getItem("my_dukaans") || "[]");
        if (!stored.includes(result.business.slug)) {
          stored.unshift(result.business.slug);
          localStorage.setItem("my_dukaans", JSON.stringify(stored));
        }
      } catch {
        // Safe ignore
      }

      // Redirect to newly generated storefront
      router.push(result.redirectUrl || `/store/${result.business.slug}`);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsSubmitting(false);
      setErrorMsg(err.message || "Something went wrong. Please check details and try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF6]">
      <DevFallbackBanner />
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 sm:py-10">
        {/* Top header navigation & Language bar */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Link
            href="/"
            className="tap-target px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5EEDD] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.common.back}</span>
          </Link>

          {/* Language Toggle */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#E8DECB] shadow-2xs">
            <Languages className="w-3.5 h-3.5 text-[#C2410C] ml-2 mr-1" />
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`tap-target px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                lang === "en" ? "bg-[#C2410C] text-white shadow-2xs" : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang("hi")}
              className={`tap-target px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                lang === "hi" ? "bg-[#C2410C] text-white shadow-2xs" : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              हिन्दी
            </button>
            <button
              type="button"
              onClick={() => setLang("mr")}
              className={`tap-target px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                lang === "mr" ? "bg-[#C2410C] text-white shadow-2xs" : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              मराठी
            </button>
          </div>
        </div>

        {/* Wizard Container */}
        <div className="dukaan-card-elevated p-5 sm:p-8 relative overflow-hidden">
          {/* Header */}
          <div className="border-b border-[#F0E6D6] pb-5 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFEDD5] text-[#C2410C] text-xs font-extrabold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.tagline}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight font-[family-name:var(--font-heading)]">
              {t.formTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1">
              {t.formSubtitle}
            </p>
          </div>

          {/* Wizard Progress Steps */}
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
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-200">
                <div>
                  <h2 className="text-base font-extrabold text-[#1C1917] mb-1">
                    Step 1: Tell us about your business
                  </h2>
                  <p className="text-xs text-[#78716C]">
                    Enter your shop name and select your primary industry category.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1C1917] mb-1.5">
                    {t.labels.businessName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.labels.businessNamePlaceholder}
                    className="w-full tap-target px-4 py-3 text-sm sm:text-base rounded-xl border border-[#D6C7B2] bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C]"
                  />
                  {fieldErrors.name && (
                    <p className="text-xs text-red-600 mt-1 font-semibold">{fieldErrors.name}</p>
                  )}
                  <p className="text-[11px] text-[#78716C] mt-1 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3" />
                    <span>{t.labels.businessNameHelp}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1C1917] mb-1.5">
                    {t.labels.category} <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CATEGORIES.map((cat) => {
                      const catData = t.categories[cat];
                      const isSelected = category === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`tap-target p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                            isSelected
                              ? "border-[#C2410C] bg-[#FFF7ED] text-[#C2410C] font-extrabold shadow-2xs"
                              : "border-[#E8DECB] bg-white text-[#57534E] hover:bg-[#F5EEDD] font-medium"
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
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-200">
                <div>
                  <h2 className="text-base font-extrabold text-[#1C1917] mb-1">
                    Step 2: What services or products do you offer?
                  </h2>
                  <p className="text-xs text-[#78716C]">
                    Add items dynamically with optional prices. Your customers can inquire about any specific service directly on WhatsApp!
                  </p>
                </div>

                <ServiceInputList
                  services={customServices}
                  onChange={(items) => setCustomServices(items)}
                  categorySuggestions={t.categories[category]?.suggestions || []}
                />

                {fieldErrors.services && (
                  <p className="text-xs text-red-600 font-semibold">{fieldErrors.services}</p>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#1C1917] mb-1">
                    Overall Price Range (Optional)
                  </label>
                  <input
                    type="text"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    placeholder="e.g. ₹120 – ₹2,500 or ₹1,500 / month"
                    className="w-full tap-target px-4 py-2.5 text-sm rounded-xl border border-[#D6C7B2] bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C]"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT & LOCATION */}
            {step === 3 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-200">
                <div>
                  <h2 className="text-base font-extrabold text-[#1C1917] mb-1">
                    Step 3: Contact & Location details
                  </h2>
                  <p className="text-xs text-[#78716C]">
                    Customers will message your WhatsApp number and get Google Maps directions to this shop address.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1C1917] mb-1.5">
                    WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center rounded-xl border border-[#D6C7B2] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#C2410C]">
                    <div className="px-3.5 py-3 bg-[#F5EEDD] border-r border-[#D6C7B2] text-xs sm:text-sm font-bold text-[#44403C] flex items-center gap-1.5 shrink-0">
                      <span className="text-base">🇮🇳</span>
                      <span>+91</span>
                    </div>
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={handlePhoneChange}
                      placeholder="e.g. 9822012345"
                      className="w-full tap-target px-4 py-3 text-sm sm:text-base outline-none bg-transparent font-medium"
                    />
                    <div className="pr-3 text-[#25D366]">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                  </div>
                  {fieldErrors.whatsapp && (
                    <p className="text-xs text-red-600 mt-1 font-semibold">{fieldErrors.whatsapp}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1C1917] mb-1.5">
                    Shop Address / Landmark <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Shop No. 7, Near Ganpati Chowk, Kothrud"
                      className="w-full tap-target px-4 py-3 pl-10 text-sm sm:text-base rounded-xl border border-[#D6C7B2] bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C]"
                    />
                    <MapPin className="w-5 h-5 text-[#C2410C] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {fieldErrors.address && (
                    <p className="text-xs text-red-600 mt-1 font-semibold">{fieldErrors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Pune or Mumbai"
                      className="w-full tap-target px-3.5 py-2.5 text-sm rounded-xl border border-[#D6C7B2] bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1C1917] mb-1">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="e.g. Maharashtra"
                      className="w-full tap-target px-3.5 py-2.5 text-sm rounded-xl border border-[#D6C7B2] bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: BUSINESS HOURS */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-200">
                <div>
                  <h2 className="text-base font-extrabold text-[#1C1917] mb-1">
                    Step 4: Business Hours
                  </h2>
                  <p className="text-xs text-[#78716C]">
                    Specify when your shop is open for customers.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1C1917] mb-1.5">
                    Shop Timings & Weekly Schedule
                  </label>
                  <input
                    type="text"
                    required
                    value={timings}
                    onChange={(e) => setTimings(e.target.value)}
                    placeholder="e.g. 10:00 AM – 8:30 PM (Mon-Sat)"
                    className="w-full tap-target px-4 py-3 text-sm sm:text-base rounded-xl border border-[#D6C7B2] bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C]"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {Object.entries(t.labels.timingPresets).map(([key, val]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTimings(val)}
                        className="tap-target px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#E8DECB] hover:bg-[#F5EEDD] text-[#57534E] flex items-center gap-1 transition-colors"
                      >
                        <Clock className="w-3 h-3 text-[#C2410C]" />
                        <span>{val}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: BRANDING & THEME */}
            {step === 5 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-200">
                <div>
                  <h2 className="text-base font-extrabold text-[#1C1917] mb-1">
                    Step 5: Visual Theme & Owner Story
                  </h2>
                  <p className="text-xs text-[#78716C]">
                    Choose a color theme for your storefront and add optional notes about your experience.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#1C1917] mb-2">
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
                    className="w-full p-4 text-sm rounded-xl border border-[#D6C7B2] bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C] resize-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 6: PREVIEW & PUBLISH */}
            {step === 6 && (
              <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-200">
                <div>
                  <h2 className="text-base font-extrabold text-[#1C1917] mb-1 flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-[#C2410C]" />
                    <span>Step 6: Preview & Publish Storefront</span>
                  </h2>
                  <p className="text-xs text-[#78716C]">
                    Review your details before AI crafts your official digital storefront.
                  </p>
                </div>

                {/* Live Card Summary */}
                <div className="dukaan-card p-5 border-2 border-[#C2410C] bg-[#FFF7ED] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FFEDD5] text-[#C2410C]">
                      {category}
                    </span>
                    <span className="text-xs font-semibold text-[#15803D]">Theme: {themeColor}</span>
                  </div>

                  <h3 className="text-xl font-black text-[#1C1917]">{name || "Your Business Name"}</h3>

                  <div className="text-xs text-[#57534E] space-y-1">
                    <p>📍 {address} {city ? `, ${city}` : ""}</p>
                    <p>💬 WhatsApp: +91 {whatsapp || "98XXXXXXXX"}</p>
                    <p>⏰ {timings}</p>
                  </div>

                  {customServices.length > 0 && (
                    <div className="pt-2 border-t border-[#F0E6D6]">
                      <span className="text-xs font-bold text-[#1C1917] block mb-1">Services ({customServices.length}):</span>
                      <div className="flex flex-wrap gap-1">
                        {customServices.map((s, i) => (
                          <span key={i} className="text-[11px] px-2 py-0.5 rounded bg-white border border-[#E8DECB] text-[#44403C]">
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
                    className={`tap-target w-full py-4 px-6 rounded-2xl text-white font-extrabold text-base sm:text-lg shadow-lg shadow-orange-900/20 transition-all flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? "bg-[#A8A29E] cursor-not-allowed"
                        : "bg-[#C2410C] hover:bg-[#9A3412] active:scale-98"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
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
                        <Sparkles className="w-5 h-5" />
                        <span>Create My Storefront Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Bar (Next / Prev) */}
            <div className="flex items-center justify-between gap-3 pt-6 border-t border-[#F0E6D6] mt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                  className="tap-target px-4 py-2.5 rounded-xl border border-[#D6C7B2] bg-white text-xs sm:text-sm font-bold text-[#1C1917] hover:bg-[#F5EEDD] transition-colors"
                >
                  Previous Step
                </button>
              ) : <div />}

              {step < 6 && (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="tap-target px-6 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs sm:text-sm font-extrabold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
