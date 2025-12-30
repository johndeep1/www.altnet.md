export type ProductStatus = "ACTIVE" | "OUTOFSTOCK" | "DISCONTINUED" | "COMINGSOON";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  categoryId: string;
  brand: string;
  model: string | null;
  specs: Record<string, string | number> | null;
  images: string[];
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

const timestamps = {
  recent: "2024-08-20T10:00:00Z",
  mid: "2024-07-10T10:00:00Z",
  old: "2024-06-01T10:00:00Z",
};

const categories: Category[] = [
  {
    id: "routers",
    name: "Routere",
    description: "Routere si echipamente Wi-Fi pentru casa.",
    image: "images/default-category.jpg",
    createdAt: timestamps.old,
    updatedAt: timestamps.recent,
  },
  {
    id: "tv",
    name: "TV si Media",
    description: "Echipamente pentru televiziune digitala.",
    image: "images/default-category.jpg",
    createdAt: timestamps.mid,
    updatedAt: timestamps.recent,
  },
  {
    id: "accessories",
    name: "Accesorii",
    description: "Accesorii pentru instalari rapide si curate.",
    image: "images/default-category.jpg",
    createdAt: timestamps.old,
    updatedAt: timestamps.mid,
  },
];

const products: Product[] = [
  {
    id: "router-ax1500",
    name: "Router Wi-Fi 6 AX1500",
    description: "Router dual-band pentru apartamente si case mici.",
    price: 1299,
    sku: "RTR-AX1500",
    stock: 12,
    categoryId: "routers",
    brand: "Altnet",
    model: "AX1500",
    specs: {
      speed: "1500 Mbps",
      ports: "4x LAN",
    },
    images: ["/images/default-product.jpg"],
    status: "ACTIVE",
    createdAt: timestamps.old,
    updatedAt: timestamps.recent,
  },
  {
    id: "tv-box-4k",
    name: "TV Box 4K",
    description: "Receiver 4K pentru televiziune digitala si streaming.",
    price: 899,
    sku: "TVB-4K",
    stock: 4,
    categoryId: "tv",
    brand: "Altnet",
    model: "Ultra 4K",
    specs: {
      resolution: "4K",
      storage: "8GB",
    },
    images: ["/images/default-product.jpg"],
    status: "ACTIVE",
    createdAt: timestamps.mid,
    updatedAt: timestamps.mid,
  },
  {
    id: "fiber-kit",
    name: "Kit cablu fibra",
    description: "Kit pentru instalare fibra cu conectori rapizi.",
    price: 199,
    sku: "FBR-KIT",
    stock: 0,
    categoryId: "accessories",
    brand: "Altnet",
    model: null,
    specs: {
      length: "15m",
    },
    images: ["/images/default-product.jpg"],
    status: "OUTOFSTOCK",
    createdAt: timestamps.old,
    updatedAt: timestamps.old,
  },
];

const categoryById = new Map(categories.map((category) => [category.id, category]));

const withCategory = (product: Product) => {
  const category = categoryById.get(product.categoryId);
  return {
    ...product,
    category: category
      ? {
          id: category.id,
          name: category.name,
        }
      : {
          id: "",
          name: "",
        },
  };
};

export const getCategories = () => categories;

export const getCategoriesForStorefront = () =>
  categories.map((category) => ({
    ...category,
    products: products
      .filter((product) => product.categoryId === category.id)
      .map((product) => ({ id: product.id })),
  }));

export const getCategoriesForAdmin = () =>
  categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    _count: {
      products: products.filter((product) => product.categoryId === category.id)
        .length,
    },
  }));

export const getCategoryWithProducts = (id: string) => {
  const category = categoryById.get(id);
  if (!category) return null;

  const categoryProducts = products
    .filter((product) => product.categoryId === id)
    .map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images,
      stock: product.stock,
      createdAt: product.createdAt,
    }));

  return {
    ...category,
    products: categoryProducts,
  };
};

export const getProductsForAdmin = () => products.map(withCategory);

export const getProductWithCategory = (id: string) => {
  const product = products.find((item) => item.id === id);
  if (!product) return null;
  return withCategory(product);
};

export const getRecentProducts = (limit = 8) => {
  return [...products]
    .filter((product) => product.status === "ACTIVE")
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, limit)
    .map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images,
      stock: product.stock,
      updatedAt: product.updatedAt,
      category: categoryById.has(product.categoryId)
        ? {
            id: product.categoryId,
            name: categoryById.get(product.categoryId)?.name ?? "",
          }
        : undefined,
    }));
};

export const getProductCount = () => products.length;

export const getStockByIds = (productIds: string[]) =>
  products
    .filter((product) => productIds.includes(product.id))
    .map((product) => ({
      id: product.id,
      stock: product.stock,
    }));

export const searchProducts = (query: string) => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return products
    .filter((product) => product.status === "ACTIVE")
    .filter((product) => {
      const haystack = `${product.name} ${product.description}`.toLowerCase();
      return haystack.includes(normalized);
    })
    .slice(0, 5)
    .map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images,
    }));
};

export const getProductsForCategory = (categoryId: string) =>
  products.filter((product) => product.categoryId === categoryId);

export const getCategoryById = (id: string) => categoryById.get(id) ?? null;
