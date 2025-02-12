"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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
import { formatPrice } from "../../lib/utils";
import { Badge } from "../../components/ui/badge";
import { useCart } from "../../lib/cart";
import { ExpandableDescription } from "../../components/ui/expandable-description";
import { RecommendedProducts } from "../../components/recommended-products";

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
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href={`/magazin/categories/${product.categoryId}`}
            className="text-sm text-muted-foreground hover:text-primary"
          >
            {product.category.name}
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <span className="text-sm">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square">
              <Image
                src={
                  product.images[currentImageIndex] ||
                  "/images/default-product.jpg"
                }
                alt={product.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    onClick={previousImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 aspect-square flex-shrink-0 rounded-md overflow-hidden border-2 
                      ${
                        index === currentImageIndex
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? "În stoc" : "Stoc epuizat"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  SKU: {product.sku}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-2xl font-bold text-primary">
                {formatPrice(product.price)} MDL
              </span>
              {product.stock > 0 && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button onClick={handleAddToCart} className="flex-1">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Adaugă în coș
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            {/* Product Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Despre produs</h2>
              <ExpandableDescription text={product.description} />
            </div>

            <Separator />

            {/* Specifications */}
            {product.specs &&
              typeof product.specs === "object" &&
              Object.keys(product.specs).length > 0 &&
              Object.values(product.specs).some(
                (value) => value !== null && value !== ""
              ) && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Specificații</h2>
                  <Card className="p-6">
                    <dl className="space-y-4">
                      {Object.entries(product.specs)
                        .filter(([_, value]) => value !== null && value !== "")
                        .map(([key, value]) => (
                          <div key={key} className="grid grid-cols-3 gap-4">
                            <dt className="font-medium text-muted-foreground">
                              {key}
                            </dt>
                            <dd className="col-span-2">{String(value)}</dd>
                          </div>
                        ))}
                    </dl>
                  </Card>
                </div>
              )}

            {/* Additional Info */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Informații adiționale</h2>
              <Card className="p-6">
                <dl className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <dt className="font-medium text-muted-foreground">Brand</dt>
                    <dd className="col-span-2">{product.brand}</dd>
                  </div>
                  {product.model && (
                    <div className="grid grid-cols-3 gap-4">
                      <dt className="font-medium text-muted-foreground">
                        Model
                      </dt>
                      <dd className="col-span-2">{product.model}</dd>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-4">
                    <dt className="font-medium text-muted-foreground">
                      Categorie
                    </dt>
                    <dd className="col-span-2">
                      <Link
                        href={`/categories/${product.categoryId}`}
                        className="text-primary hover:underline"
                      >
                        {product.category.name}
                      </Link>
                    </dd>
                  </div>
                </dl>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="container px-4 md:px-6 py-12">
        <RecommendedProducts
          currentProductId={product.id}
          categoryId={product.categoryId}
        />
      </div>
    </div>
  );
}
