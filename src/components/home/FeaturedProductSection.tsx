'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { PRODUCTS, getWhatsAppOrderUrl } from '@/lib/constants';
import LetterSpaceExpand from '@/components/text/LetterSpaceExpand';

export default function FeaturedProductSection() {
  const neem = PRODUCTS.find((p) => p.id === 'neem-oil')!;
  const [activeCallout, setActiveCallout] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bottleScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.94, 1.05, 0.96]);
  const bottleRotate = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [-2, 0, 2]);

  const callouts = [
    {
      title: 'Fresh Neem Leaves',
      tag: 'PURE BOTANICAL',
      desc: 'Infused with fresh neem, traditionally used for healthy hair, a clean scalp and clear skin.',
      icon: '🌿',
    },
    {
      title: 'Pure Virgin Coconut Oil',
      tag: 'KERALA COLD PRESSED',
      desc: 'Cold unrefined virgin coconut oil provides deep natural nourishment without chemical additives.',
      icon: '🥥',
    },
    {
      title: 'Hand-Stirred with Care',
      tag: 'ARTISAN METHOD',
      desc: 'Simmered gently over controlled warmth following timeless Ayurvedic traditions in Kerala.',
      icon: '✨',
    },
    {
      title: 'Small Batch Craft',
      tag: 'ZERO PRESERVATIVES',
      desc: 'Freshly prepared in limited batches to guarantee freshness, potency and 100% purity.',
      icon: '🛡️',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="featured"
      className="py-24 sm:py-32 relative overflow-hidden bg-[#16301F] text-[#FDF6EC]"
    >
      {/* Background Texture & Ambient Glow */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url('/images/bg-forest.webp')` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(47,93,58,0.45)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#C9973A]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-[#4C8C4A]/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8EFE3]/10 border border-[#C9973A]/40 text-[#E5C07B] text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9973A]" />
            Signature Kerala Formulation
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-[#FDF6EC] tracking-tight mb-4">
            Pure Neem Oil <span className="text-[#C9973A] font-serif font-normal italic">(100ml)</span>
          </h2>

          <div className="text-sm sm:text-base text-[#E8EFE3]/80 max-w-xl mx-auto font-light leading-relaxed">
            <LetterSpaceExpand text="TRADITIONAL HAIR, SCALP & SKIN CARE" className="text-xs uppercase tracking-[0.25em] text-[#C9973A] font-semibold block mb-2" />
            Handmade with pure virgin coconut oil and fresh neem. No chemicals, no preservatives.
          </div>
        </div>

        {/* 3-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: 2 Callouts */}
          <div className="lg:col-span-4 space-y-5 order-2 lg:order-1">
            {callouts.slice(0, 2).map((item, idx) => {
              const isSelected = activeCallout === idx;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  onClick={() => setActiveCallout(idx)}
                  className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 border relative ${
                    isSelected
                      ? 'bg-[#2F5D3A]/85 border-[#C9973A] shadow-xl shadow-[#16301F]/80 scale-[1.02]'
                      : 'bg-[#1E3F27]/60 hover:bg-[#1E3F27]/85 border-[#C9973A]/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8EFE3]/10 flex items-center justify-center text-2xl border border-[#C9973A]/30 shrink-0">
                      <span>{item.icon}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C9973A] block mb-1">
                        {item.tag}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#FDF6EC]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#E8EFE3]/75 mt-1.5 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Center Column: Interactive Bottle & Call to Action */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center order-1 lg:order-2 py-6">
            <div className="relative w-64 h-84 sm:w-72 sm:h-96 flex items-center justify-center">
              {/* Golden Podium Halo */}
              <div className="absolute inset-x-8 bottom-4 h-24 bg-[#C9973A]/25 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,93,58,0.5)_0%,transparent_70%)] pointer-events-none" />

              <motion.div
                style={{ scale: bottleScale, rotate: bottleRotate }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full drop-shadow-[0_25px_40px_rgba(0,0,0,0.65)]"
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

              {/* Pedestal Ellipse Shadow */}
              <div className="absolute -bottom-2 w-48 h-6 bg-black/40 rounded-full blur-md" />
            </div>

            {/* Price Badge */}
            <div className="mt-8 flex items-center gap-3 bg-[#E8EFE3]/10 border border-[#C9973A]/40 px-6 py-2.5 rounded-full backdrop-blur-md shadow-lg">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#E5C07B]">
                ₹{neem.price}
              </span>
              <span className="text-[#C9973A]">•</span>
              <span className="text-xs uppercase tracking-wider text-[#E8EFE3]/90 font-medium">
                100ml Bottle
              </span>
              <span className="text-[#C9973A]">•</span>
              <span className="inline-flex items-center gap-1 text-xs text-[#25D366] font-bold">
                <Check className="w-3.5 h-3.5" /> In Stock
              </span>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-5 w-full max-w-xs">
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

          {/* Right Column: 2 Callouts */}
          <div className="lg:col-span-4 space-y-5 order-3">
            {callouts.slice(2, 4).map((item, idx) => {
              const actualIdx = idx + 2;
              const isSelected = activeCallout === actualIdx;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  onClick={() => setActiveCallout(actualIdx)}
                  className={`cursor-pointer p-6 rounded-3xl transition-all duration-300 border relative ${
                    isSelected
                      ? 'bg-[#2F5D3A]/85 border-[#C9973A] shadow-xl shadow-[#16301F]/80 scale-[1.02]'
                      : 'bg-[#1E3F27]/60 hover:bg-[#1E3F27]/85 border-[#C9973A]/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E8EFE3]/10 flex items-center justify-center text-2xl border border-[#C9973A]/30 shrink-0">
                      <span>{item.icon}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C9973A] block mb-1">
                        {item.tag}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#FDF6EC]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#E8EFE3]/75 mt-1.5 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Delivery Assurance Strip */}
        <div className="mt-16 pt-8 border-t border-[#C9973A]/20 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#E8EFE3]/80 text-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C9973A]" />
            <span>100% Homemade</span>
          </div>
          <span className="text-[#C9973A]">•</span>
          <div>
            <span>Delivery across India</span>
          </div>
          <span className="text-[#C9973A]">•</span>
          <div>
            <span>Kerala Flat ₹50</span>
          </div>
          <span className="text-[#C9973A]">•</span>
          <Link href="/product" className="text-[#E5C07B] hover:underline flex items-center gap-1 font-semibold">
            <span>View Full Formulation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
