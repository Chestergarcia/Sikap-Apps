"use client";

import Link from "next/link";
import {
  Activity,
  Bell,
  Check,
  CheckCheck,
  Heart,
  MessageCircle,
  MessageSquareText,
  Sparkles,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app/app-shell";
import { Avatar } from "@/components/ui/avatar";

type NotificationFilter = "All" | "Unread";

type CommunityNotification = {
  detail: string;
  href: string;
  id: string;
  initials: string;
  kind: "comment" | "follow" | "goal" | "like" | "review";
  name: string;
  read: boolean;
  time: string;
  title: string;
};

const initialNotifications: CommunityNotification[] = [
  {
    id: "notif-comment",
    kind: "comment",
    name: "Jules Tan",
    initials: "JT",
    title: "Jules left an encouraging comment",
    detail: "“Starting with the empty states is such a useful reminder.”",
    time: "15 min ago",
    href: "/home#post-mika-wireframes",
    read: false,
  },
  {
    id: "notif-like",
    kind: "like",
    name: "Ana Dizon",
    initials: "AD",
    title: "Ana liked your progress update",
    detail: "A small JavaScript lesson from today",
    time: "1 hour ago",
    href: "/home",
    read: false,
  },
  {
    id: "notif-review",
    kind: "review",
    name: "SIKAP",
    initials: "SK",
    title: "Your sample post is still pending review",
    detail: "No reward is added while a post is pending.",
    time: "3 hours ago",
    href: "/home",
    read: true,
  },
  {
    id: "notif-follow",
    kind: "follow",
    name: "Marco Lim",
    initials: "ML",
    title: "Marco started following your journey",
    detail: "Learning JavaScript · sharing small projects",
    time: "Yesterday",
    href: "/profile",
    read: true,
  },
  {
    id: "notif-goal",
    kind: "goal",
    name: "Your progress tracker",
    initials: "AR",
    title: "A little progress still counts",
    detail: "Your next step: test the first wireframe with two people.",
    time: "Yesterday",
    href: "/progress",
    read: true,
  },
];

const filters: NotificationFilter[] = ["All", "Unread"];

function NotificationIcon({ kind }: { kind: CommunityNotification["kind"] }) {
  const Icon = {
    comment: MessageCircle,
    follow: Users,
    goal: Activity,
    like: Heart,
    review: MessageSquareText,
  }[kind];

  return <Icon size={16} aria-hidden="true" />;
}

export function NotificationsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<NotificationFilter>("All");
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const visibleNotifications = useMemo(() => {
    const search = query.trim().toLowerCase();
    return notifications.filter((notification) => {
      const matchesFilter = filter === "All" || !notification.read;
      const matchesSearch =
        !search ||
        `${notification.name} ${notification.title} ${notification.detail}`
          .toLowerCase()
          .includes(search);
      return matchesFilter && matchesSearch;
    });
  }, [filter, notifications, query]);

  function markRead(id: string) {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    );
  }

  function markAllRead() {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true })),
    );
  }

  return (
    <AppShell
      activePage="notifications"
      onSearchChange={setQuery}
      rightRail={
        <>
          <section className="rail-section notification-summary">
            <div className="rail-heading">
              <h2>Your notifications</h2>
              <Bell size={16} aria-hidden="true" />
            </div>
            <p className="rail-caption">A local preview of community activity.</p>
            <div className="notification-summary__count">
              <strong>{unreadCount}</strong>
              <span>unread sample {unreadCount === 1 ? "update" : "updates"}</span>
            </div>
          </section>
          <section className="rail-note">
            <span className="rail-note__icon" aria-hidden="true">
              <Sparkles size={16} />
            </span>
            <p>Notification changes are page-only and reset when you leave or refresh.</p>
          </section>
        </>
      }
      searchValue={query}
    >
      <div className="app-page notifications-page">
        <header className="app-page__heading">
          <div>
            <p className="eyebrow">
              <Bell size={15} aria-hidden="true" /> COMMUNITY UPDATES
            </p>
            <h1>Notifications</h1>
            <p>Encouragement and progress updates from your demo community.</p>
          </div>
          <button
            className="button button--secondary button--md"
            disabled={unreadCount === 0}
            onClick={markAllRead}
            type="button"
          >
            <CheckCheck size={16} aria-hidden="true" />
            Mark all as read
          </button>
        </header>

        <section className="notification-center">
          <div className="notification-center__heading">
            <div className="notification-filters" aria-label="Filter notifications">
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
                  {option === "Unread" ? ` (${unreadCount})` : ""}
                </button>
              ))}
            </div>
            <span className="app-sample-label">Illustrative activity</span>
          </div>

          {visibleNotifications.length ? (
            <div className="notification-list">
              {visibleNotifications.map((notification) => (
                <article
                  className={
                    notification.read
                      ? "notification-item"
                      : "notification-item notification-item--unread"
                  }
                  key={notification.id}
                >
                  <span className={`notification-item__icon notification-item__icon--${notification.kind}`} aria-hidden="true">
                    <NotificationIcon kind={notification.kind} />
                  </span>
                  <Avatar
                    initials={notification.initials}
                    name={notification.name}
                    size="sm"
                  />
                  <div className="notification-item__content">
                    <Link
                      className="notification-item__link"
                      href={notification.href}
                      onClick={() => markRead(notification.id)}
                    >
                      <strong>{notification.title}</strong>
                      <span>{notification.detail}</span>
                    </Link>
                    <time>{notification.time}</time>
                  </div>
                  <div className="notification-item__actions">
                    {!notification.read ? (
                      <span className="notification-unread-dot" aria-label="Unread" />
                    ) : null}
                    <button
                      aria-label={
                        notification.read
                          ? `Mark ${notification.title} as unread`
                          : `Mark ${notification.title} as read`
                      }
                      className="notification-item__toggle"
                      onClick={() => {
                        setNotifications((current) =>
                          current.map((item) =>
                            item.id === notification.id
                              ? { ...item, read: !item.read }
                              : item,
                          ),
                        );
                      }}
                      type="button"
                    >
                      {notification.read ? "Unread" : <Check size={15} aria-hidden="true" />}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="feed-empty">
              <Bell size={20} aria-hidden="true" />
              <strong>No notifications here</strong>
              <span>Try the other filter or a different search.</span>
              <button
                className="landing-text-link"
                onClick={() => {
                  setFilter("All");
                  setQuery("");
                }}
                type="button"
              >
                Show all updates
              </button>
            </div>
          )}
        </section>

        <p className="notifications-demo-note">
          These are sample notifications. There are no live accounts or community
          events connected.
        </p>
      </div>
    </AppShell>
  );
}
