export interface PricingFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface PricingPlan {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  price: number;
  speed: string;
  gradient: string;
  features: PricingFeature[];
  popularFeatures: string[];
  featured?: boolean;
}

export const defaultPlans: PricingPlan[] = [
  {
    slug: "tv",
    title: "TV",
    subtitle: "Televiziune digitală",
    price: 79,
    speed: "200+ canale",
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    features: [
      { text: "Canale HD incluse", included: true },
      { text: "Acces TV pe mobil", included: true },
      { text: "Instalare gratuită", included: true },
      { text: "Internet", included: false },
    ],
    popularFeatures: ["200+ canale TV", "Canale HD incluse"],
  },
  {
    slug: "popular",
    title: "Popular",
    subtitle: "Cel mai ales",
    price: 130,
    speed: "600 Mbps",
    gradient: "from-primary via-primary-dark to-violet-600",
    features: [
      { text: "Internet de mare viteză", included: true },
      { text: "Router WiFi 6", included: true },
      { text: "Instalare gratuită", included: true },
      { text: "TV Digital HD", included: true },
    ],
    popularFeatures: ["TV pe mobil inclus", "Gaming optimizat"],
    featured: true,
  },
  {
    slug: "premium",
    title: "Premium",
    subtitle: "Pentru pretențioși",
    price: 295,
    speed: "1000 Mbps",
    gradient: "from-violet-500 via-purple-600 to-purple-700",
    features: [
      { text: "Internet Gigabit", included: true },
      { text: "Router WiFi 6E", included: true },
      { text: "Cadou Televizor 45 inch", included: true, highlight: true },
      { text: "Instalare prioritară", included: true },
    ],
    popularFeatures: ["TV Premium inclus", "IP Static inclus"],
  },
];
