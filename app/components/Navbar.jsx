"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-[#020617] via-blue-950 to-[#020617] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="text-xl font-semibold text-white tracking-wide">
          Kundalix<span className="text-cyan-400">.AI</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10">
          {status === "loading" ? null : session ? (
            <>
              <Link href="/dashboard" className="text-white/80 hover:text-white">
                Hi,{" "}
                <span className="text-cyan-400 font-medium">
                  {session.user.username}
                </span>
              </Link>

              <Link
                href="/see-kundali"
                className="text-white/80 hover:text-cyan-400 transition"
              >
                See Kundali
              </Link>

              <Link
                href="/chat-ved"
                className="text-fuchsia-400/80 hover:text-purple-500 transition"
              >
                chat with ved
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-4 py-1.5 rounded-lg bg-red-500/80 text-white text-sm hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white/80 hover:text-white">
                Login
              </Link>

              <Link
                href="/userregister"
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm hover:scale-105 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-6 space-y-4 bg-[#020617] border-t border-white/10">
          {status === "loading" ? null : session ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block text-white/80"
              >
                Hi,{" "}
                <span className="text-cyan-400 font-medium">
                  {session.user.username}
                </span>
              </Link>

              <Link
                href="/see-kundali"
                onClick={() => setOpen(false)}
                className="block text-white/80"
              >
                See Kundali
              </Link>

              <Link
                href="/chat-ved"
                onClick={() => setOpen(false)}
                className="block text-fuchsia-400/80"
              >
                chat with ved
              </Link>

              

              <button
                onClick={() => {
                  setOpen(false);
                  signOut({ callbackUrl: "/login" });
                }}
                className="w-full text-left px-4 py-2 rounded-lg bg-red-500/80 text-white text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block text-white/80"
              >
                Login
              </Link>

              <Link
                href="/userregister"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
