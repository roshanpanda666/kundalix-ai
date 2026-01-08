"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-r from-[#020617] via-blue-950 to-[#020617] border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          href="/"
          className="text-xl font-semibold text-white tracking-wide"
        >
          Kundalix<span className="text-cyan-400">.AI</span>
        </Link>

        {/* ACTIONS */}
        <div className="flex items-center gap-12">
          {status === "loading" ? null : session ? (
            <>
            <Link href="/dashboard">
            <span className="text-white/80 text-sm">
                Hi,{" "}
                <span className="text-cyan-400 font-medium">
                  {session.user.username}
                </span>
              </span>
            </Link>
              

              <div className="hover:text-cyan-500">
                <Link href="/see-kundali">
                    create kundali
                </Link>
                
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="
                  px-4 py-1.5 rounded-lg
                  bg-red-500/80 text-white text-sm
                  hover:bg-red-600 transition
                "
              >
                Logout
              </button>

              
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white/80 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                href="/userregister"
                className="
                  px-4 py-1.5 rounded-lg
                  bg-gradient-to-r from-cyan-400 to-blue-500
                  text-white text-sm
                  hover:scale-105 transition
                "
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
