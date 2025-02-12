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

export function ProductImage({
  src,
  alt,
  ...props
}: {
  src: string;
  alt: string;
  [key: string]: any;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full bg-muted">
      {isLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}
      <Image
        src={imgSrc}
        alt={alt}
        loader={imageLoader}
        className="object-contain group-hover:scale-105 transition-transform duration-300"
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setImgSrc("/images/default-product.jpg");
          setIsLoading(false);
        }}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        quality={75}
        {...props}
      />
    </div>
  );
}
