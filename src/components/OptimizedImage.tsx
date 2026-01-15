"use client";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";
import React from "react";

type OptimizedImageProps = ImageProps & {
  className?: string;
};

function OptimizedImage({ className, alt, ...props }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = React.useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative  h-full w-full">
      {isLoading && (
        <div
          className={cn(
            "absolute h-full w-full inset-0 bg-neutral-800/80 skeleton",
            className
          )}
        />
      )}
      <Image
        alt={alt || ""}
        {...props}
        onLoad={handleImageLoad}
        onError={(e) => {
          e.currentTarget.src =
            "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg";
        }}
        className={cn(className)}
      />
    </div>
  );
}

export default OptimizedImage;