/**
 * GET /api/schema/:merchantId
 * Returns the nested Schema.org/LocalBusiness JSON-LD for one merchant.
 */
import { NextRequest, NextResponse } from "next/server";
import {
  EntityNotFoundError,
  generateGeoSchema,
  getMerchants,
} from "@/lib/seo/engine";

export const dynamic = "force-static";

export function generateStaticParams(): { merchantId: string }[] {
  return getMerchants().map((m) => ({ merchantId: m.id }));
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { merchantId: string } }
): Promise<NextResponse> {
  try {
    const schema = generateGeoSchema(params.merchantId);
    return NextResponse.json(schema, {
      headers: { "Content-Type": "application/ld+json" },
    });
  } catch (error) {
    if (error instanceof EntityNotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    console.error("[api/schema]", error);
    return NextResponse.json(
      { error: "Schema generation failed." },
      { status: 500 }
    );
  }
}
