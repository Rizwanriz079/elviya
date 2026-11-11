import { BRAND, PRODUCTS, type CatalogProduct } from "@/lib/constants";

const SITE = "https://www.elviaherbals.com";
const ORG_ID = `${SITE}/#organization`;

/** We deliver within India only. (The website itself can be found from any country.) */
const AREA_SERVED = { "@type": "Country", name: "India" };

const productPath = (p: CatalogProduct) => (p.id === "neem-oil" ? "/product" : `/product/${p.id}`);

/** Names people might type when searching for the brand. */
const BRAND_NAMES = ["elviaherbals", "Elvia Herbal", "Elvia Herbals Kerala", "Elvia"];

/** Renders JSON-LD in the server HTML so every search engine sees it without running JavaScript. */
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORG_ID,
        name: BRAND.name,
        alternateName: BRAND_NAMES,
        url: SITE,
        logo: `${SITE}/images/logo.jpg`,
        image: `${SITE}/images/neem-oil-og.jpg`,
        description:
          "Elvia Herbals (@elviaherbals on Instagram) is a Kerala brand making pure, handmade herbal oils, including Neem Oil made with virgin coconut oil and neem. Delivery across India.",
        email: BRAND.email,
        telephone: BRAND.phone,
        address: {
          "@type": "PostalAddress",
          addressRegion: "Kerala",
          addressCountry: "IN",
        },
        areaServed: AREA_SERVED,
        sameAs: [BRAND.instagram, `https://wa.me/${BRAND.whatsapp}`],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: BRAND.phone,
          contactType: "customer service",
          availableLanguage: ["English", "Malayalam"],
          areaServed: "IN",
        },
      }}
    />
  );
}

export function WebsiteSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        name: BRAND.name,
        alternateName: BRAND_NAMES,
        url: SITE,
        inLanguage: "en-IN",
        publisher: { "@id": ORG_ID },
      }}
    />
  );
}

export function ProductSchema({ productId }: { productId: string }) {
  const p = PRODUCTS.find((x) => x.id === productId)!;
  const url = `${SITE}${productPath(p)}`;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": `${url}#product`,
        name: `Elvia Herbals ${p.name} ${p.size}`,
        description: p.description,
        sku: `ELVIA-${p.id.toUpperCase()}-${p.size.toUpperCase()}`,
        category: "Hair Oil",
        url,
        image: p.id === "neem-oil" ? [`${SITE}${p.image}`, `${SITE}/images/neem-oil-og.jpg`] : [`${SITE}${p.image}`],
        brand: { "@type": "Brand", name: BRAND.name },
        manufacturer: { "@id": ORG_ID },
        material: p.ingredients.filter((i) => !i.startsWith("No ")).join(", "),
        size: p.size,
        offers: {
          "@type": "Offer",
          url,
          priceCurrency: "INR",
          price: String(p.price),
          // Out-of-stock products stay indexed; flip `inStock` in constants.ts when restocked
          availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@id": ORG_ID },
          areaServed: AREA_SERVED,
          // Only Kerala has a fixed rate; other locations are quoted on WhatsApp
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: { "@type": "MonetaryAmount", value: String(p.deliveryCharge), currency: "INR" },
            shippingDestination: { "@type": "DefinedRegion", addressCountry: "IN", addressRegion: "KL" },
          },
        },
      }}
    />
  );
}

export function FaqSchema({ productId }: { productId: string }) {
  const p = PRODUCTS.find((x) => x.id === productId)!;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: p.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

export function LocalBusinessSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Store",
        "@id": `${SITE}/#store`,
        name: BRAND.name,
        alternateName: BRAND_NAMES,
        url: SITE,
        image: `${SITE}/images/logo.jpg`,
        telephone: BRAND.phone,
        email: BRAND.email,
        description: "Kerala's homemade herbal oil brand. Order Neem Oil on WhatsApp with delivery across India.",
        address: { "@type": "PostalAddress", addressRegion: "Kerala", addressCountry: "IN" },
        areaServed: AREA_SERVED,
        sameAs: [BRAND.instagram],
        parentOrganization: { "@id": ORG_ID },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
      }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
