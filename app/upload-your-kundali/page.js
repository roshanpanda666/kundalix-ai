"use client";

import { useState } from "react";
import { Upload, Sparkles } from "lucide-react";

export default function UploadYourKundali() {
  const [imageBase64, setImageBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ THIS WAS MISSING
  const [aiInsights, setAiInsights] = useState("");

  /* =========================
     FILE → BASE64
     ========================= */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImageBase64(reader.result);
    reader.readAsDataURL(file);
  };

  /* =========================
     UPLOAD IMAGE
     ========================= */
  const uploadImage = async () => {
    if (!imageBase64) return;

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/kundali-image/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageBase64 }),
    });

    const data = await res.json();
    setLoading(false);

    setMessage(
      data.success
        ? "✅ Kundali image uploaded successfully"
        : "❌ Failed to upload image"
    );
  };

  /* =========================
     ANALYZE IMAGE (SAFE)
     ========================= */
     const analyzeImage = async () => {
        try {
          setLoading(true);
          setMessage("");
          setAiInsights("");
      
          const res = await fetch("/api/kundali-image/analyze", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
          }
      
          const data = await res.json();
      
          if (data.success) {
            setMessage("🧠 AI analysis completed");
            setAiInsights(data.data.insights);
          } else {
            setMessage(data.error || "❌ Analysis failed");
          }
        } catch (err) {
          console.error("Analyze failed:", err);
          setMessage("❌ AI analysis failed. Please try again.");
        } finally {
          setLoading(false);
        }
      };

  /* =========================
     UI
     ========================= */
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] via-[#020617] to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 space-y-6 shadow-xl">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Upload Your Kundali 📸
          </h1>
          <p className="text-sm text-white/60">
            Upload your Kundali image and get AI-powered insights.
          </p>
        </div>

        {/* Upload Box */}
        <label className="flex flex-col items-center justify-center gap-3 border border-dashed border-white/20 rounded-xl p-6 cursor-pointer hover:border-cyan-400 transition">
          <Upload className="text-cyan-400" />
          <span className="text-sm text-white/70 text-center">
            Click to upload Kundali image
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Preview */}
        {imageBase64 && (
          <div className="rounded-xl overflow-hidden border border-white/10">
            <img
              src={imageBase64}
              alt="Kundali Preview"
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={uploadImage}
            disabled={loading || !imageBase64}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload size={18} />
            Upload Image
          </button>

          <button
            onClick={analyzeImage}
            disabled={loading || !imageBase64}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={18} />
            Analyze with AI
          </button>
        </div>

        {/* Status */}
        {message && (
          <p className="text-sm text-center text-white/80">
            {message}
          </p>
        )}

        {/* AI INSIGHTS */}
        {aiInsights && (
          <div className="mt-4 rounded-2xl border border-purple-400/20 bg-purple-500/10 p-5 space-y-3">
            <h2 className="text-lg font-semibold text-purple-300">
              AI Kundali Insights ✨
            </h2>

            <pre className="text-sm text-white/80 whitespace-pre-wrap leading-relaxed font-sans">
              {aiInsights}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}