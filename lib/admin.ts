import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const SESSION_COOKIE = "admin_session";

export async function verifyAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE);
    return session?.value === ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

export async function createSession(): Promise<string | null> {
  return ADMIN_PASSWORD;
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export function getAdminPassword(): string {
  return ADMIN_PASSWORD;
}