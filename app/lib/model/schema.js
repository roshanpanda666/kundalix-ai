import mongoose from "mongoose";

const KundaliSnapshotSchema = new mongoose.Schema(
  {
    generatedAt: {
      type: Date,
      default: Date.now,
    },

    model: {
      type: String,
      default: "gemini-2.5-flash",
    },

    meta: {
      system: { type: String, default: "vedic" },
    },

    birthDetails: {
      fullName: String,
      dateOfBirth: String,
      timeOfBirth: String,
      placeOfBirth: String,
    },

    basicProfile: {
      sunSign: String,
      moonSign: String,
      ascendant: String,
      nakshatra: String,
      rulingPlanet: String,
    },

    planetaryPositions: {
      sun: { type: Object },
      moon: { type: Object },
      mars: { type: Object },
      mercury: { type: Object },
      jupiter: { type: Object },
      venus: { type: Object },
      saturn: { type: Object },
      rahu: { type: Object },
      ketu: { type: Object },
    },

    houses: {
      house1: String,
      house2: String,
      house3: String,
      house4: String,
      house5: String,
      house6: String,
      house7: String,
      house8: String,
      house9: String,
      house10: String,
      house11: String,
      house12: String,
    },

    yogas: [
      {
        name: String,
        meaning: String,
      },
    ],

    lifeDomains: {
      personality: String,
      career: String,
      relationships: String,
      health: String,
      finance: String,
    },

    guidance: {
      strengths: [String],
      challenges: [String],
      advice: String,
    },

    // 🔁 For future use (daily horoscope, predictions)
    derivedData: {
      type: Object, // flexible extension zone
      default: {},
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    name: { type: String, required: true },
    dob: { type: String, required: true },
    tob: { type: String, required: true },
    place: { type: String, required: true },

    kundaliSnapshots: {
      type: [KundaliSnapshotSchema],
      default: [],
    },
  },
  {
    collection: "kundalix-collection",
    timestamps: true,
  }
);

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);
