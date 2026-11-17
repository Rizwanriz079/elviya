'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { SHOW_FOUNDER } from '@/lib/constants';
import CharStagger from '@/components/text/CharStagger';
import ScriptDraw from '@/components/text/ScriptDraw';
import WordBlurIn from '@/components/text/WordBlurIn';
import CountUp from '@/components/text/CountUp';
import {
  clipRevealLeft,
  clipRevealRight,
  fadeUp,
  rotateIn,
} from '@/lib/motion';

export default function AboutPage() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const values = [
    {
      id: 'purity',
      title: '100% Pure',
      frontIcon: '🌿',
      frontDesc: 'Pure virgin coconut oil and fresh neem.',
      backTitle: 'Zero Chemicals',
      backDesc: 'Made with zero preservatives, zero artificial perfumes, and no chemical additives.',
    },
    {
      id: 'tradition',
      title: 'Handmade in Kerala',
      frontIcon: '🏺',
      frontDesc: 'Made by hand with care in Kerala.',
      backTitle: 'Small Batches',
      backDesc: 'Prepared carefully by hand in small batches to maintain natural quality.',
    },
    {
      id: 'care',
      title: 'Made with Love',
      frontIcon: '🤲',
      frontDesc: 'Crafted with genuine dedication.',
      backTitle: 'Mindful Care',
      backDesc: 'Every bottle is prepared and sealed by hand for healthy hair, scalp and skin.',
    },
    {
      id: 'trust',
      title: 'Delivery across India',
      frontIcon: '🤝',
      frontDesc: 'Direct WhatsApp communication.',
      backTitle: 'Reliable Shipping',
      backDesc: 'Flat ₹50 delivery in Kerala, and delivery across India confirmed directly on WhatsApp.',
    },
  ];

  const timelineSteps = [
    {
      step: 'Step 01',
      title: 'Fresh Neem Leaves',
      desc: 'Selected fresh neem leaves are harvested in Kerala and prepared for infusion.',
    },
    {
      step: 'Step 02',
      title: 'Cleaned Thoroughly',
      desc: 'Washed carefully by hand in clean water to ensure pure botanical cleanliness.',
    },
    {
      step: 'Step 03',
      title: 'Infused in Virgin Coconut Oil',
      desc: 'Infused gently into pure virgin coconut oil using traditional handmade care.',
    },
    {
      step: 'Step 04',
      title: 'Bottled by Hand in Small Batches',
      desc: 'Filtered and bottled by hand in Kerala with no preservatives or chemicals.',
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 overflow-hidden page-top-padding">
        {/* 1. Hero Section with about-hero.webp & CharStagger */}
        <section className="relative py-16 sm:py-24 text-center overflow-hidden">
          {/* Subtle botanical scene overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-multiply pointer-events-none"
            style={{ backgroundImage: `url('/images/about-hero.webp')` }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-bold uppercase tracking-wider border border-[#4C8C4A]/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9973A]" />
              Our Story & Heritage
            </motion.div>

            {/* Kinetic Title with Character Stagger */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B1D0E] leading-tight">
              Pure Homemade Herbal Oils
              <br />
              <CharStagger
                text="Handmade in Kerala"
                className="text-[#C9973A] italic"
                delay={0.2}
              />
            </h1>

            {/* Single-line Caveat script with self-drawing underline */}
            <div className="flex justify-center pt-2">
              <ScriptDraw text="Made by Hand, With Love." withUnderline={true} />
            </div>

            <WordBlurIn
              text="Elvia Herbals is dedicated to pure, handmade herbal oils prepared in small batches in Kerala using pure virgin coconut oil and fresh neem."
              className="text-base sm:text-lg text-[#2B1D0E]/80 max-w-2xl mx-auto leading-relaxed font-light pt-2"
              delay={0.4}
            />
          </div>
        </section>

        {/* 2. Alternating Story Blocks with clipRevealLeft & clipRevealRight */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Story Block 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9973A]">
                Our Focus
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D0E]">
                Handmade with Natural Ingredients
              </h2>
              <WordBlurIn
                text="We believe that simple, natural ingredients make the most reliable care. Our Neem Oil is made by infusing fresh neem directly into pure virgin coconut oil."
                className="text-sm sm:text-base text-[#2B1D0E]/80 leading-relaxed font-light"
              />
              <p className="text-sm sm:text-base text-[#2B1D0E]/80 leading-relaxed font-light">
                Every batch is made by hand in small quantities in Kerala with zero added chemicals and zero preservatives.
              </p>
            </div>

            <motion.div
              variants={clipRevealRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative aspect-4/3 rounded-3xl overflow-hidden glass-panel border border-[#C9973A]/30 p-4 shadow-botanical"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/product-main.jpg"
                  alt="Handmade in Kerala"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Story Block 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={clipRevealLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative aspect-4/3 rounded-3xl overflow-hidden glass-panel border border-[#C9973A]/30 p-4 shadow-botanical order-2 lg:order-1"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/product-1.jpg"
                  alt="Small Batches"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover"
                />
              </div>
            </motion.div>

            <div className="space-y-5 order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#4C8C4A]">
                Traditional Care
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D0E]">
                Small Batches for Hair, Scalp & Skin
              </h2>
              <WordBlurIn
                text="Prepared with care for healthy hair, a clean scalp and clear skin. We deliver across India with flat ₹50 shipping in Kerala and direct ordering on WhatsApp."
                className="text-sm sm:text-base text-[#2B1D0E]/80 leading-relaxed font-light"
              />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2F5D3A]">
                  <CheckCircle2 className="w-4 h-4 text-[#4C8C4A]" />
                  <span>100% Pure Ingredients</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#2F5D3A]">
                  <CheckCircle2 className="w-4 h-4 text-[#4C8C4A]" />
                  <span>No Preservatives</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Our Promise: Dark Section Counters with CountUp */}
        <section className="py-20 bg-[#16301F] text-[#FDF6EC] my-12 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url('/images/bg-forest.webp')` }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,93,58,0.5)_0%,transparent_70%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2 p-6 rounded-2xl bg-[#E8EFE3]/5 border border-[#C9973A]/20">
                <div className="font-serif text-4xl sm:text-5xl font-bold text-[#E5C07B]">
                  <CountUp target={100} suffix="%" duration={1.5} />
                </div>
                <div className="text-sm sm:text-base font-semibold text-[#FDF6EC]">
                  Natural Ingredients
                </div>
                <div className="text-xs text-[#E8EFE3]/70">Virgin coconut oil & neem</div>
              </div>

              <div className="space-y-2 p-6 rounded-2xl bg-[#E8EFE3]/5 border border-[#C9973A]/20">
                <div className="font-serif text-4xl sm:text-5xl font-bold text-[#E5C07B]">
                  0
                </div>
                <div className="text-sm sm:text-base font-semibold text-[#FDF6EC]">
                  Added Chemicals
                </div>
                <div className="text-xs text-[#E8EFE3]/70">No preservatives</div>
              </div>

              <div className="space-y-2 p-6 rounded-2xl bg-[#E8EFE3]/5 border border-[#C9973A]/20">
                <div className="font-serif text-4xl sm:text-5xl font-bold text-[#E5C07B]">
                  Small
                </div>
                <div className="text-sm sm:text-base font-semibold text-[#FDF6EC]">
                  Batches
                </div>
                <div className="text-xs text-[#E8EFE3]/70">Handmade fresh</div>
              </div>

              <div className="space-y-2 p-6 rounded-2xl bg-[#E8EFE3]/5 border border-[#C9973A]/20">
                <div className="font-serif text-4xl sm:text-5xl font-bold text-[#E5C07B]">
                  Kerala
                </div>
                <div className="text-sm sm:text-base font-semibold text-[#FDF6EC]">
                  Made in India
                </div>
                <div className="text-xs text-[#E8EFE3]/70">Delivery across India</div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Our Process: Vertical Timeline */}
        <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9973A]">
              From Leaf to Bottle
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D0E] mt-1">
              How Our Oils Are Made
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-[2px] before:bg-gradient-to-b before:from-[#4C8C4A] before:via-[#C9973A] before:to-[#2F5D3A]">
            {timelineSteps.map((step, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                  idx % 2 === 0 ? 'sm:flex-row-reverse' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-[#C9973A] border-4 border-[#FDF6EC] shadow-md z-10 flex items-center justify-center text-white text-xs font-bold shrink-0 ml-1 sm:ml-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                  {idx + 1}
                </div>

                <div className="w-full sm:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-3xl border border-[#C9973A]/25 shadow-botanical">
                  <span className="text-[10px] font-bold text-[#C9973A] uppercase tracking-wider">
                    {step.step}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#2B1D0E] mt-0.5 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B1D0E]/80 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Values Cards: Interactive 3D Flip with staggered rotateIn */}
        <section className="py-20 bg-[#F7EFE2]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2F5D3A]">
                Our Values
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D0E] mt-1">
                Purity, Tradition, Care & Trust
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, idx) => {
                const isFlipped = flippedCard === val.id;
                return (
                  <motion.div
                    key={val.id}
                    variants={rotateIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                    onClick={() => setFlippedCard(isFlipped ? null : val.id)}
                    className="cursor-pointer h-64 rounded-3xl glass-panel border border-[#C9973A]/30 p-6 flex flex-col justify-between shadow-botanical hover:shadow-botanical-lg transition-all duration-300 relative group"
                  >
                    {!isFlipped ? (
                      <div>
                        <div className="text-3xl mb-3">{val.frontIcon}</div>
                        <h3 className="font-serif text-xl font-bold text-[#2B1D0E] mb-2">
                          {val.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#2B1D0E]/75 font-light">
                          {val.frontDesc}
                        </p>
                        <span className="text-[10px] text-[#C9973A] font-semibold mt-4 block">
                          Tap to view details ↻
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-between h-full bg-[#E8EFE3]/90 -m-6 p-6 rounded-3xl">
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#2F5D3A] mb-2">
                            {val.backTitle}
                          </h4>
                          <p className="text-xs text-[#2B1D0E]/85 leading-relaxed font-light">
                            {val.backDesc}
                          </p>
                        </div>
                        <span className="text-[10px] text-[#4C8C4A] font-semibold">
                          Tap to flip back ↻
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Optional Founder Note (Only shown if SHOW_FOUNDER is true) */}
        {SHOW_FOUNDER && (
          <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Real Founder content to be added when client provides */}
          </section>
        )}

        {/* CTA to Products */}
        <section className="py-16 max-w-4xl mx-auto px-4 text-center">
          <Link
            href="/product"
            className="btn-shine inline-flex items-center gap-2 bg-[#2F5D3A] hover:bg-[#1E3F27] text-white px-8 py-4 rounded-full font-bold shadow-md text-sm transition-all"
          >
            <span>Explore Pure Neem Oil (100ml)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </PageTransition>
  );
}
