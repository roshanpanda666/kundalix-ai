"use client";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // IMPORTANT
    });

    if (res.error) {
      setError("Invalid email or password ❌");
      return;
    }

    router.push("/see-kundali");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] to-[#020617]">
      <form
        onSubmit={handleLogin}
        className="
          w-[340px]
          rounded-2xl
          p-6
          bg-gradient-to-br from-blue-950/60 via-blue-900/40 to-cyan-900/30
          backdrop-blur-xl
          border border-white/10
          shadow-[0_0_40px_rgba(56,189,248,0.15)]
        "
      >
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Login
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
          className="
            w-full mb-4 px-4 py-2 rounded-lg
            bg-white/5 text-white placeholder-white/40
            border border-white/10
            focus:outline-none focus:ring-2 focus:ring-cyan-400/50
          "
        />

        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
          className="
            w-full mb-6 px-4 py-2 rounded-lg
            bg-white/5 text-white placeholder-white/40
            border border-white/10
            focus:outline-none focus:ring-2 focus:ring-cyan-400/50
          "
        />

        <button
          type="submit"
          className="
            w-full py-2 rounded-lg
            bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600
            text-white font-medium
            hover:scale-[1.02] active:scale-95 transition-all
            shadow-lg shadow-cyan-500/30
          "
        >
          Login
        </button>
      </form>
    </div>
  );
}
