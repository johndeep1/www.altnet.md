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
    <div className="min-h-screen bg-background">
      {/* Category Header */}
      <section className="bg-primary/5 border-b">
        <div className="container px-4 md:px-6 py-16">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-4 text-lg text-muted-foreground max-w-[700px]">
              {category.description}
            </p>
          )}
        </div>
      </section>

      <div className="container px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className="md:w-[300px] flex-shrink-0">
            <div className="sticky top-28">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/magazin/products/${product.id}`}
                    className="block group"
                  >
                    <Card className="overflow-hidden border border-border/50 hover:border-primary/50 transition-colors">
                      <CardImage>
                        <ProductImage
                          src={
                            product.images[0] || "/images/default-product.jpg"
                          }
                          alt={product.name}
                        />
                      </CardImage>
                      <CardContent>
                        <CardTitle>{product.name}</CardTitle>
                        <ExpandableDescription
                          text={product.description}
                          className="mt-2"
                        />
                      </CardContent>
                      <CardFooter>
                        <span className="font-medium text-primary">
                          {formatPrice(product.price)} MDL
                        </span>
                        {product.stock > 0 ? (
                          <span className="text-sm text-green-600">
                            În stoc
                          </span>
                        ) : (
                          <span className="text-sm text-red-600">
                            Stoc epuizat
                          </span>
                        )}
                      </CardFooter>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-lg font-medium text-muted-foreground">
                    Nu există produse care să corespundă filtrelor selectate.
                  </h3>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
