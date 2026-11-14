"use client";

import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Heart,
  ImagePlus,
  MessageCircle,
  Play,
  Search,
  Send,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { AppShell } from "@/components/app/app-shell";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type FeedComment = {
  author: string;
  id: string;
  text: string;
};

type FeedPost = {
  author: string;
  category: string;
  comments: FeedComment[];
  createdAt: string;
  handle: string;
  id: string;
  liked: boolean;
  likes: number;
  media: "design" | "video" | null;
  reviewState: "pending" | "verified-sample";
  text: string;
  title: string;
};

const categories = ["All progress", "UI/UX", "Coding", "Fitness", "Learning"];

const initialPosts: FeedPost[] = [
  {
    id: "mika-wireframes",
    author: "Mika Santos",
    handle: "@mika.builds",
    createdAt: "2 hours ago",
    category: "UI/UX",
    title: "Finished the first wireframe for my portfolio project",
    text: "I started with the messy version instead of trying to make every screen perfect. Mapping the empty states first made the next steps much clearer.",
    likes: 24,
    liked: false,
    comments: [
      {
        id: "mika-comment-1",
        author: "Jules",
        text: "Starting with the empty states is such a useful reminder.",
      },
    ],
    media: "design",
    reviewState: "verified-sample",
  },
  {
    id: "bea-workout",
    author: "Bea Cruz",
    handle: "@bea.moves",
    createdAt: "4 hours ago",
    category: "Fitness",
    title: "Showing up for a short workout still counts",
    text: "I only had twenty minutes today, so I kept the plan simple. The win was keeping the promise I made to myself.",
    likes: 18,
    liked: false,
    comments: [],
    media: null,
    reviewState: "pending",
  },
  {
    id: "luis-learning",
    author: "Luis Reyes",
    handle: "@luis.codes",
    createdAt: "Yesterday",
    category: "Coding",
    title: "A small JavaScript lesson from today",
    text: "I finally understand why my array update was changing the original value. Writing out each step helped more than watching another tutorial.",
    likes: 31,
    liked: false,
    comments: [],
    media: "video",
    reviewState: "verified-sample",
  },
];

const suggestedPeople = [
  { id: "ana", name: "Ana Dizon", handle: "@ana.designs", initials: "AD" },
  { id: "marco", name: "Marco Lim", handle: "@marco.learns", initials: "ML" },
  { id: "jules", name: "Jules Tan", handle: "@jules.moves", initials: "JT" },
];

