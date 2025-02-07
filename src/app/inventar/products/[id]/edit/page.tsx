import { Suspense } from "react";
import EditProductForm from "@/app/inventar/products/[id]/edit/edit-form";

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProductForm productId={params.id} />
    </Suspense>
  );
}
