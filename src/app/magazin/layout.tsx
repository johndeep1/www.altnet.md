import "./globals.css";
import { Toaster } from "sonner";
import ClientLayout from "./components/client-layout";

export const metadata = {
  title: "Altnet Magazin",
  description:
    "Magazinul online Altnet - Produse de calitate la prețuri accesibile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClientLayout>{children}</ClientLayout>
      <Toaster richColors position="top-center" />
    </>
  );
}
