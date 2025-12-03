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
      className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-white/60 to-slate-50 px-5 py-6"
    >
      {messages.map((msg, i) => {
        const isBot = msg.from === "bot";
        const alignment = isBot ? "justify-start" : "justify-end";
        const bubbleClass = isBot
          ? "bg-white text-slate-800 ring-1 ring-slate-100"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30";

        return (
          <article
            key={`${msg.text}-${i}`}
            className={`flex ${alignment} animate-message-in`}
          >
            <div
              className={`max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-sm shadow-slate-900/5 ${bubbleClass}`}
            >
              <p
                className={`text-[11px] font-semibold uppercase tracking-wide ${
                  isBot ? "text-slate-500" : "text-white/80"
                }`}
              >
                {isBot ? "Mahy Concierge" : "You"}
              </p>
              <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed">
                {msg.text}
              </p>
            </div>
          </article>
        );
      })}

      {isTyping && (
        <div className="flex justify-start">
          <div className="max-w-[70%] rounded-3xl bg-white px-4 py-3 ring-1 ring-slate-100">
            <div className="flex gap-1.5">
              <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:.15s]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-slate-400 [animation-delay:.3s]" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
