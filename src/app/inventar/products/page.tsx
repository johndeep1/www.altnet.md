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
          <h1 className="text-3xl font-bold">Produse</h1>
          <Link
            href="/inventar/products/new"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Adaugă Produs
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
                    Categorie
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Preț
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Stoc
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Status
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Acțiuni
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle">{product.name}</td>
                    <td className="p-4 align-middle">
                      {product.category.name}
                    </td>
                    <td className="p-4 align-middle">
                      {product.price.toString()} Lei
                    </td>
                    <td className="p-4 align-middle">{product.stock}</td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          product.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : product.status === "OUTOFSTOCK"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {statusMessages[product.status]}
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex gap-2">
                        <Link
                          href={`/inventar/products/${product.id}/edit`}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3"
                        >
                          Editează
                        </Link>
                        {product.status === "OUTOFSTOCK" ? (
                          <button
                            onClick={() => handleSetBackInStock(product.id)}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-green-50 hover:bg-green-100 text-green-600 h-9 px-3"
                          >
                            Adaugă în Stoc
                          </button>
                        ) : (
                          <button
                            onClick={() => handleSetOutOfStock(product.id)}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-red-50 hover:bg-red-100 text-red-600 h-9 px-3"
                          >
                            Marchează Stoc Epuizat
                          </button>
                        )}
                        <button
                          onClick={() => openDeleteModal(product)}
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
          setProductToDelete(null);
        }}
        onConfirm={() => {
          if (productToDelete) {
            handleDelete(productToDelete.id);
          }
        }}
        title="Șterge Produsul"
        message={`Sigur doriți să ștergeți produsul "${productToDelete?.name}"?`}
        confirmText="Șterge"
        cancelText="Anulează"
      />
    </>
  );
}
