import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Elvia Herbals | Data Protection",
  description: "Read Elvia Herbals' privacy policy to understand how we collect, use, and protect your personal information when you order our pure almond oil products.",
  keywords: ["privacy policy", "Elvia Herbals privacy", "data protection", "customer information"],
  openGraph: {
    title: "Privacy Policy - Elvia Herbals",
    description: "Read Elvia Herbals' privacy policy for data protection and customer information handling.",
    type: "website",
    url: "https://www.elviaherbals.com/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
