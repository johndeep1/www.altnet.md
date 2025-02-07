"use client";

import { PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "OUTOFSTOCK" | "DISCONTINUED" | "COMINGSOON";
  category: {
    name: string;
  };
};

const statusMessages = {
  ACTIVE: "Activ",
  OUTOFSTOCK: "Stoc Epuizat",
  DISCONTINUED: "Întrerupt",
  COMINGSOON: "În Curând",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch("/inventar/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    const response = await fetch(`/inventar/api/products/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setProducts(products.filter((product) => product.id !== id));
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  const handleSetOutOfStock = async (id: string) => {
    const response = await fetch(`/inventar/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "OUTOFSTOCK",
        stock: 0,
      }),
    });

    if (response.ok) {
      setProducts(
        products.map((product) =>
          product.id === id
            ? { ...product, status: "OUTOFSTOCK", stock: 0 }
            : product
        )
      );
    }
  };

  const handleSetBackInStock = async (id: string) => {
    const response = await fetch(`/inventar/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "ACTIVE",
        stock: 1,
      }),
    });

    if (response.ok) {
      setProducts(
        products.map((product) =>
          product.id === id
            ? { ...product, status: "ACTIVE", stock: 1 }
            : product
        )
      );
    }
  };

  const openDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
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
      <div className="min-h-screen bg-background p-8">
        <div className="mb-8">
          <Link
            href="/inventar"
            className="inline-flex items-center text-sm bg-secondary text-secondary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la Panou
          </Link>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-foreground">Produse</h1>
          <Link
            href="/inventar/products/new"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 shadow-sm transition-colors"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Adaugă Produs
          </Link>
        </div>

        <div className="mt-8 rounded-lg border bg-card">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="h-12 px-4 text-left align-middle font-medium text-foreground">
                    Nume
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-foreground">
                    Categorie
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-foreground">
                    Preț
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-foreground">
                    Stoc
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-foreground">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-foreground">
                    Acțiuni
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b transition-colors hover:bg-muted/50"
                  >
                    <td className="p-4 align-middle">{product.name}</td>
                    <td className="p-4 align-middle">
                      {product.category.name}
                    </td>
                    <td className="p-4 align-middle">
                      {product.price.toString()} Lei
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          product.stock === 0
                            ? "bg-red-100 text-red-800"
                            : product.stock < 5
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          product.status === "ACTIVE"
                            ? "bg-green-600 text-white"
                            : product.status === "OUTOFSTOCK"
                            ? "bg-red-600 text-white"
                            : "bg-yellow-600 text-white"
                        }`}
                      >
                        {statusMessages[product.status]}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex gap-2">
                        <Link
                          href={`/inventar/products/${product.id}/edit`}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 shadow-sm transition-colors"
                        >
                          Editează
                        </Link>
                        {product.status === "OUTOFSTOCK" ? (
                          <button
                            onClick={() => handleSetBackInStock(product.id)}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 h-9 px-4 shadow-sm transition-colors"
                          >
                            Adaugă în Stoc
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSetOutOfStock(product.id)}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 h-9 px-4 shadow-sm transition-colors"
                          >
                            Marchează Stoc Epuizat
                          </button>
                        )}
                        <button
                          onClick={() => openDeleteModal(product)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-4 shadow-sm transition-colors"
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
          setProductToDelete(null);
        }}
        onConfirm={() => {
          if (productToDelete) {
            handleDelete(productToDelete.id);
          }
        }}
        title="Șterge Produsul"
        message={
          <div className="text-foreground">
            Sigur doriți să ștergeți produsul "{productToDelete?.name}"?
          </div>
        }
        confirmText="Șterge"
        cancelText="Anulează"
      />
    </>
  );
}
