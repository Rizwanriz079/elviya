import { Shield } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const defaultContent = `
<p class="text-[#2B1D0E]/70 text-sm">Last updated: November 2026</p>

<section class="space-y-3">
  <h2 class="font-serif text-xl font-bold text-[#2F5D3A]">1. Information We Collect</h2>
  <p class="text-[#2B1D0E]/80 text-sm leading-relaxed">When you place an order or contact us directly via WhatsApp or email, we collect only necessary fulfillment information:</p>
  <ul class="list-disc list-inside text-[#2B1D0E]/80 space-y-1.5 text-sm pl-2">
    <li>Full Name & delivery address with pincode</li>
    <li>Phone / WhatsApp contact number</li>
    <li>Product order selections and preferences</li>
  </ul>
</section>

<section class="space-y-3">
  <h2 class="font-serif text-xl font-bold text-[#2F5D3A]">2. How We Use Your Information</h2>
  <p class="text-[#2B1D0E]/80 text-sm leading-relaxed">We use your information strictly for artisan fulfillment:</p>
  <ul class="list-disc list-inside text-[#2B1D0E]/80 space-y-1.5 text-sm pl-2">
    <li>To prepare, package, and dispatch your handmade herbal oil</li>
    <li>To share express courier tracking details via WhatsApp</li>
    <li>To address customer care questions directly</li>
  </ul>
</section>

<section class="space-y-3">
  <h2 class="font-serif text-xl font-bold text-[#2F5D3A]">3. Data Privacy & Zero Third-Party Selling</h2>
  <p class="text-[#2B1D0E]/80 text-sm leading-relaxed">
    We do not sell, rent, or trade your personal contact details to external marketing agencies or brokers. Your contact details remain confidential with Elvia Herbals for order processing only.
  </p>
</section>

<section class="space-y-3">
  <h2 class="font-serif text-xl font-bold text-[#2F5D3A]">4. Contact Our Team</h2>
  <p class="text-[#2B1D0E]/80 text-sm leading-relaxed">
    If you have any questions regarding your information or wish to delete order records, please message us at elviaherbals@gmail.com or via WhatsApp at +91 92070 67522.
  </p>
</section>
`;

export default function PrivacyPage() {
  return (
    <PageTransition>
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EFE3] border border-[#4C8C4A]/30 flex items-center justify-center text-[#2F5D3A]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9973A]">
                Customer Protection
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D0E]">
                Privacy Policy
              </h1>
            </div>
          </div>

          <div
            className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#C9973A]/25 shadow-botanical space-y-8"
            dangerouslySetInnerHTML={{ __html: defaultContent }}
          />
        </div>
      </div>
    </PageTransition>
  );
}
