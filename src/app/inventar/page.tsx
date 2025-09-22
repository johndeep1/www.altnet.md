"use client";

import {
  Package,
  PackageOpen,
  AlertTriangle,
  Settings,
  FolderTree,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import InventarHeader from "./header";

type DashboardStats = {
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  totalCategories: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    totalCategories: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        // Fetch products
        const productsResponse = await fetch("/inventar/api/products");
        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const products = await productsResponse.json();

        // Fetch categories
        const categoriesResponse = await fetch("/inventar/api/categories");
        if (!categoriesResponse.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categories = await categoriesResponse.json();

        // Calculate stats
        const lowStockProducts = products.filter(
          (product: any) => product.stock > 0 && product.stock < 5
        ).length;
        const outOfStockProducts = products.filter(
          (product: any) => product.stock === 0
        ).length;

        setStats({
          totalProducts: products.length,
          lowStockProducts,
          outOfStockProducts,
          totalCategories: categories.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <InventarHeader />
        <div className="flex items-center justify-center min-h-[calc(100vh-73px)]">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <InventarHeader />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white ">
      <InventarHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Panou de Control</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Total Produse
              </h3>
              <Package className="h-4 w-4 text-gray-400" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-gray-900">{stats.totalProducts}</div>
              <p className="text-xs text-gray-500">
                produse în baza de date
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-gray-600">Stoc Limitat</h3>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-gray-900">{stats.lowStockProducts}</div>
              <p className="text-xs text-gray-500">
                produse cu stoc sub 5 unități
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-gray-600">Stoc Epuizat</h3>
              <PackageOpen className="h-4 w-4 text-red-600" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-gray-900">{stats.outOfStockProducts}</div>
              <p className="text-xs text-gray-500">
                produse fără stoc disponibil
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="text-sm font-medium text-gray-600">
                Total Categorii
              </h3>
              <FolderTree className="h-4 w-4 text-gray-400" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold text-gray-900">{stats.totalCategories}</div>
              <p className="text-xs text-gray-500">
                categorii de produse active
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          <Link
            href="/inventar/inventory"
            className="group rounded-xl border border-gray-200 bg-white shadow-sm p-6 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex flex-row items-center space-x-4">
              <div className="rounded-lg bg-gray-100 p-2 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-200">
                <Warehouse className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Inventar</h3>
                <p className="text-sm text-gray-500">
                  Gestionează stocurile produselor
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/inventar/products"
            className="group rounded-xl border border-gray-200 bg-white shadow-sm p-6 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex flex-row items-center space-x-4">
              <div className="rounded-lg bg-gray-100 p-2 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-200">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Produse</h3>
                <p className="text-sm text-gray-500">
                  Administrează catalogul de produse
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/inventar/packages"
            className="group rounded-xl border border-gray-200 bg-white shadow-sm p-6 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex flex-row items-center space-x-4">
              <div className="rounded-lg bg-gray-100 p-2 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-200">
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Pachete</h3>
                <p className="text-sm text-gray-500">
                  Configurează pachetele pentru pagina principală
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/inventar/categories"
            className="group rounded-xl border border-gray-200 bg-white shadow-sm p-6 transition-all duration-200 hover:shadow-md"
          >
            <div className="flex flex-row items-center space-x-4">
              <div className="rounded-lg bg-gray-100 p-2 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-200">
                <FolderTree className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Categorii</h3>
                <p className="text-sm text-gray-500">
                  Gestionează categoriile de produse
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
