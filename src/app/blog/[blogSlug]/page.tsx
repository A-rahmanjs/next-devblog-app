import { getAllPosts } from "@/lib/blogData";
import BlogElement from "@/components/BlogElement";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    blogSlug: string;
  };
};

export default function BlogSlugPage({ params }: PageProps) {
  const posts = getAllPosts(); // returns BlogPost[]
  const blogPost = posts.find(
    (post) => post.slug === `blog/${params.blogSlug}`
  );

  if (!blogPost) {
    notFound(); // uses Next.js 404 page
  }

  return (
    <BlogElement
      title={blogPost.blogTitle}
      description={blogPost.description}
      content={blogPost.content}
      date={blogPost.date}
      slug={blogPost.slug}
    />
  );
}
