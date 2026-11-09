import Script from "next/script";
import { BRAND, PRODUCTS } from "@/lib/constants";

const NEEM = PRODUCTS.find((p) => p.id === "neem-oil")!;

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BRAND.name,
    "alternateName": "Elvia Herbals",
    "url": "https://www.elviaherbals.com",
    "logo": "https://www.elviaherbals.com/images/logo.jpg",
    "description": "Elvia Herbals - Kerala's pure homemade herbal oils made with traditional methods. Natural skincare and haircare products.",
    "email": BRAND.email,
    "telephone": BRAND.phone,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "Kerala",
      "addressLocality": BRAND.address,
    },
    "areaServed": {
      "@type": "State",
      "name": "Kerala",
    },
    "sameAs": [
      BRAND.instagram,
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": BRAND.phone,
      "contactType": "Customer Service",
      "availableLanguage": ["English", "Hindi", "Malayalam"],
      "areaServed": "IN-KL",
    },
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${NEEM.name} ${NEEM.size}`,
    "description": NEEM.description,
    "image": [`https://www.elviaherbals.com${NEEM.image}`],
    "brand": {
      "@type": "Brand",
      "name": BRAND.name,
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.elviaherbals.com/product",
      "priceCurrency": "INR",
      "price": String(NEEM.price),
      "availability": "https://schema.org/InStock",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": String(NEEM.deliveryCharge),
          "currency": "INR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN",
          "addressRegion": "Kerala"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "businessDays": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
          }
        }
      },
      "seller": {
        "@type": "Organization",
        "name": BRAND.name,
      },
    },
  };

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BRAND.name,
    "image": "https://www.elviaherbals.com/images/logo.jpg",
    "@id": "https://www.elviaherbals.com",
    "url": "https://www.elviaherbals.com",
    "telephone": BRAND.phone,
    "email": BRAND.email,
    "description": "Kerala's pure homemade herbal oil brand. Delivery across Kerala.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN",
      "addressRegion": "Kerala",
      "addressLocality": BRAND.address,
    },
    "areaServed": {
      "@type": "State",
      "name": "Kerala",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 10.8505,
      "longitude": 76.2711,
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00",
      },
    ],
    "priceRange": "₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "50",
    },
  };

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": BRAND.name,
    "alternateName": "Elvia Herbals",
    "url": "https://www.elviaherbals.com",
    "description": "Elvia Herbals - Pure Homemade Herbal Oils from Kerala. Natural Skincare & Haircare. Delivery across Kerala.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.elviaherbals.com/product?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
