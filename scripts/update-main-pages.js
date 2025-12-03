const fs = require('fs');

// Homepage with product image
const homePage = `import Link from "next/link";
import Image from "next/image";
import { Droplets, Hand, Thermometer, Award, Sparkles, Heart, Shield, Leaf, Star, ArrowRight } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TESTIMONIALS, PRODUCT_IMAGE } from "@/lib/constants";

export default function Home() {
  const features = [
    { icon: <Droplets className="w-8 h-8" />, title: "100% Pure", description: "No chemicals, no preservatives. Just pure almond goodness." },
    { icon: <Hand className="w-8 h-8" />, title: "Handmade", description: "Crafted with care using traditional methods." },
    { icon: <Thermometer className="w-8 h-8" />, title: "Cold Pressed", description: "Low temperature extraction preserves all nutrients." },
    { icon: <Award className="w-8 h-8" />, title: "Premium Quality", description: "Made from the finest California almonds." },
  ];

  const benefits = [
    { icon: <Sparkles className="w-10 h-10" />, title: "Glowing Skin", description: "Natural moisturizer that gives your skin a healthy, radiant glow." },
    { icon: <Heart className="w-10 h-10" />, title: "Hair Nourishment", description: "Strengthens hair roots and promotes thick, lustrous hair growth." },
    { icon: <Shield className="w-10 h-10" />, title: "100% Natural", description: "Free from chemicals, preservatives, and harmful additives." },
    { icon: <Leaf className="w-10 h-10" />, title: "Traditional Process", description: "Made using age-old techniques to preserve maximum nutrients." },
  ];

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 fade-in">
              <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
                <span className="w-2 h-2 bg-[#3D6A46] rounded-full animate-pulse" />
                <span className="text-sm font-medium text-[#3D6A46]">100% Natural and Handmade</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D1F0E] leading-tight">
                Pure Homemade <span className="text-[#D9A441]">Almond Oil</span>
              </h1>
              <p className="text-xl text-[#8B7355] max-w-lg">
                Made by Hand, With Love. Experience the natural goodness of cold-pressed almond oil for radiant skin and lustrous hair.
              </p>
              <div className="flex flex-wrap gap-4">
                <WhatsAppButton message="Hi Elvia Herbals! I am interested in buying your pure almond oil.">Buy Now on WhatsApp</WhatsAppButton>
                <Link href="/product" className="inline-flex items-center gap-2 btn-secondary px-6 py-3 rounded-full font-medium">
                  View Product <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-[#8B7355]">
                  <div className="w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center"><Shield className="w-5 h-5 text-[#3D6A46]" /></div>
                  <span className="text-sm font-medium">No Chemicals</span>
                </div>
                <div className="flex items-center gap-2 text-[#8B7355]">
                  <div className="w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center"><Leaf className="w-5 h-5 text-[#3D6A46]" /></div>
                  <span className="text-sm font-medium">Cold Pressed</span>
                </div>
                <div className="flex items-center gap-2 text-[#8B7355]">
                  <div className="w-10 h-10 rounded-full bg-[#F5E6D3] flex items-center justify-center"><Heart className="w-5 h-5 text-[#D9A441]" /></div>
                  <span className="text-sm font-medium">Made with Love</span>
                </div>
              </div>
            </div>
            <div className="relative slide-in-right">
              <div className="relative w-full max-w-md mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#D9A441]/20 to-[#A6763B]/20 blur-3xl" />
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 overflow-hidden">
                  <Image
                    src={PRODUCT_IMAGE}
                    alt="Elvia Herbals Pure Almond Oil"
                    width={400}
                    height={500}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
                <div className="absolute top-4 right-4 bg-white rounded-full px-4 py-2 shadow-lg">
                  <span className="text-sm font-bold text-[#3D6A46]">100% Pure</span>
                </div>
                <div className="absolute bottom-20 -left-4 bg-white rounded-full px-4 py-2 shadow-lg">
                  <span className="text-sm font-bold text-[#D9A441]">Cold Pressed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D1F0E] mb-4">Why Choose <span className="text-[#D9A441]">Elvia Herbals</span>?</h2>
            <p className="text-lg text-[#8B7355] max-w-2xl mx-auto">We take pride in crafting the purest almond oil using traditional methods</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8 text-center group cursor-pointer">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#FFF5E6] flex items-center justify-center text-[#D9A441] group-hover:bg-[#D9A441] group-hover:text-white transition-colors">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#2D1F0E] mb-2">{feature.title}</h3>
                <p className="text-[#8B7355]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5E6D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#2D1F0E] mb-6">Benefits of Pure <span className="text-[#D9A441]">Almond Oil</span></h2>
              <p className="text-lg text-[#8B7355] mb-8">Our cold-pressed almond oil retains all the natural vitamins and minerals, providing numerous benefits for your skin, hair, and overall wellness.</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full gradient-gold flex items-center justify-center text-white">{benefit.icon}</div>
                    <div>
                      <h3 className="font-bold text-[#2D1F0E] mb-1">{benefit.title}</h3>
                      <p className="text-sm text-[#8B7355]">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center">
                <Image
                  src={PRODUCT_IMAGE}
                  alt="Elvia Herbals Almond Oil 100ml"
                  width={250}
                  height={350}
                  className="w-auto h-64 object-contain mb-6"
                />
                <h3 className="text-2xl font-bold text-[#2D1F0E] mb-2">100ml Bottle</h3>
                <p className="text-3xl font-bold text-[#D9A441] mb-4">Rs.599</p>
                <WhatsAppButton message="Hi Elvia Herbals! I want to order a 100ml bottle of pure almond oil." className="text-sm">Order Now</WhatsAppButton>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#3D6A46] text-white px-4 py-2 rounded-full font-bold shadow-lg">Best Seller</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D1F0E] mb-4">What Our Customers Say</h2>
            <p className="text-lg text-[#8B7355]">Real reviews from our happy customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="card p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-[#D9A441] text-[#D9A441]" />))}
                </div>
                <p className="text-[#8B7355] mb-6 italic">{testimonial.text}</p>
                <div>
                  <p className="font-bold text-[#2D1F0E]">{testimonial.name}</p>
                  <p className="text-sm text-[#8B7355]">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 gradient-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Experience Pure Goodness?</h2>
          <p className="text-xl text-white/90 mb-8">Order now and get your bottle of pure, handmade almond oil delivered to your doorstep.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <WhatsAppButton message="Hi Elvia Herbals! I would like to place an order for your pure almond oil." className="bg-white text-[#D9A441] hover:bg-[#FFF5E6] hover:text-[#A6763B]">Order on WhatsApp</WhatsAppButton>
            <Link href="/product" className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-[#D9A441] transition-colors">
              View All Products <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
`;

