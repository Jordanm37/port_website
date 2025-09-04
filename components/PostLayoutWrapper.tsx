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
  
  // Derive slug from router pathname (e.g., "/blog/hello-world" -> "hello-world")
  const slug = router.asPath.split('/').pop()?.replace(/\.mdx$/, '') || frontmatter?.slug;
  
  // Use the hook to get navigation and related posts data
  const { navigation, relatedPosts } = useBlogData(slug);

  return (
    <PostLayout frontmatter={frontmatter} navigation={navigation} relatedPosts={relatedPosts}>
      {children}
    </PostLayout>
  );
}
