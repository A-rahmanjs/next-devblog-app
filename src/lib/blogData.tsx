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
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
