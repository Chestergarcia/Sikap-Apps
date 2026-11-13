import Link from "next/link";
import { Brand } from "@/components/brand";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Brand />
        <nav className="site-nav" aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <a href="#community">Community</a>
          <a href="#rewards">Rewards</a>
        </nav>
        <div className="site-header__actions">
          <Link className="site-header__login" href="/auth/login">
            Log in
          </Link>
          <Link className="button button--primary button--sm" href="/auth/sign-up">
            Join Sikap
          </Link>
        </div>
      </div>
    </header>
  );
}
