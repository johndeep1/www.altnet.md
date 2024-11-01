'use client';

import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PricingSection from '@/components/sections/PricingSection';
import CoverageSection from '@/components/sections/CoverageSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <CoverageSection />
      <TestimonialsSection />
    </>
  );
}
