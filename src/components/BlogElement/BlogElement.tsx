"use client";
import React from "react";
import { format } from "date-fns";
import { Settings, Trash } from "react-feather";
import { useRouter } from "next/navigation";

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

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (deleted) {
      timeout = setTimeout(() => {
        router.push("/blog");
      }, 350);
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
    <div>
      <div className="settings-container">
        <button onClick={() => setIsOpen((prev) => !prev)} title="settings">
          <Settings size="1.5rem" />
        </button>
        {isOpen ? (
          <button onClick={() => handleDeleteBlog(slug)}>
            <Trash />- Delete
          </button>
        ) : null}
      </div>

      <h1>{title}</h1>
      <br />
      <span>{format(date, "yyyy-MM-dd")}</span>
      <br />
      <h2>{description}</h2>
      <br />
      <p>{content}</p>
    </div>
  );
}

export default BlogElement;
