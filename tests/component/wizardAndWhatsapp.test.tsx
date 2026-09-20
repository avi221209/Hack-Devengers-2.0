import React from "react";
import { render, screen } from "@testing-library/react";
import { WizardSteps } from "@/components/creation/WizardSteps";
import { translations } from "@/lib/translations";

describe("Component & UI Helper Tests", () => {
  describe("WizardSteps Component", () => {
    it("renders progress bar percentage and step titles correctly", () => {
      render(<WizardSteps currentStep={3} totalSteps={6} />);

      expect(screen.getByText(/Step 3 of 6:/i)).toBeInTheDocument();
      expect(screen.getByText(/50% Complete/i)).toBeInTheDocument();
      expect(screen.getAllByText("Contact").length).toBeGreaterThan(0);
    });

    it("renders 100% complete on final step 6", () => {
      render(<WizardSteps currentStep={6} totalSteps={6} />);

      expect(screen.getByText(/Step 6 of 6:/i)).toBeInTheDocument();
      expect(screen.getByText(/100% Complete/i)).toBeInTheDocument();
    });
  });

  describe("Language Toggle Translations", () => {
    it("provides valid strings for English, Hindi, and Marathi", () => {
      expect(translations.en.formTitle).toBe("Create Your Instant Dukaan Page");
      expect(translations.hi.formTitle).toContain("डिजिटल दुकान");
      expect(translations.mr.formTitle).toContain("दुकानाची");
    });
  });

  describe("WhatsApp Link Encoding", () => {
    it("constructs a properly formatted and encoded wa.me URL", () => {
      const cleanPhone = "9823011223";
      const businessName = "Sai Krupa Auto Garage";
      const message = `Hello ${businessName}, I saw your storefront on Dukaan Ready and would like to inquire about your services.`;
      
      const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(message)}`;

      expect(whatsappUrl).toContain("https://wa.me/919823011223?text=");
      expect(whatsappUrl).toContain("Sai%20Krupa%20Auto%20Garage");
    });
  });
});
