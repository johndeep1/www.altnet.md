"use client";

import { CartProvider } from "../lib/cart";
import Header from "./header";
import Footer from "../../../components/layout/Footer";
import { ReactNode } from "react";

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <CartProvider>
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 mt-24">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
