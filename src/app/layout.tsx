import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollEffects from "@/components/ScrollEffects";
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
  title: "Elvia Herbals - Pure Homemade Herbal Oils | Neem Oil & Almond Oil, Kerala",
  description: "Elvia Herbals (elviaherbals) - pure, handmade herbal oils from Kerala. Neem Oil made with virgin coconut oil and neem, for healthy hair and skin. Order on WhatsApp with delivery across Kerala.",
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
    "neem oil Kerala",
    "neem oil for hair",
    "virgin coconut oil neem oil",
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
    title: "Elvia Herbals - Pure Homemade Herbal Oils from Kerala",
    description: "Pure, handmade herbal oils from Kerala. Neem Oil made with virgin coconut oil and neem. Natural hair and skin care.",
    type: "website",
    locale: "en_IN",
    siteName: "Elvia Herbals",
    url: "https://www.elviaherbals.com",
    images: [
      {
        url: "/images/product-main.jpg",
        width: 1200,
        height: 630,
        alt: "Elvia Herbals - Handmade Herbal Oils from Kerala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elvia Herbals - Pure Homemade Herbal Oils",
    description: "Pure, handmade herbal oils from Kerala. Delivery across Kerala.",
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
        <ScrollEffects />
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
