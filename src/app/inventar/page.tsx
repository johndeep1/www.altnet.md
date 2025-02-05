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

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="text-red-600 p-4 rounded-lg bg-red-50 border border-red-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-8">Panou de Control</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Total Produse
            </h3>
            <Package className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              produse în baza de date
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Stoc Limitat</h3>
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{stats.lowStockProducts}</div>
            <p className="text-xs text-muted-foreground">
              produse cu stoc sub 5 unități
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Stoc Epuizat</h3>
            <PackageOpen className="h-4 w-4 text-red-600" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{stats.outOfStockProducts}</div>
            <p className="text-xs text-muted-foreground">
              produse fără stoc disponibil
            </p>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Total Categorii
            </h3>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">{stats.totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              categorii de produse active
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Link
          href="/inventar/inventory"
          className="rounded-lg border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent"
        >
          <div className="p-6 flex flex-row items-center space-x-4">
            <Warehouse className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Inventar</h3>
              <p className="text-sm text-muted-foreground">
                Gestionează stocurile produselor
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/inventar/products"
          className="rounded-lg border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent"
        >
          <div className="p-6 flex flex-row items-center space-x-4">
            <Package className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Produse</h3>
              <p className="text-sm text-muted-foreground">
                Administrează catalogul de produse
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/inventar/categories"
          className="rounded-lg border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent"
        >
          <div className="p-6 flex flex-row items-center space-x-4">
            <FolderTree className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Categorii</h3>
              <p className="text-sm text-muted-foreground">
                Gestionează categoriile de produse
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/inventar/settings"
          className="rounded-lg border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent"
        >
          <div className="p-6 flex flex-row items-center space-x-4">
            <Settings className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold">Setări</h3>
              <p className="text-sm text-muted-foreground">
                Configurează preferințele aplicației
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
