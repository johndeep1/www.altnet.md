"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../lib/cart";
import { formatPrice } from "../lib/utils";

export default function CartButton() {
  const { itemCount, total } = useCart();

  return (
    <Link
      href="/magazin/cart"
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors relative w-full justify-center"
    >
      <ShoppingCart className="w-4 h-4" />
      <span>{formatPrice(total)} MDL</span>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs font-medium rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}
