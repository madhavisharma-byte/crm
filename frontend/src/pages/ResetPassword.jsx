import React, { useState, useEffect } from "react";
import api from "../utils/api.js";
import { useNavigate, useLocation } from "react-router-dom";
import LeftPanel from "../components/LoginLeftPannel.jsx";
import { Lock, Mail, KeyRound, ArrowLeft, Send } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-populate email if coming from the forgot-password page
  const prefillEmail = location.state?.email || "";

  // State
  const [email, setEmail] = useState(prefillEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI State
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (prefillEmail) setEmail(prefillEmail);
  }, [prefillEmail]);

  // Handle sending OTP to email
  const handleSendOtp = async () => {
    setError("");
    setMessage("");
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return setError("Please enter a valid email address.");
    }
    setSendingOtp(true);
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setMessage(data.message || "OTP sent successfully. Check your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  // Handle password reset submit
  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (newPassword.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", { email, otp, newPassword });
      setMessage("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password. Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-0 md:p-0 bg-transparent">
      <div
        className="flex flex-row w-full h-screen max-w-none md:max-w-screen-2xl"
        style={{ backgroundColor: "var(--card)" }}
      >
        {/* Left Panel: Fixed 1/2 left side */}
        <div className="w-1/2 h-screen hidden md:block relative">
          <LeftPanel
            mode="forgot"
            title="Reset Your Password"
            description="Follow the steps to recover access to your account."
          />
        </div>

        {/* Right Panel: Fixed 1/2 right side */}
        <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
          <div className="w-full max-w-lg p-8 md:p-12 flex flex-col justify-center relative">
            <button
              onClick={() => navigate('/login')}
              className="absolute top-6 right-6 md:top-8 md:right-8 transition-colors flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--text)", opacity: 0.6 }}
              type="button"
            >
              <ArrowLeft size={16} /> Login
            </button>

            <div className="text-center mb-6 mt-4">
              <h2 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>
                Set New Password
              </h2>
              <p className="text-sm" style={{ color: "var(--text)", opacity: 0.6 }}>
                Enter the verification code and your new password.
              </p>
            </div>

            <form onSubmit={handleReset} className="space-y-4">
              {/* Email field */}
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "var(--text)", opacity: 0.8 }}>
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3" size={18} style={{ color: "var(--text)", opacity: 0.4 }} />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-24 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                    style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendingOtp || !email}
                    className="absolute right-1 top-1 bottom-1 px-3 bg-blue-50 text-blue-600 text-xs font-semibold rounded hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    {sendingOtp ? "Sending..." : <>Resend OTP <Send size={12} /></>}
                  </button>
                </div>
              </div>

              {/* OTP field */}
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "var(--text)", opacity: 0.8 }}>
                  OTP Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: "var(--text)", opacity: 0.4 }} />
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm tracking-widest font-mono"
                    style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                    value={otp}
                    required
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>

              {/* New password */}
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "var(--text)", opacity: 0.8 }}>
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: "var(--text)", opacity: 0.4 }} />
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                    style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                    value={newPassword}
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              {/* Confirm password */}
              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: "var(--text)", opacity: 0.8 }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: "var(--text)", opacity: 0.4 }} />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                    style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                    value={confirmPassword}
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Status Messages */}
              {message && (
                <p className="text-center text-sm text-green-600 font-medium bg-green-50 p-2 rounded">
                  {message}
                </p>
              )}
              {error && (
                <p className="text-center text-sm text-red-600 font-medium bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md mt-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;