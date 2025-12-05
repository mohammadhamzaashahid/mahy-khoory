export default function ChatOptionButtons({ options, onSelect, className = "" }) {
  if (!options?.length) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
