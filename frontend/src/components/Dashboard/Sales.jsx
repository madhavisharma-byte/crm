import React, { useState } from "react";
import { RefreshCcw, BarChart3 } from "lucide-react";

// ✅ IMPORT EXISTING LAYOUT COMPONENTS
import DashboardHeader from "../website/Header.jsx";
import Sidebar from "../website/Sidebar";

// --------------------
// CONSTANT DATA
// --------------------

const STAT_CARDS = [
  {
    title: "Today's Revenue",
    value: "₹0",
    subtext: "No sales yet"
  },
  {
    title: "Yesterday",
    value: "₹0",
    subtext: "₹0.00 (0.00%)",
    trend: "Stable"
  },
  {
    title: "Current Month",
    value: "₹0",
    subtext: "₹0.00 (0.00%)",
    trend: "Stable"
  }
];

const PERFORMANCE_SECTIONS = [
  { title: "Top Performing Channels" },
  { title: "Top Performing Categories" },
  { title: "Channel-wise Sales Performance", hasToggle: true, subtext: "₹0.00 Total Revenue" },
  { title: "Top Performing Products" },
  { title: "Channel-wise Top Performing Products" }
];

// --------------------
// REUSABLE COMPONENTS
// --------------------

const StatCard = ({ title, value, subtext, trend }) => (
  <div className="flex-1 min-w-[250px] md:min-w-[260px] lg:min-w-[300px] p-4 md:p-6 rounded-xl text-white shadow-lg bg-gradient-to-br from-blue-600 to-indigo-800">
    <p className="text-sm opacity-80 uppercase">{title}</p>
    <h3 className="text-2xl md:text-3xl font-bold mt-2">{value}</h3>
    <div className="mt-4 flex items-center gap-2">
      <span className="text-sm opacity-90">{subtext}</span>
      {trend && (
        <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
          {trend}
        </span>
      )}
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-8 md:py-12 bg-slate-50 rounded-lg border border-dashed">
    <BarChart3 size={40} md:size={48} className="text-slate-300 mb-4" />
    <p className="text-slate-500 font-medium">Data not available</p>
  </div>
);

const SectionHeader = ({ title, subtext, hasToggle }) => {
  const [active, setActive] = useState("Revenue");

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
      <div>
        <h4 className="text-base md:text-lg font-bold">{title}</h4>
        {subtext && <p className="text-sm text-slate-500">{subtext}</p>}
      </div>

      <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto justify-between sm:justify-end">
        <div className="flex items-center gap-1 text-xs text-slate-400">
          Jan 7, 12:09 PM
          <RefreshCcw size={12} />
        </div>

        {hasToggle && (
          <div className="flex border border-blue-600 rounded-lg p-1">
            {["Revenue", "Order Items"].map(tab => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-3 py-1 text-xs font-bold rounded ${
                  active === tab
                    ? "bg-blue-600 text-white"
                    : "text-blue-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const PerformanceSection = ({ title, subtext, hasToggle }) => (
  <div className="bg-white border rounded-xl p-4 md:p-5 shadow-sm">
    <SectionHeader title={title} subtext={subtext} hasToggle={hasToggle} />
    <EmptyState />
  </div>
);

// --------------------
// MAIN PAGE
// --------------------

const DashboardSales = () => {
  // For responsive sidebar toggling
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC]">
      {/* Fixed Sidebar */}
      <div>
        <div className="fixed top-0 left-0 z-40 h-full">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {/* This overlay appears only when sidebarOpen on small screens */}
      <div
        className={`block lg:hidden z-30 fixed inset-0 bg-black/40 transition-opacity duration-200 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Main Content Area - margin-left based on sidebar width */}
      <div
        className={`
          min-h-screen flex flex-col
          transition-all duration-300
          ${
            // Margin left for fixed sidebar width on large screens
            "lg:ml-80 ml-16"
          }
        `}
        style={{
          minWidth: 0,
          // Only for iOS Safari overscroll bounce fix
          WebkitOverflowScrolling: "touch"
        }}
      >
        {/* Responsive mobile header toggle */}
        <div className="block lg:hidden fixed top-2 left-4 z-50">
          <button
            aria-label="Open sidebar"
            className="bg-white border border-slate-200 rounded-lg shadow p-2 text-blue-600"
            onClick={() => setSidebarOpen(true)}
          >
            <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="relative flex-1 p-2 xs:p-3 sm:p-4 lg:p-8 space-y-6 md:space-y-8 overflow-x-auto">
          {/* Stats */}
          <div className="bg-white border rounded-xl p-4 md:p-6 shadow-sm">
            <SectionHeader title="Tenant Wise Sales Performance" />
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              {STAT_CARDS.map((item, index) => (
                <StatCard key={index} {...item} />
              ))}
            </div>
          </div>

          {/* Performance Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {PERFORMANCE_SECTIONS.slice(0, 2).map((sec, i) => (
              <PerformanceSection key={i} {...sec} />
            ))}
          </div>

          {/* Full Width Sections */}
          <div className="space-y-4 md:space-y-6">
            {PERFORMANCE_SECTIONS.slice(2).map((sec, i) => (
              <PerformanceSection key={i} {...sec} />
            ))}
          </div>
        </main>
      </div>
      {/* Additional style to make sure body does not scroll horizontally on mobile */}
      <style>{`
        html, body { max-width: 100vw; overflow-x: hidden; }
        @media (max-width: 1023px) {
          /* Hide fixed sidebar on small screens except overlay/drawer modality */
          .sidebar-fixed {
            left: ${sidebarOpen ? 0 : '-100vw'};
            transition: left 0.3s cubic-bezier(.4,0,.2,1);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardSales;