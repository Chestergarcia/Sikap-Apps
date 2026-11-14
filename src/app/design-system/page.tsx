import {
  Check,
  CircleDollarSign,
  Clock3,
  Eye,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { TextField } from "@/components/ui/text-field";

const primarySwatches = [
  ["50", "var(--primary-50)"],
  ["100", "var(--primary-100)"],
  ["300", "var(--primary-300)"],
  ["600", "var(--primary-600)"],
  ["800", "var(--primary-800)"],
];

export default function DesignSystemPreview() {
  return (
    <main className="preview-shell">
      <header className="preview-header">
        <a className="brand-lockup" href="#top" aria-label="Sikap design preview">
          <Image
            alt=""
            className="brand-lockup__image"
            height={559}
            priority
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/sikap-logo.png`}
            width={1024}
          />
        </a>
        <div className="preview-meta" aria-label="Phase 2 design-system preview">
          <span>Design system</span>
          <span className="preview-meta-dot" aria-hidden="true" />
          <span>Phase 02</span>
        </div>
      </header>

      <section className="preview-intro" id="top">
        <p className="eyebrow">
          <ShieldCheck size={15} aria-hidden="true" />
          Design foundation
        </p>
        <h1>A calm, clear system for celebrating real progress.</h1>
        <p>
          A first look at Sikap&apos;s visual language: purposeful color,
          readable type, accessible controls, and reusable building blocks.
          This preview is a component reference—not the finished product pages.
        </p>
      </section>

      <div className="preview-grid">
        <div className="preview-column">
          <Card>
            <div className="ui-card-heading">
              <div>
                <h2>Buttons &amp; status</h2>
                <p>Consistent actions and clear moderation states.</p>
              </div>
              <span className="preview-only">Visual samples</span>
            </div>
            <p className="sample-label">Button variants · non-interactive preview</p>
            <div className="sample-row" aria-label="Button style samples">
              <Button variant="primary" disabled>Primary</Button>
              <Button variant="secondary" disabled>Secondary</Button>
              <Button variant="ghost" disabled>Quiet</Button>
              <Button variant="destructive" disabled>Destructive</Button>
            </div>
            <hr className="sample-divider" />
            <p className="sample-label">Content and review status</p>
            <div className="sample-row">
              <Badge variant="success" icon={<Check size={14} />}>Approved</Badge>
              <Badge variant="info" icon={<Clock3 size={14} />}>Pending review</Badge>
              <Badge variant="warning" icon={<Eye size={14} />}>Needs human review</Badge>
              <Badge variant="reward" icon={<CircleDollarSign size={14} />}>Reward eligible</Badge>
            </div>
          </Card>

          <Card>
            <div className="ui-card-heading">
              <div>
                <h2>Post card foundation</h2>
                <p>Progress-first content, with verification explained.</p>
              </div>
              <span className="preview-only">Example only</span>
            </div>
            <article className="post-sample">
              <div className="post-sample__author">
                <Avatar name="Mika Santos" initials="MS" />
                <div className="post-sample__identity">
                  <strong>Mika Santos</strong>
                  <span>@mika.builds · 2 hours ago</span>
                </div>
                <Badge variant="success" icon={<Check size={14} />}>Verified</Badge>
              </div>
              <div>
                <p className="sample-label">UI/UX · Learning</p>
                <p className="post-sample__body">
                  Finished my first checkout flow prototype today. I learned
                  that mapping edge cases before polishing screens saved me a
                  lot of rework.
                </p>
              </div>
              <div className="post-sample__footer">
                <Badge variant="reward" icon={<CircleDollarSign size={14} />}>
                  Simulated reward
                </Badge>
                <span className="post-sample__reward">
                  Rewards are examples only
                </span>
              </div>
            </article>
          </Card>
        </div>

        <div className="preview-column">
          <Card>
            <div className="ui-card-heading">
              <div>
                <h2>Color &amp; type</h2>
                <p>Blue signals action; neutrals keep focus on people.</p>
              </div>
            </div>
            <div className="palette-grid" aria-label="Primary color palette">
              {primarySwatches.map(([name, color]) => (
                <div className="palette-swatch" key={name}>
                  <span
                    className="palette-swatch__color"
                    style={{ backgroundColor: color }}
                    aria-hidden="true"
                  />
                  <span className="palette-swatch__name">Blue {name}</span>
                </div>
              ))}
            </div>
            <hr className="sample-divider" />
            <div className="sample-stack">
              <p className="type-sample type-sample--display">Steady growth.</p>
              <p className="type-sample type-sample--body">
                Inter-first system font stack, with readable sizing and
                accessible contrast for everyday use.
              </p>
            </div>
          </Card>

          <Card>
            <div className="ui-card-heading">
              <div>
                <h2>Profile &amp; progress</h2>
                <p>Small wins add up over time.</p>
              </div>
            </div>
            <div className="sample-row" style={{ marginBottom: 20 }}>
              <Avatar name="Ari Dela Cruz" initials="AD" size="sm" />
              <Avatar name="Ari Dela Cruz" initials="AD" />
              <Avatar name="Ari Dela Cruz" initials="AD" size="lg" />
            </div>
            <ProgressBar label="Weekly learning goal" value={68} max={100} />
            <hr className="sample-divider" />
            <TextField
              label="Example field"
              value="A labelled field"
              helpText="Labels stay visible; feedback has its own space."
              readOnly
            />
          </Card>
        </div>
      </div>

      <footer className="preview-footer">
        Phase 02 preview · No account, moderation, or real-money features are active.
      </footer>
    </main>
  );
}
