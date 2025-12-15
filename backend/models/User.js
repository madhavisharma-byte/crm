import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Updated role enum to ['admin', 'manager', 'staff']
const ROLE_ENUM = ["admin", "manager", "staff"];

const userSchema = new mongoose.Schema(
  {
    // name in frontend: 'fullName'
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    // email (unique)
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // phone (optional)
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    // companyName (optional)
    companyName: {
      type: String,
      trim: true,
      default: "",
    },
    // password (required for local signup)
    password: {
      type: String,
    },
    // role: 'admin', 'manager', or 'staff'
    role: {
      type: String,
      enum: ROLE_ENUM,
      default: "staff",
    },
    // provider: "local" (default), "google"
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    // If user registered by Google, to link Google account
    googleId: { 
      type: String,
      default: null,
    },
    // Terms accepted (we can store timestamp for auditing) - not required by data model
    termsAcceptedAt: {
      type: Date,
    }
    ,
    // Fields for password reset via OTP
    resetOtp: {
      type: String,
      default: null,
    },
    resetOtpExpiry: {
      type: Date,
      default: null,
    }
  },
  { timestamps: true }
);

// ✅ Modern async mongoose pre-save hook: remove 'next', just use async/await
userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw err;
  }
});

// Instance method to check password
userSchema.methods.matchPassword = async function (entered) {
  if (!this.password) return false;
  return bcrypt.compare(entered, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
