import React, { useState } from "react";
import "./TagInput.css";

// PUBLIC_INTERFACE
export default function TagInput({ value, onChange, allTags }) {
  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredTags = allTags
    .filter((tag) => tag && tag.toLowerCase().includes(input.toLowerCase()))
    .filter((tag) => value.indexOf(tag) === -1)
    .slice(0, 6);

  const addTag = (tag) => {
    const tagVal = tag.trim();
    if (tagVal && !value.includes(tagVal)) {
      onChange([...value, tagVal]);
      setInput("");
      setShowDropdown(false);
    }
  };

  const removeTag = (idx) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  function handleInputKey(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (input.trim()) {
        addTag(input);
      }
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      removeTag(value.length - 1);
    }
  }

  return (
    <div className="taginput-wrap">
      {value.map((tag, idx) => (
        <span className="tag badge" key={tag}>
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={() => removeTag(idx)}
          >
            ×
          </button>
        </span>
      ))}
      <input
        className="taginput"
        value={input}
        placeholder="tags"
        onFocus={() => setShowDropdown(true)}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleInputKey}
        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
        spellCheck={false}
        maxLength={22}
        autoComplete="off"
        style={{ width: Math.max(60, input.length * 11) }}
      />
      {showDropdown && filteredTags.length > 0 && (
        <div className="tag-dropdown">
          {filteredTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className="tag-option"
              onMouseDown={() => addTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
