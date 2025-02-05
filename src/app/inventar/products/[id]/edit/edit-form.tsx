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
        if (product.specs?.socket) {
          setValue("socket", product.specs.socket);
        }

        // Set selected category
        setSelectedCategory(product.category.name);
        setImageUrls(product.images || []);
        // Only set specs if they exist and are not empty
        if (product.specs && Object.keys(product.specs).length > 0) {
          const specsWithoutSocket = { ...product.specs };
          delete specsWithoutSocket.socket; // Remove socket from specs as it's handled separately
          setSpecs(specsWithoutSocket);
        }
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
      // Only include specs if they exist and have entries
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
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <Link
          href="/inventar/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </div>

      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">Edit Product</h1>

        {error && (
          <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Nume</label>
              <input
                {...register("name")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Product name"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Descriere
              </label>
              <textarea
                {...register("description")}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Product description"
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Preț</label>
                <input
                  {...register("price")}
                  type="number"
                  step="0.01"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Stoc</label>
                <input
                  {...register("stock")}
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="text-sm text-red-500">{errors.stock.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Status</label>
              <select
                {...register("status")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="ACTIVE">Activ</option>
                <option value="OUTOFSTOCK">Stock epuizat</option>
                <option value="COMINGSOON">In curand</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">
                Categorie
              </label>
              <select
                {...register("categoryId")}
                onChange={(e) => {
                  const category = categories.find(
                    (c) => c.id === e.target.value
                  );
                  setSelectedCategory(category?.name || "");
                }}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className="text-sm text-red-500">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            {isCPU && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Socket
                  </label>
                  <input
                    {...register("socket")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="CPU Socket (e.g., AM4, LGA1700)"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">
                    SKU
                  </label>
                  <input
                    {...register("sku")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="SKU"
                  />
                  {errors.sku && (
                    <p className="text-sm text-red-500">{errors.sku.message}</p>
                  )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Brand</label>
              <input
                {...register("brand")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Brand name"
              />
              {errors.brand && (
                <p className="text-sm text-red-500">{errors.brand.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none">Model</label>
              <input
                {...register("model")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Model number"
              />
              {errors.model && (
                <p className="text-sm text-red-500">{errors.model.message}</p>
              )}
            </div>

            {imageManagementSection}

            <div className="space-y-4">
              <label className="text-sm font-medium leading-none">
                Specificatii
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSpecKey}
                  onChange={(e) => setNewSpecKey(e.target.value)}
                  className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Specification name"
                />
                <input
                  type="text"
                  value={newSpecValue}
                  onChange={(e) => setNewSpecValue(e.target.value)}
                  className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  placeholder="Specification value"
                />
                <button
                  type="button"
                  onClick={handleAddSpec}
                  className="h-10 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
                >
                  Adauga
                </button>
              </div>
              <div className="space-y-2">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={key}
                      readOnly
                      className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      value={value}
                      readOnly
                      className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(key)}
                      className="h-10 px-4 py-2 bg-destructive text-destructive-foreground rounded-md text-sm font-medium"
                    >
                      Sterge
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/inventar/products"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input hover:bg-accent hover:text-accent-foreground h-10 px-4"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>

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
          <div className="flex justify-center">
            <img
              src={previewImage || ""}
              alt="Preview"
              className="max-w-full max-h-[500px] object-contain"
            />
          </div>
        }
        confirmText="Închide"
      />
    </div>
  );
}
