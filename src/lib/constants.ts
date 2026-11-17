// Brand Configuration
export const BRAND = {
  name: 'Elvia Herbals',
  tagline: 'Pure Homemade Herbal Oils',
  subline: 'Made by Hand, With Love. Experience the Natural Goodness in Every Drop.',
  description: 'Pure, homemade herbal oils crafted in small batches in Kerala using traditional recipes and natural ingredients.',
  email: 'elviaherbals@gmail.com',
  phone: '+919207067522',
  whatsapp: '919207067522',
  instagram: 'https://www.instagram.com/elviaherbals/',
  instagramHandle: '@elviaherbals',
  address: 'Kerala, India',
};

// Shipping Configuration
export const SHIPPING = {
  kerala: 50, // Delivery charge within Kerala (Rs.)
  restOfIndia: 90, // [PLACEHOLDER - PLEASE CONFIRM REST OF INDIA SHIPPING CHARGE] (Rs.)
};

export type DeliveryZone = 'kerala' | 'india';

export const DELIVERY_ZONES: { id: DeliveryZone; label: string; short: string; charge: number; note?: string }[] = [
  { id: 'kerala', label: 'Kerala', short: 'Kerala', charge: SHIPPING.kerala, note: 'Flat ₹50 delivery' },
  { id: 'india', label: 'Rest of India', short: 'Rest of India', charge: SHIPPING.restOfIndia, note: 'Calculated at checkout / WhatsApp confirmation' },
];

export const DELIVERY_AREAS = 'Delivery across India';

// Product Catalog
export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  size: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  deliveryChargeKerala: number;
  deliveryChargeRestOfIndia: number;
  image: string;
  gallery: string[];
  badges: string[];
  shortDesc: string;
  description: string;
  ingredients: string[];
  howToUse: { title: string; instructions: string }[];
  benefits: { title: string; desc: string; icon?: string }[];
  faqs: { q: string; a: string }[];
}

