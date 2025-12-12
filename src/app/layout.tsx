import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elvia Herbals - Pure Homemade Almond Oil | Free Shipping Across Kerala",
  description: "Elvia Herbals (elviaherbals) - 100% pure, cold-pressed, handmade almond oil from Kerala. Perfect for skin and hair care. Free shipping all over Kerala. Order your natural almond oil today!",
  keywords: [
    "Elvia Herbals",
    "elviaherbals",
    "elvia herbals",
    "almond oil Kerala",
    "pure almond oil",
    "homemade almond oil",
    "natural skincare Kerala",
    "hair oil Kerala",
    "cold pressed almond oil",
    "organic almond oil",
    "free shipping Kerala",
    "almond oil delivery Kerala",
    "handmade beauty products Kerala",
    "homemade product Kerala"
  ],
  authors: [{ name: "Elvia Herbals" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Elvia Herbals - Pure Homemade Almond Oil | Free Shipping Kerala",
    description: "100% pure, cold-pressed, handmade almond oil from Kerala. Free shipping across Kerala. Natural skincare and haircare.",
    type: "website",
    locale: "en_IN",
    siteName: "Elvia Herbals",
    url: "https://www.elviaherbals.com",
    images: [
      {
        url: "/images/product-main.jpg",
        width: 1200,
        height: 630,
        alt: "Elvia Herbals Pure Almond Oil - Handmade in Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elvia Herbals - Pure Homemade Almond Oil",
    description: "100% pure almond oil from Kerala. Free shipping all over Kerala!",
    images: ["/images/product-main.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
        <WebsiteSchema />
      </head>
      <body
        className={`${playfair.variable} ${lato.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
