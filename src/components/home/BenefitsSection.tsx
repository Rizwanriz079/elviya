'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BenefitsSection() {
  const [activeTab, setActiveTab] = useState<'hair' | 'scalp' | 'skin'>('hair');

  const tabData = {
    hair: {
      title: 'Traditional Hair Nourishment',
      subtitle: 'Nourishes strands from roots to tips',
      description: 'Cold-pressed virgin coconut oil has a unique molecular structure capable of penetrating the hair cuticle deeply. Combined with bioactive neem leaf extracts, it softens dry ends, helps tame unruly frizz, and locks in natural lustre.',
      points: [
        'Traditionally used to strengthen dry and brittle hair strands',
        'Helps seal moisture into cuticles, enhancing natural shine',
        'Provides lightweight barrier protection against heat and environmental dust',
        'Softens rough ends and makes detangling gentler',
      ],
      routine: 'Warm a coin-sized amount in your palms and smooth from mid-lengths to ends 1 hour before gentle hair wash.',
      badge: 'Silky Texture & Shine',
    },
    scalp: {
      title: 'Pure Scalp Comfort & Cleanliness',
      subtitle: 'Soothes dryness and refreshes roots',
      description: 'Neem has been cherished in Kerala for centuries as a calming botanical purifier. When massaged into the scalp, its natural compounds help keep the scalp environment clean, fresh, and free from seasonal dryness and flaking buildup.',
      points: [
        'Traditionally used to calm itchy, dry and irritated scalps',
        'Helps balance excess sebum without stripping the natural barrier',
        'Freshens the scalp surface with authentic cooling herbal properties',
        'Stimulates gentle circulation during relaxing fingertip massage',
      ],
      routine: 'Massage gently in slow circular motions for 5-10 minutes. Leave for 45 minutes before rinsing.',
      badge: 'Balanced & Refreshed',
    },
    skin: {
      title: 'Gentle Skin Clarifying & Glow',
      subtitle: 'Herbal hydration for targeted areas',
      description: 'The natural fatty acids in virgin coconut oil paired with the clarifying essence of neem provide soothing hydration. Ideal as an evening botanical treatment for areas prone to redness or uneven texture.',
      points: [
        'Deeply hydrates rough, dry patches on face, elbows and body',
        'Traditionally applied to soothe minor surface redness and blemishes',
        'Delivers natural antioxidants that support skin softness and resilience',
        'Leaves a natural, healthy glow without synthetic heaviness',
      ],
      routine: 'Pat 2-3 drops onto clean, damp skin at bedtime. Always patch test before first facial use.',
      badge: 'Clear & Calm Radiance',
    },
  };

  const current = tabData[activeTab];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-widest text-[#C9973A] uppercase">
            Ayurvedic Herbology
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1D0E] mt-2 mb-4">
            Botanical Benefits
          </h2>
          <p className="text-base sm:text-lg text-[#2B1D0E]/80">
            Time-honored natural uses of virgin coconut oil and fresh neem for mindful everyday care.
          </p>
        </div>

        {/* Interactive Tab Switcher */}
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
            transition={{ duration: 0.35 }}
            className="glass-panel p-8 sm:p-12 rounded-3xl shadow-botanical border border-[#C9973A]/25 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="px-3.5 py-1 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-bold uppercase tracking-wider inline-block">
                  {current.badge}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D0E]">
                  {current.title}
                </h3>

                <p className="text-sm sm:text-base text-[#2B1D0E]/80 leading-relaxed">
                  {current.description}
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2.5 pt-2">
                  {current.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2B1D0E]/85">
                      <Check className="w-4 h-4 text-[#4C8C4A] flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Routine Recommendation Box */}
              <div className="lg:col-span-5 bg-[#FDF6EC] p-6 rounded-2xl border border-[#C9973A]/30 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C9973A] uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  Recommended Ritual
                </div>

                <p className="text-xs sm:text-sm text-[#2B1D0E]/80 leading-relaxed">
                  {current.routine}
                </p>

                <div className="pt-2">
                  <Link
                    href="/product"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#2F5D3A] hover:text-[#1E3F27] transition-colors"
                  >
                    <span>Read Ingredients & Safety Notes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
