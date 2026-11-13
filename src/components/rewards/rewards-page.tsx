"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  CircleDollarSign,
  Clock3,
  Info,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";

type RewardFilter = "All activity" | "Added" | "Pending";

const transactions = [
  {
    amount: 5,
    description: "Sample video contribution",
    date: "Nov 12",
    id: "reward-video",
    status: "Added",
    type: "video",
  },
  {
    amount: 1,
    description: "Sample learning post",
    date: "Nov 11",
    id: "reward-post-3",
    status: "Added",
    type: "post",
  },
  {
    amount: 1,
    description: "Sample design progress post",
    date: "Nov 10",
    id: "reward-post-2",
    status: "Added",
    type: "post",
  },
  {
    amount: 1,
    description: "Sample progress post",
    date: "Nov 09",
    id: "reward-post-1",
    status: "Added",
    type: "post",
  },
  {
    amount: 1,
    description: "New text post awaiting review",
    date: "Just now",
    id: "reward-pending",
    status: "Pending",
    type: "post",
  },
] as const;

const filters: RewardFilter[] = ["All activity", "Added", "Pending"];

export function RewardsPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<RewardFilter>("All activity");

  const visibleTransactions = useMemo(() => {
    const search = query.trim().toLowerCase();
    return transactions.filter((transaction) => {
      const matchesFilter =
        activeFilter === "All activity" || transaction.status === activeFilter;
      const matchesSearch =
        !search ||
        `${transaction.description} ${transaction.type} ${transaction.status}`
          .toLowerCase()
          .includes(search);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, query]);

  return (
    <AppShell
      activePage="rewards"
      onSearchChange={setQuery}
      rightRail={
        <>
          <section className="rail-section">
            <div className="rail-heading">
              <h2>About demo rewards</h2>
              <Info size={16} aria-hidden="true" />
            </div>
            <p className="rail-caption">
              Sample values help preview how a future rewards history could look.
            </p>
            <div className="wallet-rail-detail">
              <span>Text or photo post</span>
              <strong>Sample ₱1</strong>
            </div>
            <div className="wallet-rail-detail">
              <span>Video post</span>
              <strong>Sample ₱5</strong>
            </div>
          </section>
          <section className="rail-note">
            <span className="rail-note__icon" aria-hidden="true">
              <Sparkles size={16} />
            </span>
            <p>Keep sharing for your own progress, not for a promised payout.</p>
          </section>
        </>
      }
      searchValue={query}
    >
      <div className="app-page rewards-page">
        <header className="app-page__heading">
          <div>
            <p className="eyebrow">
              <CircleDollarSign size={15} aria-hidden="true" /> DEMO WALLET
            </p>
            <h1>Rewards wallet</h1>
            <p>A clear history of simulated community rewards.</p>
          </div>
          <Badge variant="info">Simulation only</Badge>
        </header>

        <section className="wallet-balance" aria-label="Simulated wallet summary">
          <div className="wallet-balance__heading">
            <span className="wallet-balance__icon" aria-hidden="true">
              <CircleDollarSign size={21} />
            </span>
            <span>Sample balance</span>
            <Badge variant="info">Not withdrawable</Badge>
          </div>
          <strong className="wallet-balance__amount">₱8.00</strong>
          <p>Illustrative only · no money is earned, held, or transferred.</p>
          <div className="wallet-balance__stats">
            <div>
              <span>Added in this example</span>
              <strong>₱8.00</strong>
            </div>
            <div>
              <span>Illustrative pending amount</span>
              <strong>₱1.00</strong>
            </div>
          </div>
        </section>

        <section className="wallet-history">
          <div className="app-section-heading">
            <div>
              <h2>Activity</h2>
              <p>Every amount shown here is sample data for the interface.</p>
            </div>
            <span className="app-sample-label">Demo history</span>
          </div>
          <div className="wallet-filters" aria-label="Filter wallet activity">
            {filters.map((filter) => (
              <button
                aria-pressed={activeFilter === filter}
                className={
                  activeFilter === filter
                    ? "goal-filter goal-filter--active"
                    : "goal-filter"
                }
                key={filter}
                onClick={() => setActiveFilter(filter)}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
          {visibleTransactions.length ? (
            <div className="wallet-transaction-list">
              {visibleTransactions.map((transaction) => (
                <article className="wallet-transaction" key={transaction.id}>
                  <span
                    className={
                      transaction.status === "Pending"
                        ? "wallet-transaction__icon wallet-transaction__icon--pending"
                        : "wallet-transaction__icon"
                    }
                    aria-hidden="true"
                  >
                    {transaction.status === "Pending" ? (
                      <Clock3 size={17} />
                    ) : (
                      <ArrowDownLeft size={17} />
                    )}
                  </span>
                  <span className="wallet-transaction__copy">
                    <strong>{transaction.description}</strong>
                    <small>
                      {transaction.date} · {transaction.type === "video" ? "Video" : "Text"}
                    </small>
                  </span>
                  <span className="wallet-transaction__result">
                    <strong>+₱{transaction.amount.toFixed(2)}</strong>
                    <Badge
                      variant={transaction.status === "Pending" ? "info" : "success"}
                    >
                      {transaction.status === "Pending" ? "Pending sample" : "Added sample"}
                    </Badge>
                  </span>
                </article>
              ))}
            </div>
          ) : (
            <div className="feed-empty">
              <ArrowUpRight size={20} aria-hidden="true" />
              <strong>No matching activity</strong>
              <span>Try another wallet filter or search term.</span>
              <button
                className="landing-text-link"
                onClick={() => {
                  setQuery("");
                  setActiveFilter("All activity");
                }}
                type="button"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <p className="wallet-disclaimer" role="note">
          This is a UI prototype. Sample peso amounts do not represent real
          earnings, a payout promise, or funds available to withdraw.
        </p>
      </div>
    </AppShell>
  );
}
