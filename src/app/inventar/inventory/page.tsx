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
          <h1 className="text-3xl font-bold">Inventar</h1>
        </div>

        <div className="mt-8 rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Nume Produs
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Categorie
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium">
                    Stoc Actual
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
                      <span
                        className={`font-medium ${
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock < 5
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
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
                        <button
                          onClick={() => openUpdateModal(product)}
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-9 px-3"
                        >
                          Actualizează Stoc
                        </button>
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
            <p>
              Actualizați stocul pentru produsul:{" "}
              <span className="font-medium">{selectedProduct?.name}</span>
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Stoc Nou:</label>
              <input
                type="number"
                min="0"
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            {updateError && (
              <p className="text-sm text-red-600">{updateError}</p>
            )}
          </div>
        }
        confirmText="Actualizează"
        cancelText="Anulează"
      />
    </>
  );
}
