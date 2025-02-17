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
                <h1 className="text-2xl font-semibold text-gray-900">Inventar</h1>
              </div>
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
                      Nume Produs
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Categorie
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Stoc Actual
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Status
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">
                      Acțiuni
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="transition-colors hover:bg-gray-50/50"
                    >
                      <td className="p-4 align-middle font-medium text-gray-900">
                        {product.name}
                      </td>
                      <td className="p-4 align-middle text-gray-600">
                        {product.category.name}
                      </td>
                      <td className="p-4 align-middle">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                            product.stock === 0
                              ? "bg-red-50 text-red-700 ring-red-600/20"
                              : product.stock < 5
                              ? "bg-yellow-50 text-yellow-800 ring-yellow-600/20"
                              : "bg-green-50 text-green-700 ring-green-600/20"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                            product.status === "ACTIVE"
                              ? "bg-green-50 text-green-700 ring-green-600/20"
                              : product.status === "OUTOFSTOCK"
                              ? "bg-red-50 text-red-700 ring-red-600/20"
                              : "bg-yellow-50 text-yellow-800 ring-yellow-600/20"
                          }`}
                        >
                          {statusMessages[product.status]}
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openUpdateModal(product)}
                            className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-gray-900 text-white hover:bg-gray-800 h-9 px-4 shadow-sm transition-colors duration-200"
                          >
                            Actualizează Stoc
                          </button>
                          {product.status === "OUTOFSTOCK" ? (
                            <button
                              onClick={() => handleSetBackInStock(product.id)}
                              className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 h-9 px-4 shadow-sm transition-colors duration-200"
                            >
                              Adaugă în Stoc
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSetOutOfStock(product.id)}
                              className="inline-flex items-center justify-center rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 h-9 px-4 shadow-sm transition-colors duration-200"
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
            <p className="text-gray-600">
              Actualizați stocul pentru produsul:{" "}
              <span className="font-medium text-gray-900">{selectedProduct?.name}</span>
            </p>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Stoc Nou:
              </label>
              <input
                type="number"
                min="0"
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
              />
            </div>
            {updateError && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">
                  {updateError}
                </p>
              </div>
            )}
          </div>
        }
        confirmText="Actualizează"
        cancelText="Anulează"
      />
    </>
  );
}
