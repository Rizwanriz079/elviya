'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { bobIndependent } from '@/lib/motion';
import Container from '@/components/ui/Container';

export default function BenefitsSection() {
  const [activeTab, setActiveTab] = useState<'hair' | 'scalp' | 'skin'>('hair');

  const tabData = {
    hair: {
      title: 'Healthy Hair Care',
      subtitle: 'Pure virgin coconut oil nourishment',
      description:
        'Pure virgin coconut oil deeply conditions and softens hair strands, traditionally used in Kerala to support strong, manageable, and healthy hair.',
      points: [
        'Virgin coconut oil base nourishes hair strands from root to tip',
        'Helps keep hair soft, smooth, and naturally lustrous',
        'Handmade without chemicals, preservatives or artificial perfumes',
      ],
      badge: 'Hair Nourishment',
    },
    scalp: {
      title: 'Clean & Fresh Scalp',
      subtitle: 'Fresh neem cleansing',
      description:
        'Neem is traditionally used in Kerala to keep the scalp fresh, clean, and free from seasonal dryness and buildup.',
      points: [
        'Fresh neem helps maintain a clean, balanced scalp environment',
        'Soothes dryness when gently massaged into the scalp',
        'Pure botanical formula with zero chemical preservatives',
      ],
      badge: 'Scalp Care',
    },
    skin: {
      title: 'Clear Skin Support',
      subtitle: 'Gentle daily hydration',
      description:
        'Traditionally used for clean and clear skin. Provides gentle, natural hydration for targeted skin areas with no chemicals.',
      points: [
        'Gently hydrates and softens dry skin patches',
        'Traditionally used to promote clean, clear-looking skin',
        'Contains zero chemicals and zero preservatives',
      ],
      badge: 'Skin Support',
    },
  };

  const current = tabData[activeTab];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-[#FDF6EC]">
      {/* Background Leaves Texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: `url('/images/bg-cream-leaves.webp')` }}
      />

      {/* Floating Botanical Leaves (Desktop Only) */}
      <motion.div
        variants={bobIndependent}
        animate="animate"
        className="hidden lg:block absolute left-8 top-20 w-16 h-24 pointer-events-none opacity-40"
      >
        <Image
          src="/images/leaf-2.png"
          alt="Botanical Leaf"
          fill
          sizes="64px"
          className="object-contain"
        />
      </motion.div>
      <motion.div
        variants={bobIndependent}
        animate="animate"
        className="hidden lg:block absolute right-10 bottom-24 w-20 h-28 pointer-events-none opacity-35 rotate-45"
      >
        <Image
          src="/images/leaf-3.png"
          alt="Botanical Leaf"
          fill
          sizes="80px"
          className="object-contain"
        />
      </motion.div>

      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest text-[#C9973A] uppercase">
            Botanical Care
          </span>
          <h2 className="font-serif fluid-section-h2 font-bold text-[#2B1D0E] mt-2 mb-4">
            Traditional Hair, Scalp & Skin Care
          </h2>
          <p className="text-base sm:text-lg text-[#2B1D0E]/80 font-light">
            Handmade with pure virgin coconut oil and fresh neem for gentle, everyday care.
          </p>
        </div>

        {/* Tab Buttons with Sliding Pill */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-[#E8EFE3]/70 border border-[#C9973A]/30 backdrop-blur-sm">
            {(
              [
                { id: 'hair', label: 'Hair Care' },
                { id: 'scalp', label: 'Scalp Care' },
                { id: 'skin', label: 'Skin Care' },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-white'
                      : 'text-[#2B1D0E]/80 hover:text-[#2F5D3A]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="benefits-tab-pill"
                      className="absolute inset-0 bg-[#2F5D3A] rounded-full shadow-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content with Crossfade + Blur */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, filter: 'blur(6px)', y: 12 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(6px)', y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#C9973A]/25 shadow-botanical flex flex-col md:flex-row gap-8 items-center bg-[#FDF6EC]/85"
            >
              <div className="flex-1 space-y-4 text-left">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C9973A]">
                  <Sparkles className="w-3.5 h-3.5" />
                  {current.badge}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D0E]">
                  {current.title}
                </h3>

                <p className="text-sm sm:text-base text-[#2B1D0E]/80 leading-relaxed font-light">
                  {current.description}
                </p>

                <div className="space-y-2.5 pt-2">
                  {current.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#E8EFE3] text-[#2F5D3A] flex items-center justify-center shrink-0 mt-0.5 border border-[#4C8C4A]/30">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#2B1D0E]/85">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="/product"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[#2F5D3A] hover:text-[#1E3F27] group"
                  >
                    <span>View Signature Neem Oil (100ml)</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
