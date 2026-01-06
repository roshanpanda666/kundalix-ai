import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password: {
      type: String,
      required: true
    },
    name: {
        type: String,
        required: true
      },
    dob: {
        type: String,
        required: true
      },
    tob: {
        type: String,
        required: true
      },
    place: {
        type: String,
        required: true
      },


  },
  {
    collection: "kundalix-collection", // the collection i wanna use 
    timestamps: true
  }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);