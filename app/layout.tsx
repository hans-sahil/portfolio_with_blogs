import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sahil Hans — AI Full-Stack Engineer",
  description:
    "Full-stack engineer building scalable web applications with React, TypeScript, and Node.js — leveraging AI tooling, Claude Code, and MCP servers.",
  metadataBase: new URL("https://sahil-portfolio-ashen.vercel.app"),
  openGraph: {
    title: "Sahil Hans — AI Full-Stack Engineer",
    description:
      "Full-stack engineer building scalable web applications with React, TypeScript, and Node.js — leveraging AI tooling, Claude Code, and MCP servers.",
    type: "website",
    locale: "en_US",
    siteName: "Sahil Hans",
    images: [
      {
        url: "/profile.jpg",
        width: 200,
        height: 200,
        alt: "Sahil Hans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Hans — AI Full-Stack Engineer",
    description:
      "Full-stack engineer building scalable web applications with React, TypeScript, and Node.js — leveraging AI tooling, Claude Code, and MCP servers.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}