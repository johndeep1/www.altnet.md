"use client";

import { useState } from "react";
import Image from "next/image";

const imageLoader = ({ src }: { src: string }) => {
  if (src.startsWith("http")) {
    return src;
  }
  return `/${src.replace(/^\//, "")}`;
};

type ProductImageProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ProductImage({ src, alt, className }: ProductImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full bg-gray-50">
      {isLoading && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
      <Image
        src={imgSrc}
        alt={alt}
        loader={imageLoader}
        className={className}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setImgSrc("/images/default-product.jpg");
          setIsLoading(false);
        }}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        quality={75}
      />
    </div>
  );
}
