"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { formatPrice, getImageUrl } from "../../lib/utils";
import { Badge } from "../../components/ui/badge";
import { useCart } from "../../lib/cart";
import { ExpandableDescription } from "../../components/ui/expandable-description";
import { RecommendedProducts } from "../../components/recommended-products";
import { ProductImage } from "../../components/ui/product-image";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  brand: string;
  model: string | null;
  specs: Record<string, any> | null;
  images: string[];
  status: "ACTIVE" | "OUTOFSTOCK" | "DISCONTINUED" | "COMINGSOON";
  createdAt: string;
}

export default function ProductClient({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, updateQuantity } = useCart();

  useEffect(() => {
    fetch(`/magazin/api/products/${productId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Product not found");
        return response.json();
      })
      .then((data) => {
        // Parse specs if it's a string
        if (typeof data.specs === 'string') {
          try {
            data.specs = JSON.parse(data.specs);
          } catch (e) {
            console.error('Error parsing specs:', e);
            data.specs = {};
          }
        }
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        notFound();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background animate-pulse">
        <div className="h-[400px] bg-muted" />
      </div>
    );
  }

  if (!product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.images[0] || "/images/default-product.jpg",
    });
    updateQuantity(product.id, quantity);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-6 py-6">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/magazin"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Magazin
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href={`/magazin/categories/${product.categoryId}`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {product.category.name}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <ProductImage
                src={
                  product.images[currentImageIndex] ||
                  "/images/default-product.jpg"
                }
                alt={product.name}
                priority={currentImageIndex === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-contain hover:scale-105 transition-transform duration-300"
              />
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={previousImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 px-1">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-24 aspect-square flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 hover:scale-105
                      ${
                        index === currentImageIndex
                          ? "border-primary shadow-md"
                          : "border-transparent hover:border-gray-200"
                      }`}
                  >
                    <ProductImage
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-3">
                <Badge
                  variant={product.stock > 0 ? "default" : "destructive"}
                  className="px-3 py-1 text-sm font-medium"
                >
                  {product.stock > 0 ? "În stoc" : "Stoc epuizat"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  SKU: {product.sku}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                <span className="text-lg text-muted-foreground">MDL</span>
              </div>
              {product.stock > 0 && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-gray-50 rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="h-9 w-9"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                      className="h-9 w-9"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={handleAddToCart} className="flex-1 h-11">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Adaugă în coș
                  </Button>
                </div>
              )}
            </div>

            <Separator className="bg-gray-100" />

            {/* Product Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Despre produs</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <ExpandableDescription text={product.description} />
              </div>
            </div>

            <Separator className="bg-gray-100" />

            {/* Additional Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Informații adiționale</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <dl className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <dt className="font-medium text-muted-foreground">Brand</dt>
                    <dd className="col-span-2 text-gray-900">{product.brand}</dd>
                  </div>
                  {product.model && (
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="font-medium text-muted-foreground">Model</dt>
                      <dd className="col-span-2 text-gray-900">{product.model}</dd>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-4">
                    <dt className="font-medium text-muted-foreground">Categorie</dt>
                    <dd className="col-span-2">
                      <Link
                        href={`/magazin/categories/${product.categoryId}`}
                        className="text-primary hover:underline"
                      >
                        {product.category.name}
                      </Link>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section - Full Width */}
        {product.specs && typeof product.specs === 'object' && Object.keys(product.specs).length > 0 && (
          <div className="mt-16 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent -skew-y-2 rounded-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1 bg-emerald-500 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-900">Specificații Tehnice</h2>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-emerald-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(product.specs)
                    .filter(([_, value]) => value !== null && value !== '')
                    .map(([key, value], index) => {
                      const cleanKey = key.replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();
                      const displayKey = cleanKey.charAt(0).toUpperCase() + cleanKey.slice(1);

                      return (
                        <div
                          key={key}
                          className="group relative bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-emerald-200"
                        >
                          {/* Decorative element */}
                          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-bl-2xl rounded-tr-xl transition-colors duration-300 group-hover:bg-emerald-500/10" />

                          <div className="relative">
                            <dt className="text-sm font-medium text-emerald-600 mb-2 flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-emerald-500" />
                              {displayKey}
                            </dt>
                            <dd className="text-base font-semibold text-gray-900">
                              {String(value)}
                            </dd>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Products */}
        <div className="mt-20">
          <RecommendedProducts
            currentProductId={product.id}
            categoryId={product.categoryId}
          />
        </div>
      </div>
    </div>
  );
}
