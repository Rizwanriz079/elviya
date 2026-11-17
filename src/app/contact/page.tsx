import type { Metadata } from 'next';
import ContactView from './ContactView';

export const metadata: Metadata = {
  title: 'Contact & Order',
  description:
    'Contact Elvia Herbals in Kerala. Order Pure Neem Oil (Rs.269) directly via WhatsApp +91 9207067522 or email elviaherbals@gmail.com. Delivery across India.',
  alternates: { canonical: 'https://elviaherbals.com/contact' },
  openGraph: {
    title: 'Contact & Order | Elvia Herbals',
    description:
      'Contact Elvia Herbals in Kerala. Order Pure Neem Oil (Rs.269) directly via WhatsApp +91 9207067522 or email elviaherbals@gmail.com.',
    url: 'https://elviaherbals.com/contact',
    siteName: 'Elvia Herbals',
    locale: 'en_IN',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Contact Elvia Herbals' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact & Order | Elvia Herbals',
    description:
      'Contact Elvia Herbals in Kerala. Order Pure Neem Oil (Rs.269) directly via WhatsApp +91 9207067522 or email elviaherbals@gmail.com.',
    images: ['/twitter-image.png'],
  },
};

export default function ContactPage() {
  return <ContactView />;
}
