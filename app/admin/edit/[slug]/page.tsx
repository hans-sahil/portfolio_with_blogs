import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { blogRepo } from "@/lib/blog-repository-index";
import { verifyAdmin } from "@/lib/admin";
import { BlogEditor } from "@/components/blog-editor";

export const metadata: Metadata = {
  title: "Edit Post — Admin",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const { slug } = await params;
  const post = await blogRepo.getBySlug(slug);

  if (!post) {
    redirect("/admin");
  }

  return <BlogEditor post={post} />;
}