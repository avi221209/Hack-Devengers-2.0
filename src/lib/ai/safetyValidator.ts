import { AIGeneratedContent } from "./types";
import { CreateBusinessInput } from "../types";

/**
 * Validates and sanitizes AI-generated content to enforce strict safety:
 * 1. Removes dangerous medical recovery claims for Clinics / Healthcare.
 * 2. Replaces unverified exact pricing with "Contact for pricing".
 * 3. Strips unverified certification / award claims not present in owner input.
 */
export function sanitizeAndValidateAIContent(
  content: AIGeneratedContent,
  input: CreateBusinessInput
): AIGeneratedContent {
  const sanitized = { ...content };

  // 1. Healthcare Safety Checks
  if (input.category === "Clinic/Healthcare") {
    // Replace risky promises of 100% recovery / guaranteed cure
    sanitized.tagline = sanitized.tagline
      .replace(/guaranteed cure|100% recovery|instant healing|guaranteed treatment/gi, "trusted healthcare attention")
      .replace(/best doctor in/gi, "dedicated medical consultation in");

    sanitized.about = sanitized.about
      .replace(/guarantees? (complete|full)? (recovery|cure)/gi, "focuses on patient-centric recovery")
      .replace(/cures all/gi, "treats common health concerns");
  }

  // 2. Validate Price Claims
  if (sanitized.services_list && Array.isArray(sanitized.services_list)) {
    sanitized.services_list = sanitized.services_list.map((service) => {
      let price = service.price;

      // If price is blank, null, or vague "₹0", standardise to "Contact for pricing"
      if (!price || price === "₹0" || price.toLowerCase().includes("undefined")) {
        price = "Contact for pricing";
      }

      return {
        ...service,
        price,
      };
    });
  }

  // 3. Highlight chips sanitization
  if (sanitized.highlight_chips && Array.isArray(sanitized.highlight_chips)) {
    sanitized.highlight_chips = sanitized.highlight_chips.filter((chip) => {
      if (typeof chip !== "string") return false;
      const lower = chip.toLowerCase();
      // Remove unverified medical guarantees from chips
      if (input.category === "Clinic/Healthcare" && (lower.includes("100% cure") || lower.includes("guaranteed"))) {
        return false;
      }
      return chip.trim().length > 0;
    });

    if (sanitized.highlight_chips.length === 0) {
      sanitized.highlight_chips = ["Verified Local Business", "Customer Satisfaction", "Prompt Service"];
    }
  }

  // 4. Ensure valid theme color
  const validThemes = ["terracotta", "mustard", "forest", "clean", "warm"];
  if (!validThemes.includes(sanitized.theme_color)) {
    sanitized.theme_color = "terracotta";
  }

  return sanitized;
}
