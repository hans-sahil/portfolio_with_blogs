import { eq, desc, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogs } from "@/db/schema";
import type { BlogPost, CreateBlogPost, UpdateBlogPost, BlogPostSummary } from "./types";
import type { BlogRepository } from "./blog-repository";

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .replace(/^-+|-+$/g, "");
}

function toBlogPost(row: typeof blogs.$inferSelect): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    author: row.author,
    publishedAt: row.publishedAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    readingTime: row.readingTime,
    tags: row.tags ?? [],
    published: row.published,
  };
}

function toBlogPostSummary(row: typeof blogs.$inferSelect): BlogPostSummary {
  const { content: _, ...summary } = toBlogPost(row);
  return summary;
}

export const postgresRepository: BlogRepository = {
  async list() {
    const rows = await db
      .select()
      .from(blogs)
      .orderBy(desc(blogs.publishedAt));
    return rows.map(toBlogPostSummary);
  },

  async listPublished() {
    const rows = await db
      .select()
      .from(blogs)
      .where(eq(blogs.published, true))
      .orderBy(desc(blogs.publishedAt));
    return rows.map(toBlogPostSummary);
  },

  async getBySlug(slug: string) {
    const rows = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .limit(1);
    return rows[0] ? toBlogPost(rows[0]) : null;
  },

  async getById(id: string) {
    const rows = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, id))
      .limit(1);
    return rows[0] ? toBlogPost(rows[0]) : null;
  },

  async create(data: CreateBlogPost) {
    const slug = slugify(data.title);

    // Ensure unique slug
    let finalSlug = slug;
    let counter = 1;
    while (true) {
      const existing = await db
        .select({ id: blogs.id })
        .from(blogs)
        .where(eq(blogs.slug, finalSlug))
        .limit(1);
      if (existing.length === 0) break;
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const readingTime = estimateReadingTime(data.content);

    const [row] = await db
      .insert(blogs)
      .values({
        slug: finalSlug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        readingTime,
        tags: data.tags ?? [],
        published: data.published ?? true,
      })
      .returning();

    return toBlogPost(row);
  },

  async update(slug: string, data: UpdateBlogPost) {
    const updateData: Record<string, unknown> = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt;
    if (data.content !== undefined) {
      updateData.content = data.content;
      updateData.readingTime = estimateReadingTime(data.content);
    }
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.published !== undefined) updateData.published = data.published;

    updateData.updatedAt = new Date();

    const [row] = await db
      .update(blogs)
      .set(updateData)
      .where(eq(blogs.slug, slug))
      .returning();

    return row ? toBlogPost(row) : null;
  },

  async delete(slug: string) {
    const [row] = await db
      .delete(blogs)
      .where(eq(blogs.slug, slug))
      .returning({ id: blogs.id });

    return !!row;
  },
};