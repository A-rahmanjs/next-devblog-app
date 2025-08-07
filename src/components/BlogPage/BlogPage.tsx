'use client'
import React from "react";
import Link from "next/link";
import styles from "./BlogPage.module.css";
import { format } from "date-fns";
import { useBlogContext } from "@/components/BlogProvider";
import { Paperclip, Calendar } from "react-feather";
import { MessageSquareX, Newspaper } from "lucide-react";

function Blog() {
  const { blogPosts } = useBlogContext()


  if (!blogPosts.length) {
    return (
      <div className={styles.noPostsContainer}>
        <MessageSquareX />
      <div className={styles.noPosts}>
        <h1 className={styles.noPostsTitle}>No Blog Posts!</h1>

          <Link href="/create">Create One</Link>
      </div>
      </div>
    );
  }
  return (
    <main className={styles.allContainer}>
      <Newspaper className={styles.newspaper}/>
      <h1 className={styles.blogPostsTitle}>Blog Posts</h1>

      <ul>
        {blogPosts.map(({ blogTitle, slug, description, date }, index) => {
          return (
            <li key={index} className={styles.blogPostContainer}>
              <Link href={slug}>
             <div className={styles.blogPostHeader}>

             <Paperclip size={30} />
              <h2 className={styles.blogTitle}>
                <p>
                  {blogTitle}
                </p>
              </h2>
             </div>
             <div className={styles.dateContainer}>
             <Calendar />
              <span className={styles.date}>
                Date Published: {format(date, "yyyy-MM-dd")}
              </span>
             </div>
              <div className={styles.description}>
                <p>{description}</p>
              </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Blog;
