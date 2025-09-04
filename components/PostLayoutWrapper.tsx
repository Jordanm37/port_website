import { ReactNode } from "react";
import PostLayout from "./PostLayout";

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
  // For now, we'll pass empty navigation and related posts
  // In a future iteration, these could be passed via getStaticProps in a custom page
  return (
    <PostLayout frontmatter={frontmatter} navigation={{ prev: null, next: null }} relatedPosts={[]}>
      {children}
    </PostLayout>
  );
}
