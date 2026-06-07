"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RichTextEditor } from "@/components/rich-text-editor";
import { ArrowLeft, Save } from "lucide-react";
import type { BlogPost } from "@/lib/types";

interface BlogEditorProps {
  post?: BlogPost | null;
}

export function BlogEditor({ post }: BlogEditorProps) {
  const router = useRouter();
  const isEditing = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [tags, setTags] = useState(post?.tags.join(", ") ?? "");
  const [published, setPublished] = useState(post?.published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const body = {
      title,
      excerpt,
      content,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      published,
    };

    try {
      const url = isEditing
        ? `/api/blogs/${post!.slug}`
        : "/api/blogs";

      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error ?? "Failed to save");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              <ArrowLeft className="size-4" />
            </Link>
            <span className="font-mono text-sm font-medium tracking-tight uppercase">
              {isEditing ? "Edit Post" : "New Post"}
            </span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saving || !title || !excerpt || !content}
            className="h-9 px-4 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-1.5"
          >
            <Save className="size-4" />
            {saving ? "Saving..." : "Publish"}
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              required
              className="w-full text-3xl lg:text-4xl font-semibold tracking-tight bg-transparent border-none outline-none placeholder:text-muted-foreground/30"
            />
          </div>

          <div>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write a short excerpt..."
              required
              rows={2}
              className="w-full text-base text-muted-foreground bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/30"
            />
          </div>

          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="Start writing your post..."
          />

          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="React, TypeScript, AI"
                className="w-full h-10 px-3 rounded-lg bg-card border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                Status
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="size-4 rounded border-border bg-card text-primary focus:ring-primary/30"
                />
                <span className="text-sm text-foreground">Published</span>
              </label>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}