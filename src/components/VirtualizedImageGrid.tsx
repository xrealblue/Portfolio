'use client';

import React from 'react';
import { useImageIntersection } from '@/hooks/useImageIntersection';
import OptimizedImage from './Image';
import { cn } from '@/lib/utils';
import { shouldLoadWithPriority, getImageQuality } from '@/lib/imageUtils';

interface VirtualizedImageGridProps {
  images: string[];
  title: string;
  gridCols: string;
  isFirstPost?: boolean;
}

const VirtualizedImageGrid: React.FC<VirtualizedImageGridProps> = ({
  images,
  title,
  gridCols,
  isFirstPost = false,
}) => {
  const { ref, isIntersecting, hasIntersected } = useImageIntersection({
    rootMargin: '400px 0px',
    threshold: 0.1,
  });

  const shouldRenderImages = isIntersecting || hasIntersected;

  if (!images || images.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">
        No images available for this post
      </p>
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        'grid',
        gridCols,
        'transition-opacity duration-300',
        !shouldRenderImages && 'opacity-0'
      )}
      style={{
        gap: 'clamp(0.75rem, 0.75vw, 240rem)',
      }}
    >
      {shouldRenderImages &&
        images.map((image: string, index: number) => (
          <div
            key={index}
            className="overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <OptimizedImage
              width={400}
              height={400}
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className="w-full h-auto aspect-[3/4] object-cover"
              priority={shouldLoadWithPriority(index, isFirstPost)}
              loading={shouldLoadWithPriority(index, isFirstPost) ? 'eager' : 'lazy'}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={getImageQuality(index, isFirstPost)}
            />
          </div>
        ))}
    </div>
  );
};

export default VirtualizedImageGrid;