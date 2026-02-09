import React from 'react';
import { Store, Wifi, WifiOff, Plus } from "lucide-react";
import Sidebar from "../components/website/Sidebar";
import Header from "../components/website/Header";
import SettingsHeader from "../components/SettingsHeader";

// Platform connection details as a constant (to be replaced by backend API in future)
const platformConnections = [
  {
    name: "Amazon",
    orders: "156 orders",
    lastSync: "2 mins ago",
    status: "connected",
  },
  {
    name: "Flipkart",
    orders: "89 orders",
    lastSync: "5 mins ago",
    status: "connected",
  },
  {
    name: "Myntra",
    orders: "0 orders",
    lastSync: "Never",
    status: "disconnected",
  },
];

const PlatformRow = React.memo(function PlatformRow({ name, orders, lastSync, status }) {
  const isConnected = status === "connected";
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-5 border rounded-lg transition-colors" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
      {/* Left: Icon & Info */}
      <div className="flex items-start gap-4 mb-4 md:mb-0">
        <div className="mt-1">
          {isConnected ? (
            <Wifi className="text-green-500 w-5 h-5" />
          ) : (
            <WifiOff className="text-red-500 w-5 h-5" />
          )}
        </div>
        <div>
          <h4 className="font-semibold text-sm" style={{ color: "var(--text)" }}>{name}</h4>
          <p className="text-xs mt-1" style={{ color: "var(--text)", opacity: 0.6 }}>
            {orders} • Last sync: <span style={{ opacity: 0.8 }}>{lastSync}</span>
          </p>
        </div>
      </div>
      {/* Right: Status & Action */}
      <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white ${isConnected ? "bg-blue-600" : "bg-blue-500 opacity-80"
            }`}
        >
          {status}
        </span>
        <button className="px-4 py-2 border rounded-lg text-xs font-semibold transition-colors" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
          {isConnected ? "Configure" : "Connect"}
        </button>
      </div>
    </div>
  );
});

// Main Settings Page (Marketplaces view)
const SettingsPage = React.memo(function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-w-0 md:ml-64">
        <Header />
        {/* MAIN SETTINGS CONTENT after header/side, scrollable */}
        <div className="pt-24 px-8 flex-1 overflow-y-auto">
          <SettingsHeader activeTab="Marketplaces" />

          {/* Main Card "Platform Connections" */}
          <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-6">
              <Store className="text-blue-600 w-5 h-5" />
              <h3 className="font-bold" style={{ color: "var(--text)" }}>Platform Connections</h3>
            </div>

            {/* List of Platforms */}
            <div className="space-y-4">
              {platformConnections.map((platform) => (
                <PlatformRow
                  key={platform.name}
                  name={platform.name}
                  orders={platform.orders}
                  lastSync={platform.lastSync}
                  status={platform.status}
                />
              ))}
            </div>

            {/* Add Marketplace Button */}
            <button className="mt-4 w-full py-3 border border-dashed rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2" style={{ backgroundColor: "rgba(0,0,0,0.02)", borderColor: "var(--border)", color: "var(--text)", opacity: 0.7 }}>
              <Plus size={16} />
              Add New Marketplace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SettingsPage;