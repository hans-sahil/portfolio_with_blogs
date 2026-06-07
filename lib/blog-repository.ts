import type { BlogPost, CreateBlogPost, UpdateBlogPost, BlogPostSummary } from "./types";

export interface BlogRepository {
  list(): Promise<BlogPostSummary[]>;
  listPublished(): Promise<BlogPostSummary[]>;
  getBySlug(slug: string): Promise<BlogPost | null>;
  getById(id: string): Promise<BlogPost | null>;
  create(data: CreateBlogPost): Promise<BlogPost>;
  update(slug: string, data: UpdateBlogPost): Promise<BlogPost | null>;
  delete(slug: string): Promise<boolean>;
}