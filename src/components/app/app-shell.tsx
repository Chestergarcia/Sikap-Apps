"use client";

import Link from "next/link";
import {
  Activity,
  Bell,
  Bookmark,
  CircleDollarSign,
  Compass,
  Home,
  Plus,
  Search,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import type { Route } from "next";
import { BrandWordmark } from "@/components/brand-wordmark";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";

type AppPage =
  | "home"
  | "explore"
  | "progress"
  | "profile"
  | "rewards"
  | "notifications"
  | "settings";

type AppShellProps = {
  activePage: AppPage;
  children: ReactNode;
  onSearchChange: (value: string) => void;
  rightRail?: ReactNode;
  searchValue: string;
};

const primaryNavigation: {
  href: string;
  icon: LucideIcon;
  id: AppPage | "create";
  label: string;
}[] = [
  { href: "/home", icon: Home, id: "home", label: "Home feed" },
  { href: "/explore", icon: Compass, id: "explore", label: "Explore" },
  { href: "/home#compose", icon: Plus, id: "create", label: "Share progress" },
  { href: "/progress", icon: Activity, id: "progress", label: "Progress" },
  { href: "/profile", icon: Users, id: "profile", label: "Profile" },
];

const secondaryNavigation: {
  href?: Route;
  icon: LucideIcon;
  id?: AppPage;
  label: string;
}[] = [
  { href: "/rewards", icon: CircleDollarSign, id: "rewards", label: "Rewards wallet" },
  { href: "/notifications", icon: Bell, id: "notifications", label: "Notifications" },
  { icon: Bookmark, label: "Saved posts" },
  { href: "/settings", icon: Settings, id: "settings", label: "Settings" },
];

function SoonItem({
  activePage,
  href,
  icon: Icon,
  id,
  label,
}: {
  activePage: AppPage;
  href?: Route;
  icon: LucideIcon;
  id?: AppPage;
  label: string;
}) {
  if (href && id) {
    return (
      <Link
        aria-current={activePage === id ? "page" : undefined}
        className={`feed-nav-item${activePage === id ? " feed-nav-item--active" : ""}`}
        href={href}
        prefetch={false}
      >
        <span className="feed-nav-item__icon" aria-hidden="true">
          <Icon size={19} />
        </span>
        <span className="feed-nav-item__label">{label}</span>
      </Link>
    );
  }

  return (
    <span className="feed-nav-item feed-nav-item--soon" aria-disabled="true">
      <span className="feed-nav-item__icon" aria-hidden="true">
        <Icon size={19} />
      </span>
      <span className="feed-nav-item__label">{label}</span>
      <span className="feed-nav-item__soon">Soon</span>
    </span>
  );
}

export function AppShell({
  activePage,
  children,
  onSearchChange,
  rightRail,
  searchValue,
}: AppShellProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  return (
    <div className="feed-app">
      <header className="feed-topbar">
        <div className="feed-topbar__inner">
          <Link className="feed-brand" href="/" aria-label="Sikap home" prefetch={false}>
            <BrandWordmark />
          </Link>
          <label className="feed-search">
            <Search size={18} aria-hidden="true" />
            <input
              aria-label="Search Sikap"
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search Sikap"
              ref={searchInputRef}
              type="search"
              value={searchValue}
            />
            <kbd>Ctrl / ⌘ K</kbd>
          </label>
          <div className="feed-topbar__account">
            <ThemeToggle />
            <Link
              aria-label="Rewards wallet"
              className="feed-topbar__shortcut"
              href="/rewards"
              prefetch={false}
              title="Rewards wallet"
            >
              <CircleDollarSign size={19} aria-hidden="true" />
            </Link>
            <Link
              aria-label="Notifications"
              className="feed-topbar__shortcut"
              href="/notifications"
              prefetch={false}
              title="Notifications"
            >
              <Bell size={19} aria-hidden="true" />
            </Link>
            <span className="feed-demo-label">DEMO</span>
          </div>
        </div>
      </header>

      <div className={`feed-layout${rightRail ? "" : " feed-layout--no-rail"}`}>
        <aside className="feed-sidebar" aria-label="Main navigation">
          <div className="feed-sidebar__profile">
            <Avatar initials="AR" name="Alex Rivera" size="lg" />
            <strong>Alex Rivera</strong>
            <span>@alex.rivera</span>
          </div>
          <nav className="feed-nav">
            {primaryNavigation.map(({ href, icon: Icon, id, label }) => (
              <Link
                aria-current={activePage === id ? "page" : undefined}
                className={`feed-nav-item${activePage === id ? " feed-nav-item--active" : ""}`}
                href={href}
                key={id}
                prefetch={false}
              >
                <span className="feed-nav-item__icon" aria-hidden="true">
                  <Icon size={19} />
                </span>
                <span className="feed-nav-item__label">{label}</span>
              </Link>
            ))}
          </nav>
          <div className="feed-sidebar__secondary">
            {secondaryNavigation.map((item) => (
              <SoonItem
                activePage={activePage}
                href={item.href}
                icon={item.icon}
                id={item.id}
                key={item.label}
                label={item.label}
              />
            ))}
          </div>
          <p className="feed-sidebar__footnote">
            Demo workspace · data resets when you refresh.
          </p>
        </aside>

        <main className="feed-main">{children}</main>

        {rightRail ? (
          <aside className="feed-rail" aria-label="Community highlights">
            {rightRail}
          </aside>
        ) : null}
      </div>

      <nav className="feed-mobile-nav" aria-label="Mobile navigation">
        {primaryNavigation
          .filter((item) => item.id !== "create")
          .map(({ href, icon: Icon, id, label }) => (
            <Link
              aria-current={activePage === id ? "page" : undefined}
              className={`feed-mobile-nav__item feed-mobile-nav__item--${id}${activePage === id ? " feed-mobile-nav__item--active" : ""}`}
              href={href}
              key={id}
              prefetch={false}
            >
              <Icon size={19} aria-hidden="true" />
              <span>{id === "home" ? "Home" : label}</span>
            </Link>
          ))}
        <Link
          aria-current={activePage === "settings" ? "page" : undefined}
          className={`feed-mobile-nav__item feed-mobile-nav__item--settings${activePage === "settings" ? " feed-mobile-nav__item--active" : ""}`}
          href="/settings"
          prefetch={false}
        >
          <Settings size={19} aria-hidden="true" />
          <span>More</span>
        </Link>
      </nav>
      <Link
        className="feed-mobile-create-fab"
        href="/home#compose"
        aria-label="Create a post"
        prefetch={false}
      >
        <Plus size={23} aria-hidden="true" />
      </Link>
    </div>
  );
}
