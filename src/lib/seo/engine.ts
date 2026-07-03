/**
 * src/lib/seo/engine.ts
 * Server-side engine consumed by the API routes and the JSON-LD injector.
 * All proximity claims are computed via the Haversine formula against the
 * verified landmark dataset — never hand-typed.
 */

import landmarksRaw from "./data/landmarks.json";
import merchantsRaw from "./data/merchants.json";
import {
  Coordinate,
  Landmark,
  LandmarkDatasetSchema,
  Merchant,
  MerchantCardDTO,
  MerchantDatasetSchema,
} from "./types";

/* ---------------------------------------------------------------- errors */

export class DatasetError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatasetError";
  }
}

export class EntityNotFoundError extends Error {
  constructor(entityType: "merchant" | "landmark", id: string) {
    super(`${entityType} not found: "${id}"`);
    this.name = "EntityNotFoundError";
  }
}

/* ------------------------------------------------------- validated data */

let landmarkCache: Landmark[] | null = null;
let merchantCache: Merchant[] | null = null;

export function getLandmarks(): Landmark[] {
  if (landmarkCache) return landmarkCache;
  const parsed = LandmarkDatasetSchema.safeParse(landmarksRaw);
  if (!parsed.success) {
    throw new DatasetError(
      `landmarks.json failed schema validation:\n${parsed.error.message}`
    );
  }
  landmarkCache = parsed.data;
  return landmarkCache;
}

export function getMerchants(): Merchant[] {
  if (merchantCache) return merchantCache;
  const parsed = MerchantDatasetSchema.safeParse(merchantsRaw);
  if (!parsed.success) {
    throw new DatasetError(
      `merchants.json failed schema validation:\n${parsed.error.message}`
    );
  }
  const landmarkIds = new Set(getLandmarks().map((l) => l.id));
  for (const merchant of parsed.data) {
    for (const ref of merchant.nearbyLandmarks) {
      if (!landmarkIds.has(ref.landmarkId)) {
        throw new DatasetError(
          `Merchant "${merchant.id}" references unknown landmark "${ref.landmarkId}".`
        );
      }
    }
  }
  merchantCache = parsed.data;
  return merchantCache;
}

export function getMerchantById(merchantId: string): Merchant {
  const merchant = getMerchants().find((m) => m.id === merchantId);
  if (!merchant) throw new EntityNotFoundError("merchant", merchantId);
  return merchant;
}

function getLandmarkById(landmarkId: string): Landmark {
  const landmark = getLandmarks().find((l) => l.id === landmarkId);
  if (!landmark) throw new EntityNotFoundError("landmark", landmarkId);
  return landmark;
}

/* ------------------------------------------------------------- haversine */

