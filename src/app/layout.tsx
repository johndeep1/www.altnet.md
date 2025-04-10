import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://altnet.md"),
  title: {
    default: "Altnet - Internet și TV de mare viteză în Moldova",
    template: "%s | Altnet",
  },
  description: "Furnizor de servicii Internet și TV în Ialoveni, Moldova. Oferim internet prin fibră optică de mare viteză, televiziune digitală și telefonie.",
  keywords: ["internet moldova", "internet fibră optică", "tv digital", "altnet", "ialoveni internet", "internet rapid", "televiziune digitală"],
  authors: [{ name: "Altnet" }],
  creator: "Altnet",
  publisher: "Altnet",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "ro-MD": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_MD",
    url: "/",
    title: "Altnet - Internet și TV de mare viteză în Moldova",
    description: "Internet prin fibră optică, TV digital și telefonie. Conectează-te la viitor cu Altnet.",
    siteName: "Altnet",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Altnet - Internet și TV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Altnet - Internet și TV de mare viteză în Moldova",
    description: "Internet prin fibră optică, TV digital și telefonie. Conectează-te la viitor cu Altnet.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro-MD">
      <head>
        <meta name="altnet" content="Altnet" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Altnet",
              "url": "https://altnet.md",
              "logo": "https://altnet.md/ALTNET-LOGO.svg",
              "sameAs": [
                "https://facebook.com/altnet",
                "https://instagram.com/altnet"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+373-268-85-555",
                "contactType": "customer service",
                "availableLanguage": ["Romanian", "Russian"]
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
