import { useState } from "react";

export default function CountryDropdown({ countries = [], onSubmit, disabled = false }) {
  const [value, setValue] = useState("");
  const canSubmit = Boolean(value) && !disabled;

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit?.(value);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm shadow-slate-900/5 focus-within:border-slate-400 focus-within:ring-1 focus-within:ring-slate-200"
    >
      <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
        Country
      </label>
      <select
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:bg-slate-100"
        value={value}
        disabled={disabled}
        onChange={(event) => setValue(event.target.value)}
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={!canSubmit}
        className={`inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 ${
          canSubmit ? "" : "opacity-40 hover:translate-y-0"
        }`}
      >
        Continue
      </button>
    </form>
  );
}
