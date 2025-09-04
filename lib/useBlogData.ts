import { useEffect, useState } from "react";
import { BlogMeta, getPrevNext, getRelatedPosts } from "./blog";

type BlogData = {
  navigation: {
    prev: BlogMeta | null;
    next: BlogMeta | null;
  };
  relatedPosts: BlogMeta[];
};

export function useBlogData(slug?: string): BlogData {
  const [data, setData] = useState<BlogData>({
    navigation: { prev: null, next: null },
    relatedPosts: [],
  });

  useEffect(() => {
    if (!slug?.trim()) return;

    // Create abort controller for cleanup
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    // Try to fetch the pre-generated blog data with retry logic
    const fetchWithRetry = async (retries = 2): Promise<any> => {
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const res = await fetch("/blog-data.json", {
            signal: controller.signal,
            cache: 'default', // Allow browser caching
          });
          
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}: ${res.statusText}`);
          }
          
          clearTimeout(timeoutId);
          return await res.json();
        } catch (error: any) {
          if (error.name === 'AbortError') {
            throw new Error('Request timeout after 10 seconds');
          }
          
          // If it's the last attempt, throw the error
          if (attempt === retries) {
            throw error;
          }
          
          // Wait before retry (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    };

    fetchWithRetry()
      .then((allData) => {
        // Enhanced null checks for blog data processing
        if (!allData || typeof allData !== 'object') {
          if (process.env.NODE_ENV === 'development') {
            console.warn('Invalid blog data structure received');
          }
          return;
        }

        const slugData = allData[slug];
        if (slugData && typeof slugData === 'object') {
          // Validate the structure of slug data
          const navigation = slugData.navigation || { prev: null, next: null };
          const relatedPosts = Array.isArray(slugData.relatedPosts) ? slugData.relatedPosts : [];
          
          // Ensure navigation has the correct structure
          const safeNavigation = {
            prev: navigation.prev && typeof navigation.prev === 'object' ? navigation.prev : null,
            next: navigation.next && typeof navigation.next === 'object' ? navigation.next : null,
          };

          setData({
            navigation: safeNavigation,
            relatedPosts,
          });
        } else if (process.env.NODE_ENV === 'development') {
          console.warn(`No blog data found for slug: ${slug}`);
        }
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to load blog data after retries:', error.message);
        }
        
        // Fallback: try to compute data client-side (only in development)
        if (process.env.NODE_ENV === 'development') {
          try {
            // Note: This won't work in production as we don't have file system access
            // But it provides a graceful degradation in development
            console.warn('Client-side fallback not available in browser environment');
          } catch (fallbackError) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('Fallback computation failed:', fallbackError);
            }
          }
        }
      });

    // Cleanup function to abort fetch and clear timeout
    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [slug]);

  return data;
}
