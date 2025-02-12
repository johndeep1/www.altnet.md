"use client";

import { useState } from "react";
import Image from "next/image";

// Add image loader helper
const imageLoader = ({ src }: { src: string }) => {
  // If it's already a full URL, return it
  if (src.startsWith("http")) {
    return src;
  }
  // If it's a relative path, assume it's from your public directory
  return `/${src.replace(/^\//, "")}`;
};

export function CategoryImage({
  src,
  alt,
  ...props
}: {
  src: string | null;
  alt: string;
  [key: string]: any;
}) {
  const [imgSrc, setImgSrc] = useState(src || "/images/default-category.jpg");
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}
      <Image
        src={imgSrc}
        alt={alt}
        loader={imageLoader}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setImgSrc("/images/default-category.jpg");
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}
