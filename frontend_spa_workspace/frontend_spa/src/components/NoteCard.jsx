import React, { useRef } from "react";
import "./NoteCard.css";

// PUBLIC_INTERFACE
export default function NoteCard({
  note,
  onEdit,
  onDelete,
  confirmDelete,
  cancelDelete,
  doDelete,
}) {
  const cardRef = useRef(null);

  return (
    <article
      className={`note-card ${note.important ? "important" : ""}`}
      ref={cardRef}
      tabIndex={0}
      aria-label={note.title || note.text}
    >
      <div className="note-actions">
        <button onClick={onEdit} title="Edit" className="action edit">
          <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
            <path
              d="M6 17.6V21h3.4l10-10a1.9 1.9 0 0 0 0-2.7l-2.7-2.7a1.9 1.9 0 0 0-2.7 0l-10 10z"
              stroke="#64748b"
              strokeWidth={1.5}
            />
          </svg>
        </button>
        <button
          onClick={onDelete}
          title="Delete"
          className="action delete"
          tabIndex={-1}
        >
          <svg width={18} height={18} fill="none" viewBox="0 0 24 24">
            <path
              d="M6 7h12m-8 4v4m4-4v4M5 7V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1M9 10v4m6-4v4M4 7h16"
              stroke="#dc2626"
              strokeWidth={1.6}
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      {confirmDelete && (
        <div className="confirm-delete">
          <div>Delete this note?</div>
          <button className="y" onClick={doDelete}>
            Yes
          </button>
          <button className="n" onClick={cancelDelete}>
            No
          </button>
        </div>
      )}
      <div className="note-content">
        <div className="note-header">
          <span className="note-title">{note.title}</span>
          {note.important && (
            <span className="imp-star" title="Important">
              ★
            </span>
          )}
        </div>
        <div className="note-text">{note.text}</div>
        <div className="note-tags">
          {note.tags &&
            note.tags.map(
              (tag) =>
                tag && (
                  <span className="badge tag" key={tag}>
                    {tag}
                  </span>
                )
            )}
        </div>
      </div>
      <footer>
        <span
          className="timestamp"
          title={`Created at ${new Date(note.created).toLocaleString()}\nLast updated ${new Date(note.updated).toLocaleString()}`}
        >
          {note.updated && note.updated !== note.created ? (
            <>
              <span>Updated {relativeTime(note.updated)} </span>
              <span className="dot" aria-hidden>·</span>
              <span className="created">Created {relativeTime(note.created)}</span>
            </>
          ) : (
            <>Created {relativeTime(note.created)}</>
          )}
        </span>
      </footer>
    </article>
  );
}

function relativeTime(timestamp) {
  const now = Date.now();
  const t = new Date(timestamp).getTime();
  const s = Math.floor((now - t) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hr ago`;
  return new Date(timestamp).toLocaleDateString();
}
