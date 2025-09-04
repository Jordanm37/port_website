import { ReactNode } from "react";
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
  // Use the hook to get navigation and related posts data
  const { navigation, relatedPosts } = useBlogData(frontmatter?.slug);

  return (
    <PostLayout frontmatter={frontmatter} navigation={navigation} relatedPosts={relatedPosts}>
      {children}
    </PostLayout>
  );
}
