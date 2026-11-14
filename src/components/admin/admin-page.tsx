"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CircleDollarSign,
  Clock3,
  FileImage,
  FileText,
  Play,
  Search,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ReviewStatus = "pending" | "approved" | "changes";
type ReviewFilter = "All sample posts" | "Needs review" | "Reviewed";

type ReviewItem = {
  author: string;
  category: string;
  id: string;
  status: ReviewStatus;
  submitted: string;
  title: string;
  type: "Text" | "Photo" | "Video";
};

const initialQueue: ReviewItem[] = [
  {
    id: "review-wireframe",
    author: "Mika Santos",
    category: "UI/UX",
    title: "Finished the first wireframe for my portfolio project",
    type: "Photo",
    submitted: "12 min ago",
    status: "approved",
  },
  {
    id: "review-workout",
    author: "Bea Cruz",
    category: "Fitness",
    title: "Showing up for a short workout still counts",
    type: "Text",
    submitted: "38 min ago",
    status: "pending",
  },
  {
    id: "review-javascript",
    author: "Luis Reyes",
    category: "Coding",
    title: "A small JavaScript lesson from today",
    type: "Video",
    submitted: "1 hour ago",
    status: "approved",
  },
];

const filters: ReviewFilter[] = ["All sample posts", "Needs review", "Reviewed"];

function ReviewTypeIcon({ type }: { type: ReviewItem["type"] }) {
  const Icon = {
    Photo: FileImage,
    Text: FileText,
    Video: Play,
  }[type];
  return <Icon size={16} aria-hidden="true" />;
}

