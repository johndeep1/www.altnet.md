"use client";

import { useEffect, useState, useRef, TouchEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

const DEFAULT_IMAGE = "/images/default-category.jpg";

interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
}

export function ProductSlideshow() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

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

  useEffect(() => {
    if (categories.length === 0 || isHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % categories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [categories.length, isHovered]);

  const nextSlide = () => {
    setCurrentIndex((current) => (current + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (current) => (current - 1 + categories.length) % categories.length
    );
  };

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

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
    <section className="py-16 bg-gradient-to-b from-background to-secondary/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Categorii Populare
          </h2>
          <p className="mt-4 text-muted-foreground max-w-[700px] text-lg">
            Descoperă cele mai populare categorii de produse și găsește exact ce
            cauți
          </p>
        </div>

        <div
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={slideRef}
            className="relative aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {categories.map((category, index) => (
              <Link
                key={category.id}
                href={`/magazin/categories/${category.id}`}
                className={cn(
                  "absolute inset-0 transition-all duration-700 transform",
                  index === currentIndex
                    ? "opacity-100 translate-x-0 scale-100"
                    : index < currentIndex
                    ? "opacity-0 -translate-x-full scale-95"
                    : "opacity-0 translate-x-full scale-95"
                )}
              >
                <div className="relative w-full h-full group">
                  <Image
                    src={getImageUrl(category)}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={index === currentIndex}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 lg:p-12">
                    <div className="max-w-[700px] transform transition-all duration-700 translate-y-0 group-hover:-translate-y-2">
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-lg text-white/90 line-clamp-2 md:line-clamp-3">
                          {category.description}
                        </p>
                      )}
                      <div className="mt-4 inline-flex">
                        <Button
                          variant="secondary"
                          className="group/btn relative overflow-hidden btn-ghost"
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className="relative z-10">
                            Explorează categoria
                          </span>
                          <span className="absolute inset-0 bg-primary transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-11 w-11 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 pointer-events-auto transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
              )}
              onClick={(e) => {
                e.preventDefault();
                prevSlide();
              }}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-11 w-11 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 pointer-events-auto transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
              )}
              onClick={(e) => {
                e.preventDefault();
                nextSlide();
              }}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Dots Navigation */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3">
            {categories.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-primary w-6"
                    : "bg-primary/30 hover:bg-primary/50"
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
