import fs from "fs";
import path from "path";
import { Business } from "./types";
import { isSupabaseConfigured, supabase } from "./supabase";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "businesses.json");

// Pre-loaded realistic demo micro-businesses for instant offline testing & demo mode
export const INITIAL_DEMO_BUSINESSES: Business[] = [
  {
    id: "demo-sai-krupa-auto",
    slug: "sai-krupa-auto-garage",
    name: "Sai Krupa Auto Garage",
    category: "Mechanic/Repair",
    services: "Full Bike Servicing, Engine Tuning, Oil Change, Puncture & Tyre Fitting, Roadside Assistance",
    services_list: [
      { id: "s1", name: "Full Two-Wheeler General Servicing", description: "Complete oil replacement, brake pad adjustment, spark plug cleaning & pressure washing", price: "₹499" },
      { id: "s2", name: "Synthetic Engine Oil Change & Flush", description: "High performance Motul/Castrol oil replacement for smooth mileage", price: "₹350 onwards" },
      { id: "s3", name: "Tubeless Puncture & Tyre Fitting", description: "High pressure cold patch sealing & wheel alignment check", price: "₹90" },
      { id: "s4", name: "24/7 Breakdown Roadside Pickup", description: "Towing assistance within 5km radius around Kolhapur station", price: "₹200" },
    ],
    timings: "9:00 AM – 8:30 PM (Mon-Sat)",
    address: "Shop 12, Station Road, Near Rankala Stand, Kolhapur 416001",
    city: "Kolhapur",
    state: "Maharashtra",
    whatsapp_number: "9823011223",
    price_range: "₹90 – ₹1,500",
    raw_description: "Serving Kolhapur for over 12 years with honest diagnosis and 100% genuine spare parts.",
    generated_tagline: "Honest Diagnostics, Genuine Spare Parts & Reliable Servicing You Can Count On",
    generated_about: "Sai Krupa Auto Garage has been Kolhapur's trusted neighborhood bike workshop since 2012. Founded by Master Mechanic Ramesh Patil, we specialize in high-precision two-wheeler tune-ups, instant puncture repair, and quick routine maintenance.",
    highlight_chips: ["12+ Yrs Experience", "100% Genuine Spare Parts", "Same-Day Pickup", "Transparent Billing"],
    theme_color: "mustard",
    views: 142,
    whatsapp_clicks: 28,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-aais-home-kitchen",
    slug: "aais-home-kitchen",
    name: "Aai's Home Kitchen & Tiffin Service",
    category: "Food/Catering",
    services: "Daily Homestyle Veg Thali, Monthly Dabba Subscription, Ukadiche Modak, Puran Poli",
    services_list: [
      { id: "s1", name: "Daily Homestyle Veg Thali", description: "4 Pure Ghee Phulkas, 2 fresh seasonal sabzis, Dal Tadka, Jeera Rice & Koshimbir", price: "₹120 / thali" },
      { id: "s2", name: "Monthly Dabba Subscription (Lunch/Dinner)", description: "Doorstep delivery mon-sat with daily menu variation and low-oil cooking", price: "₹2,800 / month" },
      { id: "s3", name: "Steamed Ukadiche Modak (Pack of 6)", description: "Freshly grated coconut & jaggery stuffed in pure rice flour casing with ghee", price: "₹240" },
    ],
    timings: "11:00 AM – 2:30 PM & 7:00 PM – 9:30 PM (Mon-Sat)",
    address: "B-203, Tulsi Heights, Sector 14, Vashi, Navi Mumbai 400703",
    city: "Navi Mumbai",
    state: "Maharashtra",
    whatsapp_number: "9930054321",
    price_range: "₹120 – ₹2,800",
    raw_description: "Homestyle Maharashtrian & North Indian thalis cooked with pure ghee, low oil, and zero artificial preservatives.",
    generated_tagline: "Ghar Jaisa Pure Swad, Maa Jaisa Pyaar — Fresh & Warm Homestyle Tiffins",
    generated_about: "At Aai's Home Kitchen, every meal is prepared fresh daily with the same warmth and purity as cooking for our own family. We use cold-pressed oil, farm-fresh vegetables, and traditional hand-ground spices.",
    highlight_chips: ["Zero Preservatives", "Pure Ghee & Low Oil", "Fresh Daily Delivery", "Trial Dabba Available"],
    theme_color: "forest",
    views: 210,
    whatsapp_clicks: 45,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-bright-future-classes",
    slug: "bright-future-classes",
    name: "Bright Future Coaching Classes",
    category: "Tuition/Education",
    services: "Class 8th-10th CBSE/State Board Coaching, Maths & Science Batches, Board Exam Test Series",
    services_list: [
      { id: "s1", name: "Class 9th & 10th Maths & Science Regular Batch", description: "Small batch size of 12 students with daily NCERT problem solving and worksheets", price: "₹1,800 / month" },
      { id: "s2", name: "10th Board Exam Revision & Mock Test Series", description: "10 previous board papers solving with detailed marking correction & parent feedback", price: "₹4,500 full series" },
      { id: "s3", name: "1-on-1 Individual Foundation Mentoring", description: "Personalized doubt clearing session addressing weak concepts", price: "Custom Batch" },
    ],
    timings: "4:00 PM – 9:00 PM (Monday to Saturday)",
    address: "2nd Floor, Sai Arcade, Near Railway Station, Borivali West, Mumbai 400092",
    city: "Mumbai",
    state: "Maharashtra",
    whatsapp_number: "9819098765",
    price_range: "₹1,500 – ₹4,500",
    raw_description: "Concept-first coaching with 100% board pass rate and personal doubt resolution for past 10 years.",
    generated_tagline: "Empowering Students to Score 90%+ with Concept-First Learning in Borivali",
    generated_about: "Bright Future Coaching Classes provides structured academic guidance for school students. With disciplined problem-solving sessions, small batch attention, and weekly parent progress updates, we help students build strong exam confidence.",
    highlight_chips: ["100% Board Pass Rate", "Max 12 Students / Batch", "Weekly Parent Updates", "Free Demo Class"],
    theme_color: "terracotta",
    views: 185,
    whatsapp_clicks: 32,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-shree-ganesh-tailors",
    slug: "shree-ganesh-tailors-pune",
    name: "Shree Ganesh Tailors & Boutique",
    category: "Tailoring",
    services: "Designer Blouse Stitching, Salwar Suit Fitting, Saree Fall & Pico, Express Alterations",
    services_list: [
      { id: "s1", name: "Custom Designer Blouse Stitching", description: "Princess cut, boat neck, and bridal embroidery fitting with trial guarantee", price: "₹450 onwards" },
      { id: "s2", name: "Salwar Suit & Designer Kurti Tailoring", description: "Precision measurements with inner lining piping work", price: "₹650 onwards" },
      { id: "s3", name: "Saree Fall & Pico Finishing", description: "Fine machine thread matching with clean edge finish", price: "₹120" },
      { id: "s4", name: "Express 24hr Alterations", description: "Tightening, loosening, and armhole adjustments on priority", price: "₹80 – ₹200" },
    ],
    timings: "10:00 AM – 8:30 PM (Mon-Sat)",
    address: "Shop 7, Near Ganpati Chowk, Kothrud, Pune 411038",
    city: "Pune",
    state: "Maharashtra",
    whatsapp_number: "9822012345",
    price_range: "₹120 – ₹2,500",
    raw_description: "Over 18 years of experience in ladies' bridal blouses, Punjabi suits, and custom ethnic wear.",
    generated_tagline: "Flawless Stitching, Perfect Fit & Timely Delivery — Trusted by Pune Families for 18+ Yrs",
    generated_about: "Shree Ganesh Tailors & Boutique is Kothrud's trusted destination for custom ladies' tailoring. Master Tailor Prakash Shinde brings over 18 years of precision craftsmanship to every garment.",
    highlight_chips: ["18+ Yrs Experience", "24-Hour Express Option", "Free Trial Adjustments", "Bridal Specialist"],
    theme_color: "terracotta",
    views: 310,
    whatsapp_clicks: 64,
    created_at: new Date().toISOString(),
  },
];

