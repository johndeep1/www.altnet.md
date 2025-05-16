import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PricingSection from '@/components/sections/PricingSection';
import CoverageSection from '@/components/sections/CoverageSection';
import { generateMetadata } from '@/components/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Altnet - Internet și TV de mare viteză în Moldova',
  description: 'Conectează-te la viitor cu serviciile Altnet. Internet prin fibră optică cu viteze de până la 1 Gbps, TV digital și telefonie în Ialoveni și împrejurimi.',
  path: '/',
  keywords: [
    'internet fiber optic',
    'internet moldova',
    'internet ialoveni',
    'tv digital moldova',
    'internet mare viteză',
    'internet acasă',
    'servicii internet',
    'provider internet moldova',
    'conectare internet',
    'pachete internet și tv',
    'telecomunicații moldova',
  ],
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <CoverageSection />
    </>
  );
}
