"use client";

import { useState } from "react";
import ChatLayout from "@/components/ChatLayout";
import ChatMessages from "@/components/ChatMessages";
import ChatOptionButtons from "@/components/ChatOptionButtons";
import ChatInput from "@/components/ChatInput";

// Q1 – Business options
const BUSINESS_OPTIONS = [
  "🔧 Pump",
  "❄️ Air Conditioning",
  "🚿 Water Heater",
  "🪑 Furniture",
  "📄 Corrugated Paper",
  "📦 Corrugated Boxes",
  "🟫 Wooden Pallets",
  "🧴 Plastic Jerry Cans",
  "🚗 Car",
  "🌞 Solar Panel",
];

// Q2 – Pump support type
const PUMP_SUPPORT_OPTIONS = [
  "🆕 New Pump Enquiry",
  "🛠️ Service Related Job",
  "🔩 Spare Parts Enquiry",
  "⚙️ Customized Pump Solution",
];

// New Pump Enquiry → pump types
const PUMP_TYPE_OPTIONS = [
  "🚰 Submersible Pump",
  "🚰 Borewell Pump",
  "🚰 Centrifugal Pump",
  "🚰 Vertical Multistage Pump",
  "🚰 Horizontal End Suction Pump",
  "🚰 Dozing Pump",
  "🚰 Circulation Pump",
  "🚰 High Pressure Pump",
  "🚰 Other",
];

// Usage type
const USAGE_OPTIONS = [
  "🏠 Residential Building Services",
  "🏢 Commercial Building Services",
  "🏭 Industry",
  "💡 Utility",
];

// Installation vs supply
const SUPPLY_OPTIONS = ["🛠️ Installation", "🧰 Only Supply"];

// Yes / No
const YES_NO_OPTIONS = ["✅ Yes", "❌ No"];

// Service Related Job → service type
const SERVICE_TYPE_OPTIONS = [
  "🛠️ Installation",
  "🧰 Repair",
  "📅 Annual Maintenance",
  "🚨 Emergency Breakdown",
  "📍 Site Visit",
];

// Spare Parts Enquiry → spare type
const SPARE_PART_OPTIONS = [
  "⚙️ Mechanical Seal",
  "⚙️ Impeller",
  "⚙️ Others",
];

export default function Page() {
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Welcome to MAHY KHOORY 👋",
    },
    {
      from: "bot",
      text: "Hello! 😀 Please choose the business you need help with -",
    },
  ]);

