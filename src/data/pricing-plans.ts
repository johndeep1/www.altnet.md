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
  priceNote?: string;
}

const residentialGradient = "from-primary via-primary-dark to-primary";
const businessGradient = "from-primary via-primary-dark to-primary";

export const residentialPlans: PricingPlan[] = [
  {
    slug: "tv-217",
    title: "TV",
    subtitle: "Televiziune digitală",
    price: 89,
    speed: "217 canale",
    gradient: residentialGradient,
    features: [
      { text: "217 canale TV", included: true },
      { text: "Televiziune digitală", included: true },
    ],
    popularFeatures: ["217 canale TV", "Televiziune digitală"],
    priceNote: "pe lună",
  },
  {
    slug: "net-tv-100",
    title: "Net+TV 100",
    subtitle: "Persoane fizice",
    price: 130,
    speed: "100 Mbps",
    gradient: residentialGradient,
    features: [
      { text: "Internet 100 Mbps", included: true },
      { text: "Televiziune digitală", included: true },
    ],
    popularFeatures: ["Internet + TV", "100 Mbps"],
    featured: true,
    priceNote: "pe lună",
  },
  {
    slug: "net-tv-300",
    title: "Net+TV 300",
    subtitle: "Persoane fizice",
    price: 150,
    speed: "300 Mbps",
    gradient: residentialGradient,
    features: [
      { text: "Internet 300 Mbps", included: true },
      { text: "Televiziune digitală", included: true },
    ],
    popularFeatures: ["Internet + TV", "300 Mbps"],
    priceNote: "pe lună",
  },
  {
    slug: "net-tv-500",
    title: "Net+TV 500",
    subtitle: "Persoane fizice",
    price: 180,
    speed: "500 Mbps",
    gradient: residentialGradient,
    features: [
      { text: "Internet 500 Mbps", included: true },
      { text: "Televiziune digitală", included: true },
    ],
    popularFeatures: ["Internet + TV", "500 Mbps"],
    priceNote: "pe lună",
  },
  {
    slug: "net-tv-1g",
    title: "Net+TV 1G",
    subtitle: "Persoane fizice",
    price: 200,
    speed: "1 Gbps",
    gradient: residentialGradient,
    features: [
      { text: "Internet 1 Gbps", included: true },
      { text: "Televiziune digitală", included: true },
    ],
    popularFeatures: ["Internet + TV", "1 Gbps"],
    priceNote: "pe lună",
  },
];

export const businessPlans: PricingPlan[] = [
  {
    slug: "business-100",
    title: "Business 100",
    subtitle: "Persoane juridice",
    price: 450,
    speed: "100 Mbps",
    gradient: businessGradient,
    features: [
      { text: "Internet 100 Mbps", included: true },
      { text: "Persoane juridice", included: true },
    ],
    popularFeatures: ["Persoane juridice", "Net 100 Mbps"],
    priceNote: "pe lună",
  },
  {
    slug: "business-300",
    title: "Business 300",
    subtitle: "Persoane juridice",
    price: 600,
    speed: "300 Mbps",
    gradient: businessGradient,
    features: [
      { text: "Internet 300 Mbps", included: true },
      { text: "Persoane juridice", included: true },
    ],
    popularFeatures: ["Persoane juridice", "Net 300 Mbps"],
    featured: true,
    priceNote: "pe lună",
  },
  {
    slug: "business-600",
    title: "Business 600",
    subtitle: "Persoane juridice",
    price: 920,
    speed: "600 Mbps",
    gradient: businessGradient,
    features: [
      { text: "Internet 600 Mbps", included: true },
      { text: "Persoane juridice", included: true },
    ],
    popularFeatures: ["Persoane juridice", "Net 600 Mbps"],
    priceNote: "pe lună",
  },
  {
    slug: "business-1g",
    title: "Business 1G",
    subtitle: "Persoane juridice",
    price: 1250,
    speed: "1 Gbps",
    gradient: businessGradient,
    features: [
      { text: "Internet 1 Gbps", included: true },
      { text: "Persoane juridice", included: true },
    ],
    popularFeatures: ["Persoane juridice", "Net 1 Gbps"],
    priceNote: "pe lună",
  },
];

// Keep the legacy export for pages/components that still expect defaultPlans.
export const defaultPlans: PricingPlan[] = residentialPlans.slice(0, 3);
