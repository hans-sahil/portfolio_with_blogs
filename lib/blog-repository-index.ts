import type { BlogRepository } from "./blog-repository";
import { postgresRepository } from "./blog-repository-postgres";

// Using PostgreSQL via Drizzle ORM.
// Switch to JSON file storage by importing jsonRepository instead.

const repository: BlogRepository = postgresRepository;

export const blogRepo = repository;