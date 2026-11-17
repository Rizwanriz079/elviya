import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Mail, Phone, MapPin, Sparkles, Heart } from 'lucide-react';
import { BRAND } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="relative bg-[#2B1D0E] text-[#FDF6EC] pt-16 pb-8 overflow-hidden">
      {/* Curved Botanical Wave Top Edge Divider */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none z-10 -translate-y-[98%] pointer-events-none">
        <svg
          className="relative block w-full h-12 sm:h-16 text-[#2B1D0E]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand Information */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C9973A] bg-[#FDF6EC]">
                <Image
                  src="/images/logo.jpg"
                  alt="Elvia Herbals Logo"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#E0B35C] leading-none">
                  Elvia
                </span>
                <span className="text-xs tracking-[0.25em] text-[#E8EFE3]/80 font-semibold uppercase mt-0.5">
                  HERBALS
                </span>
              </div>
            </Link>

            <p className="text-[#E8EFE3]/80 text-sm leading-relaxed pr-2">
              Pure homemade herbal oils prepared in small artisan batches in Kerala. Infused with pure virgin coconut oil and fresh neem.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#C9973A] font-handwriting text-xl pt-1">
              <Heart className="w-4 h-4 fill-current text-[#C9973A]" />
              <span>Made by Hand, With Love</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#E0B35C] mb-5 tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C9973A]" />
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#E8EFE3]/80 hover:text-[#C9973A] transition-colors inline-block py-0.5"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/product"
                  className="text-[#E8EFE3]/80 hover:text-[#C9973A] transition-colors inline-block py-0.5"
                >
                  Pure Neem Oil (100ml)
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#E8EFE3]/80 hover:text-[#C9973A] transition-colors inline-block py-0.5"
                >
                  Our Story & Process
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#E8EFE3]/80 hover:text-[#C9973A] transition-colors inline-block py-0.5"
                >
                  Contact & WhatsApp Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#E0B35C] mb-5 tracking-wide">
              Information
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-[#E8EFE3]/80 hover:text-[#C9973A] transition-colors inline-block py-0.5"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#E8EFE3]/80 hover:text-[#C9973A] transition-colors inline-block py-0.5"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li className="pt-2 text-xs text-[#E8EFE3]/60 leading-relaxed">
                Delivery across India • Kerala Flat ₹50 • Fast dispatch on WhatsApp
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#E0B35C] mb-5 tracking-wide">
              Direct Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex items-center gap-3 text-[#E8EFE3]/80 hover:text-[#C9973A] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C9973A] shrink-0" />
                  <span>{BRAND.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-3 text-[#E8EFE3]/80 hover:text-[#C9973A] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C9973A] shrink-0" />
                  <span>{BRAND.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#E8EFE3]/80">
                <MapPin className="w-4 h-4 text-[#C9973A] shrink-0 mt-1" />
                <span>{BRAND.address}</span>
              </li>
            </ul>

            {/* Social & WhatsApp Buttons */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Elvia Herbals on Instagram (${BRAND.instagramHandle})`}
                className="btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-md shadow-[#DD2A7B]/20 hover:scale-105 transition-transform"
              >
                <Instagram className="w-4 h-4" />
                <span>{BRAND.instagramHandle}</span>
              </a>

              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                  "Hi Elvia Herbals! 🌿 I would like to order."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order on WhatsApp"
                data-cursor="order"
                className="btn-shine inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-md shadow-[#25D366]/20 hover:scale-105 transition-transform"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Giant Outlined Watermark Across Bottom */}
        <div className="overflow-hidden pointer-events-none select-none text-center my-4">
          <span className="font-serif font-black text-[80px] sm:text-[140px] md:text-[180px] lg:text-[230px] uppercase tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(201,151,58,0.12)] block leading-none">
            Elvia
          </span>
        </div>

        {/* Gold Divider Line */}
        <div className="gold-divider mb-6" />

        {/* Copyright & Subline */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8EFE3]/70 gap-4">
          <p>© 2026 Elvia Herbals. Made with love in India.</p>
          <p className="font-handwriting text-xl text-[#E0B35C]">
            Pure Homemade Herbal Oils from Kerala
          </p>
        </div>
      </div>
    </footer>
  );
}
