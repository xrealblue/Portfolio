'use client';

import OptimizedImage from '@/components/Image';
import { useImageIntersection } from '@/hooks/useImageIntersection';
import { useOptimizedDataFetch } from '@/hooks/useOptimizedDataFetch';
import { useSmoothScroll } from '@/context/SmoothScrollProvider';
import React, { useRef, useEffect, useState, useCallback } from 'react'

const base_url = process.env.NEXT_PUBLIC_BASE_URL

interface Post {
  _id: string;
  title: string;
  startDate: string;
  endDate?: string;
  images: string[];
}

interface PostWithDateInfo extends Post {
  year: number;
  month: number;
  day: number;
}

interface YearGroup {
  year: number;
  posts: PostWithDateInfo[];
}

// LazyImage component with intersection observer
const LazyImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  index: number;
}> = ({ src, alt, className, index }) => {
  const { ref, hasIntersected } = useImageIntersection({
    rootMargin: '100px 0px',
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}
    >
      {hasIntersected ? (
        <OptimizedImage
          width={400}
          height={400}
          src={src}
          alt={alt}
          className="w-full h-auto aspect-[3/4] object-cover"
          loading={index < 6 ? "eager" : "lazy"} // Load first 6 images eagerly
          priority={index < 2} // Prioritize first 2 images
        />
      ) : (
        <div className="w-full aspect-[3/4] bg-neutral-800/80 animate-pulse" />
      )}
    </div>
  );
};

const formatTitle = (title: string): string => {
  return title.length > 35 ? title.slice(0, 35) + '...' : title;
};

const formatDate = (date: Date) => {
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const day = date.getDate();
  const month = months[date.getMonth()];

  return `${day} ${month}`;
};

const formatDateRange = (startDate: string, endDate?: string) => {
  const start = new Date(startDate);
  const year = start.getFullYear();

  if (!endDate) {
    return `${formatDate(start)} ${year}`;
  }

  const end = new Date(endDate);
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  if (startYear === endYear) {
    return `${formatDate(start)} - ${formatDate(end)} ${year}`;
  } else {
    return `${formatDate(start)} ${startYear} - ${formatDate(end)} ${endYear}`;
  }
};

const groupPostsByYear = (posts: Post[]): YearGroup[] => {
  const grouped = posts.reduce((acc, post) => {
    const startDate = new Date(post.startDate);
    const year = startDate.getFullYear();
    const month = startDate.getMonth();
    const day = startDate.getDate();

    if (!acc[year]) {
      acc[year] = [];
    }

    const postWithDateInfo: PostWithDateInfo = {
      ...post,
      year,
      month,
      day
    };

    acc[year].push(postWithDateInfo);
    return acc;
  }, {} as Record<number, PostWithDateInfo[]>);

  return Object.entries(grouped)
    .map(([year, posts]) => ({
      year: parseInt(year),
      posts: posts.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    }))
    .sort((a, b) => b.year - a.year);
};

// Sort function for posts
const sortPostsByDate = (a: Post, b: Post) => {
  const dateA = new Date(a.startDate);
  const dateB = new Date(b.startDate);
  return dateB.getTime() - dateA.getTime();
};

const GalleryPage = () => {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null);
  const postRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const activePostIdRef = useRef<string | null>(null);
  const { scrollTo: lenisScrollTo } = useSmoothScroll();

  // Use the optimized data fetch hook
  const { data, loading, error } = useOptimizedDataFetch<Post[]>({
    url: `${base_url}/data`,
    initialData: [],
    headers: {
      'Connection': 'keep-alive',
      'Accept': 'application/json',
    },
    sortFunction: sortPostsByDate,
    cacheKey: 'gallery-posts',
    cacheDuration: 10 * 60 * 1000, // 10 minutes cache
    onError: (errorMessage) => {
      console.error('Failed to load gallery data:', errorMessage);
    }
  });

  // Scroll spy effect to highlight active post
  useEffect(() => {
    if (!data || data.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let currentPost: string | null = null;
      let minDistance = Infinity;

      Object.entries(postRefs.current).forEach(([postId, element]) => {
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          const elementCenter = elementTop + element.offsetHeight / 2;

          const distance = Math.abs(scrollPosition - elementCenter);

          if (distance < minDistance && elementTop <= scrollPosition && elementBottom >= scrollPosition - window.innerHeight / 2) {
            minDistance = distance;
            currentPost = postId;
          }
        }
      });

      if (currentPost !== activePostIdRef.current) {
        activePostIdRef.current = currentPost;
        setActivePostId(currentPost);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [data]);

  const scrollToPostAlternative = (postId: string) => {
    const element = postRefs.current[postId];
    if (element) {
      lenisScrollTo(element, {
        offset: -80,
        duration: 3,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white/50 text-sm tracking-wider fade-animation uppercase mono">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl text-red-600 mb-4">
            Error Loading Data
          </h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <h3 className="text-yellow-800 mb-2">Troubleshooting Tips:</h3>
            <ul className="text-yellow-700 text-sm text-left space-y-1">
              <li>• Check if your API server is running</li>
              <li>• Verify the NEXT_PUBLIC_BASE_URL environment variable</li>
              <li>• Check server logs for any issues</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const yearGroups = groupPostsByYear(data || []);

  return (
    <div className="flex justify-end w-full">
      {/* Year Navigation Sidebar */}
      <div className="w-[25%] hidden md:block h-[100vh]"
        style={{
          position: 'sticky',
          padding: "0 clamp(0.75rem, 0.75vw, 240rem)",
          top: "clamp(1rem, 3vw, 240rem)",
          height: 'fit-content',
          alignSelf: 'flex-start'
        }}
      >
        <div className="">
          {yearGroups.map((yearGroup) => (
            <div key={yearGroup.year} className="mb-8"
              style={{
                fontSize: "clamp(0.85rem, 0.9vw, 240rem)",
              }}
            >
              <div className="text-white"
                style={{
                  padding: "clamp(0.5rem, 0.75vw, 240rem) 0",
                }}
              >
                {yearGroup.year}
              </div>

              {/* Horizontal Bars for Posts */}
              <div className="flex flex-col"
                style={{
                  gap: "clamp(1rem, 1vw, 240rem)",
                }}
              >
                {yearGroup.posts.map((post) => {
                  const isHover = hoveredPostId === post._id;
                  const isActive = activePostId === post._id;
                  return (
                    <div className="flex items-center cursor-pointer"
                      style={{
                        gap: "clamp(0.5rem, 0.5vw, 240rem)",
                        height: "clamp(0.5rem, 0.5vw, 240rem)",
                      }}
                      onMouseEnter={() => setHoveredPostId(post._id)}
                      onMouseLeave={() => setHoveredPostId(null)}
                      onClick={() => scrollToPostAlternative(post._id)}

                      key={post._id}
                    >
                      <div
                        className={`h-1 rounded-full cursor-pointer ${isActive
                          ? 'w-12 xl:w-14 2xl:w-16 bg-[#FDE037]'
                          : 'w-8 xl:w-9 2xl:w-10 bg-white/60 transition-all duration-300 '
                          } ${isHover && 'bg-white w-12 xl:w-14 2xl:w-16'}`}
                      />
                      <div className={`text-white w-full overflow-hidden capitalize ${isHover ? 'block' : 'hidden'}`}>
                        <span className="text-[#FDE037]">
                          {post.day.toString().padStart(2, '0')}.{(post.month + 1).toString().padStart(2, '0')}
                        </span> {formatTitle(post.title)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-[75%] md:ml-[25%]"
        style={{
          padding: "clamp(1rem, 1vw, 240rem) clamp(0.5rem, 0.5vw, 240rem)",
        }}
      >
        {data && data.length > 0 ? (
          <div className="flex-col flex"
            style={{
              gap: "clamp(1rem, 3vw, 240rem)",
            }}
          >
            {data.map((post: Post, postIndex: number) => (
              <div
                key={post._id}
                ref={(el) => { postRefs.current[post._id] = el; }}
                className="flex flex-col"
                style={{
                  gap: "clamp(0.5rem, 0.5vw, 240rem)",
                  fontSize: "clamp(0.85rem, 0.9vw, 240rem)",
                }}
              >
                <div className="flex flex-col">
                  <h2 className="text-white capitalize">
                    {post.title}
                  </h2>

                  <p className="text-white/50 mono"
                    style={{
                      fontSize: "clamp(0.7rem, 0.7vw, 240rem)",
                      padding: "clamp(0.25rem,0.25vw,200rem) 0"
                    }}
                  >
                    {formatDateRange(post.startDate, post.endDate)}
                  </p>
                </div>

                {post.images && post.images.length > 0 && (
                  <div className={`grid
                     ${post.images.length === 4 && "grid-cols-4"}
                     ${post.images.length === 8 && "grid-cols-4"}
                     ${post.images.length === 6 && "grid-cols-3"}
                     ${post.images.length === 3 && "grid-cols-3"}
                     ${post.images.length === 2 && "grid-cols-3"}
                     ${post.images.length === 1 && "grid-cols-4"}
                     `}
                    style={{
                      gap: "clamp(0.75rem, 0.75vw, 240rem)",
                    }}
                  >
                    {post.images.map((image: string, imageIndex: number) => {
                      const globalImageIndex = postIndex * 10 + imageIndex; // Rough estimate for priority
                      return (
                        <LazyImage
                          key={imageIndex}
                          src={image}
                          alt={`${post.title} - Image ${imageIndex + 1}`}
                          index={globalImageIndex}
                        />
                      );
                    })}
                  </div>
                )}

                {(!post.images || post.images.length === 0) && (
                  <p className="text-gray-500 text-center py-4">
                    No images available for this post
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No gallery items available
          </p>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;