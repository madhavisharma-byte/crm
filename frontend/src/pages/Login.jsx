import React, { useState, useEffect } from "react";
import api from "../utils/api.js";
import { useAuth } from "../state/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import LeftPanel from "../components/LoginLeftPannel.jsx";

// SVG Component for Google Logo
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.user, data.token);
      navigate("/dashboard/overview");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      console.warn("VITE_GOOGLE_CLIENT_ID not configured");
      return;
    }
    const loadScript = () => {
      if (document.getElementById("google-id-script")) return;
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.id = "google-id-script";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: async (response) => {
              try {
                setGoogleLoading(true);
                const idToken = response.credential;
                const { data } = await api.post("/auth/google", { idToken });
                login(data.user, data.token);
                navigate("/dashboard");
              } catch (err) {
                setError(err.response?.data?.message || "Google login failed");
              } finally {
                setGoogleLoading(false);
              }
            },
          });
          const container = document.getElementById("google-button-container");
          if (container) {
            window.google.accounts.id.renderButton(container, {
              theme: "outline",
              size: "large",
              width: "100%",
            });
          }
        }
      };
      script.onerror = () => {
        console.error("Failed to load Google Identity Services script");
      };
    };

    loadScript();
  }, [GOOGLE_CLIENT_ID, login, navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-0 md:p-0 bg-transparent">
      <div
        className={`
          flex
          flex-col
          md:flex-row
          w-full
          h-auto
          md:h-screen
          max-w-none
          md:max-w-screen-2xl
          relative
        `}
        style={{ backgroundColor: "var(--card)" }}
      >
        {/* Left Panel */}
        <div
          className={`
            w-full
            md:w-1/2
            h-auto
            min-h-[250px]
            ${/* This makes the left panel cover the full viewport height on small screens */""}
            lg:min-h-screen
            flex
            md:block
            md:h-full
            z-10
          `}
          style={{
            position: 'relative',
          }}
        >
          {/* On small screens, make left panel fixed and full screen with proper stacking */}
          <LeftPanel />
        </div>

        {/* Right Panel */}
        <div
          className={`
            w-full
            md:w-1/2
            h-full
            flex
            items-center
            justify-center
            relative
            bg-opacity-95
            px-2
            py-10
            ${/* On mobile, add some background and spacing for readability over overlay */""}
          `}
          style={{
            backgroundColor: "var(--card)",
            minHeight: "100vh",
          }}
        >
          <div className="w-full max-w-md p-6 md:p-12 mx-auto flex flex-col justify-center bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-lg md:shadow-none">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-1" style={{ color: "var(--text)" }}>
                Welcome Back
              </h2>
              <p
                className="text-sm mb-6"
                style={{ color: "var(--text)", opacity: 0.6 }}
              >
                Sign in to access your dashboard
              </p>
              <div className="flex w-full mb-6">
                <button
                  type="button"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-l-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="flex-1 font-semibold py-2 rounded-r-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: "var(--bg)",
                    color: "var(--text)",
                    opacity: 0.7,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "var(--text)", opacity: 0.8 }}
                >
                  Email or Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email or username"
                  className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  style={{
                    backgroundColor: "var(--bg)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                  value={form.email}
                  required
                  autoComplete="username"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-1"
                  style={{ color: "var(--text)", opacity: 0.8 }}
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                    style={{
                      backgroundColor: "var(--bg)",
                      borderColor: "var(--border)",
                      color: "var(--text)",
                    }}
                    value={form.password}
                    required
                    autoComplete="current-password"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label
                  className="flex items-center cursor-pointer"
                  style={{ color: "var(--text)", opacity: 0.7 }}
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 mr-2"
                    style={{ borderColor: "var(--border)" }}
                    checked={rememberMe}
                    onChange={() => setRememberMe((v) => !v)}
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/reset-password')}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
              {error && (
                <p className="text-center text-sm text-red-500 font-semibold mt-1">
                  {error}
                </p>
              )}
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: "var(--border)" }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-2"
                  style={{
                    backgroundColor: "var(--card)",
                    color: "var(--text)",
                    opacity: 0.5,
                  }}
                >
                  Or continue with
                </span>
              </div>
            </div>

            <div id="google-button-container" className="w-full" />
            {!import.meta.env.VITE_GOOGLE_CLIENT_ID && (
              <>
                <button
                  type="button"
                  className="w-full border font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    color: "var(--text)",
                  }}
                  disabled
                >
                  <GoogleIcon />
                  Google
                </button>
                <p className="text-xs text-center text-gray-400 mt-4">
                  * Google login not configured
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Responsive fixes for small screens: show right panel with bg over left panel */}
      <style>
        {`
          @media (max-width: 1023px) {
            .md\\:w-1\\/2 {
              width: 100vw !important;
              left: 0 !important;
            }
            .md\\:h-full {
              height: auto !important;
              min-height: 0 !important;
            }
            .min-h-\\[250px\\] {
              min-height: 250px !important;
            }
            .md\\:block { display: block !important; }
            .lg\\:min-h-screen {
              min-height: 100vh !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AdminLogin;
