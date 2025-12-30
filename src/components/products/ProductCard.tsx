"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { StorefrontProductSummary } from "@/lib/catalog-mappers";
import { formatPrice } from "@/lib/utils";
import { ProductImage } from "./ProductImage";

type ProductCardProps = {
  product: StorefrontProductSummary;
};

const getDescription = (value: string) => {
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : "Detalii disponibile la cerere.";
};

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0] || "/images/default-product.jpg";
  const inStock = product.stock > 0;
  const hasPrice = product.price > 0;
  const hasDiscount = product.discountPercent > 0 && product.originalPrice > product.price;
  const productHref = `/produse/${product.slug || product.id}`;

  return (
    <Link href={productHref} className="block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <ProductImage
            src={image}
            alt={product.name}
            className="object-contain transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium backdrop-blur-sm ${
                inStock
                  ? "bg-green-50/90 text-green-700 ring-1 ring-inset ring-green-600/20"
                  : "bg-red-50/90 text-red-700 ring-1 ring-inset ring-red-600/20"
              }`}
            >
              {inStock ? "În stoc" : "Indisponibil"}
            </span>
          </div>
          {hasDiscount && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold bg-red-500 text-white shadow-sm">
                -{Math.round(product.discountPercent)}%
              </span>
            </div>
          )}
        </div>

        <div className="p-3 sm:p-4">
          <div className="min-h-[5.5rem] sm:min-h-[6rem] flex flex-col justify-between">
            <div className="min-w-0">
              <h3 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 break-words">
                {product.name}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2 break-words">
                {getDescription(product.description)}
              </p>
            </div>

            <div className="mt-3 sm:mt-4 flex items-end justify-between gap-2">
              <div className="flex flex-col min-w-0">
                {hasDiscount && hasPrice && (
                  <span className="text-xs text-gray-400 line-through truncate">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className={`font-semibold truncate ${hasDiscount ? "text-red-600" : "text-primary"} ${hasPrice ? "text-base sm:text-lg" : "text-sm sm:text-base"}`}>
                  {hasPrice ? formatPrice(product.price) : "La cerere"}
                </span>
                {hasPrice && <span className="text-xs text-gray-500">MDL</span>}
              </div>
              <div className="text-xs text-gray-500 text-right shrink-0">
                {inStock ? `${product.stock} buc.` : "Stoc epuizat"}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
