// app/api/posts/route.ts
import { getAllPosts, addPost } from "@/lib/blogData";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(getAllPosts());
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.blogTitle || !body.content || !body.slug) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  addPost({
    ...body,
    date: new Date(body.date),
  });

  return new NextResponse("Post added", { status: 201 });
}
