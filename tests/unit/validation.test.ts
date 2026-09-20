import { generateCleanSlug, normalizeIndianPhone, validateBusinessInput } from "@/lib/validation";

describe("Validation & Helper Unit Tests", () => {
  describe("generateCleanSlug", () => {
    it("should convert business name to lowercase, hyphenated clean slug", () => {
      expect(generateCleanSlug("Sai Krupa Auto Garage")).toBe("sai-krupa-auto-garage");
      expect(generateCleanSlug("Aai's Home Kitchen & Tiffin")).toBe("aais-home-kitchen-tiffin");
      expect(generateCleanSlug("  Shree Ganesh   Tailors  ")).toBe("shree-ganesh-tailors");
    });

    it("should strip special diacritics and symbols", () => {
      expect(generateCleanSlug("Café & Boutique #1!")).toBe("cafe-boutique-1");
    });

    it("should return fallback slug 'my-dukaan' if string is empty or invalid", () => {
      expect(generateCleanSlug("!!!")).toBe("my-dukaan");
      expect(generateCleanSlug("")).toBe("my-dukaan");
    });
  });

  describe("normalizeIndianPhone", () => {
    it("should normalize standard 10-digit Indian numbers starting with 6-9", () => {
      expect(normalizeIndianPhone("9823011223")).toBe("9823011223");
      expect(normalizeIndianPhone("7712345678")).toBe("7712345678");
    });

    it("should strip +91 or 91 country code prefix", () => {
      expect(normalizeIndianPhone("+91 9823011223")).toBe("9823011223");
      expect(normalizeIndianPhone("91-9823011223")).toBe("9823011223");
    });

    it("should strip leading 0 prefix", () => {
      expect(normalizeIndianPhone("09823011223")).toBe("9823011223");
    });

    it("should return empty string for invalid numbers", () => {
      expect(normalizeIndianPhone("1234567890")).toBe(""); // Doesn't start with 6-9
      expect(normalizeIndianPhone("98230")).toBe("");      // Too short
      expect(normalizeIndianPhone("abcdefghij")).toBe(""); // Non-digits
    });
  });

  describe("validateBusinessInput", () => {
    it("should validate complete business inputs successfully", () => {
      const result = validateBusinessInput({
        name: "Shree Ganesh Tailors",
        category: "Tailoring",
        services: "Designer Blouses, Suit Alterations",
        address: "Shop 7, Near Ganpati Chowk, Kothrud",
        whatsapp_number: "9822012345",
      });

      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });

    it("should return errors for missing required fields", () => {
      const result = validateBusinessInput({
        name: "",
        category: undefined,
        services: "",
        address: "",
        whatsapp_number: "123",
      });

      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeDefined();
      expect(result.errors.category).toBeDefined();
      expect(result.errors.services).toBeDefined();
      expect(result.errors.address).toBeDefined();
      expect(result.errors.whatsapp_number).toBeDefined();
    });
  });
});
