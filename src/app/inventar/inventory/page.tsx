"use client";

import { ArrowLeft } from "lucide-react";
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

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newStock, setNewStock] = useState<number>(0);
  const [updateError, setUpdateError] = useState<string | null>(null);
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

  const handleUpdateStock = async (id: string, newStockValue: number) => {
    const response = await fetch(`/inventar/api/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock: newStockValue,
        status: newStockValue > 0 ? "ACTIVE" : "OUTOFSTOCK",
      }),
    });

    if (response.ok) {
      setProducts(
        products.map((product) =>
          product.id === id
            ? {
                ...product,
                stock: newStockValue,
                status: newStockValue > 0 ? "ACTIVE" : "OUTOFSTOCK",
              }
            : product
        )
      );
      setUpdateError(null);
    } else {
      const error = await response.json();
      setUpdateError(error.error);
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

  const openUpdateModal = (product: Product) => {
    setSelectedProduct(product);
    setNewStock(product.stock);
    setIsUpdateModalOpen(true);
    setUpdateError(null);
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
          <h1 className="text-3xl font-bold text-foreground">Inventar</h1>
        </div>

        <div className="mt-8 rounded-lg border bg-card">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="h-12 px-4 text-left align-middle font-medium text-foreground">
                    Nume Produs
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-foreground">
                    Categorie
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-foreground">
                    Stoc Actual
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
                        <button
                          onClick={() => openUpdateModal(product)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 shadow-sm transition-colors"
                        >
                          Actualizează Stoc
                        </button>
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
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedProduct(null);
          setUpdateError(null);
        }}
        onConfirm={() => {
          if (selectedProduct) {
            handleUpdateStock(selectedProduct.id, newStock);
            setIsUpdateModalOpen(false);
          }
        }}
        title="Actualizare Stoc"
        message={
          <div className="space-y-4">
            <p className="text-foreground">
              Actualizați stocul pentru produsul:{" "}
              <span className="font-medium">{selectedProduct?.name}</span>
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Stoc Nou:
              </label>
              <input
                type="number"
                min="0"
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              />
            </div>
            {updateError && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded-md">
                {updateError}
              </p>
            )}
          </div>
        }
        confirmText="Actualizează"
        cancelText="Anulează"
      />
    </>
  );
}
