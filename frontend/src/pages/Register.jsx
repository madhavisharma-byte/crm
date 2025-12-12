import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LeftPanel from '../components/LoginLeftPannel.jsx';

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

const ROLE_OPTIONS = [
  { value: 'Viewer', label: 'Viewer' },
  { value: 'Editor', label: 'Editor' },
  { value: 'Admin', label: 'Admin' }
];

const TERMS_TEXT = (
  <>
    I accept the <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a> <span className="text-red-500">*</span>
  </>
);

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  // Optimize: Put form state in a single object (ready for further API wiring)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    password: '',
    confirmPassword: '',
    role: ROLE_OPTIONS[0].value,
    termsAccepted: false
  });

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Submit - future: connect to backend
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Form validation & API integration
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-10 px-4">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1100px] bg-white rounded-xl overflow-hidden shadow-2xl">

        <LeftPanel />

        {/* Right Side - Scrollable Form Panel */}
        <div className="w-full lg:w-7/12 bg-white p-8 md:p-12 flex flex-col justify-center">

          {/* Title & Subtitle */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{REGISTER_PAGE_TITLE}</h2>
            <p className="text-gray-500 text-sm mt-2">{REGISTER_PAGE_SUBTITLE}</p>
          </div>

          {/* Toggle Switch */}
          <div className="bg-gray-100 p-1 rounded-lg flex mb-8 max-w-sm mx-auto w-full">
            {TOGGLE_BUTTONS.map(btn => (
              <button
                key={btn.text}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all
                  ${btn.active ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
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

            {/* Main Fields */}
            {FORM_FIELDS.map(field => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
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
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  autoComplete="off"
                />
              </div>
            ))}

            {/* Password Fields */}
            {PASSWORD_FIELDS.map(field => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
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
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
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
              </div>
            ))}

            {/* Role Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Role
              </label>
              <div className="relative">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm appearance-none cursor-pointer"
                >
                  {ROLE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start mt-2">
              <input
                type="checkbox"
                id="terms"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                required
              />
              <label htmlFor="terms" className="ml-2 text-xs text-gray-500 leading-tight">
                {TERMS_TEXT}
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md mt-4"
              type="submit"
            >
              Create Account
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
