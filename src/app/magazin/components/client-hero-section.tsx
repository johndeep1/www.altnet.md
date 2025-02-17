"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Search, Sparkles, Package, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  status: "ACTIVE" | "OUTOFSTOCK" | "DISCONTINUED" | "COMINGSOON";
}

export function ClientHeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchTotalProducts() {
      try {
        const response = await fetch("/magazin/api/products/count");
        if (!response.ok) throw new Error("Failed to fetch product count");
        const data = await response.json();
        setTotalProducts(data.count);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.warn("Error fetching product count:", error.message);
        }
        setTotalProducts(0);
      }
    }
    fetchTotalProducts();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    } catch (error: unknown) {
      console.error("Search error:", error instanceof Error ? error.message : "Unknown error");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim().length >= 2) {
      const timeoutId = setTimeout(() => {
        handleSearch();
      }, 300);

      return () => clearTimeout(timeoutId);
    } else {
      setShowDropdown(false);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Animated Background Gradient */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-secondary/5 to-background blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container px-4 md:px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col space-y-12">
            {/* Badges */}
            <div className="flex flex-wrap gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 shadow-lg backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 mr-2.5 text-primary animate-pulse" />
                  <span className="text-sm font-semibold text-primary">
                    Altnet
                  </span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="group hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center px-5 py-2.5 rounded-full bg-red-500/10 border border-red-500/20 shadow-lg backdrop-blur-sm">
                  <Zap className="w-5 h-5 mr-2.5 text-red-500 animate-pulse" />
                  <span className="text-sm font-semibold text-red-500">
                    Reduceri până la 40%
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                Tehnologie
                <span className="relative block mt-3 text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/90 to-primary/80">
                  Pentru Viitorul Tău
                  <motion.div
                    className="absolute -bottom-2 left-0 w-24 h-1 bg-primary rounded-full"
                    animate={{
                      width: ["6rem", "12rem", "6rem"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Descoperă cele mai noi gadget-uri și echipamente electronice la
                prețuri competitive. Calitate garantată și livrare rapidă în
                toată Moldova.
              </p>
            </motion.div>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-8">
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-medium">Caută produsul dorit</h3>
                  <p className="text-base text-muted-foreground">
                    Peste {totalProducts.toLocaleString()} produse disponibile în stoc
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-secondary/20 rounded-full backdrop-blur-sm border border-secondary/10 shadow-lg">
                  <Package className="w-6 h-6 text-primary" />
                  <span className="text-base font-medium">{totalProducts.toLocaleString()}+ Produse</span>
                </div>
              </div>

              <div className="relative w-full max-w-2xl" ref={searchContainerRef}>
                <form onSubmit={handleSearch} className="flex gap-3">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <Input
                      type="text"
                      placeholder="Caută produse..."
                      value={searchQuery}
                      onChange={handleSearchInput}
                      className="pl-14 h-16 text-lg bg-background/90 backdrop-blur-md border-2 border-muted-foreground/20 hover:border-primary/30 focus:border-primary transition-all rounded-full shadow-xl"
                    />
                    {isLoading && (
                      <div className="absolute right-5 top-1/2 -translate-y-1/2">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
                      </div>
                    )}
                  </div>
                </form>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {showDropdown && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="absolute top-full left-0 right-0 mt-3 z-50 h-[296px] max-h-[296px] overflow-y-auto shadow-2xl border-border/50 bg-background/90 backdrop-blur-xl rounded-2xl">
                        <div className="p-4 space-y-4">
                          {searchResults.map((product) => (
                            <Link
                              key={product.id}
                              href={`/magazin/products/${product.id}`}
                              className="flex items-center gap-4 p-4 hover:bg-muted/80 rounded-xl transition-all group h-[128px]"
                              onClick={() => {
                                setShowDropdown(false);
                                setSearchQuery("");
                              }}
                            >
                              <div className="relative w-[100px] h-[100px] rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                                <Image
                                  src={product.images[0] || "/images/default-product.jpg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0 h-full flex flex-col justify-between">
                                <div>
                                  <h4 className="font-medium text-lg group-hover:text-primary transition-colors line-clamp-1">
                                    {product.name}
                                  </h4>
                                  <p className="text-base text-muted-foreground line-clamp-2 mt-1.5">
                                    {product.description}
                                  </p>
                                </div>
                                <p className="text-xl font-semibold text-primary">
                                  {formatPrice(product.price)} MDL
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative lg:block h-full min-h-[600px]"
          >
            <div className="relative grid grid-cols-4 gap-8 h-full">
              {/* Main Large Image */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative col-span-4 h-[450px] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
              >
                <Image
                  src="https://images.unsplash.com/photo-1525004351186-bdc426f3efaa?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Featured Tech"
                  fill
                  className="object-cover"
                  priority
                  quality={85}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>

              {/* Smaller Images Container */}
              <div className="col-span-4 grid grid-cols-2 gap-8 h-[220px]">
                {/* First Small Image */}
                <motion.div
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative h-full rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1619233543829-665423afedc3?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="MacBook Pro"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>

                {/* Second Small Image */}
                <motion.div
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative h-full rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1580522154071-c6ca47a859ad?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="iPhone"
                    fill
                    className="object-cover"
                    quality={85}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 600px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              </div>


            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
