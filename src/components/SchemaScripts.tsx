/**
 * Server component: injects the engine-generated Schema.org/LocalBusiness
 * JSON-LD for every partner into the document, mirroring what
 * GET /api/schema/:merchantId serves to external consumers.
 */
import { generateGeoSchema, getMerchants } from "@/lib/seo/engine";

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
    </>
  );
}
