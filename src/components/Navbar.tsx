"use client";

import Link from "next/link";
import { Store, PlusCircle, Search } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#FCFAF6]/90 backdrop-blur-md border-b border-[#F0E6D6]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-[#C2410C] text-white flex items-center justify-center shadow-md shadow-orange-900/10 group-hover:scale-105 transition-transform">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-[#1C1917] flex items-center gap-1.5">
              Dukaan<span className="text-[#C2410C]">Ready</span>
            </span>
            <span className="hidden sm:block text-[11px] font-medium text-[#78716C] -mt-1 tracking-wide">
              दुकान रेडी • Instant Storefronts
            </span>
          </div>
        </Link>

        {/* Navigation CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-storefronts"
            className="tap-target px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#57534E] hover:text-[#1C1917] hover:bg-[#F5EEDD] rounded-full transition-colors flex items-center gap-1.5"
          >
            <Search className="w-4 h-4 text-[#78716C]" />
            <span className="hidden xs:inline">My Storefronts</span>
            <span className="xs:hidden">Find</span>
          </Link>

          <Link
            href="/create"
            className="tap-target px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#C2410C] hover:bg-[#9A3412] active:scale-98 rounded-full shadow-sm shadow-orange-900/15 transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Page</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
