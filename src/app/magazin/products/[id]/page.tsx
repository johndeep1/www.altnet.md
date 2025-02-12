import { Suspense } from "react";
import ProductClient from "@/app/magazin/products/[id]/product-client";

interface Props {
  params: { id: string };
}

export default function ProductPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background animate-pulse">
          <div className="h-[400px] bg-muted" />
        </div>
      }
    >
      <ProductClient productId={params.id} />
    </Suspense>
  );
}
