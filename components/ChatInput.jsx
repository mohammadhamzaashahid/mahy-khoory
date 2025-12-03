import { useState } from "react";

export default function ChatInput({ placeholder, onSubmit }) {
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const nextValue = value.trim();
    if (!nextValue) return;
    onSubmit(nextValue);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm shadow-slate-900/5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
    >
      <input
        className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      <button
        type="submit"
        aria-label="Send message"
        className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.03] active:scale-95"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </button>
    </form>
  );
}
