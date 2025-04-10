import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import ClientLayout from "./components/client-layout";
import { generateMetadata, generateLocalBusinessSchema } from "@/components/seo/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Magazin Online Altnet - Echipamente Internet și TV",
  description: "Magazinul online Altnet - Routere, televizoare, decodoare și accesorii de calitate pentru Internet și TV. Produse originale cu garanție și livrare în toată Moldova.",
  path: "/magazin",
  keywords: [
    "magazin online",
    "magazin altnet",
    "echipamente internet",
    "router wifi moldova",
    "accesorii internet",
    "televizoare smart",
    "decodoare tv",
    "routere wifi",
    "echipamente rețea",
    "cumpără router",
    "prețuri echipamente internet",
    "router performant"
  ],
});

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: generateLocalBusinessSchema(),
        }}
      />
      <ClientLayout>
        {children}
        <Toaster position="top-center" richColors />
      </ClientLayout>
    </>
  );
}
