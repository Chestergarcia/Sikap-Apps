"use client";

import { Check, Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  function applyTheme(theme: Theme) {
    window.localStorage.setItem("sikap-theme", theme);
    document.querySelectorAll<HTMLElement>(".feed-app, .admin-console").forEach((app) => {
      app.dataset.theme = theme;
    });
    document.querySelectorAll<HTMLButtonElement>("[data-theme-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme));
    });
    setIsOpen(false);
  }

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("sikap-theme");
    const nextTheme: Theme = savedTheme === "dark" ? "dark" : "light";
    document.querySelectorAll<HTMLElement>(".feed-app, .admin-console").forEach((app) => {
      app.dataset.theme = nextTheme;
    });
    document.querySelectorAll<HTMLButtonElement>("[data-theme-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === nextTheme));
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const activeTheme = document.querySelector<HTMLElement>(".feed-app, .admin-console")?.dataset.theme ?? "light";
    document.querySelectorAll<HTMLButtonElement>("[data-theme-choice]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.themeChoice === activeTheme));
    });
    function closeMenu(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div className="theme-toggle-wrap" ref={menuRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Choose light or dark mode"
        className="theme-toggle"
        onClick={() => setIsOpen((open) => !open)}
        title="Choose light or dark mode"
        type="button"
      >
        <Moon size={18} aria-hidden="true" />
        <span>Theme</span>
      </button>
      {isOpen ? (
        <div className="theme-toggle-menu" role="group" aria-label="Choose color mode">
          <button aria-pressed="false" className="theme-mode-choice" data-theme-choice="light" onClick={() => applyTheme("light")} type="button">
            <Sun size={17} aria-hidden="true" /> Light <Check size={15} aria-hidden="true" />
          </button>
          <button aria-pressed="false" className="theme-mode-choice" data-theme-choice="dark" onClick={() => applyTheme("dark")} type="button">
            <Moon size={17} aria-hidden="true" /> Dark <Check size={15} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