const EARTH_RADIUS_MILES = 3958.7613;
const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export function calculateHaversineDistance(
  coord1: Coordinate,
  coord2: Coordinate
): number {
  const dLat = toRadians(coord2.lat - coord1.lat);
  const dLng = toRadians(coord2.lng - coord1.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(coord1.lat)) *
      Math.cos(toRadians(coord2.lat)) *
      Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_MILES * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function formatDistance(miles: number): string {
  if (miles < 0.1) {
    const yards = Math.round((miles * 1760) / 10) * 10;
    return `${Math.max(yards, 10)} yards`;
  }
  return `${(Math.round(miles * 100) / 100).toFixed(2)} miles`;
}

/* ---------------------------------------------------- landmark proximity */

interface RankedLandmark {
  landmark: Landmark;
  distanceMiles: number;
  customDescription?: string;
}

function rankLandmarksByProximity(merchant: Merchant): RankedLandmark[] {
  return merchant.nearbyLandmarks
    .map((ref) => {
      const landmark = getLandmarkById(ref.landmarkId);
      return {
        landmark,
        distanceMiles: calculateHaversineDistance(
          merchant.coordinate,
          landmark.coordinate
        ),
        customDescription: ref.customDescription,
      };
    })
    .sort((a, b) => a.distanceMiles - b.distanceMiles);
}

/* ---------------------------------------------------------------- JSON-LD */

export function generateGeoSchema(merchantId: string): Record<string, unknown> {
  const merchant = getMerchantById(merchantId);
  const rankedLandmarks = rankLandmarksByProximity(merchant);

  if (rankedLandmarks.length === 0) {
    throw new DatasetError(
      `Merchant "${merchant.id}" has no nearbyLandmarks; at least one verified landmark is required.`
    );
  }

  const nearest = rankedLandmarks[0];
  const primaryCategory = merchant.categories.find((c) => c.primary)!;
  const secondaryCategories = merchant.categories.filter((c) => !c.primary);
  const proximityStatement = `Located ${formatDistance(
    nearest.distanceMiles
  )} from ${nearest.landmark.name}.`;

  const geoCoordinates = {
    "@type": "GeoCoordinates",
    latitude: merchant.coordinate.lat,
    longitude: merchant.coordinate.lng,
  };

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": merchant.url ?? `https://visitryde.uk/merchants/${merchant.id}`,
    name: merchant.name,
    description: `${merchant.name} is a ${primaryCategory.name.toLowerCase()} in Ryde, Isle of Wight. ${proximityStatement}`,
    url: merchant.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: merchant.address,
      addressLocality: "Ryde",
      addressRegion: "Isle of Wight",
      addressCountry: "GB",
    },
    geo: geoCoordinates,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${merchant.name} ${merchant.address}`
    )}`,
    additionalType: secondaryCategories.map((c) => c.name),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${merchant.name} — ${primaryCategory.name} Services`,
      itemListElement: merchant.categories.flatMap((category) =>
        category.services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            serviceType: category.name,
          },
        }))
      ),
    },
    areaServed: {
      "@type": "Place",
      name: `Ryde town centre and seafront, near ${nearest.landmark.name}`,
      geo: {
        "@type": "GeoCircle",
        geoMidpoint: geoCoordinates,
        geoRadius: "1609",
      },
    },
    knowsAbout: rankedLandmarks.map(
      ({ landmark, distanceMiles, customDescription }) => ({
        "@type": "Place",
        name: landmark.name,
        url: landmark.googleMapsUrl,
        geo: {
          "@type": "GeoCoordinates",
          latitude: landmark.coordinate.lat,
          longitude: landmark.coordinate.lng,
        },
        description:
          customDescription ??
          `${landmark.name} is ${formatDistance(distanceMiles)} from ${merchant.name}.`,
      })
    ),
    slogan: proximityStatement,
  };
}

/* --------------------------------------------------------- merchant DTOs */

/**
 * Editorial layer for the SME Hub cards. Taglines and coupon codes are
 * presentation data; the underlying entity facts always come from the
 * validated GBP-aligned dataset.
 */
const MERCHANT_PRESENTATION: Record<
  string,
  { tagline: string; couponCode: string }
> = {
  cibo: {
    tagline:
      "Contemporary Mediterranean dining. Partner of the Dover Street Trail Node.",
    couponCode: "CIBO1862RYDE",
  },
  fumo33: {
    tagline: "Signature wood-fired theatre and cocktails on Union Street.",
    couponCode: "FUMO1862DRINK",
  },
  "smugglers-cellar": {
    tagline:
      "Cozy, subterranean craft ale bar located within the historic Ryde Colonnade.",
    couponCode: "CROWN1862EMPIRE",
  },
  "appley-beach-cafe": {
    tagline: "Beachfront breakfasts and burgers beside Appley Tower.",
    couponCode: "APPLEY1862SHORE",
  },
};

export function getMerchantCards(): MerchantCardDTO[] {
  return getMerchants().map((merchant) => {
    const nearest = rankLandmarksByProximity(merchant)[0];
    const primaryCategory = merchant.categories.find((c) => c.primary)!;
    const presentation = MERCHANT_PRESENTATION[merchant.id] ?? {
      tagline: `${primaryCategory.name} in Ryde, Isle of Wight.`,
      couponCode: `${merchant.id.toUpperCase().replace(/-/g, "")}1862`,
    };

    return {
      id: merchant.id,
      name: merchant.name,
      primaryCategory: primaryCategory.name,
      services: merchant.categories.flatMap((c) =>
        c.services.map((s) => s.name)
      ),
      address: merchant.address,
      tagline: presentation.tagline,
      couponCode: presentation.couponCode,
      nearestLandmark: {
        name: nearest.landmark.name,
        distanceLabel: formatDistance(nearest.distanceMiles),
      },
    };
  });
}
