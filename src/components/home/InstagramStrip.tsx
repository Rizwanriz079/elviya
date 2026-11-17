'use client';

import { Instagram } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export default function InstagramStrip() {
  return (
    <section className="py-10 bg-[#F7EFE2]/60 border-y border-[#C9973A]/20">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <p className="font-serif text-lg sm:text-xl font-bold text-[#16301F]">
          Connect With Elvia Herbals
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow ${BRAND.instagramHandle} on Instagram`}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-[#C9973A]/30 text-xs sm:text-sm font-semibold text-[#2F5D3A] shadow-sm hover:shadow-md hover:scale-105 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center shrink-0">
              <Instagram className="w-3.5 h-3.5" />
            </div>
            <span>Follow on Instagram</span>
          </a>

          <a
            href={BRAND.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Elvia Herbals on Facebook"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-[#C9973A]/30 text-xs sm:text-sm font-semibold text-[#2F5D3A] shadow-sm hover:shadow-md hover:scale-105 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <span>Follow on Facebook</span>
          </a>
        </div>
      </div>
    </section>
  );
}
