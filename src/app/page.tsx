import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  CircleDollarSign,
  Compass,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";

const steps = [
  {
    number: "01",
    icon: BookOpen,
    title: "Choose what you want to grow",
    description:
      "Set a learning or wellbeing goal that fits your life, not someone else’s timeline.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Share the work behind it",
    description:
      "Post a reflection, lesson, or milestone. Progress matters more than polished results.",
  },
  {
    number: "03",
    icon: Heart,
    title: "Keep going together",
    description:
      "Find people learning alongside you, exchange useful feedback, and celebrate consistency.",
  },
];

export default function LandingPage() {
  return (
    <main className="landing-page">
      <SiteHeader />

      <section className="landing-hero">
        <div className="landing-hero__copy">
          <p className="landing-kicker">
            <span className="landing-kicker__dot" aria-hidden="true" />
            A community built around progress
          </p>
          <h1>Small steps.<br />Real growth.</h1>
          <p className="landing-hero__lead">
            A better place to document what you&apos;re learning, celebrate
            everyday progress, and keep moving forward—together.
          </p>
          <div className="landing-hero__actions">
            <Link className="button button--primary button--lg" href="/auth/sign-up">
              Start your journey
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a className="landing-text-link" href="#how-it-works">
              See how Sikap works
            </a>
          </div>
          <p className="landing-hero__fineprint">
            No pressure to be perfect. Just room to make progress.
          </p>
        </div>

        <div className="journey-preview">
          <div className="journey-preview__top">
            <div>
              <p className="journey-preview__eyebrow">YOUR WEEKLY CHECK-IN</p>
              <h2>A little more than last week.</h2>
            </div>
            <span className="journey-preview__mark" aria-hidden="true">
              <Compass size={19} />
            </span>
          </div>
          <div className="journey-goal">
            <div className="journey-goal__meta">
              <span>Learning goal</span>
              <span>Week 3 of 4</span>
            </div>
            <strong>Build a portfolio project</strong>
            <ProgressBar label="Weekly progress" value={72} max={100} />
          </div>
          <div className="journey-timeline">
            <div className="journey-timeline__line" aria-hidden="true" />
            <div className="journey-timeline__item">
              <span className="journey-timeline__check" aria-hidden="true">
                <Check size={13} />
              </span>
              <span>
                <strong>Finished the first wireframe</strong>
                <small>Today · UI/UX design</small>
              </span>
              <Badge variant="success">Done</Badge>
            </div>
            <div className="journey-timeline__item journey-timeline__item--muted">
              <span className="journey-timeline__future" aria-hidden="true" />
              <span>
                <strong>Test with two people</strong>
                <small>Next step</small>
              </span>
            </div>
          </div>
          <div className="journey-preview__footer">
            <span className="journey-avatars" aria-hidden="true">
              <i>JM</i><i>AL</i><i>+8</i>
            </span>
            <span>Your circle is cheering you on</span>
          </div>
        </div>
      </section>

      <div className="landing-principle">
        <ShieldCheck size={17} aria-hidden="true" />
        <span>Effort over perfection</span>
        <span className="landing-principle__divider" aria-hidden="true" />
        <span>Learning over likes</span>
        <span className="landing-principle__divider" aria-hidden="true" />
        <span>Community over comparison</span>
      </div>

      <section className="landing-section landing-steps" id="how-it-works">
        <div className="landing-section__heading">
          <p className="eyebrow">A simple way to keep growing</p>
          <h2>Make your progress visible to you.</h2>
          <p>
            Sikap helps turn personal goals into small, shareable moments of
            learning and reflection.
          </p>
        </div>
        <div className="step-list">
          {steps.map(({ number, icon: Icon, title, description }) => (
            <article className="step-item" key={number}>
              <div className="step-item__top">
                <span className="step-item__icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span className="step-item__number">{number}</span>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-community" id="community">
        <div className="landing-community__copy">
          <p className="eyebrow">A place for your next chapter</p>
          <h2>Learn a skill. Build a habit. Find your people.</h2>
          <p>
            From your first lines of code to a new fitness routine, share the
            parts of the journey that help you grow.
          </p>
          <Link className="landing-text-link" href="/auth/sign-up">
            Find your starting point <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="interest-list" aria-label="Example areas of growth">
          <span>UI/UX design</span>
          <span>Web development</span>
          <span>Programming</span>
          <span>Fitness</span>
          <span>Reading</span>
          <span>Career growth</span>
        </div>
      </section>

      <section className="reward-section" id="rewards">
        <div className="reward-section__icon" aria-hidden="true">
          <CircleDollarSign size={22} />
        </div>
        <div className="reward-section__copy">
          <p className="eyebrow">A thank-you for meaningful contributions</p>
          <h2>Recognition that supports the journey.</h2>
          <p>
            Eligible posts may receive simulated rewards—₱1 for text or photo
            and ₱5 for video in this prototype. Rewards are examples only, not
            guaranteed earnings or real-money payouts.
          </p>
        </div>
        <div className="reward-section__note">
          <ShieldCheck size={17} aria-hidden="true" />
          <span>Review and verification come first.</span>
        </div>
      </section>

      <section className="landing-cta">
        <div>
          <p className="eyebrow">Your journey is worth noticing</p>
          <h2>Start where you are.</h2>
          <p>One small step is still a step forward.</p>
        </div>
        <Link className="button button--primary button--lg" href="/auth/sign-up">
          Join the community
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </section>

      <footer className="landing-footer">
        <Brand />
        <p>Your Effort. Your Growth. Your Reward.</p>
        <div className="landing-footer__links">
          <Link href="/auth/login">Log in</Link>
          <Link href="/home">Sample feed</Link>
          <Link href="/design-system">Design system</Link>
        </div>
      </footer>
    </main>
  );
}
