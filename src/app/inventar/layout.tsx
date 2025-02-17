import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
        "min-h-screen bg-white font-sans antialiased mt-24",
        inter.className
      )}
    >
      {children}
    </div>
  );
}
