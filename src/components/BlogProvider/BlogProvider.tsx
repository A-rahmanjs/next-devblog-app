'use client';
import React, { createContext, useEffect, useState } from 'react';

export type BlogPost = {
  blogTitle: string;
  date: Date | number | string;
  slug: string;
  description: string;
  content: string;
};

type BlogContextType = {
  blogPosts: BlogPost[];
  addPost: (blog: BlogPost) => void;
  deletePost: (blogSlug: string) => void;
  isLoaded: boolean;
};


const BlogContext = createContext<BlogContextType | undefined>(undefined);

function BlogProvider({ children }: { children: React.ReactNode }) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);



  // Load from localStorage once on mount
  useEffect(() => {
    const storedPosts = localStorage.getItem('blog-posts');
    if (storedPosts) {
      try {
        setBlogPosts(JSON.parse(storedPosts));
      } catch (error) {
        console.error('Error parsing blog-posts from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('blog-posts', JSON.stringify(blogPosts));
  }, [blogPosts]);

  function addPost(blog: BlogPost) {
    setBlogPosts(prev => [...prev, blog]);
  }

  function deletePost(blogSlug: string) {
    setBlogPosts(prev => prev.filter(blog => blog.slug !== blogSlug));
  }

  return (
    <BlogContext.Provider value={{ blogPosts, addPost, deletePost, isLoaded }}>
      {children}
    </BlogContext.Provider>
  );
}

export const useBlogContext = () => {
  const context = React.useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};

export default BlogProvider;
