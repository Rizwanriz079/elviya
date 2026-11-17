'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bell, Sparkles } from 'lucide-react';
import { PRODUCTS, BRAND } from '@/lib/constants';

export default function ComingSoonSection() {
  const almond = PRODUCTS.find((p) => p.id === 'almond-oil')!;

  return (
    <section className="py-24 relative overflow-hidden bg-[#F7EFE2]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#C9973A]/30 shadow-botanical max-w-4xl mx-auto relative overflow-hidden">
          {/* Rotating Stamp Badge */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 rounded-full border-2 border-dashed border-[#C9973A] flex items-center justify-center p-2 text-center bg-[#FDF6EC]/80 backdrop-blur-sm"
            >
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#2B1D0E] leading-tight">
                Restocking Soon
              </span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Greyscale Bottle in Subtle Glow */}
            <div className="md:col-span-5 flex items-center justify-center relative">
              <div className="relative w-48 sm:w-56 h-64 sm:h-72">
                <Image
                  src={almond.image}
                  alt="Pure Almond Oil 60ml - Restocking Soon"
                  fill
                  sizes="240px"
                  className="object-contain grayscale opacity-80"
                />
              </div>
            </div>

            {/* Right: Allowed Content & WhatsApp Notify */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#C9973A] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Next Small Batch
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D0E]">
                Pure Almond Oil ({almond.size})
              </h3>

              <p className="text-sm text-[#2B1D0E]/80 leading-relaxed">
                Pure Almond Oil, handmade in small batches with no chemicals or preservatives. Currently out of stock — restocking soon.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#2B1D0E]/70 py-1 font-medium">
                <span>✦ 100% Pure</span>
                <span>✦ Small Batches</span>
                <span>✦ Zero Chemicals</span>
              </div>

              <div className="pt-3">
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                    "Hi Elvia Herbals! 🌿 Please notify me when Pure Almond Oil 60ml is back in stock."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="order"
                  className="btn-shine inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-3.5 rounded-full font-semibold shadow-md shadow-[#25D366]/20 transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm"
                >
                  <Bell className="w-4 h-4" />
                  <span>Notify Me When Available</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
