'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { PRODUCTS, getWhatsAppOrderUrl } from '@/lib/constants';
import { slideInLeft, slideInRight, fadeUp } from '@/lib/motion';

export default function FeaturedProductSection() {
  const neem = PRODUCTS.find((p) => p.id === 'neem-oil')!;
  const [activeCallout, setActiveCallout] = useState(0);

  const callouts = [
    {
      title: 'Fresh Neem Leaves',
      desc: 'Infused with fresh neem, traditionally used for healthy hair, a clean scalp and clear skin.',
      icon: '🌿',
    },
    {
      title: 'Pure Virgin Coconut Oil',
      desc: 'Cold unrefined virgin coconut oil provides deep natural hydration without chemical additives.',
      icon: '🥥',
    },
    {
      title: 'Handmade in Kerala',
      desc: 'Prepared by hand in Kerala with traditional care and patience in small batches.',
      icon: '✨',
    },
    {
      title: 'Zero Preservatives',
      desc: '100% natural botanical ingredients with no silicones, mineral oil, or synthetic fragrance.',
      icon: '🛡️',
    },
  ];

  return (
    <section id="featured" className="py-24 relative overflow-hidden bg-[#162F1D] text-[#FDF6EC]">
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(47,93,58,0.5)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-[#C9973A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE3]/15 border border-[#C9973A]/40 text-[#E0B35C] text-xs font-semibold uppercase tracking-wider mb-3 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9973A]" />
            Signature Kerala Formulation
          </motion.div>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDF6EC] mb-4"
          >
            Pure Neem Oil (100ml)
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            className="text-base sm:text-lg text-[#E8EFE3]/80"
          >
            Handmade with pure virgin coconut oil and fresh neem. For healthy hair, a clean scalp and clear skin.
          </motion.p>
        </div>

        {/* 3-Column Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: 2 Callouts (slideInLeft) */}
          <div className="lg:col-span-4 space-y-5 order-2 lg:order-1">
            {callouts.slice(0, 2).map((item, idx) => {
              const isSelected = activeCallout === idx;
              return (
                <motion.div
                  key={item.title}
                  variants={slideInLeft}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  onClick={() => setActiveCallout(idx)}
                  className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 border ${
                    isSelected
                      ? 'bg-[#2F5D3A]/80 border-[#C9973A] shadow-lg shadow-[#2F5D3A]/50 scale-[1.02]'
                      : 'bg-[#1E3F27]/70 hover:bg-[#1E3F27] border-[#C9973A]/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8EFE3]/10 flex items-center justify-center text-2xl border border-[#C9973A]/30 shrink-0">
                      <span>{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#FDF6EC]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#E8EFE3]/75 mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center Column: Sticky / Pinned Bottle & Price */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 py-4">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 flex items-center justify-center">
              {/* Outer Golden Glow Circle */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F5D3A]/50 to-transparent rounded-full blur-2xl pointer-events-none" />

              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.5)]"
              >
                <Image
                  src={neem.image}
                  alt="Pure Neem Oil 100ml"
                  fill
                  sizes="320px"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </div>

            {/* Price & Stock Pill */}
            <div className="mt-6 flex items-center gap-3 bg-[#E8EFE3]/10 border border-[#C9973A]/30 px-5 py-2.5 rounded-full backdrop-blur-sm">
              <span className="font-serif text-2xl font-bold text-[#E0B35C]">
                ₹{neem.price}
              </span>
              <span className="text-[#C9973A]">•</span>
              <span className="text-xs uppercase tracking-wider text-[#E8EFE3]/90 font-medium">
                100ml Bottle
              </span>
              <span className="text-[#C9973A]">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-[#25D366] font-semibold">
                <Check className="w-3.5 h-3.5" /> In Stock
              </span>
            </div>

            {/* Direct Order CTA */}
            <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
              <a
                href={getWhatsAppOrderUrl(neem, 'kerala')}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="order"
                className="btn-shine w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 px-6 rounded-full font-bold shadow-lg shadow-[#25D366]/30 text-sm transition-transform active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: 2 Callouts (slideInRight) */}
          <div className="lg:col-span-4 space-y-5 order-3">
            {callouts.slice(2, 4).map((item, idx) => {
              const actualIdx = idx + 2;
              const isSelected = activeCallout === actualIdx;
              return (
                <motion.div
                  key={item.title}
                  variants={slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  onClick={() => setActiveCallout(actualIdx)}
                  className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 border ${
                    isSelected
                      ? 'bg-[#2F5D3A]/80 border-[#C9973A] shadow-lg shadow-[#2F5D3A]/50 scale-[1.02]'
                      : 'bg-[#1E3F27]/70 hover:bg-[#1E3F27] border-[#C9973A]/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8EFE3]/10 flex items-center justify-center text-2xl border border-[#C9973A]/30 shrink-0">
                      <span>{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#FDF6EC]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#E8EFE3]/75 mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Delivery Assurance */}
        <div className="mt-14 pt-8 border-t border-[#C9973A]/20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#E8EFE3]/80 text-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C9973A]" />
            <span>100% Homemade</span>
          </div>
          <span className="text-[#C9973A]">•</span>
          <div className="flex items-center gap-2">
            <span>Delivery across India</span>
          </div>
          <span className="text-[#C9973A]">•</span>
          <div>
            <span>Kerala Flat ₹50</span>
          </div>
          <span className="text-[#C9973A]">•</span>
          <Link href="/product" className="text-[#E0B35C] hover:underline flex items-center gap-1 font-semibold">
            <span>View Full Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
