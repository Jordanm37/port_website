import { ReactNode } from "react";
import { useRouter } from "next/router";
import PostLayout from "./PostLayout";
import { useBlogData } from "../lib/useBlogData";

type PostLayoutWrapperProps = {
  children: ReactNode;
  frontmatter?: {
    title?: string;
    description?: string;
    summary?: string;
    date?: string;
    tags?: string[];
    slug?: string;
  };
};

export default function PostLayoutWrapper({ children, frontmatter }: PostLayoutWrapperProps) {
  const router = useRouter();
  
  // Derive slug from router pathname with validation
  const deriveSlugFromPath = (path: string): string | undefined => {
    if (!path || typeof path !== 'string') return undefined;
    
    // Clean the path and extract the last segment
    const segments = path.split('/').filter(Boolean);
    const lastSegment = segments.pop();
    
    if (!lastSegment) return undefined;
    
    // Remove query parameters and fragments
    const cleanSegment = lastSegment.split('?')[0].split('#')[0];
    
    // Remove .mdx extension if present and validate
    const slug = cleanSegment.replace(/\.mdx$/, '');
    
    // Basic validation: slug should only contain alphanumeric characters, hyphens, and underscores
    if (slug && /^[a-zA-Z0-9_-]+$/.test(slug)) {
      return slug;
    }
    
    return undefined;
  };
  
  const slug = deriveSlugFromPath(router.asPath) || frontmatter?.slug;
  
  // Use the hook to get navigation and related posts data
  const { navigation, relatedPosts } = useBlogData(slug);

  return (
    <PostLayout frontmatter={frontmatter} navigation={navigation} relatedPosts={relatedPosts}>
      {children}
    </PostLayout>
  );
}
