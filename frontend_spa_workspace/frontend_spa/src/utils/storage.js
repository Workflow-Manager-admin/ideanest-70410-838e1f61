/* global window */
/**
 * PUBLIC_INTERFACE
 * Loads notes from localStorage. Returns [] on failure or if localStorage is unavailable.
 */
export function loadNotes() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const raw = window.localStorage.getItem("idea-vault-notes");
      return raw ? JSON.parse(raw) : [];
    }
  } catch {
    // Fail gracefully
  }
  return [];
}

/**
 * PUBLIC_INTERFACE
 * Saves notes to localStorage. No-op if localStorage is unavailable.
 */
export function saveNotes(notes) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem("idea-vault-notes", JSON.stringify(notes));
    }
  } catch {
    // Fail gracefully
  }
}
