"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export type BlogPost = {
  blogTitle: string;
  date: Date | number | string;
  slug: string;
  description: string;
  content: string;
};

function CreateNewBlogPost() {
  const [blogTitleName, setBlogTitleName] = useState("Blog");
  const [blogDescription, setBlogDescription] = useState("Description");
  const [blogContent, setBlogContent] = useState("123...");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setBlogPosts(data);
    }
    fetchPosts();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!blogTitleName || !blogContent) return;

    const slug = `blog/blog-post-${blogPosts.length + 1}`;

    const post = {
      blogTitle: blogTitleName,
      date: Date.now(),
      slug,
      description: blogDescription,
      content: blogContent,
    };

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    if (res.ok) {
      setBlogTitleName("");
      setBlogDescription("");
      setBlogContent("");
      router.push("/blog");
    } else {
      alert("Failed to add post");
    }
  }

  return (
    <>
      <h1>New Blog Post...</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>Blog Title:</label>
          <input
            required
            type="text"
            value={blogTitleName}
            onChange={(e) => setBlogTitleName(e.target.value)}
          />

          <label>Blog Description:</label>
          <input
            type="text"
            value={blogDescription}
            onChange={(e) => setBlogDescription(e.target.value)}
          />

          <label>Blog Content:</label>
          <input
            required
            type="text"
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
          />

          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
}

export default CreateNewBlogPost;
