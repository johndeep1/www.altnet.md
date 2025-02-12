import { Suspense } from "react";
import dynamic from "next/dynamic";
import { CategoriesSection } from "./components/categories-section";
import { ProductSlideshow } from "./components/product-slideshow";
import { RecentProducts } from "./components/recent-products";

export const revalidate = 3600; // Revalidate every hour

const ClientHeroSection = dynamic(
  () =>
    import("./components/client-hero-section").then(
      (mod) => mod.ClientHeroSection
    ),
  {
    ssr: true,
  }
);

export default function Home() {
  return (
    <main>
      <ClientHeroSection />
      <Suspense
        fallback={
          <div className="container px-4 md:px-6 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-[300px] rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          </div>
        }
      >
        <CategoriesSection />
      </Suspense>
      <RecentProducts />
      <ProductSlideshow />
    </main>
  );
}
