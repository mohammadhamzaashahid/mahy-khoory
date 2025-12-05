export default function ChatLayout({ children, onClose, className = "" }) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 ${className}`}
    >
      <header className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
              Mahy Khoory
            </p>
            <h1 className="text-xl font-semibold text-slate-900">Welcome to the Mahy Khoory intelligent desk.</h1>
            {/* <p className="text-sm text-slate-500">Guided enquiry assistant</p> */}
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200"
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
        </div>

        {/* <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-500">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">
            Secure CRM bridge
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1">
            Guided steps
          </span>
        </div> */}
      </header>

      {children}
    </div>
  );
}
