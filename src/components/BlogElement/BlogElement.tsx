"use client";
import React from "react";
import { format } from "date-fns";
import { Settings, Trash, User, Calendar, Paperclip } from "react-feather";
import { useRouter } from "next/navigation";
import { ToastContext } from "../ToastProvider";
import { useBlogContext, BlogPost } from "@/components/BlogProvider";
import styles from "./BlogElement.module.css";
import useOnClickOutside from "@/hooks/useOnClickOutside/useOnClickOutside";

function BlogElement({
  blogTitle,
  description,
  content,
  date,
  slug,
}: BlogPost) {
  const { deletePost } = useBlogContext()
  const [isOpen, setIsOpen] = React.useState(false);
  const [userName, setUserName] = React.useState<string | null>('')
  const router = useRouter();
  const settingsRef = React.useRef<HTMLButtonElement>(null);
  const { createToast } = React.useContext(ToastContext);

  useOnClickOutside(
    settingsRef,
    React.useCallback(() => {
      setIsOpen(false);
    }, [])
  );

  React.useEffect(() => {
    setUserName(window.localStorage.getItem('userName'))
  },[])


   function handleDeleteBlog(blogSlug: string) {
     deletePost(blogSlug)
     setTimeout(() => {
      createToast('Post Deleted', 'notice')
      router.push("/blog");
    }, 300)
  }

  return (
    <div className={styles.mainWrapper}>
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
          <div className={styles.titleContainer}>
        <Paperclip size={30}/>
        <h1 className={styles.title}>{blogTitle}</h1>
          </div>

        <div className={styles.dateAndUser}>
          <div className={styles.dateContainer}>
          <Calendar size={16} />
          <span>Published on: {format(date, "yyyy/MM/dd hh:mm a")}</span>
          </div>
          <p className={styles.user}>
            {userName} <User />
          </p>
        </div>

        <h2>{description}</h2>
        <div className={styles.contents}>

        <p>{content}</p>
        </div>
      </div>
    </div>
            </div>
  );
}

export default BlogElement;
