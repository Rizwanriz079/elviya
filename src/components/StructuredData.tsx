import Script from "next/script";
import { BRAND, PRODUCT } from "@/lib/constants";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BRAND.name,
    "alternateName": "ELVYA",
    "url": "https://www.elviaherbals.com",
    "logo": "https://www.elviaherbals.com/images/logo.jpg",
    "description": "Elvia Herbals - Kerala's pure homemade almond oil made with traditional cold-pressed methods. Free shipping across Kerala. Natural skincare and haircare products.",
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
    "name": PRODUCT.name,
    "description": `${PRODUCT.description} Free shipping all over Kerala.`,
    "image": [
      "https://www.elviaherbals.com/images/product-main.jpg",
      "https://www.elviaherbals.com/images/product-1.jpg",
      "https://www.elviaherbals.com/images/product-2.jpg",
    ],
    "brand": {
      "@type": "Brand",
      "name": BRAND.name,
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.elviaherbals.com/product",
      "priceCurrency": "INR",
      "price": "699",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "50",
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Priya Sharma",
        },
        "datePublished": "2024-11-15",
        "reviewBody": "The best almond oil I have ever used! My skin feels so soft and my hair has never looked better. Truly homemade quality.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
        },
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Anita Patel",
        },
        "datePublished": "2024-10-20",
        "reviewBody": "I switched to Elvia Herbals almond oil 3 months ago and the difference is amazing. Pure, natural, and worth every penny!",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5",
        },
      },
    ],
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
    "description": "Kerala's pure homemade almond oil brand. Free shipping across Kerala.",
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
      "item": item.url.replace('www.elvya.in', 'www.elviaherbals.com'),
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
    "alternateName": "ELVYA",
    "url": "https://www.elviaherbals.com",
    "description": "Elvia Herbals - Pure Homemade Almond Oil from Kerala. Natural Skincare & Haircare. Free Shipping across Kerala.",
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
