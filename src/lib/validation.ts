import { CreateBusinessInput } from "./types";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
  * Clean and normalize Indian mobile phone numbers.
  * Accepts string with spaces, +91, 0, or dashes.
  * Returns 10-digit clean string if valid, otherwise empty string.
  */
export function normalizeIndianPhone(input: string): string {
  if (!input) return "";
  // Strip all non-digit characters
  const digits = input.replace(/\D/g, "");
  // If user entered +91 or 91 prefix followed by 10 digits
  if (digits.length === 12 && digits.startsWith("91")) {
    const tenDigits = digits.slice(2);
    if (/^[6-9]\d{9}$/.test(tenDigits)) {
      return tenDigits;
    }
  }
  // If user entered 0 prefix followed by 10 digits
  if (digits.length === 11 && digits.startsWith("0")) {
    const tenDigits = digits.slice(1);
    if (/^[6-9]\d{9}$/.test(tenDigits)) {
      return tenDigits;
    }
  }
  // Standard 10-digit number
  if (digits.length === 10 && /^[6-9]\d{9}$/.test(digits)) {
    return digits;
  }
  return "";
}

/**
 * Validate CreateBusinessInput both client-side and server-side
 */
export function validateBusinessInput(input: Partial<CreateBusinessInput>): ValidationResult {
  const errors: Record<string, string> = {};

  // Business Name
  if (!input.name || !input.name.trim()) {
    errors.name = "Please enter your business name.";
  } else if (input.name.trim().length < 2) {
    errors.name = "Business name must be at least 2 characters long.";
  } else if (input.name.trim().length > 80) {
    errors.name = "Business name should be under 80 characters.";
  }

  // Category
  if (!input.category) {
    errors.category = "Please select a business category.";
  }

  // Services
  if (!input.services || !input.services.trim()) {
    errors.services = "Please list at least one service or product offered.";
  }

  // Address
  if (!input.address || !input.address.trim()) {
    errors.address = "Please enter your business address or landmark.";
  } else if (input.address.trim().length < 5) {
    errors.address = "Please provide a more detailed address (min 5 characters).";
  }

  // WhatsApp Number
  if (!input.whatsapp_number || !input.whatsapp_number.trim()) {
    errors.whatsapp_number = "Please enter a 10-digit WhatsApp number.";
  } else {
    const cleanPhone = normalizeIndianPhone(input.whatsapp_number);
    if (!cleanPhone) {
      errors.whatsapp_number = "Please enter a valid 10-digit Indian mobile number (e.g. 9822012345).";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Clean & sanitize slug from business name
 */
export function generateCleanSlug(name: string): string {
  const cleanName = name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .replace(/[^\w\s-]/g, "")      // strip special chars
    .replace(/[\s_-]+/g, "-")       // space/underscore to dash
    .replace(/^-+|-+$/g, "");       // trim leading/trailing dashes

  return cleanName || "my-dukaan";
}
