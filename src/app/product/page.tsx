import type { Metadata } from "next";
import ProductView from "@/components/ProductView";
import PageTransition from "@/components/PageTransition";
import { ProductSchema, BreadcrumbSchema, FaqSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: { absolute: "Buy Neem Oil 100ml Online | Pure Neem & Virgin Coconut Oil | Elvia Herbals" },
  description:
    "Buy Elvia Herbals Pure Neem Oil 100ml, handcrafted in Kerala with virgin coconut oil and fresh neem. For clean scalp, hair care and clear skin. Flat ₹50 delivery in Kerala, delivery across India.",
  keywords: [
    "neem oil",
    "buy neem oil online",
    "neem oil India",
    "neem oil Kerala",
    "pure neem oil for hair",
    "neem oil for dandruff",
    "neem oil for scalp",
    "neem oil with virgin coconut oil",
    "homemade neem oil Kerala",
    "Elvia Herbals neem oil",
  ],
  alternates: { canonical: "/product" },
  openGraph: {
    title: "Pure Neem Oil 100ml | Elvia Herbals",
    description:
      "Handmade Neem Oil with virgin coconut oil and neem. 100ml for ₹269. Delivery across India. Order directly on WhatsApp.",
    type: "website",
    url: "/product",
    siteName: "Elvia Herbals",
    locale: "en_IN",
    images: [{ url: "/images/neem-oil-og.jpg", width: 1200, height: 630, alt: "Elvia Herbals Pure Neem Oil 100ml" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neem Oil 100ml | Elvia Herbals",
    description: "Handcrafted in Kerala with fresh neem & virgin coconut oil. ₹269 with delivery across India.",
    images: ["/images/neem-oil-og.jpg"],
  },
};

export default function NeemOilPage() {
  return (
    <PageTransition>
      <ProductSchema productId="neem-oil" />
      <FaqSchema productId="neem-oil" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.elviaherbals.com" },
          { name: "Neem Oil", url: "https://www.elviaherbals.com/product" },
        ]}
      />
      <ProductView productId="neem-oil" />
    </PageTransition>
  );
}
