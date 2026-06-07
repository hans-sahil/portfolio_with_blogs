import { NextRequest } from "next/server";
import { blogRepo } from "@/lib/blog-repository-index";
import { verifyAdmin } from "@/lib/admin";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await blogRepo.getBySlug(slug);

  if (!post) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(post);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const body = await request.json();

  const post = await blogRepo.update(slug, {
    title: body.title,
    excerpt: body.excerpt,
    content: body.content,
    tags: body.tags,
    published: body.published,
  });

  if (!post) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json(post);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const deleted = await blogRepo.delete(slug);

  if (!deleted) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  return Response.json({ success: true });
}