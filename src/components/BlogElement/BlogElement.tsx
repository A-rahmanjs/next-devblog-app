"use client";
import React from "react";
import { format } from "date-fns";
import { Settings, Trash, User } from "react-feather";
import { useRouter } from "next/navigation";
import styles from "./BlogElement.module.css";
import useOnClickOutside from "@/hooks/useOnClickOutside/useOnClickOutside";

type BlogElementProps = {
  title: string;
  description: string;
  slug: string;
  content: string;
  date: Date | string | number;
};

function BlogElement({
  title,
  description,
  content,
  date,
  slug,
}: BlogElementProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  const router = useRouter();
  const settingsRef = React.useRef<HTMLButtonElement>(null);

  useOnClickOutside(
    settingsRef,
    React.useCallback(() => {
      setIsOpen(false);
    }, [])
  );

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (deleted) {
      timeout = setTimeout(() => {
        router.push("/blog");
      }, 175);
    }
    return () => clearTimeout(timeout);
  }, [deleted, router]);

  async function handleDeleteBlog(blogSlug: string) {
    const res = await fetch(`/api/posts/delete?slug=${blogSlug}`, {
      method: "DELETE",
    });

    if (res.ok) setDeleted(true);
    else alert("Delete failed");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.contentContainer}>
        <div 
          className={styles.settings} 
          data-open={isOpen}
        >
          <button
            ref={settingsRef}
            className={styles.settingsButton}
            onClick={() => setIsOpen((prev) => !prev)}
            title="settings"
            aria-expanded={isOpen}
            aria-controls="settings-menu"
          >
            <Settings size="2.5rem" />
          </button>
          <button
            id="settings-menu"
            className={styles.deleteButton}
            onClick={() => handleDeleteBlog(slug)}
            aria-label="Delete post"
          >
            <Trash size={16} />
            Delete
          </button>
        </div>

        <h1 className={styles.title}>{title}</h1>
        <br />
        <div className={styles.dateAndUser}>
          <span>Published on: {format(date, "yyyy/MM/dd hh:mm a")}</span>
          <p className={styles.user}>
            admin <User />
          </p>
        </div>
        <br />
        <h2>{description}</h2>
        <br />
        <p>{content}</p>
      </div>
    </div>
  );
}

export default BlogElement;
