"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Heart, Shield, Leaf, Check, Star, ChevronDown, ChevronUp, Package, Truck, Clock } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductShowcase from "@/components/ProductShowcase";
import { PRODUCTS, TESTIMONIALS, orderMessage } from "@/lib/constants";

const BENEFIT_ICONS = [
  <Sparkles key="s" className="w-8 h-8" />,
  <Heart key="h" className="w-8 h-8" />,
  <Shield key="sh" className="w-8 h-8" />,
  <Leaf key="l" className="w-8 h-8" />,
];

export default function ProductPage() {
  const [selectedId, setSelectedId] = useState(PRODUCTS[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Allow linking straight to a product, e.g. /product?item=almond-oil
  useEffect(() => {
    const item = new URLSearchParams(window.location.search).get("item");
    if (item && PRODUCTS.some((p) => p.id === item)) setSelectedId(item);
  }, []);

  const product = PRODUCTS.find((p) => p.id === selectedId) ?? PRODUCTS[0];
  const total = product.price + product.deliveryCharge;
  const freeShipping = product.deliveryCharge === 0;
  const faqs = product.faqs;

  return (
    <div className="min-h-screen bg-[#FFF5E6]">
      {/* Product Selector */}
      <section className="py-8 bg-white border-b border-[#F5E6D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Package className="w-5 h-5 text-[#D9A441]" />
            <h2 className="text-lg font-bold text-[#2D1F0E]">Our Products</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {PRODUCTS.map((p) => {
              const isSelected = p.id === product.id;
              return (
                <button
                  key={p.id}
                  onClick={() => { setSelectedId(p.id); setOpenFaq(null); }}
                  className={`flex-shrink-0 flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-[#D9A441] bg-[#D9A441]/10"
                      : "border-[#F5E6D3] hover:border-[#D9A441]/50 bg-white"
                  }`}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#F5E6D3] flex-shrink-0">
                    <Image src={p.image} alt={p.name} width={64} height={64} className={`object-cover w-full h-full ${p.inStock ? "" : "grayscale opacity-70"}`} />
                  </div>
                  <div className="text-left">
                    <p className={`font-bold text-sm ${isSelected ? "text-[#D9A441]" : "text-[#2D1F0E]"}`}>{p.name} <span className="font-normal text-[#8B7355]">{p.size}</span></p>
                    {p.inStock ? (
                      <p className="text-xs text-[#8B7355]">Rs.{p.price}</p>
                    ) : (
                      <p className="text-xs font-semibold text-red-700">Out of stock</p>
                    )}
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#D9A441] flex items-center justify-center ml-2">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="lg:sticky lg:top-24 lg:self-start">
              {product.id === "neem-oil" ? (
                <ProductShowcase
                  image={product.image}
                  alt={`Elvia Herbals ${product.name} ${product.size}`}
                  badgeTop={product.badges[0]}
                  badgeBottom={product.badges[1]}
                  priority
                />
              ) : (
                /* Static (non-animated) display for other products */
                <div className="relative flex items-center justify-center min-h-[450px]">
                  <div className="absolute w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-br from-[#F5E6D3] via-[#EDD9B5] to-[#E5C99A]" />
                  <div className="relative z-10 w-[280px] h-[280px] sm:w-[330px] sm:h-[330px] rounded-full overflow-hidden border-8 border-white/70 shadow-xl">
                    <Image
                      src={product.image}
                      alt={`${product.name} ${product.size}`}
                      fill
                      sizes="330px"
                      className={`object-cover ${product.inStock ? "" : "grayscale opacity-80"}`}
                      priority
                    />
                  </div>
                  {!product.inStock && (
                    <div className="absolute top-6 right-6 z-20 bg-red-700 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Out of Stock
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div>
                {product.inStock ? (
                  <div className="inline-flex items-center gap-2 bg-[#3D6A46]/10 text-[#3D6A46] px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <Check className="w-4 h-4" /> In Stock
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <Clock className="w-4 h-4" /> Out of Stock
                  </div>
                )}
                <h1 className="text-4xl font-bold text-[#2D1F0E] mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-[#D9A441] text-[#D9A441]" />))}
                  </div>
                </div>
                <p className="text-lg text-[#8B7355]">{product.description}</p>
              </div>

              <div className="flex items-center gap-3">
                <h3 className="font-bold text-[#2D1F0E] text-xl">Size:</h3>
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl border-2 border-[#D9A441] bg-[#D9A441]/10">
                  <span className="font-bold text-[#2D1F0E] text-lg">{product.size}</span>
                </div>
              </div>

              {product.inStock ? (
                <>
                  {/* Price breakdown */}
                  <div className="bg-gradient-to-r from-[#D9A441]/10 to-[#C4932B]/10 p-6 rounded-2xl border-2 border-[#D9A441]/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#8B7355]">Price ({product.size})</span>
                      <span className="text-right">
                        {product.originalPrice && (
                          <span className="text-[#8B7355] line-through mr-2">Rs.{product.originalPrice}</span>
                        )}
                        <span className="text-3xl font-bold text-[#D9A441]">Rs.{product.price}</span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[#8B7355]">
                      <span className="inline-flex items-center gap-2"><Truck className="w-4 h-4" /> Delivery charge (Kerala)</span>
                      {freeShipping ? (
                        <span className="font-bold text-[#3D6A46]">FREE</span>
                      ) : (
                        <span className="font-semibold">+ Rs.{product.deliveryCharge}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#D9A441]/20">
                      <span className="font-bold text-[#2D1F0E]">Total</span>
                      <span className="text-2xl font-bold text-[#2D1F0E]">Rs.{total}</span>
                    </div>
                  </div>

                  <WhatsAppButton message={orderMessage(product)} className="w-full py-4 text-lg">
                    Order {product.size} for Rs.{total} {freeShipping ? "(free shipping)" : "(incl. delivery)"}
                  </WhatsAppButton>
                </>
              ) : (
                <>
                  <div className="p-6 rounded-2xl border-2 border-red-200 bg-red-50">
                    <p className="text-xl font-bold text-red-700 mb-1">Out of Stock</p>
                    {freeShipping && (
                      <p className="inline-flex items-center gap-2 text-[#3D6A46] font-semibold mb-2"><Truck className="w-4 h-4" /> Free shipping across Kerala when it&apos;s back</p>
                    )}
                    <p className="text-[#8B7355]">We will restock soon. Message us on WhatsApp and we&apos;ll let you know when it&apos;s back.</p>
                  </div>
                  <WhatsAppButton
                    message={`Hi Elvia Herbals! Please let me know when ${product.name} (${product.size}) is back in stock.`}
                    className="w-full py-4 text-lg"
                  >
                    Notify me when back in stock
                  </WhatsAppButton>
                </>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                  <Shield className="w-8 h-8 text-[#3D6A46]" />
                  <div>
                    <p className="font-bold text-[#2D1F0E]">100% Pure</p>
                    <p className="text-sm text-[#8B7355]">No chemicals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl">
                  <Leaf className="w-8 h-8 text-[#3D6A46]" />
                  <div>
                    <p className="font-bold text-[#2D1F0E]">Handmade</p>
                    <p className="text-sm text-[#8B7355]">Traditional method</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#2D1F0E]">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span key={index} className="px-4 py-2 bg-white rounded-full text-[#8B7355] text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#2D1F0E]">How to Use</h3>
                <ul className="space-y-3">
                  {product.howToUse.map((step, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#D9A441] text-white flex items-center justify-center text-sm flex-shrink-0">{index + 1}</span>
                      <span className="text-[#8B7355]">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2D1F0E] text-center mb-12">Benefits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-gold flex items-center justify-center text-white">{BENEFIT_ICONS[index % BENEFIT_ICONS.length]}</div>
                <h3 className="font-bold text-[#2D1F0E] mb-2">{benefit.title}</h3>
                <p className="text-[#8B7355] text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#F5E6D3]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2D1F0E] text-center mb-12">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="font-bold text-[#2D1F0E]">{faq.q}</span>
                  {openFaq === index ? <ChevronUp className="w-5 h-5 text-[#D9A441]" /> : <ChevronDown className="w-5 h-5 text-[#8B7355]" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-[#8B7355]">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Existing reviews are for Almond Oil, so only show them there */}
      {product.id === "almond-oil" && (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2D1F0E] text-center mb-12">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="card p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-[#D9A441] text-[#D9A441]" />))}
                </div>
                <p className="text-[#8B7355] mb-4 italic">{t.text}</p>
                <div>
                  <p className="font-bold text-[#2D1F0E]">{t.name}</p>
                  <p className="text-sm text-[#8B7355]">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
