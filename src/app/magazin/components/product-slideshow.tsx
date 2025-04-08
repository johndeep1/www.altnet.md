"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, Package, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import AutoPlay from "embla-carousel-autoplay";

const DEFAULT_IMAGE = "/images/default-category.jpg";

interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
}

export function ProductSlideshow() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Initialize Embla Carousel with autoplay (stops on hover)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
    },
    [
      AutoPlay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true
      })
    ]
  );

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/magazin/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Sync current index with Embla's selected slide
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    // Initial call to set the first index
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Navigation functions
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const getImageUrl = (category: Category) => {
    if (!category.image) return DEFAULT_IMAGE;
    if (category.image.startsWith("http")) return category.image;
    return `/${category.image}`;
  };

  if (isLoading) {
    return (
      <div className="w-full aspect-[21/9] bg-muted/50 animate-pulse rounded-2xl">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-muted to-transparent animate-shimmer" />
      </div>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="relative py-6 overflow-hidden">
      {/* Background Pattern and Gradient */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-secondary/5 to-background blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative px-4 md:px-6">
        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Embla Carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-background/5 backdrop-blur-sm">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex touch-pan-y">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="relative aspect-[10/6] md:aspect-[10/4] min-w-full"
                  >
                    <Link href={`/magazin/categories/${category.id}`}>
                      <div className="relative w-full h-full group">
                        <Image
                          src={getImageUrl(category)}
                          alt={category.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                        <div
                          className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12 transform transition-transform duration-500"
                        >
                          <div className="max-w-[700px] transform transition-all duration-700 group-hover:-translate-y-2">
                            <div className="flex items-center gap-1 sm:gap-2 text-primary mb-2 sm:mb-4">
                              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="text-xs sm:text-sm font-medium">Categorie Populară</span>
                            </div>
                            <h3 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4">
                              {category.name}
                            </h3>
                            {category.description && (
                              <p className="text-sm sm:text-base md:text-lg text-white/90 line-clamp-2 md:line-clamp-3 mb-3 sm:mb-6">
                                {category.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 group/btn">
                              <span className="text-sm sm:text-base text-white font-medium">Explorează Categoria</span>
                              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 pointer-events-auto transition-all duration-300 border border-border/50",
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90 md:opacity-100 md:scale-100"
              )}
              onClick={(e) => {
                e.preventDefault();
                scrollPrev();
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 pointer-events-auto transition-all duration-300 border border-border/50",
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90 md:opacity-100 md:scale-100"
              )}
              onClick={(e) => {
                e.preventDefault();
                scrollNext();
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Dots Navigation */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            {categories.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-primary/30 hover:bg-primary/50"
                )}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
