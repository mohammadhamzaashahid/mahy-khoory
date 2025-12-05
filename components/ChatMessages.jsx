import { useEffect, useRef } from "react";

export default function ChatMessages({ messages, isTyping }) {
  const chatRef = useRef(null);

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isTyping]);

  return (
    <section
      ref={chatRef}
      aria-live="polite"
      className="custom-scrollbar flex-1 overflow-y-auto bg-slate-50 px-5 py-6"
    >
      <div className="space-y-4">
        {messages.map((msg, i) => {
          const isBot = msg.from === "bot";
          const alignment = isBot ? "" : "flex-row-reverse";
          const bubbleClass = isBot
            ? "bg-white text-slate-800 border border-slate-100"
            : "bg-slate-900 text-white shadow-lg shadow-slate-900/20";
          const badgeClass = isBot
            ? "bg-slate-200 text-slate-600"
            : "bg-slate-900 text-white";

          return (
            <article
              key={`${msg.text}-${i}`}
              className={`flex items-start gap-3 ${alignment} animate-message-in`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-2xl text-[11px] font-semibold uppercase tracking-wide ${badgeClass}`}
              >
                {isBot ? "MK" : "You"}
              </div>

              <div
                className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm shadow-slate-900/5 ${bubbleClass}`}
              >
                <p
                  className={`text-xs font-semibold ${
                    isBot ? "text-slate-500" : "text-white/80"
                  }`}
                >
                  {isBot ? "Concierge" : "You"}
                </p>
                <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed">
                  {msg.text}
                </p>
              </div>
            </article>
          );
        })}

        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-200 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
              MK
            </div>
            <div className="max-w-[75%] rounded-3xl border border-slate-100 bg-white px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:.3s]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
