import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    name: { type: String, required: true },
    dob: { type: String, required: true },
    tob: { type: String, required: true },
    place: { type: String, required: true },

    // 🔮 Kundali snapshots
    kundaliSnapshots: {
      type: [
        {
          generatedAt: { type: Date, default: Date.now },
          model: { type: String },
          result: { type: Object }, // JSON from LLM
        },
      ],
      default: [], // 👈 THIS IS CRITICAL
    },
  },
  {
    collection: "kundalix-collection",
    timestamps: true,
  }
);
export const User = mongoose.models.User || mongoose.model("User", userSchema);
