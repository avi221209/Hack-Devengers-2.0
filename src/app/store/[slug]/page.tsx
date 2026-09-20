"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Store,
  MessageCircle,
  PhoneCall,
  MapPin,
  Clock,
  Share2,
  QrCode,
  CheckCircle2,
  Tag,
  ArrowLeft,
  Navigation,
  Sparkles,
  AlertTriangle,
  Printer,
  ShieldCheck,
  Check,
  Award,
} from "lucide-react";
import { Business, ThemeColor } from "@/lib/types";
import { CategoryIcon } from "@/components/CategoryIcon";
import { QRCodeModal } from "@/components/QRCodeModal";
import { Navbar } from "@/components/Navbar";

const THEME_STYLES: Record<
  ThemeColor,
  { primary: string; border: string; bg: string; text: string; lightBg: string; bannerBg: string }
> = {
  terracotta: {
    primary: "#C2410C",
    border: "border-[#C2410C]",
    bg: "bg-[#C2410C]",
    text: "text-[#C2410C]",
    lightBg: "bg-[#FFF7ED]",
    bannerBg: "from-[#C2410C] via-[#EA580C] to-[#D97706]",
  },
  mustard: {
    primary: "#D97706",
    border: "border-[#D97706]",
    bg: "bg-[#D97706]",
    text: "text-[#D97706]",
    lightBg: "bg-[#FEF3C7]",
    bannerBg: "from-[#D97706] via-[#F59E0B] to-[#EA580C]",
  },
  forest: {
    primary: "#15803D",
    border: "border-[#15803D]",
    bg: "bg-[#15803D]",
    text: "text-[#15803D]",
    lightBg: "bg-[#F0FDF4]",
    bannerBg: "from-[#15803D] via-[#16A34A] to-[#D97706]",
  },
  clean: {
    primary: "#4F46E5",
    border: "border-[#4F46E5]",
    bg: "bg-[#4F46E5]",
    text: "text-[#4F46E5]",
    lightBg: "bg-[#EEF2FF]",
    bannerBg: "from-[#4F46E5] via-[#6366F1] to-[#3B82F6]",
  },
  warm: {
    primary: "#DB2777",
    border: "border-[#DB2777]",
    bg: "bg-[#DB2777]",
    text: "text-[#DB2777]",
    lightBg: "bg-[#FDF2F8]",
    bannerBg: "from-[#DB2777] via-[#EC4899] to-[#EA580C]",
  },
};

