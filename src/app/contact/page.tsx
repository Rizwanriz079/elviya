'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  QrCode,
  MessageCircle,
} from 'lucide-react';
import { BRAND, FAQS, getWhatsAppContactUrl } from '@/lib/constants';
import PageTransition from '@/components/PageTransition';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.message.trim()) newErrors.message = 'Please enter a short message or question';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSuccess(true);

    const waUrl = getWhatsAppContactUrl(formData.name, formData.phone, formData.message);

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 900);
  };

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 overflow-hidden">
        {/* 1. Header */}
        <section className="pt-20 pb-16 bg-gradient-to-b from-[#E8EFE3]/50 to-transparent relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-bold uppercase tracking-wider border border-[#4C8C4A]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#C9973A]" />
              We Are Here for You
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B1D0E]">
              Let’s Talk Herbal Care
            </h1>
            <p className="text-base sm:text-lg text-[#2B1D0E]/80 max-w-xl mx-auto">
              Have questions about how to use our homemade oils or placing a WhatsApp order? Message us directly — we respond promptly with personalized care.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* 2. Left Column: Contact Cards & WhatsApp Direct Card */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct WhatsApp Callout Card */}
              <div className="glass-panel-leaf p-7 rounded-3xl border border-[#4C8C4A]/30 shadow-botanical space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    Instant Support
                  </span>
                  <MessageCircle className="w-5 h-5 text-[#2F5D3A]" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2B1D0E]">
                    Chat with Us on WhatsApp
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B1D0E]/80 mt-1">
                    Direct conversation with the oil maker. Quick order placement, delivery tracking, and usage guidance.
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDF6EC] border border-[#C9973A]/25">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 flex items-center justify-center flex-shrink-0 text-[#25D366]">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-[#2B1D0E]/60 uppercase font-semibold">WhatsApp Number</p>
                    <p className="font-bold text-[#2F5D3A] text-sm sm:text-base">{BRAND.phone}</p>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                    "Hi Elvia Herbals! 🌿 I have a question about your homemade herbal oils."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 rounded-full font-bold shadow-md shadow-[#25D366]/30 text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Open WhatsApp Conversation</span>
                </a>
              </div>

              {/* Contact Cards Grid */}
              <div className="space-y-3.5">
                {[
                  {
                    icon: <Phone className="w-5 h-5 text-[#C9973A]" />,
                    title: 'Phone / Call',
                    detail: BRAND.phone,
                    link: `tel:${BRAND.phone}`,
                    sub: 'Available Mon - Sat, 9am - 7pm',
                  },
                  {
                    icon: <Mail className="w-5 h-5 text-[#C9973A]" />,
                    title: 'Email Inquiries',
                    detail: BRAND.email,
                    link: `mailto:${BRAND.email}`,
                    sub: 'For retail & wholesale inquiries',
                  },
                  {
                    icon: <MapPin className="w-5 h-5 text-[#C9973A]" />,
                    title: 'Origin Homestead',
                    detail: BRAND.address,
                    link: '#',
                    sub: 'Crafted & Dispatched from Kerala, India',
                  },
                  {
                    icon: <Instagram className="w-5 h-5 text-[#C9973A]" />,
                    title: 'Instagram Community',
                    detail: BRAND.instagramHandle,
                    link: BRAND.instagram,
                    sub: 'Behind-the-scenes harvest & batch updates',
                  },
                ].map((card, idx) => (
                  <a
                    key={idx}
                    href={card.link}
                    target={card.link.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="glass-panel p-4 rounded-2xl border border-[#C9973A]/20 shadow-sm hover:shadow-botanical hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 group block"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#E8EFE3] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      {card.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#C9973A] uppercase tracking-wide">
                        {card.title}
                      </p>
                      <p className="font-serif font-bold text-base text-[#2B1D0E] group-hover:text-[#2F5D3A] transition-colors truncate">
                        {card.detail}
                      </p>
                      <p className="text-[11px] text-[#2B1D0E]/60">{card.sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* 3. Right Column: Contact Form with Live Validation & Checkmark */}
            <div className="lg:col-span-7 space-y-10">
              <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#C9973A]/30 shadow-botanical-lg relative">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D0E] mb-2">
                  Send a Message
                </h2>
                <p className="text-xs sm:text-sm text-[#2B1D0E]/75 mb-8">
                  Fill in your details below and we will automatically open WhatsApp with your prefilled query.
                </p>

                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 text-center space-y-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="w-16 h-16 rounded-full bg-[#E8EFE3] text-[#2F5D3A] flex items-center justify-center mx-auto border-2 border-[#4C8C4A]"
                    >
                      <CheckCircle2 className="w-10 h-10 text-[#4C8C4A]" />
                    </motion.div>
                    <h3 className="font-serif text-2xl font-bold text-[#2F5D3A]">
                      Message Prepared!
                    </h3>
                    <p className="text-sm text-[#2B1D0E]/80 max-w-md mx-auto">
                      Opening WhatsApp now with your message so you can chat directly with us.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-[#2F5D3A] uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priya Sharma"
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#FDF6EC] border border-[#C9973A]/30 text-sm text-[#2B1D0E] placeholder-[#2B1D0E]/40 focus:outline-none focus:border-[#2F5D3A] transition-colors"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-[#2F5D3A] uppercase tracking-wider mb-1.5">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#FDF6EC] border border-[#C9973A]/30 text-sm text-[#2B1D0E] placeholder-[#2B1D0E]/40 focus:outline-none focus:border-[#2F5D3A] transition-colors"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold text-[#2F5D3A] uppercase tracking-wider mb-1.5">
                        Your Inquiry or Order Details *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Ask about ingredients, delivery to your pincode, or order quantity..."
                        className="w-full px-4 py-3.5 rounded-2xl bg-[#FDF6EC] border border-[#C9973A]/30 text-sm text-[#2B1D0E] placeholder-[#2B1D0E]/40 focus:outline-none focus:border-[#2F5D3A] transition-colors resize-none"
                      />
                      {errors.message && (
                        <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn-shine w-full flex items-center justify-center gap-2.5 bg-[#2F5D3A] hover:bg-[#1E3F27] text-white py-4 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>Continue to WhatsApp with My Inquiry</span>
                    </button>
                  </form>
                )}
              </div>

              {/* 4. FAQ Accordion Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C9973A]" />
                  <h3 className="font-serif text-2xl font-bold text-[#2B1D0E]">
                    Frequently Asked Questions
                  </h3>
                </div>

                <div className="space-y-3">
                  {FAQS.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="glass-panel rounded-2xl border border-[#C9973A]/25 overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-serif font-bold text-sm sm:text-base text-[#2B1D0E] hover:text-[#2F5D3A] transition-colors"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#C9973A] transition-transform duration-300 flex-shrink-0 ml-2 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#2B1D0E]/80 border-t border-[#C9973A]/15 pt-3 leading-relaxed"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
