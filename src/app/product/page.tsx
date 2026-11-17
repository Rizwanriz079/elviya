import type { Metadata } from "next";
import ProductView from "@/components/ProductView";
import PageTransition from "@/components/PageTransition";
import { ProductSchema, BreadcrumbSchema, FaqSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Pure Neem Oil 100ml",
  description:
    "Handmade Pure Neem Oil 100ml from Kerala. Pure virgin coconut oil and fresh neem for hair, scalp and skin. Rs.269. Order directly via WhatsApp.",
  alternates: { canonical: "https://elviaherbals.com/product" },
  openGraph: {
    title: "Pure Neem Oil 100ml | Elvia Herbals",
    description:
      "Handmade Pure Neem Oil 100ml from Kerala. Pure virgin coconut oil and fresh neem for hair, scalp and skin. Rs.269. Order directly via WhatsApp.",
    type: "website",
    url: "https://elviaherbals.com/product",
    siteName: "Elvia Herbals",
    locale: "en_IN",
    images: [{ url: "/product/opengraph-image.png", width: 1200, height: 630, alt: "Elvia Herbals Pure Neem Oil 100ml" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pure Neem Oil 100ml | Elvia Herbals",
    description:
      "Handmade Pure Neem Oil 100ml from Kerala. Pure virgin coconut oil and fresh neem for hair, scalp and skin. Rs.269. Order directly via WhatsApp.",
    images: ["/product/twitter-image.png"],
  },
};

export default function NeemOilPage() {
  return (
    <PageTransition>
      <ProductSchema productId="neem-oil" />
      <FaqSchema productId="neem-oil" />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://elviaherbals.com" },
          { name: "Neem Oil", url: "https://elviaherbals.com/product" },
        ]}
      />
      <ProductView productId="neem-oil" />
    </PageTransition>
  );
}
