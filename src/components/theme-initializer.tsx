"use client";

import { useEffect } from "react";

export function ThemeInitializer() {
  useEffect(() => {
    document.documentElement.dataset.theme =
      window.localStorage.getItem("sikap-theme") === "dark" ? "dark" : "light";
  }, []);

  return null;
}
