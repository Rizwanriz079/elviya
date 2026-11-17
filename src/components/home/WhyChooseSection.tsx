'use client';

import { motion } from 'framer-motion';

export default function WhyChooseSection() {
  const cards = [
    {
      id: 'pure',
      title: '100% Pure & Clean',
      subtitle: 'Zero Additives',
      description: 'Zero liquid paraffin, silicones, synthetic scents, or chemical stabilizers. Just pure virgin coconut oil and real fresh herbs.',
      drawPath: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.97-4.48-9-10-9z',
      iconAccent: '🌿',
    },
    {
      id: 'handmade',
      title: 'Artisan Handmade',
      subtitle: 'Kerala Tradition',
      description: 'Crafted patiently by human hands using authentic generational recipes passed down through South Indian herbal wellness traditions.',
      drawPath: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
      iconAccent: '🤲',
    },
    {
      id: 'batches',
      title: 'Small Fresh Batches',
      subtitle: 'Peak Potency',
      description: 'Made in small quantities to ensure that every bottle delivered to your doorstep preserves the living botanical nutrients.',
      drawPath: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
      iconAccent: '🏺',
    },
    {
      id: 'quality',
      title: 'Premium Quality',
      subtitle: 'Gentle on Skin',
      description: 'Tested personally and made with love. Gentle enough for weekly hair spa treatment and scalp soothing care.',
      drawPath: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
      iconAccent: '✨',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#C9973A] uppercase">
            Our Standard of Purity
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2B1D0E] mt-2 mb-4">
            Why Choose Elvia Herbals?
          </h2>
          <p className="text-[#2B1D0E]/75 text-base sm:text-lg">
            In an era of mass-produced, chemically laden cosmetics, we return to the quiet authenticity of homemade goodness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="glass-panel p-7 rounded-3xl shadow-botanical hover:shadow-botanical-lg transition-all duration-300 border border-[#C9973A]/25 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#E8EFE3] flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform duration-300 border border-[#4C8C4A]/20">
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

              {/* Gold botanical line accent */}
              <div className="pt-6 mt-6 border-t border-[#C9973A]/15 flex items-center justify-between text-xs text-[#2F5D3A] font-semibold">
                <span>Natural Care</span>
                <span>✦</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
