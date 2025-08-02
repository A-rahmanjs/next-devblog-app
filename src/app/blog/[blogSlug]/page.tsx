import { BLOG_POSTS } from "@/utils/constants";
import BlogElement from "@/components/BlogElement";

// types
type PageProps = {
  params: {
    blogSlug: string;
  };
};
// types

function BlogSlug({ params }: PageProps) {
  const getBlogPost = BLOG_POSTS.find((post) => {
    return post.slug === `blog/${params.blogSlug}`;
  });

  if (!getBlogPost) {
    return <div>Post not found.</div>;
  }
  return (
    <>
      <BlogElement
        title={getBlogPost.blogTitle}
        description={getBlogPost.description}
        content={getBlogPost.content}
        date={getBlogPost.date}
      />
    </>
  );
}

export default BlogSlug;
