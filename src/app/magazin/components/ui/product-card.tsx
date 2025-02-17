"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Plus, Minus } from "lucide-react";
import { ProductImage } from "./product-image";
import { formatPrice } from "../../lib/utils";
import { Button } from "./button";
import { useCart } from "../../lib/cart";
import { useState, useEffect } from "react";
import { useMediaQuery } from "../../hooks/use-media-query";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showMobileActions, setShowMobileActions] = useState(false);
  const { addItem } = useCart();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || "/images/default-product.jpg",
      quantity,
    });
    // Reset quantity after adding to cart
    setQuantity(1);
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Handle touch interactions for mobile
  const handleTouchStart = () => {
    if (isMobile) {
      setShowMobileActions(true);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      setTimeout(() => setShowMobileActions(false), 3000); // Hide after 3 seconds
    }
  };

  return (
    <Link
      href={`/magazin/products/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-50/50">
          <ProductImage
            src={product.images[0] || "/images/default-product.jpg"}
            alt={product.name}
            className="object-contain transform transition-transform duration-500 group-hover:scale-110"
          />

          {/* Desktop Overlay with Actions */}
          {!isMobile && (
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  onClick={handleAddToCart}
                  className="bg-white/90 backdrop-blur-sm hover:bg-primary text-gray-900 hover:text-white p-2 rounded-xl shadow-lg transition-colors duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                  className="bg-white/90 backdrop-blur-sm hover:bg-red-500 text-gray-900 hover:text-white p-2 rounded-xl shadow-lg transition-colors duration-200"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          )}

          {/* Mobile Actions */}
          {isMobile && (showMobileActions || isHovered) && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-xl">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-gray-100 rounded-l-xl transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-100 rounded-r-xl transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    className="bg-white/90 backdrop-blur-sm p-2 rounded-xl active:scale-95 transition-transform"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                  <button className="bg-white/90 backdrop-blur-sm p-2 rounded-xl active:scale-95 transition-transform">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Stock Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-sm ${
                product.stock > 0
                  ? "bg-green-50/90 text-green-700 ring-1 ring-inset ring-green-600/20"
                  : "bg-red-50/90 text-red-700 ring-1 ring-inset ring-red-600/20"
              }`}
            >
              {product.stock > 0 ? "În stoc" : "Stoc epuizat"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="min-h-[6rem] flex flex-col justify-between">
            <div>
              <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                {product.description}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-primary">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-gray-500">MDL</span>
              </div>
              <div className="text-xs text-gray-500">
                {product.stock > 0 ? `${product.stock} disponibile` : "Indisponibil"}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
