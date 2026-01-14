import mongoose from "mongoose";

/* ================================
   Kundali Snapshot Schema
   ================================ */

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
      system: {
        type: String,
        default: "vedic",
      },
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

    // 🔁 Extension zone (future predictions, summaries, etc.)
    derivedData: {
      type: Object,
      default: {},
    },
  },
  { _id: false }
);

/* ================================
   Kundali Image Upload Schema
   ================================ */

const KundaliImageSchema = new mongoose.Schema(
  {
    imageBase64: {
      type: String, // compressed base64 string
      required: true,
    },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },

    analyzed: {
      type: Boolean,
      default: false,
    },

    aiInsights: {
      type: String, // AI-generated analysis
    },
  },
  { _id: true }
);

/* ================================
   User Schema
   ================================ */

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    dob: {
      type: String,
      required: true,
    },

    tob: {
      type: String,
      required: true,
    },

    place: {
      type: String,
      required: true,
    },

    /* 🔮 Generated Kundali Snapshots */
    kundaliSnapshots: {
      type: [KundaliSnapshotSchema],
      default: [],
    },

    /* 📸 Uploaded Kundali Images (AI Vision Analysis) */
    kundaliImageUploads: {
      type: [KundaliImageSchema],
      default: [],
    },
  },
  {
    collection: "kundalix-collection",
    timestamps: true,
  }
);

/* ================================
   Model Export (Safe for Hot Reload)
   ================================ */

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);
