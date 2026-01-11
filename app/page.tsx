type StepCardProps = {
  step: string;
  title: string;
  desc: string;
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#020617] via-blue-950 to-[#020617] text-white flex flex-col items-center justify-center px-6">

      {/* HERO TEXT */}

      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Discover Your Life Map 🌙
          <span className="block text-blue-400 mt-2">
            AI-Powered Vedic Kundali
          </span>
        </h1>

        <p className="text-white/70 text-lg">
          Kundalix blends ancient Vedic astrology with modern AI
          to generate a deeply personalized kundali —
          covering your personality, career, relationships, health, and more.
        </p>

        {/* CTA */}
        <div className="flex justify-center gap-4 mt-6">
          <a
            href="/userregister"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 font-semibold hover:scale-105 transition"
          >
            Create Your Kundali ✨
          </a>

          <a
            href="/login"
            className="px-6 py-3 rounded-xl border border-white/20 text-white/80 hover:bg-white/10 transition"
          >
            Login
          </a>
        </div>
      </div>

      {/* STEPS */}
      <div className="max-w-4xl w-full mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">

        <StepCard
          step="01"
          title="Register"
          desc="Fill up the registration form carefully. Remember your Gmail and password — you’ll need them to log in later."
        />

        <StepCard
          step="02"
          title="AI Analysis"
          desc="Our AI analyzes your birth details using Vedic astrology principles combined with modern intelligence."
        />

        <StepCard
          step="03"
          title="Kundali Generation"
          desc="The AI generates a complete kundali — including planetary positions, yogas, life domains, and guidance."
        />

        <StepCard
          step="04"
          title="View Your Kundali"
          desc="Log in and head to the ‘See Kundali’ section to explore your personalized astrological blueprint."
        />

      </div>

      {/* FOOTER */}
      <div className="mt-16 text-white/50 text-sm">
        Created with ❤️ by <span className="text-white font-medium">Sabyasachi</span>
      </div>
    </main>
  );
}

/* ---------- SMALL COMPONENT ---------- */

function StepCard({ step, title, desc }: StepCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur">
      <div className="text-blue-400 font-bold text-sm">
        STEP {step}
      </div>
      <h3 className="text-xl font-semibold mt-2">{title}</h3>
      <p className="text-white/70 mt-2 text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
