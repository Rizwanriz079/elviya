'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bell, Sparkles } from 'lucide-react';
import { PRODUCTS, getWhatsAppOrderUrl } from '@/lib/constants';

export default function ComingSoonSection() {
  const almond = PRODUCTS.find((p) => p.id === 'almond-oil')!;

  return (
    <section className="py-20 relative overflow-hidden bg-[#F7EFE2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#C9973A]/30 shadow-botanical max-w-4xl mx-auto relative overflow-hidden">
          {/* Restocking Soon Diagonal Ribbon */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
            <span className="px-4 py-1.5 rounded-full bg-[#2B1D0E] text-[#E0B35C] text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-[#C9973A]/40">
              <span className="w-2 h-2 rounded-full bg-[#E0B35C] animate-ping" />
              Restocking Soon
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Greyscale / Soft Blur Bottle */}
            <div className="md:col-span-5 flex items-center justify-center relative">
              <div className="relative w-48 sm:w-56 h-64 sm:h-72">
                <Image
                  src={almond.image}
                  alt="Pure Almond Oil 60ml - Coming Soon"
                  fill
                  sizes="240px"
                  className="object-contain grayscale opacity-80 filter blur-[0.5px] hover:blur-none hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Right: Content & Notify CTA */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#C9973A] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Next Small Batch Harvest
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D0E]">
                Pure Sweet Almond Oil (60ml)
              </h3>

              <p className="text-sm text-[#2B1D0E]/80 leading-relaxed">
                100% cold-pressed from premium sweet almonds without heat or refining chemicals. Rich in natural Vitamin E to nourish skin luminosity and lock in hair softness.
              </p>

              <div className="flex items-center gap-3 text-xs text-[#2B1D0E]/70 py-1">
                <span>✦ Cold-Pressed Ghani Method</span>
                <span>✦ Zero Mineral Oils</span>
              </div>

              {/* Notify Me WhatsApp Button */}
              <div className="pt-2">
                <a
                  href={getWhatsAppOrderUrl(almond)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 rounded-full font-semibold shadow-md shadow-[#25D366]/25 transition-all hover:scale-105 active:scale-95 text-sm"
                >
                  <Bell className="w-4 h-4 fill-current" />
                  <span>Notify Me on WhatsApp When Available</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
