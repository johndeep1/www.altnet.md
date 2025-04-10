import { Metadata } from "next";
import { generateMetadata, generateServiceSchema } from "@/components/seo/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Pachete și Prețuri Internet și TV - Altnet Moldova",
  description: "Alege pachetul perfect pentru tine cu servicii de calitate la prețuri competitive. Internet prin fibră optică, televiziune digitală și telefonie la cele mai avantajoase tarife.",
  path: "/preturi",
  keywords: [
    "pachete internet",
    "prețuri internet moldova",
    "abonament internet ialoveni",
    "oferte internet și tv",
    "tarife internet",
    "promoții internet",
    "prețuri altnet",
    "internet și tv pachet",
    "internet ieftin moldova",
    "preturi pachete fibra optica",
    "abonament lunar internet",
    "comparare pachete internet"
  ],
});

export default function PriceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateServiceSchema({
            service: "Pachete Internet și TV",
            description: "Pachete Internet prin fibră optică și televiziune digitală pentru acasă și business. Viteze de până la 1 Gbps, stabilitate ridicată și suport tehnic 24/7.",
            price: "150",
          }),
        }}
      />
      {children}
    </>
  );
}
