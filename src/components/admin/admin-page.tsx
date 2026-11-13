"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Clock3,
  FileImage,
  FileText,
  Play,
  Search,
  ShieldCheck,
  Users,
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
    status: "pending",
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
    status: "pending",
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
          <Link className="admin-brand" href="/admin" aria-label="SIKAP admin preview">
            <Image
              alt=""
              className="admin-brand__image"
              height={559}
              priority
              src="/sikap-logo.png"
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
          <Link className="button button--secondary button--md admin-topbar__back" href="/home">
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
            <h1>Community review</h1>
            <p>Sample moderation tools for a future community team.</p>
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

        <section className="admin-metrics" aria-label="Sample community metrics">
          <article className="admin-metric">
            <span className="admin-metric__icon admin-metric__icon--blue" aria-hidden="true">
              <Users size={18} />
            </span>
            <span className="admin-metric__value">248</span>
            <span className="admin-metric__label">Sample members</span>
            <small>Illustrative total</small>
          </article>
          <article className="admin-metric">
            <span className="admin-metric__icon admin-metric__icon--amber" aria-hidden="true">
              <Clock3 size={18} />
            </span>
            <span className="admin-metric__value">{pendingCount}</span>
            <span className="admin-metric__label">Sample posts to review</span>
            <small>Local queue only</small>
          </article>
          <article className="admin-metric">
            <span className="admin-metric__icon admin-metric__icon--green" aria-hidden="true">
              <Check size={18} />
            </span>
            <span className="admin-metric__value">{reviewedCount}</span>
            <span className="admin-metric__label">Reviewed in this demo</span>
            <small>Resets when you leave</small>
          </article>
        </section>

        <section className="admin-queue">
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
