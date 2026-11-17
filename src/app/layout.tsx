import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import FloatingParticles from "@/components/FloatingParticles";
import PageIntro from "@/components/PageIntro";
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.elviaherbals.com"),
  title: {
    default: "Elvia Herbals | Pure Homemade Herbal Oils from Kerala",
    template: "%s | Elvia Herbals",
  },
  description: "Elvia Herbals makes pure, handmade herbal oils in Kerala. Experience our handcrafted Neem Oil made with virgin coconut oil and fresh neem for healthy hair, scalp and clear skin. Order directly via WhatsApp with delivery across India.",
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
    title: "Elvia Herbals | Pure Homemade Herbal Oils from Kerala",
    description: "Handmade in Kerala in small batches. Pure Neem Oil with virgin coconut oil and fresh herbs. Order on WhatsApp with delivery across India.",
    type: "website",
    locale: "en_IN",
    siteName: "Elvia Herbals",
    url: "https://www.elviaherbals.com",
    images: [
      {
        url: "/images/neem-oil-og.jpg",
        width: 1200,
        height: 630,
        alt: "Elvia Herbals Pure Homemade Neem Oil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elvia Herbals | Pure Homemade Herbal Oils",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
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