export default function StorefrontPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }

    let isMounted = true;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 5000);

    async function fetchStore() {
      if (!slug) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/store/${slug}`, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!res.ok) {
          throw new Error("Storefront not found");
        }
        const data = await res.json();
        if (isMounted) setBusiness(data.business);
      } catch (err: any) {
        clearTimeout(timeoutId);
        if (isMounted) {
          if (err.name === "AbortError") {
            setError("Storefront lookup timed out. Storefront not found.");
          } else {
            setError(err.message || "Failed to load storefront");
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchStore();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [slug]);

  const handleShare = async () => {
    const url = currentUrl || window.location.href;
    const title = business ? `${business.name} — Storefront` : "Dukaan Ready Storefront";
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out ${business?.name || "our storefront"} on Dukaan Ready!`,
          url,
        });
        return;
      } catch {
        // Fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setIsQrOpen(true);
    }
  };

  // Loading State with spinner
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCFAF6] bg-bazaar-pattern">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#FFEDD5] text-[#C2410C] flex items-center justify-center animate-bounce mb-4 border border-[#FDBA74]">
            <Store className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-black text-[#1C1917] font-[family-name:var(--font-heading)]">Opening Digital Dukaan...</h2>
          <p className="text-xs text-[#78716C] mt-1 font-medium">Connecting to your digital storefront</p>
        </div>
      </div>
    );
  }

  // Error & Store Not Found Fallback (Prevent Infinite Loading Spinner)
  if (error || !business) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCFAF6] bg-bazaar-pattern">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 border border-amber-300">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-[#1C1917] font-[family-name:var(--font-heading)]">Storefront Not Found</h2>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1 mb-6 leading-relaxed font-medium">
            The storefront link you requested is unavailable or has not been created yet. You can create your own digital dukaan in 2 minutes!
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="tap-target px-5 py-2.5 bg-white border border-[#D6C7B2] rounded-xl text-xs sm:text-sm font-bold text-[#1C1917] hover:bg-[#F5EEDD]"
            >
              Go to Home
            </Link>
            <Link
              href="/create"
              className="tap-target px-5 py-2.5 bg-[#C2410C] text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-md hover:bg-[#9A3412]"
            >
              Create Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const activeTheme = THEME_STYLES[business.theme_color || "terracotta"] || THEME_STYLES.terracotta;

  // Phone & Links
  const cleanPhone = business.whatsapp_number.replace(/\D/g, "");
  const defaultWhatsAppMsg = encodeURIComponent(
    `Hello ${business.name}, I saw your storefront on Dukaan Ready and would like to inquire about your services.`
  );
  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${defaultWhatsAppMsg}`;
  const telUrl = `tel:+91${cleanPhone}`;

  // Encoded address for Google Maps embed and directions
  const fullLoc = `${business.address}${business.city ? ", " + business.city : ""}`;
  const encodedAddress = encodeURIComponent(fullLoc);
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const mapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF6] bg-bazaar-pattern pb-28 sm:pb-16 selection:bg-[#FFEDD5] selection:text-[#C2410C]">
      {/* Toast Notification for Link Copy */}
      {copiedLink && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1C1917] text-white px-4 py-2.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
          <span>Storefront link copied to clipboard!</span>
        </div>
      )}

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-30 bg-[#FCFAF6]/90 backdrop-blur-md border-b border-[#F0E6D6]">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="tap-target px-2.5 py-1 text-xs font-bold text-[#57534E] hover:text-[#1C1917] flex items-center gap-1 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 text-[#C2410C]" />
            <span>Dukaan Ready</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="tap-target px-3 py-1.5 rounded-full bg-white border border-[#E8DECB] text-xs font-bold text-[#1C1917] hover:bg-[#F5EEDD] flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Share2 className={`w-3.5 h-3.5 ${activeTheme.text}`} />
              <span>{copiedLink ? "Copied!" : "Share Link"}</span>
            </button>

            <Link
              href={`/store/${business.slug}/poster`}
              className="tap-target px-3.5 py-1.5 rounded-full bg-[#FFEDD5] text-[#C2410C] text-xs font-extrabold hover:bg-[#FED7AA] flex items-center gap-1.5 transition-colors border border-[#FDBA74]/50"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Poster</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pt-4 sm:pt-6 space-y-6">
        {/* 1. PREMIUM HEADER CARD WITH OVERLAPPING BANNER & CATEGORY BADGE */}
        <section className="dukaan-card-elevated overflow-hidden relative animate-slide-up shadow-xl">
          {/* Top Decorative Banner */}
          <div className={`h-24 sm:h-28 bg-gradient-to-r ${activeTheme.bannerBg} relative overflow-hidden p-4 flex items-start justify-between`}>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
            
            {/* Verified Dukaan Badge */}
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-3 py-1 rounded-full bg-white/95 text-[#15803D] shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
              <span>Verified Dukaan</span>
            </span>
          </div>

          {/* Overlapping Content Container */}
          <div className="px-6 pb-6 pt-0 relative">
            {/* Overlapping Category Icon Badge */}
            <div className="-mt-9 mb-4 flex items-center justify-between">
              <div className={`w-18 h-18 rounded-2xl ${activeTheme.lightBg} border-4 border-white ${activeTheme.text} flex items-center justify-center shadow-lg`}>
                <CategoryIcon category={business.category} className="w-9 h-9" />
              </div>
              <span className={`inline-flex items-center gap-1 text-xs font-black px-3 py-1 rounded-full ${activeTheme.lightBg} ${activeTheme.text} border ${activeTheme.border}/30`}>
                <span>{business.category}</span>
              </span>
            </div>

            {/* Business Title in Large Type */}
            <h1 className="text-2xl sm:text-4xl font-black text-[#1C1917] tracking-tight leading-tight font-[family-name:var(--font-heading)]">
              {business.name}
            </h1>

            {/* AI Generated Tagline */}
            <p className={`text-sm sm:text-base font-bold ${activeTheme.text} mt-2 leading-relaxed italic`}>
              &ldquo;{business.generated_tagline}&rdquo;
            </p>

            {/* Rounded Pill Trust Badges */}
            {business.highlight_chips && business.highlight_chips.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#F0E6D6]">
                {business.highlight_chips.map((chip, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-[#FFF7ED] text-[#44403C] font-bold text-xs flex items-center gap-1.5 border border-[#FDBA74]/40 shadow-2xs"
                  >
                    <Sparkles className="w-3 h-3 text-[#D97706]" />
                    <span>{chip}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Primary Call to Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target w-full py-4 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] active:scale-98 text-white font-black text-base flex items-center justify-center gap-2.5 shadow-lg shadow-green-900/20 transition-all border border-green-400/30"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={telUrl}
                className="tap-target w-full py-4 px-4 rounded-2xl bg-white border border-[#D6C7B2] hover:bg-[#F5EEDD] active:scale-98 text-[#1C1917] font-extrabold text-base flex items-center justify-center gap-2 transition-all shadow-2xs"
              >
                <PhoneCall className={`w-4.5 h-4.5 ${activeTheme.text}`} />
                <span>Call +91 {business.whatsapp_number}</span>
              </a>
            </div>
          </div>
        </section>

        {/* 2. ABOUT BUSINESS */}
        <section className="dukaan-card p-6 sm:p-7 animate-slide-up">
          <div className="flex items-center gap-2 mb-3 text-[#1C1917]">
            <Store className={`w-5 h-5 ${activeTheme.text}`} />
            <h2 className="text-lg sm:text-xl font-black font-[family-name:var(--font-heading)]">
              About Our Business
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed font-semibold">
            {business.generated_about}
          </p>

          {business.price_range && (
            <div className="mt-4 pt-3 border-t border-[#F0E6D6] flex items-center gap-2 text-xs font-black text-[#D97706]">
              <Tag className="w-4 h-4" />
              <span>Price Range: {business.price_range}</span>
            </div>
          )}
        </section>

        {/* 3. SERVICES & OFFERINGS CATALOG */}
        <section className="dukaan-card p-6 sm:p-7 animate-slide-up">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2 text-[#1C1917]">
              <CategoryIcon category={business.category} className={`w-5 h-5 ${activeTheme.text}`} />
              <h2 className="text-lg sm:text-xl font-black font-[family-name:var(--font-heading)]">
                Services & Offerings
              </h2>
            </div>
            <span className="text-xs font-bold text-[#78716C] bg-[#FCFAF6] px-2.5 py-1 rounded-full border border-[#E8DECB]">
              {business.services_list?.length || 0} items
            </span>
          </div>

          <div className="space-y-3.5">
            {business.services_list && business.services_list.length > 0 ? (
              business.services_list.map((srv, idx) => {
                const itemMsg = encodeURIComponent(
                  `Hello ${business.name}, I found your storefront on Dukaan Ready and would like to inquire about "${srv.name}".`
                );
                const itemWhatsAppUrl = `https://wa.me/91${cleanPhone}?text=${itemMsg}`;

                return (
                  <div
                    key={srv.id || idx}
                    className="p-4 rounded-2xl bg-white border border-[#E8DECB] hover:border-[#C2410C]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 shadow-2xs"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${activeTheme.bg} shrink-0`} />
                        <h3 className="font-extrabold text-sm sm:text-base text-[#1C1917] truncate">
                          {srv.name}
                        </h3>
                      </div>
                      {srv.description && (
                        <p className="text-xs text-[#57534E] mt-1 pl-4 leading-relaxed font-medium">
                          {srv.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0E6D6]">
                      {srv.price && (
                        <span className="text-xs font-black text-[#D97706] bg-[#FEF3C7] px-2.5 py-1 rounded-lg">
                          {srv.price}
                        </span>
                      )}

                      <a
                        href={itemWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tap-target px-3 py-1.5 text-xs font-black text-[#15803D] bg-[#F0FDF4] hover:bg-green-100 rounded-xl flex items-center gap-1.5 transition-colors border border-green-200"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-[#15803D]" />
                        <span>Inquire</span>
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-[#78716C] font-semibold">{business.services}</p>
            )}
          </div>
        </section>

        {/* 4. SHOP TIMINGS */}
        <section className="dukaan-card p-6 sm:p-7 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-[#1C1917]">
              <Clock className={`w-5 h-5 ${activeTheme.text}`} />
              <h2 className="text-lg sm:text-xl font-black font-[family-name:var(--font-heading)]">
                Shop Timings
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F0FDF4] text-[#15803D] border border-green-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping" />
              Open for Inquiries
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E8DECB] text-xs sm:text-sm font-bold text-[#1C1917]">
            {business.timings}
          </div>
        </section>

        {/* 5. LOCATION & GOOGLE MAPS */}
        <section className="dukaan-card p-6 sm:p-7 animate-slide-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-[#1C1917]">
              <MapPin className={`w-5 h-5 ${activeTheme.text}`} />
              <h2 className="text-lg sm:text-xl font-black font-[family-name:var(--font-heading)]">
                Location & Directions
              </h2>
            </div>

            <a
              href={mapsExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`tap-target px-3 py-1.5 text-xs font-black ${activeTheme.text} flex items-center gap-1.5 bg-[#FFF7ED] rounded-xl border border-[#FDBA74]/40`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>

          <p className="text-xs sm:text-sm text-[#57534E] mb-4 font-semibold">
            {business.address} {business.city ? `, ${business.city}` : ""}
          </p>

          <div className="w-full h-60 rounded-2xl overflow-hidden border border-[#E8DECB] shadow-inner bg-[#EAE5D9]">
            <iframe
              title={`Location map for ${business.name}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapsEmbedUrl}
            />
          </div>
        </section>

        {/* 6. COUNTER POSTER BANNER */}
        <section className="p-6 rounded-3xl bg-[#FFEDD5] border border-[#FDBA74] text-center shadow-md animate-slide-up">
          <h3 className="font-black text-[#1C1917] text-base sm:text-lg font-[family-name:var(--font-heading)]">
            Visiting in person or need our shop counter poster?
          </h3>
          <p className="text-xs text-[#78716C] mt-1 mb-4 font-medium">
            Open or print the A4 poster for counter display.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsQrOpen(true)}
              className={`tap-target inline-flex items-center gap-2 px-5 py-2.5 ${activeTheme.bg} text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md hover:opacity-95 transition-opacity`}
            >
              <QrCode className="w-4 h-4" />
              <span>QR Code</span>
            </button>

            <Link
              href={`/store/${business.slug}/poster`}
              className="tap-target inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-[#D6C7B2] text-[#1C1917] font-extrabold text-xs sm:text-sm rounded-xl hover:bg-[#F5EEDD] transition-colors shadow-2xs"
            >
              <Printer className="w-4 h-4 text-[#C2410C]" />
              <span>A4 Counter Poster</span>
            </Link>
          </div>
        </section>

        {/* Credit */}
        <div className="text-center pt-2 pb-6">
          <Link
            href="/"
            className="text-[11px] font-bold text-[#A8A29E] hover:text-[#C2410C] inline-flex items-center gap-1 transition-colors"
          >
            <span>Powered by</span>
            <span className="font-black text-[#78716C]">Dukaan Ready</span>
            <span>• Create your digital storefront</span>
          </Link>
        </div>
      </main>

      {/* STICKY BOTTOM ACTION CONVERSION BAR (VISUALLY POPPING WITH PULSE ANIMATION) */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t-2 border-[#FDBA74] p-3 sm:p-3.5 shadow-2xl flex items-center gap-3 max-w-lg mx-auto sm:max-w-md rounded-t-2xl">
        <a
          href={telUrl}
          className="tap-target w-12 h-12 rounded-2xl bg-[#FFF7ED] hover:bg-[#FFEDD5] text-[#1C1917] flex items-center justify-center shrink-0 border border-[#FDBA74] transition-colors shadow-2xs"
          aria-label="Call Business"
        >
          <PhoneCall className={`w-5 h-5 ${activeTheme.text}`} />
        </a>

        {/* Primary WhatsApp Button with Pulse Animation */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target flex-1 h-12 rounded-2xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-black text-base flex items-center justify-center gap-2.5 shadow-lg shadow-green-900/25 active:scale-98 transition-all animate-whatsapp-pulse"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>Chat on WhatsApp</span>
        </a>

        <button
          onClick={() => setIsQrOpen(true)}
          className="tap-target w-12 h-12 rounded-2xl bg-white border border-[#D6C7B2] hover:bg-[#F5EEDD] text-[#1C1917] flex items-center justify-center shrink-0 transition-colors shadow-2xs"
          aria-label="QR Code"
        >
          <QrCode className="w-5 h-5 text-[#78716C]" />
        </button>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal
        business={business}
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        storeUrl={currentUrl || `http://localhost:3000/store/${business.slug}`}
      />
    </div>
  );
}
