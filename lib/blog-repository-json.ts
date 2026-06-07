import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { BlogPost, CreateBlogPost, UpdateBlogPost, BlogPostSummary } from "./types";
import type { BlogRepository } from "./blog-repository";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "blogs.json");

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

function readData(): BlogPost[] {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function writeData(posts: BlogPost[]): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), "utf-8");
}

export const jsonRepository: BlogRepository = {
  async list() {
    const posts = readData();
    return posts
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .map(({ content: _, ...rest }) => rest);
  },

  async listPublished() {
    const posts = readData();
    return posts
      .filter((p) => p.published)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .map(({ content: _, ...rest }) => rest);
  },

  async getBySlug(slug: string) {
    const posts = readData();
    return posts.find((p) => p.slug === slug) ?? null;
  },

  async getById(id: string) {
    const posts = readData();
    return posts.find((p) => p.id === id) ?? null;
  },

  async create(data: CreateBlogPost) {
    const posts = readData();
    const now = new Date().toISOString();
    const slug = slugify(data.title);

    // Ensure unique slug
    let finalSlug = slug;
    let counter = 1;
    while (posts.some((p) => p.slug === finalSlug)) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const post: BlogPost = {
      id: crypto.randomUUID(),
      slug: finalSlug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      author: "Sahil Hans",
      publishedAt: now,
      updatedAt: now,
      readingTime: estimateReadingTime(data.content),
      tags: data.tags,
      published: data.published ?? true,
    };

    posts.push(post);
    writeData(posts);
    return post;
  },

  async update(slug: string, data: UpdateBlogPost) {
    const posts = readData();
    const index = posts.findIndex((p) => p.slug === slug);
    if (index === -1) return null;

    const updated: BlogPost = {
      ...posts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    if (data.content) {
      updated.readingTime = estimateReadingTime(data.content);
    }

    posts[index] = updated;
    writeData(posts);
    return updated;
  },

  async delete(slug: string) {
    const posts = readData();
    const index = posts.findIndex((p) => p.slug === slug);
    if (index === -1) return false;
    posts.splice(index, 1);
    writeData(posts);
    return true;
  },
};