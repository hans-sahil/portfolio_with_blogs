export const site = {
  name: "Sahil Hans",
  shortName: "Sahil",
  role: "AI Full-Stack Engineer",
  location: "India",
  pitch:
    "Full-stack engineer with 2+ years of experience building scalable web applications — now leveraging AI tooling, Claude Code, and MCP servers to ship smarter, faster products with React, TypeScript, and Node.js.",
  bio: [
    "I'm Sahil Hans, a full-stack engineer with 2+ years of experience building scalable, high-performance web applications. I work across the entire stack — from crafting responsive React interfaces to designing REST APIs and PostgreSQL schemas — with a growing focus on integrating AI into real-world products.",
    "At Taghash, I shipped a fund performance and investment analytics platform end-to-end for Limited Partners — including data visualization dashboards, automated DOCX reporting, and secure RBAC systems backed by Express.js and PostgreSQL. I regularly demo features to clients, gather feedback, and iterate quickly to ensure the product aligns with their needs. I also mentor new interns, helping them ramp up on the codebase, tooling, and best practices.",
    "I use AI tooling daily — Claude Code for agentic coding workflows, MCP servers to connect AI models to real data sources, and the Anthropic API to build intelligent features. I write about what I learn so that the next engineer has a shorter path forward.",
  ],
  avatarUrl: "/sahil.jpg",
  socials: {
    email: "hanss9545@gmail.com",
    github: "https://github.com/hans-sahil",
    linkedin: "https://linkedin.com/in/hans-sahil",
  },
  skills: [
    // Frontend
    { name: "React.js / Next.js", category: "Frontend" },
    { name: "TypeScript", category: "Core Lang" },
    { name: "Redux Toolkit", category: "State" },
    { name: "React Query", category: "Data Fetching" },
    { name: "Tailwind / Material UI", category: "Styling" },
    // Backend
    { name: "Node.js / Express", category: "Backend" },
    { name: "PostgreSQL / Knex.js", category: "Database" },
    { name: "REST APIs", category: "APIs" },
    // AI & Tooling
    { name: "Claude Code", category: "AI Tooling" },
    { name: "MCP Servers", category: "AI Tooling" },
    { name: "LLM Integration", category: "AI Tooling" },
    // Data & Testing
    { name: "Apache ECharts / Cube.js", category: "Data Viz" },
    { name: "Jest / RTL", category: "Testing" },
    // DevOps
    { name: "Git / GitLab", category: "DevOps" },
    { name: "Docker", category: "DevOps" },
  ],
  experience: [
    {
      role: "Full-Stack Developer",
      company: "Taghash",
      period: "April 2024 — April 2026",
      bullets: [
        "Engineered a full-stack Fund Performance and Investment Analytics platform for Limited Partners — built with Next.js, TypeScript, Tailwind CSS, Redux Toolkit, and React Query.",
        "Architected Express.js REST services on an MVC structure with optimized PostgreSQL schemas and secure RBAC auth middleware — reduced load time by approximately 30% through API and SSR optimizations.",
        "Built customizable analytics dashboards with Apache ECharts and Cube.js, including a real-time chart builder with advanced filtering that supports 6+ chart types.",
        "Developed an automated DOCX report generation module using DocxTemplater — reduced manual reporting effort by approximately 60% with secure LP report-sharing.",
        "Presented feature demos to clients, incorporated feedback into the development cycle, and mentored new interns on the codebase, development workflows, and engineering best practices.",
      ],
    },
  ],
} as const;

export type Site = typeof site;