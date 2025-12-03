const fs = require('fs');

// Update constants.ts
const constantsContent = `// Brand Configuration
export const BRAND = {
  name: 'Elvia Herbals',
  tagline: 'Pure Homemade Almond Oil',
  description: 'Made by Hand, With Love',
  email: 'hello@elviaherbals.com',
  phone: '+919207067522',
  whatsapp: '919207067522',
  instagram: 'https://instagram.com/elviaherbals',
  address: 'India',
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
    { id: '50ml', label: '50ml', price: 299, originalPrice: 399 },
    { id: '100ml', label: '100ml', price: 599, originalPrice: 799 },
    { id: '200ml', label: '200ml', price: 999, originalPrice: 1299 },
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
    description: 'Made from the finest California almonds.',
  },
];
`;

fs.writeFileSync('d:/el/elvya/src/lib/constants.ts', constantsContent);
console.log('Updated constants.ts');

// Update WhatsAppButton component
const whatsappButtonContent = `'use client';

interface WhatsAppButtonProps {
  message?: string;
  phone?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'floating';
}

export default function WhatsAppButton({
  message = "Hi Elvia Herbals! I'm interested in your pure almond oil.",
  phone = "919207067522",
  className = "",
  children,
  variant = 'primary',
}: WhatsAppButtonProps) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = \`https://wa.me/\${phone}?text=\${encodedMessage}\`;

  if (variant === 'floating') {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform hover:shadow-xl"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={\`inline-flex items-center justify-center gap-2 btn-whatsapp px-6 py-3 rounded-full font-medium \${className}\`}
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      {children || 'Buy on WhatsApp'}
    </a>
  );
}
`;

fs.writeFileSync('d:/el/elvya/src/components/WhatsAppButton.tsx', whatsappButtonContent);
console.log('Updated WhatsAppButton.tsx');

console.log('All files updated with new WhatsApp number: 919207067522');
console.log('Brand updated to: Elvia Herbals');
