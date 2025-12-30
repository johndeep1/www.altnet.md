import { cache } from "react";
import {
  PUBLIC_API_BASE_URL,
  buildQueryString,
  parseListResponse,
} from "@/lib/backend-api";
import {
  mapPublicProductSummary,
  type StorefrontProductSummary,
} from "@/lib/catalog-mappers";
import { ConsistentBackground } from "./HeroSection";
import ProductCard from "@/components/products/ProductCard";

const fetchProducts = cache(async (): Promise<StorefrontProductSummary[]> => {
  try {
    const response = await fetch(
      `${PUBLIC_API_BASE_URL}/products${buildQueryString({
        limit: 24,
        offset: 0,
        in_stock: true,
      })}`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with ${response.status}`);
    }

    const payload = await response.json();
    const { data } = parseListResponse<Record<string, unknown>>(payload);
    return data.map(mapPublicProductSummary).filter((item) => item.id);
  } catch (error) {
    console.error("Failed to load products", error);
    return [];
  }
});

const pickRandom = <T,>(items: T[], count: number): T[] => {
  if (items.length <= count) return items;
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
};

export default async function ProductsSection() {
  const products = pickRandom(await fetchProducts(), 4);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-24 relative overflow-hidden">
      <ConsistentBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-px w-8 bg-primary/60" />
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm">
              Produse recomandate
            </span>
            <span className="h-px w-8 bg-primary/60" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Echipamente selectate pentru tine
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Descoperă cele mai populare produse disponibile acum în stoc.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
