export type BusinessCategory =
  | "Tailoring"
  | "Tuition/Education"
  | "Clinic/Healthcare"
  | "Mechanic/Repair"
  | "Food/Catering"
  | "Salon/Beauty"
  | "Other";

export type ThemeColor = "terracotta" | "mustard" | "forest" | "clean" | "warm";

export interface ServiceItem {
  id: string;
  name: string;
  description?: string;
  price?: string;
}

export interface BusinessHours {
  opening_time?: string;
  closing_time?: string;
  closed_days?: string[]; // e.g. ["Sunday"]
  display_text?: string;  // e.g. "10:00 AM – 8:30 PM (Mon-Sat)"
}

export interface Business {
  id: string;
  slug: string;
  name: string;
  category: BusinessCategory;
  services: string;
  services_list: ServiceItem[];
  timings: string;
  hours_detail?: BusinessHours;
  address: string;
  city?: string;
  state?: string;
  whatsapp_number: string;
  phone_number?: string;
  price_range?: string;
  raw_description?: string;
  generated_tagline: string;
  generated_about: string;
  highlight_chips?: string[];
  theme_color?: ThemeColor;
  language?: SupportedLanguage;
  logo_url?: string;
  views?: number;
  whatsapp_clicks?: number;
  calls_clicks?: number;
  directions_clicks?: number;
  created_at: string;
  updated_at?: string;
}

export interface CreateBusinessInput {
  name: string;
  category: BusinessCategory;
  services: string;
  custom_services?: ServiceItem[];
  timings: string;
  opening_time?: string;
  closing_time?: string;
  closed_days?: string[];
  address: string;
  city?: string;
  state?: string;
  whatsapp_number: string;
  phone_number?: string;
  price_range?: string;
  raw_description?: string;
  theme_color?: ThemeColor;
  logo_url?: string;
  language?: SupportedLanguage;
}

export type SupportedLanguage = "en" | "hi" | "mr";

