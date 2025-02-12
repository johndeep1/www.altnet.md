"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Search, Sparkles, Package, Zap } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "../lib/utils";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

export function ClientHeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!searchQuery.trim()) {
      setShowDropdown(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `/magazin/api/search?q=${encodeURIComponent(searchQuery.trim())}`
      );
      if (!response.ok) throw new Error("Search failed");

      const data = await response.json();
      setSearchResults(data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length >= 2) {
      // Only search if there are 2 or more characters
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 300); // Debounce search for 300ms

      return () => clearTimeout(timeoutId);
    } else {
      setShowDropdown(false);
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center bg-gradient-to-b from-background via-secondary/5 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container px-4 md:px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col space-y-10">
            {/* Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="group animate-fade-in hover:scale-105 transition-transform">
                <div className="flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 shadow-sm backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 mr-2 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    Altnet
                  </span>
                </div>
              </div>
              <div className="group animate-fade-in hover:scale-105 transition-transform">
                <div className="flex items-center px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 shadow-sm backdrop-blur-sm">
                  <Zap className="w-4 h-4 mr-2 text-red-500" />
                  <span className="text-sm font-medium text-red-500">
                    Reduceri până la 40%
                  </span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                Tehnologie
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary/80 animate-gradient">
                  Pentru Viitorul Tău
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Descoperă cele mai noi gadget-uri și echipamente electronice la
                prețuri competitive. Calitate garantată și livrare rapidă în
                toată Moldova.
              </p>
            </div>

            {/* Search Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-medium">Caută produsul dorit</h3>
                  <p className="text-sm text-muted-foreground">
                    Peste 1,000 de produse disponibile în stoc
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary/20 rounded-full">
                  <Package className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">1.2k+ Produse</span>
                </div>
              </div>

              <div className="relative w-full max-w-2xl">
                <form onSubmit={handleSearch} className="flex gap-3">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <Input
                      type="text"
                      placeholder="Caută produse..."
                      value={searchQuery}
                      onChange={handleSearchInput}
                      className="pl-12 h-14 text-base bg-background/80 backdrop-blur-sm border-2 border-muted-foreground/20 hover:border-primary/30 focus:border-primary transition-all rounded-full shadow-sm"
                    />
                    {isLoading && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                      </div>
                    )}
                  </div>
                </form>

                {/* Search Results Dropdown */}
                {showDropdown && searchResults.length > 0 && (
                  <Card className="absolute top-full left-0 right-0 mt-2 z-50 h-[296px] max-h-[296px] overflow-y-auto shadow-lg border-border bg-background/95 backdrop-blur-sm rounded-2xl">
                    <div className="p-4 space-y-4">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/magazin/products/${product.id}`}
                          className="flex items-center gap-4 p-4 hover:bg-muted rounded-xl transition-all group h-[128px]"
                          onClick={() => {
                            setShowDropdown(false);
                            setSearchQuery("");
                          }}
                        >
                          <div className="relative w-[100px] h-[100px] rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                            <Image
                              src={
                                product.images[0] ||
                                "/images/default-product.jpg"
                              }
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0 h-full flex flex-col justify-between">
                            <div>
                              <h4 className="font-medium text-base group-hover:text-primary transition-colors line-clamp-1">
                                {product.name}
                              </h4>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {product.description}
                              </p>
                            </div>
                            <p className="text-lg font-semibold text-primary">
                              {formatPrice(product.price)} MDL
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Image Grid */}
          <div className="relative lg:block h-full min-h-[600px]">
            <div className="relative grid grid-cols-4 gap-6 h-full">
              {/* Main Large Image */}
              <div className="relative col-span-4 h-[400px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform">
                <Image
                  src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Featured Tech"
                  fill
                  className="object-cover"
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Smaller Images Container */}
              <div className="col-span-4 grid grid-cols-2 gap-6 h-[200px]">
                {/* First Small Image */}
                <div className="relative h-full rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform">
                  <Image
                    src="https://images.unsplash.com/photo-1619233543829-665423afedc3?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="MacBook Pro"
                    fill
                    className="object-cover"
                    quality={75}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 600px"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Second Small Image */}
                <div className="relative h-full rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform">
                  <Image
                    src="https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="iPhone"
                    fill
                    className="object-cover"
                    quality={75}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 600px"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Stats Card */}
              <div className="absolute left-1/2 top-[200px] transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="bg-background/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-secondary/10 flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute animate-ping w-3 h-3 rounded-full bg-primary/40"></div>
                      <div className="relative w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                    <span className="font-medium">Live</span>
                  </div>
                  <div className="text-sm font-medium pl-3 border-l border-secondary/20">
                    <span className="text-primary">1.2k+</span> Produse
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
