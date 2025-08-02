import React from "react";
import { format } from "date-fns";

type BlogElementProps = {
  title: string;
  description: string;
  content: string;
  date: Date;
};

function BlogElement({ title, description, content, date }: BlogElementProps) {
  return (
    <div>
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
