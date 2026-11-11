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
  metadataBase: new URL("https://www.elviaherbals.com"),
  title: {
    default: "Elvia Herbals | Homemade Neem Oil & Herbal Oils from Kerala",
    template: "%s | Elvia Herbals",
  },
  description: "Elvia Herbals (@elviaherbals) makes pure, handmade herbal oils in Kerala. Shop our Neem Oil, made with virgin coconut oil and neem for healthy hair, scalp and skin. Order on WhatsApp with delivery across India.",
  applicationName: "Elvia Herbals",
  keywords: [
    "Elvia Herbals",
    "elviaherbals",
    "elvia herbals Kerala",
    "elvia herbal oil",
    "neem oil",
    "neem oil Kerala",
    "neem oil for hair",
    "neem oil for skin",
    "neem oil for dandruff",
    "neem and coconut oil",
    "virgin coconut oil neem oil",
    "homemade neem oil",
    "herbal hair oil Kerala",
    "homemade herbal oil Kerala",
    "pure almond oil",
    "neem oil India",
    "herbal hair oil India",
  ],
  authors: [{ name: "Elvia Herbals", url: "https://www.elviaherbals.com" }],
  creator: "Elvia Herbals",
  publisher: "Elvia Herbals",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
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
    title: "Elvia Herbals | Homemade Neem Oil & Herbal Oils from Kerala",
    description: "Pure, handmade herbal oils from Kerala. Neem Oil made with virgin coconut oil and neem for healthy hair and skin. Delivery across India. Instagram @elviaherbals.",
    type: "website",
    locale: "en_IN",
    siteName: "Elvia Herbals",
    url: "/",
    images: [
      {
        url: "/images/neem-oil-og.jpg",
        width: 1200,
        height: 630,
        alt: "Elvia Herbals Neem Oil 100ml, made with virgin coconut oil and neem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elvia Herbals | Homemade Neem Oil from Kerala",
    description: "Pure, handmade herbal oils from Kerala. Delivery across India. Instagram: @elviaherbals",
    images: ["/images/neem-oil-og.jpg"],
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
