'use client';
import { use } from 'react';
import { useBlogContext } from '@/components/BlogProvider';
import { notFound } from 'next/navigation';
import BlogElementWrapper from '@/components/BlogElementWrapper';
import Spinner from '@/components/Spinner';

type PageProps = {
  params: Promise<{
    blogSlug: string;
  }>;
};

export default function BlogSlugPage({ params }: PageProps) {
  const { blogPosts, isLoaded } = useBlogContext();
  const { blogSlug } = use(params);

  if (!isLoaded) return (
    <div className="spinnerContainer">
      <Spinner color="var(--color-text)" size={40} />
    </div>
  ) 

  const blogPost = blogPosts.find(
    (post) => post.slug === `blog/${blogSlug}`
  );

  if (!blogPost) {
    notFound();
  }

  return (
    <BlogElementWrapper
      blogTitle={blogPost.blogTitle}
      description={blogPost.description}
      content={blogPost.content}
      date={blogPost.date}
      slug={blogPost.slug}
    />
  );
}
