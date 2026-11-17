"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";
import { isSupabaseConfigured, supabase } from "@/lib/supabase/client";

type AuthFormProps = {
  mode: "login" | "sign-up";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [notice, setNotice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const isSignUp = mode === "sign-up";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "").trim();

    if (!isSupabaseConfigured || !supabase) {
      setNotice("Demo mode: connect Supabase environment variables to enable authentication.");
      return;
    }

    setIsSubmitting(true);
    const emailRedirectTo = isSignUp
      ? new URL("../login/", window.location.href).toString()
      : undefined;
    const result = isSignUp
      ? await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: name }, emailRedirectTo },
        })
      : await supabase.auth.signInWithPassword({ email, password });
    setIsSubmitting(false);

    if (result.error) {
      setNotice(result.error.message);
      return;
    }

    if (isSignUp && !result.data.session) {
      setNotice("Account created. Check your email to confirm your account before logging in.");
      return;
    }

    router.push("/home");
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {isSignUp ? (
        <TextField
          autoComplete="name"
          label="Full name"
          name="name"
          placeholder="Your name"
          required
        />
      ) : null}
      <TextField
        autoComplete="email"
        label="Email address"
        name="email"
        placeholder="you@example.com"
        required
        type="email"
      />
      <TextField
        autoComplete={isSignUp ? "new-password" : "current-password"}
        label="Password"
        minLength={8}
        name="password"
        placeholder="At least 8 characters"
        required
        type="password"
      />
      <Button className="auth-submit" disabled={isSubmitting} size="lg" type="submit">
        {isSubmitting ? "Please wait…" : isSignUp ? "Create your account" : "Log in"}
        <ArrowRight size={17} aria-hidden="true" />
      </Button>
      {notice ? (
        <p className="auth-notice" role="status">
          {notice}
        </p>
      ) : null}
    </form>
  );
}
