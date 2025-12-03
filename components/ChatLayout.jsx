export default function ChatLayout({ children, onClose, className = "" }) {
  return (
    <div
      className={`flex h-full flex-col rounded-[28px] border border-white/30 bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-xl ${className}`}
    >
      <header className="relative rounded-t-[28px] border-b border-white/40 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-6 py-5 text-white">
        <div className="pr-10">
          <p className="text-sm font-semibold tracking-wide text-white/80">
            Mahy Khoory
          </p>
          <h1 className="text-xl font-bold">Concierge Support Desk</h1>
          <p className="mt-1 text-sm text-white/60">
            Industry-grade enquiry assistant
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-200">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow shadow-emerald-200 animate-pulse" />
            Live & responding in minutes
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <span className="sr-only">Close enquiry assistant</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </header>

      {children}
    </div>
  );
}
