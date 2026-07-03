/**
 * GET /api/merchants
 * Returns GBP-aligned merchant card DTOs for the SME Hub grid.
 */
import { NextResponse } from "next/server";
import { getMerchantCards } from "@/lib/seo/engine";

export const dynamic = "force-static";

export async function GET(): Promise<NextResponse> {
  try {
    return NextResponse.json({ merchants: getMerchantCards() });
  } catch (error) {
    console.error("[api/merchants]", error);
    return NextResponse.json(
      { error: "Merchant dataset unavailable." },
      { status: 500 }
    );
  }
}
