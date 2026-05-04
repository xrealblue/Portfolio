'use client';

import { useState, useEffect, useRef } from 'react';
import axios, { AxiosError } from 'axios';
interface Post {
  _id: string;
  title: string;
  startDate: string; // API returns ISO string, not Date object
  endDate?: string;  // API returns ISO string, not Date object
  images: string[];
}

interface FetchOptions<T> {
  url: string;
  initialData?: T;
  headers?: Record<string, string>;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
  sortFunction?: (a: Post, b: Post) => number;
  cacheKey?: string;
  cacheDuration?: number; 
}

interface CachedData<T> {
  data: T;
  timestamp: number;
}

/**
 * Custom hook for optimized data fetching with caching and error handling
 */
export function useOptimizedDataFetch<T>({ 
  url, 
  initialData, 
  headers = {}, 
  onSuccess, 
  onError,
  sortFunction,
  cacheKey,
  cacheDuration = 5 * 60 * 1000 // 5 minutes default cache duration
}: FetchOptions<T>) {
  const [data, setData] = useState<T | undefined>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use refs for values that shouldn't trigger re-fetching
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const sortFunctionRef = useRef(sortFunction);
  const headersRef = useRef(headers);

  // Keep refs up to date
  useEffect(() => { onSuccessRef.current = onSuccess; }, [onSuccess]);
  useEffect(() => { onErrorRef.current = onError; }, [onError]);
  useEffect(() => { sortFunctionRef.current = sortFunction; }, [sortFunction]);
  useEffect(() => { headersRef.current = headers; }, [headers]);

  useEffect(() => {
    const fetchData = async () => {
      // Check if we have cached data
      if (cacheKey) {
        try {
          const cachedDataString = localStorage.getItem(`data-cache-${cacheKey}`);
          if (cachedDataString) {
            const cachedData: CachedData<T> = JSON.parse(cachedDataString);
            const isExpired = Date.now() - cachedData.timestamp > cacheDuration;
            
            if (!isExpired) {
              setData(cachedData.data);
              setLoading(false);
              onSuccessRef.current?.(cachedData.data);
              return; // Use cached data and skip API call
            }
          }
        } catch (e) {
          // If there's an error reading from cache, proceed with API call
          console.warn('Error reading from cache:', e);
        }
      }

      try {
        const response = await axios.get<T>(url, {
          headers: {
            'Connection': 'keep-alive',
            'Accept': 'application/json',
            ...headersRef.current
          },
        });

        let responseData: T = response.data;

        // Apply sorting if provided
        if (sortFunctionRef.current && Array.isArray(responseData)) {
          // Create a properly typed copy for sorting
          responseData = [...responseData].sort(sortFunctionRef.current) as T;
        }

        // Cache the data if cacheKey is provided
        if (cacheKey) {
          try {
            localStorage.setItem(`data-cache-${cacheKey}`, JSON.stringify({
              data: responseData,
              timestamp: Date.now()
            }));
          } catch (e) {
            console.warn('Error writing to cache:', e);
          }
        }

        setData(responseData);
        onSuccessRef.current?.(responseData);
      } catch (error) {
        let errorMessage = 'Unable to fetch data from the API. Please try again later.';

        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.code === 'ECONNRESET') {
            errorMessage = 'Connection was reset by the server. This might be due to server overload or timeout.';
          } else if (axiosError.code === 'ECONNREFUSED') {
            errorMessage = 'Connection refused. Please check if the API server is running.';
          } else if (axiosError.code === 'ENOTFOUND') {
            errorMessage = 'API server not found. Please check the URL configuration.';
          } else if (axiosError.response?.status) {
            errorMessage = `Server responded with status ${axiosError.response.status}: ${axiosError.response.statusText}`;
          }
        }
        
        setError(errorMessage);
        onErrorRef.current?.(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Only re-fetch when the actual fetch parameters change, not callbacks/headers
  }, [url, cacheKey, cacheDuration]);

  return { data, loading, error };
}