// Brand Configuration
export const BRAND = {
  name: 'Elvia Herbals',
  tagline: 'Pure Homemade Herbal Oils',
  description: 'Made by Hand, With Love',
  email: 'elviaherbals@gmail.com',
  phone: '+919207067522',
  whatsapp: '919207067522',
  instagram: 'https://www.instagram.com/elviaherbals/',
  instagramHandle: '@elviaherbals',
  address: 'Kerala, India',
};

// Product Image
export const PRODUCT_IMAGE = '/images/almond-oil-bottle.jpg';

// Product Data
export const PRODUCT = {
  name: 'Pure Almond Oil',
  image: PRODUCT_IMAGE,
  price: 599,
  currency: 'INR',
  currencySymbol: '₹',
  sizes: [
    { id: '60ml', label: '60ml', price: 699, originalPrice: 899 },
  ],
  description: 'Our pure almond oil is cold-pressed from premium quality almonds, preserving all the natural nutrients and benefits. Made with traditional methods passed down through generations, each bottle contains the essence of pure, unadulterated almond goodness.',
  ingredients: ['100% Pure Almonds', 'No Preservatives', 'No Chemicals', 'No Additives'],
  benefits: [
    {
      icon: 'sparkles',
      title: 'Glowing Skin',
      description: 'Natural moisturizer that gives your skin a healthy, radiant glow.',
    },
    {
      icon: 'heart',
      title: 'Hair Nourishment',
      description: 'Strengthens hair roots and promotes thick, lustrous hair growth.',
    },
    {
      icon: 'shield',
      title: '100% Pure',
      description: 'Cold-pressed and free from chemicals, preservatives, and additives.',
    },
    {
      icon: 'leaf',
      title: 'Traditional Process',
      description: 'Made using age-old techniques to preserve maximum nutrients.',
    },
  ],
  howToUse: [
    'For Skin: Apply a few drops on clean skin and massage gently. Best used before bedtime.',
    'For Hair: Warm the oil slightly and massage into scalp. Leave for 30 minutes or overnight before washing.',
    'For Face: Use as a natural makeup remover or add to your moisturizer for extra hydration.',
  ],
};

// Shipping
export const SHIPPING = {
  kerala: 50, // Default delivery charge within Kerala (Rs.); a product can override it with `deliveryCharge`
};

/** We deliver within India only. Kerala has a fixed charge; elsewhere in India it depends on the location and is confirmed on WhatsApp. */
export type DeliveryZone = 'kerala' | 'india';

export const DELIVERY_ZONES: { id: DeliveryZone; label: string; short: string }[] = [
  { id: 'kerala', label: 'Kerala', short: 'Kerala' },
  { id: 'india', label: 'Rest of India', short: 'India' },
];

/** One line used in page text and meta descriptions. */
export const DELIVERY_AREAS = 'Delivery across India';

/** Delivery charge in Rs. for a zone, or null when it depends on the exact location. */
export function deliveryFor(p: CatalogProduct, zone: DeliveryZone): number | null {
  return zone === 'kerala' ? p.deliveryCharge : null;
}

