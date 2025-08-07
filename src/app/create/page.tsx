"use client";
import React, { useState,  } from "react";
import { useRouter } from "next/navigation";
import styles from "./Create.module.css";
import { ToastContext } from "@/components/ToastProvider";
import { MessageCircleDashed, BadgePlus } from "lucide-react";
import { useBlogContext } from "@/components/BlogProvider/BlogProvider";

export type BlogPost = {
  blogTitle: string;
  date: Date | number | string;
  slug: string;
  description: string;
  content: string;
};

function CreateNewBlogPost() {
  const { createToast } = React.useContext(ToastContext) 
  const [blogTitleName, setBlogTitleName] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const router = useRouter();
  const id = React.useId();
  const { addPost } = useBlogContext()

 function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!blogTitleName || !blogContent) return;

    const slug = `blog/${crypto.randomUUID()}`;

    const post = {
      blogTitle: blogTitleName,
      date: Date.now(),
      slug,
      description: blogDescription,
      content: blogContent,
    };

    addPost(post);

    
      setBlogTitleName("");
      setBlogDescription("");
      setBlogContent("");
      router.push("/blog");
      createToast("Post added", "success");

  }

  return (
    <div className={styles.container}>
      <MessageCircleDashed className={styles.svg}/>
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
           <BadgePlus size={25} /> Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateNewBlogPost;
