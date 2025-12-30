import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import {
  PUBLIC_API_BASE_URL,
  safeBoolean,
  safeNumber,
  safeString,
} from "@/lib/backend-api";
import {
  mapPublicProductDetail,
  type StorefrontProductDetail,
} from "@/lib/catalog-mappers";
import { formatPrice } from "@/lib/utils";
import { ConsistentBackground } from "@/components/sections/HeroSection";
import { ProductImage } from "@/components/products/ProductImage";
import DescriptionSection from "./components/DescriptionSection";
import SpecificationsSection from "./components/SpecificationsSection";

type ProductProperty = {
  name: string;
  value: string;
  group: string;
};

type Promotion = {
  id: string;
  name: string;
  description: string;
  discountType: string;
  discountValue: number | null;
  startDate: string;
  endDate: string;
};

type ProductDetailView = StorefrontProductDetail & {
  slug: string;
  descriptionRo: string;
  descriptionRu: string;
  warranty: string;
  barcodes: string[];
  priceMdl: number | null;
  priceEur: number | null;
  priceUsd: number | null;
  priceMin: number | null;
  priceMax: number | null;
  discountedPriceMdl: number | null;
  discountedPriceEur: number | null;
  discountedPriceUsd: number | null;
  manualDiscountPercent: number | null;
  effectiveDiscountPercent: number | null;
  inStock: boolean;
  isActive: boolean;
  isService: boolean;
  totalStock: number | null;
  sourceName: string;
  createdAt: string;
  updatedAt: string;
  properties: ProductProperty[];
  promotions: Promotion[];
};

const formatDate = (value: string): string => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ro-MD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const parseProperties = (value: unknown): ProductProperty[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const record = entry as Record<string, unknown>;
      const name = safeString(record.property_name, "");
      const val = safeString(record.value, "");
      if (!name || !val) return null;
      return {
        name,
        value: val,
        group: safeString(record.group_name, "") || "Specificații",
      };
    })
    .filter((item): item is ProductProperty => Boolean(item));
};

const groupProperties = (properties: ProductProperty[]) => {
  return properties.reduce<Record<string, ProductProperty[]>>((acc, prop) => {
    const key = prop.group || "Specificații";
    if (!acc[key]) acc[key] = [];
    acc[key].push(prop);
    return acc;
  }, {});
};

const parsePromotions = (value: unknown): Promotion[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      if (!entry || typeof entry !== "object") return null;
      const record = entry as Record<string, unknown>;
      return {
        id: safeString(record.id, ""),
        name: safeString(record.name, ""),
        description: safeString(record.description, ""),
        discountType: safeString(record.discount_type, ""),
        discountValue: safeNumber(record.discount_value),
        startDate: safeString(record.start_date, ""),
        endDate: safeString(record.end_date, ""),
      };
    })
    .filter((item): item is Promotion => Boolean(item && item.id));
};

const parseBarcodes = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => (typeof entry === "string" ? entry : String(entry || "")))
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object";

const unwrapPayload = (payload: unknown): Record<string, unknown> | null => {
  if (!isRecord(payload)) return null;
  const data = payload.data;
  if (isRecord(data)) return data;
  return payload;
};

