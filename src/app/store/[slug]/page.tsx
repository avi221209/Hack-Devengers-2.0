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
  Eye,
} from "lucide-react";
import { Business, ThemeColor } from "@/lib/types";
import { CategoryIcon } from "@/components/CategoryIcon";
import { QRCodeModal } from "@/components/QRCodeModal";
import { Navbar } from "@/components/Navbar";

const THEME_STYLES: Record<
  ThemeColor,
  { primary: string; border: string; bg: string; text: string; lightBg: string }
> = {
  terracotta: {
    primary: "#C2410C",
    border: "border-[#C2410C]",
    bg: "bg-[#C2410C]",
    text: "text-[#C2410C]",
    lightBg: "bg-[#FFF7ED]",
  },
  mustard: {
    primary: "#D97706",
    border: "border-[#D97706]",
    bg: "bg-[#D97706]",
    text: "text-[#D97706]",
    lightBg: "bg-[#FEF3C7]",
  },
  forest: {
    primary: "#15803D",
    border: "border-[#15803D]",
    bg: "bg-[#15803D]",
    text: "text-[#15803D]",
    lightBg: "bg-[#F0FDF4]",
  },
  clean: {
    primary: "#4F46E5",
    border: "border-[#4F46E5]",
    bg: "bg-[#4F46E5]",
    text: "text-[#4F46E5]",
    lightBg: "bg-[#EEF2FF]",
  },
  warm: {
    primary: "#DB2777",
    border: "border-[#DB2777]",
    bg: "bg-[#DB2777]",
    text: "text-[#DB2777]",
    lightBg: "bg-[#FDF2F8]",
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

    async function fetchStore() {
      if (!slug) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/store/${slug}`);
        if (!res.ok) {
          throw new Error("Storefront not found");
        }
        const data = await res.json();
        setBusiness(data.business);
      } catch (err: any) {
        setError(err.message || "Failed to load storefront");
      } finally {
        setLoading(false);
      }
    }

    fetchStore();
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
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      setIsQrOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCFAF6]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FFEDD5] text-[#C2410C] flex items-center justify-center animate-bounce mb-3">
            <Store className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#1C1917]">Opening Digital Dukaan...</h2>
          <p className="text-xs text-[#78716C] mt-1">Connecting to your digital storefront</p>
        </div>
      </div>
    );
  }

  if (error || !business) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FCFAF6]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#1C1917]">Storefront Not Found</h2>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1 mb-6">
            The storefront link you requested is unavailable. You can create your own digital dukaan in 2 minutes!
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="tap-target px-4 py-2 bg-white border border-[#D6C7B2] rounded-xl text-xs sm:text-sm font-bold text-[#1C1917]"
            >
              Go to Home
            </Link>
            <Link
              href="/create"
              className="tap-target px-4 py-2 bg-[#C2410C] text-white rounded-xl text-xs sm:text-sm font-bold shadow-2xs"
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
    <div className="min-h-screen flex flex-col bg-[#FCFAF6] pb-24 sm:pb-12">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-30 bg-[#FCFAF6]/90 backdrop-blur-md border-b border-[#F0E6D6]">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="tap-target px-2.5 py-1 text-xs font-bold text-[#57534E] hover:text-[#1C1917] flex items-center gap-1 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dukaan Ready</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="tap-target px-3 py-1.5 rounded-full bg-white border border-[#E8DECB] text-xs font-bold text-[#1C1917] hover:bg-[#F5EEDD] flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Share2 className={`w-3.5 h-3.5 ${activeTheme.text}`} />
              <span>{copiedLink ? "Link Copied!" : "Share"}</span>
            </button>

            <Link
              href={`/store/${business.slug}/poster`}
              className="tap-target px-3 py-1.5 rounded-full bg-[#FFEDD5] text-[#C2410C] text-xs font-bold hover:bg-[#FED7AA] flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Poster</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 pt-4 sm:pt-6 space-y-4">
        {/* 1. Hero Banner */}
        <section className={`dukaan-card-elevated border-t-4 ${activeTheme.border} p-5 sm:p-7 relative overflow-hidden`}>
          {/* Category Badge & Verification */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-3 py-1 rounded-full ${activeTheme.lightBg} ${activeTheme.text}`}>
              <CategoryIcon category={business.category} className="w-3.5 h-3.5" />
              <span>{business.category}</span>
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#F0FDF4] text-[#15803D] border border-green-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D]" />
              <span>Verified Dukaan</span>
            </span>
          </div>

          {/* Business Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1C1917] tracking-tight leading-tight font-[family-name:var(--font-heading)]">
            {business.name}
          </h1>

          {/* AI Tagline */}
          <p className={`text-sm sm:text-base font-semibold ${activeTheme.text} mt-2 leading-relaxed italic`}>
            &ldquo;{business.generated_tagline}&rdquo;
          </p>

          {/* Trust Chips */}
          {business.highlight_chips && business.highlight_chips.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[#F0E6D6]">
              {business.highlight_chips.map((chip, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#F5EEDD] text-[#44403C] font-semibold text-xs flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#D97706]" />
                  <span>{chip}</span>
                </span>
              ))}
            </div>
          )}

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] active:scale-98 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm shadow-green-900/15 transition-all"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={telUrl}
              className="tap-target w-full py-3.5 px-4 rounded-xl bg-white border border-[#D6C7B2] hover:bg-[#F5EEDD] active:scale-98 text-[#1C1917] font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all"
            >
              <PhoneCall className={`w-4 h-4 ${activeTheme.text}`} />
              <span>Call +91 {business.whatsapp_number}</span>
            </a>
          </div>
        </section>

        {/* 2. About Business */}
        <section className="dukaan-card p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-2.5 text-[#1C1917]">
            <Store className={`w-4 h-4 ${activeTheme.text}`} />
            <h2 className="text-base sm:text-lg font-black font-[family-name:var(--font-heading)]">
              About Our Business
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed font-medium">
            {business.generated_about}
          </p>

          {business.price_range && (
            <div className="mt-4 pt-3 border-t border-[#F0E6D6] flex items-center gap-2 text-xs font-bold text-[#D97706]">
              <Tag className="w-3.5 h-3.5" />
              <span>Price Range: {business.price_range}</span>
            </div>
          )}
        </section>

        {/* 3. Services Catalog */}
        <section className="dukaan-card p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[#1C1917]">
              <CategoryIcon category={business.category} className={`w-4 h-4 ${activeTheme.text}`} />
              <h2 className="text-base sm:text-lg font-black font-[family-name:var(--font-heading)]">
                Services & Offerings
              </h2>
            </div>
            <span className="text-xs font-semibold text-[#78716C]">
              {business.services_list?.length || 0} items
            </span>
          </div>

          <div className="space-y-3">
            {business.services_list && business.services_list.length > 0 ? (
              business.services_list.map((srv, idx) => {
                const itemMsg = encodeURIComponent(
                  `Hello ${business.name}, I found your storefront on Dukaan Ready and would like to inquire about "${srv.name}".`
                );
                const itemWhatsAppUrl = `https://wa.me/91${cleanPhone}?text=${itemMsg}`;

                return (
                  <div
                    key={srv.id || idx}
                    className="p-3.5 rounded-xl bg-white border border-[#E8DECB] hover:border-[#C2410C]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${activeTheme.bg} shrink-0`} />
                        <h3 className="font-bold text-sm text-[#1C1917] truncate">
                          {srv.name}
                        </h3>
                      </div>
                      {srv.description && (
                        <p className="text-xs text-[#57534E] mt-1 pl-3.5 leading-relaxed">
                          {srv.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0E6D6]">
                      {srv.price && (
                        <span className="text-xs font-bold text-[#D97706] bg-[#FEF3C7] px-2 py-1 rounded-md">
                          {srv.price}
                        </span>
                      )}

                      <a
                        href={itemWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tap-target px-2.5 py-1 text-xs font-bold text-[#15803D] bg-[#F0FDF4] hover:bg-green-100 rounded-lg flex items-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-3 h-3 fill-[#15803D]" />
                        <span>Inquire</span>
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-[#78716C]">{business.services}</p>
            )}
          </div>
        </section>

        {/* 4. Timings */}
        <section className="dukaan-card p-5 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-[#1C1917]">
              <Clock className={`w-4 h-4 ${activeTheme.text}`} />
              <h2 className="text-base sm:text-lg font-black font-[family-name:var(--font-heading)]">
                Shop Timings
              </h2>
            </div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F0FDF4] text-[#15803D] border border-green-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-ping" />
              Open for Inquiries
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#E8DECB] text-xs sm:text-sm font-semibold text-[#1C1917]">
            {business.timings}
          </div>
        </section>

        {/* 5. Google Maps Location */}
        <section className="dukaan-card p-5 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-[#1C1917]">
              <MapPin className={`w-4 h-4 ${activeTheme.text}`} />
              <h2 className="text-base sm:text-lg font-black font-[family-name:var(--font-heading)]">
                Location & Directions
              </h2>
            </div>

            <a
              href={mapsExternalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`tap-target px-2.5 py-1 text-xs font-bold ${activeTheme.text} flex items-center gap-1`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>
          </div>

          <p className="text-xs sm:text-sm text-[#57534E] mb-3 font-medium">
            {business.address} {business.city ? `, ${business.city}` : ""}
          </p>

          <div className="w-full h-56 rounded-xl overflow-hidden border border-[#E8DECB] shadow-inner bg-[#EAE5D9]">
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

        {/* 6. Footer QR Banner */}
        <section className="p-5 rounded-2xl bg-[#FFEDD5] border border-[#FDBA74]/60 text-center">
          <h3 className="font-extrabold text-[#1C1917] text-sm sm:text-base">
            Visiting in person or need our shop counter poster?
          </h3>
          <p className="text-xs text-[#78716C] mt-1 mb-3">
            Open or print the A4 poster for counter display.
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setIsQrOpen(true)}
              className={`tap-target inline-flex items-center gap-1.5 px-4 py-2 ${activeTheme.bg} text-white font-bold text-xs sm:text-sm rounded-xl shadow-2xs hover:opacity-95 transition-opacity`}
            >
              <QrCode className="w-4 h-4" />
              <span>QR Code</span>
            </button>

            <Link
              href={`/store/${business.slug}/poster`}
              className="tap-target inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#D6C7B2] text-[#1C1917] font-bold text-xs sm:text-sm rounded-xl hover:bg-[#F5EEDD] transition-colors"
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
            className="text-[11px] font-semibold text-[#A8A29E] hover:text-[#C2410C] inline-flex items-center gap-1 transition-colors"
          >
            <span>Powered by</span>
            <span className="font-bold text-[#78716C]">Dukaan Ready</span>
            <span>• Create your digital storefront</span>
          </Link>
        </div>
      </main>

      {/* Sticky Bottom Bar on Mobile */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F0E6D6] p-3 shadow-lg flex items-center gap-2.5 max-w-lg mx-auto sm:max-w-md">
        <a
          href={telUrl}
          className="tap-target w-12 h-12 rounded-xl bg-[#F5EEDD] hover:bg-[#E8DECB] text-[#1C1917] flex items-center justify-center shrink-0 border border-[#D6C7B2] transition-colors"
          aria-label="Call Business"
        >
          <PhoneCall className={`w-5 h-5 ${activeTheme.text}`} />
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-target flex-1 h-12 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-green-900/15 active:scale-98 transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>Chat on WhatsApp</span>
        </a>

        <button
          onClick={() => setIsQrOpen(true)}
          className="tap-target w-12 h-12 rounded-xl bg-white border border-[#D6C7B2] hover:bg-[#F5EEDD] text-[#1C1917] flex items-center justify-center shrink-0 transition-colors"
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
