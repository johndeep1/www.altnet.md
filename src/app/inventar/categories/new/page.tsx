"use client";

import { useState } from "react";
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

export default function NewCategoryPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const imageUrl = watch("image");

  const onSubmit = async (data: CategoryFormData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/inventar/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Eroare la crearea categoriei");
      }

      router.push("/inventar/categories");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Eroare la crearea categoriei"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <Link
          href="/inventar/categories"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Înapoi la Categorii
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Adaugă Categorie Nouă
            </h3>
            <p className="text-sm text-muted-foreground">
              Completați detaliile pentru noua categorie
            </p>
          </div>
          <div className="p-6 pt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nume
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    id="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Introduceți numele categoriei"
                  />
                  {errors.name && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Descriere
                  </label>
                  <textarea
                    {...register("description")}
                    id="description"
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Introduceți descrierea categoriei"
                  />
                  {errors.description && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="image"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    URL Imagine
                  </label>
                  <div className="flex gap-2">
                    <input
                      {...register("image")}
                      type="text"
                      id="image"
                      className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Introduceți URL-ul imaginii"
                    />
                    <button
                      type="button"
                      onClick={() => setIsPreviewModalOpen(true)}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                  {errors.image && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.image.message}
                    </p>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="flex items-center gap-4 pt-4 border-t">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  {isLoading ? "Se creează..." : "Creează Categorie"}
                </button>
                <Link
                  href="/inventar/categories"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                >
                  Anulează
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onConfirm={() => setIsPreviewModalOpen(false)}
        title="Previzualizare Imagine"
        message={
          <div className="flex justify-center">
            <img
              src={imageUrl}
              alt="Previzualizare"
              className="max-h-[500px] object-contain rounded-md"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/400x300?text=Imagine+invalida";
              }}
            />
          </div>
        }
        confirmText="Închide"
      />
    </div>
  );
}
