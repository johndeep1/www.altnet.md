"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./ui/product-card";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
}

interface RecommendedProductsProps {
  currentProductId: string;
  categoryId: string;
}

export function RecommendedProducts({
  currentProductId,
  categoryId,
}: RecommendedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendedProducts() {
      try {
        const response = await fetch(`/magazin/api/categories/${categoryId}`);
        if (!response.ok) throw new Error("Failed to fetch recommendations");
        const data = await response.json();

        // Filter out current product and get up to 4 similar products
        const similarProducts = data.products
          .filter((p: Product) => p.id !== currentProductId)
          .slice(0, 4);

        setProducts(similarProducts);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecommendedProducts();
  }, [categoryId, currentProductId]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm animate-pulse"
          >
            <div className="aspect-[4/3] bg-gray-100" />
            <div className="p-4">
              <div className="h-4 w-3/4 bg-gray-100 rounded mb-2" />
              <div className="h-4 w-1/2 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Produse similare</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
