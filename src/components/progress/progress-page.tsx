"use client";

import {
  Activity,
  Check,
  Flame,
  Plus,
  Target,
  TrendingUp,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

type GoalStatus = "All goals" | "In progress" | "Completed";

type Goal = {
  category: string;
  id: string;
  milestone: string;
  progress: number;
  title: string;
  target: string;
};

const initialGoals: Goal[] = [
  {
    id: "portfolio",
    title: "Build a portfolio project",
    category: "UI/UX",
    progress: 72,
    milestone: "Test the first wireframe with two people",
    target: "By the end of the month",
  },
  {
    id: "javascript",
    title: "Learn JavaScript fundamentals",
    category: "Coding",
    progress: 48,
    milestone: "Build a small interactive page",
    target: "Keep going at your own pace",
  },
  {
    id: "movement",
    title: "Move a little every week",
    category: "Fitness",
    progress: 100,
    milestone: "Completed this month",
    target: "Small steps count",
  },
];

const initialActivity = [
  { id: "activity-1", title: "Completed a 20-minute learning session", time: "Today" },
  { id: "activity-2", title: "Updated portfolio wireframe", time: "Yesterday" },
  { id: "activity-3", title: "Finished the weekly reflection", time: "3 days ago" },
];

export function ProgressPage() {
  const [goals, setGoals] = useState(initialGoals);
  const [activities, setActivities] = useState(initialActivity);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<GoalStatus>("All goals");
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [goalTitle, setGoalTitle] = useState("");
  const [goalCategory, setGoalCategory] = useState("Learning");
  const [notice, setNotice] = useState("");

  const filteredGoals = useMemo(() => {
    const search = query.trim().toLowerCase();
    return goals.filter((goal) => {
      const matchesSearch =
        !search ||
        `${goal.title} ${goal.category} ${goal.milestone}`
          .toLowerCase()
          .includes(search);
      const matchesStatus =
        statusFilter === "All goals" ||
        (statusFilter === "Completed" ? goal.progress === 100 : goal.progress < 100);
      return matchesSearch && matchesStatus;
    });
  }, [goals, query, statusFilter]);

  const completedCount = goals.filter((goal) => goal.progress === 100).length;
  const activeCount = goals.length - completedCount;

  function addGoal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = goalTitle.trim();
    if (!title) {
      setNotice("Enter a goal name before adding it.");
      return;
    }

    setGoals((current) => [
      { id: `goal-${Date.now()}`, title, category: goalCategory, progress: 0, milestone: "Choose your first small step", target: "No deadline set" },
      ...current,
    ]);
    setGoalTitle("");
    setIsAddingGoal(false);
    setStatusFilter("All goals");
    setQuery("");
    setNotice("Goal added in this demo. It will reset when you refresh.");
  }

  function logStep(goalId: string) {
    const goal = goals.find((item) => item.id === goalId);
    if (!goal || goal.progress >= 100) return;

    const nextProgress = Math.min(goal.progress + 10, 100);
    setGoals((current) =>
      current.map((item) =>
        item.id === goalId
          ? {
              ...item,
              progress: nextProgress,
              milestone: nextProgress === 100 ? "Goal completed" : item.milestone,
            }
          : item,
      ),
    );
    setActivities((current) => [
      { id: `activity-${Date.now()}`, title: `Logged a step toward “${goal.title}”`, time: "Just now" },
      ...current,
    ]);
    setNotice(`Progress logged for “${goal.title}”. This update is local to the demo.`);
  }

  const rail = (
    <>
      <section className="rail-section progress-summary">
        <div className="rail-heading">
          <h2>This is your pace</h2>
          <TrendingUp size={17} aria-hidden="true" />
        </div>
        <p className="rail-caption">A private snapshot of the goals you are tracking.</p>
        <div className="progress-summary__stats">
          <div><strong>{activeCount}</strong><span>in progress</span></div>
          <div><strong>{completedCount}</strong><span>completed</span></div>
        </div>
        <div className="progress-summary__streak">
          <Flame size={17} aria-hidden="true" />
          <span><strong>6 days</strong><small>sample consistency streak</small></span>
        </div>
      </section>
      <section className="rail-note">
        <span className="rail-note__icon" aria-hidden="true"><Target size={16} /></span>
        <p>Progress is a personal record. There is no penalty for changing your pace.</p>
      </section>
    </>
  );

  return (
    <AppShell
      activePage="progress"
      onSearchChange={setQuery}
      rightRail={rail}
      searchValue={query}
    >
      <div className="app-page progress-page">
        <header className="app-page__heading">
          <div>
            <p className="eyebrow"><Activity size={15} aria-hidden="true" /> YOUR JOURNEY</p>
            <h1>Progress tracker</h1>
            <p>Keep your goals visible. Count the steps that got you here.</p>
          </div>
          <Button onClick={() => { setIsAddingGoal((open) => !open); setNotice(""); }}>
            <Plus size={16} aria-hidden="true" />
            {isAddingGoal ? "Close form" : "New goal"}
          </Button>
        </header>

        {isAddingGoal ? (
          <form className="goal-form" onSubmit={addGoal}>
            <div className="app-section-heading">
              <div>
                <h2>Start with one clear goal</h2>
                <p>Keep it small enough to work on this week.</p>
              </div>
            </div>
            <div className="goal-form__fields">
              <label>
                <span>Goal name</span>
                <input
                  maxLength={90}
                  onChange={(event) => setGoalTitle(event.target.value)}
                  placeholder="What would you like to work toward?"
                  required
                  value={goalTitle}
                />
              </label>
              <label>
                <span>Area</span>
                <select
                  onChange={(event) => setGoalCategory(event.target.value)}
                  value={goalCategory}
                >
                  <option>UI/UX</option>
                  <option>Coding</option>
                  <option>Fitness</option>
                  <option>Learning</option>
                </select>
              </label>
            </div>
            <div className="goal-form__actions">
              <Button type="submit">Add goal</Button>
              <Button onClick={() => setIsAddingGoal(false)} variant="ghost" type="button">
                Cancel
              </Button>
            </div>
          </form>
        ) : null}

        {notice ? <p className="feed-notice" role="status"><Check size={15} />{notice}</p> : null}

        <section className="progress-overview" aria-label="Goal overview">
          <div>
            <span className="progress-overview__icon"><Target size={18} /></span>
            <strong>{goals.length}</strong>
            <span>goals tracked</span>
          </div>
          <div>
            <span className="progress-overview__icon progress-overview__icon--green"><Check size={18} /></span>
            <strong>{completedCount}</strong>
            <span>milestones completed</span>
          </div>
          <div>
            <span className="progress-overview__icon progress-overview__icon--warm"><Flame size={18} /></span>
            <strong>6 days</strong>
            <span>sample streak</span>
          </div>
        </section>

        <section className="goal-list-section">
          <div className="app-section-heading">
            <div>
              <h2>Your goals</h2>
              <p>Pick one next step; the rest can wait.</p>
            </div>
            <div className="goal-filters" aria-label="Filter goals">
              {(["All goals", "In progress", "Completed"] as const).map((filter) => (
                <button
                  aria-pressed={statusFilter === filter}
                  className={statusFilter === filter ? "goal-filter goal-filter--active" : "goal-filter"}
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {filteredGoals.length ? (
            <div className="goal-list">
              {filteredGoals.map((goal) => {
                const isComplete = goal.progress === 100;
                return (
                  <article className="goal-card" key={goal.id}>
                    <div className="goal-card__top">
                      <Badge variant={isComplete ? "success" : "info"}>{goal.category}</Badge>
                      {isComplete ? <Badge variant="success" icon={<Check size={13} />}>Complete</Badge> : <span className="goal-card__target">{goal.target}</span>}
                    </div>
                    <h3>{goal.title}</h3>
                    <ProgressBar label="Overall progress" value={goal.progress} />
                    <div className="goal-card__footer">
                      <span><strong>Next step</strong>{goal.milestone}</span>
                      <Button
                        disabled={isComplete}
                        onClick={() => logStep(goal.id)}
                        size="sm"
                        variant={isComplete ? "secondary" : "primary"}
                      >
                        {isComplete ? "Completed" : "Log a step"}
                      </Button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="feed-empty">
              <Target size={20} aria-hidden="true" />
              <strong>No goals match</strong>
              <span>Try a different search or status filter.</span>
              <button
                className="landing-text-link"
                onClick={() => { setQuery(""); setStatusFilter("All goals"); }}
                type="button"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="activity-section">
          <div className="app-section-heading">
            <div>
              <h2>Recent steps</h2>
              <p>Your progress log, in your own words.</p>
            </div>
          </div>
          <div className="activity-list">
            {activities.slice(0, 5).map((activity) => (
              <article className="activity-item" key={activity.id}>
                <span className="activity-item__marker"><Check size={13} /></span>
                <p>{activity.title}</p>
                <time>{activity.time}</time>
              </article>
            ))}
          </div>
          <p className="progress-demo-note">
            Goal changes and activity are demo-only and will reset on refresh.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
