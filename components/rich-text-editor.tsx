"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { ResizableImage } from "@/components/resizable-image";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  ImageIcon,
  Link,
  X,
  Upload,
} from "lucide-react";
import { useState, useRef, useCallback } from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function ToolbarButton({
  onClick,
  active,
  children,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`p-1.5 rounded transition-colors ${
        active
          ? "bg-primary/20 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing...",
}: RichTextEditorProps) {
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({ openOnClick: false }),
      ResizableImage,
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-3",
      },
    },
  });

  const handleImageUrlSubmit = useCallback(() => {
    if (!editor || !imageUrl.trim()) return;

    editor.chain().focus().setResizableImage({
      src: imageUrl.trim(),
      width: "100%",
    }).run();

    setImageUrl("");
    setShowImageModal(false);
  }, [editor, imageUrl]);

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;

      setUploading(true);
      setUploadError("");

      try {
        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
        if (!allowedTypes.includes(file.type)) {
          throw new Error("Invalid file type. Allowed: jpg, png, webp, gif, svg");
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
          throw new Error("File too large. Maximum size is 5MB");
        }

        // Convert to base64 data URL
        const reader = new FileReader();
        const dataUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read file"));
          reader.readAsDataURL(file);
        });

        editor.chain().focus().setResizableImage({
          src: dataUrl,
          width: "100%",
        }).run();

        setShowImageModal(false);
      } catch (err) {
        setUploadError(
          err instanceof Error ? err.message : "Failed to upload image"
        );
      } finally {
        setUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [editor]
  );

  const addLink = useCallback(() => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", previousUrl || "");

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border border-border/60 rounded-lg overflow-hidden bg-card">
      <div className="flex flex-wrap gap-0.5 p-2 border-b border-border/60 bg-background/80">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          label="Bold"
        >
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          label="Italic"
        >
          <Italic className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
          label="Strikethrough"
        >
          <Strikethrough className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          active={editor.isActive("code")}
          label="Inline Code"
        >
          <Code className="size-4" />
        </ToolbarButton>
        <span className="w-px h-6 bg-border/60 mx-1 self-center" />
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive("heading", { level: 1 })}
          label="Heading 1"
        >
          <Heading1 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
          label="Heading 2"
        >
          <Heading2 className="size-4" />
        </ToolbarButton>
        <span className="w-px h-6 bg-border/60 mx-1 self-center" />
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          label="Bullet List"
        >
          <List className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          label="Ordered List"
        >
          <ListOrdered className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          label="Blockquote"
        >
          <Quote className="size-4" />
        </ToolbarButton>
        <span className="w-px h-6 bg-border/60 mx-1 self-center" />
        <ToolbarButton onClick={addLink} active={editor.isActive("link")} label="Link">
          <Link className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => setShowImageModal(true)}
          active={false}
          label="Insert Image"
        >
          <ImageIcon className="size-4" />
        </ToolbarButton>
        <span className="w-px h-6 bg-border/60 mx-1 self-center" />
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          label="Undo"
        >
          <Undo className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          label="Redo"
        >
          <Redo className="size-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />

      {/* Image Insertion Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border/60 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-foreground">
                Insert Image
              </h3>
              <button
                onClick={() => {
                  setShowImageModal(false);
                  setImageUrl("");
                  setUploadError("");
                }}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              >
                <X className="size-4" />
              </button>
            </div>

            {uploadError && (
              <div className="mb-4 p-2.5 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive">
                {uploadError}
              </div>
            )}

            {/* Upload from computer */}
            <div className="mb-4">
              <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                Upload from computer
              </label>
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full h-10 px-3 rounded-lg border border-border/60 bg-background/50 text-sm text-foreground hover:bg-secondary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Upload className="size-4" />
                  {uploading ? "Uploading..." : "Choose Image File"}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-border/60" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                or
              </span>
              <div className="flex-1 h-px bg-border/60" />
            </div>

            {/* URL input */}
            <div>
              <label className="block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleImageUrlSubmit();
                  }}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 h-10 px-3 rounded-lg bg-background/50 border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={handleImageUrlSubmit}
                  disabled={!imageUrl.trim()}
                  className="h-10 px-4 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}