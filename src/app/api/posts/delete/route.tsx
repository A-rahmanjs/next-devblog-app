// app/api/posts/delete/route.ts
import { deletePost } from "@/lib/blogData";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new NextResponse("Slug is required", { status: 400 });
  }

  deletePost(slug);
  return new NextResponse("Deleted", { status: 200 });
}
