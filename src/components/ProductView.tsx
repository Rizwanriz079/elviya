'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Heart,
  Shield,
  Leaf,
  Check,
  Star,
  ChevronDown,
  Truck,
  Clock,
  MapPin,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Bell,
} from 'lucide-react';
import {
  PRODUCTS,
  DELIVERY_ZONES,
  CatalogProduct,
  DeliveryZone,
  BRAND,
  getWhatsAppOrderUrl,
} from '@/lib/constants';

export function productUrl(id: string) {
  return id === 'neem-oil' ? '/product' : `/product/${id}`;
}

export default function ProductView({ productId }: { productId: string }) {
  const router = useRouter();
  const product: CatalogProduct = PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0];

  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>('kerala');
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');
  const [isZoomed, setIsZoomed] = useState(false);

  // Sync selected image when product changes
  useEffect(() => {
    setSelectedImage(product.gallery[0] || product.image);
  }, [product]);

  const deliveryCharge =
    selectedZone === 'kerala'
      ? product.deliveryChargeKerala
      : product.deliveryChargeRestOfIndia;
  const totalPrice = product.price + deliveryCharge;
  const zoneLabel = selectedZone === 'kerala' ? 'Kerala' : 'Rest of India';

  const orderUrl = getWhatsAppOrderUrl(product, selectedZone);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const otherProducts = PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="min-h-screen pb-24">
      {/* 1. Breadcrumb & Animated Leaf Banner */}
      <div className="bg-[#E8EFE3]/60 border-b border-[#C9973A]/20 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs sm:text-sm text-[#2B1D0E]/80">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#2F5D3A] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C9973A]" />
            <Link href="/product" className="hover:text-[#2F5D3A] transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#C9973A]" />
            <span className="font-semibold text-[#2F5D3A]">{product.name}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#2F5D3A] font-medium">
            <Leaf className="w-3.5 h-3.5 text-[#4C8C4A] animate-pulse" />
            <span>Pure Kerala Botanical Formulation</span>
          </div>
        </div>
      </div>

      {/* 2. Product Selector Cards */}
      <div className="py-6 bg-[#FDF6EC] border-b border-[#C9973A]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-4 h-4 text-[#C9973A]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F5D3A]">
              Select Product Formulation
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {PRODUCTS.map((p) => {
              const isSelected = p.id === product.id;
              return (
                <Link
                  key={p.id}
                  href={productUrl(p.id)}
                  scroll={false}
                  className={`relative p-3.5 rounded-2xl flex items-center gap-3.5 transition-all duration-300 border ${
                    isSelected
                      ? 'border-[#2F5D3A] bg-[#E8EFE3]/80 shadow-botanical'
                      : 'border-[#C9973A]/25 bg-[#FDF6EC]/60 hover:bg-[#FDF6EC]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="product-selector-pill"
                      className="absolute inset-0 rounded-2xl border-2 border-[#2F5D3A] pointer-events-none"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white/70 flex-shrink-0 border border-[#C9973A]/20">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="56px"
                      className={`object-contain p-1 ${p.inStock ? '' : 'grayscale opacity-75'}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-serif font-bold text-sm text-[#2B1D0E] truncate">
                        {p.name}
                      </p>
                      <span className="text-xs text-[#C9973A] font-semibold">{p.size}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-bold text-[#2F5D3A]">₹{p.price}</span>
                      {p.inStock ? (
                        <span className="text-[10px] font-bold text-[#4C8C4A] bg-[#E8EFE3] px-2 py-0.5 rounded-full">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                          Restocking Soon
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Main Product Details View */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Gallery with Zoom */}
          <div className="lg:col-span-6 space-y-4">
            {/* Primary Main Image Box */}
            <div
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              className="relative w-full aspect-square rounded-3xl overflow-hidden glass-panel border border-[#C9973A]/30 flex items-center justify-center p-8 cursor-zoom-in"
            >
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.inStock ? (
                  <span className="px-3.5 py-1.5 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-bold uppercase tracking-wider border border-[#4C8C4A]/30">
                    100% Homemade
                  </span>
                ) : (
                  <span className="px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-300">
                    Out of Stock
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-[#FDF6EC]/90 text-[#C9973A] text-xs font-bold tracking-wide border border-[#C9973A]/30 backdrop-blur-sm">
                  {product.size} Glass Bottle
                </span>
              </div>

              {/* Main Image */}
              <div className="relative w-full h-full max-w-[340px] max-h-[440px]">
                <Image
                  src={selectedImage}
                  alt={`${product.name} ${product.size}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 500px"
                  className={`object-contain transition-transform duration-500 ${
                    isZoomed ? 'scale-110' : 'scale-100'
                  } ${product.inStock ? '' : 'grayscale opacity-80'}`}
                  priority
                />
              </div>
            </div>

            {/* Thumbnail Switcher */}
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200 bg-[#FDF6EC] p-1.5 ${
                    selectedImage === img
                      ? 'border-[#2F5D3A] shadow-md scale-105'
                      : 'border-[#C9973A]/25 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="100px"
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Delivery Price Calculator & WhatsApp Action */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-2">
                <div className="flex text-[#C9973A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#2F5D3A]">
                  5.0 (Handcrafted in Kerala)
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B1D0E] leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mt-2">
                <span className="px-3 py-1 rounded-full bg-[#E8EFE3] text-[#2F5D3A] text-xs font-bold uppercase tracking-wider">
                  {product.size}
                </span>
                <span className="text-xs text-[#2B1D0E]/70 font-script text-base">
                  Pure virgin coconut oil & garden neem
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#2B1D0E]/85 leading-relaxed">
              {product.description}
            </p>

            {/* Price & Delivery Area Interactive Toggle */}
            <div className="glass-panel p-6 rounded-3xl border border-[#C9973A]/30 space-y-5 shadow-botanical">
              {/* Delivery Zone Toggle */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2F5D3A] mb-2.5">
                  Deliver To:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {DELIVERY_ZONES.map((z) => {
                    const isSelected = selectedZone === z.id;
                    return (
                      <button
                        key={z.id}
                        type="button"
                        onClick={() => setSelectedZone(z.id)}
                        className={`py-3 px-4 rounded-2xl text-left border text-xs sm:text-sm font-semibold transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#2F5D3A] text-[#FDF6EC] border-[#2F5D3A] shadow-md'
                            : 'bg-[#FDF6EC]/80 text-[#2B1D0E] border-[#C9973A]/30 hover:bg-[#FDF6EC]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span>{z.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#E0B35C]" />}
                        </div>
                        <span className={`text-[11px] mt-1 ${isSelected ? 'text-[#E0B35C]' : 'text-[#2B1D0E]/60'}`}>
                          {z.id === 'kerala' ? '+₹50 Delivery' : '+₹90 Standard Delivery'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Breakdown Calculation */}
              <div className="p-4 rounded-2xl bg-[#E8EFE3]/70 border border-[#4C8C4A]/25 space-y-2">
                <div className="flex justify-between text-xs sm:text-sm text-[#2B1D0E]/80">
                  <span>Product Price ({product.size}):</span>
                  <span className="font-semibold text-[#2B1D0E]">₹{product.price}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-[#2B1D0E]/80">
                  <span>Delivery to {zoneLabel}:</span>
                  <span className="font-semibold text-[#2F5D3A]">+₹{deliveryCharge}</span>
                </div>
                <div className="pt-2 border-t border-[#4C8C4A]/20 flex justify-between items-baseline">
                  <span className="font-serif font-bold text-base text-[#2B1D0E]">Total Amount:</span>
                  <div className="flex items-baseline gap-2">
                    <motion.span
                      key={totalPrice}
                      initial={{ scale: 1.15, color: '#C9973A' }}
                      animate={{ scale: 1, color: '#2F5D3A' }}
                      transition={{ duration: 0.3 }}
                      className="font-serif text-3xl font-bold text-[#2F5D3A]"
                    >
                      ₹{totalPrice}
                    </motion.span>
                    <span className="text-xs text-[#2B1D0E]/60">all inclusive</span>
                  </div>
                </div>
              </div>

              {/* Primary Order Action Button */}
              {product.inStock ? (
                <a
                  href={orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 rounded-2xl font-bold shadow-xl shadow-[#25D366]/30 text-base transition-all hover:scale-[1.02] active:scale-95 text-center"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Order {product.size} for ₹{totalPrice} (incl. delivery)</span>
                </a>
              ) : (
                <div className="space-y-3">
                  <a
                    href={getWhatsAppOrderUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#25D366]/25 text-base"
                  >
                    <Bell className="w-5 h-5 fill-current" />
                    <span>Notify Me on WhatsApp When Available</span>
                  </a>
                  <button
                    disabled
                    className="w-full py-3 rounded-2xl bg-gray-200 text-gray-500 font-semibold cursor-not-allowed text-sm"
                  >
                    Temporarily Out of Stock
                  </button>
                </div>
              )}
            </div>

            {/* Trust Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { icon: '🌿', label: 'Zero Chemicals' },
                { icon: '🥥', label: 'Virgin Coconut Oil' },
                { icon: '🤲', label: 'Made with Love' },
                { icon: '🇮🇳', label: 'Delivery Across India' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-[#E8EFE3]/50 border border-[#4C8C4A]/20 text-center"
                >
                  <span className="text-xl block mb-1">{item.icon}</span>
                  <span className="text-[11px] font-bold text-[#2F5D3A] block">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Accordions: Description, Ingredients, How to Use, Benefits, Delivery */}
            <div className="space-y-3 pt-4">
              {[
                {
                  id: 'desc',
                  title: 'Description & Formulation',
                  content: product.description,
                },
                {
                  id: 'ingredients',
                  title: 'Pure Ingredients',
                  contentList: product.ingredients,
                },
                {
                  id: 'howToUse',
                  title: 'How to Use & Rituals',
                  steps: product.howToUse,
                },
                {
                  id: 'delivery',
                  title: 'Delivery & Shipping Information',
                  faqs: [
                    'Within Kerala: Flat ₹50 delivery charge, delivers in 2-3 business days.',
                    'Rest of India: Standard ₹90 delivery charge (confirmed on WhatsApp), delivers in 4-6 business days.',
                    'Direct dispatch from Kerala with protective eco-friendly packaging.',
                  ],
                },
              ].map((acc) => {
                const isOpen = openAccordion === acc.id;
                return (
                  <div
                    key={acc.id}
                    className="rounded-2xl border border-[#C9973A]/25 overflow-hidden bg-[#FDF6EC]/80"
                  >
                    <button
                      type="button"
                      onClick={() => toggleAccordion(acc.id)}
                      className="w-full py-4 px-6 flex items-center justify-between text-left font-serif font-bold text-base text-[#2B1D0E] hover:text-[#2F5D3A] transition-colors"
                    >
                      <span>{acc.title}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#C9973A] transition-transform duration-300 ${
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
                          className="overflow-hidden px-6 pb-5 text-xs sm:text-sm text-[#2B1D0E]/80 space-y-2 border-t border-[#C9973A]/15 pt-3"
                        >
                          {acc.content && <p className="leading-relaxed">{acc.content}</p>}

                          {acc.contentList && (
                            <ul className="space-y-1.5">
                              {acc.contentList.map((item, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <Check className="w-3.5 h-3.5 text-[#4C8C4A]" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {acc.steps && (
                            <div className="space-y-2.5">
                              {acc.steps.map((st, i) => (
                                <div key={i} className="bg-[#FDF6EC] p-3 rounded-xl border border-[#C9973A]/15">
                                  <p className="font-bold text-[#2F5D3A] text-xs">{st.title}</p>
                                  <p className="text-xs text-[#2B1D0E]/75 mt-0.5">{st.instructions}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {acc.faqs && (
                            <ul className="space-y-1.5">
                              {acc.faqs.map((f, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <Truck className="w-3.5 h-3.5 text-[#C9973A] flex-shrink-0 mt-0.5" />
                                  <span>{f}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 4. You May Also Like Section */}
        {otherProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#C9973A]/25">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9973A]">
                  Artisan Herbal Care
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2B1D0E]">
                  You May Also Like
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProducts.map((p) => (
                <Link
                  key={p.id}
                  href={productUrl(p.id)}
                  className="glass-panel p-6 rounded-3xl border border-[#C9973A]/25 shadow-botanical hover:shadow-botanical-lg transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square w-full rounded-2xl bg-white/70 overflow-hidden mb-4 p-4">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="300px"
                        className={`object-contain group-hover:scale-105 transition-transform duration-300 ${
                          p.inStock ? '' : 'grayscale opacity-75'
                        }`}
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#C9973A]">{p.size}</span>
                    <h4 className="font-serif text-xl font-bold text-[#2B1D0E] group-hover:text-[#2F5D3A] transition-colors mt-0.5">
                      {p.name}
                    </h4>
                    <p className="text-xs text-[#2B1D0E]/70 mt-1 line-clamp-2">
                      {p.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#C9973A]/15 flex items-center justify-between">
                    <span className="font-bold text-[#2F5D3A]">₹{p.price}</span>
                    <span className="text-xs font-semibold text-[#C9973A] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 5. Sticky Mobile Bottom Bar (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDF6EC]/98 backdrop-blur-xl border-t border-[#C9973A]/30 p-3.5 shadow-2xl">
        <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
          <div>
            <span className="text-[10px] text-[#2B1D0E]/60 uppercase tracking-wide block">Total ({zoneLabel})</span>
            <span className="font-serif text-xl font-bold text-[#2F5D3A]">
              ₹{totalPrice}
            </span>
          </div>

          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shine flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-5 rounded-full font-bold text-sm shadow-md shadow-[#25D366]/30"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>{product.inStock ? 'Order on WhatsApp' : 'Notify on WhatsApp'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
