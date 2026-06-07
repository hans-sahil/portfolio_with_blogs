"use server";

import { site } from "@/lib/site";

export async function sendContactMessage(
  prevState: { success: boolean; error?: string; message?: string },
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  if (!email.includes("@")) {
    return { success: false, error: "Please enter a valid email." };
  }

  // For now, log the message. When you set up a backend, send an email here.
  console.log("Contact message received:", { name, email, message });

  // TODO: Send email via Resend, Nodemailer, or your preferred service
  // Example with Resend:
  // await resend.emails.send({
  //   from: `Portfolio Contact <onboarding@resend.dev>`,
  //   to: site.socials.email,
  //   subject: `New message from ${name}`,
  //   text: `From: ${name} (${email})\n\n${message}`,
  // });

  return {
    success: true,
    message: "Thanks! I'll get back to you soon.",
  };
}