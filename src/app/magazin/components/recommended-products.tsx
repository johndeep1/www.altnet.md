"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardImage, CardTitle } from "./ui/card";
import { ProductImage } from "./ui/product-image";
import { formatPrice } from "../lib/utils";
import { ExpandableDescription } from "./ui/expandable-description";

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
          <Card key={i} className="overflow-hidden">
            <div className="aspect-[4/3] bg-muted animate-pulse" />
            <CardContent className="p-4">
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded mb-2" />
              <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
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
          <Link
            key={product.id}
            href={`/magazin/products/${product.id}`}
            className="block group"
          >
            <Card className="overflow-hidden border border-border/50 hover:border-primary/50 transition-colors">
              <CardImage>
                <ProductImage
                  src={product.images[0] || "/images/default-product.jpg"}
                  alt={product.name}
                />
              </CardImage>
              <CardContent>
                <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                <ExpandableDescription
                  text={product.description}
                  className="mt-2"
                />
              </CardContent>
              <CardFooter className="justify-between">
                <span className="font-medium text-primary">
                  {formatPrice(product.price)} MDL
                </span>
                {product.stock > 0 ? (
                  <span className="text-sm text-green-600">În stoc</span>
                ) : (
                  <span className="text-sm text-red-600">Stoc epuizat</span>
                )}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
