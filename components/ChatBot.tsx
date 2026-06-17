"use client";

import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "assistant"; content: string };

function renderMessage(content: string) {
  const regex = /\*\*([^*]+)\*\*|\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|https?:\/\/[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+91\s?\d{5}\s?\d{5}/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      elements.push(<span key={lastIndex}>{content.slice(lastIndex, match.index)}</span>);
    }

    const full = match[0];
    const key = match.index;

    if (match[1] !== undefined) {
      // **bold**
      elements.push(<strong key={key}>{match[1]}</strong>);
    } else if (match[2] !== undefined && match[3] !== undefined) {
      // [text](url)
      elements.push(
        <a key={key} href={match[3]} target="_blank" rel="noopener noreferrer" className="text-red-600 underline break-all hover:text-red-800">
          {match[2]}
        </a>
      );
    } else if (/^https?:\/\//.test(full)) {
      elements.push(
        <a key={key} href={full} target="_blank" rel="noopener noreferrer" className="text-red-600 underline break-all hover:text-red-800">
          {full}
        </a>
      );
    } else if (full.includes("@")) {
      elements.push(
        <a key={key} href={`mailto:${full}`} className="text-red-600 underline hover:text-red-800">
          {full}
        </a>
      );
    } else if (full.startsWith("+91")) {
      elements.push(
        <a key={key} href={`tel:${full.replace(/\s/g, "")}`} className="text-red-600 underline hover:text-red-800">
          {full}
        </a>
      );
    } else {
      elements.push(<span key={key}>{full}</span>);
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < content.length) {
    elements.push(<span key={lastIndex}>{content.slice(lastIndex)}</span>);
  }

  return elements;
}

const SUGGESTIONS = [
  "What antibiotics do you have?",
  "Tell me about PCD franchise",
  "Products for cough & cold",
  "Contact details",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm BioLexa's assistant. I can help you with our products, PCD franchise info, or any queries. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, open]);

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updated
            .slice(1) // remove the initial greeting (not sent to API)
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please try again or contact us at +91 92186 30464.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const showSuggestions = messages.length === 1; // only show on first load

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        style={{ backgroundColor: "#FF3333" }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white text-2xl hover:scale-105 transition-transform"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[22rem] sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100"
          style={{ maxHeight: "80vh" }}>

          {/* Header */}
          <div
            className="px-4 py-3 flex items-center gap-3"
            style={{ backgroundColor: "#FF3333" }}
          >
            <img
              src="https://biolexa.in/BioLexa-logo.png"
              alt="BioLexa"
              className="h-7 brightness-0 invert"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="flex-1">
              <p className="text-white font-semibold text-sm leading-none">BioLexa Assistant</p>
              <p className="text-red-100 text-xs mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                Online
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white opacity-70 hover:opacity-100 text-lg leading-none"
            >✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ backgroundColor: "#FF3333" }}
                  >
                    B
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "text-white rounded-br-sm"
                      : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
                  }`}
                  style={m.role === "user" ? { backgroundColor: "#FF3333" } : {}}
                >
                  {m.role === "assistant" ? renderMessage(m.content) : m.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-end gap-2 justify-start">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: "#FF3333" }}
                >
                  B
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick suggestion chips */}
            {showSuggestions && !loading && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-xs border rounded-full px-3 py-1.5 bg-white hover:bg-red-50 border-red-200 text-red-600 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-gray-100 bg-white flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Ask about products or franchise..."
              className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100 transition-all"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{ backgroundColor: "#FF3333" }}
              className="text-white text-sm px-4 py-2 rounded-xl disabled:opacity-40 hover:opacity-90 transition-opacity font-medium"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}