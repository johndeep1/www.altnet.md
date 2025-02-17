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
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/inventar"
                  className="inline-flex items-center text-sm bg-gray-100 text-gray-900 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Înapoi la Panou
                </Link>
                <h1 className="text-2xl font-semibold text-gray-900">Categorii</h1>
              </div>
              <Link
                href="/inventar/categories/new"
                className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 h-10 px-4 py-2 shadow-sm transition-colors duration-200"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Adaugă Categorie
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b bg-gray-50/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Nume
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Descriere
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Număr Produse
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Acțiuni
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="transition-colors hover:bg-gray-50/50"
                    >
                      <td className="p-4 align-middle font-medium text-gray-900">
                        {category.name}
                      </td>
                      <td className="p-4 align-middle text-gray-600">
                        {category.description}
                      </td>
                      <td className="p-4 align-middle">
                        <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset bg-gray-100 text-gray-700 ring-gray-600/20">
                          {category._count.products}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex gap-2">
                          <Link
                            href={`/inventar/categories/${category.id}/edit`}
                            className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 h-9 px-4 shadow-sm transition-colors duration-200"
                          >
                            Editează
                          </Link>
                          <button
                            onClick={() => openDeleteModal(category)}
                            className="inline-flex items-center justify-center rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 h-9 px-4 shadow-sm transition-colors duration-200"
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
          <div className="text-gray-600">
            {deleteError || (
              <>
                Sigur doriți să ștergeți categoria{" "}
                <span className="font-medium text-gray-900">
                  "{categoryToDelete?.name}"
                </span>
                ?
              </>
            )}
          </div>
        }
        confirmText="Șterge"
        cancelText="Anulează"
      />
    </>
  );
}