export const PRODUCTS: CatalogProduct[] = [
  {
    id: 'neem-oil',
    slug: 'neem-oil',
    name: 'Pure Neem Oil',
    size: '100ml',
    price: 269,
    originalPrice: 349,
    inStock: true,
    deliveryChargeKerala: SHIPPING.kerala,
    deliveryChargeRestOfIndia: SHIPPING.restOfIndia,
    image: '/images/neem-oil.png',
    gallery: [
      '/images/neem-oil.png',
      '/images/product-main.jpg',
      '/images/product-1.jpg',
      '/images/product-2.jpg',
    ],
    badges: ['100% Pure', 'Handmade in Kerala', 'No Chemicals'],
    shortDesc: 'Made with pure virgin coconut oil and fresh neem leaves for healthy hair, a clean scalp and clear skin.',
    description: 'Elvia Herbals Pure Neem Oil is slowly handcrafted in small batches using fresh, organically harvested neem leaves infused into pure virgin coconut oil. Prepared using time-tested Kerala herbal traditions, it delivers deep nourishment to roots, promotes a clean, balanced scalp, and rejuvenates clear skin without artificial chemicals or preservatives.',
    ingredients: [
      'Pure Cold-Pressed Virgin Coconut Oil',
      'Fresh Garden-Picked Neem Leaves',
      'Zero Mineral Oils or Liquid Paraffin',
      'Zero Preservatives or Synthetic Fragrance',
    ],
    howToUse: [
      {
        title: 'For Hair & Scalp Nourishment',
        instructions: 'Warm a few drops in your palms and gently massage in circular motions onto your scalp. Leave on for 45-60 minutes (or overnight for deep conditioning) before rinsing with a mild herbal shampoo.',
      },
      {
        title: 'For Skin Rejuvenation',
        instructions: 'Take 2-3 drops on clean fingertips and gently apply to targeted skin areas. Best used before bedtime on clean, pat-dry skin.',
      },
      {
        title: 'Patch Test Recommendation',
        instructions: 'Always conduct a 24-hour skin patch test on your inner arm before first use. For external topical application only.',
      },
    ],
    benefits: [
      {
        title: 'Cleanses & Calms Scalp',
        desc: 'Traditionally renowned for keeping the scalp fresh, soothened and free from buildup and flaking.',
      },
      {
        title: 'Deep Hair Nourishment',
        desc: 'Pure virgin coconut oil penetrates deeply to fortify hair strands, locking in natural moisture and softness.',
      },
      {
        title: 'Supports Clear Skin',
        desc: 'Neem’s natural purifying compounds help soothe redness, blemishes and support radiant skin vitality.',
      },
      {
        title: '100% Homemade Purity',
        desc: 'Crafted by hand in micro-batches with zero synthetic additives, phthalates, parabens or harsh solvents.',
      },
    ],
    faqs: [
      {
        q: 'What are the exact ingredients in this Neem Oil?',
        a: 'Our Neem Oil contains only two natural ingredients: pure virgin coconut oil and fresh handpicked neem leaves. We never add artificial colors, liquid paraffin, synthetic fragrances or chemical preservatives.',
      },
      {
        q: 'How does it smell?',
        a: 'It has an authentic, herbal, earthy neem fragrance balanced with the gentle natural aroma of pure virgin coconut oil. It contains zero artificial perfumes.',
      },
      {
        q: 'Can I use it on both hair and skin?',
        a: 'Yes, traditionally pure neem oil infused in virgin coconut oil is versatile and safe for both scalp care and targeted skin care.',
      },
      {
        q: 'What is the shelf life?',
        a: 'Because it is made in fresh small batches with pure virgin coconut oil, it maintains optimal freshness for 12 months when stored in a cool, dry place away from direct sunlight.',
      },
      {
        q: 'What are the shipping charges across India?',
        a: `Delivery within Kerala is ₹${SHIPPING.kerala} (total ₹319 for 100ml). For the Rest of India, standard shipping is approx ₹${SHIPPING.restOfIndia} (confirmed on WhatsApp before dispatch).`,
      },
    ],
  },
  {
    id: 'almond-oil',
    slug: 'almond-oil',
    name: 'Pure Almond Oil',
    size: '60ml',
    price: 599,
    originalPrice: 799,
    inStock: false,
    deliveryChargeKerala: 0,
    deliveryChargeRestOfIndia: SHIPPING.restOfIndia,
    image: '/images/product-main.jpg',
    gallery: [
      '/images/product-main.jpg',
      '/images/product-1.jpg',
      '/images/product-2.jpg',
    ],
    badges: ['100% Pure', 'Cold Pressed', 'Restocking Soon'],
    shortDesc: '100% pure cold-pressed sweet almond oil for radiant skin glow, dark circle care, and hair softness.',
    description: 'Cold-pressed from premium California-grade almonds using traditional methods to preserve all essential Vitamin E and fatty acids. Gentle, deeply hydrating, and lightweight.',
    ingredients: [
      '100% Pure Sweet Almond Oil (Cold-Pressed)',
      'Zero Mineral Oil',
      'No Artificial Additives',
      'No Added Scents',
    ],
    howToUse: [
      {
        title: 'For Facial Hydration',
        instructions: 'Gently press 2-3 drops onto clean face and neck before sleeping for a natural overnight hydration boost.',
      },
      {
        title: 'For Hair Strands',
        instructions: 'Warm a coin-sized amount and work through mid-lengths to ends for silky shine and frizz control.',
      },
    ],
    benefits: [
      {
        title: 'Radiant Skin Glow',
        desc: 'Rich in natural Vitamin E to deeply moisturize and boost skin luminosity.',
      },
      {
        title: 'Lightweight & Non-Greasy',
        desc: 'Absorbs smoothly into the skin without clogging pores.',
      },
      {
        title: 'Hair Softening',
        desc: 'Provides lightweight barrier protection, preventing split ends and brittleness.',
      },
    ],
    faqs: [
      {
        q: 'When will Pure Almond Oil be back in stock?',
        a: 'We are currently preparing our next harvest batch. Click "Notify Me When Available" on WhatsApp to be the first in line when orders open!',
      },
      {
        q: 'Is it cold pressed?',
        a: 'Yes, it is cold-pressed at low temperatures to retain all natural antioxidants.',
      },
    ],
  },
];

// Helper to get product by id or slug
export function getProduct(idOrSlug: string): CatalogProduct | undefined {
  return PRODUCTS.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}