export function HomeFeed() {
  const [posts, setPosts] = useState(initialPosts);
  const [activeCategory, setActiveCategory] = useState("All progress");
  const [search, setSearch] = useState("");
  const [composerText, setComposerText] = useState("");
  const [composerCategory, setComposerCategory] = useState("Learning");
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [openComments, setOpenComments] = useState<string[]>([]);
  const [followedPeople, setFollowedPeople] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All progress" || post.category === activeCategory;
      const matchesSearch =
        !query ||
        `${post.author} ${post.handle} ${post.category} ${post.title} ${post.text}`
          .toLowerCase()
          .includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, posts, search]);

  function toggleLike(postId: string) {
    setPosts((current) =>
      current.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            }
          : post,
      ),
    );
  }

  function toggleComments(postId: string) {
    setOpenComments((current) =>
      current.includes(postId)
        ? current.filter((id) => id !== postId)
        : [...current, postId],
    );
  }

  function addComment(event: FormEvent<HTMLFormElement>, postId: string) {
    event.preventDefault();
    const text = (commentDrafts[postId] ?? "").trim();
    if (!text) return;

    setPosts((current) =>
      current.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: `${postId}-${Date.now()}`, author: "Alex Rivera", text },
              ],
            }
          : post,
      ),
    );
    setCommentDrafts((current) => ({ ...current, [postId]: "" }));
  }

  function createPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = composerText.trim();
    if (!text) return;

    const post: FeedPost = {
      id: `local-${Date.now()}`,
      author: "Alex Rivera",
      handle: "@alex.rivera",
      createdAt: "Just now",
      category: composerCategory,
      title: `${composerCategory} progress`,
      text,
      likes: 0,
      liked: false,
      comments: [],
      media: null,
      reviewState: "pending",
    };

    setPosts((current) => [post, ...current]);
    setComposerText("");
    setActiveCategory("All progress");
    setSearch("");
    setNotice(
      "Added to this demo feed. It is pending review; no verification or reward has been issued.",
    );
  }

  async function sharePost(postId: string) {
    const url = new URL(window.location.href);
    url.hash = `post-${postId}`;
    try {
      await navigator.clipboard.writeText(url.toString());
      setNotice("Post link copied to clipboard.");
    } catch {
      setNotice("Could not copy the link. You can copy it from the address bar.");
    }
  }

  function toggleFollow(personId: string) {
    setFollowedPeople((current) =>
      current.includes(personId)
        ? current.filter((id) => id !== personId)
        : [...current, personId],
    );
  }

  return (
    <AppShell
      activePage="home"
      onSearchChange={setSearch}
      rightRail={
        <CommunityRail
          followedPeople={followedPeople}
          onCategorySelect={(category) => {
            setActiveCategory(category);
            setSearch("");
          }}
          onFollow={toggleFollow}
        />
      }
      searchValue={search}
    >
          <div className="feed-heading">
            <div>
              <p className="eyebrow">YOUR COMMUNITY · TODAY</p>
              <h1>Your progress feed</h1>
              <p>Small wins, honest lessons, and people moving forward.</p>
            </div>
            <button
              className="feed-heading__filter"
              onClick={() => setActiveCategory("All progress")}
              type="button"
            >
              <span>For you</span>
              <ChevronDown size={15} aria-hidden="true" />
            </button>
          </div>

          <section className="composer" id="compose" aria-label="Create a post">
            <div className="composer__prompt">
              <Avatar initials="AR" name="Alex Rivera" />
              <div>
                <strong>What did you work on today?</strong>
                <span>Share a step, a lesson, or a small win.</span>
              </div>
            </div>
            <form onSubmit={createPost}>
              <label className="sr-only" htmlFor="post-content">Your progress update</label>
              <textarea
                id="post-content"
                maxLength={1000}
                onChange={(event) => setComposerText(event.target.value)}
                placeholder="Today I made progress on..."
                value={composerText}
              />
              <div className="composer__actions">
                <div className="composer__options">
                  <label className="composer-category">
                    <span className="sr-only">Progress category</span>
                    <select
                      onChange={(event) => setComposerCategory(event.target.value)}
                      value={composerCategory}
                    >
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} aria-hidden="true" />
                  </label>
                  <button
                    className="composer-media"
                    disabled
                    title="Photo and video uploads are not connected yet."
                    type="button"
                  >
                    <ImagePlus size={20} aria-hidden="true" />
                    <span>Photo/video later</span>
                  </button>
                </div>
                <button
                  className="button button--primary button--sm composer-submit"
                  disabled={!composerText.trim()}
                  type="submit"
                >
                  Share progress
                  <ArrowUpRight size={15} aria-hidden="true" />
                </button>
              </div>
            </form>
            <p className="composer__note">
              New posts stay pending in this demo. Media uploads and verification are not connected.
            </p>
          </section>

          {notice ? (
            <p className="feed-notice" role="status">
              <Check size={15} aria-hidden="true" />
              {notice}
            </p>
          ) : null}

          <div className="feed-filters" aria-label="Filter feed by progress category">
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

          <div className="feed-post-list" aria-live="polite">
            {filteredPosts.map((post) => {
              const isCommentsOpen = openComments.includes(post.id);
              return (
                <article className="feed-post" id={`post-${post.id}`} key={post.id}>
                  <header className="feed-post__header">
                    <Avatar
                      initials={post.author.split(" ").map((part) => part[0]).join("")}
                      name={post.author}
                    />
                    <div className="feed-post__identity">
                      <strong>{post.author}</strong>
                      <span>{post.handle} · {post.createdAt}</span>
                    </div>
                    <Badge variant={post.category === "Fitness" ? "success" : "info"}>
                      {post.category}
                    </Badge>
                  </header>

                  <div className="feed-post__content">
                    <h2>{post.title}</h2>
                    <p>{post.text}</p>
                  </div>

                  {post.media === "design" ? (
                    <div className="post-media post-media--design" aria-label="Sample UI design preview">
                      <div className="design-sample">
                        <div className="design-sample__sidebar"><i /><i /><i /></div>
                        <div className="design-sample__canvas">
                          <span />
                          <div><i /><i /></div>
                          <div className="design-sample__tiles"><i /><i /><i /></div>
                        </div>
                      </div>
                      <span className="post-media__caption">Sample design preview · illustrative</span>
                    </div>
                  ) : null}
                  {post.media === "video" ? (
                    <div className="post-media post-media--video" aria-label="Sample video preview">
                      <span className="video-play" aria-hidden="true"><Play size={18} fill="currentColor" /></span>
                      <span className="video-caption">Example video preview · no video is playing</span>
                    </div>
                  ) : null}

                  <div className="feed-post__review">
                    {post.reviewState === "verified-sample" ? (
                      <>
                        <Badge variant="success" icon={<Check size={13} />}>Verified sample</Badge>
                        <Badge variant="reward" icon={<CircleDollarSign size={13} />}>
                          Simulated +₱{post.media === "video" ? 5 : 1}
                        </Badge>
                        <span className="feed-post__review-note">Example only</span>
                      </>
                    ) : (
                      <>
                        <Badge variant="info" icon={<Clock3 size={13} />}>Pending review</Badge>
                        <span className="feed-post__review-note">No reward issued</span>
                      </>
                    )}
                  </div>

                  <div className="feed-post__actions">
                    <button
                      aria-label={`${post.liked ? "Unlike" : "Like"} ${post.title}`}
                      aria-pressed={post.liked}
                      className={post.liked ? "post-action post-action--liked" : "post-action"}
                      onClick={() => toggleLike(post.id)}
                      type="button"
                    >
                      <Heart size={17} fill={post.liked ? "currentColor" : "none"} />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      aria-expanded={isCommentsOpen}
                      className="post-action"
                      onClick={() => toggleComments(post.id)}
                      type="button"
                    >
                      <MessageCircle size={17} />
                      <span>{post.comments.length} comments</span>
                    </button>
                    <button
                      className="post-action post-action--share"
                      onClick={() => void sharePost(post.id)}
                      type="button"
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </button>
                  </div>

                  {isCommentsOpen ? (
                    <div className="feed-comments">
                      {post.comments.length ? (
                        <ul>
                          {post.comments.map((comment) => (
                            <li key={comment.id}>
                              <Avatar initials={comment.author.slice(0, 2).toUpperCase()} name={comment.author} size="sm" />
                              <p><strong>{comment.author}</strong> {comment.text}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="feed-comments__empty">No comments yet. Be the first to encourage them.</p>
                      )}
                      <form onSubmit={(event) => addComment(event, post.id)}>
                        <label className="sr-only" htmlFor={`comment-${post.id}`}>Write a comment</label>
                        <input
                          id={`comment-${post.id}`}
                          onChange={(event) => setCommentDrafts((current) => ({ ...current, [post.id]: event.target.value }))}
                          placeholder="Add an encouraging comment..."
                          value={commentDrafts[post.id] ?? ""}
                        />
                        <button
                          aria-label="Send comment"
                          disabled={!(commentDrafts[post.id] ?? "").trim()}
                          type="submit"
                        >
                          <Send size={16} />
                        </button>
                      </form>
                    </div>
                  ) : null}
                </article>
              );
            })}
            {!filteredPosts.length ? (
              <div className="feed-empty">
                <Search size={20} aria-hidden="true" />
                <strong>No progress found</strong>
                <span>Try another topic or clear your search.</span>
                <button
                  className="landing-text-link"
                  onClick={() => { setSearch(""); setActiveCategory("All progress"); }}
                  type="button"
                >
                  Clear filters
                </button>
              </div>
            ) : null}
          </div>
    </AppShell>
  );
}

function CommunityRail({
  followedPeople,
  onCategorySelect,
  onFollow,
}: {
  followedPeople: string[];
  onCategorySelect: (category: string) => void;
  onFollow: (personId: string) => void;
}) {
  return (
    <>
      <section className="rail-section rail-trending">
        <div className="rail-heading">
          <h2>Growing this week</h2>
          <Sparkles size={16} aria-hidden="true" />
        </div>
        <p className="rail-caption">Explore progress by topic</p>
        {[
          { label: "Design systems", posts: "142 posts", category: "UI/UX" },
          { label: "30-day movement", posts: "86 posts", category: "Fitness" },
          { label: "Learning JavaScript", posts: "64 posts", category: "Coding" },
        ].map((topic) => (
          <button
            className="trend-topic"
            key={topic.label}
            onClick={() => onCategorySelect(topic.category)}
            type="button"
          >
            <span>
              <strong>{topic.label}</strong>
              <small>{topic.posts}</small>
            </span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        ))}
      </section>

      <section className="rail-section rail-people">
        <div className="rail-heading">
          <h2>People to learn with</h2>
          <Users size={16} aria-hidden="true" />
        </div>
        <p className="rail-caption">Find your next source of encouragement</p>
        {suggestedPeople.map((person) => {
          const isFollowing = followedPeople.includes(person.id);
          return (
            <div className="suggested-person" key={person.id}>
              <Avatar initials={person.initials} name={person.name} size="sm" />
              <span className="suggested-person__identity">
                <strong>{person.name}</strong>
                <small>{person.handle}</small>
              </span>
              <button
                aria-label={`${isFollowing ? "Unfollow" : "Follow"} ${person.name}`}
                aria-pressed={isFollowing}
                className={isFollowing ? "follow-button follow-button--active" : "follow-button"}
                onClick={() => onFollow(person.id)}
                type="button"
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          );
        })}
      </section>

      <section className="rail-note">
        <ShieldNote />
        <p>
          Verification is a demo placeholder. AI cannot prove a person&apos;s
          effort on its own; uncertain posts need human review.
        </p>
      </section>
      <div className="rail-footer">
        <span>Community guidelines coming soon</span>
      </div>
    </>
  );
}

function ShieldNote() {
  return (
    <span className="rail-note__icon" aria-hidden="true">
      <Check size={16} />
    </span>
  );
}
