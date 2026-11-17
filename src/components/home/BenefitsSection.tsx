'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BenefitsSection() {
  const [activeTab, setActiveTab] = useState<'hair' | 'scalp' | 'skin'>('hair');

  const tabData = {
    hair: {
      title: 'Healthy Hair Care',
      subtitle: 'Pure virgin coconut oil nourishment',
      description: 'Pure virgin coconut oil deeply conditions and softens hair strands, traditionally used to support manageable, healthy hair.',
      points: [
        'Pure virgin coconut oil nourishes hair from roots to ends',
        'Helps keep hair soft, manageable, and naturally lustrous',
        'Handmade without silicones, liquid paraffin or artificial fragrances',
      ],
      badge: 'Hair Care',
    },
    scalp: {
      title: 'Clean & Fresh Scalp',
      subtitle: 'Fresh neem cleansing',
      description: 'Neem is traditionally used in Kerala to keep the scalp fresh, clean, and free from seasonal dryness and buildup.',
      points: [
        'Fresh neem helps keep the scalp clean and balanced',
        'Soothes dryness when gently massaged into the scalp',
        'Pure botanical formula with zero chemical additives',
      ],
      badge: 'Scalp Care',
    },
    skin: {
      title: 'Clear Skin Support',
      subtitle: 'Natural moisturizing',
      description: 'Traditionally used for clean and clear skin. Provides gentle, natural hydration for targeted skin areas.',
      points: [
        'Gently hydrates and softens dry skin areas',
        'Traditionally used to promote clean, clear-looking skin',
        'Contains no artificial colors or synthetic preservatives',
      ],
      badge: 'Skin Care',
    },
  };

  const current = tabData[activeTab];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest text-[#C9973A] uppercase">
            Natural Benefits
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1D0E] mt-2 mb-4">
            Traditional Hair, Scalp & Skin Care
          </h2>
          <p className="text-base sm:text-lg text-[#2B1D0E]/80">
            Handmade with pure virgin coconut oil and fresh neem for mindful natural care.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-[#E8EFE3]/80 border border-[#C9973A]/25 backdrop-blur-md">
            {[
              { id: 'hair', label: 'Hair Care' },
              { id: 'scalp', label: 'Scalp Care' },
              { id: 'skin', label: 'Skin Care' },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'hair' | 'scalp' | 'skin')}
                  className={`relative px-6 sm:px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isSelected ? 'text-[#FDF6EC]' : 'text-[#2B1D0E]/75 hover:text-[#2F5D3A]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="benefit-tab-pill"
                      className="absolute inset-0 bg-[#2F5D3A] rounded-full shadow-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Morphing Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-panel p-8 sm:p-12 rounded-3xl shadow-botanical border border-[#C9973A]/25 max-w-3xl mx-auto space-y-6"
          >
            <span className="px-3.5 py-1 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-bold uppercase tracking-wider inline-block">
              {current.badge}
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D0E]">
              {current.title}
            </h3>

            <p className="text-sm sm:text-base text-[#2B1D0E]/80 leading-relaxed">
              {current.description}
            </p>

            <ul className="space-y-2.5 pt-2">
              {current.points.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2B1D0E]/85">
                  <Check className="w-4 h-4 text-[#4C8C4A] flex-shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[#C9973A]/20">
              <Link
                href="/product"
                data-cursor="view"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#2F5D3A] hover:text-[#1E3F27] transition-colors"
              >
                <span>View Pure Neem Oil Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
