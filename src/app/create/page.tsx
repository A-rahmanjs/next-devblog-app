"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Create.module.css";

export type BlogPost = {
  blogTitle: string;
  date: Date | number | string;
  slug: string;
  description: string;
  content: string;
};

function CreateNewBlogPost() {
  const [blogTitleName, setBlogTitleName] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const router = useRouter();
  const id = React.useId();

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
    <div className={styles.container}>
      <h1 className={styles.title}>New Blog Post...</h1>
      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit}>
          <label htmlFor={`${id}-title`} className={styles.textLabel}>
            Blog Title:
          </label>
          <input
            className={styles.textinput}
            required
            id={`${id}-title`}
            type="text"
            value={blogTitleName}
            placeholder="Blog title..."
            onChange={(e) => setBlogTitleName(e.target.value)}
          />
          <br />
          <label htmlFor={`${id}-description`} className={styles.textLabel}>
            Blog Description:
          </label>
          <input
            className={styles.textinput}
            id={`${id}-description`}
            type="text"
            placeholder="Blog description..."
            value={blogDescription}
            onChange={(e) => setBlogDescription(e.target.value)}
          />

          <br />
          <label htmlFor={`${id}-content`} className={styles.textLabel}>
            Blog Content:
          </label>
          <textarea
            className={styles.textArea}
            required
            id={`${id}-content`}
            placeholder="Blog content..."
            value={blogContent}
            onChange={(e) => setBlogContent(e.target.value)}
          />
          <br />

          <button type="submit" className={styles.submit}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewBlogPost;
