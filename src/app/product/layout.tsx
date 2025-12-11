import { Metadata } from "next";
import { ProductSchema, BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Buy Pure Almond Oil - Elvia Herbals | Free Shipping Kerala | Rs. 699",
  description: "Buy Elvia Herbals pure, cold-pressed, handmade almond oil for skin and hair care. 100% natural with traditional methods. 60ml for Rs. 699 (22% OFF). Free shipping all over Kerala!",
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
    "free shipping Kerala"
  ],
  openGraph: {
    title: "Pure Almond Oil - Elvia Herbals | Free Shipping Kerala",
    description: "Buy pure, cold-pressed almond oil. 60ml for Rs. 699. Free shipping all over Kerala. Handmade with traditional methods.",
    type: "product",
    url: "https://www.elviaherbals.com/product",
    images: [
      {
        url: "https://www.elviaherbals.com/images/product-main.jpg",
        width: 1200,
        height: 630,
        alt: "Elvia Herbals Pure Almond Oil - Handmade in Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pure Almond Oil - Elvia Herbals",
    description: "60ml for Rs. 699 | Free shipping Kerala",
    images: ["https://www.elviaherbals.com/images/product-main.jpg"],
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
