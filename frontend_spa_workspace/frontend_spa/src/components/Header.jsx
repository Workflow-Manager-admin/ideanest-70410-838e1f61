import React, { useContext } from "react";
import { ThemeContext } from "../App";
import "./Header.css";

// PUBLIC_INTERFACE
export default function Header() {
  const { theme, toggle } = useContext(ThemeContext);

  return (
    <header className="main-header">
      <div className="title-area">
        <span className="logo" aria-label="Idea Vault">
          <svg aria-hidden width={36} height={36} fill="none" viewBox="0 0 24 24"><rect width="100%" height="100%" rx="6" fill="var(--accent)" /><path d="M12 7v5l3 1.5" stroke="var(--on-accent)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/></svg>
        </span>
        <h1 className="title">Idea Vault</h1>
      </div>
      <button
        className="theme-switch"
        onClick={() => toggle()}
        aria-label={`Toggle to ${theme === "dark" ? "light" : "dark"} theme`}
        title={theme === "dark" ? "Light mode" : "Dark mode"}
      >
        {theme === "dark" ? (
          <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
            <path d="M12 2v2M12 20v2M20 12h2M2 12H4M17.66 6.34l1.42-1.42M4.92 19.08l1.42-1.42M17.66 17.66l1.42 1.42M4.92 4.92l1.42 1.42" stroke="var(--primary)" strokeWidth={1.5} />
            <circle cx={12} cy={12} r={5} stroke="var(--primary)" strokeWidth={1.5} />
          </svg>
        ) : (
          <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
            <path d="M20.354 15.354A9 9 0 0 1 8.646 3.646a9.001 9.001 0 1 0 11.708 11.708z" stroke="var(--primary)" strokeWidth={1.5} />
          </svg>
        )}
      </button>
    </header>
  );
}
