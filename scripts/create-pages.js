const fs = require('fs');
const path = require('path');

// Home Page
const homePage = `import Link from "next/link";
import { Droplets, Hand, Thermometer, Award, Sparkles, Heart, Shield, Leaf, Star, ArrowRight } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { TESTIMONIALS } from "@/lib/constants";

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
                <WhatsAppButton message="Hi ELVYA! I am interested in buying your pure almond oil.">Buy Now on WhatsApp</WhatsAppButton>
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
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D9A441]/20 to-[#A6763B]/20 animate-pulse" />
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#D9A441]/30 to-[#A6763B]/30" />
                <div className="absolute inset-16 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden">
                  <div className="text-center p-6">
                    <div className="w-24 h-32 mx-auto mb-4 rounded-lg gradient-gold opacity-80" />
                    <p className="text-lg font-bold text-[#2D1F0E]">ELVYA</p>
                    <p className="text-sm text-[#8B7355]">Pure Almond Oil</p>
                  </div>
                </div>
                <div className="absolute top-10 right-0 bg-white rounded-full px-4 py-2 shadow-lg">
                  <span className="text-sm font-bold text-[#3D6A46]">100% Pure</span>
                </div>
                <div className="absolute bottom-20 left-0 bg-white rounded-full px-4 py-2 shadow-lg">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D1F0E] mb-4">Why Choose <span className="text-[#D9A441]">ELVYA</span>?</h2>
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
              <div className="aspect-square bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center">
                <div className="w-32 h-44 rounded-xl gradient-gold mb-6 opacity-90" />
                <h3 className="text-2xl font-bold text-[#2D1F0E] mb-2">100ml Bottle</h3>
                <p className="text-3xl font-bold text-[#D9A441] mb-4">Rs.599</p>
                <WhatsAppButton message="Hi ELVYA! I want to order a 100ml bottle of pure almond oil." className="text-sm">Order Now</WhatsAppButton>
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
            <WhatsAppButton message="Hi ELVYA! I would like to place an order for your pure almond oil." className="bg-white text-[#D9A441] hover:bg-[#FFF5E6] hover:text-[#A6763B]">Order on WhatsApp</WhatsAppButton>
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

// Product Page
const productPage = `"use client";

