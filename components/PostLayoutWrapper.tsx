import { ReactNode } from "react";
import PostLayout from "./PostLayout";
import { getPrevNext, getOrderedPosts } from "../lib/blog";

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
  // This component will only run on the server during static generation
  // since it imports filesystem-dependent functions
  let navigation = { prev: null, next: null };
  let relatedPosts: any[] = [];

  if (typeof window === "undefined" && frontmatter?.slug) {
    // Only run on server
    navigation = getPrevNext(frontmatter.slug);
    relatedPosts = getOrderedPosts()
      .filter((p) => p.slug !== frontmatter.slug)
      .slice(0, 4);
  }

  return (
    <PostLayout 
      frontmatter={frontmatter} 
      navigation={navigation} 
      relatedPosts={relatedPosts}
    >
      {children}
    </PostLayout>
  );
}