let memoryBusinesses: Business[] = [...INITIAL_DEMO_BUSINESSES];

function readFromFile(): Business[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Merge demo businesses with stored file businesses
        const demoSlugs = INITIAL_DEMO_BUSINESSES.map((d) => d.slug);
        const nonDemos = parsed.filter((b: Business) => !demoSlugs.includes(b.slug));
        return [...INITIAL_DEMO_BUSINESSES, ...nonDemos];
      }
    }
  } catch (err) {
    console.warn("Could not read local data file, falling back to memory:", err);
  }
  return memoryBusinesses;
}

function writeToFile(businesses: Business[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(businesses, null, 2), "utf-8");
  } catch (err) {
    // Graceful silent fallback for serverless read-only environment
  }
}

try {
  if (fs.existsSync(DATA_FILE)) {
    memoryBusinesses = readFromFile();
  } else {
    writeToFile(memoryBusinesses);
  }
} catch {
  // Safe ignore
}

/**
 * Save business to Supabase if configured, otherwise save to local file/memory
 */
export async function saveBusiness(business: Business): Promise<Business> {
  const existingIdx = memoryBusinesses.findIndex(
    (b) => b.slug === business.slug || b.id === business.id
  );
  if (existingIdx >= 0) {
    memoryBusinesses[existingIdx] = { ...memoryBusinesses[existingIdx], ...business };
  } else {
    memoryBusinesses.unshift(business);
  }
  writeToFile(memoryBusinesses);

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("businesses").upsert({
        id: business.id,
        slug: business.slug,
        name: business.name,
        category: business.category,
        services: business.services,
        services_list: business.services_list,
        timings: business.timings,
        address: business.address,
        city: business.city || null,
        state: business.state || null,
        whatsapp_number: business.whatsapp_number,
        phone_number: business.phone_number || null,
        price_range: business.price_range || null,
        raw_description: business.raw_description || null,
        generated_tagline: business.generated_tagline,
        generated_about: business.generated_about,
        highlight_chips: business.highlight_chips || [],
        theme_color: business.theme_color || "terracotta",
        language: business.language || "en",
        logo_url: business.logo_url || null,
        created_at: business.created_at,
      });

      if (error) {
        console.error("Supabase upsert warning (stored in local fallback):", error.message);
      }
    } catch (err) {
      console.error("Supabase connection error:", err);
    }
  }

  return business;
}

