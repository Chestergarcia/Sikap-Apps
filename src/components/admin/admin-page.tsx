"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CircleDollarSign,
  Clock3,
  Download,
  BarChart3,
  FileImage,
  FileText,
  History,
  LayoutDashboard,
  Menu,
  Play,
  Search,
  ShieldCheck,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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

type ReviewRecord = {
  id: string;
  author: string;
  title: string;
  decision: "approved" | "changes";
  recorded: string;
};

const sampleWeeklyActivity = [
  { day: "Mon", posts: 8 }, { day: "Tue", posts: 12 }, { day: "Wed", posts: 7 },
  { day: "Thu", posts: 15 }, { day: "Fri", posts: 11 }, { day: "Sat", posts: 18 }, { day: "Sun", posts: 15 },
];

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
  const [reviewRecords, setReviewRecords] = useState<ReviewRecord[]>([
    { id: "record-1", author: "Mika Santos", title: "Finished the first wireframe for my portfolio project", decision: "approved", recorded: "Today, 9:42 AM" },
    { id: "record-2", author: "Luis Reyes", title: "A small JavaScript lesson from today", decision: "approved", recorded: "Today, 9:10 AM" },
  ]);
  const [filter, setFilter] = useState<ReviewFilter>("All sample posts");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [sidebarOpen]);

  const pendingCount = queue.filter((item) => item.status === "pending").length;
  const reviewedCount = queue.length - pendingCount;
  const approvalRate = reviewedCount
    ? Math.round((queue.filter((item) => item.status === "approved").length / reviewedCount) * 100)
    : 0;
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
  const visibleMembers = queue.filter((member) =>
    `${member.author} ${member.category} ${member.title} ${member.status}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const visibleRecords = reviewRecords.filter((record) =>
    `${record.author} ${record.title} ${record.decision}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  function updateReview(id: string, status: Exclude<ReviewStatus, "pending">) {
    const review = queue.find((item) => item.id === id);
    if (!review) return;
    setQueue((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    );
    setReviewRecords((current) => [
      { id: `${id}-${Date.now()}`, author: review.author, title: review.title, decision: status, recorded: "Just now" },
      ...current,
    ]);
    setNotice(
      `${review.author}'s post marked ${status === "approved" ? "approved" : "needs changes"} in this demo only. No reward was issued.`,
    );
  }

  function exportReviewRecords() {
    const rows = [["Author", "Post", "Decision", "Recorded"], ...reviewRecords.map((record) => [record.author, record.title, record.decision, record.recorded])];
    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "sikap-demo-review-records.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="admin-console">
      <header className="admin-topbar">
        <div className="admin-topbar__inner">
          <button aria-controls="admin-section-links" aria-expanded={sidebarOpen} aria-label={sidebarOpen ? "Close admin navigation" : "Open admin navigation"} className="admin-mobile-menu" onClick={() => setSidebarOpen((open) => !open)} type="button">
            {sidebarOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
          <Link className="admin-brand" href="/admin" aria-label="SIKAP admin preview" prefetch={false}>
            <Image
              alt=""
              className="admin-brand__image"
              height={268}
              priority
              src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/sikap-logo-cropped.png`}
              width={274}
            />
          </Link>
          <label className="feed-search admin-topbar__search">
            <Search size={18} aria-hidden="true" />
            <input
              aria-label="Search dashboard"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search dashboard"
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
        {sidebarOpen ? <button aria-label="Close admin navigation" className="admin-sidebar__backdrop" onClick={() => setSidebarOpen(false)} type="button" /> : null}
        <aside className={`admin-sidebar${sidebarOpen ? " admin-sidebar--open" : ""}`} aria-label="Admin navigation">
          <p className="admin-sidebar__title">Workspace</p>
          <div className="admin-sidebar__drawer-header"><strong>Menu</strong><button aria-label="Close admin navigation" onClick={() => setSidebarOpen(false)} type="button"><X size={18} aria-hidden="true" /></button></div>
          <nav className="admin-section-nav" id="admin-section-links" aria-label="Admin dashboard sections">
            <a aria-current={activeSection === "overview" ? "page" : undefined} className={activeSection === "overview" ? "is-active" : undefined} href="#overview" onClick={() => { setActiveSection("overview"); setSidebarOpen(false); }}><LayoutDashboard size={17} aria-hidden="true" />Dashboard</a>
            <a aria-current={activeSection === "review-queue" ? "page" : undefined} className={activeSection === "review-queue" ? "is-active" : undefined} href="#review-queue" onClick={() => { setActiveSection("review-queue"); setSidebarOpen(false); }}><FileText size={17} aria-hidden="true" />Content review<span className="admin-sidebar__count">{pendingCount}</span></a>
            <a aria-current={activeSection === "members" ? "page" : undefined} className={activeSection === "members" ? "is-active" : undefined} href="#members" onClick={() => { setActiveSection("members"); setSidebarOpen(false); }}><Users size={17} aria-hidden="true" />Members</a>
            <a aria-current={activeSection === "analytics" ? "page" : undefined} className={activeSection === "analytics" ? "is-active" : undefined} href="#analytics" onClick={() => { setActiveSection("analytics"); setSidebarOpen(false); }}><BarChart3 size={17} aria-hidden="true" />Analytics</a>
            <a aria-current={activeSection === "records" ? "page" : undefined} className={activeSection === "records" ? "is-active" : undefined} href="#records" onClick={() => { setActiveSection("records"); setSidebarOpen(false); }}><History size={17} aria-hidden="true" />Review records</a>
            <a aria-current={activeSection === "community-pulse" ? "page" : undefined} className={activeSection === "community-pulse" ? "is-active" : undefined} href="#community-pulse" onClick={() => { setActiveSection("community-pulse"); setSidebarOpen(false); }}><Users size={17} aria-hidden="true" />Community pulse</a>
            <a aria-current={activeSection === "rewards" ? "page" : undefined} className={activeSection === "rewards" ? "is-active" : undefined} href="#rewards" onClick={() => { setActiveSection("rewards"); setSidebarOpen(false); }}><Wallet size={17} aria-hidden="true" />Rewards</a>
            <a aria-current={activeSection === "safety" ? "page" : undefined} className={activeSection === "safety" ? "is-active" : undefined} href="#safety" onClick={() => { setActiveSection("safety"); setSidebarOpen(false); }}><ShieldCheck size={17} aria-hidden="true" />Safety & review</a>
          </nav>
        </aside>
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
          <article className="admin-metric">
            <span className="admin-metric__icon admin-metric__icon--green" aria-hidden="true"><ShieldCheck size={18} /></span>
            <span className="admin-metric__value">{approvalRate}%</span>
            <span className="admin-metric__label">Approval rate</span>
            <small>Based on reviewed sample posts</small>
          </article>
        </section>
        </section>

        <section className="admin-dashboard-section" id="analytics">
          <div className="admin-section-heading"><div><h2>Analytics</h2><p>Illustrative activity and current review outcomes.</p></div><span className="app-sample-label">Sample data</span></div>
          <div className="admin-analytics-grid">
            <article className="admin-insight-card">
              <div className="admin-section-heading"><div><h3>Post activity</h3><p>Sample posts this week</p></div><BarChart3 size={17} aria-hidden="true" /></div>
              <div className="admin-activity-chart" role="img" aria-label="Illustrative post activity from Monday through Sunday">
                {sampleWeeklyActivity.map(({ day, posts }) => <div className="admin-activity-chart__column" key={day}><strong>{posts}</strong><span style={{ height: `${(posts / 18) * 100}%` }} /><small>{day}</small></div>)}
              </div>
            </article>
            <article className="admin-insight-card">
              <div className="admin-section-heading"><div><h3>Review outcomes</h3><p>Current sample queue</p></div><ShieldCheck size={17} aria-hidden="true" /></div>
              <div className="admin-outcome-row"><span>Approved</span><strong>{queue.filter((item) => item.status === "approved").length}</strong></div>
              <div className="admin-outcome-row"><span>Needs changes</span><strong>{queue.filter((item) => item.status === "changes").length}</strong></div>
              <div className="admin-outcome-row"><span>Pending</span><strong>{pendingCount}</strong></div>
              <p className="admin-reward-note">Updates when a sample post is reviewed. Not live platform analytics.</p>
            </article>
          </div>
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
            {visibleMembers.map((item) => (
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

        <section className="admin-dashboard-section" id="records">
          <div className="admin-section-heading">
            <div><h2>Review records</h2><p>Local demo log of moderation decisions.</p></div>
            <Button onClick={exportReviewRecords} size="sm" variant="secondary"><Download size={15} aria-hidden="true" /> Export CSV</Button>
          </div>
          <div className="admin-records-table-wrap">
            <table className="admin-records-table">
              <thead><tr><th>Member</th><th>Sample post</th><th>Decision</th><th>Recorded</th></tr></thead>
              <tbody>{visibleRecords.map((record) => <tr key={record.id}><td>{record.author}</td><td>{record.title}</td><td><Badge variant={record.decision === "approved" ? "success" : "info"}>{record.decision === "approved" ? "Approved" : "Changes requested"}</Badge></td><td>{record.recorded}</td></tr>)}</tbody>
            </table>
            {!visibleRecords.length ? <p className="admin-reward-note">No sample review records match your search.</p> : null}
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
