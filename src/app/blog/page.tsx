import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "../../utils/constants";
import { format } from "date-fns";

function Blog() {
  if (!BLOG_POSTS.length) {
    return (
      <>
        <h1>No Blog Posts!</h1>

        <Link href="/create">Create a new one</Link>
      </>
    );
  }

  return (
    <main>
      <h1>Blog Posts:</h1>

      <ul>
        {BLOG_POSTS.map(({ blogTitle, slug, description, date }, index) => {
          return (
            <li key={index}>
              <h2>
                <Link href={slug}>{blogTitle}</Link>
              </h2>
              <span>Date Published: {format(date, "yyyy-MM-dd")} </span>
              <div className="description">
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
