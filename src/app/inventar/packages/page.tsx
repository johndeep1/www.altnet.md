"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  ArrowLeft,
  Pencil,
  Trash2,
  Sparkle,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";

interface AdminPackagePlan {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  price: string;
  speed: string;
  gradient: string;
  isPopular: boolean;
  updatedAt: string;
}

export default function PackagesAdminPage() {
  const [plans, setPlans] = useState<AdminPackagePlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminPackagePlan | null>(null);

  const canCreate = plans.length < 3;

  useEffect(() => {
    async function fetchPackages() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/inventar/api/packages");
        if (!response.ok) {
          throw new Error("Eroare la încărcarea pachetelor");
        }
        const data = await response.json();
        setPlans(
          data.map((plan: any) => ({
            ...plan,
            price: plan.price?.toString() ?? "0",
          }))
        );
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error
            ? err.message
            : "Nu am putut încărca lista de pachete."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  const popularId = useMemo(
    () => plans.find((plan) => plan.isPopular)?.id ?? null,
    [plans]
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      const response = await fetch(`/inventar/api/packages/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Nu am putut șterge pachetul");
      }

      setPlans((prev) => prev.filter((plan) => plan.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Ștergerea pachetului a eșuat."
      );
    }
  };

  const setPopular = async (id: string) => {
    try {
      const response = await fetch(`/inventar/api/packages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPopular: true }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Nu am putut actualiza pachetul");
      }

      setPlans((prev) =>
        prev.map((plan) => ({
          ...plan,
          isPopular: plan.id === id,
        }))
      );
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Actualizarea popularității a eșuat."
      );
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Se încarcă...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link
              href="/inventar"
              className="inline-flex items-center text-sm bg-gray-100 text-gray-900 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Înapoi la Panou
            </Link>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
              <h1 className="text-2xl font-semibold text-gray-900">Pachete</h1>
            </div>
            <Link
              href={canCreate ? "/inventar/packages/new" : "#"}
              className={`inline-flex items-center justify-center rounded-lg text-sm font-medium h-10 px-4 py-2 shadow-sm transition-colors duration-200 ${
                canCreate
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              aria-disabled={!canCreate}
              onClick={(event) => {
                if (!canCreate) event.preventDefault();
              }}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Adaugă Pachet
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b bg-gray-50/50">
                  <th className="h-12 px-4 text-left font-medium text-gray-500">Pachet</th>
                  <th className="h-12 px-4 text-left font-medium text-gray-500">Preț</th>
                  <th className="h-12 px-4 text-left font-medium text-gray-500">Viteză</th>
                  <th className="h-12 px-4 text-left font-medium text-gray-500">Slug</th>
                  <th className="h-12 px-4 text-left font-medium text-gray-500">Popular</th>
                  <th className="h-12 px-4 text-left font-medium text-gray-500">Actualizat</th>
                  <th className="h-12 px-4 text-left font-medium text-gray-500">Acțiuni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {plans.map((plan) => (
                  <tr key={plan.id} className="transition-colors hover:bg-gray-50/50">
                    <td className="p-4 align-middle">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{plan.title}</span>
                        {plan.subtitle && (
                          <span className="text-xs text-gray-500">{plan.subtitle}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-middle text-gray-900">{plan.price} lei</td>
                    <td className="p-4 align-middle text-gray-600">{plan.speed}</td>
                    <td className="p-4 align-middle text-gray-500">{plan.slug}</td>
                    <td className="p-4 align-middle">
                      {plan.isPopular ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-medium">
                          <Sparkle className="h-3 w-3" /> Popular
                        </span>
                      ) : (
                        <button
                          onClick={() => setPopular(plan.id)}
                          className="text-xs font-medium text-primary hover:text-primary-dark"
                          type="button"
                          disabled={popularId === plan.id}
                        >
                          Setează popular
                        </button>
                      )}
                    </td>
                    <td className="p-4 align-middle text-gray-500">
                      {new Intl.DateTimeFormat("ro-RO", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(plan.updatedAt))}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/inventar/packages/${plan.id}`}
                          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                        >
                          <Pencil className="mr-1 h-4 w-4" /> Editează
                        </Link>
                        <button
                          onClick={() => setDeleteTarget(plan)}
                          className="inline-flex items-center text-sm text-red-600 hover:text-red-700"
                          type="button"
                        >
                          <Trash2 className="mr-1 h-4 w-4" /> Șterge
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
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Confirmă ștergerea"
        description={`Ești sigur că vrei să ștergi pachetul "${deleteTarget?.title}"?`}
        primaryAction={{
          label: "Șterge",
          destructive: true,
          onClick: handleDelete,
        }}
        secondaryAction={{
          label: "Anulează",
          onClick: () => setDeleteTarget(null),
        }}
      />
    </div>
  );
}
