import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.js';
import { useAuth } from '../state/AuthContext.jsx';
import LeftPanel from '../components/LoginLeftPannel.jsx';

// Backend expects: fullName, email, password, confirmPassword, phone, companyName, termsAccepted

const REGISTER_PAGE_TITLE = "Create Your Account";
const REGISTER_PAGE_SUBTITLE = "Join thousands of businesses already using our platform";
const TOGGLE_BUTTONS = [
  { text: 'Sign In', route: '/login', active: false },
  { text: 'Register', route: '/register', active: true }
];

const FORM_FIELDS = [
  {
    key: 'fullName',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
    type: 'text'
  },
  {
    key: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email address',
    required: true,
    type: 'email'
  },
  {
    key: 'phone',
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    required: false,
    type: 'tel'
  },
  {
    key: 'companyName',
    label: 'Company Name',
    placeholder: 'Enter your company name',
    required: false,
    type: 'text'
  }
];

const PASSWORD_FIELDS = [
  {
    key: 'password',
    label: 'Password',
    placeholder: 'Create a strong password',
    required: true
  },
  {
    key: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
    required: true
  }
];

const TERMS_TEXT = (
  <>
    I accept the <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a> <span className="text-red-500">*</span>
  </>
);

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const [formErrors, setFormErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (formErrors) setFormErrors(null);
  };

  const parseServerErrors = (err) => {
    if (err?.response?.data?.errors && Array.isArray(err.response.data.errors)) {
      const fieldMap = {};
      err.response.data.errors.forEach(e => {
        const key = e.param || e.path || 'general';
        fieldMap[key] = e.msg || e.message || 'Invalid field';
      });
      return fieldMap;
    }

    if (typeof err?.response?.data?.message === 'string') {
      return err.response.data.message;
    }

    if (typeof err?.message === 'string') {
      return err.message;
    }

    return 'Registration failed';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(null);

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setFormErrors('Please fill the required fields');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormErrors('Passwords do not match');
      return;
    }
    if (!formData.termsAccepted) {
      setFormErrors('Please accept Terms of Service');
      return;
    }

    (async () => {
      try {
        const payload = {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          termsAccepted: formData.termsAccepted,
        };
        const { data } = await api.post('/auth/register', payload);
        login(data.user, data.token);
        navigate('/');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Register error', err);
        setFormErrors(parseServerErrors(err));
      }
    })();
  };

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;

    const loadScript = () => {
      if (document.getElementById("google-id-script-register")) return;
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.id = "google-id-script-register";
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
                // eslint-disable-next-line no-console
                console.error("Google signup failed", err);
                setFormErrors(err.response?.data?.message || "Google signup failed");
              } finally {
                setGoogleLoading(false);
              }
            },
          });
          const container = document.getElementById("google-button-container-register");
          if (container) {
            window.google.accounts.id.renderButton(container, {
              theme: "outline",
              size: "large",
              width: "100%",
            });
          }
        }
      };
    };

    loadScript();
  }, [GOOGLE_CLIENT_ID, login, navigate]);

  const getFieldError = (field) => {
    if (!formErrors) return null;
    if (typeof formErrors === 'string') return null;
    return formErrors[field] || null;
  };

  const getFormGeneralError = () => {
    if (!formErrors) return null;
    if (typeof formErrors === 'string') return formErrors;
    return null;
  };

  // Responsive: apply much more margin top for form on small screens
  // --- REWRITE TO USE EFFECTIVE CSS RESPONSIVE UTILITIES AND/OR JS AS NEEDED ---
  // We'll use useEffect and useState to dynamically set the margin top based on the screen width
  const [formMarginTop, setFormMarginTop] = useState('');

  useEffect(() => {
    // Function to compute margin top for small screens
    const updateMarginTop = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 640) {
          setFormMarginTop('14rem');
        } else if (window.innerWidth < 768) {
          setFormMarginTop('3rem');
        } else {
          setFormMarginTop('');
        }
      }
    };
    updateMarginTop();
    window.addEventListener('resize', updateMarginTop);
    return () => window.removeEventListener('resize', updateMarginTop);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-0 md:p-0 bg-transparent">
      <div
        className={
          "flex flex-col md:flex-row w-full h-auto md:h-screen max-w-none md:max-w-screen-2xl"
        }
        style={{ backgroundColor: "var(--card)" }}
      >
        {/* Left Panel (appears first, always on top on mobile just like login) */}
        <div
          className={`
            w-full md:w-1/2
            flex-shrink-0 flex-grow-0
            min-h-[15rem] max-h-[30rem] md:min-h-0 md:max-h-none h-auto md:h-full
            order-1 md:order-none
          `}
          style={{
            ...(typeof window !== 'undefined' && window.innerWidth < 768
              ? { minHeight: "15rem", maxHeight: "30rem", height: "auto" }
              : { height: "100%" }),
          }}
        >
          <div className="w-full h-full flex md:block items-stretch content-stretch justify-center">
            <LeftPanel />
          </div>
        </div>
        {/* Register Form */}
        <div
          className={`
            w-full md:w-1/2
            flex flex-col
            justify-center
            p-3 xs:p-3 sm:p-6 md:p-12
            order-2 md:order-none
          `}
          style={{
            backgroundColor: "var(--card)",
            marginTop: formMarginTop // Now use state
          }}
        >
          <div className="w-full max-w-md mx-auto">
            {/* Title & Subtitle */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>{REGISTER_PAGE_TITLE}</h2>
              <p className="text-sm mt-2" style={{ color: "var(--text)", opacity: 0.6 }}>{REGISTER_PAGE_SUBTITLE}</p>
            </div>

            {/* Toggle Switch */}
            <div className="p-1 rounded-lg flex mb-8 max-w-sm mx-auto w-full" style={{ backgroundColor: "var(--bg)" }}>
              {TOGGLE_BUTTONS.map(btn => (
                <button
                  key={btn.text}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all
                    ${btn.active ? 'bg-blue-600 text-white shadow-sm' : 'hover:opacity-80'}`}
                  style={{ color: btn.active ? 'white' : 'var(--text)', opacity: btn.active ? 1 : 0.6 }}
                  onClick={() => btn.route && navigate(btn.route)}
                  disabled={btn.active}
                  type="button"
                >
                  {btn.text}
                </button>
              ))}
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>

              {/* General error message */}
              {getFormGeneralError() && (
                <div className="w-full bg-red-100 text-red-600 border border-red-300 rounded py-2 px-3 text-xs mb-2 text-center">
                  {getFormGeneralError()}
                </div>
              )}

              {/* Main Fields */}
              {FORM_FIELDS.map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text)", opacity: 0.8 }}>
                    {field.label}
                    {field.required && <span className="text-red-500"> *</span>}
                  </label>
                  <input
                    type={field.type}
                    name={field.key}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={formData[field.key]}
                    onChange={handleChange}
                    className={
                      "w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm " +
                      (getFieldError(field.key)
                        ? "border-red-400 focus:border-red-500"
                        : "focus:border-blue-500")
                    }
                    style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                    autoComplete="off"
                  />
                  {getFieldError(field.key) && (
                    <div className="text-xs text-red-500 mt-1">{getFieldError(field.key)}</div>
                  )}
                </div>
              ))}

              {/* Password Fields */}
              {PASSWORD_FIELDS.map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text)", opacity: 0.8 }}>
                    {field.label}
                    {field.required && <span className="text-red-500"> *</span>}
                  </label>
                  <div className="relative">
                    <input
                      type={
                        field.key === 'password'
                          ? (showPassword ? "text" : "password")
                          : (showConfirmPassword ? "text" : "password")
                      }
                      name={field.key}
                      placeholder={field.placeholder}
                      required={field.required}
                      value={formData[field.key]}
                      onChange={handleChange}
                      className={
                        "w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm " +
                        (getFieldError(field.key)
                          ? "border-red-400 focus:border-red-500"
                          : "focus:border-blue-500")
                      }
                      style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => field.key === "password" ? setShowPassword(v => !v) : setShowConfirmPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {(field.key === "password" ? showPassword : showConfirmPassword)
                        ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {getFieldError(field.key) && (
                    <div className="text-xs text-red-500 mt-1">{getFieldError(field.key)}</div>
                  )}
                </div>
              ))}

              {/* Terms Checkbox */}
              <div className="flex items-start mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                  style={{ borderColor: "var(--border)" }}
                  required
                />
                <label htmlFor="terms" className="ml-2 text-xs leading-tight" style={{ color: "var(--text)", opacity: 0.7 }}>
                  {TERMS_TEXT}
                </label>
              </div>
              {getFieldError('termsAccepted') && (
                <div className="text-xs text-red-500 mt-1 ml-1">{getFieldError('termsAccepted')}</div>
              )}

              {/* Submit Button */}
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md mt-4"
                type="submit"
                disabled={googleLoading}
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: "var(--border)" }}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2" style={{ backgroundColor: "var(--card)", color: "var(--text)", opacity: 0.5 }}>Or continue with</span>
              </div>
            </div>

            {/* Google Button */}
            <div id="google-button-container-register" className="w-full" />
            {!GOOGLE_CLIENT_ID && (
              <p className="text-xs text-center text-gray-400 mt-4">* Google signup not configured</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
