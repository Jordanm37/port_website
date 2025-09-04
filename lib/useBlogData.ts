import { useEffect, useState } from "react";
import { BlogMeta } from "./blog";

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
    if (!slug) return;

    // Try to fetch the pre-generated blog data
    fetch("/blog-data.json")
      .then((res) => res.json())
      .then((allData) => {
        if (allData[slug]) {
          setData(allData[slug]);
        }
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to load blog data:', error);
        }
      });
  }, [slug]);

  return data;
}
