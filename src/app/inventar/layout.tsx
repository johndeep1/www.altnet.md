import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import InventarHeader from "@/app/inventar/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Altnet Database",
  description: "Product Management System",
};

export default function InventarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={cn(
        "inventar-section min-h-screen bg-background font-sans antialiased",
        inter.className
      )}
    >
      <InventarHeader />
      <main className="container mx-auto px-4">{children}</main>
    </div>
  );
}