/**
 * Get business by slug:
 * Checks Supabase first, and seamlessly falls back to memory/demo records if not found in Supabase!
 */
export async function getBusinessBySlug(slug: string): Promise<Business | null> {
  const targetSlug = slug.toLowerCase().trim();

  // 1. Check Supabase first if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("slug", targetSlug)
        .maybeSingle();

      if (!error && data) {
        return data as Business;
      }
    } catch (err) {
      console.warn("Supabase query error, checking local store:", err);
    }
  }

  // 2. Fallback to memory & demo records (guarantees sai-krupa-auto-garage, etc. are ALWAYS found!)
  const all = readFromFile();
  const found = all.find((b) => b.slug.toLowerCase() === targetSlug);
  if (found) return found;

  const demoMatch = INITIAL_DEMO_BUSINESSES.find((b) => b.slug.toLowerCase() === targetSlug);
  return demoMatch || null;
}

/**
 * Get businesses by WhatsApp phone number
 */
export async function getBusinessesByPhone(phone: string): Promise<Business[]> {
  const cleanQueryPhone = phone.replace(/\D/g, "").slice(-10);

  let supabaseResults: Business[] = [];
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .ilike("whatsapp_number", `%${cleanQueryPhone}%`)
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        supabaseResults = data as Business[];
      }
    } catch (err) {
      console.warn("Supabase phone search error, falling back to local store:", err);
    }
  }

  const all = readFromFile();
  const localResults = all.filter((b) => {
    const cleanBPhone = b.whatsapp_number.replace(/\D/g, "").slice(-10);
    return cleanBPhone.includes(cleanQueryPhone) || cleanQueryPhone.includes(cleanBPhone);
  });

  // Combine results without duplicates
  const map = new Map<string, Business>();
  for (const item of [...supabaseResults, ...localResults]) {
    map.set(item.slug, item);
  }
  return Array.from(map.values());
}

/**
 * Get recent businesses for discovery/preview
 */
export async function getRecentBusinesses(limit = 6): Promise<Business[]> {
  const all = readFromFile();
  return all.slice(0, limit);
}

/**
 * Increment storefront view counter
 */
export async function incrementViews(slug: string): Promise<void> {
  const b = memoryBusinesses.find((item) => item.slug === slug);
  if (b) {
    b.views = (b.views || 0) + 1;
    writeToFile(memoryBusinesses);
  }
}

/**
 * Delete business by slug
 */
export async function deleteBusinessBySlug(slug: string): Promise<boolean> {
  const initialLength = memoryBusinesses.length;
  memoryBusinesses = memoryBusinesses.filter((b) => b.slug !== slug);
  if (memoryBusinesses.length < initialLength) {
    writeToFile(memoryBusinesses);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("businesses").delete().eq("slug", slug);
      } catch {
        // Safe ignore
      }
    }
    return true;
  }
  return false;
}
