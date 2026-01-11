"use client";

import { useEffect, useState } from "react";

export default function HoroscopePage() {
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Helper to clean horoscope text
  function cleanHoroscopeText(text) {
    if (!text) return "";

    // Remove known CTA / SEO junk lines
    return text
      .split("\n")
      .map(line => line.trim())
      .filter(line =>
        line.length > 0 &&
        !line.toLowerCase().includes("who’s written in your stars") &&
        !line.toLowerCase().includes("who's written in your stars") &&
        !line.toLowerCase().includes("zodiac sign’s biggest challenge") &&
        !line.toLowerCase().includes("zodiac sign's biggest challenge")
      )
      .join(" ")
      .trim();
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [horoscopeRes, userRes] = await Promise.all([
          fetch("/api/horoscope"),
          fetch("/api/me"),
        ]);

        const horoscopeJson = await horoscopeRes.json();
        const userJson = await userRes.json();

        if (horoscopeJson.success) {
          setHoroscopeData(horoscopeJson.data);
        }

        if (userJson.success) {
          setUserData(userJson.user);
        }
      } catch (err) {
        console.error("PAGE FETCH ERROR:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] text-white">
        Loading your cosmic insights… 🌙
      </div>
    );
  }

  if (!horoscopeData || !userData) {
    return (
      <div className="p-6 text-white">
        Unable to load horoscope data.
      </div>
    );
  }

  const snapshot = userData.kundaliSnapshots?.[0];
  const basic = snapshot?.basicProfile;
  const planets = snapshot?.planetaryPositions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] text-white px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* 🌙 Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            🌙 {horoscopeData.moonSignLabel} Horoscope
          </h1>
          <p className="text-sm text-gray-400">
            {horoscopeData.date} · Source: {horoscopeData.source}
          </p>
        </div>

        {/* 🔮 Horoscope Card */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5 md:p-6">
          <p className="leading-relaxed text-gray-200">
            {cleanHoroscopeText(horoscopeData.horoscope)}
          </p>
        </div>

        {/* 🧠 Basic Profile */}
        {basic && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              🧠 Basic Profile
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                ["Sun Sign", basic.sunSign],
                ["Moon Sign", basic.moonSign],
                ["Ascendant", basic.ascendant],
                ["Nakshatra", basic.nakshatra],
                ["Ruling Planet", basic.rulingPlanet],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <p className="text-xs text-gray-400">{label}</p>
                  <p className="text-lg font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 🪐 Planetary Positions */}
        {planets && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              🪐 Planetary Positions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(planets).map(([planet, data]) => (
                <div
                  key={planet}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <h3 className="capitalize font-semibold text-lg">
                    {planet}
                  </h3>
                  <p className="text-sm text-gray-300">
                    House: {data.house} · Sign: {data.sign}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {data.traits}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 👤 User Info (END) */}
        <div className="border-t border-white/10 pt-6">
          <h2 className="text-lg font-semibold mb-3">
            👤 User Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
            <p><span className="text-gray-400">Name:</span> {userData.name}</p>
            <p><span className="text-gray-400">Username:</span> {userData.username}</p>
            <p><span className="text-gray-400">Email:</span> {userData.email}</p>
            <p><span className="text-gray-400">DOB:</span> {userData.dob}</p>
            <p><span className="text-gray-400">Place:</span> {userData.place}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
