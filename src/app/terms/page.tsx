import type { Metadata } from "next";
import { FileText } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Elvia Herbals. Information on small-batch handmade production, WhatsApp ordering, and delivery across India from Kerala.",
  alternates: { canonical: "https://elviaherbals.com/terms" },
  openGraph: {
    title: "Terms of Service | Elvia Herbals",
    description:
      "Terms of Service for Elvia Herbals. Information on small-batch handmade production, WhatsApp ordering, and delivery across India.",
    url: "https://elviaherbals.com/terms",
    siteName: "Elvia Herbals",
    locale: "en_IN",
  },
};

const defaultContent = `
<p class="text-[#2B1D0E]/70 text-sm">Last updated: November 2026</p>

<section class="space-y-3">
  <h2 class="font-serif text-xl font-bold text-[#2F5D3A]">1. Acceptance of Terms</h2>
  <p class="text-[#2B1D0E]/80 text-sm leading-relaxed">
    By accessing the Elvia Herbals website and purchasing our natural handmade oils, you acknowledge and agree to these terms of service.
  </p>
</section>

<section class="space-y-3">
  <h2 class="font-serif text-xl font-bold text-[#2F5D3A]">2. Handmade Formulation & Variations</h2>
  <p class="text-[#2B1D0E]/80 text-sm leading-relaxed">
    All products sold by Elvia Herbals are natural, handmade herbal oils prepared in small artisan batches in Kerala. Because we use virgin cold-pressed coconut oil and fresh harvest neem without artificial dyes, slight natural variations in herbal aroma or color between seasonal batches are normal and a hallmark of authentic purity. In colder weather, virgin coconut oil may naturally solidify; gently submerge the bottle in warm water to restore liquid state.
  </p>
</section>

<section class="space-y-3">
  <h2 class="font-serif text-xl font-bold text-[#2F5D3A]">3. Ordering & WhatsApp Payments</h2>
  <p class="text-[#2B1D0E]/80 text-sm leading-relaxed">
    Orders are placed and confirmed directly through WhatsApp. We accept UPI payments (GPay, PhonePe, Paytm, BHIM) and direct IMPS bank transfer. Orders are dispatched once payment confirmation is verified.
  </p>
</section>

<section class="space-y-3">
  <h2 class="font-serif text-xl font-bold text-[#2F5D3A]">4. Shipping & Delivery Terms</h2>
  <p class="text-[#2B1D0E]/80 text-sm leading-relaxed">
    We ship across India using trusted express courier services:
  </p>
  <ul class="list-disc list-inside text-[#2B1D0E]/80 space-y-1.5 text-sm pl-2">
    <li><strong>Within Kerala:</strong> Flat ₹50 delivery charge per order.</li>
    <li><strong>Rest of India:</strong> Delivery charge confirmed directly on WhatsApp before dispatch.</li>
  </ul>
</section>

<section class="space-y-3">
  <h2 class="font-serif text-xl font-bold text-[#2F5D3A]">5. Returns & Damaged Shipments</h2>
  <p class="text-[#2B1D0E]/80 text-sm leading-relaxed">
    Because our oils are personal care products without chemical preservatives, we do not accept returns once opened. However, if a bottle arrives damaged in transit or compromised, please message us on WhatsApp with an unboxing photo within 48 hours for immediate replacement or full refund.
  </p>
</section>

<section class="space-y-3">
  <h2 class="font-serif text-xl font-bold text-[#2F5D3A]">6. Contact Information</h2>
  <p class="text-[#2B1D0E]/80 text-sm leading-relaxed">
    For questions or support: email elviaherbals@gmail.com or WhatsApp +91 92070 67522.
  </p>
</section>
`;

export default function TermsPage() {
  return (
    <PageTransition>
      <div className="min-h-screen py-20">
        <Container className="max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EFE3] border border-[#4C8C4A]/30 flex items-center justify-center text-[#2F5D3A]">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9973A]">
                Guidelines
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D0E]">
                Terms & Conditions
              </h1>
            </div>
          </div>

          <div
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#C9973A]/25 shadow-botanical space-y-8"
            dangerouslySetInnerHTML={{ __html: defaultContent }}
          />
        </Container>
      </div>
    </PageTransition>
  );
}
