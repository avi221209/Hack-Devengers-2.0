import { NextRequest, NextResponse } from "next/server";
import { CreateBusinessInput, Business } from "@/lib/types";
import { generateStorefrontCopy } from "@/lib/ai";
import { saveBusiness, getBusinessBySlug } from "@/lib/store";
import { validateBusinessInput, generateCleanSlug, normalizeIndianPhone } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body: CreateBusinessInput = await req.json();

    // Server-side Validation
    const validation = validateBusinessInput(body);
    if (!validation.isValid) {
      const firstErr = Object.values(validation.errors)[0];
      return NextResponse.json({ error: firstErr }, { status: 400 });
    }

    const cleanPhone = normalizeIndianPhone(body.whatsapp_number);

    // Generate readable unique slug
    const baseSlug = generateCleanSlug(body.name);
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    let finalSlug = `${baseSlug}-${randomSuffix}`;

    const existing = await getBusinessBySlug(finalSlug);
    if (existing) {
      finalSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 8)}`;
    }

    // Generate AI copy server-side
    const aiContent = await generateStorefrontCopy(body);

    // Merge owner's custom items if supplied with AI items
    let finalServicesList = aiContent.services_list;
    if (body.custom_services && body.custom_services.length > 0) {
      finalServicesList = body.custom_services;
    }

    const newBusiness: Business = {
      id: `biz-${Date.now()}-${randomSuffix}`,
      slug: finalSlug,
      name: body.name.trim(),
      category: body.category,
      services: body.services.trim(),
      services_list: finalServicesList,
      timings: body.timings ? body.timings.trim() : "10:00 AM – 8:30 PM (Mon-Sat)",
      address: body.address.trim(),
      city: body.city?.trim() || undefined,
      state: body.state?.trim() || undefined,
      whatsapp_number: cleanPhone,
      price_range: body.price_range?.trim() || undefined,
      raw_description: body.raw_description?.trim() || undefined,
      generated_tagline: aiContent.tagline,
      generated_about: aiContent.about,
      highlight_chips: aiContent.highlight_chips,
      theme_color: body.theme_color || aiContent.theme_color || "terracotta",
      language: body.language || "en",
      views: 1,
      whatsapp_clicks: 0,
      created_at: new Date().toISOString(),
    };

    const saved = await saveBusiness(newBusiness);

    return NextResponse.json({
      success: true,
      business: saved,
      redirectUrl: `/store/${saved.slug}`,
    });
  } catch (error) {
    console.error("Error generating storefront:", error);
    return NextResponse.json(
      { error: "Failed to generate storefront. Please try again." },
      { status: 500 }
    );
  }
}
