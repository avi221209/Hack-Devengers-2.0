import { NextRequest, NextResponse } from "next/server";
import { getBusinessesByPhone, getRecentBusinesses } from "@/lib/store";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const phone = searchParams.get("phone");

    if (phone) {
      const results = await getBusinessesByPhone(phone);
      return NextResponse.json({ success: true, businesses: results });
    }

    const limit = parseInt(searchParams.get("limit") || "6", 10);
    const recents = await getRecentBusinesses(limit);
    return NextResponse.json({ success: true, businesses: recents });
  } catch (error) {
    console.error("Error fetching businesses:", error);
    return NextResponse.json({ error: "Failed to fetch businesses" }, { status: 500 });
  }
}
