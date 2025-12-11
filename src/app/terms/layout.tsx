import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions - Elvia Herbals | Legal Terms",
  description: "Read Elvia Herbals' terms and conditions for ordering our pure almond oil products. Learn about orders, payments, shipping, returns, and refunds.",
  keywords: ["terms and conditions", "Elvia Herbals terms", "return policy", "shipping policy"],
  openGraph: {
    title: "Terms & Conditions - Elvia Herbals",
    description: "Read Elvia Herbals' terms and conditions for product orders and services.",
    type: "website",
    url: "https://www.elviaherbals.com/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
