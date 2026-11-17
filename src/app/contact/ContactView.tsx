'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Send,
  ChevronDown,
  Sparkles,
  QrCode,
  MessageCircle,
} from 'lucide-react';
import { BRAND, FAQS, getWhatsAppContactUrl } from '@/lib/constants';
import PageTransition from '@/components/PageTransition';
import { fadeUp, drawPath } from '@/lib/motion';
import TypeCaret from '@/components/text/TypeCaret';
import WordBlurIn from '@/components/text/WordBlurIn';

function ContactSpotlightCard({
  children,
  href,
  target,
}: {
  children: React.ReactNode;
  href?: string;
  target?: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -200, y: -200 });
  };

  const Component = href ? 'a' : 'div';

  return (
    <Component
      ref={cardRef as any} // eslint-disable-line @typescript-eslint/no-explicit-any
      href={href}
      target={target}
      rel={target ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove as any} // eslint-disable-line @typescript-eslint/no-explicit-any
      onMouseLeave={handleMouseLeave}
      className="glass-panel p-4 rounded-2xl border border-[#C9973A]/20 shadow-sm hover:shadow-botanical hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4 group block relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, rgba(201,151,58,0.18), transparent 70%)`,
        }}
      />
      {children}
    </Component>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [shake, setShake] = useState(false);
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

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate();
    setErrors(errs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setTouched({ name: true, phone: true, message: true });
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    setErrors({});
    setIsSuccess(true);

    const waUrl = getWhatsAppContactUrl(formData.name, formData.phone, formData.message);

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 1100);
  };

  return (
    <PageTransition>
      <div className="min-h-screen pb-24 overflow-hidden page-top-padding">
        {/* 1. Header with contact-bg.webp & TypeCaret heading */}
        <section className="relative pb-16 text-center overflow-hidden">
          {/* Subtle contact background texture */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-multiply pointer-events-none"
            style={{ backgroundImage: `url('/images/contact-bg.webp')` }}
          />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-bold uppercase tracking-wider border border-[#4C8C4A]/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9973A]" />
              Direct Communication
            </motion.div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#2B1D0E]">
              <TypeCaret text="Let’s Talk" />
            </h1>

            <WordBlurIn
              text="Message us on WhatsApp for orders, delivery questions, or product details. We communicate directly with every customer."
              className="text-base sm:text-lg text-[#2B1D0E]/80 max-w-xl mx-auto font-light leading-relaxed"
              delay={0.3}
            />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* 2. Left Column: WhatsApp & Contact Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Card with Decorative QR Code */}
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
                  <p className="text-xs sm:text-sm text-[#2B1D0E]/80 mt-1 font-light">
                    Direct conversation with Elvia Herbals for orders and inquiries.
                  </p>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDF6EC] border border-[#C9973A]/25">
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 flex items-center justify-center shrink-0 text-[#25D366]">
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

              {/* Verified Contact Details with Spotlight Hover */}
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
                    link: undefined,
                  },
                  {
                    icon: <Instagram className="w-5 h-5 text-[#C9973A]" />,
                    title: 'Instagram',
                    detail: BRAND.instagramHandle,
                    link: BRAND.instagram,
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5 fill-[#C9973A] group-hover:fill-[#1877F2] transition-colors" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    ),
                    title: 'Facebook',
                    detail: 'Elvia Herbals',
                    link: BRAND.facebook,
                  },
                ].map((card, idx) => (
                  <ContactSpotlightCard
                    key={idx}
                    href={card.link}
                    target={card.link && card.link.startsWith('http') ? '_blank' : undefined}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#E8EFE3] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform z-10">
                      {card.icon}
                    </div>
                    <div className="flex-1 min-w-0 z-10">
                      <p className="text-xs font-semibold text-[#C9973A] uppercase tracking-wide">
                        {card.title}
                      </p>
                      <p className="font-serif font-bold text-base text-[#2B1D0E] group-hover:text-[#2F5D3A] transition-colors truncate">
                        {card.detail}
                      </p>
                    </div>
                  </ContactSpotlightCard>
                ))}
              </div>
            </div>

            {/* 3. Right Column: Form with Error Shake & FAQs */}
            <div className="lg:col-span-7 space-y-10">
              <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-[#C9973A]/30 shadow-botanical-lg relative">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D0E] mb-2">
                  Send a Message
                </h2>
                <p className="text-xs sm:text-sm text-[#2B1D0E]/75 mb-6 font-light">
                  Fill in your details to open WhatsApp with your prefilled inquiry.
                </p>

                {isSuccess ? (
                  <div className="py-12 text-center space-y-4">
                    {/* Self-drawing SVG checkmark */}
                    <div className="w-16 h-16 rounded-full bg-[#E8EFE3] text-[#2F5D3A] flex items-center justify-center mx-auto border-2 border-[#4C8C4A]">
                      <svg className="w-10 h-10 text-[#4C8C4A]" viewBox="0 0 24 24" fill="none">
                        <motion.path
                          d="M5 13l4 4L19 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          variants={drawPath}
                          initial="hidden"
                          animate="visible"
                        />
                      </svg>
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#2F5D3A]">
                      Opening WhatsApp...
                    </h3>
                    <p className="text-sm text-[#2B1D0E]/80 max-w-md mx-auto font-light">
                      Connecting you directly to Elvia Herbals on WhatsApp.
                    </p>
                  </div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    animate={
                      shake
                        ? {
                            x: [-8, 8, -6, 6, -3, 3, 0],
                            transition: { duration: 0.45 },
                          }
                        : {}
                    }
                    className="space-y-5"
                  >
                    {/* Floating Label: Name */}
                    <div className="relative">
                      <input
                        type="text"
                        id="contact-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onBlur={() => handleBlur('name')}
                        placeholder=" "
                        className="peer w-full px-4 pt-5 pb-2 rounded-2xl bg-[#FDF6EC] border border-[#C9973A]/30 text-sm text-[#2B1D0E] focus:outline-none focus:border-[#2F5D3A] transition-colors"
                      />
                      <label
                        htmlFor="contact-name"
                        className="absolute left-4 top-3.5 text-xs text-[#2B1D0E]/60 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#2F5D3A] peer-focus:font-bold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#2F5D3A] peer-[:not(:placeholder-shown)]:font-bold"
                      >
                        Your Name *
                      </label>
                      {touched.name && errors.name && (
                        <p className="text-xs text-red-600 mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Floating Label: Phone */}
                    <div className="relative">
                      <input
                        type="tel"
                        id="contact-phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        onBlur={() => handleBlur('phone')}
                        placeholder=" "
                        className="peer w-full px-4 pt-5 pb-2 rounded-2xl bg-[#FDF6EC] border border-[#C9973A]/30 text-sm text-[#2B1D0E] focus:outline-none focus:border-[#2F5D3A] transition-colors"
                      />
                      <label
                        htmlFor="contact-phone"
                        className="absolute left-4 top-3.5 text-xs text-[#2B1D0E]/60 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#2F5D3A] peer-focus:font-bold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#2F5D3A] peer-[:not(:placeholder-shown)]:font-bold"
                      >
                        WhatsApp / Phone Number *
                      </label>
                      {touched.phone && errors.phone && (
                        <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Floating Label: Message */}
                    <div className="relative">
                      <textarea
                        rows={4}
                        id="contact-message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onBlur={() => handleBlur('message')}
                        placeholder=" "
                        className="peer w-full px-4 pt-5 pb-2 rounded-2xl bg-[#FDF6EC] border border-[#C9973A]/30 text-sm text-[#2B1D0E] focus:outline-none focus:border-[#2F5D3A] transition-colors resize-none"
                      />
                      <label
                        htmlFor="contact-message"
                        className="absolute left-4 top-3.5 text-xs text-[#2B1D0E]/60 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:text-[#2F5D3A] peer-focus:font-bold peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#2F5D3A] peer-[:not(:placeholder-shown)]:font-bold"
                      >
                        Message or Order Details *
                      </label>
                      {touched.message && errors.message && (
                        <p className="text-xs text-red-600 mt-1">{errors.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      data-cursor="order"
                      className="btn-shine w-full flex items-center justify-center gap-2 bg-[#2F5D3A] hover:bg-[#1E3F27] text-white py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>Continue to WhatsApp</span>
                    </button>
                  </motion.form>
                )}
              </div>

              {/* 4. FAQ Accordion with Confirmed Answers */}
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
                            className={`w-4 h-4 text-[#C9973A] transition-transform duration-300 shrink-0 ml-2 ${
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
                              className="overflow-hidden px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#2B1D0E]/80 border-t border-[#C9973A]/15 pt-3 leading-relaxed font-light"
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
