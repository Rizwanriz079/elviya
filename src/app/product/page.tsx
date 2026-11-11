import type { Metadata } from "next";
import ProductView from "@/components/ProductView";
import { ProductSchema, BreadcrumbSchema, FaqSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: { absolute: "Buy Neem Oil 100ml Online | Neem & Virgin Coconut Oil | Elvia Herbals" },
  description:
    "Buy Elvia Herbals Neem Oil, handmade in Kerala with virgin coconut oil and neem. Helps keep the scalp clean, reduces dandruff and supports healthy hair and clear skin. 100ml for Rs. 269. Delivery across India.",
  keywords: [
    "neem oil",
    "buy neem oil online",
    "neem oil India",
    "neem oil Kerala",
    "neem oil for hair",
    "neem oil for dandruff",
    "neem oil for scalp",
    "neem oil for skin",
    "neem oil with coconut oil",
    "virgin coconut oil neem oil",
    "homemade neem oil",
    "herbal hair oil",
    "Elvia Herbals neem oil",
  ],
  alternates: { canonical: "/product" },
  openGraph: {
    title: "Neem Oil 100ml | Elvia Herbals",
    description:
      "Handmade Neem Oil with virgin coconut oil and neem, for healthy hair, scalp and skin. 100ml for Rs. 269. Delivery across India.",
    type: "website",
    url: "/product",
    siteName: "Elvia Herbals",
    locale: "en_IN",
    images: [{ url: "/images/neem-oil-og.jpg", width: 1200, height: 630, alt: "Elvia Herbals Neem Oil 100ml" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neem Oil 100ml | Elvia Herbals",
    description: "Neem & virgin coconut oil, handmade in Kerala. 100ml for Rs. 269. Delivery across India.",
    images: ["/images/neem-oil-og.jpg"],
  },
};

export default function NeemOilPage() {
  return (
    <>
      <ProductSchema productId="neem-oil" />
      <FaqSchema productId="neem-oil" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.elviaherbals.com" },
          { name: "Neem Oil", url: "https://www.elviaherbals.com/product" },
        ]}
      />
      <ProductView productId="neem-oil" />
    </>
  );
}
