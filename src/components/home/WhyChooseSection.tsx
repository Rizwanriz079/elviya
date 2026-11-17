'use client';

import { motion } from 'framer-motion';

export default function WhyChooseSection() {
  const cards = [
    {
      id: 'pure',
      title: '100% Pure',
      subtitle: 'Pure Ingredients',
      description: 'Made with pure virgin coconut oil and fresh neem. No chemicals, no preservatives.',
      iconAccent: '🌿',
    },
    {
      id: 'handmade',
      title: 'Handmade',
      subtitle: 'Made in Kerala',
      description: 'Crafted with care by hand in Kerala using authentic traditional methods.',
      iconAccent: '🤲',
    },
    {
      id: 'batches',
      title: 'Small Batches',
      subtitle: 'Fresh Quality',
      description: 'Prepared in small batches to maintain natural freshness in every bottle.',
      iconAccent: '🏺',
    },
    {
      id: 'quality',
      title: 'Premium Quality',
      subtitle: 'Hair & Skin Care',
      description: 'Made with love for healthy hair, a clean scalp and clear skin.',
      iconAccent: '✨',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#C9973A] uppercase">
            Our Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1D0E] mt-2 mb-4">
            Why Choose Elvia Herbals?
          </h2>
          <p className="text-[#2B1D0E]/75 text-base sm:text-lg">
            Pure homemade herbal oils, made by hand with love in Kerala.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass-panel p-7 rounded-3xl shadow-botanical hover:shadow-botanical-lg transition-all duration-300 border border-[#C9973A]/25 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#E8EFE3] flex items-center justify-center mb-6 text-2xl group-hover:scale-105 transition-transform duration-300 border border-[#4C8C4A]/20">
                  <span>{card.iconAccent}</span>
                </div>

                <span className="text-[11px] font-semibold text-[#C9973A] tracking-wider uppercase block mb-1">
                  {card.subtitle}
                </span>

                <h3 className="font-serif text-xl font-bold text-[#2B1D0E] mb-3 group-hover:text-[#2F5D3A] transition-colors">
                  {card.title}
                </h3>

                <p className="text-sm text-[#2B1D0E]/75 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#C9973A]/15 flex items-center justify-between text-xs text-[#2F5D3A] font-semibold">
                <span>Handmade in Kerala</span>
                <span>✦</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