export function AdminPage() {
  const [queue, setQueue] = useState(initialQueue);
  const [filter, setFilter] = useState<ReviewFilter>("All sample posts");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

  const pendingCount = queue.filter((item) => item.status === "pending").length;
  const reviewedCount = queue.length - pendingCount;
  const sampleRewardValue = queue
    .filter((item) => item.status === "approved")
    .reduce((total, item) => total + (item.type === "Video" ? 5 : 1), 0);
  const categoryCounts = [...new Set(queue.map((item) => item.category))].map(
    (category) => ({
      category,
      count: queue.filter((item) => item.category === category).length,
    }),
  );
  const maxCategoryPosts = Math.max(
    1,
    ...categoryCounts.map((item) => item.count),
  );
  const visibleQueue = useMemo(() => {
    const search = query.trim().toLowerCase();
    return queue.filter((item) => {
      const matchesStatus =
        filter === "All sample posts" ||
        (filter === "Needs review"
          ? item.status === "pending"
          : item.status !== "pending");
      const matchesSearch =
        !search ||
        `${item.author} ${item.category} ${item.title} ${item.type}`
          .toLowerCase()
          .includes(search);
      return matchesStatus && matchesSearch;
    });
  }, [filter, query, queue]);

  function updateReview(id: string, status: Exclude<ReviewStatus, "pending">) {
    const review = queue.find((item) => item.id === id);
    if (!review) return;
    setQueue((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
    setNotice(
      `${review.author}'s post marked ${status === "approved" ? "approved" : "needs changes"} in this demo only. No reward was issued.`,
    );
  }

  return (
    <div className="admin-console">
      <header className="admin-topbar">
        <div className="admin-topbar__inner">
          <Link className="admin-brand" href="/admin" aria-label="SIKAP admin preview" prefetch={false}>
            <Image
              alt=""
              className="admin-brand__image"
              height={559}
              priority
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/sikap-logo.png`}
              width={1024}
            />
            <span className="admin-brand__label">ADMIN</span>
          </Link>
          <label className="feed-search admin-topbar__search">
            <Search size={18} aria-hidden="true" />
            <input
              aria-label="Search review queue"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search review queue"
              type="search"
              value={query}
            />
          </label>
          <Link className="button button--secondary button--md admin-topbar__back" href="/home" prefetch={false}>
            <ArrowLeft size={16} aria-hidden="true" />
            Back to community
          </Link>
        </div>
      </header>

      <div className="admin-layout">
        <main className="app-page admin-page">
        <header className="app-page__heading">
          <div>
            <p className="eyebrow">
              <ShieldCheck size={15} aria-hidden="true" /> ADMIN PREVIEW
            </p>
            <h1>Admin dashboard</h1>
            <p>Community activity, member snapshots, review queue, and rewards.</p>
          </div>
          <Badge variant="info">Demo data · no real admin access</Badge>
        </header>

        <div className="admin-demo-banner" role="note">
          <AlertTriangle size={17} aria-hidden="true" />
          <p>
            This is a front-end preview only. There is no authentication,
            permission check, AI verification, or live moderation queue.
          </p>
        </div>

        {notice ? (
          <p className="feed-notice" role="status">
            <Check size={15} aria-hidden="true" />
            {notice}
          </p>
        ) : null}

        <nav className="admin-section-nav" aria-label="Admin dashboard sections">
          <a href="#overview">Overview</a>
          <a href="#review-queue">Post review</a>
          <a href="#members">Members</a>
          <a href="#community-pulse">Community pulse</a>
          <a href="#rewards">Rewards</a>
        </nav>

        <section className="admin-dashboard-section" id="overview">
          <div className="admin-section-heading">
            <div>
              <h2>Community overview</h2>
              <p>Current sample totals for this front-end preview.</p>
            </div>
            <span className="app-sample-label">Illustrative data</span>
          </div>
        <section className="admin-metrics" aria-label="Sample community metrics">
          <article className="admin-metric">
            <span className="admin-metric__icon admin-metric__icon--blue" aria-hidden="true">
              <Users size={18} />
            </span>
            <span className="admin-metric__value">248</span>
            <span className="admin-metric__label">Community members</span>
            <small>Sample total</small>
          </article>
          <article className="admin-metric">
            <span className="admin-metric__icon admin-metric__icon--amber" aria-hidden="true">
              <FileText size={18} />
            </span>
            <span className="admin-metric__value">{queue.length}</span>
            <span className="admin-metric__label">Sample posts</span>
            <small>Across {categoryCounts.length} topics</small>
          </article>
          <article className="admin-metric">
            <span className="admin-metric__icon admin-metric__icon--amber" aria-hidden="true">
              <Clock3 size={18} />
            </span>
            <span className="admin-metric__value">{pendingCount}</span>
            <span className="admin-metric__label">Needs review</span>
            <small>{reviewedCount} reviewed in this demo</small>
          </article>
          <article className="admin-metric">
            <span className="admin-metric__icon admin-metric__icon--green" aria-hidden="true">
              <CircleDollarSign size={18} />
            </span>
            <span className="admin-metric__value">₱{sampleRewardValue}</span>
            <span className="admin-metric__label">Sample reward value</span>
            <small>Illustrative only · not issued</small>
          </article>
        </section>
        </section>

        <section className="admin-queue admin-dashboard-section" id="review-queue">
          <div className="app-section-heading">
            <div>
              <h2>Post review queue</h2>
              <p>Read the sample post and record a demo-only decision.</p>
            </div>
            <span className="app-sample-label">Human review preview</span>
          </div>

          <div className="admin-queue__filters" aria-label="Filter review queue">
            {filters.map((option) => (
              <button
                aria-pressed={filter === option}
                className={
                  filter === option
                    ? "goal-filter goal-filter--active"
                    : "goal-filter"
                }
                key={option}
                onClick={() => setFilter(option)}
                type="button"
              >
                {option}
              </button>
            ))}
          </div>

          {visibleQueue.length ? (
            <div className="admin-review-list">
              {visibleQueue.map((item) => (
                <article className="admin-review-card" key={item.id}>
                  <div className="admin-review-card__header">
                    <span className="admin-review-type">
                      <ReviewTypeIcon type={item.type} />
                      {item.type} · {item.category}
                    </span>
                    <span className="admin-review-card__time">{item.submitted}</span>
                  </div>
                  <div>
                    <strong className="admin-review-card__author">{item.author}</strong>
                    <h3>{item.title}</h3>
                  </div>
                  <div className="admin-review-card__footer">
                    {item.status === "pending" ? (
                      <>
                        <Badge variant="info" icon={<Clock3 size={13} />}>
                          Needs human review
                        </Badge>
                        <div className="admin-review-card__actions">
                          <Button
                            onClick={() => updateReview(item.id, "changes")}
                            size="sm"
                            variant="secondary"
                          >
                            Request changes
                          </Button>
                          <Button
                            onClick={() => updateReview(item.id, "approved")}
                            size="sm"
                          >
                            Approve sample
                          </Button>
                        </div>
                      </>
                    ) : (
                      <Badge variant={item.status === "approved" ? "success" : "info"}>
                        {item.status === "approved"
                          ? "Approved in demo"
                          : "Changes requested"}
                      </Badge>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="feed-empty">
              <ShieldCheck size={20} aria-hidden="true" />
              <strong>No sample posts match</strong>
              <span>Try another queue filter or search term.</span>
              <button
                className="landing-text-link"
                onClick={() => {
                  setFilter("All sample posts");
                  setQuery("");
                }}
                type="button"
              >
                Show all sample posts
              </button>
            </div>
          )}
        </section>

        <section className="admin-dashboard-section" id="members">
          <div className="admin-section-heading">
            <div>
              <h2>Member snapshots</h2>
              <p>People represented in the current sample review queue.</p>
            </div>
            <span className="app-sample-label">{queue.length} sample profiles</span>
          </div>
          <div className="admin-member-list">
            {queue.map((item) => (
              <article className="admin-member-card" key={`member-${item.id}`}>
                <span className="admin-member-card__avatar" aria-hidden="true">
                  {item.author.split(" ").map((part) => part[0]).join("")}
                </span>
                <span className="admin-member-card__identity">
                  <strong>{item.author}</strong>
                  <small>{item.category} · Community member</small>
                </span>
                <span className="admin-member-card__post">{item.title}</span>
                <Badge
                  variant={item.status === "approved" ? "success" : "info"}
                >
                  {item.status === "pending"
                    ? "Pending review"
                    : item.status === "approved"
                      ? "Reviewed"
                      : "Changes requested"}
                </Badge>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-insights-grid" id="community-pulse">
          <article className="admin-insight-card">
            <div className="admin-section-heading">
              <div>
                <h2>Community pulse</h2>
                <p>Sample posts by growth topic.</p>
              </div>
              <Users size={17} aria-hidden="true" />
            </div>
            <div className="admin-topic-list">
              {categoryCounts.map(({ category, count }) => (
                <div className="admin-topic-row" key={category}>
                  <span>{category}</span>
                  <span className="admin-topic-row__track">
                    <span
                      style={{
                        width: `${(count / maxCategoryPosts) * 100}%`,
                      }}
                    />
                  </span>
                  <strong>{count}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="admin-insight-card" id="rewards">
            <div className="admin-section-heading">
              <div>
                <h2>Reward guide</h2>
                <p>Simulated examples from approved sample posts.</p>
              </div>
              <Wallet size={17} aria-hidden="true" />
            </div>
            <div className="admin-reward-row">
              <span><FileText size={15} aria-hidden="true" /> Text or photo</span>
              <strong>₱1 · simulated</strong>
            </div>
            <div className="admin-reward-row">
              <span><Play size={15} aria-hidden="true" /> Video</span>
              <strong>₱5 · simulated</strong>
            </div>
            <div className="admin-reward-total">
              <span>Approved sample value</span>
              <strong>₱{sampleRewardValue}</strong>
            </div>
            <p className="admin-reward-note">
              No money is transferred or guaranteed. Demo review actions do not issue rewards.
            </p>
          </article>
        </section>

        <section className="admin-safety-note" id="safety">
          <ShieldCheck size={18} aria-hidden="true" />
          <div>
            <h2>Safety and review</h2>
            <p>
              AI verification, reports, account controls, and moderation services
              are not connected. Sample posts and decisions stay in this page only.
            </p>
          </div>
        </section>
        </main>
        <aside className="admin-side-rail" aria-label="Review guidance">
          <section className="rail-section admin-rail">
            <div className="rail-heading">
              <h2>Review principles</h2>
              <ShieldCheck size={16} aria-hidden="true" />
            </div>
            <p className="rail-caption">
              AI is not proof of effort. This queue is illustrative and has no
              connection to real posts.
            </p>
            <div className="admin-rail__status">
              <span className="admin-status-dot" />
              Manual demo review
            </div>
          </section>
          <section className="rail-note">
            <span className="rail-note__icon" aria-hidden="true">
              <AlertTriangle size={16} />
            </span>
            <p>Review actions do not publish content or trigger simulated rewards.</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
