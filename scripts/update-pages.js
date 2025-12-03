const fs = require('fs');

// Update Header
const headerContent = `'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/product', label: 'Product' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center group-hover:scale-110 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#2D1F0E] leading-tight">Elvia</span>
              <span className="text-xs text-[#3D6A46] font-medium -mt-1">HERBALS</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#2D1F0E] hover:text-[#D9A441] transition-colors font-medium relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#D9A441] after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* WhatsApp Button - Desktop */}
          <a
            href="https://wa.me/919207067522?text=Hi%20Elvia%20Herbals!%20I'm%20interested%20in%20your%20pure%20almond%20oil."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 btn-whatsapp px-5 py-2.5 rounded-full font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Order Now
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[#F5E6D3] transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#2D1F0E]" />
            ) : (
              <Menu className="w-6 h-6 text-[#2D1F0E]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[#FFF5E6] border-t border-[#D9C4A8] shadow-lg">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-3 text-[#2D1F0E] hover:bg-[#F5E6D3] hover:text-[#D9A441] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://wa.me/919207067522?text=Hi%20Elvia%20Herbals!%20I'm%20interested%20in%20your%20pure%20almond%20oil."
              target="_blank"
              rel="noopener noreferrer"
              className="mx-6 mt-4 flex items-center justify-center gap-2 btn-whatsapp px-5 py-3 rounded-full font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order on WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
`;
fs.writeFileSync('d:/el/elvya/src/components/Header.tsx', headerContent);
console.log('Updated Header.tsx');

// Update Footer
const footerContent = `import Link from 'next/link';
import { Leaf, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2D1F0E] text-[#FFF5E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#D9A441] leading-tight">Elvia</span>
                <span className="text-xs text-[#3D6A46] font-medium -mt-1">HERBALS</span>
              </div>
            </div>
            <p className="text-[#D9C4A8] leading-relaxed">
              Pure homemade almond oil, crafted with love and traditional methods.
              Experience the natural goodness in every drop.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#D9A441] mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-[#D9C4A8] hover:text-[#D9A441] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/product" className="text-[#D9C4A8] hover:text-[#D9A441] transition-colors">
                  Product
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#D9C4A8] hover:text-[#D9A441] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#D9C4A8] hover:text-[#D9A441] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-[#D9A441] mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-[#D9C4A8] hover:text-[#D9A441] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#D9C4A8] hover:text-[#D9A441] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-[#D9A441] mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-[#D9C4A8]">
                <Phone className="w-5 h-5 text-[#D9A441]" />
                <a href="tel:+919207067522" className="hover:text-[#D9A441] transition-colors">
                  +91 92070 67522
                </a>
              </li>
              <li className="flex items-center gap-3 text-[#D9C4A8]">
                <Mail className="w-5 h-5 text-[#D9A441]" />
                <a href="mailto:hello@elviaherbals.com" className="hover:text-[#D9A441] transition-colors">
                  hello@elviaherbals.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-[#D9C4A8]">
                <MapPin className="w-5 h-5 text-[#D9A441] flex-shrink-0 mt-1" />
                <span>India</span>
              </li>
            </ul>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com/elviaherbals"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3D1F0E] flex items-center justify-center hover:bg-[#D9A441] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/919207067522"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#3D1F0E] flex items-center justify-center hover:bg-[#25D366] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#3D1F0E] mt-12 pt-8 text-center">
          <p className="text-[#8B7355]">
            &copy; {new Date().getFullYear()} Elvia Herbals. All rights reserved. Made with love in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
`;
fs.writeFileSync('d:/el/elvya/src/components/Footer.tsx', footerContent);
console.log('Updated Footer.tsx');

console.log('All components updated!');
