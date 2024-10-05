import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Email validation for correct format
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      // Password is only required if not using Google login
      required: function () {
        return !this.isGoogleLogin;
      },
    },
    image: {
      type: String,
      default: "",
    },
    isGoogleLogin: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically manage createdAt and updatedAt fields
    timestamps: true,
  }
);

// Avoid overwriting the model if it already exists
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
