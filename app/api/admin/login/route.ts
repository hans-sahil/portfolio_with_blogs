import { NextRequest, NextResponse } from "next/server";
import { getAdminPassword, getSessionCookieName } from "@/lib/admin";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password === getAdminPassword()) {
    const response = NextResponse.json({ success: true });
    response.cookies.set(getSessionCookieName(), password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return response;
  }

  return NextResponse.json({ error: "Invalid password" }, { status: 401 });
}