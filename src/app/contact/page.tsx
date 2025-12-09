"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Instagram, Clock, Send } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { BRAND } from "@/lib/constants";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const whatsappMessage = `Hi ELVYA! My name is ${formData.name}. ${formData.message} You can reach me at ${formData.email} or ${formData.phone}.`;
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`, "_blank");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#FFF5E6]">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#2D1F0E] mb-4">Get in Touch</h1>
            <p className="text-lg text-[#8B7355] max-w-2xl mx-auto">
              We would love to hear from you! Reach out to us for orders, questions, or just to say hello.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-[#2D1F0E] mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <a href={`https://wa.me/${BRAND.whatsapp}`} className="flex items-center gap-4 text-[#8B7355] hover:text-[#D9A441] transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-[#2D1F0E]">WhatsApp</p>
                      <p>{BRAND.phone}</p>
                    </div>
                  </a>
                  <a href={`tel:${BRAND.phone}`} className="flex items-center gap-4 text-[#8B7355] hover:text-[#D9A441] transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#D9A441]/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[#D9A441]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2D1F0E]">Phone</p>
                      <p>{BRAND.phone}</p>
                    </div>
                  </a>
                  <a href={`mailto:${BRAND.email}`} className="flex items-center gap-4 text-[#8B7355] hover:text-[#D9A441] transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#D9A441]/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-[#D9A441]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2D1F0E]">Email</p>
                      <p>{BRAND.email}</p>
                    </div>
                  </a>
                  <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-[#8B7355] hover:text-[#D9A441] transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#E1306C]/10 flex items-center justify-center">
                      <Instagram className="w-6 h-6 text-[#E1306C]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2D1F0E]">Instagram</p>
                      <p>@elvya</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 text-[#8B7355]">
                    <div className="w-12 h-12 rounded-full bg-[#3D6A46]/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#3D6A46]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2D1F0E]">Location</p>
                      <p>{BRAND.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-[#D9A441]" />
                  <h3 className="text-xl font-bold text-[#2D1F0E]">Business Hours</h3>
                </div>
                <div className="space-y-3 text-[#8B7355]">
                  <div>
                    <p className="font-semibold text-[#2D1F0E]">Monday - Friday</p>
                    <p>9:00 AM - 6:00 PM</p>
                    <p className="text-sm italic text-[#D9A441]">Available to take orders through WhatsApp</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#2D1F0E]">Saturday & Sunday</p>
                    <p className="text-red-600 font-medium">Holiday</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-8">
              <h2 className="text-2xl font-bold text-[#2D1F0E] mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#2D1F0E] mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] outline-none transition-colors bg-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D1F0E] mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] outline-none transition-colors bg-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D1F0E] mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] outline-none transition-colors bg-white"
                    placeholder="+91 99999 99999"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D1F0E] mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-[#D9C4A8] focus:border-[#D9A441] focus:ring-1 focus:ring-[#D9A441] outline-none transition-colors bg-white resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-4 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? "Sending..." : "Send via WhatsApp"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 gradient-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Prefer WhatsApp?</h2>
          <p className="text-xl text-white/90 mb-8">Chat with us directly for quick responses</p>
          <WhatsAppButton
            message="Hi ELVYA! I have a question."
            className="bg-white text-[#D9A441] hover:bg-[#FFF5E6]"
          >
            Start WhatsApp Chat
          </WhatsAppButton>
        </div>
      </section>
    </div>
  );
}
