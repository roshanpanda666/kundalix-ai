"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { thirdfunction } from "../actions/action3";

export default function RegisterForm() {
  const router = useRouter();

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const dobRef = useRef(null);
  const tobRef = useRef(null);
  const placeRef = useRef(null);

  // 🔒 NEW LOGIC STATE
  const [showModal, setShowModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(50);
  const [locked, setLocked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (locked) return;

    setLocked(true);
    setShowModal(true);

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    let name = nameRef.current.value;
    let dob = dobRef.current.value;
    let tob = tobRef.current.value;
    let place = placeRef.current.value;

    // keeping your alerts as-is
    alert(username);
    alert(email);
    alert(password);
    alert(name);
    alert(dob);
    alert(tob);
    alert(place);

    try {
      await thirdfunction({
        input1: String(username),
        input2: String(email),
        input3: String(password),
        input4: String(name),
        input5: String(dob),
        input6: String(tob),
        input7: String(place),
      });
    } catch (err) {
      console.error(err);
    }

    // form reset stays untouched
    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    nameRef.current.value = "";
    dobRef.current.value = "";
    tobRef.current.value = "";
    placeRef.current.value = "";
  };

  // ⏱️ TIMER EFFECT
  useEffect(() => {
    if (!showModal) return;

    if (timeLeft === 0) {
      router.push("/login");
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showModal, timeLeft, router]);

  return (
    <>
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

          <input type="text" placeholder="Username" ref={usernameRef} required className="w-full mb-4 px-4 py-2 rounded-lg bg-white/5 text-white" />
          <input type="email" placeholder="Email" ref={emailRef} required className="w-full mb-4 px-4 py-2 rounded-lg bg-white/5 text-white" />
          <input type="password" placeholder="Password" ref={passwordRef} required className="w-full mb-6 px-4 py-2 rounded-lg bg-white/5 text-white" />
          <input type="text" placeholder="Full name" ref={nameRef} required className="w-full mb-6 px-4 py-2 rounded-lg bg-white/5 text-white" />
          <input type="date" ref={dobRef} required className="w-full mb-6 px-4 py-2 rounded-lg bg-white/5 text-white" />
          <input type="time" ref={tobRef} required className="w-full mb-6 px-4 py-2 rounded-lg bg-white/5 text-white" />
          <input type="text" placeholder="place of birth" ref={placeRef} required className="w-full mb-6 px-4 py-2 rounded-lg bg-white/5 text-white" />

          <button
            type="submit"
            disabled={locked}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white"
          >
            Register
          </button>
        </form>
      </div>

      {/* 🔮 WAITING MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="w-[320px] rounded-xl bg-[#020617] border border-white/10 p-6 text-center text-white">
            <h3 className="text-lg font-semibold mb-3">
              AI is analysing your input 🔮
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Making your kundali.  
              Please wait…
              don't worry... this will only happen one time only
            </p>

            <div className="text-3xl font-bold text-cyan-400">
              {timeLeft}s
            </div>

            <p className="text-white/40 text-xs mt-3">
              You’ll be redirected automatically
            </p>
          </div>
        </div>
      )}
    </>
  );
}