const fetchProduct = cache(
  async (identifier: string): Promise<ProductDetailView | null> => {
  try {
    const response = await fetch(`${PUBLIC_API_BASE_URL}/products/${identifier}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    const record = unwrapPayload(payload);
    if (!record) return null;

    const detail = mapPublicProductDetail(record);
    const properties = parseProperties(record.properties);
    const inStockFlag = safeBoolean(record.is_in_stock, detail.stock > 0);
    const isActive = safeBoolean(record.is_active, true);

    return {
      ...detail,
      slug: safeString(record.slug, detail.slug || detail.id),
      descriptionRo: safeString(record.description_ro, ""),
      descriptionRu: safeString(record.description_ru, ""),
      warranty: safeString(record.warranty, ""),
      barcodes: parseBarcodes(record.barcodes),
      priceMdl: safeNumber(record.price_mdl),
      priceEur: safeNumber(record.price_eur),
      priceUsd: safeNumber(record.price_usd),
      priceMin: safeNumber(record.price_min),
      priceMax: safeNumber(record.price_max),
      discountedPriceMdl: safeNumber(record.discounted_price_mdl),
      discountedPriceEur: safeNumber(record.discounted_price_eur),
      discountedPriceUsd: safeNumber(record.discounted_price_usd),
      manualDiscountPercent: safeNumber(record.manual_discount_percent),
      effectiveDiscountPercent: safeNumber(record.effective_discount_percent),
      inStock: inStockFlag,
      isActive,
      isService: safeBoolean(record.is_service, false),
      totalStock: safeNumber(record.total_stock),
      sourceName: safeString(record.source_name, ""),
      createdAt: safeString(record.created_at, detail.createdAt),
      updatedAt: safeString(record.updated_at, ""),
      properties,
      promotions: parsePromotions(record.active_promotions),
    };
  } catch (error) {
    console.error("Failed to load product", error);
    return null;
  }
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) {
    return {
      title: "Produs indisponibil - Altnet",
    };
  }

  return {
    title: `${product.name} - Altnet`,
    description: product.description || "Produs disponibil în oferta Altnet.",
    openGraph: {
      title: product.name,
      description: product.description || "Produs disponibil în oferta Altnet.",
      url: `/produse/${product.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProduct(slug);

  if (!product) {
    notFound();
  }

  const groupedProperties = groupProperties(product.properties);
  const displayPrice = product.discountedPriceMdl ?? product.priceMdl ?? product.price;
  const hasDiscount =
    Boolean(product.discountedPriceMdl) &&
    Boolean(product.priceMdl) &&
    product.discountedPriceMdl !== product.priceMdl;
  const primaryImage = product.images[0] || "/images/default-product.jpg";

  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      <ConsistentBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl overflow-hidden">
              <div className="relative aspect-[4/3] bg-white">
                <ProductImage
                  src={primaryImage}
                  alt={product.name}
                  className="object-contain"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3 p-4 bg-white/50 backdrop-blur-sm">
                  {product.images.slice(0, 4).map((image) => (
                    <div
                      key={image}
                      className="relative aspect-square rounded-xl overflow-hidden border-2 border-white/80 bg-white/90 hover:border-primary/30 transition-colors cursor-pointer"
                    >
                      <ProductImage src={image} alt={product.name} className="object-contain" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DescriptionSection
              description={product.description}
              descriptionRo={product.descriptionRo}
              descriptionRu={product.descriptionRu}
            />
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                {product.brand && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 backdrop-blur-sm text-primary font-medium">
                    {product.brand}
                  </span>
                )}
                {product.category?.name && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-gray-200/50 text-gray-600">
                    {product.category.name}
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-gray-600">{product.description}</p>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm ${
                    product.inStock
                      ? "bg-green-500/10 text-green-700 border border-green-500/20"
                      : "bg-red-500/10 text-red-700 border border-red-500/20"
                  }`}
                >
                  {product.inStock ? "În stoc" : "Stoc epuizat"}
                </span>
                {!product.isActive && (
                  <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium bg-white/60 backdrop-blur-sm border border-gray-200/50 text-gray-600">
                    Inactiv
                  </span>
                )}
                {product.isService && (
                  <span className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium bg-blue-500/10 backdrop-blur-sm text-blue-700 border border-blue-500/20">
                    Serviciu
                  </span>
                )}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl p-6 space-y-5">
              {/* Price Section */}
              <div className="text-center pb-4 border-b border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Preț recomandat</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-primary">
                    {displayPrice > 0 ? formatPrice(displayPrice) : "La cerere"}
                  </span>
                  {displayPrice > 0 && (
                    <span className="text-lg text-gray-500">MDL</span>
                  )}
                </div>
                {hasDiscount && product.priceMdl && (
                  <p className="text-sm text-gray-400 line-through mt-1">
                    {formatPrice(product.priceMdl)} MDL
                  </p>
                )}
              </div>

              {/* Stock & Warranty */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center border border-gray-100/50">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                    Stoc
                  </p>
                  <p className="font-semibold text-gray-900">
                    {product.totalStock ?? product.stock} buc.
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center border border-gray-100/50">
                  <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
                    Garanție
                  </p>
                  <p className="font-semibold text-gray-900">
                    {product.warranty || "—"}
                  </p>
                </div>
              </div>

              {/* SKU Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-500">SKU</span>
                  <span className="font-medium text-gray-900">{product.sku}</span>
                </div>
              </div>
            </div>

            {product.promotions.length > 0 && (
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-sm rounded-2xl border border-primary/20 shadow-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Promoții active
                </h2>
                <div className="space-y-3">
                  {product.promotions.map((promo) => (
                    <div key={promo.id} className="bg-white/80 rounded-xl border border-primary/10 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">{promo.name}</span>
                        {promo.discountValue !== null && (
                          <span className="px-3 py-1 rounded-full bg-primary text-white text-sm font-medium">
                            -{promo.discountValue}
                            {promo.discountType === "percent" ? "%" : " MDL"}
                          </span>
                        )}
                      </div>
                      {promo.description && (
                        <p className="mt-2 text-sm text-gray-600">{promo.description}</p>
                      )}
                      <p className="mt-2 text-xs text-gray-500">
                        {formatDate(promo.startDate)} - {formatDate(promo.endDate)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Barcodes section - only show if there are barcodes */}
            {product.barcodes.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Coduri de bare
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.barcodes.map((barcode) => (
                    <span
                      key={barcode}
                      className="px-3 py-1.5 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-200/50 text-gray-700 text-sm font-medium"
                    >
                      {barcode}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specifications Section - Full width */}
        <SpecificationsSection groupedProperties={groupedProperties} />
      </div>
    </main>
  );
}
