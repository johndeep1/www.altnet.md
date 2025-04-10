import type { Metadata } from "next";

interface MetadataProps {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  ogImageAlt?: string;
}

/**
 * Creates consistent metadata for all pages following SEO best practices
 * with Romanian language optimization
 */
export function generateMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImage = "/og-image.jpg",
  ogImageAlt,
}: MetadataProps): Metadata {
  const url = path.startsWith("/") ? path : `/${path}`;

  // Base keywords related to Altnet with Romanian optimizations
  const baseKeywords = [
    "internet moldova",
    "internet fibră optică",
    "tv digital",
    "altnet",
    "ialoveni internet",
    "internet rapid moldova",
    "internet pentru acasă",
    "televiziune digitală",
    "pachete internet",
  ];

  // Merge custom keywords with base keywords
  const allKeywords = [...keywords, ...baseKeywords];

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: {
      canonical: url,
      languages: {
        "ro-MD": url,
      },
    },
    openGraph: {
      type: "website",
      locale: "ro_MD",
      url,
      title,
      description,
      siteName: "Altnet",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/**
 * Generates specific metadata for service pages
 */
export function generateServiceMetadata({
  service,
  features,
  speed,
  price,
  path,
}: {
  service: string;
  features: string[];
  speed?: string;
  price?: string;
  path: string;
}): Metadata {
  const title = `${service} - Altnet Moldova`;

  let description = `${service} de la Altnet. `;

  if (speed) {
    description += `Viteză de ${speed}. `;
  }

  if (features.length > 0) {
    description += `Beneficiați de ${features.join(", ")}. `;
  }

  if (price) {
    description += `Începând de la ${price} lei/lună.`;
  }

  // Service-specific keywords in Romanian
  const keywords = [
    service.toLowerCase(),
    `${service.toLowerCase()} moldova`,
    `${service.toLowerCase()} ialoveni`,
    `altnet ${service.toLowerCase()}`,
    ...features.map(f => f.toLowerCase()),
  ];

  if (speed) {
    keywords.push(`internet ${speed}`, `viteză ${speed}`);
  }

  if (price) {
    keywords.push(`${service.toLowerCase()} ${price} lei`);
  }

  return generateMetadata({
    title,
    description,
    path,
    keywords,
  });
}

/**
 * Generates schema.org structured data for services
 */
export function generateServiceSchema({
  service,
  description,
  price,
  currency = "MDL",
}: {
  service: string;
  description: string;
  price?: string;
  currency?: string;
}) {
  const schema: any = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Altnet",
      "url": "https://altnet.md"
    },
    "areaServed": {
      "@type": "City",
      "name": "Ialoveni",
      "containedInPlace": {
        "@type": "Country",
        "name": "Moldova"
      }
    }
  };

  if (price) {
    schema.offers = {
      "@type": "Offer",
      "price": price,
      "priceCurrency": currency,
      "availability": "https://schema.org/InStock"
    };
  }

  return JSON.stringify(schema);
}

/**
 * Generates LocalBusiness schema.org structured data
 */
export function generateLocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Altnet",
    "image": "https://altnet.md/ALTNET-LOGO.svg",
    "url": "https://altnet.md",
    "telephone": "+373-268-85-555",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Strada Alexandru cel Bun 4",
      "addressLocality": "Ialoveni",
      "addressRegion": "Ialoveni",
      "postalCode": "6801",
      "addressCountry": "MD"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 46.9344,
      "longitude": 28.7809
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "15:00"
      }
    ],
    "priceRange": "$$"
  };

  return JSON.stringify(schema);
}
