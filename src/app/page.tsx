import Link from "next/link";
import {
  ArrowRight,
  Activity,
  Compass,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Brand } from "@/components/brand";

const growthAreas = ["UI/UX", "Web development", "Fitness", "Learning"];

export default function OnboardingPage() {
  return (
    <main className="onboarding-page">
      <header className="onboarding-header">
        <Brand />
        <Link className="onboarding-header__login" href="/auth/login" prefetch={false}>
          Already a member? <strong>Log in</strong>
        </Link>
      </header>

      <section className="onboarding-hero">
        <div className="onboarding-copy">
          <p className="onboarding-kicker">
            <Sparkles size={15} aria-hidden="true" />
            A community for becoming
          </p>
          <h1>Small steps add up to a life you&apos;re proud of.</h1>
          <p className="onboarding-copy__description">
            Make space for what you&apos;re learning, celebrate the work behind
            every win, and grow alongside people who get it.
          </p>
          <div className="onboarding-actions">
            <Link className="button button--primary button--lg" href="/home" prefetch={false}>
              Explore the Sikap community
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className="onboarding-signup" href="/auth/sign-up" prefetch={false}>
              Create a demo account
            </Link>
          </div>
          <p className="onboarding-demo-note">
            <ShieldCheck size={15} aria-hidden="true" />
            Preview with sample content. Sign-in and rewards are not live yet.
          </p>
        </div>

        <aside className="onboarding-preview" aria-label="Sikap community preview">
          <div className="onboarding-preview__heading">
            <span className="onboarding-preview__icon" aria-hidden="true">
              <Activity size={18} />
            </span>
            <span>
              <strong>Your progress, your pace</strong>
              <small>A place to keep showing up</small>
            </span>
            <span className="onboarding-preview__sparkle" aria-hidden="true">
              <Sparkles size={17} />
            </span>
          </div>

          <div className="onboarding-progress">
            <div className="onboarding-progress__labels">
              <span>Build a portfolio project</span>
              <strong>Week 3 of 4</strong>
            </div>
            <div
              aria-label="Weekly goal progress: 72 percent"
              className="onboarding-progress__track"
              role="img"
            >
              <span />
            </div>
            <small>A small step forward still counts.</small>
          </div>

          <div className="onboarding-community-note">
            <span className="onboarding-community-note__heart" aria-hidden="true">
              <Heart size={16} />
            </span>
            <span>
              <strong>Grow with people who get it.</strong>
              <small>Learning over likes. Effort over perfection.</small>
            </span>
          </div>

          <div className="onboarding-areas">
            <div>
              <Compass size={15} aria-hidden="true" />
              <strong>Find your next step</strong>
            </div>
            <ul>
              {growthAreas.map((area) => <li key={area}>{area}</li>)}
            </ul>
          </div>
        </aside>
      </section>

      <footer className="onboarding-footer">
        <span>SIKAP · GROW WITH PURPOSE</span>
        <span>Progress looks different for everyone.</span>
      </footer>
    </main>
  );
}