import { useState } from "react";
import { Sparkles, Heart, Shield, Leaf, Check, Star, ChevronDown, ChevronUp } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import { PRODUCT, TESTIMONIALS } from "@/lib/constants";
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
              <div className="aspect-square bg-white rounded-3xl shadow-xl p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-64 mx-auto mb-6 rounded-xl gradient-gold opacity-90" />
                  <p className="text-2xl font-bold text-[#2D1F0E]">ELVYA</p>
                  <p className="text-[#8B7355]">Pure Almond Oil</p>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-20 h-20 bg-white rounded-lg shadow cursor-pointer hover:ring-2 hover:ring-[#D9A441] transition-all flex items-center justify-center">
                    <div className="w-12 h-16 rounded gradient-gold opacity-70" />
                  </div>
                ))}
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
                      className={\`px-6 py-3 rounded-xl border-2 transition-all \${
                        selectedSize.id === size.id
                          ? "border-[#D9A441] bg-[#D9A441]/10"
                          : "border-[#D9C4A8] hover:border-[#D9A441]"
                      }\`}
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
`;

// About Page
const aboutPage = `import { Heart, Leaf, Award, Users, Target, Eye } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF5E6]">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#2D1F0E] mb-6">
                Our Story
              </h1>
              <p className="text-lg text-[#8B7355] mb-6">
                ELVYA was born from a simple belief: that the best skincare comes from nature, made with love and traditional wisdom passed down through generations.
              </p>
              <p className="text-lg text-[#8B7355] mb-6">
                Our journey began in a small kitchen, where we started making pure almond oil for our family using a traditional wooden press (ghani). The results were so remarkable that friends and family started asking for more.
              </p>
              <p className="text-lg text-[#8B7355]">
                Today, we continue to make every bottle of ELVYA almond oil with the same care and dedication, ensuring that you receive nothing but the purest, most nourishing oil for your skin and hair.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white rounded-3xl shadow-xl p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-40 h-40 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center">
                    <Heart className="w-20 h-20 text-white" />
                  </div>
                  <p className="text-xl font-bold text-[#2D1F0E]">Made with Love</p>
                  <p className="text-[#8B7355]">Since 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D1F0E] mb-4">Our Values</h2>
            <p className="text-lg text-[#8B7355]">What makes ELVYA special</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Leaf className="w-10 h-10" />, title: "Purity", desc: "100% pure, cold-pressed almond oil with no chemicals, preservatives, or additives." },
              { icon: <Heart className="w-10 h-10" />, title: "Care", desc: "Every bottle is made with love and attention to detail, ensuring the highest quality." },
              { icon: <Award className="w-10 h-10" />, title: "Tradition", desc: "We use time-tested traditional methods that have been passed down through generations." },
            ].map((value, index) => (
              <div key={index} className="card p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-gold flex items-center justify-center text-white">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#2D1F0E] mb-4">{value.title}</h3>
                <p className="text-[#8B7355]">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5E6D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D1F0E] mb-4">Our Process</h2>
            <p className="text-lg text-[#8B7355]">How we make our pure almond oil</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Selection", desc: "We handpick the finest California almonds" },
              { step: "2", title: "Preparation", desc: "Almonds are cleaned and prepared carefully" },
              { step: "3", title: "Cold Pressing", desc: "Traditional wooden press extracts pure oil" },
              { step: "4", title: "Packaging", desc: "Bottled fresh and delivered to you" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-gold flex items-center justify-center text-white text-2xl font-bold">{item.step}</div>
                <h3 className="font-bold text-[#2D1F0E] mb-2">{item.title}</h3>
                <p className="text-[#8B7355] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-[#D9A441]/10 flex items-center justify-center">
                <Target className="w-8 h-8 text-[#D9A441]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D1F0E] mb-4">Our Mission</h3>
              <p className="text-[#8B7355]">
                To provide families with pure, natural, and chemical-free almond oil that nourishes skin and hair while supporting traditional methods of oil extraction.
              </p>
            </div>
            <div className="card p-8">
              <div className="w-16 h-16 mb-6 rounded-full bg-[#3D6A46]/10 flex items-center justify-center">
                <Eye className="w-8 h-8 text-[#3D6A46]" />
              </div>
              <h3 className="text-2xl font-bold text-[#2D1F0E] mb-4">Our Vision</h3>
              <p className="text-[#8B7355]">
                To become the most trusted name in natural, homemade beauty products, helping people embrace pure and sustainable skincare solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Join the ELVYA Family</h2>
          <p className="text-xl text-white/90 mb-8">Experience the difference of pure, handmade almond oil</p>
          <WhatsAppButton
            message="Hi ELVYA! I would love to learn more about your products."
            className="bg-white text-[#D9A441] hover:bg-[#FFF5E6]"
          >
            Get in Touch
          </WhatsAppButton>
        </div>
      </section>
    </div>
  );
}
`;

// Contact Page
const contactPage = `"use client";

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
    const whatsappMessage = \`Hi ELVYA! My name is \${formData.name}. \${formData.message} You can reach me at \${formData.email} or \${formData.phone}.\`;
    window.open(\`https://wa.me/\${BRAND.whatsapp}?text=\${encodeURIComponent(whatsappMessage)}\`, "_blank");
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
                  <a href={\`https://wa.me/\${BRAND.whatsapp}\`} className="flex items-center gap-4 text-[#8B7355] hover:text-[#D9A441] transition-colors">
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
                  <a href={\`tel:\${BRAND.phone}\`} className="flex items-center gap-4 text-[#8B7355] hover:text-[#D9A441] transition-colors">
                    <div className="w-12 h-12 rounded-full bg-[#D9A441]/10 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[#D9A441]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2D1F0E]">Phone</p>
                      <p>{BRAND.phone}</p>
                    </div>
                  </a>
                  <a href={\`mailto:\${BRAND.email}\`} className="flex items-center gap-4 text-[#8B7355] hover:text-[#D9A441] transition-colors">
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
                <div className="space-y-2 text-[#8B7355]">
                  <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
                  <p>Sunday: 10:00 AM - 5:00 PM</p>
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
`;

// Privacy Page
const privacyPage = `import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FFF5E6] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#2D1F0E]">Privacy Policy</h1>
        </div>

        <div className="card p-8 space-y-8">
          <p className="text-[#8B7355]">Last updated: December 2024</p>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">Information We Collect</h2>
            <p className="text-[#8B7355] mb-4">When you place an order or contact us, we may collect:</p>
            <ul className="list-disc list-inside text-[#8B7355] space-y-2">
              <li>Name and contact information</li>
              <li>Delivery address</li>
              <li>Phone number and email address</li>
              <li>Order history and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">How We Use Your Information</h2>
            <p className="text-[#8B7355] mb-4">We use your information to:</p>
            <ul className="list-disc list-inside text-[#8B7355] space-y-2">
              <li>Process and deliver your orders</li>
              <li>Communicate about your orders</li>
              <li>Provide customer support</li>
              <li>Send promotional offers (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">Data Security</h2>
            <p className="text-[#8B7355]">
              We take reasonable measures to protect your personal information from unauthorized access,
              use, or disclosure. Your data is stored securely and is only accessed when necessary.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">Third-Party Services</h2>
            <p className="text-[#8B7355]">
              We may use third-party services for payment processing and delivery.
              These services have their own privacy policies governing the use of your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">Your Rights</h2>
            <p className="text-[#8B7355] mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-[#8B7355] space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of your data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">Contact Us</h2>
            <p className="text-[#8B7355]">
              If you have any questions about this Privacy Policy, please contact us at hello@elvya.com
              or via WhatsApp at +91 99999 99999.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
`;

// Terms Page
const termsPage = `import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFF5E6] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full gradient-gold flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#2D1F0E]">Terms & Conditions</h1>
        </div>

        <div className="card p-8 space-y-8">
          <p className="text-[#8B7355]">Last updated: December 2024</p>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">1. Acceptance of Terms</h2>
            <p className="text-[#8B7355]">
              By accessing and using the ELVYA website and purchasing our products, you agree to be bound
              by these Terms and Conditions. If you do not agree with any part of these terms, please do
              not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">2. Products</h2>
            <p className="text-[#8B7355]">
              All products sold by ELVYA are 100% pure, cold-pressed almond oil. We make every effort to
              accurately display product colors and images, but actual products may vary slightly. Product
              availability and prices are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">3. Orders and Payment</h2>
            <p className="text-[#8B7355] mb-4">
              Orders are placed through WhatsApp. Payment can be made via:
            </p>
            <ul className="list-disc list-inside text-[#8B7355] space-y-2">
              <li>UPI / Google Pay / PhonePe</li>
              <li>Bank Transfer</li>
              <li>Cash on Delivery (where available)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">4. Shipping and Delivery</h2>
            <p className="text-[#8B7355]">
              We deliver across India. Delivery times vary by location and typically take 3-7 business days.
              Shipping charges may apply based on your location and order value.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">5. Returns and Refunds</h2>
            <p className="text-[#8B7355]">
              Due to the nature of our products, we only accept returns for damaged or defective items.
              Please contact us within 48 hours of receiving your order if you have any issues. Refunds
              will be processed within 7-10 business days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">6. Usage Guidelines</h2>
            <p className="text-[#8B7355]">
              Our almond oil is intended for external use on skin and hair. Always perform a patch test
              before first use. Store in a cool, dry place away from direct sunlight.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">7. Limitation of Liability</h2>
            <p className="text-[#8B7355]">
              ELVYA shall not be liable for any indirect, incidental, or consequential damages arising
              from the use of our products. Our liability is limited to the purchase price of the product.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2D1F0E] mb-4">8. Contact</h2>
            <p className="text-[#8B7355]">
              For any questions regarding these terms, please contact us at hello@elvya.com
              or via WhatsApp at +91 99999 99999.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
`;

// Write all files
const files = [
  { path: 'd:/el/elvya/src/app/page.tsx', content: homePage },
  { path: 'd:/el/elvya/src/app/product/page.tsx', content: productPage },
  { path: 'd:/el/elvya/src/app/about/page.tsx', content: aboutPage },
  { path: 'd:/el/elvya/src/app/contact/page.tsx', content: contactPage },
  { path: 'd:/el/elvya/src/app/privacy/page.tsx', content: privacyPage },
  { path: 'd:/el/elvya/src/app/terms/page.tsx', content: termsPage },
];

files.forEach(file => {
  const dir = path.dirname(file.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(file.path, file.content);
  console.log(`Created: ${file.path}`);
});

console.log('All pages created successfully!');
