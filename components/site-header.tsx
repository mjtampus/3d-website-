"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";

export function SiteHeader() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initialDark = stored ? stored === "dark" : prefersDark;
    setDarkMode(initialDark);
    document.documentElement.classList.toggle("dark", initialDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <header className="topbar">
      <nav className="nav">
        <Link className="brand" href="/" aria-label="Home">
          MT.
        </Link>
        <div className="nav-links">
          <Link href="/about">About</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/experience">Experience</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode((value) => !value)}
            aria-label="Toggle theme"
            type="button"
          >
            {darkMode ? (
              <Icon path="M6.76 4.84 4.96 3.05 3.55 4.46l1.79 1.79zm1.5 5.16A4.5 4.5 0 1 1 12.76 15.5 4.5 4.5 0 0 1 8.26 10zm3.5-7v3h2v-3zm8.94 1.46-1.41-1.41-1.79 1.79 1.41 1.41zM19.75 10h-3v2h3zM12 19.75h-2v3h2zm-6.96-1.46-1.79-1.79-1.41 1.41 1.79 1.79zm14.15.38-1.41-1.41-1.79 1.79 1.41 1.41zM10 1.25h2v3h-2zm0 18.5h2v3h-2zM4.25 10h3v2h-3zm15.5 0h3v2h-3z" />
            ) : (
              <Icon path="M21.75 14.5A8.75 8.75 0 0 1 9.5 2.25a1 1 0 0 0-1.24 1.24 7 7 0 0 0 8.26 8.26 1 1 0 0 0 1.24-1.24 8.7 8.7 0 0 1 3.99 3.99Z" />
            )}
          </button>
          <Link className="resume-button" href="/contact">
            Resume
          </Link>
        </div>
      </nav>
    </header>
  );
}
