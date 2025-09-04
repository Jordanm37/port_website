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

    // Try to fetch the pre-generated blog data
    fetch("/blog-data.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((allData) => {
        if (allData && typeof allData === 'object' && allData[slug]) {
          setData(allData[slug]);
        } else if (process.env.NODE_ENV === 'development') {
          console.warn(`No blog data found for slug: ${slug}`);
        }
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to load blog data, attempting fallback:', error);
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
  }, [slug]);

  return data;
}
