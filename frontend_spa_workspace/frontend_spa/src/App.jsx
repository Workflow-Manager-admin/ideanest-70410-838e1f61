import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import { loadNotes, saveNotes } from "./utils/storage";
import "./App.css";

// Colors and theme context
export const ThemeContext = React.createContext({
  theme: "light",
  toggle: () => {},
});

// PUBLIC_INTERFACE
export default function App() {
  // notes: {id, title, text, tags[], important, created, updated}
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [importantOnly, setImportantOnly] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [theme, setTheme] = useState(
    () => window.localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const allTags = [
    ...new Set(notes.flatMap((note) => note.tags).filter((t) => t)),
  ];

  function addNote(note) {
    setNotes([
      {
        ...note,
        id: Date.now() + Math.random().toString(16),
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
      },
      ...notes,
    ]);
  }

  function updateNote(updated) {
    setNotes((old) =>
      old.map((n) =>
        n.id === updated.id
          ? { ...updated, updated: new Date().toISOString() }
          : n
      )
    );
    setEditingNote(null);
  }

  function removeNote(id) {
    setNotes(notes.filter((n) => n.id !== id));
  }

  function startEdit(note) {
    setEditingNote(note);
  }

  function cancelEdit() {
    setEditingNote(null);
  }

  function handleFilter({ text, tag, important }) {
    setSearch(text);
    setTagFilter(tag);
    setImportantOnly(important);
  }

  // Filter notes for display
  const filteredNotes = notes.filter((n) => {
    const textOk =
      !search ||
      (n.title && n.title.toLowerCase().includes(search.toLowerCase())) ||
      (n.text && n.text.toLowerCase().includes(search.toLowerCase())) ||
      (n.tags && n.tags.some((t) => t && t.toLowerCase().includes(search.toLowerCase())));
    const tagOk = !tagFilter || (n.tags && n.tags.includes(tagFilter));
    const importantOk = !importantOnly || n.important;
    return textOk && tagOk && importantOk;
  });

  return (
    <ThemeContext.Provider
      value={{ theme, toggle: () => setTheme(theme === "light" ? "dark" : "light") }}
    >
      <div className="main-wrap">
        <Header />
        <div className="note-form-area">
          <NoteForm
            onSave={editingNote ? updateNote : addNote}
            editingNote={editingNote}
            onCancel={cancelEdit}
            allTags={allTags}
          />
        </div>
        <div className="filter-bar-area">
          <FilterBar
            onFilter={handleFilter}
            current={{ text: search, tag: tagFilter, important: importantOnly }}
            allTags={allTags}
          />
        </div>
        <NoteList
          notes={filteredNotes}
          onEdit={startEdit}
          onDelete={removeNote}
        />
        {notes.length === 0 && (
          <div className="empty-state">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={48}
                height={48}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{opacity:0.3}}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.75 8.75v9.5a.75.75 0 0 0 .75.75h13a.75.75 0 0 0 .75-.75v-9.5m-15 0 5.582-4.187a2.75 2.75 0 0 1 3.336 0L19.25 8.75m-15 0h15"
                />
              </svg>
            </span>
            <p>No notes yet.<br />Start capturing your ideas!</p>
          </div>
        )}
      </div>
    </ThemeContext.Provider>
  );
}
