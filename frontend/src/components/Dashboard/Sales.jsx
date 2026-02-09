import React, { useState } from "react";
import { RefreshCcw, BarChart3 } from "lucide-react";

// ✅ IMPORT EXISTING LAYOUT COMPONENTS
import DashboardHeader from "../(website)/Header";
import Sidebar from "../(website)/Sidebar";

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
  <div className="flex-1 min-w-[300px] p-6 rounded-xl text-white shadow-lg bg-gradient-to-br from-blue-600 to-indigo-800">
    <p className="text-sm opacity-80 uppercase">{title}</p>
    <h3 className="text-3xl font-bold mt-2">{value}</h3>
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
  <div className="flex flex-col items-center justify-center py-12 bg-slate-50 rounded-lg border border-dashed">
    <BarChart3 size={48} className="text-slate-300 mb-4" />
    <p className="text-slate-500 font-medium">Data not available</p>
  </div>
);

const SectionHeader = ({ title, subtext, hasToggle }) => {
  const [active, setActive] = useState("Revenue");

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h4 className="text-lg font-bold">{title}</h4>
        {subtext && <p className="text-sm text-slate-500">{subtext}</p>}
      </div>

      <div className="flex items-center gap-4">
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
                className={`px-4 py-1 text-xs font-bold rounded ${
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
  <div className="bg-white border rounded-xl p-5 shadow-sm">
    <SectionHeader title={title} subtext={subtext} hasToggle={hasToggle} />
    <EmptyState />
  </div>
);

// --------------------
// MAIN PAGE
// --------------------

const DashboardSales = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="p-4 lg:p-8 space-y-8">
          {/* Stats */}
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <SectionHeader title="Tenant Wise Sales Performance" />
            <div className="flex flex-wrap gap-4">
              {STAT_CARDS.map((item, index) => (
                <StatCard key={index} {...item} />
              ))}
            </div>
          </div>

          {/* Performance Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PERFORMANCE_SECTIONS.slice(0, 2).map((sec, i) => (
              <PerformanceSection key={i} {...sec} />
            ))}
          </div>

          {/* Full Width Sections */}
          <div className="space-y-6">
            {PERFORMANCE_SECTIONS.slice(2).map((sec, i) => (
              <PerformanceSection key={i} {...sec} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardSales;