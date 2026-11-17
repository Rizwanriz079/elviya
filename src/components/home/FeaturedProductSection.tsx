'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS, getWhatsAppOrderUrl } from '@/lib/constants';

export default function FeaturedProductSection() {
  const neem = PRODUCTS.find((p) => p.id === 'neem-oil')!;
  const [activeCallout, setActiveCallout] = useState(0);

  const callouts = [
    {
      title: 'Fresh Neem',
      desc: 'Infused with fresh neem, traditionally used for healthy hair, a clean scalp and clear skin.',
      icon: '🌿',
    },
    {
      title: 'Virgin Coconut Oil',
      desc: 'Pure virgin coconut oil provides deep natural nourishment for hair and skin.',
      icon: '🥥',
    },
    {
      title: 'Handmade in Kerala',
      desc: 'Prepared by hand in Kerala with traditional care and zero added chemicals.',
      icon: '✨',
    },
    {
      title: 'Small Batches',
      desc: 'Made in small batches with no preservatives to ensure fresh quality.',
      icon: '🏺',
    },
  ];

  return (
    <section id="featured" className="py-24 relative overflow-hidden bg-[#F7EFE2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EFE3] border border-[#4C8C4A]/30 text-[#2F5D3A] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9973A]" />
            Signature Neem Oil
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1D0E] mb-4">
            Pure Neem Oil (100ml)
          </h2>
          <p className="text-base sm:text-lg text-[#2B1D0E]/80">
            Handmade with pure virgin coconut oil and fresh neem. For healthy hair, a clean scalp and clear skin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Callouts */}
          <div className="lg:col-span-4 space-y-4 order-2 lg:order-1">
            <h3 className="font-serif text-xl font-bold text-[#2F5D3A] mb-4">
              Pure Ingredients
            </h3>
            {callouts.map((item, index) => {
              const isSelected = activeCallout === index;
              return (
                <div
                  key={item.title}
                  onClick={() => setActiveCallout(index)}
                  className={`cursor-pointer p-4 rounded-2xl transition-all duration-300 border ${
                    isSelected
                      ? 'glass-panel-leaf shadow-botanical scale-[1.02] border-[#4C8C4A]'
                      : 'bg-[#FDF6EC]/70 hover:bg-[#FDF6EC] border-[#C9973A]/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#2B1D0E]">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#2B1D0E]/75 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Column: Bottle */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,151,58,0.25)_0%,transparent_70%)] pointer-events-none" />

              <motion.div
                animate={{
                  y: [-6, 6, -6],
                  rotate: [-1, 1, -1],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full drop-shadow-[0_25px_35px_rgba(47,93,58,0.25)]"
              >
                <Image
                  src={neem.image}
                  alt="Pure Neem Oil 100ml Bottle"
                  fill
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Pricing & Conversion */}
          <div className="lg:col-span-4 space-y-6 order-3">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-botanical space-y-5 border border-[#C9973A]/30">
              <span className="px-3 py-1 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-bold uppercase tracking-wider inline-block">
                In Stock • 100ml
              </span>

              <div>
                <h3 className="font-serif text-2xl font-bold text-[#2B1D0E]">
                  Pure Neem Oil
                </h3>
                <p className="text-xs sm:text-sm text-[#2B1D0E]/70 mt-1">
                  Pure Virgin Coconut Oil & Fresh Neem
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-[#E8EFE3]/60 border border-[#4C8C4A]/25 space-y-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-[#2B1D0E]/80">Bottle Price (100ml):</span>
                  <span className="text-2xl font-serif font-bold text-[#2F5D3A]">₹269</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#2B1D0E]/70 pt-1 border-t border-[#4C8C4A]/15">
                  <span>Kerala Delivery:</span>
                  <span className="font-semibold text-[#2F5D3A]">+₹50 (Total ₹319)</span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#2B1D0E]/70">
                  <span>Rest of India Delivery:</span>
                  <span className="font-semibold text-[#2B1D0E]">Confirmed on WhatsApp</span>
                </div>
              </div>

              {/* Trust Points */}
              <div className="space-y-2 text-xs text-[#2B1D0E]/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4C8C4A]" />
                  <span>Handmade in small batches in Kerala</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4C8C4A]" />
                  <span>No preservatives, no chemicals</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4C8C4A]" />
                  <span>Delivery across India</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppOrderUrl(neem, 'kerala')}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="order"
                  className="btn-shine w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 rounded-2xl font-semibold shadow-lg shadow-[#25D366]/30 text-base transition-all"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Order for ₹319 (Kerala Total)</span>
                </a>

                <Link
                  href="/product"
                  data-cursor="view"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-[#2F5D3A] hover:bg-[#E8EFE3] transition-colors"
                >
                  <span>View Full Product Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
