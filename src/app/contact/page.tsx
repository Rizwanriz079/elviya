'use client';

import { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
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
    if (!formData.message.trim()) newErrors.message = 'Please enter a message or question';
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
    }, 800);
  };

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 overflow-hidden page-top-padding">
        {/* 1. Header */}
        <section className="pb-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-bold uppercase tracking-wider border border-[#4C8C4A]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#C9973A]" />
              Contact
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B1D0E]">
              Let’s Talk
            </h1>
            <p className="text-base sm:text-lg text-[#2B1D0E]/80 max-w-xl mx-auto">
              Message us on WhatsApp for orders, delivery questions, or product details. We communicate directly with every customer.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* 2. Left Column: Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Card */}
              <div className="glass-panel-leaf p-7 rounded-3xl border border-[#4C8C4A]/30 shadow-botanical space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                    WhatsApp
                  </span>
                  <MessageCircle className="w-5 h-5 text-[#2F5D3A]" />
                </div>

                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2B1D0E]">
                    Chat on WhatsApp
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2B1D0E]/80 mt-1">
                    Direct conversation with Elvia Herbals for orders and inquiries.
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
                  data-cursor="order"
                  className="btn-shine w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3.5 rounded-full font-bold shadow-md shadow-[#25D366]/30 text-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Open WhatsApp Conversation</span>
                </a>
              </div>

              {/* Verified Contact Details (Allowed Facts Only) */}
              <div className="space-y-3">
                {[
                  {
                    icon: <Phone className="w-5 h-5 text-[#C9973A]" />,
                    title: 'Phone',
                    detail: BRAND.phone,
                    link: `tel:${BRAND.phone}`,
                  },
                  {
                    icon: <Mail className="w-5 h-5 text-[#C9973A]" />,
                    title: 'Email',
                    detail: BRAND.email,
                    link: `mailto:${BRAND.email}`,
                  },
                  {
                    icon: <MapPin className="w-5 h-5 text-[#C9973A]" />,
                    title: 'Location',
                    detail: BRAND.address,
                    link: '#',
                  },
                  {
                    icon: <Instagram className="w-5 h-5 text-[#C9973A]" />,
                    title: 'Instagram',
                    detail: BRAND.instagramHandle,
                    link: BRAND.instagram,
                  },
                ].map((card, idx) => (
                  <a
                    key={idx}
                    href={card.link}
                    target={card.link.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="glass-panel p-4 rounded-2xl border border-[#C9973A]/20 shadow-sm hover:shadow-botanical hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 group block"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#E8EFE3] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      {card.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#C9973A] uppercase tracking-wide">
                        {card.title}
                      </p>
                      <p className="font-serif font-bold text-base text-[#2B1D0E] group-hover:text-[#2F5D3A] transition-colors truncate">
                        {card.detail}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* 3. Right Column: Form & FAQs */}
            <div className="lg:col-span-7 space-y-10">
              <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#C9973A]/30 shadow-botanical-lg relative">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D0E] mb-2">
                  Send a Message
                </h2>
                <p className="text-xs sm:text-sm text-[#2B1D0E]/75 mb-6">
                  Fill in your details to open WhatsApp with your prefilled inquiry.
                </p>

                {isSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#E8EFE3] text-[#2F5D3A] flex items-center justify-center mx-auto border-2 border-[#4C8C4A]">
                      <CheckCircle2 className="w-10 h-10 text-[#4C8C4A]" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#2F5D3A]">
                      Opening WhatsApp...
                    </h3>
                    <p className="text-sm text-[#2B1D0E]/80 max-w-md mx-auto">
                      Connecting you directly to Elvia Herbals on WhatsApp.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2F5D3A] uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 rounded-2xl bg-[#FDF6EC] border border-[#C9973A]/30 text-sm text-[#2B1D0E] placeholder-[#2B1D0E]/40 focus:outline-none focus:border-[#2F5D3A] transition-colors"
                      />
                      {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2F5D3A] uppercase tracking-wider mb-1.5">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 rounded-2xl bg-[#FDF6EC] border border-[#C9973A]/30 text-sm text-[#2B1D0E] placeholder-[#2B1D0E]/40 focus:outline-none focus:border-[#2F5D3A] transition-colors"
                      />
                      {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2F5D3A] uppercase tracking-wider mb-1.5">
                        Message *
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Your inquiry or order details..."
                        className="w-full px-4 py-3 rounded-2xl bg-[#FDF6EC] border border-[#C9973A]/30 text-sm text-[#2B1D0E] placeholder-[#2B1D0E]/40 focus:outline-none focus:border-[#2F5D3A] transition-colors resize-none"
                      />
                      {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      data-cursor="order"
                      className="btn-shine w-full flex items-center justify-center gap-2 bg-[#2F5D3A] hover:bg-[#1E3F27] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>Continue to WhatsApp</span>
                    </button>
                  </form>
                )}
              </div>

              {/* 4. FAQ Accordion */}
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

                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#2B1D0E]/80 border-t border-[#C9973A]/15 pt-3 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
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
