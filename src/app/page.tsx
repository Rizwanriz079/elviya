import HeroSection from '@/components/home/HeroSection';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import FeaturedProductSection from '@/components/home/FeaturedProductSection';
import StatementSection from '@/components/home/StatementSection';
import WhyChooseSection from '@/components/home/WhyChooseSection';
import ProcessStorySection from '@/components/home/ProcessStorySection';
import BenefitsSection from '@/components/home/BenefitsSection';
import ComingSoonSection from '@/components/home/ComingSoonSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import InstagramStrip from '@/components/home/InstagramStrip';
import FinalCtaSection from '@/components/home/FinalCtaSection';
import PageTransition from '@/components/PageTransition';

export default function HomePage() {
  return (
    <PageTransition>
      <div className="overflow-hidden">
        {/* 1. Hero Section with Kinetic Headline & Arch Frame */}
        <HeroSection />

        {/* 2. Counter-Rotating Two-Row Marquee */}
        <MarqueeStrip />

        {/* 3. Featured Signature Neem Oil in Deep Forest Dark Section */}
        <FeaturedProductSection />

        {/* 4. Big scrubFill Statement Section */}
        <StatementSection />

        {/* 5. Bento Grid with Mouse Spotlight Glow */}
        <WhyChooseSection />

        {/* 6. From Leaf to Bottle: Pinned Horizontal / Snap Carousel */}
        <ProcessStorySection />

        {/* 7. Traditional Benefits Tabs (Hair / Scalp / Skin) */}
        <BenefitsSection />

        {/* 8. Almond Oil Restocking Soon Split Card */}
        <ComingSoonSection />

        {/* 9. Verified Community Testimonials (Guarded by SHOW_TESTIMONIALS) */}
        <TestimonialsSection />

        {/* 10. Instagram Gallery (Guarded by SHOW_INSTAGRAM) */}
        <InstagramStrip />

        {/* 11. Final Gold Gradient CTA with Magnetic Physics */}
        <FinalCtaSection />
      </div>
    </PageTransition>
  );
}
