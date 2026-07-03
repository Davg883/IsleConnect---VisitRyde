/**
 * POST /api/events
 * Lightweight, privacy-respecting tracking sink for trail interactions.
 * Accepts: map_opened | stop_selected | reward_clicked
 * Events are validated with Zod and logged server-side; wire this to your
 * analytics warehouse (or council reporting pipeline) as needed.
 */
import { NextRequest, NextResponse } from "next/server";
import { TrackingEventSchema } from "@/lib/seo/types";

export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const parsed = TrackingEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid event payload.", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  const event = {
    ...parsed.data,
    timestamp: parsed.data.timestamp ?? new Date().toISOString(),
  };

  console.info("[isleconnect:event]", JSON.stringify(event));
  return NextResponse.json({ accepted: true }, { status: 202 });
}
