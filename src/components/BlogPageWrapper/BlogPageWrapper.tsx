"use client";
import dynamic from "next/dynamic";
import Spinner from "@/components/Spinner";

// Dynamically load BlogPage using the index.js path
const BlogPage = dynamic(() => import("@/components/BlogPage/BlogPage"), {
  ssr: false,
  loading: () => (
    <div className="spinnerContainer">
      <Spinner color="var(--color-text)" size={40} />
    </div>
  ),
});

export default function BlogPageWrapper() {
  return <BlogPage />;
}
