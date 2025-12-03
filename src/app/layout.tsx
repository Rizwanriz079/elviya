import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

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
  title: "ELVYA - Pure Homemade Almond Oil | Natural Skincare & Haircare",
  description: "Experience the natural goodness of 100% pure, cold-pressed, handmade almond oil. Perfect for skin, hair, and overall wellness. Made with love, no chemicals.",
  keywords: ["almond oil", "pure almond oil", "homemade almond oil", "natural skincare", "hair oil", "cold pressed", "organic"],
  authors: [{ name: "ELVYA" }],
  openGraph: {
    title: "ELVYA - Pure Homemade Almond Oil",
    description: "100% pure, cold-pressed, handmade almond oil for skin and hair",
    type: "website",
    locale: "en_IN",
    siteName: "ELVYA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
