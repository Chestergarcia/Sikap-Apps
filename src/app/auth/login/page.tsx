import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Log in · Sikap",
};

export default function LoginPage() {
  return (
    <AuthShell
      description="Pick up where you left off and keep building toward what matters to you."
      mode="login"
      title="Welcome back."
    >
      <AuthForm mode="login" />
    </AuthShell>
  );
}
