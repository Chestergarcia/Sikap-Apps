"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/text-field";

type AuthFormProps = {
  mode: "login" | "sign-up";
};

export function AuthForm({ mode }: AuthFormProps) {
  const [notice, setNotice] = useState("");
  const isSignUp = mode === "sign-up";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      "Demo only: authentication is not connected yet. No account was created and no credentials were sent or stored.",
    );
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
      <Button className="auth-submit" size="lg" type="submit">
        {isSignUp ? "Create your account" : "Log in"}
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
