"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import { Suspense } from "react";
import React from "react";
import EditCategoryForm from "./edit-form";

const categorySchema = z.object({
  name: z.string().min(3, "Numele trebuie să aibă cel puțin 3 caractere"),
  description: z
    .string()
    .min(10, "Descrierea trebuie să aibă cel puțin 10 caractere"),
  image: z.string().url("Vă rugăm să introduceți un URL valid pentru imagine"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = React.use(params);

  return (
    <Suspense fallback={<div>Se încarcă...</div>}>
      <EditCategoryForm categoryId={unwrappedParams.id} />
    </Suspense>
  );
}
