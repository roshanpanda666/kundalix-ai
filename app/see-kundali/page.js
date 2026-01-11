"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function KundaliPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch("/api/me");

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading your kundali 🌌...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  const kundali = user.kundaliSnapshots?.[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-blue-950 to-[#020617] text-white px-6 py-10 space-y-10">

      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">
          {user.name} ✨
        </h1>
        <p className="text-white/60">
          Vedic Kundali Overview
        </p>

        <div className="flex justify-center items-center flex-col">

        <div className="h-12 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 w-80 flex justify-center items-center">
            <Link href="/chat-ved">
            <div className="text-white">
                <button>
                    chat about these information with ai
                </button>
            </div>
            </Link>
            
            
        </div>

        

        <div className="mt-3.5">

            <a
                href="/api/kundali-pdf"
                target="_blank"
                className="h-12 w-80 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 flex justify-center items-center text-white font-medium"
            >
                Download Kundali PDF 📄
            </a>

            </div>

        </div>

        <div className="justify-center items-center flex mt-4">
        <div className="h-12 w-80 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 flex justify-center items-center text-white font-medium">
            <Link href="/horoscope">
            <div className="text-white">
                <button>
                    Today's Horoscope
                </button>
            </div>
            </Link>
            
            
        </div>
        </div>

        

      </div>

      {/* BIRTH DETAILS */}
      <Section title="Birth Details">
        <InfoRow label="Full Name" value={kundali.birthDetails.fullName} />
        <InfoRow label="Date of Birth" value={kundali.birthDetails.dateOfBirth} />
        <InfoRow label="Time of Birth" value={kundali.birthDetails.timeOfBirth} />
        <InfoRow label="Place of Birth" value={kundali.birthDetails.placeOfBirth} />
      </Section>

      {/* BASIC PROFILE */}
      <Section title="Basic Profile">
        <Grid>
          <InfoCard title="Sun Sign" value={kundali.basicProfile.sunSign} />
          <InfoCard title="Moon Sign" value={kundali.basicProfile.moonSign} />
          <InfoCard title="Ascendant" value={kundali.basicProfile.ascendant} />
          <InfoCard title="Nakshatra" value={kundali.basicProfile.nakshatra} />
          <InfoCard title="Ruling Planet" value={kundali.basicProfile.rulingPlanet} />
        </Grid>
      </Section>

      {/* LIFE DOMAINS */}
      <Section title="Life Domains">
        <Domain title="Personality" text={kundali.lifeDomains.personality} />
        <Domain title="Career" text={kundali.lifeDomains.career} />
        <Domain title="Relationships" text={kundali.lifeDomains.relationships} />
        <Domain title="Health" text={kundali.lifeDomains.health} />
        <Domain title="Finance" text={kundali.lifeDomains.finance} />
      </Section>

      {/* PLANETARY POSITIONS */}
      <Section title="Planetary Positions">
        <Grid>
          {Object.entries(kundali.planetaryPositions).map(([planet, data]) => (
            <InfoCard
              key={planet}
              title={planet.toUpperCase()}
              value={`${data.sign} · House ${data.house}`}
              sub={data.traits}
            />
          ))}
        </Grid>
      </Section>

      {/* YOGAS */}
      <Section title="Yogas">
        <div className="space-y-4">
          {kundali.yogas.map((yoga, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <h3 className="font-semibold">{yoga.name}</h3>
              <p className="text-white/70">{yoga.meaning}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* GUIDANCE */}
      <Section title="Guidance">
        <ListBlock title="Strengths" items={kundali.guidance.strengths} />
        <ListBlock title="Challenges" items={kundali.guidance.challenges} />
        <Domain title="Advice" text={kundali.guidance.advice} />
      </Section>
    </div>
  );
}

/* ---------- UI HELPERS ---------- */

function Section({ title, children }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold border-b border-white/10 pb-2">
        {title}
      </h2>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-white/80">
      <span>{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}

function Grid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {children}
    </div>
  );
}

function InfoCard({ title, value, sub }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <h3 className="text-sm text-white/60">{title}</h3>
      <p className="text-lg font-semibold">{value}</p>
      {sub && <p className="text-white/60 mt-1 text-sm">{sub}</p>}
    </div>
  );
}

function Domain({ title, text }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-white/70 mt-1">{text}</p>
    </div>
  );
}

function ListBlock({ title, items }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <h3 className="font-semibold">{title}</h3>
      <ul className="list-disc list-inside text-white/70 mt-2 space-y-1">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
