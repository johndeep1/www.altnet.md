import Link from "next/link";
import { Card } from "./ui/card";
import prisma from "../lib/prisma";
import { unstable_cache } from "next/cache";
import { CategoryImage } from "./ui/category-image";
import { ArrowRight, Package } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  products: { id: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const getCachedCategories = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        products: {
          select: {
            id: true,
          },
        },
      },
    });
    return categories;
  },
  ["categories"],
  { revalidate: 60, tags: ["categories"] }
);

export async function CategoriesSection() {
  const categories = await getCachedCategories();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern and Gradient */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-secondary/5 to-background blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Categorii <span className="text-primary">Populare</span>
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
            Descoperă o gamă largă de produse organizate pe categorii pentru o
            experiență de cumpărare simplă și eficientă.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/magazin/categories/${category.id}`}
              className="group relative block"
            >
              <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/50 h-[300px] sm:h-[350px]">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-105">
                    <CategoryImage
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={85}
                      loading={index < 3 ? "eager" : "lazy"}
                      priority={index < 3}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                </div>
                <div className="relative h-full p-6 sm:p-8 flex flex-col justify-end">
                  <div className="transform transition-all duration-300 group-hover:translate-y-0 translate-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-bold text-white">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-white/90 line-clamp-2 text-base sm:text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {category.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                      <div className="flex items-center gap-2 text-white/80">
                        <Package className="w-4 h-4" />
                        <span className="text-sm sm:text-base">
                          {category.products.length} produse
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-primary-foreground">
                        <span className="text-sm sm:text-base font-medium">Explorează</span>
                        <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
