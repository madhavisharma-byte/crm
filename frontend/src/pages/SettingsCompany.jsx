import React from "react";
import { Building2, UploadCloud } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/header";
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
    <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
      {label}
    </label>
    <input
      type="text"
      name={name}
      defaultValue={value}
      className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
    />
  </div>
));

// Main Company Settings Page
const SettingsCompanyPage = () => {
  // Optionally, you could use useState here if you plan to make this editable/controlled
  // const [details, setDetails] = React.useState(companyDetails);

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F6] font-sans text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-w-0 md:ml-64">
        <Header />
        {/* MAIN COMPANY SETTINGS CONTENT after header/sidebar, scrollable */}
        <div className="pt-24 px-8 flex-1 overflow-y-auto">
          <SettingsHeader activeTab="Company" />

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 max-w-4xl mx-auto">
            {/* Card Header/Title */}
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-50 p-2.5 rounded-lg">
                <Building2 className="text-blue-600 w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  Company Profile
                </h3>
                <p className="text-sm text-gray-500">
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
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    defaultValue={companyDetails.address}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
                  />
                </div>
              </div>
              {/* RIGHT: Logo Upload col-span-2 */}
              <div className="lg:col-span-2 w-full">
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  Company Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 p-6 flex flex-col items-center justify-center text-center h-48 cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all group">
                  <div className="bg-white p-3 rounded-full mb-3 group-hover:bg-blue-100 transition-colors">
                    <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
                  </div>
                  <p className="text-xs font-medium text-gray-600 mb-1">
                    Click to upload
                  </p>
                  <p className="text-[10px] text-gray-400 leading-tight">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 text-center">
                  Recommended size: 150x150px.
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-gray-200/50">
              <button className="px-6 py-2.5 rounded-lg border border-blue-600 text-blue-600 text-sm font-semibold hover:bg-blue-50 transition-colors">
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