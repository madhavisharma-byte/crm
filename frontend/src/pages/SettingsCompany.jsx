import React from "react";
import { Building2, UploadCloud } from "lucide-react";
import Sidebar from "../components/(website)/Sidebar";
import Header from "../components/(website)/Header";
import SettingsHeader from "../components/SettingsHeader";

// Company details placeholder (to be fetched/updated via backend API)
const companyDetails = {
  companyName: "Acme Innovations Ltd.",
  gstNumber: "29GGGGG1314R9Z6",
  city: "San Francisco",
  pincode: "94107",
  address: "123 Tech Park, Silicon Valley Blvd, Suite 400",
  logo: "", // logo file url or base64 string (if any, else leave blank)
};

// Single input - optimized subcomponent
const FormInput = React.memo(({ label, value, name }) => (
  <div className="w-full">
    <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "var(--text)", opacity: 0.6 }}>
      {label}
    </label>
    <input
      type="text"
      name={name}
      defaultValue={value}
      className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
      style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
    />
  </div>
));

// Main Company Settings Page
const SettingsCompanyPage = () => {
  // Optionally, you could use useState here if you plan to make this editable/controlled
  // const [details, setDetails] = React.useState(companyDetails);

  return (
    <div className="flex min-h-screen w-full font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-w-0 md:ml-64">
        <Header />
        {/* MAIN COMPANY SETTINGS CONTENT after header/sidebar, scrollable */}
        <div className="pt-24 px-8 flex-1 overflow-y-auto">
          <SettingsHeader activeTab="Company" />

          <div className="rounded-xl shadow-sm border p-6 max-w-4xl mx-auto" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            {/* Card Header/Title */}
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-50 p-2.5 rounded-lg">
                <Building2 className="text-blue-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg" style={{ color: "var(--text)" }}>
                  Company Profile
                </h3>
                <p className="text-sm" style={{ color: "var(--text)", opacity: 0.6 }}>
                  Update your company details and logo
                </p>
              </div>
            </div>

            {/* Form Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
              {/* LEFT: Inputs col-span-3 */}
              <div className="lg:col-span-3 flex flex-col gap-6">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Company Name"
                    name="companyName"
                    value={companyDetails.companyName}
                  />
                  <FormInput
                    label="GST Number"
                    name="gstNumber"
                    value={companyDetails.gstNumber}
                  />
                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="City"
                    name="city"
                    value={companyDetails.city}
                  />
                  <FormInput
                    label="Pincode"
                    name="pincode"
                    value={companyDetails.pincode}
                  />
                </div>
                {/* Address */}
                <div>
                  <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "var(--text)", opacity: 0.6 }}>
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={companyDetails.address}
                    className="w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                    style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                  />
                </div>
              </div>
              {/* RIGHT: Logo Upload col-span-2 */}
              <div className="lg:col-span-2 w-full">
                <label className="block text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: "var(--text)", opacity: 0.6 }}>
                  Company Logo
                </label>
                <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center h-48 cursor-pointer hover:border-blue-400 transition-all group" style={{ backgroundColor: "rgba(0,0,0,0.02)", borderColor: "var(--border)" }}>
                  <div className="p-3 rounded-full mb-3 transition-colors" style={{ backgroundColor: "var(--bg)" }}>
                    <UploadCloud className="w-6 h-6 group-hover:text-blue-500" style={{ color: "var(--text)", opacity: 0.5 }} />
                  </div>
                  <p className="text-xs font-medium mb-1" style={{ color: "var(--text)", opacity: 0.8 }}>
                    Click to upload
                  </p>
                  <p className="text-[10px] leading-tight" style={{ color: "var(--text)", opacity: 0.5 }}>
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
                <p className="text-[10px] mt-2 text-center" style={{ color: "var(--text)", opacity: 0.5 }}>
                  Recommended size: 150x150px.
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 mt-10 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
              <button className="px-6 py-2.5 rounded-lg border border-blue-600 text-blue-600 text-sm font-semibold transition-colors hover:opacity-80">
                Edit Detail
              </button>
              <button className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsCompanyPage;