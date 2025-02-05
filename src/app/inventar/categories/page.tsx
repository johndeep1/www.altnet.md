"use client";

import { PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";

type Category = {
  id: string;
  name: string;
  description: string | null;
  _count: {
    products: number;
  };
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await fetch("/inventar/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await fetch(`/inventar/api/categories/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setCategories(categories.filter((category) => category.id !== id));
      setDeleteError(null);
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    } else {
      const error = await response.json();
      setDeleteError(error.error);
      if (categoryToDelete) {
        openDeleteModal(categoryToDelete);
      }
    }
  };

  const openDeleteModal = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
    setDeleteError(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-background p-8">
        <div className="mb-8">
          <Link
            href="/inventar"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la Panou
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Categorii</h1>
          <Link
            href="/inventar/categories/new"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Adaugă Categorie
          </Link>
        </div>

        <div className="mt-8 rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Nume
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Descriere
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Număr Produse
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Acțiuni
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {categories.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{category.name}</td>
                    <td className="p-4 align-middle">{category.description}</td>
                    <td className="p-4 align-middle">
                      {category._count.products}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex gap-2">
                        <Link
                          href={`/inventar/categories/${category.id}/edit`}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3"
                        >
                          Editează
                        </Link>
                        <button
                          onClick={() => openDeleteModal(category)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3"
                        >
                          Șterge
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCategoryToDelete(null);
          setDeleteError(null);
        }}
        onConfirm={() => {
          if (categoryToDelete) {
            handleDelete(categoryToDelete.id);
          }
        }}
        title="Șterge Categoria"
        message={
          deleteError ||
          `Sigur doriți să ștergeți categoria "${categoryToDelete?.name}"?`
        }
        confirmText="Șterge"
        cancelText="Anulează"
      />
    </>
  );
}
