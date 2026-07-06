/**
 * Server component: injects the engine-generated Schema.org/LocalBusiness
 * and TouristTrip JSON-LD into the document.
 */
import {
  generateGeoSchema,
  generateTrailSchema,
  getMerchants,
  getTrails,
} from "@/lib/seo/engine";

export default function SchemaScripts() {
  const merchants = getMerchants();
  return (
    <>
      {merchants.map((merchant) => (
        <script
          key={merchant.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateGeoSchema(merchant.id)),
          }}
        />
      ))}
      {getTrails().map((trail) => (
        <script
          key={trail.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateTrailSchema(trail.id)),
          }}
        />
      ))}
    </>
  );
}
