"use client";

import Link from "next/link";
import { ArrowLeft, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  sku: z.string().optional(),
  stock: z.string().min(1, "Stock is required"),
  categoryId: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().optional(),
  socket: z.string().optional(),
  images: z.array(z.string()).optional(),
  specs: z.record(z.string()).optional(),
  status: z
    .enum(["ACTIVE", "OUTOFSTOCK", "DISCONTINUED", "COMINGSOON"])
    .optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface EditProductFormProps {
  productId: string;
}

export default function EditProductForm({ productId }: EditProductFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [specs, setSpecs] = useState<Record<string, string>>({});
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const categoryId = watch("categoryId");

  // Fetch product data
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/inventar/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const product = await response.json();

        // Set form values
        setValue("name", product.name);
        setValue("description", product.description);
        setValue("price", product.price.toString());
        setValue("stock", product.stock.toString());
        setValue("categoryId", product.categoryId);
        setValue("brand", product.brand);
        setValue("model", product.model || "");
        setValue("sku", product.sku || "");
        setValue("status", product.status);

        // Handle specs properly
        if (product.specs) {
          if (typeof product.specs === "string") {
            try {
              const parsedSpecs = JSON.parse(product.specs);
              if (parsedSpecs.socket) {
                setValue("socket", parsedSpecs.socket);
                delete parsedSpecs.socket;
              }
              setSpecs(parsedSpecs);
            } catch (e) {
              console.error("Error parsing specs:", e);
              setSpecs({});
            }
          } else {
            // Handle specs as object
            if (product.specs.socket) {
              setValue("socket", product.specs.socket);
              const { socket, ...otherSpecs } = product.specs;
              setSpecs(otherSpecs);
            } else {
              setSpecs(product.specs);
            }
          }
        } else {
          setSpecs({});
        }

        // Set selected category
        setSelectedCategory(product.category.name);
        setImageUrls(product.images || []);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product");
      }
    }
    fetchProduct();
  }, [productId, setValue]);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/inventar/api/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleAddImage = () => {
    if (newImageUrl && !imageUrls.includes(newImageUrl)) {
      setImageUrls([...imageUrls, newImageUrl]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (url: string) => {
    setImageUrls(imageUrls.filter((imageUrl) => imageUrl !== url));
  };

  const handleAddSpec = () => {
    if (newSpecKey && newSpecValue) {
      setSpecs({ ...specs, [newSpecKey]: newSpecValue });
      setNewSpecKey("");
      setNewSpecValue("");
    }
  };

  const handleRemoveSpec = (key: string) => {
    const newSpecs = { ...specs };
    delete newSpecs[key];
    setSpecs(newSpecs);
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      // Prepare specs for submission
      const specsToSubmit =
        Object.keys(specs).length > 0
          ? selectedCategory === "CPU"
            ? { ...specs, socket: data.socket }
            : specs
          : null;

      const response = await fetch(`/inventar/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          price: Number(data.price),
          stock: Number(data.stock),
          specs: specsToSubmit,
          images: imageUrls,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update product");
      }

      router.push("/inventar/products");
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    }
  };

  const selectedCategoryName = categories.find(
    (c) => c.id === categoryId
  )?.name;
  const isCPU = selectedCategoryName === "CPU";

  const imageManagementSection = (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">
          Imagini Produs
        </label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter image URL"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4"
          >
            Adaugă
          </button>
        </div>
      </div>

      {imageUrls.length > 0 && (
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none">
            Imagini Existente
          </label>
          <div className="space-y-2">
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border p-2"
              >
                <span className="truncate max-w-[300px] text-sm">{url}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(url);
                      setIsPreviewModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(url)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-8 px-3"
                  >
                    Șterge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/inventar/products"
                className="inline-flex items-center text-sm bg-gray-100 text-gray-900 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Înapoi la Produse
              </Link>
              <h1 className="text-2xl font-semibold text-gray-900">
                Editare Produs
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Informații de Bază
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Nume Produs
                      </label>
                      <input
                        {...register("name")}
                        type="text"
                        className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-600">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Descriere
                      </label>
                      <textarea
                        {...register("description")}
                        rows={4}
                        className="flex w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                      />
                      {errors.description && (
                        <p className="text-sm text-red-600">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pricing and Stock */}
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Preț și Stoc
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Preț (MDL)
                      </label>
                      <input
                        {...register("price")}
                        type="number"
                        step="0.01"
                        className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                      />
                      {errors.price && (
                        <p className="text-sm text-red-600">{errors.price.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Stoc
                      </label>
                      <input
                        {...register("stock")}
                        type="number"
                        className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                      />
                      {errors.stock && (
                        <p className="text-sm text-red-600">{errors.stock.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Detalii Adiționale
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Brand
                      </label>
                      <input
                        {...register("brand")}
                        type="text"
                        className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                      />
                      {errors.brand && (
                        <p className="text-sm text-red-600">{errors.brand.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Model
                      </label>
                      <input
                        {...register("model")}
                        type="text"
                        className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        SKU
                      </label>
                      <input
                        {...register("sku")}
                        type="text"
                        className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Categorie
                      </label>
                      <select
                        {...register("categoryId")}
                        className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                      >
                        <option value="">Selectează categoria</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {errors.categoryId && (
                        <p className="text-sm text-red-600">
                          {errors.categoryId.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Images Section */}
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Imagini Produs
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Adaugă Imagine
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="url"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                          placeholder="URL imagine"
                        />
                        <button
                          type="button"
                          onClick={handleAddImage}
                          className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 transition-colors duration-200"
                        >
                          Adaugă
                        </button>
                      </div>
                    </div>

                    {imageUrls.length > 0 && (
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">
                          Imagini Existente
                        </label>
                        <div className="space-y-2">
                          {imageUrls.map((url, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between rounded-lg border border-gray-200 p-3 bg-white"
                            >
                              <span className="truncate max-w-[300px] text-sm text-gray-600">
                                {url}
                              </span>
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setPreviewImage(url);
                                    setIsPreviewModalOpen(true);
                                  }}
                                  className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 transition-colors duration-200"
                                >
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(url)}
                                  className="inline-flex items-center justify-center rounded-lg p-2 text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                                >
                                  <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Specifications Section */}
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Specificații
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Adaugă Specificație
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={newSpecKey}
                          onChange={(e) => setNewSpecKey(e.target.value)}
                          className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                          placeholder="Nume specificație"
                        />
                        <div className="flex gap-3">
                          <input
                            type="text"
                            value={newSpecValue}
                            onChange={(e) => setNewSpecValue(e.target.value)}
                            className="flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                            placeholder="Valoare"
                          />
                          <button
                            type="button"
                            onClick={handleAddSpec}
                            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 transition-colors duration-200"
                          >
                            Adaugă
                          </button>
                        </div>
                      </div>
                    </div>

                    {Object.keys(specs).length > 0 && (
                      <div className="space-y-3">
                        <label className="text-sm font-medium text-gray-700">
                          Specificații Existente
                        </label>
                        <div className="space-y-2">
                          {Object.entries(specs).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex items-center justify-between rounded-lg border border-gray-200 p-3 bg-white"
                            >
                              <div className="space-y-1">
                                <p className="text-sm font-medium text-gray-900">
                                  {key}
                                </p>
                                <p className="text-sm text-gray-600">{value}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveSpec(key)}
                                className="inline-flex items-center justify-center rounded-lg p-2 text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex justify-end gap-3">
                  <Link
                    href="/inventar/products"
                    className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Anulează
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Salvează Modificările
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Image Preview Modal */}
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={() => {
          setIsPreviewModalOpen(false);
          setPreviewImage(null);
        }}
        onConfirm={() => {
          setIsPreviewModalOpen(false);
          setPreviewImage(null);
        }}
        title="Previzualizare Imagine"
        message={
          previewImage && (
            <div className="relative w-full h-[400px]">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          )
        }
        confirmText="Închide"
        cancelText="Anulează"
      />
    </div>
  );
}
