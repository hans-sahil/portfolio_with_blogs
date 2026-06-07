export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML
  author: string;
  publishedAt: string; // ISO string
  updatedAt: string; // ISO string
  readingTime: number; // minutes
  tags: string[];
  published: boolean;
}

export interface CreateBlogPost {
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  published?: boolean;
}

export interface UpdateBlogPost {
  title?: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
  published?: boolean;
}

export type BlogPostSummary = Omit<BlogPost, "content">;