// Product Catalog (shown on the product page and homepage)
export interface CatalogProduct {
  id: string;
  name: string;
  size: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  /** Delivery charge within Kerala in Rs. 0 = free shipping in Kerala. Other locations are quoted on WhatsApp. */
  deliveryCharge: number;
  image: string;
  badges: [string, string];
  description: string;
  ingredients: string[];
  howToUse: string[];
  benefits: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

export const PRODUCTS: CatalogProduct[] = [
  {
    id: 'neem-oil',
    name: 'Neem Oil',
    size: '100ml',
    price: 269,
    inStock: true,
    deliveryCharge: SHIPPING.kerala,
    image: '/images/neem-oil.png',
    badges: ['100% Pure', 'Hair & Skin Care'],
    benefits: [
      { title: 'Healthy Scalp', desc: 'Neem helps keep the scalp clean and fresh' },
      { title: 'Hair Care', desc: 'Virgin coconut oil nourishes and softens hair' },
      { title: 'Clear Skin', desc: 'Traditionally used for clean, healthy skin' },
      { title: 'Natural', desc: 'No chemicals or preservatives' },
    ],
    description: 'Elvia Herbals Neem Oil is handmade with pure virgin coconut oil and fresh neem, combining neem\'s powerful cleansing properties with the deep nourishment of virgin coconut oil. A trusted traditional remedy for healthy hair, a clean scalp and clear skin.',
    ingredients: ['Virgin Coconut Oil', 'Neem', 'No Preservatives', 'No Chemicals'],
    howToUse: [
      'For Hair: Warm a little oil and massage gently into the scalp. Leave for 30 minutes to 1 hour, then wash with a mild shampoo.',
      'For Skin: Apply a few drops to clean skin or the affected area and massage gently.',
      'Do a patch test before first use. For external use only.',
    ],
    faqs: [
      { q: 'What is it made from?', a: 'Our Neem Oil is made with just two natural ingredients: pure virgin coconut oil and neem. No preservatives or chemicals are added.' },
      { q: 'What is neem oil good for?', a: 'Neem is traditionally used to keep the scalp clean, reduce dandruff, and support clear, healthy skin, while virgin coconut oil deeply nourishes hair and skin.' },
      { q: 'Does it have a strong smell?', a: 'It has a natural, earthy neem aroma softened by virgin coconut oil. This is a sign that it is made with real neem and no added fragrance.' },
      { q: 'How should I store the oil?', a: 'Store in a cool, dry place away from direct sunlight. Keep the cap tightly closed after use.' },
      { q: 'Do you deliver outside Kerala?', a: `Yes, we deliver across India. Delivery within Kerala costs Rs.${SHIPPING.kerala}. For other states the charge depends on your city / pincode, and we confirm it on WhatsApp before you pay. We currently do not ship outside India.` },
    ],
  },
  {
    id: 'almond-oil',
    name: 'Pure Almond Oil',
    size: '60ml',
    price: 699,
    originalPrice: 899,
    inStock: false,
    deliveryCharge: 0, // Free shipping
    image: '/images/product-main.jpg',
    badges: ['100% Pure', 'Cold Pressed'],
    benefits: [
      { title: 'Glowing Skin', desc: 'Natural moisturizer for radiant skin' },
      { title: 'Hair Care', desc: 'Strengthens and nourishes hair' },
      { title: 'Anti-Aging', desc: 'Rich in Vitamin E antioxidants' },
      { title: 'Natural', desc: 'No chemicals or preservatives' },
    ],
    description: PRODUCT.description,
    ingredients: PRODUCT.ingredients,
    howToUse: PRODUCT.howToUse,
    faqs: [
      { q: 'How is the almond oil made?', a: 'Our almond oil is cold-pressed using traditional wooden press (ghani) method. This preserves all the natural nutrients and ensures the oil remains pure and unrefined.' },
      { q: 'Is this oil suitable for all skin types?', a: 'Yes! Pure almond oil is gentle and suitable for all skin types including sensitive skin. It is non-comedogenic and absorbs well without leaving a greasy residue.' },
      { q: 'How should I store the oil?', a: 'Store in a cool, dry place away from direct sunlight. The oil has a shelf life of 12 months from the date of manufacturing.' },
      { q: 'Is shipping free?', a: 'Almond Oil ships free within Kerala. We also deliver to the rest of India; there the delivery charge depends on your location and is confirmed on WhatsApp.' },
      { q: 'When will it be back in stock?', a: 'Almond Oil is currently out of stock. We will restock soon. Message us on WhatsApp to be notified.' },
    ],
  },
];

/** WhatsApp order text. Without a zone (e.g. ordering from the homepage) it asks the customer for their location. */
export function orderMessage(p: CatalogProduct, zone?: DeliveryZone): string {
  const header = `Hi Elvia Herbals! I want to order:

Product: ${p.name} (${p.size})
Price: Rs.${p.price}`;
  if (!zone) {
    return `${header}

My city / pincode: `;
  }
  const charge = deliveryFor(p, zone);
  const zoneLabel = DELIVERY_ZONES.find((z) => z.id === zone)!.label;
  if (charge === null) {
    return `${header}
Deliver to: ${zoneLabel}
Delivery charge: please confirm for my location

My city / pincode: `;
  }
  return `${header}
Deliver to: ${zoneLabel}
Delivery: ${charge > 0 ? `Rs.${charge}` : 'FREE'}
Total: Rs.${p.price + charge}`;
}

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'The best almond oil I have ever used! My skin feels so soft and my hair has never looked better. Truly homemade quality.',
  },
  {
    id: 2,
    name: 'Anita Patel',
    location: 'Delhi',
    rating: 5,
    text: 'I switched to Elvia Herbals almond oil 3 months ago and the difference is amazing. Pure, natural, and worth every penny!',
  },
  {
    id: 3,
    name: 'Meera Krishnan',
    location: 'Bangalore',
    rating: 5,
    text: 'Finally found a brand I can trust. The oil is pure and the results are visible within weeks. Highly recommend!',
  },
];

// Features for homepage
export const FEATURES = [
  {
    icon: 'droplet',
    title: '100% Pure',
    description: 'No chemicals, no preservatives. Just pure almond goodness.',
  },
  {
    icon: 'hand',
    title: 'Handmade',
    description: 'Crafted with care using traditional methods.',
  },
  {
    icon: 'thermometer',
    title: 'Cold Pressed',
    description: 'Low temperature extraction preserves all nutrients.',
  },
  {
    icon: 'award',
    title: 'Premium Quality',
    description: 'Made with carefully selected natural ingredients.',
  },
];
