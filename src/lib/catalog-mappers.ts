import {
  pickFirstNumber,
  safeBoolean,
  safeNumber,
  safeString,
  safeStringArray,
} from "@/lib/backend-api";

export type ProductStatus =
  | "ACTIVE"
  | "OUTOFSTOCK"
  | "DISCONTINUED"
  | "COMINGSOON";

export interface StorefrontCategory {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  productCount: number;
}

export interface StorefrontProductSummary {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  createdAt: string;
}

export interface StorefrontProductDetail extends StorefrontProductSummary {
  sku: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  brand: string;
  model: string | null;
  specs: Record<string, string> | null;
  status: ProductStatus;
}

export interface AdminCategory {
  id: string;
  name: string;
  description: string | null;
  _count: {
    products: number;
  };
}

export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: ProductStatus;
  category: {
    name: string;
  };
}

const getProductImages = (record: Record<string, unknown>): string[] => {
  const mainImage = safeString(record.main_image_url, "");
  const images = safeStringArray(record.images);
  const combined = [mainImage, ...images].filter((item) => item.length > 0);
  return Array.from(new Set(combined));
};

const getPriceFromPrices = (value: unknown): number | null => {
  if (!Array.isArray(value)) return null;

  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const record = entry as Record<string, unknown>;
    const candidate = pickFirstNumber(
      record.amount_mdl,
      record.price_mdl,
      record.amount,
      record.value
    );
    if (candidate !== null) return candidate;
  }

  return null;
};

const getProductPrice = (record: Record<string, unknown>): number => {
  const price = pickFirstNumber(
    record.discounted_price_mdl,
    record.price_mdl,
    getPriceFromPrices(record.prices),
    record.price_min,
    record.price_max
  );

  return price ?? 0;
};

const getProductStock = (record: Record<string, unknown>): number => {
  const stock = safeNumber(record.total_stock);
  if (stock !== null) return Math.max(0, stock);

  return safeBoolean(record.is_in_stock) ? 1 : 0;
};

const getProductStatus = (record: Record<string, unknown>, stock: number): ProductStatus => {
  const isActive = safeBoolean(record.is_active, true);
  if (!isActive) return "DISCONTINUED";
  return stock > 0 ? "ACTIVE" : "OUTOFSTOCK";
};

const getCreatedAt = (record: Record<string, unknown>): string => {
  return (
    safeString(record.created_at, "") ||
    safeString(record.updated_at, "") ||
    new Date().toISOString()
  );
};

export const mapPublicCategory = (record: Record<string, unknown>): StorefrontCategory => {
  const description = safeString(record.description, "");

  return {
    id: safeString(record.id, ""),
    name: safeString(record.name, ""),
    description: description.length > 0 ? description : null,
    image: safeString(record.image_url, "") || null,
    productCount: safeNumber(record.product_count) ?? 0,
  };
};

export const mapPublicProductSummary = (
  record: Record<string, unknown>
): StorefrontProductSummary => {
  const stock = getProductStock(record);

  return {
    id: safeString(record.id, ""),
    name: safeString(record.name, ""),
    description: safeString(record.description, ""),
    price: getProductPrice(record),
    images: getProductImages(record),
    stock,
    createdAt: getCreatedAt(record),
  };
};

export const mapPublicProductDetail = (
  record: Record<string, unknown>
): StorefrontProductDetail => {
  const stock = getProductStock(record);
  const categoryRecord =
    record.category && typeof record.category === "object"
      ? (record.category as Record<string, unknown>)
      : null;
  const categoryId =
    safeString(record.category_id, "") ||
    (categoryRecord ? safeString(categoryRecord.id, "") : "");
  const categoryName =
    safeString(record.category_name, "") ||
    (categoryRecord ? safeString(categoryRecord.name, "") : "");

  const specs = Array.isArray(record.properties)
    ? record.properties.reduce<Record<string, string>>((acc, item) => {
        if (!item || typeof item !== "object") return acc;
        const property = item as Record<string, unknown>;
        const key = safeString(property.property_name, "");
        const value = safeString(property.value, "");
        if (key && value) {
          acc[key] = value;
        }
        return acc;
      }, {})
    : null;

  return {
    id: safeString(record.id, ""),
    name: safeString(record.name, ""),
    description: safeString(record.description, ""),
    price: getProductPrice(record),
    images: getProductImages(record),
    stock,
    createdAt: getCreatedAt(record),
    sku:
      safeString(record.code, "") ||
      safeString(record.article, "") ||
      safeString(record.ultra_id, "") ||
      safeString(record.id, ""),
    categoryId,
    category: {
      id: categoryId,
      name: categoryName,
    },
    brand:
      safeString(record.brand_name, "") ||
      (record.brand && typeof record.brand === "object"
        ? safeString((record.brand as Record<string, unknown>).name, "")
        : "") ||
      safeString(record.source_name, ""),
    model: safeString(record.model, "") || null,
    specs: specs && Object.keys(specs).length > 0 ? specs : null,
    status: getProductStatus(record, stock),
  };
};

export const mapAdminCategory = (record: Record<string, unknown>): AdminCategory => {
  const description = safeString(record.description, "");
  return {
    id: safeString(record.id, ""),
    name: safeString(record.name, ""),
    description: description.length > 0 ? description : null,
    _count: {
      products: safeNumber(record.product_count) ?? 0,
    },
  };
};

export const mapAdminProduct = (record: Record<string, unknown>): AdminProduct => {
  const stock = getProductStock(record);
  const categoryName =
    safeString(record.category_name, "") ||
    (record.category && typeof record.category === "object"
      ? safeString((record.category as Record<string, unknown>).name, "")
      : "");

  return {
    id: safeString(record.id, ""),
    name: safeString(record.name, ""),
    price: getProductPrice(record),
    stock,
    status: getProductStatus(record, stock),
    category: {
      name: categoryName,
    },
  };
};
