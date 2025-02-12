import Link from "next/link";
import { Card } from "./ui/card";
import prisma from "../lib/prisma";
import { unstable_cache } from "next/cache";
import { CategoryImage } from "./ui/category-image";

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
    <section className="py-24 bg-secondary/5">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Explorează Produsle Noastre
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Descoperă o gamă largă de produse organizate pe categorii pentru o
              experiență de cumpărare simplă și eficientă.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/magazin/categories/${category.id}`}
              className="group relative block"
            >
              <Card className="overflow-hidden h-[300px] transition-colors duration-300 group-hover:border-primary/50">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="relative w-full h-full transform transition-transform duration-300 group-hover:scale-105">
                    <CategoryImage
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={75}
                      loading="eager"
                      priority={false}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                </div>
                <div className="relative h-full p-6 flex flex-col justify-end">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">
                      {category.name}
                    </h3>
                    <p className="text-white/80">{category.description}</p>
                    <div className="flex items-center gap-2 text-white/60">
                      <span className="text-sm">
                        {category.products.length} produse
                      </span>
                      <svg
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
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
