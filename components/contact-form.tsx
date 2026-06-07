"use client";

import { useActionState } from "react";
import { sendContactMessage } from "@/app/contact/actions";
import { Send } from "lucide-react";

type FormState = {
  success: boolean;
  error?: string;
  message?: string;
};

const initialState: FormState = {
  success: false,
};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState
  );

  if (state.success) {
    return (
      <div className="p-8 rounded-xl bg-card border border-border/60 text-center">
        <div className="size-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto mb-4">
          <Send className="size-5" />
        </div>
        <p className="text-foreground font-medium mb-1">Message sent!</p>
        <p className="text-sm text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
          {state.error}
        </div>
      )}

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full h-10 px-3 rounded-lg bg-card border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          placeholder="Your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full h-10 px-3 rounded-lg bg-card border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground mb-1.5"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full px-3 py-2.5 rounded-lg bg-card border border-border/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
          placeholder="What's on your mind?"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="h-10 px-5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
      >
        {pending ? (
          "Sending..."
        ) : (
          <>
            Send message
            <Send className="size-3.5" />
          </>
        )}
      </button>
    </form>
  );
}