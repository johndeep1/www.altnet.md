import { Toaster } from "sonner";

export const metadata = {
  title: "Altnet - Pachete Internet",
  description: "Alege pachetul de internet potrivit pentru tine",
};

export default function PackagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster richColors position="top-center" />
    </>
  );
}
