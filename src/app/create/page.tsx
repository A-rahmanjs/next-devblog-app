"use client";
import React, { useState } from "react";

function CreateNewBlogPost() {
  const [blogTitleName, setBlogTitleName] = useState("Blog");
  const [blogDescription, setBlogDescription] = useState("Description");
  const [blogContent, setBlogContent] = useState("123...");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }
  return (
    <>
      <h1>New Blog Post...</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Blog Title:</label>
          <input
            type="text"
            value={blogTitleName}
            onChange={(e) => setBlogTitleName(e.target.value)}
          />
          <label htmlFor="">Blog Description</label>
          <input
            type="text"
            value={blogDescription}
            onChange={(e) => setBlogDescription(e.target.value)}
          />
          <label htmlFor="">{"Blog's main content"}</label>
          <input
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
