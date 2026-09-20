import { NextRequest, NextResponse } from "next/server";
import { getBusinessBySlug } from "@/lib/store";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const business = await getBusinessBySlug(slug);

    if (!business) {
      return NextResponse.json({ error: "Storefront not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, business });
  } catch (error) {
    console.error("Error fetching storefront:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
