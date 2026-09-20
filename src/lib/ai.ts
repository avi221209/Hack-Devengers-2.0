import { BusinessCategory, CreateBusinessInput, ServiceItem } from "./types";
import { AIGeneratedContent } from "./ai/types";


/**
 * Intelligent localized fallback generator when no external AI API key is configured.
 * Produces authentic, warm, high-converting copy specifically tailored for Indian micro-businesses.
 */
export function generateLocalFallback(input: CreateBusinessInput): AIGeneratedContent {
  const { name, category, services, address, price_range, raw_description } = input;
  const rawServices = services
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Extract city/locality hint from address
  const addressParts = address.split(",").map((p) => p.trim());
  const localityHint = addressParts.length > 1 ? addressParts[addressParts.length - 2] || addressParts[addressParts.length - 1] : address;

  switch (category) {
    case "Tailoring":
      return {
        tagline: `Flawless Stitching, Perfect Fit & Timely Delivery in ${localityHint || "Town"}`,
        about: `${name} is your trusted neighborhood boutique for custom ladies' tailoring, bridal blouse craftsmanship, and precision alterations. With an eye for delicate patterns and modern cuts, we guarantee high-quality fabric finishing and on-time delivery for every festive celebration or everyday look.`,
        services_list: rawServices.map((s, idx) => ({
          id: `s-${idx + 1}`,
          name: s,
          description: getTailoringServiceDesc(s),
          price: price_range || "Custom Quote",
        })),
        highlight_chips: ["Perfect Fitting Guarantee", "Timely Delivery", "Express Stitching Available", "Trial Adjustments Free"],
        theme_color: "terracotta",
      };

    case "Tuition/Education":
      return {
        tagline: `Empowering Students with Concept Clarity, Personal Guidance & Proven Results`,
        about: `At ${name}, we believe every student has the potential to excel when guided with patience and clear fundamentals. We provide structured learning modules, regular practice test series, and dedicated individual doubt-solving in comfortable, distraction-free batches.`,
        services_list: rawServices.map((s, idx) => ({
          id: `s-${idx + 1}`,
          name: s,
          description: getEducationServiceDesc(s),
          price: price_range || "Monthly / Batch Wise",
        })),
        highlight_chips: ["Small Focused Batches", "Weekly Parent Progress Updates", "Mock Test Series", "Concept-First Teaching"],
        theme_color: "mustard",
      };

    case "Clinic/Healthcare":
      return {
        tagline: `Compassionate Family Healthcare & Trusted Medical Attention in ${localityHint || "Your Neighborhood"}`,
        about: `${name} is committed to accessible, ethical, and high-quality family medical care. From routine health assessments to chronic lifestyle management and preventative care, our clinic offers gentle consultations in a clean, patient-friendly environment.`,
        services_list: rawServices.map((s, idx) => ({
          id: `s-${idx + 1}`,
          name: s,
          description: getHealthcareServiceDesc(s),
          price: price_range || "Affordable Consultation",
        })),
        highlight_chips: ["Experienced Doctor", "Strict Hygiene & Sanitization", "Minimal Waiting Time", "Emergency First-Aid"],
        theme_color: "forest",
      };

    case "Mechanic/Repair":
      return {
        tagline: `Honest Diagnostics, Genuine Spare Parts & Reliable Servicing You Can Trust`,
        about: `${name} has been keeping your vehicles running safely and smoothly with honest workmanship and fair pricing. Whether it is routine periodic maintenance, engine fine-tuning, or urgent roadside help, our skilled mechanics deliver dependable service every single time.`,
        services_list: rawServices.map((s, idx) => ({
          id: `s-${idx + 1}`,
          name: s,
          description: getMechanicServiceDesc(s),
          price: price_range || "Transparent Rates",
        })),
        highlight_chips: ["100% Genuine Parts", "Transparent Billing", "Quick Turnaround", "Emergency Assistance"],
        theme_color: "mustard",
      };

    case "Food/Catering":
      return {
        tagline: `Ghar Jaisa Shuddh Swad, Fresh Ingredients & Made with Warmth Daily`,
        about: `${name} brings you homestyle, comforting meals prepared with clean water, premium spices, and zero harmful food colors or preservatives. We take pride in delivering healthy, soul-satisfying taste just like mother’s cooking for daily meals and family gatherings.`,
        services_list: rawServices.map((s, idx) => ({
          id: `s-${idx + 1}`,
          name: s,
          description: getFoodServiceDesc(s),
          price: price_range || "Per Meal / Order",
        })),
        highlight_chips: ["100% Pure & Hygienic", "Fresh Daily Ingredients", "Zero Artificial Additives", "On-Time Delivery"],
        theme_color: "forest",
      };

    case "Salon/Beauty":
      return {
        tagline: `Glow with Confidence — Personalized Beauty & Care in a Relaxing Space`,
        about: `${name} is your go-to sanctuary for revitalizing beauty care, bridal glow packages, and personalized styling. We use sanitized premium products to ensure your skin and hair receive the gentle, nourishing attention they deserve.`,
        services_list: rawServices.map((s, idx) => ({
          id: `s-${idx + 1}`,
          name: s,
          description: getSalonServiceDesc(s),
          price: price_range || "Service Menu Rates",
        })),
        highlight_chips: ["Sanitized Equipment", "Branded Skin-Safe Products", "Experienced Stylists", "Prior Appointment Available"],
        theme_color: "terracotta",
      };

    default:
      return {
        tagline: `Reliable Quality, Friendly Service & Dedication to ${localityHint || "Every Customer"}`,
        about: `Welcome to ${name}! ${raw_description ? raw_description + " " : ""}We are proud to serve our community with dependable products, prompt communication, and genuine value. Customer satisfaction and lasting relationships are at the heart of everything we do.`,
        services_list: rawServices.map((s, idx) => ({
          id: `s-${idx + 1}`,
          name: s,
          description: "Delivered with prompt attention, professional standards, and personalized care.",
          price: price_range || "Contact for Pricing",
        })),
        highlight_chips: ["Verified Local Business", "Prompt Communication", "Transparent Pricing", "Customer Satisfaction"],
        theme_color: "terracotta",
      };
  }
}

