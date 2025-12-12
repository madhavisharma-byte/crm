import React from 'react';
import { Store, Wifi, WifiOff, Plus } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/header";
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
    <div className="flex flex-col md:flex-row md:items-center justify-between p-5 border border-gray-200 rounded-lg hover:border-blue-200 transition-colors bg-white">
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
          <h4 className="font-semibold text-gray-800 text-sm">{name}</h4>
          <p className="text-xs text-gray-500 mt-1">
            {orders} • Last sync: <span className="text-gray-400">{lastSync}</span>
          </p>
        </div>
      </div>
      {/* Right: Status & Action */}
      <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white ${
            isConnected ? "bg-blue-600" : "bg-blue-500 opacity-80"
          }`}
        >
          {status}
        </span>
        <button className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
          {isConnected ? "Configure" : "Connect"}
        </button>
      </div>
    </div>
  );
});

// Main Settings Page (Marketplaces view)
const SettingsPage = React.memo(function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F6] font-sans text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-w-0 md:ml-64">
        <Header />
        {/* MAIN SETTINGS CONTENT after header/side, scrollable */}
        <div className="pt-24 px-8 flex-1 overflow-y-auto">
          <SettingsHeader activeTab="Marketplaces" />

          {/* Main Card "Platform Connections" */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-6">
              <Store className="text-blue-600 w-5 h-5" />
              <h3 className="font-bold text-gray-800">Platform Connections</h3>
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
            <button className="mt-4 w-full py-3 border border-dashed border-gray-300 rounded-lg bg-gray-50 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition-all flex items-center justify-center gap-2">
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