import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ProductView from "@/components/ProductView";
import { ProductSchema, BreadcrumbSchema, FaqSchema } from "@/components/StructuredData";
import { PRODUCTS } from "@/lib/constants";

// Neem Oil's page is /product; every other product gets /product/<id>
const OTHER_PRODUCTS = PRODUCTS.filter((p) => p.id !== "neem-oil");

export const dynamicParams = false;

export function generateStaticParams() {
  return [...OTHER_PRODUCTS.map((p) => ({ slug: p.id })), { slug: "neem-oil" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = OTHER_PRODUCTS.find((x) => x.id === slug);
  if (!p) return {};
  const status = p.inStock ? `Rs. ${p.price}` : "Back Soon";
  const description = `${p.description.split(". ")[0]}. ${p.size}${p.inStock ? ` for Rs. ${p.price}` : " – currently out of stock, restocking soon"}. Delivery across India.`;
  return {
    title: { absolute: `${p.name} ${p.size} | ${status} | Elvia Herbals` },
    description,
    alternates: { canonical: `/product/${p.id}` },
    openGraph: {
      title: `${p.name} ${p.size} | Elvia Herbals`,
      description,
      type: "website",
      url: `/product/${p.id}`,
      siteName: "Elvia Herbals",
      locale: "en_IN",
      images: [{ url: p.image, alt: `Elvia Herbals ${p.name} ${p.size}` }],
    },
  };
}

export default async function ProductSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "neem-oil") permanentRedirect("/product");
  const p = OTHER_PRODUCTS.find((x) => x.id === slug);
  if (!p) notFound();
  const url = `https://www.elviaherbals.com/product/${p.id}`;
  return (
    <>
      <ProductSchema productId={p.id} />
      <FaqSchema productId={p.id} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.elviaherbals.com" },
          { name: p.name, url },
        ]}
      />
      <ProductView productId={p.id} />
    </>
  );
}
