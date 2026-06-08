import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { useCallback, useRef, useState, useEffect } from "react";
import type { ReactNodeViewProps } from "@tiptap/react";

export interface ResizableImageOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    resizableImage: {
      setResizableImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        width?: string;
        height?: string;
      }) => ReturnType;
    };
  }
}

export const ResizableImage = Node.create<ResizableImageOptions>({
  name: "resizableImage",

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: "100%",
      },
      height: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "img[src]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setResizableImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});

function ResizableImageComponent(props: ReactNodeViewProps) {
  const { node, updateAttributes, selected } = props;
  const { src, alt, title, width, height } = node.attrs as {
    src: string;
    alt: string;
    title: string;
    width: string;
    height: string;
  };

  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [naturalRatio, setNaturalRatio] = useState(1);
  const [currentWidth, setCurrentWidth] = useState(width || "100%");

  useEffect(() => {
    setCurrentWidth(width || "100%");
  }, [width]);

  const onImageLoad = useCallback(() => {
    if (imgRef.current) {
      const w = imgRef.current.naturalWidth;
      const h = imgRef.current.naturalHeight;
      if (w && h) {
        setNaturalRatio(w / h);
      }
    }
  }, []);

  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent,
      handle: "se" | "sw" | "ne" | "nw" | "e" | "w" | "s" | "n"
    ) => {
      e.preventDefault();
      e.stopPropagation();
      setIsResizing(true);

      const startX = e.clientX;
      const startWidth =
        containerRef.current?.getBoundingClientRect().width || 300;

      function onMouseMove(moveEvent: MouseEvent) {
        const dx = moveEvent.clientX - startX;
        let newWidth = startWidth;

        if (handle === "se" || handle === "ne" || handle === "e") {
          newWidth = Math.max(100, startWidth + dx);
        } else if (handle === "sw" || handle === "nw" || handle === "w") {
          newWidth = Math.max(100, startWidth - dx);
        }

        let newHeight: number | null = null;
        if (
          handle === "se" ||
          handle === "sw" ||
          handle === "ne" ||
          handle === "nw"
        ) {
          newHeight = Math.round(newWidth / naturalRatio);
        }

        if (containerRef.current) {
          containerRef.current.style.width = `${newWidth}px`;
          if (newHeight) {
            containerRef.current.style.height = `${newHeight}px`;
          }
        }
      }

      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        setIsResizing(false);

        if (containerRef.current) {
          const finalWidth = Math.round(
            containerRef.current.getBoundingClientRect().width
          );
          updateAttributes({
            width: `${finalWidth}px`,
          });
          setCurrentWidth(`${finalWidth}px`);
          containerRef.current.style.width = "";
          containerRef.current.style.height = "";
        }
      }

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [naturalRatio, updateAttributes]
  );

  const Handle = ({ position }: { position: string }) => (
    <div
      className={`resize-handle resize-handle-${position}`}
      onMouseDown={(e) =>
        handleMouseDown(
          e,
          position as "se" | "sw" | "ne" | "nw" | "e" | "w" | "s" | "n"
        )
      }
    />
  );

  return (
    <NodeViewWrapper
      ref={containerRef}
      className={`resizable-image-wrapper ${
        selected ? "resizable-image-selected" : ""
      } ${isResizing ? "resizing" : ""}`}
      style={{ width: currentWidth, maxWidth: "100%" }}
    >
      <div className="resizable-image-container">
        <img
          ref={imgRef}
          src={src}
          alt={alt || ""}
          title={title || ""}
          onLoad={onImageLoad}
          draggable={false}
          style={{
            width: "100%",
            height: height ? height : "auto",
          }}
        />
        {selected && (
          <div className="resize-handles">
            <Handle position="nw" />
            <Handle position="n" />
            <Handle position="ne" />
            <Handle position="e" />
            <Handle position="se" />
            <Handle position="s" />
            <Handle position="sw" />
            <Handle position="w" />
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}