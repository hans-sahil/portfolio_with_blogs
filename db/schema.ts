import { pgTable, text, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull().default("Sahil Hans"),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  readingTime: integer("reading_time").notNull().default(1),
  tags: text("tags").array().notNull().default([]),
  published: boolean("published").notNull().default(true),
});