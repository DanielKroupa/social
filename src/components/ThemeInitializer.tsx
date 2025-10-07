"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    // Načtení tématu z localStorage při prvním načtení na klientovi
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return null;
}
