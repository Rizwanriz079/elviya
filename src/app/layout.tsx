import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import FloatingParticles from "@/components/FloatingParticles";
import PageIntro from "@/components/PageIntro";
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";

export const viewport: Viewport = {
  themeColor: "#2F5D3A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://elviaherbals.com"),
  title: {
    default: "Elvia Herbals | Pure Homemade Herbal Oils",
    template: "%s | Elvia Herbals",
  },
  description:
    "Pure homemade herbal oils from Kerala. Handcrafted with virgin coconut oil and fresh neem. Pure, small batches. Order on WhatsApp with India delivery.",
  applicationName: "Elvia Herbals",
  keywords: [
    "Elvia Herbals",
    "elviaherbals",
    "pure homemade neem oil",
    "herbal oil Kerala",
    "virgin coconut oil neem oil",
    "pure almond oil",
    "natural hair oil India",
    "ayurvedic homemade oil",
    "handmade herbal cosmetics Kerala",
  ],
  authors: [{ name: "Elvia Herbals", url: "https://elviaherbals.com" }],
  creator: "Elvia Herbals",
  publisher: "Elvia Herbals",
  alternates: { canonical: "https://elviaherbals.com" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Elvia Herbals | Pure Homemade Herbal Oils",
    description:
      "Pure homemade herbal oils from Kerala. Handcrafted with virgin coconut oil and fresh neem. Pure, small batches. Order on WhatsApp with India delivery.",
    type: "website",
    locale: "en_IN",
    siteName: "Elvia Herbals",
    url: "https://elviaherbals.com",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Elvia Herbals — Pure Homemade Herbal Oils",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elvia Herbals | Pure Homemade Herbal Oils",
    description:
      "Pure homemade herbal oils from Kerala. Handcrafted with virgin coconut oil and fresh neem. Pure, small batches. Order on WhatsApp with India delivery.",
    images: ["/twitter-image.png"],
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
      <body className="antialiased min-h-screen selection:bg-[#C9973A]/25 selection:text-[#1E3F27]">
        <PageIntro />
        <CustomCursor />
        <FloatingParticles />
        <SmoothScroll>
          <Header />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
