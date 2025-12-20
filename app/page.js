"use client";

import { useRef, useState } from "react";
import ChatLayout from "@/components/ChatLayout";
import ChatMessages from "@/components/ChatMessages";
import ChatOptionButtons from "@/components/ChatOptionButtons";
import CountryDropdown from "@/components/CountryDropdown";
import ChatInput from "@/components/ChatInput";
import { FLOW } from "./chatBotFlow";
import Link from "next/link";
import { FiBarChart2 } from "react-icons/fi";
import { COUNTRY_LIST } from "@/lib/countries";


const HERO_FEATURES = [
  "Multi-branch concierge flow that qualifies pump, service, and spare requests in one place.",
  "Lead context packaged for CRM with brand, usage, and site data so teams can act instantly.",
  // "Micro-interactions tuned for enterprise UX patterns, motion safety, and accessibility.",
];

const METRIC_CARDS = [
  // { label: "", value: "42s", helper: "live concierge" },
  { label: "Completion rate", value: "98%", helper: "guided steps" },
  { label: "Availability", value: "24/7", helper: "GCC coverage" },
];

const SUPPORT_PILLARS = [
  {
    title: "Pump projects",
    detail: "Spec-driven questionnaires for new installs, retrofits, or bespoke solutions.",
  },
  {
    title: "Service & maintenance",
    detail: "Emergency flows escalate with location capture and instant engineer alerts.",
  },
  {
    title: "Spare part desk",
    detail: "Exact part, alternates, and urgency logged before it hits the service queue.",
  },
];

