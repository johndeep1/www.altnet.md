import { Suspense } from "react";
import CategoryClient from "./category-client";

interface Props {
  params: { id: string };
}

export default function CategoryPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="container px-4 md:px-6 py-6">
          <div className="h-[300px] rounded-xl bg-muted animate-pulse" />
        </div>
      }
    >
      <CategoryClient categoryId={params.id} />
    </Suspense>
  );
}
