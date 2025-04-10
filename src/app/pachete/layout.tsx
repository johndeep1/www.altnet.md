import { Metadata } from "next";
import { Toaster } from "sonner";
import { generateMetadata, generateServiceSchema } from "@/components/seo/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Pachete Internet - Conectează-te cu Altnet Moldova",
  description: "Alege pachetul de internet potrivit pentru tine. Fibră optică de mare viteză, instalare gratuită și asistență tehnică 24/7 pentru o experiență online perfectă.",
  path: "/pachete",
  keywords: [
    "pachete internet",
    "abonamente internet moldova",
    "conectare internet ialoveni",
    "comandă internet",
    "instalare internet",
    "internet fiber optic",
    "internet pentru acasă",
    "abonament lunar internet moldova",
    "servicii internet fibră optică",
    "pachete tv și internet",
    "conectare rapidă internet"
  ],
});

export default function PacheteLayout({
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
            service: "Abonament Internet",
            description: "Comandă un pachet de internet prin fibră optică de la Altnet. Viteze de până la 1 Gbps, instalare gratuită și asistență tehnică permanentă.",
          }),
        }}
      />
      <Toaster position="top-center" richColors />
      {children}
    </>
  );
}
