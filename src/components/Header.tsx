'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, ArrowUpRight, Phone, Instagram } from 'lucide-react';
import { BRAND } from '@/lib/constants';
import NavTextSwap from '@/components/text/NavTextSwap';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/product', label: 'Products' },
    { href: '/about', label: 'Our Story' },
    { href: '/contact', label: 'Contact' },
  ];

  // Auto-hide on scroll down, reappear on scroll up, glass transition at 40px
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > 120 && currentScrollY > lastScrollY && !isMobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  // Lock body scroll and handle Escape key for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* DESKTOP FLOATING PILL NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 pointer-events-none ${
          isVisible ? 'translate-y-0' : '-translate-y-[140%]'
        }`}
      >
        <div className="max-w-[1100px] mx-auto px-4 pt-4">
          <nav
            aria-label="Main Navigation"
            className={`pointer-events-auto relative flex items-center justify-between px-5 sm:px-6 rounded-full transition-all duration-300 overflow-hidden ${
              isScrolled
                ? 'bg-[#FDF6EC]/92 backdrop-blur-md shadow-botanical border border-[#C9973A]/30 py-2 scale-[0.98]'
                : 'bg-[#FDF6EC]/70 backdrop-blur-sm border border-[#C9973A]/20 shadow-sm py-2.5 scale-100'
            }`}
          >
            {/* Logo Left */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0"
              aria-label="Elvia Herbals Home"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden shadow-sm border border-[#C9973A] group-hover:border-[#2F5D3A] transition-colors bg-[#FDF6EC]">
                <Image
                  src="/images/logo.jpg"
                  alt="Elvia Herbals Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-tight text-[#2F5D3A] group-hover:text-[#1E3F27] transition-colors leading-none">
                  Elvia
                </span>
                <span className="text-[9px] tracking-[0.24em] text-[#C9973A] font-semibold uppercase mt-0.5">
                  HERBALS
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (Center) */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFE3]/40 border border-[#C9973A]/15">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors z-10 ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-[#2B1D0E]/80 hover:text-[#2F5D3A]'
                    }`}
                  >
                    {isActive ? (
                      <span>{link.label}</span>
                    ) : (
                      <NavTextSwap label={link.label} />
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-[#2F5D3A] rounded-full -z-10 shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop WhatsApp CTA Right */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                  "Hi Elvia Herbals! 🌿 I would like to order Pure Neem Oil 100ml."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="order"
                className="btn-shine inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2 rounded-full text-xs font-semibold shadow-sm hover:shadow-md shadow-[#25D366]/20 transition-all hover:scale-105 active:scale-95"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Order on WhatsApp</span>
              </a>
            </div>

            {/* Mobile Actions: WhatsApp Icon + Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                  "Hi Elvia Herbals! 🌿 I would like to order Pure Neem Oil 100ml."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order on WhatsApp"
                data-cursor="order"
                className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm active:scale-95 transition-transform"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
                className="w-9 h-9 rounded-full bg-[#E8EFE3] text-[#2F5D3A] flex items-center justify-center border border-[#C9973A]/30 active:scale-95 transition-transform"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Thin Gold Scroll Progress Line along bottom of pill */}
            <motion.div
              style={{ scaleX }}
              className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-[#C9973A] to-transparent origin-left pointer-events-none"
            />
          </nav>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN MENU DRAWER with Circular Reveal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 92% 32px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 92% 32px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 92% 32px)' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-[#FDF6EC] md:hidden flex flex-col justify-between px-6 pt-24 pb-8 overflow-y-auto"
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-[#C9973A]/20">
              <span className="font-handwriting text-2xl text-[#C9973A]">
                Made by hand, with love
              </span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-[#E8EFE3] text-[#2F5D3A] flex items-center justify-center border border-[#C9973A]/30 active:scale-95"
                aria-label="Close Navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links with line-by-line stagger */}
            <nav className="flex flex-col space-y-5 my-auto py-8">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-3xl font-serif flex items-center justify-between py-2 ${
                        isActive
                          ? 'text-[#2F5D3A] font-bold'
                          : 'text-[#2B1D0E] hover:text-[#2F5D3A]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        className={`w-6 h-6 transition-transform ${
                          isActive ? 'text-[#2F5D3A]' : 'text-[#C9973A]/50'
                        }`}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom Contact Details & WhatsApp Order CTA */}
            <div className="space-y-4 pt-6 border-t border-[#C9973A]/20">
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                  "Hi Elvia Herbals! 🌿 I would like to order Pure Neem Oil 100ml."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-shine w-full flex items-center justify-center gap-2.5 bg-[#25D366] text-white py-3.5 rounded-full font-semibold shadow-md text-sm active:scale-98"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Order on WhatsApp</span>
              </a>

              <div className="flex items-center justify-between text-xs text-[#2B1D0E]/70 pt-2">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#2F5D3A]" />
                  <span>{BRAND.phone}</span>
                </span>
                <span>Kerala, India</span>
              </div>

              {/* Social row: Instagram & Facebook */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Elvia Herbals on Instagram"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-medium border border-[#C9973A]/30 active:scale-95"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#DD2A7B]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={BRAND.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Elvia Herbals on Facebook"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-medium border border-[#C9973A]/30 active:scale-95"
                >
                  <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
