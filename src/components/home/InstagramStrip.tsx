'use client';

import { Instagram } from 'lucide-react';
import { BRAND, SHOW_INSTAGRAM } from '@/lib/constants';

export default function InstagramStrip() {
  if (!SHOW_INSTAGRAM) {
    return (
      <section className="py-12 bg-[#F7EFE2]/50 border-y border-[#C9973A]/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm sm:text-base font-bold text-[#2F5D3A] hover:text-[#1E3F27] transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shadow-sm">
              <Instagram className="w-5 h-5" />
            </div>
            <span>Follow {BRAND.instagramHandle} on Instagram</span>
          </a>
        </div>
      </section>
    );
  }

  return null;
}
