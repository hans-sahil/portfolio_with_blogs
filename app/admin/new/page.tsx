import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/admin";
import { BlogEditor } from "@/components/blog-editor";

export const metadata: Metadata = {
  title: "New Post — Admin",
};

export default async function NewPostPage() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  return <BlogEditor />;
}