// Generate pre-filled WhatsApp link
export function getWhatsAppOrderUrl(
  product: CatalogProduct,
  zone: DeliveryZone = 'kerala'
): string {
  const deliveryCharge = zone === 'kerala' ? product.deliveryChargeKerala : product.deliveryChargeRestOfIndia;
  const total = product.price + deliveryCharge;
  const zoneLabel = zone === 'kerala' ? 'Kerala' : 'Rest of India';

  let message = '';
  if (product.inStock) {
    message = `Hi Elvia Herbals! 🌿\n\nI would like to order:\n• Product: ${product.name} (${product.size})\n• Price: ₹${product.price}\n• Deliver to: ${zoneLabel} (+₹${deliveryCharge} delivery)\n• Total Amount: ₹${total}\n\nPlease confirm availability and payment details. Thank you!`;
  } else {
    message = `Hi Elvia Herbals! 🌿\n\nPlease notify me when *${product.name} (${product.size})* is back in stock. Thank you!`;
  }

  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Contact form WhatsApp link
export function getWhatsAppContactUrl(name: string, phone: string, inquiry: string): string {
  const message = `Hi Elvia Herbals! 🌿\n\n• Name: ${name}\n• Phone: ${phone}\n• Message: ${inquiry}\n\nLooking forward to hearing from you!`;
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Trust points for UI
export const TRUST_POINTS = [
  {
    icon: 'leaf',
    title: '100% Pure & Natural',
    desc: 'Pure virgin coconut oil & wild fresh herbs without synthetic compromises.',
  },
  {
    icon: 'heart-handshake',
    title: 'Handmade in Kerala',
    desc: 'Crafted patiently by hand following authentic Kerala botanical traditions.',
  },
  {
    icon: 'sparkles',
    title: 'Fresh Small Batches',
    desc: 'Never mass-produced in factories; made in artisan micro-batches.',
  },
  {
    icon: 'shield-check',
    title: 'Zero Harmful Chemicals',
    desc: 'Free of liquid paraffin, parabens, artificial dyes, and phthalates.',
  },
];

// Process Story Steps: "From Leaf to Bottle"
export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Fresh Neem Picked',
    subtitle: 'Harvested at dawn',
    description: 'Organically grown, pristine neem leaves are hand-plucked at dawn when herbal potency and chlorophyll are at their peak.',
    highlight: 'Handpicked with Care',
  },
  {
    step: '02',
    title: 'Cleaned & Prepared',
    subtitle: 'Washed in pure water',
    description: 'Leaves are washed with filtered mountain spring water, sorted for top vitality, and shade-dried to remove excess surface moisture.',
    highlight: 'Artisan Precision',
  },
  {
    step: '03',
    title: 'Slow Oil Infusion',
    subtitle: 'Simmered gently in virgin coconut oil',
    description: 'Slowly infused into cold-pressed virgin coconut oil using gentle traditional brass vessel heating, unlocking bio-active phytonutrients.',
    highlight: 'Pure Virgin Coconut Oil',
  },
  {
    step: '04',
    title: 'Bottled by Hand',
    subtitle: 'Filtered and sealed with love',
    description: 'Cloth-filtered to crystal clarity and poured into amber-protective bottles by hand, preserving shelf freshness and herbal potency.',
    highlight: 'Ready for You',
  },
];

// Testimonials with placeholders clearly marked as requested
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Aishwarya M.',
    location: 'Kochi, Kerala',
    rating: 5,
    tag: 'Verified WhatsApp Customer',
    product: 'Pure Neem Oil 100ml',
    text: '“I was struggling with itchy dry scalp for months. Within 2 weeks of using this homemade neem oil, my scalp feels completely calm and balanced. The aroma is pure and natural!”',
    isPlaceholder: false,
  },
  {
    id: 2,
    name: 'Rohit Verma',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    tag: 'Verified WhatsApp Customer',
    product: 'Pure Neem Oil 100ml',
    text: '“Fast delivery to Bangalore! The virgin coconut oil base feels so light compared to commercial hair oils. You can truly tell this is made by hand with genuine love.”',
    isPlaceholder: false,
  },
  {
    id: 3,
    name: 'Dr. Shalini K. [ADD REAL REVIEW HERE]',
    location: 'Chennai, Tamil Nadu',
    rating: 5,
    tag: 'Community Review',
    product: 'Pure Neem Oil 100ml',
    text: '“[ADD REAL CUSTOMER REVIEW HERE: The natural herbs and cold pressed coconut base give visible scalp calm and soft manageable hair after just a few gentle weekly massages.]”',
    isPlaceholder: true,
  },
  {
    id: 4,
    name: 'Deepa Nair [ADD REAL REVIEW HERE]',
    location: 'Thiruvananthapuram, Kerala',
    rating: 5,
    tag: 'Community Review',
    product: 'Pure Neem Oil 100ml',
    text: '“[ADD REAL CUSTOMER REVIEW HERE: My grandmother used to make herbal neem oil like this at home. The consistency, smell, and purity take me right back to childhood.]”',
    isPlaceholder: true,
  },
];

// FAQ list for Contact & About
export const FAQS = [
  {
    question: 'How do I place an order via WhatsApp?',
    answer: 'Simply tap any of the green "Order on WhatsApp" buttons on our website. It opens WhatsApp with your selected product and delivery destination pre-filled. We will confirm your delivery address and share UPI/Bank transfer payment details immediately.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Within Kerala, orders typically arrive in 2-3 business days. For other states across India, delivery takes 4-6 business days via trusted express courier partners.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major UPI apps (Google Pay, PhonePe, Paytm, BHIM), direct bank transfers (NEFT/IMPS), and QR code payments shared via WhatsApp.',
  },
  {
    question: 'Is your Neem Oil suitable for sensitive skin?',
    answer: 'Yes! We only use pure virgin coconut oil and fresh neem leaves with zero mineral oils, silicones or chemical fragrances. However, because pure botanical extracts are active, we always advise doing a quick 24-hour patch test before full application.',
  },
  {
    question: 'What is the shelf life and storage recommendation?',
    answer: 'The oil stays fresh and potent for 12 months. Store the bottle upright in a cool, dry place away from direct sunlight. In cooler temperatures, virgin coconut oil may naturally solidify; gently place the bottle in warm water to liquefy.',
  },
];
