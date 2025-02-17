"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Card,
  CardImage,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { ProductFilters } from "../../components/product-filters";
import { formatPrice } from "../../lib/utils";
import { ProductImage } from "../../components/ui/product-image";
import { ExpandableDescription } from "../../components/ui/expandable-description";
import { ProductCard } from "../../components/ui/product-card";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  createdAt: string;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  products: Product[];
}

export default function CategoryClient({ categoryId }: { categoryId: string }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategory() {
      try {
        setIsLoading(true);
        const response = await fetch(`/magazin/api/categories/${categoryId}`, {
          signal: controller.signal,
          next: { revalidate: 60 },
        });

        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error("Failed to fetch category");
        }

        const data = await response.json();
        setCategory(data);
        setFilteredProducts(data.products);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        console.error("Error fetching category:", error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategory();

    return () => {
      controller.abort();
    };
  }, [categoryId]);

  const handlePriceChange = (range: [number, number]) => {
    if (!category) return;
    setFilteredProducts(
      category.products.filter(
        (product) => product.price >= range[0] && product.price <= range[1]
      )
    );
  };

  const handleSortChange = (value: string) => {
    const sorted = [...filteredProducts];
    switch (value) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }
    setFilteredProducts(sorted);
  };

  const handleStockChange = (value: string) => {
    if (!category) return;
    switch (value) {
      case "in-stock":
        setFilteredProducts(
          category.products.filter((product) => product.stock > 0)
        );
        break;
      case "out-of-stock":
        setFilteredProducts(
          category.products.filter((product) => product.stock === 0)
        );
        break;
      default:
        setFilteredProducts(category.products);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container px-4 md:px-6 py-16">
          <div className="h-8 w-64 bg-muted animate-pulse rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-[200px] bg-muted animate-pulse"></div>
                <CardContent className="p-4">
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded mb-2"></div>
                  <div className="h-4 w-1/2 bg-muted animate-pulse rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!category) return null;

  const prices = category.products.map((p) => p.price);
  const minPrice = Math.min(...prices, 0);
  const maxPrice = Math.max(...prices, 10000);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Category Header */}
      <section className="relative py-16 overflow-hidden border-b border-gray-200/50">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        {/* Animated Background Gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-secondary/5 to-background blur-3xl"></div>
        </div>

        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              {category.name}
            </h1>
            {category.description && (
              <p className="mt-4 text-lg text-muted-foreground max-w-[700px] leading-relaxed">
                {category.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
              <span>{filteredProducts.length} produse</span>
              <span>•</span>
              <span>{category.name}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-[300px] flex-shrink-0">
            <div className="sticky top-28 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50 shadow-sm p-6">
              <ProductFilters
                minPrice={minPrice}
                maxPrice={maxPrice}
                onPriceChange={handlePriceChange}
                onSortChange={handleSortChange}
                onStockChange={handleStockChange}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Nu am găsit produse
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Nu există produse care să corespundă filtrelor selectate. Încercați să ajustați filtrele.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
