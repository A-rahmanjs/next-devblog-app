import { getAllPosts } from "@/lib/blogData";
import BlogElement from "@/components/BlogElement";
import { notFound } from "next/navigation";
import { BlogPost } from "@/app/create/page";

type PageProps = {
  params: {
    blogSlug: string;
  };
};

export default function BlogSlugPage({ params }: PageProps) {
  const posts = getAllPosts();
  const blogPost = posts.find(
    (post) => post.slug === `blog/${params.blogSlug}`
  );
 const {blogTitle, description, content, date, slug} = blogPost as BlogPost;
  if (!blogPost) {
    notFound();
  }

  return (
    <BlogElement
      title={blogTitle}
      description={description}
      content={content}
      date={date}
      slug={slug}
    />
  );
}