fs.writeFileSync('d:/el/elvya/src/app/page.tsx', homePage);
console.log('Updated homepage');

// Product page with image
const productPage = \`"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Heart, Shield, Leaf, Check, Star, ChevronDown, ChevronUp } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PRODUCT, TESTIMONIALS, PRODUCT_IMAGE } from "@/lib/constants";
import { createOrderMessage } from "@/lib/utils";

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = useState(PRODUCT.sizes[1]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How is the almond oil made?", a: "Our almond oil is cold-pressed using traditional wooden press (ghani) method. This preserves all the natural nutrients and ensures the oil remains pure and unrefined." },
    { q: "Is this oil suitable for all skin types?", a: "Yes! Pure almond oil is gentle and suitable for all skin types including sensitive skin. It is non-comedogenic and absorbs well without leaving a greasy residue." },
    { q: "How should I store the oil?", a: "Store in a cool, dry place away from direct sunlight. The oil has a shelf life of 12 months from the date of manufacturing." },
    { q: "Can I use this for cooking?", a: "While our almond oil is 100% pure and edible, it is primarily formulated for topical use on skin and hair. For cooking, we recommend using oils specifically meant for culinary purposes." },
  ];

  return (
    <div className="min-h-screen bg-[#FFF5E6]">
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl shadow-xl p-8 flex items-center justify-center">
                <Image
                  src={PRODUCT_IMAGE}
                  alt="Elvia Herbals Pure Almond Oil"
                  width={400}
                  height={500}
                  className="w-full max-w-sm h-auto object-contain"
                  priority
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#3D6A46]/10 text-[#3D6A46] px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Check className="w-4 h-4" /> In Stock
                </div>
                <h1 className="text-4xl font-bold text-[#2D1F0E] mb-2">{PRODUCT.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-[#D9A441] text-[#D9A441]" />))}
                  </div>
                  <span className="text-[#8B7355]">(50+ Reviews)</span>
                </div>
                <p className="text-lg text-[#8B7355]">{PRODUCT.description}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-[#2D1F0E]">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {PRODUCT.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={\\\`px-6 py-3 rounded-xl border-2 transition-all \\\${
                        selectedSize.id === size.id
                          ? "border-[#D9A441] bg-[#D9A441]/10"
                          : "border-[#D9C4A8] hover:border-[#D9A441]"
                      }\\\`}
                    >
                      <span className="block font-bold text-[#2D1F0E]">{size.label}</span>
                      <span className="text-sm text-[#8B7355]">
                        <span className="line-through mr-2">Rs.{size.originalPrice}</span>
                        <span className="text-[#D9A441] font-bold">Rs.{size.price}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-[#D9A441]">Rs.{selectedSize.price}</div>
                <div className="bg-[#3D6A46] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Save Rs.{selectedSize.originalPrice - selectedSize.price}
                </div>
              </div>

              <WhatsAppButton
                message={createOrderMessage(PRODUCT.name, selectedSize.label, selectedSize.price)}
                className="w-full py-4 text-lg"
              >
                Buy Now on WhatsApp
              </WhatsAppButton>

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
                    <p className="font-bold text-[#2D1F0E]">Cold Pressed</p>
                    <p className="text-sm text-[#8B7355]">Traditional method</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#2D1F0E]">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {PRODUCT.ingredients.map((ingredient, index) => (
                    <span key={index} className="px-4 py-2 bg-white rounded-full text-[#8B7355] text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#2D1F0E]">How to Use</h3>
                <ul className="space-y-3">
                  {PRODUCT.howToUse.map((step, index) => (
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
            {[
              { icon: <Sparkles className="w-8 h-8" />, title: "Glowing Skin", desc: "Natural moisturizer for radiant skin" },
              { icon: <Heart className="w-8 h-8" />, title: "Hair Care", desc: "Strengthens and nourishes hair" },
              { icon: <Shield className="w-8 h-8" />, title: "Anti-Aging", desc: "Rich in Vitamin E antioxidants" },
              { icon: <Leaf className="w-8 h-8" />, title: "Natural", desc: "No chemicals or preservatives" },
            ].map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-gold flex items-center justify-center text-white">{benefit.icon}</div>
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
    </div>
  );
}
\`;

fs.writeFileSync('d:/el/elvya/src/app/product/page.tsx', productPage);
console.log('Updated product page');

console.log('All main pages updated with product image!');
