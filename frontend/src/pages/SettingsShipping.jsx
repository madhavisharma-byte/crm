import React, { useState } from "react";
import { Truck, SlidersHorizontal } from "lucide-react";
import Sidebar from "../components/website/Sidebar";
import Header from "../components/website/Header";
import SettingsHeader from "../components/SettingsHeader";

// Hardcoded shipping providers list, for layout/demo (like Settings.jsx for marketplaces)
const shippingProviders = [
  {
    name: "Delhivery",
    version: "API v3.2",
    initials: "DEL",
    logoBg: "bg-gray-100 text-gray-600",
    service: "Standard & Express",
    status: "Connected",
    isActive: true,
  },
  {
    name: "Bluedart",
    version: "Surface & Air",
    initials: "BD",
    logoBg: "bg-blue-100 text-blue-600",
    service: "Express",
    status: "Connected",
    isActive: true,
  },
  {
    name: "Ekart Logistics",
    version: "eCommerce Spec.",
    initials: "EKT",
    logoBg: "bg-yellow-100 text-yellow-600",
    service: "Standard",
    status: "Not Connected",
    isActive: false,
  },
  {
    name: "Shiprocket",
    version: "Aggregator",
    initials: "SR",
    logoBg: "bg-purple-100 text-purple-600",
    service: "Multiple",
    status: "Connected",
    isActive: true,
  },
];

const SettingsShipping = React.memo(function SettingsShipping() {
  return (
    <div className="flex min-h-screen w-full font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      {/* Mark this as "settings" in sidebar explicitly so the tab is highlighted/active */}
      <Sidebar activePage="settings" />
      <div className="flex-1 flex flex-col h-full min-w-0 md:ml-64">
        <Header />
        <div className="pt-24 px-8 flex-1 overflow-y-auto">
          <SettingsHeader activeTab="Shipping" />

          <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-8">
            {/* --- Card 1: Shipping Providers --- */}
            <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              {/* Card Header */}
              <div className="flex items-center gap-2 mb-6">
                <Truck className="text-blue-600 w-5 h-5" />
                <h3 className="font-bold" style={{ color: "var(--text)" }}>Shipping Providers</h3>
              </div>
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 py-3 px-4 rounded-t-lg border-b text-xs font-bold uppercase tracking-wider mb-2" style={{ backgroundColor: "rgba(0,0,0,0.02)", borderColor: "var(--border)", color: "var(--text)", opacity: 0.7 }}>
                <div className="col-span-4">Provider</div>
                <div className="col-span-3">Service Type</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-3 text-right pr-12">Active</div>
              </div>
              <div className="space-y-1">
                {shippingProviders.map((provider) => (
                  <ProviderRow
                    key={provider.name}
                    {...provider}
                  />
                ))}
              </div>

              {/* Add Shipping Provider Button */}
              <button className="mt-4 w-full py-3 border border-dashed rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2" style={{ backgroundColor: "rgba(0,0,0,0.02)", borderColor: "var(--border)", color: "var(--text)", opacity: 0.7 }}>
                <Truck className="w-4 h-4" />
                Add New Shipping Provider
              </button>
            </div>

            {/* --- Card 2: Default Shipping Rules --- */}
            <div className="rounded-xl shadow-sm border p-6 w-full" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              {/* Card Header */}
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="text-indigo-600 w-5 h-5" />
                <h3 className="font-bold" style={{ color: "var(--text)" }}>Default Shipping Rules</h3>
              </div>
              <div className="rounded-lg p-4 flex items-center justify-between border" style={{ backgroundColor: "rgba(0,0,0,0.02)", borderColor: "var(--border)" }}>
                <div>
                  <h4 className="text-sm font-bold" style={{ color: "var(--text)" }}>Enable COD</h4>
                  <p className="text-xs mt-1" style={{ color: "var(--text)", opacity: 0.6 }}>
                    Cash on Delivery option
                  </p>
                </div>
                <ToggleSwitch initialState={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

/* Sub Components, styled/functional for harmony with Settings.jsx */

const ProviderRow = React.memo(function ProviderRow({
  name,
  version,
  initials,
  logoBg,
  service,
  status,
  isActive,
}) {
  const isConnected = status === "Connected";
  return (
    <div className="grid grid-cols-12 gap-4 items-center py-4 px-4 border-b transition-colors last:border-0" style={{ borderColor: "var(--border)" }}>
      {/* Column 1: Provider Info */}
      <div className="col-span-4 flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${logoBg}`}
        >
          {initials}
        </div>
        <div>
          <h4 className="text-sm font-bold" style={{ color: "var(--text)" }}>{name}</h4>
          <p className="text-[10px] font-medium" style={{ color: "var(--text)", opacity: 0.5 }}>{version}</p>
        </div>
      </div>
      {/* Column 2: Service Type */}
      <div className="col-span-3">
        <span className="text-sm font-medium" style={{ color: "var(--text)", opacity: 0.7 }}>{service}</span>
      </div>
      {/* Column 3: Status */}
      <div className="col-span-2">
        <span
          className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${isConnected
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
            }`}
        >
          {status}
        </span>
      </div>
      {/* Column 4: Active Toggle & Action */}
      <div className="col-span-3 flex items-center justify-between pl-4">
        <ToggleSwitch initialState={isActive} />
        <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline">
          Configure
        </button>
      </div>
    </div>
  );
});

const ToggleSwitch = ({ initialState }) => {
  const [enabled, setEnabled] = useState(initialState);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none"
      style={{ backgroundColor: enabled ? "rgb(37 99 235)" : "var(--border)" }}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${enabled ? "translate-x-5" : "translate-x-0"
          }`}
      />
    </button>
  );
};

export default SettingsShipping;