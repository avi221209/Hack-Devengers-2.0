"use client";

import React, { useEffect, useState } from "react";
import { Info, Database } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";

export function DevFallbackBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isSupabaseConfigured) return null;

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-900 text-xs px-4 py-2 flex items-center justify-center gap-2">
      <Database className="w-3.5 h-3.5 text-amber-700 shrink-0" />
      <span className="font-semibold">
        Running in Local Persistence Mode (Supabase not configured) — Storefronts are saved locally.
      </span>
    </div>
  );
}
