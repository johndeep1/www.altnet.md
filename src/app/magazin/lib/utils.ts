import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ro-MD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

export function getImageUrl(image: string | null | undefined): string {
  if (!image) return "/images/default-product.jpg";

  // If it's already a full URL, return it as is
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // If it's a relative path starting with /, return it as is
  if (image.startsWith("/")) {
    return image;
  }

  // Otherwise, assume it's a relative path and add /
  return `/${image}`;
}
