import React, { useEffect, useRef, useState } from "react";
import TagInput from "./TagInput";
import "./NoteForm.css";

const blank = {
  title: "",
  text: "",
  tags: [],
  important: false,
};

// PUBLIC_INTERFACE
export default function NoteForm({ onSave, editingNote, onCancel, allTags }) {
  const [form, setForm] = useState(blank);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const firstRef = useRef();

  useEffect(() => {
    if (editingNote) {
      setForm(editingNote);
      setShow(true);
    } else {
      setForm(blank);
      setShow(false);
    }
    setError("");
  }, [editingNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title && !form.text) {
      setError("Please enter some text or a title.");
      return;
    }
    onSave(form);
    setForm(blank);
    setShow(false);
    setError("");
  };

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((old) => ({
      ...old,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleTagChange(tags) {
    setForm((old) => ({ ...old, tags }));
  }

  return (
    <form className="note-form" onSubmit={handleSubmit} autoComplete="off">
      <input
        ref={firstRef}
        className="note-input title"
        name="title"
        placeholder="Title (optional)"
        value={form.title}
        maxLength={80}
        onChange={handleChange}
        autoFocus
      />
      <textarea
        className="note-input text"
        name="text"
        placeholder="What's your idea?"
        value={form.text}
        maxLength={800}
        rows={3}
        onChange={handleChange}
        style={{ resize: "vertical" }}
      />
      <div className="form-row">
        <TagInput
          value={form.tags}
          onChange={handleTagChange}
          allTags={allTags}
        />
        <label className="important-label" title="Mark as important">
          <input
            type="checkbox"
            name="important"
            checked={!!form.important}
            onChange={handleChange}
          />
          <span className="star">{form.important ? "★" : "☆"}</span> Important
        </label>
        <button
          className="btn-save"
          type="submit"
          aria-label={editingNote ? "Save changes" : "Add note"}
        >
          {editingNote ? "Save" : "Add"}
        </button>
        {editingNote && (
          <button
            className="btn-cancel"
            type="button"
            onClick={() => {
              setForm(blank);
              onCancel();
            }}
          >
            Cancel
          </button>
        )}
      </div>
      {!!error && <div className="form-error">{error}</div>}
    </form>
  );
}
