import Link from "next/link";
import { ArrowLeft, LockKeyhole, Sprout } from "lucide-react";
import { Brand } from "@/components/brand";
import { isSupabaseConfigured } from "@/lib/supabase/client";

type AuthShellProps = {
  children: React.ReactNode;
  description: string;
  mode: "login" | "sign-up";
  title: string;
};

export function AuthShell({
  children,
  description,
  mode,
  title,
}: AuthShellProps) {
  const isSignUp = mode === "sign-up";

  return (
    <main className="auth-page">
      <aside className="auth-aside">
        <Brand light />
        <div className="auth-aside__message">
          <p className="auth-aside__eyebrow">
            <Sprout size={15} aria-hidden="true" />
            A community for becoming
          </p>
          <h1>Progress looks different for everyone.</h1>
          <p>
            Make space for the small steps, the lessons, and the work that
            moves you forward.
          </p>
          <div className="auth-aside__note">
            <span className="auth-aside__note-icon" aria-hidden="true">
              <LockKeyhole size={17} />
            </span>
            <span>
              <strong>Built around real growth</strong>
              <small>Share progress, not perfection.</small>
            </span>
          </div>
        </div>
        <Link className="auth-aside__back" href="/" prefetch={false}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Sikap
        </Link>
      </aside>

      <section className="auth-main">
        <div className="auth-panel">
          <p className="eyebrow">{isSignUp ? "Join the community" : "Welcome back"}</p>
          <h2>{title}</h2>
          <p className="auth-panel__description">{description}</p>
          {children}
          <div className="auth-main__switch">
            {isSignUp ? "Already part of the community?" : "New to Sikap?"}{" "}
            <Link href={isSignUp ? "/auth/login" : "/auth/sign-up"} prefetch={false}>
              {isSignUp ? "Log in" : "Create an account"}
            </Link>
          </div>
          <p className="auth-demo-note">
            <LockKeyhole size={14} aria-hidden="true" />
            {isSupabaseConfigured ? "Authentication is connected to Supabase." : "Demo screen only. Add Supabase environment variables to enable authentication."}
          </p>
        </div>
        <p className="auth-main__legal">
          Your progress belongs to you. We&apos;ll make privacy controls clear
          before accounts go live.
        </p>
      </section>
    </main>
  );
}
