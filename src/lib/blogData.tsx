type BlogPost = {
  blogTitle: string;
  date: Date | number | string;
  slug: string;
  description: string;
  content: string;
};

const blogPosts: BlogPost[] = [
  {
    blogTitle: "The Side Effects of Spending Too much Time on the Internet",
    date: new Date(2025, 1, 7),
    slug: "blog/blog-post-1",
    description: "Intro description",
    content: "Post content 1...",
  },
];

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function addPost(post: BlogPost) {
  blogPosts.push(post);
}

export function deletePost(blogSlug: string) {
  const index = blogPosts.findIndex((p) => p.slug === blogSlug);
  if (index !== -1) {
    blogPosts.splice(index, 1);
  }
}
