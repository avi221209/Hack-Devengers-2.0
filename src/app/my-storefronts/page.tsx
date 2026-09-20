"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Store,
  MessageCircle,
  ExternalLink,
  Copy,
  Check,
  QrCode,
  ArrowLeft,
  PlusCircle,
  Clock,
  MapPin,
  Loader2,
  Printer,
  Trash2,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { CategoryIcon } from "@/components/CategoryIcon";
import { QRCodeModal } from "@/components/QRCodeModal";
import { DevFallbackBanner } from "@/components/shared/DevFallbackBanner";
import { Business } from "@/lib/types";

export default function MyStorefrontsPage() {
  const [phone, setPhone] = useState("");
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // QR Modal state
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  // On page load, auto-fetch locally stored or recent storefronts
  useEffect(() => {
    async function loadRecent() {
      try {
        const res = await fetch("/api/businesses?limit=6");
        if (res.ok) {
          const data = await res.json();
          if (data.businesses && data.businesses.length > 0) {
            setBusinesses(data.businesses);
          }
        }
      } catch {
        // Safe ignore
      }
    }

    loadRecent();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, "");

    if (!cleanPhone || cleanPhone.length < 6) {
      setErrorMsg("Please enter at least 6 digits of your phone number.");
      return;
    }

    setErrorMsg("");
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(`/api/businesses?phone=${cleanPhone}`);
      if (!res.ok) {
        throw new Error("Failed to search storefronts");
      }
      const data = await res.json();
      setBusinesses(data.businesses || []);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to find storefronts");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (slug: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const url = `${origin}/store/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    } catch {
      window.prompt("Copy link:", url);
    }
  };

  const handleDelete = (slug: string) => {
    if (!window.confirm("Are you sure you want to remove this storefront from your dashboard view?")) return;
    setBusinesses((prev) => prev.filter((b) => b.slug !== slug));
    try {
      const stored = JSON.parse(localStorage.getItem("my_dukaans") || "[]");
      const updated = stored.filter((s: string) => s !== slug);
      localStorage.setItem("my_dukaans", JSON.stringify(updated));
    } catch {
      // Safe ignore
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF6]">
      <DevFallbackBanner />
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 sm:py-10">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            href="/"
            className="tap-target px-2.5 py-1 text-xs font-semibold text-[#57534E] hover:text-[#1C1917] flex items-center gap-1.5 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Search Hero Card */}
        <div className="dukaan-card-elevated p-6 sm:p-8 mb-8">
          <div className="max-w-xl mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFEDD5] text-[#C2410C] text-xs font-bold mb-3">
              <Store className="w-3.5 h-3.5" />
              <span>No Password Needed</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] tracking-tight font-[family-name:var(--font-heading)]">
              Find My Storefronts
            </h1>
            <p className="text-xs sm:text-sm text-[#78716C] mt-1.5 mb-6">
              Enter the WhatsApp mobile number used when creating your storefront.
            </p>

            {/* Phone search input form */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
              <div className="flex-1 flex items-center rounded-xl border border-[#D6C7B2] bg-white overflow-hidden focus-within:ring-2 focus-within:ring-[#C2410C] focus-within:border-transparent">
                <div className="px-3.5 py-3 bg-[#F5EEDD] border-r border-[#D6C7B2] text-xs sm:text-sm font-bold text-[#44403C] flex items-center gap-1 shrink-0">
                  <span>🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full tap-target px-4 py-3 text-sm sm:text-base outline-none bg-transparent placeholder:text-[#A8A29E] font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="tap-target px-6 py-3.5 bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold text-sm sm:text-base rounded-xl shadow-2xs transition-all flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                <span>Search</span>
              </button>
            </form>

            {errorMsg && (
              <p className="text-xs text-red-600 mt-2 font-medium">{errorMsg}</p>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-lg font-bold text-[#1C1917] flex items-center gap-2">
            <span>{searched ? "Search Results" : "Recent Storefronts"}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8DECB] text-[#44403C] font-semibold">
              {businesses.length}
            </span>
          </h2>

          <Link
            href="/create"
            className="tap-target px-3 py-1.5 rounded-full bg-[#FFEDD5] text-[#C2410C] hover:bg-[#FED7AA] text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create New</span>
          </Link>
        </div>

        {/* Business Cards List */}
        {businesses.length > 0 ? (
          <div className="space-y-4">
            {businesses.map((biz) => {
              return (
                <div
                  key={biz.id || biz.slug}
                  className="dukaan-card p-5 hover:border-[#C2410C]/40 transition-all flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FFEDD5] text-[#C2410C]">
                        <CategoryIcon category={biz.category} className="w-3 h-3" />
                        <span>{biz.category}</span>
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#78716C] font-medium">
                          WhatsApp: +91 {biz.whatsapp_number}
                        </span>

                        <button
                          onClick={() => handleDelete(biz.slug)}
                          className="tap-target p-1 text-[#A8A29E] hover:text-red-600 transition-colors"
                          title="Remove Storefront"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#1C1917] tracking-tight">
                      {biz.name}
                    </h3>
                    <p className="text-xs font-medium text-[#C2410C] mt-0.5 line-clamp-1 italic">
                      &ldquo;{biz.generated_tagline}&rdquo;
                    </p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#78716C] mt-2.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#C2410C]" />
                        {biz.timings}
                      </span>
                      <span className="flex items-center gap-1 truncate max-w-xs">
                        <MapPin className="w-3.5 h-3.5 text-[#C2410C]" />
                        {biz.address} {biz.city ? `, ${biz.city}` : ""}
                      </span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#F0E6D6]">
                    <Link
                      href={`/store/${biz.slug}`}
                      className="tap-target px-3.5 py-2 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Storefront</span>
                    </Link>

                    <button
                      onClick={() => handleCopy(biz.slug)}
                      className="tap-target px-3 py-2 rounded-xl bg-white border border-[#D6C7B2] hover:bg-[#F5EEDD] text-[#1C1917] text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      {copiedSlug === biz.slug ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#15803D]" />
                          <span className="text-[#15803D]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-[#78716C]" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setSelectedBusiness(biz)}
                      className="tap-target px-3 py-2 rounded-xl bg-[#F5EEDD] hover:bg-[#E8DECB] text-[#1C1917] text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5 text-[#C2410C]" />
                      <span>QR Code</span>
                    </button>

                    <Link
                      href={`/store/${biz.slug}/poster`}
                      className="tap-target px-3 py-2 rounded-xl bg-white border border-[#E8DECB] hover:bg-[#F5EEDD] text-[#1C1917] text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Printer className="w-3.5 h-3.5 text-[#C2410C]" />
                      <span>A4 Poster</span>
                    </Link>

                    <a
                      href={`https://wa.me/91${biz.whatsapp_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-target px-3 py-2 rounded-xl bg-[#F0FDF4] hover:bg-green-100 text-[#15803D] text-xs font-bold flex items-center gap-1.5 transition-colors ml-auto"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-[#15803D]" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="dukaan-card p-10 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-[#FFEDD5] text-[#C2410C] flex items-center justify-center mx-auto mb-3">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1C1917]">No Storefronts Found</h3>
            <p className="text-xs text-[#78716C] mt-1 mb-5">
              {searched
                ? `No storefront found for phone ending in ${phone.slice(-4)}. Try another number or create your store now!`
                : "No storefronts created yet. Create your first digital shop in 2 minutes!"}
            </p>
            <Link
              href="/create"
              className="tap-target inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold text-xs sm:text-sm rounded-xl shadow-2xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Storefront</span>
            </Link>
          </div>
        )}
      </main>

      {/* QR Modal */}
      {selectedBusiness && (
        <QRCodeModal
          business={selectedBusiness}
          isOpen={Boolean(selectedBusiness)}
          onClose={() => setSelectedBusiness(null)}
          storeUrl={
            typeof window !== "undefined"
              ? `${window.location.origin}/store/${selectedBusiness.slug}`
              : `http://localhost:3000/store/${selectedBusiness.slug}`
          }
        />
      )}
    </div>
  );
}
