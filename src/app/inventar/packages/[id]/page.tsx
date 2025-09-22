"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

interface FeatureInput {
  id: number;
  text: string;
  included: boolean;
  highlight: boolean;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function EditPackagePage() {
  const router = useRouter();
  const params = useParams();
  const planId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    subtitle: "",
    price: "",
    speed: "",
    gradient: "",
    isPopular: false,
    popularFeaturesRaw: "",
  });
  const [features, setFeatures] = useState<FeatureInput[]>([]);

  useEffect(() => {
    async function fetchPlan() {
      try {
        setLoading(true);
        if (!planId) {
          throw new Error("Identificatorul pachetului este invalid");
        }

        const response = await fetch(`/inventar/api/packages/${planId}`);
        if (!response.ok) {
          throw new Error("Pachetul nu a fost găsit");
        }
        const data = await response.json();
        setForm({
          title: data.title ?? "",
          slug: data.slug ?? "",
          subtitle: data.subtitle ?? "",
          price: data.price?.toString() ?? "",
          speed: data.speed ?? "",
          gradient: data.gradient ?? "",
          isPopular: Boolean(data.isPopular),
          popularFeaturesRaw: Array.isArray(data.popularFeatures)
            ? data.popularFeatures.join("\n")
            : "",
        });
        setFeatures(
          Array.isArray(data.features) && data.features.length
            ? data.features.map((feature: any, index: number) => ({
                id: Date.now() + index,
                text: feature.text ?? "",
                included: Boolean(feature.included),
                highlight: Boolean(feature.highlight),
              }))
            : [{ id: Date.now(), text: "", included: true, highlight: false }]
        );
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : "Nu am putut încărca pachetul."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPlan();
  }, [params.id]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    setForm((prev) => {
      const next = { ...prev, [name]: value } as typeof prev;
      if (name === "title" && !prev.slug) {
        next.slug = slugify(value);
      }
      return next;
    });
  };

  const updateFeature = (id: number, updates: Partial<FeatureInput>) => {
    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, ...updates } : feature
      )
    );
  };

  const addFeature = () => {
    setFeatures((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), text: "", included: true, highlight: false },
    ]);
  };

  const removeFeature = (id: number) => {
    setFeatures((prev) => prev.filter((feature) => feature.id !== id));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload: Record<string, unknown> = {
        title: form.title,
        slug: form.slug,
        subtitle: form.subtitle,
        price: Number(form.price),
        speed: form.speed,
        gradient: form.gradient,
        isPopular: form.isPopular,
        features: features
          .filter((feature) => feature.text.trim().length)
          .map((feature) => ({
            text: feature.text.trim(),
            included: feature.included,
            highlight: feature.highlight,
          })),
        popularFeatures: form.popularFeaturesRaw
          .split(/\r?\n/)
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (!planId) {
        throw new Error("Identificatorul pachetului este invalid");
      }

      const response = await fetch(`/inventar/api/packages/${planId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Nu am putut salva pachetul");
      }

      router.push("/inventar/packages");
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Actualizarea pachetului a eșuat."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Se încarcă...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link
              href="/inventar/packages"
              className="inline-flex items-center text-sm bg-gray-100 text-gray-900 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Înapoi la Pachete
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">Editează Pachet</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-8"
        >
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titlu
              </label>
              <input
                type="text"
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                required
                value={form.slug}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white/80"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtitlu
              </label>
              <input
                type="text"
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gradient (Tailwind)
              </label>
              <input
                type="text"
                name="gradient"
                value={form.gradient}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white/80"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preț (lei)
              </label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                required
                value={form.price}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white/80"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Viteză / Beneficiu principal
              </label>
              <input
                type="text"
                name="speed"
                required
                value={form.speed}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white/80"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="isPopular"
              type="checkbox"
              name="isPopular"
              checked={form.isPopular}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isPopular" className="text-sm text-gray-700">
              Marchează acest pachet ca popular
            </label>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Caracteristici</h2>
              <button
                type="button"
                onClick={addFeature}
                className="inline-flex items-center text-sm text-primary hover:text-primary-dark"
              >
                <Plus className="mr-2 h-4 w-4" /> Adaugă caracteristică
              </button>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className="rounded-xl border border-gray-200/60 bg-gray-50/60 p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">
                      Caracteristică #{index + 1}
                    </span>
                    {features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(feature.id)}
                        className="inline-flex items-center text-xs text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="mr-1 h-4 w-4" /> Elimină
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={feature.text}
                      onChange={(event) =>
                        updateFeature(feature.id, { text: event.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-gray-200/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white"
                    />
                    <div className="flex flex-wrap gap-4">
                      <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={feature.included}
                          onChange={(event) =>
                            updateFeature(feature.id, { included: event.target.checked })
                          }
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        Inclus în pachet
                      </label>
                      <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                        <input
                          type="checkbox"
                          checked={feature.highlight}
                          onChange={(event) =>
                            updateFeature(feature.id, { highlight: event.target.checked })
                          }
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        Evidențiat vizual
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Beneficii populare (unul pe linie)
            </label>
            <textarea
              name="popularFeaturesRaw"
              rows={3}
              value={form.popularFeaturesRaw}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-white/80"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Link
              href="/inventar/packages"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Anulează
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-gray-800 disabled:opacity-70"
            >
              {saving ? "Se salvează..." : "Salvează Modificările"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
