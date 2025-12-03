"use client";

import { useState, useEffect } from "react";
import { Shield } from "lucide-react";

interface LegalPage {
  id: string;
  title: string;
  content: string;
}

const defaultContent = `<p class="text-[#8B7355]">Last updated: December 2024</p>

<section>
  <h2 class="text-xl font-bold text-[#2D1F0E] mb-4">Information We Collect</h2>
  <p class="text-[#8B7355] mb-4">When you place an order or contact us, we may collect:</p>
  <ul class="list-disc list-inside text-[#8B7355] space-y-2">
    <li>Name and contact information</li>
    <li>Delivery address</li>
    <li>Phone number and email address</li>
    <li>Order history and preferences</li>
  </ul>
</section>

<section>
  <h2 class="text-xl font-bold text-[#2D1F0E] mb-4">How We Use Your Information</h2>
  <p class="text-[#8B7355] mb-4">We use your information to:</p>
  <ul class="list-disc list-inside text-[#8B7355] space-y-2">
    <li>Process and deliver your orders</li>
    <li>Communicate about your orders</li>
    <li>Provide customer support</li>
    <li>Send promotional offers (with your consent)</li>
  </ul>
</section>

<section>
  <h2 class="text-xl font-bold text-[#2D1F0E] mb-4">Data Security</h2>
  <p class="text-[#8B7355]">
    We take reasonable measures to protect your personal information from unauthorized access,
    use, or disclosure. Your data is stored securely and is only accessed when necessary.
  </p>
</section>

<section>
  <h2 class="text-xl font-bold text-[#2D1F0E] mb-4">Contact Us</h2>
  <p class="text-[#8B7355]">
    If you have any questions about this Privacy Policy, please contact us at hello@elviaherbals.com
    or via WhatsApp at +91 92070 67522.
  </p>
</section>`;

export default function PrivacyPage() {
  const [page, setPage] = useState<LegalPage | null>(null);

  useEffect(() => {
    fetch("/api/legal/privacy")
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
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#2D1F0E]">
            {page?.title || "Privacy Policy"}
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
