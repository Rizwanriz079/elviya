'use client';

import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export default function InstagramStrip() {
  const posts = [
    { src: '/images/product-main.jpg', alt: 'Handmade Herbal Oils Preparation in Kerala' },
    { src: '/images/neem-oil.png', alt: 'Pure Neem Oil 100ml Bottle' },
    { src: '/images/product-1.jpg', alt: 'Fresh Harvested Ingredients' },
    { src: '/images/neem-oil-og.jpg', alt: 'Virgin Coconut Oil & Neem Infusion' },
    { src: '/images/product-2.jpg', alt: 'Traditional Kerala Herbal Formulation' },
    { src: '/images/logo.jpg', alt: 'Elvia Herbals Botanical Mark' },
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-[#F7EFE2]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest text-[#C9973A] uppercase">
              Follow Our Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2B1D0E] mt-1">
              On Instagram @elviaherbals
            </h2>
          </div>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md hover:scale-105 transition-transform w-max"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow {BRAND.instagramHandle}</span>
          </a>
        </div>
      </div>

      {/* Grid of Square Photos */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, idx) => (
            <a
              key={idx}
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-[#C9973A]/20 bg-[#FDF6EC] block"
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#2F5D3A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                <Instagram className="w-6 h-6" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
