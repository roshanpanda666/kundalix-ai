"use client";


import { useRef } from "react";

export default function CreateKundali() {
  const nameRef = useRef(null);
  const dobRef = useRef(null);
  const tobRef = useRef(null);
  const placeRef = useRef(null);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const dob = dobRef.current.value;
    const tob = tobRef.current.value;
    const place = placeRef.current.value;

    alert(name);
    alert(dob)
    alert(tob)
    alert(place)

    let response=await  fetch("/api/createkundaliapi",{
        method: "POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            name:name,
            dob:dob,
            tob:tob,
            place:place,
        }),
    })

    const result= await response.json()
    if(result.success){
        alert("data added successfully")
        // optional reset
    nameRef.current.value = "";
    dobRef.current.value = "";
    tobRef.current.value = "";
    placeRef.current.value = "";


    }

    else{
        alert("failed to add data")
    }

    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-blue-950 to-[#020617]">
      <form
        onSubmit={handleSubmit}
        className="
          w-[360px]
          p-6
          rounded-2xl
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          shadow-lg
        "
      >
        <h1 className="text-xl text-white font-semibold mb-6 text-center">
          Create Kundali ✨
        </h1>

        <input
          ref={nameRef}
          type="text"
          placeholder="Name"
          required
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/40 focus:outline-none"
        />

        <input
          ref={dobRef}
          type="date"
          required
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none"
        />

        <input
          ref={tobRef}
          type="time"
          required
          className="w-full mb-4 px-4 py-2 rounded-lg bg-white/10 text-white focus:outline-none"
        />

        <input
          ref={placeRef}
          type="text"
          placeholder="Place of Birth"
          required
          className="w-full mb-6 px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/40 focus:outline-none"
        />

        <button
          type="submit"
          className="
            w-full py-2 rounded-lg
            bg-gradient-to-r from-cyan-400 to-blue-500
            text-white font-medium
            hover:scale-105 transition
          "
        >
          Submit
        </button>
      </form>
    </div>
  );
}
