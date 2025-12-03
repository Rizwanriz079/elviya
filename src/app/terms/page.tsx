"use client";

import { useState, useEffect } from "react";
import { FileText } from "lucide-react";

interface LegalPage {
  id: string;
  title: string;
  content: string;
}

const defaultContent = `<p class="text-[#8B7355]">Last updated: December 2024</p>

<section>
  <h2 class="text-xl font-bold text-[#2D1F0E] mb-4">1. Acceptance of Terms</h2>
  <p class="text-[#8B7355]">
    By accessing and using the Elvia Herbals website and purchasing our products, you agree to be bound
    by these Terms and Conditions. If you do not agree with any part of these terms, please do
    not use our services.
  </p>
</section>

<section>
  <h2 class="text-xl font-bold text-[#2D1F0E] mb-4">2. Products</h2>
  <p class="text-[#8B7355]">
    All products sold by Elvia Herbals are 100% pure, cold-pressed almond oil. We make every effort to
    accurately display product colors and images, but actual products may vary slightly. Product
    availability and prices are subject to change without notice.
  </p>
</section>

<section>
  <h2 class="text-xl font-bold text-[#2D1F0E] mb-4">3. Orders and Payment</h2>
  <p class="text-[#8B7355] mb-4">
    Orders are placed through WhatsApp. Payment can be made via:
  </p>
  <ul class="list-disc list-inside text-[#8B7355] space-y-2">
    <li>UPI / Google Pay / PhonePe</li>
    <li>Bank Transfer</li>
    <li>Cash on Delivery (where available)</li>
  </ul>
</section>

<section>
  <h2 class="text-xl font-bold text-[#2D1F0E] mb-4">4. Shipping and Delivery</h2>
  <p class="text-[#8B7355]">
    We deliver across India. Delivery times vary by location and typically take 3-7 business days.
    Shipping charges may apply based on your location and order value.
  </p>
</section>

<section>
  <h2 class="text-xl font-bold text-[#2D1F0E] mb-4">5. Returns and Refunds</h2>
  <p class="text-[#8B7355]">
    Due to the nature of our products, we only accept returns for damaged or defective items.
    Please contact us within 48 hours of receiving your order if you have any issues. Refunds
    will be processed within 7-10 business days.
  </p>
</section>

<section>
  <h2 class="text-xl font-bold text-[#2D1F0E] mb-4">6. Contact</h2>
  <p class="text-[#8B7355]">
    For any questions regarding these terms, please contact us at hello@elviaherbals.com
    or via WhatsApp at +91 92070 67522.
  </p>
</section>`;

export default function TermsPage() {
  const [page, setPage] = useState<LegalPage | null>(null);

  useEffect(() => {
    fetch("/api/legal/terms")
      .then(res => res.json())
      .then(data => {
        if (data.page) setPage(data.page);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF5E6] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#2D1F0E]">
            {page?.title || "Terms & Conditions"}
          </h1>
        </div>

        <div
          className="card p-8 space-y-8 [&>section]:space-y-4"
          dangerouslySetInnerHTML={{ __html: page?.content || defaultContent }}
        />
      </div>
    </div>
  );
}
