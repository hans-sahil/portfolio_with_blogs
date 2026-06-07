CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"content" text NOT NULL,
	"author" text DEFAULT 'Sahil Hans' NOT NULL,
	"published_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"reading_time" integer DEFAULT 1 NOT NULL,
	"tags" text[] DEFAULT '{}' NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
