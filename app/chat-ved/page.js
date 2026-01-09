"use client";
import { useEffect, useState } from "react";

export default function VedChatPage() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Namaste 🙏 I am Ved. Ask me anything about your life or destiny.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user + kundali
  useEffect(() => {
    fetch("/api/me", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(console.error);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    const newMessages = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat-ved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        user,
      }),
    });

    const data = await res.json();

    setMessages([
      ...newMessages,
      { role: "assistant", content: data.reply },
    ]);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* HEADER */}
      <div className="p-4 border-b border-white/10 text-center">
        <h1 className="text-xl font-semibold text-cyan-400">
          Ved — Your Astrological Guide 🔮
        </h1>
      </div>

      {/* CHAT BODY */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-xl ${
              m.role === "user" ? "ml-auto text-right" : "mr-auto"
            }`}
          >
            <div
              className={`p-4 rounded-xl ${
                m.role === "user"
                  ? "bg-cyan-500 text-black"
                  : "bg-white/10"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-white/50 italic">
            Ved is analysing your stars…
          </div>
        )}
      </div>

      {/* INPUT BAR (FIXED VISIBILITY) */}
      <div className="sticky bottom-0 p-4 border-t border-white/10 flex gap-2 bg-[#020617]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Ved something..."
          className="flex-1 px-4 py-2 rounded-lg bg-white/5 text-white outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-lg bg-cyan-400 text-black font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}
