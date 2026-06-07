import { NextRequest } from "next/server";
import { blogRepo } from "@/lib/blog-repository-index";
import { verifyAdmin } from "@/lib/admin";

export async function GET() {
  const posts = await blogRepo.listPublished();
  return Response.json(posts);
}

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const post = await blogRepo.create({
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      tags: body.tags ?? [],
      published: body.published ?? true,
    });
    return Response.json(post, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}