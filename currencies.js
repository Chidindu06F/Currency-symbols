// Minimal browser-safe currency assignment used only if this file is loaded in UI runtime
if (typeof window !== "undefined") {
  window.currencies = window.currencies || [];
}
