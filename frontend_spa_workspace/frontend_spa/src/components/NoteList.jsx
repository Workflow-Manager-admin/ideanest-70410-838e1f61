import React, { useState } from "react";
import NoteCard from "./NoteCard";
import "./NoteList.css";

// PUBLIC_INTERFACE
export default function NoteList({ notes, onEdit, onDelete }) {
  const [confirmId, setConfirmId] = useState(null);

  return (
    <section className="note-list">
      {notes.map((note) => (
        <NoteCard
          note={note}
          key={note.id}
          onEdit={() => onEdit(note)}
          onDelete={() => setConfirmId(note.id)}
          confirmDelete={confirmId === note.id}
          cancelDelete={() => setConfirmId(null)}
          doDelete={() => {
            onDelete(note.id);
            setConfirmId(null);
          }}
        />
      ))}
    </section>
  );
}
