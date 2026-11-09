import { Metadata } from "next";
import { ProductSchema, BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Buy Neem Oil 100ml - Elvia Herbals | Rs. 269 | Kerala",
  description: "Buy Elvia Herbals Neem Oil, handmade with virgin coconut oil and neem for healthy hair, a clean scalp and clear skin. 100ml for Rs. 269 + Rs. 50 delivery within Kerala.",
  keywords: [
    "buy almond oil Kerala",
    "almond oil online Kerala",
    "cold pressed almond oil",
    "Elvia Herbals almond oil",
    "almond oil for skin Kerala",
    "almond oil for hair Kerala",
    "natural almond oil",
    "vitamin e oil",
    "homemade almond oil Kerala",
    "neem oil Kerala",
    "buy neem oil online",
    "neem oil for hair and skin"
  ],
  openGraph: {
    title: "Neem Oil 100ml - Elvia Herbals",
    description: "Handmade Neem Oil with virgin coconut oil and neem. 100ml for Rs. 269. Delivery across Kerala.",
    type: "website",
    url: "https://www.elviaherbals.com/product",
    images: [
      {
        url: "/images/product-main.jpg",
        width: 1200,
        height: 630,
        alt: "Elvia Herbals Neem Oil 100ml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neem Oil 100ml - Elvia Herbals",
    description: "100ml for Rs. 269 | Delivery across Kerala",
    images: ["/images/product-main.jpg"],
  },
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProductSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.elviaherbals.com" },
          { name: "Product", url: "https://www.elviaherbals.com/product" },
        ]}
      />
      {children}
    </>
  );
}
