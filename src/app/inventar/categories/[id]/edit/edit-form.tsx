"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";

const categorySchema = z.object({
  name: z.string().min(3, "Numele trebuie să aibă cel puțin 3 caractere"),
  description: z
    .string()
    .min(10, "Descrierea trebuie să aibă cel puțin 10 caractere"),
  image: z.string().url("Vă rugăm să introduceți un URL valid pentru imagine"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface EditCategoryFormProps {
  categoryId: string;
}

export default function EditCategoryForm({
  categoryId,
}: EditCategoryFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const imageUrl = watch("image");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/inventar/api/categories/${categoryId}`);
        if (!response.ok) {
          throw new Error("Categoria nu a fost găsită");
        }
        const category = await response.json();
        setValue("name", category.name);
        setValue("description", category.description);
        setValue("image", category.image);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Eroare la încărcarea categoriei"
        );
      }
    };

    fetchCategory();
  }, [categoryId, setValue]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/inventar/api/categories/${categoryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Eroare la actualizarea categoriei");
      }

      router.push("/inventar/categories");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Eroare la actualizarea categoriei"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/inventar/categories"
                className="inline-flex items-center text-sm bg-gray-100 text-gray-900 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Înapoi la Categorii
              </Link>
              <h1 className="text-2xl font-semibold text-gray-900">
                Editare Categorie
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Informații de Bază
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Nume
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                        placeholder="Introduceți numele categoriei"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Descriere
                      </label>
                      <textarea
                        {...register("description")}
                        rows={4}
                        className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                        placeholder="Introduceți descrierea categoriei"
                      />
                      {errors.description && (
                        <p className="text-sm text-red-600">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image Section */}
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Imagine Categorie
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        URL Imagine
                      </label>
                      <div className="flex gap-3">
                        <input
                          {...register("image")}
                          type="text"
                          className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                          placeholder="Introduceți URL-ul imaginii"
                        />
                        <button
                          type="button"
                          onClick={() => setIsPreviewModalOpen(true)}
                          className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 transition-colors duration-200"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                      {errors.image && (
                        <p className="text-sm text-red-600">{errors.image.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex justify-end gap-3">
                  <Link
                    href="/inventar/categories"
                    className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Anulează
                  </Link>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Se actualizează..." : "Actualizează Categoria"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Image Preview Modal */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onConfirm={() => setIsPreviewModalOpen(false)}
        title="Previzualizare Imagine"
        message={
          <div className="relative w-full h-[400px]">
            <img
              src={imageUrl}
              alt="Previzualizare"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/400x300?text=Imagine+invalida";
              }}
            />
          </div>
        }
        confirmText="Închide"
        cancelText="Anulează"
      />
    </div>
  );
}
