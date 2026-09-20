import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#c2410c",
};

export const metadata: Metadata = {
  title: "Dukaan Ready — Your Business Online in 2 Minutes",
  description:
    "AI-powered instant digital storefront generator for India's local businesses: tailors, tuition teachers, clinics, mechanics, home kitchens & beauty salons. Connect with customers directly on WhatsApp.",
  keywords: [
    "Dukaan Ready",
    "instant storefront India",
    "local business website India",
    "tailor online shop",
    "whatsapp catalog generator",
    "tuition website generator",
  ],
  openGraph: {
    title: "Dukaan Ready — Your Business Online in 2 Minutes",
    description: "Get your business online with AI, Google Maps, WhatsApp chat, and free QR poster in 120 seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FCFAF6] text-[#1C1917] antialiased selection:bg-[#FFEDD5] selection:text-[#C2410C]">
        {children}
      </body>
    </html>
  );
}
