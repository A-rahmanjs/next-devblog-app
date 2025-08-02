type BlogPost = {
  blogTitle: string;
  date: Date;
  slug: string;
  description: string;
  content: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    blogTitle: "The Side Effects of Spending Too much Time on the Internet",
    date: new Date(2025, 1, 7),
    slug: "blog/blog-post-1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    content: "lorem lorem lorem",
  },
  {
    blogTitle: "The Side Effects of Spending Too much Time on the Internet",
    date: new Date(2025, 4, 6),
    slug: "blog/blog-post-2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    content: "lorem lorem lorem",
  },
  {
    blogTitle: "The Side Effects of Spending Too much Time on the Internet",
    date: new Date(2025, 2, 15),
    slug: "blog/blog-post-3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
    content: "lorem lorem lorem",
  },
];
export const LINKS = [
  {
    label: "Home",
    id: crypto.randomUUID(),
    href: "/",
  },
  {
    label: "Blog",
    id: crypto.randomUUID(),
    href: "/blog",
  },
  {
    label: "+",
    id: crypto.randomUUID(),
    href: "/create",
  },
];
