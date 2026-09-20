"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Printer, ArrowLeft, MessageCircle, PhoneCall, MapPin, Store, Sparkles } from "lucide-react";
import { Business } from "@/lib/types";
import { CategoryIcon } from "@/components/CategoryIcon";

export default function StorefrontPosterPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [storeUrl, setStoreUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStoreUrl(`${window.location.origin}/store/${slug}`);
    }

    async function fetchBusiness() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/store/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setBusiness(data.business);
        }
      } catch (err) {
        console.error("Poster fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBusiness();
  }, [slug]);

  if (loading || !business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFAF6]">
        <p className="text-sm font-bold text-[#78716C]">Loading Printable Poster...</p>
      </div>
    );
  }

  const cleanPhone = business.whatsapp_number.replace(/\D/g, "");

  return (
    <div className="min-h-screen bg-[#F5EEDD] p-4 sm:p-8 flex flex-col items-center justify-center">
      {/* Print Controls (Hidden when printing) */}
      <div className="w-full max-w-xl flex items-center justify-between mb-4 print:hidden">
        <Link
          href={`/store/${business.slug}`}
          className="tap-target px-3 py-1.5 rounded-xl bg-white border border-[#D6C7B2] text-xs font-bold text-[#1C1917] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Storefront</span>
        </Link>

        <button
          onClick={() => window.print()}
          className="tap-target px-5 py-2 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md"
        >
          <Printer className="w-4 h-4" />
          <span>Print Counter Poster (A4)</span>
        </button>
      </div>

      {/* A4 Counter Poster Container */}
      <div className="w-full max-w-xl bg-white rounded-3xl border-4 border-[#C2410C] p-8 text-center shadow-2xl relative overflow-hidden print:shadow-none print:border-4 print:m-0 print:p-6">
        {/* Top Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFEDD5] text-[#C2410C] text-xs font-black uppercase tracking-wider">
            <CategoryIcon category={business.category} className="w-4 h-4" />
            <span>{business.category}</span>
          </span>
        </div>

        {/* Business Title */}
        <h1 className="text-3xl sm:text-4xl font-black text-[#1C1917] tracking-tight leading-tight font-[family-name:var(--font-heading)]">
          {business.name}
        </h1>

        <p className="text-sm font-semibold text-[#C2410C] mt-2 italic max-w-md mx-auto">
          &ldquo;{business.generated_tagline}&rdquo;
        </p>

        {/* QR Code Container */}
        <div className="my-6 p-6 rounded-3xl bg-[#FFFDF9] border-2 border-[#E8DECB] inline-block shadow-inner">
          <QRCodeSVG value={storeUrl || `https://dukaanready.com/store/${business.slug}`} size={200} level="H" />
          <p className="text-xs font-black text-[#1C1917] uppercase tracking-wider mt-3 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C2410C]" />
            <span>Scan to view menu & offerings</span>
          </p>
        </div>

        {/* Highlight Chips */}
        {business.highlight_chips && business.highlight_chips.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 mb-6">
            {business.highlight_chips.slice(0, 4).map((chip, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-[#F5EEDD] text-[#44403C] text-xs font-bold">
                ✓ {chip}
              </span>
            ))}
          </div>
        )}

        {/* Contact Info Footer */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#FFEDD5] border border-[#FDBA74] text-xs text-[#1C1917] font-bold">
          <div className="flex items-center justify-center gap-1.5">
            <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
            <span>WhatsApp: +91 {business.whatsapp_number}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 truncate">
            <MapPin className="w-4 h-4 text-[#C2410C]" />
            <span className="truncate">{business.city || business.address}</span>
          </div>
        </div>

        {/* Dukaan Ready credit */}
        <div className="mt-6 pt-4 border-t border-[#F0E6D6] flex items-center justify-center gap-1 text-[11px] font-semibold text-[#78716C]">
          <Store className="w-3.5 h-3.5 text-[#C2410C]" />
          <span>Digital Storefront powered by DukaanReady.com</span>
        </div>
      </div>
    </div>
  );
}
