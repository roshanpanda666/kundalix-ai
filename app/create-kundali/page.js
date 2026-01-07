"use client";

import { useEffect, useState } from "react";

export default function CreateKundali() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      const res = await fetch("/api/me");
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      }

      setLoading(false);
    };

    fetchMe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-blue-950 to-[#020617] text-white">
        <div className="animate-pulse text-lg tracking-wide">
          Aligning the stars... ✨
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-blue-950 to-[#020617] text-white">
        Not authenticated ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-blue-950 to-[#020617] flex items-center justify-center text-white px-4">
      <div
        className="
          w-full max-w-xl
          rounded-3xl
          p-8
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          shadow-[0_0_60px_rgba(56,189,248,0.15)]
        "
      >
        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-wide">
            Kundali Profile 🧿
          </h1>
          <p className="text-white/60 mt-2 text-sm">
            These details will be used to generate your kundali
          </p>
        </div>

        {/* USER INFO */}
        <div className="space-y-4 text-sm">
          <InfoRow label="Name" value={user.name} />
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Date of Birth" value={user.dob} />
          <InfoRow label="Time of Birth" value={user.tob} />
          <InfoRow label="Place of Birth" value={user.place} />
        </div>

        {/* ACTION */}
        <button
          className="
            mt-8 w-full
            py-3 rounded-xl
            bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600
            text-white font-medium
            hover:scale-[1.02]
            active:scale-95
            transition-all
            shadow-lg shadow-cyan-500/30
          "
        >
          Generate Kundali ✨
        </button>
      </div>
    </div>
  );
}

/* 🧩 Small reusable row */
function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between bg-white/5 px-4 py-3 rounded-xl border border-white/10">
      <span className="text-white/60">{label}</span>
      <span className="text-cyan-300 font-medium">{value}</span>
    </div>
  );
}
