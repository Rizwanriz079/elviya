'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Leaf, Shield, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import PageTransition from '@/components/PageTransition';

export default function AboutPage() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  const values = [
    {
      id: 'purity',
      title: 'Absolute Purity',
      frontIcon: '🌿',
      frontDesc: 'Zero compromise on ingredients.',
      backTitle: 'What Purity Means',
      backDesc: 'We exclusively use virgin cold-pressed coconut oil and wild garden neem. Zero paraffin, zero preservatives, zero artificial perfumes.',
    },
    {
      id: 'tradition',
      title: 'Kerala Heritage',
      frontIcon: '🏺',
      frontDesc: 'Time-honored preparation.',
      backTitle: 'Our Generation Recipe',
      backDesc: 'Slowly cooked in traditional vessels so herbal vitality is preserved rather than burned off by aggressive industrial machinery.',
    },
    {
      id: 'care',
      title: 'Mindful Care',
      frontIcon: '🤲',
      frontDesc: 'Handmade with patience.',
      backTitle: 'Small Batch Care',
      backDesc: 'Every bottle is poured, sealed, and inspected by hand. We treat every order as a personal gift to your wellbeing.',
    },
    {
      id: 'trust',
      title: 'Direct Trust',
      frontIcon: '🤝',
      frontDesc: 'WhatsApp connection.',
      backTitle: 'Always Accessible',
      backDesc: 'You communicate directly with the maker on WhatsApp. Transparent advice, sincere communication, and honest herbal care.',
    },
  ];

  const timelineSteps = [
    {
      step: 'Step 01',
      title: 'Ethical Herbal Sourcing',
      desc: 'Fresh, mature neem leaves are gathered locally at dawn from untreated village gardens in Kerala.',
    },
    {
      step: 'Step 02',
      title: 'Gentle Cleansing & Sun-Drying',
      desc: 'Washed in pure water and air-dried under shade to maintain essential chlorophyll and botanical moisture balance.',
    },
    {
      step: 'Step 03',
      title: 'Traditional Brass Vessel Infusion',
      desc: 'Simmered gently in cold-pressed virgin coconut oil at low temperature to release bio-active phytonutrients.',
    },
    {
      step: 'Step 04',
      title: 'Artisan Filtering & Pouring',
      desc: 'Double cloth-filtered for silky botanical clarity and bottled fresh without stabilizers or chemical scents.',
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 overflow-hidden">
        {/* 1. Hero Section */}
        <section className="relative pt-20 pb-20 overflow-hidden bg-gradient-to-b from-[#E8EFE3]/60 via-[#FDF6EC] to-[#FDF6EC]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-bold uppercase tracking-wider border border-[#4C8C4A]/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9973A]" />
              Our Story & Philosophy
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B1D0E] leading-tight"
            >
              Handcrafted Botanical Purity,<br />
              <span className="text-[#C9973A]">Born in Kerala</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-script text-3xl sm:text-4xl text-[#2F5D3A] tracking-wide"
            >
              Made by Hand, With Love
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg text-[#2B1D0E]/80 max-w-2xl mx-auto leading-relaxed"
            >
              Elvia Herbals began with a deeply personal desire: to bring back authentic, homemade herbal hair and skincare free from laboratory chemicals, synthetic fragrances and mineral oil fillers.
            </motion.p>
          </div>
        </section>

        {/* 2. Our Story: Alternating Blocks */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9973A]">
                The Origin
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D0E]">
                From a Family Kitchen to Homes Across India
              </h2>
              <p className="text-sm sm:text-base text-[#2B1D0E]/80 leading-relaxed">
                In Kerala homes, traditional herbal oil preparation was once a seasonal family ritual. Over the decades, factory shelves became flooded with commercial mineral oils diluted with artificial green dyes and synthetic perfume.
              </p>
              <p className="text-sm sm:text-base text-[#2B1D0E]/80 leading-relaxed">
                We set out to preserve the pure, unprocessed heritage: picking fresh neem leaves directly from our homestead, simmering them in raw cold-pressed virgin coconut oil, and bottling the unadulterated goodness in small batches.
              </p>
              <p className="text-xs text-[#2B1D0E]/60 italic p-3 rounded-xl bg-[#E8EFE3]/50 border-l-4 border-[#4C8C4A]">
                [ADD REAL STORY DETAILS HERE: Insert additional founder background, family heritage, or Kerala village anecdotes.]
              </p>
            </div>

            <div className="relative aspect-4/3 rounded-3xl overflow-hidden glass-panel border border-[#C9973A]/30 p-4 shadow-botanical">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/product-main.jpg"
                  alt="Traditional Oil Crafting"
                  fill
                  sizes="600px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden glass-panel border border-[#C9973A]/30 p-4 shadow-botanical order-2 lg:order-1">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/product-1.jpg"
                  alt="Artisan Botanicals"
                  fill
                  sizes="600px"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#4C8C4A]">
                Our Philosophy
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D0E]">
                No Shortcuts. Just Unhurried Nature.
              </h2>
              <p className="text-sm sm:text-base text-[#2B1D0E]/80 leading-relaxed">
                Nature takes time to grow potent leaves and nutrient-rich coconuts. We respect that timeline by refusing fast industrial heat processes that compromise plant phytonutrients.
              </p>
              <p className="text-sm sm:text-base text-[#2B1D0E]/80 leading-relaxed">
                When you apply Elvia Herbals Neem Oil, you are applying pure botanicals exactly as nature intended — earthy, aromatic, and genuinely nourishing.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2F5D3A]">
                  <CheckCircle2 className="w-4 h-4 text-[#4C8C4A]" />
                  <span>100% Homemade</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#2F5D3A]">
                  <CheckCircle2 className="w-4 h-4 text-[#4C8C4A]" />
                  <span>Cold-Pressed Base</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Our Promise: Animated Counters */}
        <section className="py-16 bg-[#2F5D3A] text-[#FDF6EC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '100%', label: 'Natural Ingredients', sub: 'Zero Mineral Oils' },
                { number: '0', label: 'Added Chemicals', sub: 'No Preservatives' },
                { number: 'Small', label: 'Micro-Batches', sub: 'Always Freshly Made' },
                { number: 'Kerala', label: 'Artisan Heritage', sub: 'Made with generational love' },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="font-serif text-3xl sm:text-5xl font-bold text-[#E0B35C]">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-[#FDF6EC]">
                    {stat.label}
                  </div>
                  <div className="text-xs text-[#E8EFE3]/70">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Our Process: Vertical Timeline */}
        <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9973A]">
              Patience & Precision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D0E] mt-1">
              How We Make Every Bottle
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
                <div className="w-8 h-8 rounded-full bg-[#C9973A] border-4 border-[#FDF6EC] shadow-md z-10 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ml-1 sm:ml-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                  {idx + 1}
                </div>

                <div className="w-full sm:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-3xl border border-[#C9973A]/25 shadow-botanical">
                  <span className="text-[10px] font-bold text-[#C9973A] uppercase tracking-wider">
                    {step.step}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-[#2B1D0E] mt-0.5 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B1D0E]/80 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Values Cards: Interactive Flip */}
        <section className="py-20 bg-[#F7EFE2]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2F5D3A]">
                Our Core Pillars
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D0E] mt-1">
                Values That Guide Us
              </h2>
              <p className="text-xs sm:text-sm text-[#2B1D0E]/70 mt-2">
                (Tap or hover on a card to see the story behind each value)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val) => {
                const isFlipped = flippedCard === val.id;
                return (
                  <div
                    key={val.id}
                    onClick={() => setFlippedCard(isFlipped ? null : val.id)}
                    className="cursor-pointer h-64 rounded-3xl glass-panel border border-[#C9973A]/30 p-6 flex flex-col justify-between shadow-botanical hover:shadow-botanical-lg transition-all duration-300 relative group"
                  >
                    {!isFlipped ? (
                      <div>
                        <div className="text-3xl mb-4">{val.frontIcon}</div>
                        <h3 className="font-serif text-xl font-bold text-[#2B1D0E] mb-2">
                          {val.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#2B1D0E]/75">
                          {val.frontDesc}
                        </p>
                        <span className="text-[10px] text-[#C9973A] font-semibold mt-4 block">
                          Tap to learn more ↻
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-between h-full bg-[#E8EFE3]/80 -m-6 p-6 rounded-3xl">
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#2F5D3A] mb-2">
                            {val.backTitle}
                          </h4>
                          <p className="text-xs text-[#2B1D0E]/85 leading-relaxed">
                            {val.backDesc}
                          </p>
                        </div>
                        <span className="text-[10px] text-[#4C8C4A] font-semibold">
                          Tap to flip back ↻
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. Founder / Maker Note */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#C9973A]/30 shadow-botanical text-center space-y-6">
            {/* Photo Placeholder */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden border-4 border-[#C9973A] bg-[#E8EFE3] flex items-center justify-center shadow-md">
              <Image
                src="/images/logo.jpg"
                alt="Maker Photo Placeholder"
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-2xl font-bold text-[#2B1D0E]">
                A Note from the Maker
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C9973A]">
                Elvia Herbals • Kerala, India
              </p>
            </div>

            <p className="font-serif text-base sm:text-lg text-[#2B1D0E]/90 italic max-w-2xl mx-auto leading-relaxed">
              “When you choose Elvia Herbals, you are holding the quiet beauty of Kerala herbs crafted with the exact honesty I prepare for my own loved ones. Thank you for welcoming our homemade tradition into your life.”
            </p>

            <p className="text-xs text-[#2B1D0E]/50">
              [ADD REAL FOUNDER PHOTO & SIGNATURE HERE]
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Link
                href="/product"
                className="btn-shine inline-flex items-center gap-2 bg-[#2F5D3A] hover:bg-[#1E3F27] text-white px-8 py-3.5 rounded-full font-bold shadow-md text-sm transition-all"
              >
                <span>Explore Pure Neem Oil (100ml)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
