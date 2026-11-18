'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bell, Sparkles } from 'lucide-react';
import { PRODUCTS, BRAND } from '@/lib/constants';
import { clipRevealRight } from '@/lib/motion';
import Container from '@/components/ui/Container';

export default function ComingSoonSection() {
  const almond = PRODUCTS.find((p) => p.id === 'almond-oil')!;

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#F7EFE2] border-b border-[#C9973A]/20 section-deferred">
      <Container className="relative z-10">
        <motion.div
          variants={clipRevealRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="p-8 sm:p-12 md:p-14 rounded-3xl border border-[#C9973A]/30 shadow-botanical max-w-5xl 2xl:max-w-6xl mx-auto relative overflow-hidden bg-gradient-to-r from-[#FDF6EC] via-[#FDF6EC] to-[#1E3022]/90"
        >
          {/* Subtle Scene Texture Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-multiply pointer-events-none"
            style={{ backgroundImage: `url('/images/almond-scene.webp')` }}
          />

          {/* Rotating Stamp Badge */}
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-dashed border-[#C9973A] flex items-center justify-center p-2 text-center bg-[#FDF6EC]/90 backdrop-blur-md shadow-md"
            >
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#2B1D0E] leading-tight">
                Restocking Soon
              </span>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
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

            {/* Right: Allowed Content & WhatsApp Notify (NO PRICE) */}
            <div className="md:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-1.5 text-xs text-[#C9973A] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Next Small Batch
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B1D0E]">
                Pure Almond Oil ({almond.size})
              </h3>

              <p className="text-sm sm:text-base text-[#2B1D0E]/80 leading-relaxed font-light">
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
                  className="btn-shine inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-7 py-3.5 rounded-full font-bold shadow-lg shadow-[#25D366]/25 transition-transform active:scale-95 text-xs sm:text-sm"
                >
                  <Bell className="w-4 h-4" />
                  <span>Notify Me on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
