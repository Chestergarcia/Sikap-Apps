"use client";

import {
  ArrowRight,
  Compass,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app/app-shell";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const categories = ["All", "UI/UX", "Coding", "Fitness", "Learning"];

const topics = [
  {
    id: "design-systems",
    title: "Design systems, one component at a time",
    category: "UI/UX",
    description: "Share what you are learning about tokens, patterns, and accessible interfaces.",
    participants: "142 sample posts",
    initials: ["MS", "AD", "JT"],
  },
  {
    id: "javascript",
    title: "Learning JavaScript by building",
    category: "Coding",
    description: "Small projects, debugging notes, and lessons from the first line of code.",
    participants: "64 sample posts",
    initials: ["LR", "ML", "KC"],
  },
  {
    id: "movement",
    title: "A gentler 30-day movement habit",
    category: "Fitness",
    description: "Find encouragement for consistent, sustainable movement at your own pace.",
    participants: "86 sample posts",
    initials: ["BC", "JT", "AD"],
  },
  {
    id: "learning-notes",
    title: "Weekly learning notes",
    category: "Learning",
    description: "Reflect on what worked, what did not, and what you want to try next.",
    participants: "38 sample posts",
    initials: ["AR", "MS", "LR"],
  },
];

const people = [
  {
    id: "ana",
    name: "Ana Dizon",
    handle: "@ana.designs",
    focus: "UI/UX · Design systems",
    initials: "AD",
  },
  {
    id: "marco",
    name: "Marco Lim",
    handle: "@marco.learns",
    focus: "Coding · JavaScript",
    initials: "ML",
  },
  {
    id: "jules",
    name: "Jules Tan",
    handle: "@jules.moves",
    focus: "Fitness · Habit building",
    initials: "JT",
  },
];

export function ExplorePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [followedPeople, setFollowedPeople] = useState<string[]>([]);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleTopics = useMemo(
    () =>
      topics.filter((topic) => {
        const matchesCategory =
          activeCategory === "All" || topic.category === activeCategory;
        const matchesQuery =
          !normalizedQuery ||
          `${topic.title} ${topic.category} ${topic.description}`
            .toLowerCase()
            .includes(normalizedQuery);
        return matchesCategory && matchesQuery;
      }),
    [activeCategory, normalizedQuery],
  );
  const visiblePeople = useMemo(
    () =>
      people.filter((person) => {
        const matchesQuery =
          !normalizedQuery ||
          `${person.name} ${person.handle} ${person.focus}`
            .toLowerCase()
            .includes(normalizedQuery);
        const matchesCategory =
          activeCategory === "All" ||
          person.focus.toLowerCase().includes(activeCategory.toLowerCase());
        return matchesQuery && matchesCategory;
      }),
    [activeCategory, normalizedQuery],
  );

  function toggleFollow(personId: string) {
    setFollowedPeople((current) =>
      current.includes(personId)
        ? current.filter((id) => id !== personId)
        : [...current, personId],
    );
  }

  const rail = (
    <>
      <section className="rail-section">
        <div className="rail-heading">
          <h2>Explore by interest</h2>
          <Compass size={16} aria-hidden="true" />
        </div>
        <p className="rail-caption">Choose a starting point</p>
        {categories.slice(1).map((category) => (
          <button
            className="trend-topic"
            key={category}
            onClick={() => setActiveCategory(category)}
            type="button"
          >
            <span><strong>{category}</strong><small>Browse sample posts</small></span>
            <ArrowRight size={15} aria-hidden="true" />
          </button>
        ))}
      </section>
      <section className="rail-note">
        <span className="rail-note__icon" aria-hidden="true"><Heart size={16} /></span>
        <p>Find people who encourage steady effort—not comparison.</p>
      </section>
    </>
  );

  return (
    <AppShell
      activePage="explore"
      onSearchChange={setQuery}
      rightRail={rail}
      searchValue={query}
    >
      <div className="app-page">
        <header className="app-page__heading">
          <div>
            <p className="eyebrow"><Compass size={15} aria-hidden="true" /> COMMUNITY</p>
            <h1>Explore Sikap</h1>
            <p>Find topics to learn from and people to grow alongside.</p>
          </div>
          <Badge variant="info" icon={<Sparkles size={14} />}>Sample community</Badge>
        </header>

        <section className="explore-section">
          <div className="app-section-heading">
            <div>
              <h2>Topics with momentum</h2>
              <p>Use a topic to narrow the feed and find your next learning thread.</p>
            </div>
            <span className="app-sample-label">Illustrative data</span>
          </div>
          <div className="explore-category-tabs" aria-label="Filter topics">
            {categories.map((category) => (
              <button
                aria-pressed={activeCategory === category}
                className={activeCategory === category ? "feed-filter feed-filter--active" : "feed-filter"}
                key={category}
                onClick={() => setActiveCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
          {visibleTopics.length ? (
            <div className="explore-topic-grid">
              {visibleTopics.map((topic) => (
                <article className="explore-topic" key={topic.id}>
                  <div className="explore-topic__meta">
                    <Badge variant="info">{topic.category}</Badge>
                    <span>{topic.participants}</span>
                  </div>
                  <h3>{topic.title}</h3>
                  <p>{topic.description}</p>
                  <div className="explore-topic__footer">
                    <span className="explore-topic__avatars" aria-label="Sample community members">
                      {topic.initials.map((initials, index) => (
                        <Avatar
                          initials={initials}
                          key={`${topic.id}-${initials}`}
                          name={`Sample member ${index + 1}`}
                          size="sm"
                        />
                      ))}
                    </span>
                    <button
                      className="explore-topic__action"
                      onClick={() => setActiveCategory(topic.category)}
                      type="button"
                    >
                      Browse topic <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyExploreState onClear={() => { setQuery(""); setActiveCategory("All"); }} />
          )}
        </section>

        <section className="explore-section explore-people-section">
          <div className="app-section-heading">
            <div>
              <h2>People to learn with</h2>
              <p>Follow a journey that inspires your next small step.</p>
            </div>
            <Users size={18} aria-hidden="true" />
          </div>
          {visiblePeople.length ? (
            <div className="explore-people-list">
              {visiblePeople.map((person) => {
                const isFollowing = followedPeople.includes(person.id);
                return (
                  <article className="explore-person" key={person.id}>
                    <Avatar initials={person.initials} name={person.name} size="lg" />
                    <div className="explore-person__info">
                      <strong>{person.name}</strong>
                      <span>{person.handle}</span>
                      <small>{person.focus}</small>
                    </div>
                    <button
                      aria-pressed={isFollowing}
                      className={isFollowing ? "follow-button follow-button--active" : "follow-button"}
                      onClick={() => toggleFollow(person.id)}
                      type="button"
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyExploreState onClear={() => { setQuery(""); setActiveCategory("All"); }} />
          )}
        </section>
      </div>
    </AppShell>
  );
}

function EmptyExploreState({ onClear }: { onClear: () => void }) {
  return (
    <div className="feed-empty">
      <Compass size={20} aria-hidden="true" />
      <strong>No matches yet</strong>
      <span>Try a different search or category.</span>
      <button className="landing-text-link" onClick={onClear} type="button">
        Clear filters
      </button>
    </div>
  );
}
