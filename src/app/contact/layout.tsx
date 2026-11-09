import { Metadata } from "next";
import { LocalBusinessSchema, BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Contact Elvia Herbals Kerala | Order Herbal Oils on WhatsApp",
  description: "Contact Elvia Herbals for orders and inquiries about our herbal oils. WhatsApp, phone, email, Instagram. Business hours: Mon-Fri 9 AM - 6 PM. Delivery across Kerala.",
  keywords: [
    "contact Elvia Herbals",
    "buy almond oil Kerala",
    "order almond oil Kerala",
    "Elvia Herbals customer service",
    "almond oil inquiry Kerala",
    "Kerala almond oil delivery"
  ],
  openGraph: {
    title: "Contact Elvia Herbals - Kerala's Handmade Herbal Oils",
    description: "Order handmade herbal oils from Kerala. WhatsApp, phone, and email available.",
    type: "website",
    url: "https://www.elviaherbals.com/contact",
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Elvia Herbals Kerala",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Contact Elvia Herbals",
    description: "Order from Kerala | Delivery across Kerala",
    images: ["/images/logo.jpg"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://www.elviaherbals.com" },
          { name: "Contact", url: "https://www.elviaherbals.com/contact" },
        ]}
      />
      {children}
    </>
  );
}