export default function Page() {
  const [messages, setMessages] = useState([
    // { from: "bot", text: "Welcome to the Mahy Khoory intelligent desk." },
    { from: "bot", text: FLOW.q1_business.text },
  ]);
  const [current, setCurrent] = useState("q1_business");
  const [answers, setAnswers] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const messagesRef = useRef(null);

  function addBot(text) {
    setMessages((prev) => [...prev, { from: "bot", text }]);
  }

  function addUser(text) {
    setMessages((prev) => [...prev, { from: "user", text }]);
  }

  function saveAnswer(field, value) {
    if (!field) return;

    const questionText = FLOW[current]?.text || "";

    setAnswers((prev) => ({
      ...prev,
      [field]: value,
      _qmap: [
        ...(prev._qmap || []),
        {
          question: questionText,
          answer: value,
        }
      ]
    }));
  }

  async function submitToCRM(payload) {
    try {
      await fetch("https://mahy-backend.vercel.app/api/crm/lead/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          conversation: messages
        }),
      });
    } catch (err) {
      console.error("CRM submit error:", err);
    }
  }


  function handleOptionSelect(option) {
    const question = FLOW[current];
    if (!question) return;

    addUser(option);
    const clean = option.replace(/^[^\w]+ /, "").trim();
    const updatedAnswers = question.field
      ? { ...answers, [question.field]: clean }
      : { ...answers };

    saveAnswer(question.field, clean);

    const nextNode = question.options?.find((o) => o.label === option)?.next;
    progress(nextNode, updatedAnswers);
  }

  function handleTextSubmit(text) {
    const question = FLOW[current];
    if (!question) return;

    addUser(text);
    const payload = question.field ? { ...answers, [question.field]: text } : { ...answers };
    saveAnswer(question.field, text);

    if (question.submit) {
      addBot("Submitting your details...");
      setIsTyping(true);

      setTimeout(async () => {
        await submitToCRM(payload);
        setIsTyping(false);
        addBot("Your enquiry has been submitted successfully. Our specialists will be in touch shortly.");
        setCurrent("done");
      }, 900);

      return;
    }

    progress(question.next, payload);
  }

  function handleCountrySelect(selectedCountry) {
    const question = FLOW[current];
    if (!question) return;

    addUser(selectedCountry);
    const payload = question.field ? { ...answers, [question.field]: selectedCountry } : { ...answers };
    saveAnswer(question.field, selectedCountry);
    progress(question.next, payload);
  }

  function progress(nextKey, contextAnswers = answers) {
    if (!nextKey || !FLOW[nextKey]) {
      setCurrent("done");
      return;
    }

    setIsTyping(true);
    setTimeout(async () => {
      const nextQuestion = FLOW[nextKey];
      addBot(nextQuestion.text);

      if (nextQuestion.submit && nextQuestion.type === "info") {
        await submitToCRM(contextAnswers);
        setIsTyping(false);
        setCurrent("done");
        return;
      }

      setIsTyping(false);
      setCurrent(nextKey);
    }, 650);
  }

  const question = FLOW[current];
  const options = question?.type === "options" ? question.options.map((o) => o.label) : null;
  const isTextStage = question && ["text", "email", "phone"].includes(question.type);
  const isCountryStage = question?.type === "country";
  const canInteract = current !== "done" && !isTyping;
  const prompt = current !== "done" ? question?.text : null;

  function getPlaceholder() {
    if (!question) return "Type your response";
    if (question.field === "acName") return "Enter your answer";
    if (question.field === "acEmail") return "Please enter an email";
    if (question.field === "acPhone") return "Enter your answer";
    if (question.type === "email") return "name@company.com";
    if (question.type === "phone") return "+971 55 123 4567";
    if (question.field === "siteLocation") return "Share the site location";
    if (question.field === "brandName") return "Mention the preferred brand";
    return "Type your response";
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16 lg:flex-row lg:items-start lg:justify-between lg:py-20">
        <section className="max-w-2xl space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Mahy Khoory Concierge desk
          </span>

          <div className="space-y-5">
            <h1 className="text-4xl font-semibold leading-snug text-slate-900 sm:text-5xl">
              We are innovation. We are technology.
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              We at the M.A.H.Y. Khoory Group welcome you. Having begun as a handful of dedicated individuals, we have grown into the massive conglomerate that we are today, with a workforce of over 3100+ employees, and a name that is recognized across the Middle East as leaders in the fields of Water Pumping Solutions, Electrical Solutions, Paper Recycling, and Logistics. We have partnerships with various reputable companies like Grundfos, Eaton, Lister Petter, Kirloskar Chillers.
            </p>
          </div>

          {/* <ul className="space-y-4 text-slate-600">
            {HERO_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm">
                <span className="mt-1 h-2 w-2 rounded-full bg-blue-500/70" />
                <span>{feature}</span>
              </li>
            ))}
          </ul> */}

          {/* <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setIsWidgetOpen(true)}
              className="inline-flex items-center gap-3 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30"
            >
              Launch assistant
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>

            <Link
              href="/pbi-dashboard"
              className="fixed bottom-6 left-6 z-30 flex items-center gap-2 rounded-full bg-blue-600 text-white px-5 py-3 shadow-xl transition hover:-translate-y-0.5"
            >
              <FiBarChart2 size={18} />
              Power BI Reports
            </Link>
          </div> */}


        </section>

        {/* <section className="w-full rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-lg shadow-slate-900/5"> */}
        {/* <div className="grid gap-4 sm:grid-cols-3">
            {METRIC_CARDS.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-5 text-center"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{metric.label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{metric.value}</p>
                <p className="text-xs text-slate-500">{metric.helper}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {SUPPORT_PILLARS.map((pillar) => (
              <article
                key={pillar.title}
                className="rounded-2xl border border-slate-100 bg-slate-50/80 px-5 py-4 text-sm text-slate-600"
              >
                <p className="text-sm font-semibold text-slate-900">{pillar.title}</p>
                <p className="mt-1 text-sm leading-relaxed">{pillar.detail}</p>
              </article>
            ))}
          </div> */}
        {/* </section> */}
      </div>

      {!isWidgetOpen && (
        <button
          type="button"
          onClick={() => setIsWidgetOpen(true)}
          aria-expanded={isWidgetOpen}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-left text-slate-900 shadow-xl shadow-slate-900/10 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20"
        >
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Concierge</p>
            <p className="text-lg font-semibold text-slate-900">Chat with us</p>
          </div>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-inner shadow-slate-600/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
        </button>
      )}

      {isWidgetOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setIsWidgetOpen(false)}
          />

          <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-6 sm:justify-end sm:px-10 sm:pb-10">
            <div className="pointer-events-auto w-full max-w-2xl sm:max-w-xl">
              <ChatLayout onClose={() => setIsWidgetOpen(false)} className="h-[80vh] w-full sm:h-[640px]">
                <ChatMessages ref={messagesRef} messages={messages} isTyping={isTyping} />

                <footer className="space-y-3 border-t border-slate-100 bg-slate-50 px-5 pb-5 pt-4">
                  {prompt && (
                    <p className="text-sm font-semibold text-slate-600">{prompt}</p>
                  )}

                  {canInteract && options && (
                    <ChatOptionButtons
                      className="custom-scrollbar max-h-60 overflow-y-auto pr-1"
                      options={options}
                      onSelect={handleOptionSelect}
                    />
                  )}

                  {canInteract && isCountryStage && (
                    <CountryDropdown
                      countries={COUNTRY_LIST}
                      disabled={!canInteract}
                      onSubmit={handleCountrySelect}
                    />
                  )}

                  {canInteract && isTextStage && (
                    <ChatInput
                      placeholder={getPlaceholder()}
                      onSubmit={handleTextSubmit}
                      disabled={!canInteract}
                    />
                  )}

                  {!canInteract && (
                    <div className="flex flex-col items-center gap-3 text-center text-xs text-slate-500">
                      <p>Conversation completed. Reopen the widget to start again.</p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => messagesRef.current?.scrollToTop?.()}
                          className="rounded-full border border-slate-200 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-700"
                        >
                          View answers
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMessages([
                              // { from: "bot", text: "Welcome to the Mahy Khoory intelligent desk." },
                              { from: "bot", text: FLOW.q1_business.text },
                            ]);
                            setAnswers({});
                            setCurrent("q1_business");
                            setIsTyping(false);
                            messagesRef.current?.scrollToBottom?.();
                          }}
                          className="rounded-full border border-slate-200 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-blue-500"
                        >
                          Enquire More?
                        </button>
                      </div>
                    </div>
                  )}
                </footer>
              </ChatLayout>
            </div>
          </div>
        </>
      )}


    </main>

  );
}
