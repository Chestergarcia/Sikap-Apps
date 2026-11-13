import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Create an account · Sikap",
};

export default function SignUpPage() {
  return (
    <AuthShell
      description="Start a personal growth journal and find a community that values the process."
      mode="sign-up"
      title="Your next step starts here."
    >
      <AuthForm mode="sign-up" />
    </AuthShell>
  );
}
