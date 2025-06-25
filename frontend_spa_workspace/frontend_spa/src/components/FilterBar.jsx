import React, { useState } from "react";
import "./FilterBar.css";

// PUBLIC_INTERFACE
export default function FilterBar({ onFilter, current, allTags }) {
  const [text, setText] = useState(current.text || "");
  const [tag, setTag] = useState(current.tag || "");
  const [important, setImportant] = useState(current.important || false);

  function handleInput(e) {
    setText(e.target.value);
    onFilter({ text: e.target.value, tag, important });
  }
  function handleTagChange(e) {
    setTag(e.target.value);
    onFilter({ text, tag: e.target.value, important });
  }
  function handleImportant(e) {
    setImportant(e.target.checked);
    onFilter({ text, tag, important: e.target.checked });
  }

  return (
    <div className="filter-bar">
      <input
        className="filter-text"
        placeholder="Search notes, tags..."
        value={text}
        onChange={handleInput}
        aria-label="Search notes"
      />
      <select
        className="filter-select"
        value={tag}
        onChange={handleTagChange}
        aria-label="Filter by tag"
      >
        <option value="">All Tags</option>
        {allTags.map((t) => (
          <option value={t} key={t}>
            {t}
          </option>
        ))}
      </select>
      <label className="important-filter-label" title="Show important only">
        <input
          type="checkbox"
          checked={important}
          onChange={handleImportant}
        />
        <span className="star">{important ? "★" : "☆"}</span> Important
      </label>
    </div>
  );
}
