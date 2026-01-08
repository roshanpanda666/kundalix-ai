"use client";
import { useRef } from "react";

export default function RegisterForm() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const dobRef = useRef(null);
  const tobRef = useRef(null);
  const placeRef = useRef(null);






  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value; // ✅ RAW password


    let name=nameRef.current.value;
    let dob=dobRef.current.value;
    let tob=tobRef.current.value;
    let place=placeRef.current.value;

    alert(name)
    alert(dob)
    alert(tob)
    alert(place)

    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    nameRef.current.value = "";
    dobRef.current.value = "";
    tobRef.current.value = "";
    placeRef.current.value = "";

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]">
        
      <form
        onSubmit={handleSubmit}
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
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Username"
          ref={usernameRef}
          required
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/5 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          ref={emailRef}
          required
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/5 text-white"
        />
        

        <input
          type="password"
          placeholder="Password"
          ref={passwordRef}
          required
          className="w-full mb-6 px-4 py-2 rounded-lg bg-white/5 text-white"
        />
        <input
          type="text"
          placeholder="Full name"
          ref={nameRef}
          required
          className="w-full mb-6 px-4 py-2 rounded-lg bg-white/5 text-white"
        />
        <input
          type="date"
          placeholder="DOB"
          ref={dobRef}
          required
          className="w-full mb-6 px-4 py-2 rounded-lg bg-white/5 text-white"
        />
        <input
          type="time"
          placeholder="Time of birth"
          ref={tobRef}
          required
          className="w-full mb-6 px-4 py-2 rounded-lg bg-white/5 text-white"
        />

        <input
          type="text"
          placeholder="place of birth"
          ref={placeRef}
          required
          className="w-full mb-6 px-4 py-2 rounded-lg bg-white/5 text-white"
        />  

        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
}
