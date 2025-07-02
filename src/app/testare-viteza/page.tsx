import { Metadata } from 'next';
import SpeedTestSection from '@/components/sections/SpeedTestSection';
import { generateMetadata } from '@/components/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Test Viteză Internet - Altnet Moldova',
  description: 'Testează viteza conexiunii tale de internet cu instrumentul oficial Altnet. Verifică viteza de download, upload și latența în timp real.',
  path: '/testare-viteza',
  keywords: [
    'test viteză internet',
    'speed test',
    'test internet moldova',
    'verificare conexiune',
    'test download upload',
    'latență internet',
    'test bandwidth',
    'viteză conexiune',
    'altnet speed test',
    'test viteză fibră optică',
  ],
});

export default function SpeedTestPage() {
  return (
    <>
      <SpeedTestSection />
    </>
  );
}