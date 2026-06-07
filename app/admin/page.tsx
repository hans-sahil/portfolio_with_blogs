import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { blogRepo } from "@/lib/blog-repository-index";
import { verifyAdmin } from "@/lib/admin";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminPage() {
  const isAdmin = await verifyAdmin();
  if (!isAdmin) redirect("/admin/login");

  const posts = await blogRepo.list();

  return <AdminDashboard posts={posts} />;
}