import React from 'react';
import dynamic from 'next/dynamic';
import Spinner from '@/components/Spinner';
import type { BlogPost } from '../BlogProvider';

const BlogElement = dynamic(() => import('@/components/BlogElement'), {
  ssr: false,
  loading: () => (
    <div className='spinnerContainer'>
      <Spinner color="var(--color-text)" size={40} />
    </div>
  ),
});

function BlogElementWrapper({
  blogTitle,
  description,
  content,
  date,
  slug,
}: BlogPost) {
  return <BlogElement blogTitle={blogTitle} description={description} content={content} date={date} slug={slug} />;
}

export default BlogElementWrapper;
