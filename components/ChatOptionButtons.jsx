export default function ChatOptionButtons({ options, onSelect }) {
  if (!options) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition group-hover:bg-blue-500" />
          {option}
        </button>
      ))}
    </div>
  );
}