const [stage, setStage] = useState("q1_business");


  const [isTyping, setIsTyping] = useState(false);

  // Store all answers
  const [answers, setAnswers] = useState({});
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  function addBot(text) {
    setMessages((prev) => [...prev, { from: "bot", text }]);
  }

  function addUser(text) {
    setMessages((prev) => [...prev, { from: "user", text }]);
  }

  // Helper: save answer
  function saveAnswer(key, value) {
    setAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  // ---- MAIN OPTION HANDLER (for button questions) ----
  function handleOptionSelect(option) {
    addUser(option);

    // Strip emoji and space if you want a clean value
    const clean = option.replace(/^[^\w]+ /, "");

    switch (stage) {
      case "q1_business": {
        saveAnswer("business", clean);

        const isPump = clean.toLowerCase().includes("pump");
        if (isPump) {
          // Pump flow
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addBot("What kind of support are you seeking today? 🤝");
            setStage("q2_pump_support");
          }, 500);
        } else {
          // Non-pump flow → we can keep simple: ask location + contact details
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addBot("Please share the site location 📍");
            setStage("q_site_location");
          }, 500);
        }
        break;
      }

      case "q2_pump_support": {
        saveAnswer("pumpSupportType", clean);

        if (clean === "New Pump Enquiry") {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addBot("What type of pump are you looking for?");
            setStage("q3_pump_type");
          }, 500);
        } else if (clean === "Service Related Job") {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addBot("Which type of Service do you need?");
            setStage("q3_service_type");
          }, 500);
        } else if (clean === "Spare Parts Enquiry") {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addBot("Which spare part do you need?");
            setStage("q3_spare_part");
          }, 500);
        } else if (clean === "Customized Pump Solution") {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            addBot("Please mention 📝");
            setStage("q_custom_solution_desc");
          }, 500);
        }
        break;
      }

      case "q3_pump_type": {
        saveAnswer("pumpType", clean);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBot("Is this for residential, commercial, or industrial use?");
          setStage("q4_usage");
        }, 500);
        break;
      }

      case "q4_usage": {
        saveAnswer("usageType", clean);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBot("Do you need installation or just supply?");
          setStage("q5_supply");
        }, 500);
        break;
      }

      case "q5_supply": {
        saveAnswer("supplyType", clean);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBot("Do you prefer a specific brand?");
          setStage("q6_brand_pref");
        }, 500);
        break;
      }

      case "q6_brand_pref": {
        saveAnswer("brandPreference", clean);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          if (clean === "Yes") {
            addBot("Please mention your preferred brand 📝");
            setStage("q7_brand_name");
          } else {
            addBot("Please share the site location 📍");
            setStage("q_site_location");
          }
        }, 500);
        break;
      }

      case "q3_service_type": {
        saveAnswer("serviceType", clean);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBot("Please share the site location 📍");
          setStage("q_site_location");
        }, 500);
        break;
      }

      case "q3_spare_part": {
        saveAnswer("sparePart", clean);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          if (clean === "Others") {
            addBot("Please mention 📝");
            setStage("q_spare_other_desc");
          } else {
            addBot("May I know your name? 😀");
            setStage("q_name");
          }
        }, 500);
        break;
      }

      default:
        break;
    }
  }

  // ---- TEXT ANSWERS (for brand name, "Please mention", name, email, phone, location) ----
  function handleTextSubmit(text) {
    addUser(text);

    switch (stage) {
      case "q7_brand_name": {
        saveAnswer("brandName", text);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBot("Please share the site location 📍");
          setStage("q_site_location");
        }, 500);
        break;
      }

      case "q_custom_solution_desc": {
        saveAnswer("customSolutionDetails", text);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBot("May I know your name? 😀");
          setStage("q_name");
        }, 500);
        break;
      }

      case "q_spare_other_desc": {
        saveAnswer("spareOtherDetails", text);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBot("May I know your name? 😀");
          setStage("q_name");
        }, 500);
        break;
      }

      case "q_site_location": {
        saveAnswer("siteLocation", text);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBot("May I know your name? 😀");
          setStage("q_name");
        }, 500);
        break;
      }

      case "q_name": {
        saveAnswer("name", text);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBot(
            "Can I have your email address to share details with you? 📨"
          );
          setStage("q_email");
        }, 500);
        break;
      }

      case "q_email": {
        saveAnswer("email", text);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBot(
            "Please share your mobile number so our team can assist you instantly. 📞"
          );
          setStage("q_phone");
        }, 500);
        break;
      }

      case "q_phone": {
        saveAnswer("phone", text);

        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBot("Thank you 🙏. Submitting your details now...");
          // TODO: call backend /api/lead with `answers` here
          console.log("Final answers payload:", {
            ...answers,
            phone: text,
          });
          addBot("✔ Your enquiry has been submitted successfully.");
          setStage("done");
        }, 500);
        break;
      }

      default:
        break;
    }
  }

  // ---- Determine what to render at bottom (options or text field) ----
  let optionsToShow = null;
  let isTextStage = false;
  let textPlaceholder = "Enter your answer";

  if (stage === "q1_business") {
    optionsToShow = BUSINESS_OPTIONS;
  } else if (stage === "q2_pump_support") {
    optionsToShow = PUMP_SUPPORT_OPTIONS;
  } else if (stage === "q3_pump_type") {
    optionsToShow = PUMP_TYPE_OPTIONS;
  } else if (stage === "q4_usage") {
    optionsToShow = USAGE_OPTIONS;
  } else if (stage === "q5_supply") {
    optionsToShow = SUPPLY_OPTIONS;
  } else if (stage === "q6_brand_pref") {
    optionsToShow = YES_NO_OPTIONS;
  } else if (stage === "q3_service_type") {
    optionsToShow = SERVICE_TYPE_OPTIONS;
  } else if (stage === "q3_spare_part") {
    optionsToShow = SPARE_PART_OPTIONS;
  } else if (
    [
      "q7_brand_name",
      "q_custom_solution_desc",
      "q_spare_other_desc",
      "q_site_location",
      "q_name",
      "q_email",
      "q_phone",
    ].includes(stage)
  ) {
    isTextStage = true;
    if (stage === "q7_brand_name") textPlaceholder = "Enter brand name";
    if (stage === "q_custom_solution_desc")
      textPlaceholder = "Please mention your requirement 📝";
    if (stage === "q_spare_other_desc")
      textPlaceholder = "Please mention the spare part 📝";
    if (stage === "q_site_location")
      textPlaceholder = "Enter site location 📍";
    if (stage === "q_name") textPlaceholder = "Enter your name 😀";
    if (stage === "q_email") textPlaceholder = "Enter your email 📨";
    if (stage === "q_phone") textPlaceholder = "Enter your mobile number 📞";
  }

  const canInteract = stage !== "done";

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -top-32 right-[-5%] h-96 w-96 rounded-full bg-indigo-500/40 blur-[140px]" />
        <div className="absolute bottom-0 left-[-10%] h-[28rem] w-[28rem] rounded-full bg-blue-600/30 blur-[160px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 lg:flex-row lg:items-center lg:justify-between">
        <section className="max-w-2xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
            Mahy Khoory Intelligent Desk
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Enquiry for the Services.
          </h1>
          <p className="text-base text-white/80 sm:text-lg">
            Launch the enquiry concierge to start a guided conversation, route
            to the right team, and capture end-to-end project context without
            leaving the page.
          </p>
          <ul className="space-y-3 text-white/80">
            <li className="flex items-center gap-3 text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Industry grade CRM workflow built for pump, service, and spare part
              needs.
            </li>
            <li className="flex items-center gap-3 text-sm">
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Clean lead handover with brand, usage, and site data all in one
              payload.
            </li>
            <li className="flex items-center gap-3 text-sm">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              Fully responsive floating widget ready to drop into any page.
            </li>
          </ul>
        </section>

        <section className="grid gap-6 rounded-3xl border border-white/15 bg-white/5 p-8 text-white/80 backdrop-blur-xl">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">
              Response Time
            </p>
            <p className="mt-2 text-4xl font-semibold text-white">~ 2 mins</p>
            <p className="mt-1 text-sm text-white/70">
              Mahy Khoory CRM chatbot
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs text-white/60">Live enquiries</p>
              <p className="mt-1 text-2xl font-semibold text-white">--</p>
              <p className="text-xs text-white/60">Across 5 business units</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs text-white/60">Conversion uplift</p>
              <p className="mt-1 text-2xl font-semibold text-white">+42%</p>
              <p className="text-xs text-white/60">vs. static forms</p>
            </div>
          </div>
        </section>
      </div>

      {!isWidgetOpen && (
        <button
          type="button"
          onClick={() => setIsWidgetOpen(true)}
          aria-expanded={isWidgetOpen}
          className="fixed bottom-6 right-6 z-30 flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-left text-white shadow-2xl shadow-blue-900/40 backdrop-blur transition hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">
              Enquiry Concierge
            </p>
            <p className="text-lg font-semibold text-white">Chat with us</p>
          </div>
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/40">
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
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setIsWidgetOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-6 sm:justify-end sm:px-8 sm:pb-8">
            <div className="pointer-events-auto w-full max-w-md sm:max-w-lg">
              <ChatLayout
                onClose={() => setIsWidgetOpen(false)}
                className="h-[80vh] w-full sm:h-[640px]"
              >
                <ChatMessages messages={messages} isTyping={isTyping} />

                <footer className="border-t border-slate-100/70 bg-white/80 px-5 pb-5 pt-4 backdrop-blur">
                  {canInteract && optionsToShow && (
                    <ChatOptionButtons
                      options={optionsToShow}
                      onSelect={handleOptionSelect}
                    />
                  )}

                  {canInteract && isTextStage && (
                    <div className="mt-3">
                      <ChatInput
                        placeholder={textPlaceholder}
                        onSubmit={handleTextSubmit}
                      />
                    </div>
                  )}

                  {!canInteract && (
                    <p className="text-center text-xs text-slate-500">
                      Conversation completed. Reopen the widget to start again.
                    </p>
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
