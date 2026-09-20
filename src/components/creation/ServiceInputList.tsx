"use client";

import React, { useState } from "react";
import { Plus, Trash2, Tag, FileText } from "lucide-react";
import { ServiceItem } from "@/lib/types";

interface ServiceInputListProps {
  services: ServiceItem[];
  onChange: (services: ServiceItem[]) => void;
  categorySuggestions?: string[];
}

export function ServiceInputList({ services, onChange, categorySuggestions = [] }: ServiceInputListProps) {
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    const item: ServiceItem = {
      id: `srv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: newName.trim(),
      price: newPrice.trim() || undefined,
      description: newDesc.trim() || undefined,
    };
    onChange([...services, item]);
    setNewName("");
    setNewPrice("");
    setNewDesc("");
  };

  const handleRemove = (id: string) => {
    onChange(services.filter((s) => s.id !== id));
  };

  const handleAddSuggestion = (name: string) => {
    if (services.some((s) => s.name.toLowerCase() === name.toLowerCase())) return;
    const item: ServiceItem = {
      id: `srv-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: name,
    };
    onChange([...services, item]);
  };

  return (
    <div className="space-y-4">
      {/* Existing List */}
      {services.length > 0 && (
        <div className="space-y-2.5">
          <label className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
            Added Offerings ({services.length})
          </label>
          {services.map((srv, index) => (
            <div
              key={srv.id || index}
              className="p-3.5 rounded-xl bg-white border border-[#E8DECB] flex items-center justify-between gap-3 shadow-2xs"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#1C1917] truncate">{srv.name}</span>
                  {srv.price && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#D97706] shrink-0">
                      {srv.price}
                    </span>
                  )}
                </div>
                {srv.description && (
                  <p className="text-xs text-[#78716C] mt-0.5 truncate">{srv.description}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleRemove(srv.id)}
                className="tap-target p-2 text-[#A8A29E] hover:text-red-600 transition-colors rounded-lg"
                title="Remove Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Quick Add Form */}
      <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8DECB] space-y-3">
        <label className="text-xs font-bold text-[#1C1917] flex items-center gap-1.5">
          <Plus className="w-4 h-4 text-[#C2410C]" />
          <span>Add Service or Product</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="sm:col-span-2">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Bike Full Servicing or Bridal Blouse"
              className="w-full tap-target px-3.5 py-2.5 text-sm rounded-xl border border-[#D6C7B2] bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C]"
            />
          </div>

          <div>
            <div className="relative">
              <input
                type="text"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="e.g. ₹499"
                className="w-full tap-target px-3.5 py-2.5 pl-8 text-sm rounded-xl border border-[#D6C7B2] bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C]"
              />
              <Tag className="w-3.5 h-3.5 text-[#A8A29E] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Short details (e.g. Engine oil change & water wash included)"
            className="w-full tap-target px-3.5 py-2.5 pl-8 text-xs sm:text-sm rounded-xl border border-[#D6C7B2] bg-white focus:outline-none focus:ring-2 focus:ring-[#C2410C]"
          />
          <FileText className="w-3.5 h-3.5 text-[#A8A29E] absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!newName.trim()}
          className={`tap-target w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all ${
            newName.trim()
              ? "bg-[#C2410C] text-white hover:bg-[#9A3412] shadow-xs"
              : "bg-[#E8DECB] text-[#A8A29E] cursor-not-allowed"
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add to Offerings List</span>
        </button>
      </div>

      {/* Suggestions */}
      {categorySuggestions.length > 0 && (
        <div className="pt-1">
          <span className="text-[11px] font-bold text-[#78716C] block mb-1.5">
            Quick Add Suggested Items:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {categorySuggestions.map((sug, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAddSuggestion(sug)}
                className="tap-target px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F5EEDD] hover:bg-[#E8DECB] text-[#44403C] transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-[#C2410C]" />
                <span>{sug}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
