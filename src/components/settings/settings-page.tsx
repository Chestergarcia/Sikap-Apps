"use client";

import Link from "next/link";
import {
  Bell,
  Check,
  Eye,
  LockKeyhole,
  Settings,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SettingsState = {
  activityAlerts: boolean;
  discoverableProfile: boolean;
  goalReminders: boolean;
  weeklySummary: boolean;
};

const defaultSettings: SettingsState = {
  activityAlerts: true,
  discoverableProfile: true,
  goalReminders: false,
  weeklySummary: true,
};

function matchesSearch(query: string, value: string) {
  return value.toLowerCase().includes(query.trim().toLowerCase());
}

function SettingOption({
  checked,
  description,
  label,
  onChange,
}: {
  checked: boolean;
  description: string;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="settings-option">
      <span className="settings-option__copy">
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <input
        checked={checked}
        className="settings-option__input"
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span className="settings-option__control" aria-hidden="true" />
    </label>
  );
}

export function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

  const search = query.trim().toLowerCase();
  const showAccount = useMemo(
    () => matchesSearch(search, "account alex rivera profile edit name email"),
    [search],
  );
  const showNotifications = useMemo(
    () => matchesSearch(search, "notifications alerts mentions comments weekly summary goals reminders"),
    [search],
  );
  const showPrivacy = useMemo(
    () => matchesSearch(search, "privacy profile discoverable visibility who can see"),
    [search],
  );
  function updateSetting(key: keyof SettingsState, checked: boolean) {
    setSettings((current) => ({ ...current, [key]: checked }));
    setNotice("");
  }

  function saveSettings() {
    setNotice("Preferences saved in this demo only. Nothing was sent or stored.");
  }

  function resetSettings() {
    setSettings(defaultSettings);
    setNotice("Demo preferences restored to their original values.");
  }

  const hasResults = showAccount || showNotifications || showPrivacy;

  return (
    <AppShell
      activePage="settings"
      onSearchChange={setQuery}
      rightRail={
        <>
          <section className="rail-section">
            <div className="rail-heading">
              <h2>Settings preview</h2>
              <Settings size={16} aria-hidden="true" />
            </div>
            <p className="rail-caption">These preferences live in this page only.</p>
            <div className="settings-rail-row">
              <span>Activity alerts</span>
              <strong>{settings.activityAlerts ? "On" : "Off"}</strong>
            </div>
            <div className="settings-rail-row">
              <span>Profile discovery</span>
              <strong>{settings.discoverableProfile ? "On" : "Off"}</strong>
            </div>
          </section>
          <section className="rail-note">
            <span className="rail-note__icon" aria-hidden="true">
              <LockKeyhole size={16} />
            </span>
            <p>Demo controls do not change a real account or data privacy.</p>
          </section>
        </>
      }
      searchValue={query}
    >
      <div className="app-page settings-page">
        <header className="app-page__heading">
          <div>
            <p className="eyebrow">
              <Settings size={15} aria-hidden="true" /> YOUR PREFERENCES
            </p>
            <h1>Settings</h1>
            <p>Shape your SIKAP experience in this local demo.</p>
          </div>
          <Badge variant="info">Local demo</Badge>
        </header>

        {notice ? (
          <p className="feed-notice" role="status">
            <Check size={15} aria-hidden="true" />
            {notice}
          </p>
        ) : null}

        {!hasResults ? (
          <div className="feed-empty">
            <Settings size={20} aria-hidden="true" />
            <strong>No settings match</strong>
            <span>Try searching for account, privacy, or notifications.</span>
            <button className="landing-text-link" onClick={() => setQuery("")} type="button">
              Clear search
            </button>
          </div>
        ) : null}

        {showAccount ? (
          <section className="settings-card">
            <div className="settings-card__heading">
              <span className="settings-card__icon" aria-hidden="true">
                <UserRound size={18} />
              </span>
              <div>
                <h2>Account</h2>
                <p>Profile details for the sample account.</p>
              </div>
            </div>
            <div className="settings-account">
              <div>
                <span>Display name</span>
                <strong>Alex Rivera</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>alex@example.test</strong>
              </div>
              <Link className="button button--secondary button--md" href="/profile" prefetch={false}>
                Edit public profile
              </Link>
            </div>
            <p className="settings-card__note">
              This example address is not a real account contact.
            </p>
          </section>
        ) : null}

        {showNotifications ? (
          <section className="settings-card">
            <div className="settings-card__heading">
              <span className="settings-card__icon" aria-hidden="true">
                <Bell size={18} />
              </span>
              <div>
                <h2>Notifications</h2>
                <p>Choose which sample updates you would like to see.</p>
              </div>
            </div>
            <div className="settings-options">
              <SettingOption
                checked={settings.activityAlerts}
                description="Likes and encouraging comments on your progress."
                label="Activity alerts"
                onChange={(checked) => updateSetting("activityAlerts", checked)}
              />
              <SettingOption
                checked={settings.weeklySummary}
                description="A demo recap of your learning activity."
                label="Weekly summary"
                onChange={(checked) => updateSetting("weeklySummary", checked)}
              />
              <SettingOption
                checked={settings.goalReminders}
                description="Gentle reminders about a next step you chose."
                label="Goal reminders"
                onChange={(checked) => updateSetting("goalReminders", checked)}
              />
            </div>
          </section>
        ) : null}

        {showPrivacy ? (
          <section className="settings-card">
            <div className="settings-card__heading">
              <span className="settings-card__icon" aria-hidden="true">
                <Eye size={18} />
              </span>
              <div>
                <h2>Privacy</h2>
                <p>Preview profile visibility controls.</p>
              </div>
            </div>
            <div className="settings-options">
              <SettingOption
                checked={settings.discoverableProfile}
                description="Allow sample members to find this demo profile in Explore."
                label="Discoverable profile"
                onChange={(checked) => updateSetting("discoverableProfile", checked)}
              />
            </div>
            <p className="settings-card__note">
              This switch is illustrative; it does not change the visibility of real data.
            </p>
          </section>
        ) : null}

        {hasResults ? (
          <div className="settings-actions">
            <Button onClick={saveSettings}>
              Save preferences
            </Button>
            <Button onClick={resetSettings} variant="secondary">
              Reset demo preferences
            </Button>
            <span>Changes are temporary and will reset when you leave or refresh.</span>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
