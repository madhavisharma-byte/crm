import { validationResult } from "express-validator";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { generateToken } from "../utils/token.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Registration Controller to match frontend Register.jsx
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Log validation errors for debugging
    // Avoid logging sensitive values; show validator output only
    // eslint-disable-next-line no-console
    console.error("Register validation errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  // Map frontend field names to backend
  // Accept both `fullName` (frontend) or legacy `name` field
  const {
    fullName: fullNameRaw,
    name: nameRaw,
    email,
    phone,
    companyName,
    password,
    confirmPassword,
    role,
    termsAccepted,
  } = req.body;

  const fullName = fullNameRaw || nameRaw;

  // Basic frontend-level validation
  if (!fullName || !email || !password || !confirmPassword || !termsAccepted) {
    // Log presence of fields (do not log actual passwords)
    // eslint-disable-next-line no-console
    console.error("Missing required fields:", {
      fullName: !!fullName,
      email: !!email,
      password: !!password,
      confirmPassword: !!confirmPassword,
      termsAccepted: !!termsAccepted,
    });
    return res.status(400).json({ message: "Missing required fields" });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Only allow 'admin', 'manager', or 'staff'; default is 'staff'
  const allowedRoles = ["admin", "manager", "staff"];
  let userRole = (typeof role === "string" && allowedRoles.includes(role)) ? role : "staff";

  try {
    // Check if user exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Store user, using fullName as fullName (schema: fullName, not name)
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      password,
      phone,
      companyName,
      role: userRole,
      provider: "local",
    });

    const token = generateToken(user);
    res.status(201).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        companyName: user.companyName,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// Login Controller to match frontend Login.jsx
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Accept email or username per frontend, but our backend only handles email
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Missing email or password" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        companyName: user.companyName,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// (Optional stub) Google Login for later, not yet enabled in frontend
export const googleLogin = async (req, res) => {
  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ message: "Google token missing" });
  }
  try {
    let payload;
    // Prefer server-side verification via google-auth-library if available
    if (googleClient && typeof googleClient.verifyIdToken === "function") {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      payload = ticket.getPayload();
    } else {
      // Fallback: call Google's tokeninfo endpoint
      const resp = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
      if (!resp.ok) throw new Error("Invalid Google token");
      payload = await resp.json();
    }
    const email = payload.email?.toLowerCase();
    const fullName = payload.name || email;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullName,
        email,
        provider: "google",
        password: undefined,
        role: "staff", // default for new google registration is 'staff'
      });
    }

    const token = generateToken(user);
    res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        companyName: user.companyName,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Google login failed", error: err.message });
  }
};

// Return current authenticated user (used by frontend to validate token)
export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Not authorized" });
    res.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        companyName: user.companyName,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get user", error: err.message });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = req.user; // comes from protect middleware

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { fullName, email, phone, companyName } = req.body;

    if (fullName !== undefined) user.fullName = fullName;
    if (email !== undefined) user.email = email.toLowerCase();
    if (phone !== undefined) user.phone = phone;
    if (companyName !== undefined) user.companyName = companyName;

    const updatedUser = await user.save();

    res.json({
      user: {
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        companyName: updatedUser.companyName,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user profile",
      error: error.message,
    });
  }
};

// Real Email Version of forgotPassword
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.provider && user.provider !== "local") {
      return res.status(400).json({ message: "Account uses Google Login. Cannot reset password." });
    }

    // 1. Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    // 2. Save to DB (Bypassing validation)
    user.resetOtp = hashedOtp;
    user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
    await user.save({ validateBeforeSave: false });

    // 3. Configure Email Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Ensure this is your 16-char App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset</h2>
          <p>Your verification code is:</p>
          <h1 style="color: #2563EB; letter-spacing: 5px;">${otp}</h1>
          <p>This code expires in 10 minutes.</p>
        </div>
      `,
    };

    // 4. Send Email
    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Email sent to ${email}`);
      res.json({ message: "OTP sent to your email." });
    } catch (emailError) {
      console.error("❌ Email Sending Failed:", emailError);

      // Fallback: If email fails, log to console so you aren't stuck
      console.log("========================================");
      console.log(`🔑 FALLBACK OTP: ${otp}`);
      console.log("========================================");

      return res.status(500).json({ 
        message: "Failed to send email. Check server console for details.",
        error: emailError.message 
      });
    }
  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Reset password: send OTP if only email is provided, or verify OTP and set new password otherwise
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Only email provided: send OTP
  if (email && !otp && !newPassword) {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) return res.status(404).json({ message: "User not found" });

      if (user.provider && user.provider !== "local") {
        return res.status(400).json({ message: "Account uses Google Login. Cannot reset password." });
      }

      // Generate OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedOtp = crypto.createHash("sha256").update(generatedOtp).digest("hex");

      // Save OTP and expiry to DB
      user.resetOtp = hashedOtp;
      user.resetOtpExpiry = Date.now() + 10 * 60 * 1000; // 10 mins
      await user.save({ validateBeforeSave: false });

      // For DEV/console: log OTP.
      // In production, you would email the OTP to the user here.
      // eslint-disable-next-line no-console
      console.log("========================================");
      console.log(`🔒 OTP FOR ${email}`);
      console.log(`🔑 OTP CODE: ${generatedOtp}`);
      console.log("========================================");

      let previewUrl = undefined;
      // If using nodemailer's test account in dev, attach preview url
      if (process.env.NODE_ENV !== "production") {
        previewUrl = `Console OTP for DEV: ${generatedOtp}`;
      }
      return res.json({
        message: "OTP sent to your email",
        ...(previewUrl ? { previewUrl } : {})
      });

    } catch (err) {
      console.error("Reset Password Error (send OTP):", err);
      return res.status(500).json({ message: "Failed to send OTP", error: err.message });
    }
  }

  // Verify OTP and set new password
  if (email && otp && newPassword) {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) return res.status(404).json({ message: "User not found" });

      if (!user.resetOtp || !user.resetOtpExpiry) {
        return res.status(400).json({ message: "No reset request found" });
      }

      if (Date.now() > user.resetOtpExpiry) {
        return res.status(400).json({ message: "OTP expired" });
      }

      const hashed = crypto.createHash("sha256").update(otp).digest("hex");
      if (hashed !== user.resetOtp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      user.password = newPassword;
      user.resetOtp = null;
      user.resetOtpExpiry = null;
      await user.save();

      return res.json({ message: "Password reset successful" });
    } catch (err) {
      return res.status(500).json({ message: "Failed to reset password", error: err.message });
    }
  }

  // If neither case matches, bad/missing fields
  return res.status(400).json({ message: "Missing or invalid fields for this operation" });
};
