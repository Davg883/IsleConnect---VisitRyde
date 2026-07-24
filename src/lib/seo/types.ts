/**
 * src/lib/seo/types.ts
 * Canonical Zod schemas for the IsleConnect entity-based Local SEO / GEO layer.
 * Mirrors the visitryde-seo backend module so both codebases share one contract.
 */

import { z } from "zod";

export const CoordinateSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});
export type Coordinate = z.infer<typeof CoordinateSchema>;

export const LandmarkSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  coordinate: CoordinateSchema,
  googleMapsUrl: z.string().url(),
});
export type Landmark = z.infer<typeof LandmarkSchema>;

export const GBPServiceSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
});
export type GBPService = z.infer<typeof GBPServiceSchema>;

export const GBPCategorySchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  primary: z.boolean(),
  name: z.string().min(1),
  services: z.array(GBPServiceSchema),
});
export type GBPCategory = z.infer<typeof GBPCategorySchema>;

export const NearbyLandmarkRefSchema = z.object({
  landmarkId: z.string().min(1),
  customDescription: z.string().min(1).optional(),
});
export type NearbyLandmarkRef = z.infer<typeof NearbyLandmarkRefSchema>;

export const MerchantSchema = z
  .object({
    id: z.string().min(1).regex(/^[a-z0-9-]+$/),
    name: z.string().min(1),
    address: z.string().min(1),
    url: z.string().url().optional(),
    coordinate: CoordinateSchema,
    categories: z.array(GBPCategorySchema).min(1),
    nearbyLandmarks: z.array(NearbyLandmarkRefSchema),
    /** Story trails this venue fits; validated against the trail dataset. */
    trailIds: z.array(z.string().min(1)).optional().default([]),
  })
  .superRefine((merchant, ctx) => {
    const primaryCount = merchant.categories.filter((c) => c.primary).length;
    if (primaryCount !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Merchant "${merchant.id}" must have exactly one primary GBP category (found ${primaryCount}).`,
        path: ["categories"],
      });
    }
  });
export type Merchant = z.infer<typeof MerchantSchema>;

export const LandmarkDatasetSchema = z.array(LandmarkSchema).min(1);
export const MerchantDatasetSchema = z.array(MerchantSchema).min(1);

/** Lightweight analytics event contract for /api/events. */
export const TrackingEventSchema = z.object({
  type: z.enum([
    "page_opened",
    "map_opened",
    "stop_selected",
    "story_started",
    "story_completed",
    "nearby_places_viewed",
    "worked_example_viewed",
    "offer_opened",
    "directions_clicked",
    "menu_clicked",
    "booking_clicked",
    "trail_selected",
    "sponsor_enquiry",
  ]),
  merchantId: z.string().min(1).optional(),
  stopId: z.string().min(1).optional(),
  trailId: z.string().min(1).optional(),
  timestamp: z.string().datetime().optional(),
  meta: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])).optional(),
});
export type TrackingEvent = z.infer<typeof TrackingEventSchema>;


/* ========================================================================== */
/* Story trails                                                               */
/* ========================================================================== */

/**
 * Honest status labelling is a hard requirement: trails are chapters at
 * different stages, never presented as uniformly finished products.
 */
export const TrailStatusSchema = z.enum([
  "live-prototype",
  "in-development",
  "concept",
]);
export type TrailStatus = z.infer<typeof TrailStatusSchema>;

export const TrailMediaSchema = z.object({
  type: z.enum(["image", "video", "concept"]),
  src: z.string().min(1).nullable(),
  alt: z.string().min(1),
});

export const TrailSchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  anchor: z.string().min(1).regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  subtitle: z.string().min(1),
  status: TrailStatusSchema,
  statusLabel: z.string().min(1),
  description: z.string().min(1),
  bestFor: z.string().min(1),
  partnerFit: z.string().min(1),
  routePurpose: z.string().min(1),
  playableNote: z.string().min(1),
  /** Landmark ids forming the indicative route; validated referentially. */
  sampleStops: z.array(z.string().min(1)).min(1),
  media: TrailMediaSchema,
  playable: z.boolean(),
});
export type Trail = z.infer<typeof TrailSchema>;

export const TrailDatasetSchema = z.array(TrailSchema).min(1);

/**
 * Envelope for cross-origin postMessage events tunnelled from the embedded
 * trail app (cody-tours.vercel.app) to the parent page. Both the origin AND
 * this structure are validated before anything reaches /api/events.
 */
export const BridgeMessageSchema = z.object({
  type: z.literal("ISLECONNECT_IFRAME_EVENT"),
  payload: z.object({
    event: z.enum([
      "page_opened",
      "map_opened",
      "stop_selected",
      "story_started",
      "story_completed",
      "nearby_places_viewed",
      "worked_example_viewed",
      "offer_opened",
      "directions_clicked",
      "menu_clicked",
      "booking_clicked",
      "trail_selected",
      "sponsor_enquiry",
    ]),
    metadata: z
      .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
      .optional(),
  }),
});
export type BridgeMessage = z.infer<typeof BridgeMessageSchema>;

/** Shape returned to the SME Hub cards by GET /api/merchants. */
export interface MerchantCardDTO {
  id: string;
  name: string;
  primaryCategory: string;
  services: string[];
  address: string;
  tagline: string;
  couponCode: string;
  nearestLandmark: {
    name: string;
    distanceLabel: string;
  };
}
