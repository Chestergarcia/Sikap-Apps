"use client";

import Link from "next/link";
import {
  Award,
  Check,
  Edit3,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { AppShell } from "@/components/app/app-shell";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

type ProfileTab = "Posts" | "Milestones" | "About";

const profilePosts = [
  {
    id: "portfolio-wireframe",
    category: "UI/UX",
    date: "Today",
    title: "Finished the first wireframe for my portfolio project",
    body: "Mapping the empty states helped me understand the full experience before I polished the screens.",
  },
  {
    id: "javascript-arrays",
    category: "Coding",
    date: "2 days ago",
    title: "Finally understood array immutability",
    body: "Writing out each state change made a confusing bug feel manageable.",
  },
  {
    id: "weekly-reflection",
    category: "Learning",
    date: "1 week ago",
    title: "One week of showing up for 20 minutes",
    body: "Short, consistent sessions worked better for me than waiting for a perfect free afternoon.",
  },
];

const milestones = [
  { title: "Choose a portfolio direction", date: "Completed this week", complete: true },
  { title: "Finish the first wireframe", date: "Completed today", complete: true },
  { title: "Get feedback from two people", date: "Next milestone", complete: false },
];

export function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Alex Rivera",
    bio: "Learning UI/UX and web development one small project at a time. Sharing the process as I go.",
    location: "Learning from home",
  });
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ProfileTab>("Posts");
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(profile.name);
  const [draftBio, setDraftBio] = useState(profile.bio);
  const [notice, setNotice] = useState("");

  const filteredPosts = useMemo(() => {
    const search = query.trim().toLowerCase();
    return profilePosts.filter((post) =>
      !search ||
      `${post.title} ${post.body} ${post.category}`.toLowerCase().includes(search),
    );
  }, [query]);

  function openEditor() {
    setDraftName(profile.name);
    setDraftBio(profile.bio);
    setNotice("");
    setIsEditing(true);
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = draftName.trim();
    const bio = draftBio.trim();
    if (!name || !bio) {
      setNotice("Add a name and a short bio before saving.");
      return;
    }
    setProfile((current) => ({ ...current, name, bio }));
    setIsEditing(false);
    setNotice("Profile updated in this demo. Changes reset when you refresh.");
  }

  const initials = profile.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const rail = (
    <>
      <section className="rail-section">
        <div className="rail-heading">
          <h2>Current focus</h2>
          <Sparkles size={16} aria-hidden="true" />
        </div>
        <p className="rail-caption">A sample goal from this profile</p>
        <strong className="profile-rail-goal">Build a portfolio project</strong>
        <ProgressBar label="Goal progress" value={72} />
      </section>
      <section className="rail-note">
        <span className="rail-note__icon" aria-hidden="true"><Award size={16} /></span>
        <p>Milestones describe personal progress, not a competition with other people.</p>
      </section>
    </>
  );

  return (
    <AppShell
      activePage="profile"
      onSearchChange={setQuery}
      rightRail={rail}
      searchValue={query}
    >
      <div className="app-page profile-page">
        <section className="profile-hero">
          <div className="profile-hero__cover" aria-hidden="true" />
          <div className="profile-hero__body">
            <Avatar initials={initials} name={profile.name} size="lg" />
            <div className="profile-hero__identity">
              <div className="profile-hero__title">
                <div>
                  <h1>{profile.name}</h1>
                  <span>@alex.rivera</span>
                </div>
                <Badge variant="info">Demo profile</Badge>
              </div>
              <p>{profile.bio}</p>
              <span className="profile-location"><MapPin size={14} />{profile.location}</span>
            </div>
            <div className="profile-hero__actions">
              <Button onClick={openEditor} variant="secondary">
                <Edit3 size={15} aria-hidden="true" />
                Edit profile
              </Button>
              <Link className="button button--primary" href="/home#compose">
                Share progress
              </Link>
            </div>
          </div>
          <div className="profile-stats">
            <div><strong>24</strong><span>sample posts</span></div>
            <div><strong>32</strong><span>following</span></div>
            <div><strong>6 days</strong><span>current streak</span></div>
            <span className="profile-stats__demo">Illustrative profile data</span>
          </div>
        </section>

        {isEditing ? (
          <form className="profile-edit-form" onSubmit={saveProfile}>
            <div className="app-section-heading">
              <div>
                <h2>Edit profile</h2>
                <p>These changes are local to this demo session.</p>
              </div>
            </div>
            <label>
              <span>Display name</span>
              <input
                maxLength={60}
                onChange={(event) => setDraftName(event.target.value)}
                required
                value={draftName}
              />
            </label>
            <label>
              <span>About you</span>
              <textarea
                maxLength={240}
                onChange={(event) => setDraftBio(event.target.value)}
                required
                rows={3}
                value={draftBio}
              />
            </label>
            <div className="profile-edit-form__actions">
              <Button type="submit">Save changes</Button>
              <Button onClick={() => setIsEditing(false)} variant="ghost">
                Cancel
              </Button>
            </div>
          </form>
        ) : null}
        {notice ? <p className="feed-notice" role="status"><Check size={15} />{notice}</p> : null}

        <div className="profile-tabs" role="tablist" aria-label="Profile sections">
          {(["Posts", "Milestones", "About"] as const).map((tab) => (
            <button
              aria-selected={activeTab === tab}
              className={activeTab === tab ? "profile-tab profile-tab--active" : "profile-tab"}
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "Posts" ? (
          <section className="profile-post-list" role="tabpanel">
            {filteredPosts.map((post) => (
              <article className="profile-post" key={post.id}>
                <div className="profile-post__meta">
                  <Badge variant="info">{post.category}</Badge>
                  <span>{post.date}</span>
                </div>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </article>
            ))}
            {!filteredPosts.length ? (
              <div className="feed-empty">
                <strong>No profile posts found</strong>
                <span>Try another search term.</span>
                <button className="landing-text-link" onClick={() => setQuery("")} type="button">
                  Clear search
                </button>
              </div>
            ) : null}
          </section>
        ) : null}

        {activeTab === "Milestones" ? (
          <section className="milestone-list" role="tabpanel">
            {milestones.map((milestone) => (
              <article className="milestone-item" key={milestone.title}>
                <span className={milestone.complete ? "milestone-item__mark milestone-item__mark--done" : "milestone-item__mark"}>
                  {milestone.complete ? <Check size={16} /> : null}
                </span>
                <span className="milestone-item__copy">
                  <strong>{milestone.title}</strong>
                  <small>{milestone.date}</small>
                </span>
                {milestone.complete ? <Badge variant="success">Complete</Badge> : <Badge variant="info">Next</Badge>}
              </article>
            ))}
          </section>
        ) : null}

        {activeTab === "About" ? (
          <section className="profile-about" role="tabpanel">
            <div>
              <h2>About</h2>
              <p>{profile.bio}</p>
              <span className="profile-location"><MapPin size={14} />{profile.location}</span>
            </div>
            <div>
              <h2>Interests</h2>
              <div className="profile-interests">
                <Badge variant="info">UI/UX</Badge>
                <Badge variant="info">Web development</Badge>
                <Badge variant="info">Learning in public</Badge>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}
