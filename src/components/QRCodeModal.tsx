"use client";

import React, { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  X,
  Copy,
  Check,
  Share2,
  Download,
  Store,
  Printer,
} from "lucide-react";
import { Business } from "@/lib/types";

interface Props {
  business: Business;
  isOpen: boolean;
  onClose: () => void;
  storeUrl: string;
}

export function QRCodeModal({ business, isOpen, onClose, storeUrl }: Props) {
  const [copied, setCopied] = useState(false);
  const posterRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback prompt if clipboard API blocked
      window.prompt("Copy this storefront link:", storeUrl);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${business.name} | Dukaan Ready`,
          text: `Check out our digital storefront for ${business.name} on Dukaan Ready:`,
          url: storeUrl,
        });
      } catch {
        // User cancelled or not supported
      }
    } else {
      handleCopy();
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#FCFAF6] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#E8DECB] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 tap-target w-9 h-9 rounded-full bg-[#F5EEDD] text-[#78716C] hover:text-[#1C1917] hover:bg-[#E8DECB] transition-colors flex items-center justify-center"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5 pr-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFEDD5] text-[#C2410C] text-xs font-bold mb-2">
            <Store className="w-3.5 h-3.5" />
            <span>Storefront QR Poster</span>
          </div>
          <h3 className="text-lg font-bold text-[#1C1917] leading-tight">
            Share & Print QR Code
          </h3>
          <p className="text-xs text-[#78716C] mt-1">
            Display this on your counter or send the link to customers.
          </p>
        </div>

        {/* Printable/Scannable Poster Card */}
        <div
          ref={posterRef}
          className="bg-white p-5 rounded-2xl border-2 border-[#C2410C]/30 shadow-sm text-center mb-5 flex flex-col items-center"
        >
          <div className="w-full border-b border-[#F0E6D6] pb-3 mb-3">
            <h4 className="font-extrabold text-[#1C1917] text-base truncate max-w-[240px]">
              {business.name}
            </h4>
            <p className="text-[11px] font-medium text-[#C2410C] mt-0.5">
              {business.category} • WhatsApp: +91 {business.whatsapp_number}
            </p>
          </div>

          {/* QR Code */}
          <div className="p-3 bg-white rounded-xl shadow-inner border border-[#E8DECB] inline-block mb-3">
            <QRCodeSVG
              value={storeUrl}
              size={180}
              level="H"
              includeMargin={false}
              fgColor="#1C1917"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#15803D]">
            <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping" />
            <span>Scan with any camera or Google Pay / Paytm</span>
          </div>
        </div>

        {/* Link input with quick copy */}
        <div className="flex items-center gap-2 bg-white rounded-xl border border-[#E8DECB] p-1.5 pl-3 mb-4">
          <input
            type="text"
            readOnly
            value={storeUrl}
            className="text-xs text-[#57534E] bg-transparent outline-none flex-1 truncate select-all"
          />
          <button
            onClick={handleCopy}
            className="tap-target px-3 py-1.5 rounded-lg bg-[#F5EEDD] hover:bg-[#E8DECB] text-[#1C1917] font-semibold text-xs transition-colors flex items-center gap-1 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#15803D]" />
                <span className="text-[#15803D]">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleNativeShare}
            className="tap-target py-2.5 px-3 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm shadow-orange-900/10 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Link</span>
          </button>

          <button
            onClick={handlePrint}
            className="tap-target py-2.5 px-3 rounded-xl bg-white border border-[#D6C7B2] hover:bg-[#F5EEDD] text-[#1C1917] font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4 text-[#78716C]" />
            <span>Print Poster</span>
          </button>
        </div>
      </div>
    </div>
  );
}
