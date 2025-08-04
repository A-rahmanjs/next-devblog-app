import React from "react";
import Link from "next/link";
import styles from "./Blog.module.css";
import { format } from "date-fns";
import { getAllPosts } from "@/lib/blogData";

function Blog() {
  const BlogPosts = getAllPosts();

  if (!BlogPosts.length) {
    return (
      <div className={styles.noPosts}>
        <h1 className={styles.noPostsTitle}>No Blog Posts!</h1>

        <button>
          <Link href="/create">Create a new one</Link>
        </button>
      </div>
    );
  }
  return (
    <main className={styles.allContainer}>
      <h1 className={styles.blogPostsTitle}>Blog Posts:</h1>

      <ul>
        {BlogPosts.map(({ blogTitle, slug, description, date }, index) => {
          return (
            <li key={index} className={styles.blogPostContainer}>
              <h2 className={styles.blogTitle}>
                <Link href={slug}>{blogTitle}</Link>
              </h2>
              <span className={styles.date}>
                Date Published: {format(date, "yyyy-MM-dd")}
              </span>
              <div className={styles.description}>
                <p>{description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Blog;