function getTailoringServiceDesc(service: string): string {
  const s = service.toLowerCase();
  if (s.includes("blouse")) return "Custom design, pad insertion, boat neck, designer backs with fine hand finishing.";
  if (s.includes("suit") || s.includes("salwar") || s.includes("kurti")) return "Custom measurements, neat piping, comfortable armhole cut, and exact lining.";
  if (s.includes("pico") || s.includes("fall")) return "Smooth saree fall attachment and machine-pico with matching thread.";
  if (s.includes("alter")) return "Quick tightening, loosening, zip replacement, and sleeve adjustment.";
  return "Handcrafted tailoring with attention to detail and trial-fit guarantee.";
}

function getEducationServiceDesc(service: string): string {
  const s = service.toLowerCase();
  if (s.includes("math") || s.includes("science")) return "Step-by-step formula derivations, concept worksheets, and previous exam question analysis.";
  if (s.includes("test") || s.includes("exam")) return "Timed mock assessments with detailed correction and parent feedback.";
  if (s.includes("batch") || s.includes("1-on-1")) return "Focused small group or individual tutoring addressing core doubts.";
  return "Structured coaching syllabus with personal mentoring and revision notes.";
}

function getHealthcareServiceDesc(service: string): string {
  const s = service.toLowerCase();
  if (s.includes("checkup") || s.includes("consult")) return "Comprehensive diagnostic examination, health history review, and expert prescription.";
  if (s.includes("sugar") || s.includes("bp")) return "Instant accurate digital monitoring and tailored lifestyle dietary counseling.";
  if (s.includes("vaccin")) return "Safe, temperature-controlled immunization following national clinical guidelines.";
  return "Patient-centric medical attention and clear guidance on recovery.";
}

function getMechanicServiceDesc(service: string): string {
  const s = service.toLowerCase();
  if (s.includes("oil") || s.includes("tuning")) return "High-grade engine lubricant replacement, carburetor/FI cleaning, and spark plug check.";
  if (s.includes("puncture") || s.includes("tyre")) return "Tubeless and tube puncture patches with high-pressure air sealing.";
  if (s.includes("brake") || s.includes("chain")) return "Brake pad replacement, chain lubrication, and safety alignment.";
  return "Thorough mechanical inspection and tune-up with genuine components.";
}

function getFoodServiceDesc(service: string): string {
  const s = service.toLowerCase();
  if (s.includes("tiffin") || s.includes("dabba")) return "Fresh hot phulkas, nutritious sabzi, slow-cooked dal, and fragrant rice prepared daily.";
  if (s.includes("sweet") || s.includes("snack")) return "Traditional recipes made with pure ghee and authentic regional spices.";
  if (s.includes("party") || s.includes("cater")) return "Customized bulk meal packaging for family functions, pujas, and corporate meetings.";
  return "Hygienically cooked homestyle preparation packed hot for freshness.";
}

function getSalonServiceDesc(service: string): string {
  const s = service.toLowerCase();
  if (s.includes("facial") || s.includes("cleanup")) return "Deep pore cleansing, exfoliation, soothing face massage, and rejuvenating glow pack.";
  if (s.includes("hair") || s.includes("spa")) return "Nourishing scalp massage, hair steam, and deep conditioning for shine.";
  if (s.includes("bridal") || s.includes("makeup")) return "Long-lasting, HD finish customized to your outfit and bridal aesthetics.";
  return "Gentle beauty session with sterilized tools and skin-friendly care.";
}

import { executeAIGeneration } from "./ai/providerManager";


/**
 * Main AI Generation entrypoint:
 * Delegates to providerManager which automatically selects OpenAI, Anthropic, Gemini,
 * or falls back seamlessly to the localized heuristic engine with safety validation.
 */
export async function generateStorefrontCopy(input: CreateBusinessInput): Promise<AIGeneratedContent> {
  const result = await executeAIGeneration(input);
  return result.content;
}

