import React, { useState } from "react";
import { Bell } from "lucide-react";
import Sidebar from "../components/website/Sidebar";
import Header from "../components/website/Header";
import SettingsHeader from "../components/SettingsHeader";

const SettingsNotifications = () => {
  return (
    <div className="flex min-h-screen w-full font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-w-0 md:ml-64">
        <Header />
        <div className="pt-24 px-8 flex-1 overflow-y-auto">
          <SettingsHeader activeTab="Notifications" />
          <div className="rounded-xl shadow-sm border p-8 max-w-5xl mx-auto mt-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-blue-50 p-2.5 rounded-lg">
                <Bell className="text-blue-600 w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg" style={{ color: "var(--text)" }}>
                Notification Preferences
              </h3>
            </div>

            {/* --- Section 1: Order Updates --- */}
            <div className="mb-10">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-6" style={{ color: "var(--text)", opacity: 0.6 }}>
                Order Updates
              </h4>
              <div className="space-y-6">
                <ToggleRow
                  title="New Order Alert"
                  desc="Get notified when a new order is placed"
                  initialState={true}
                />
                <ToggleRow
                  title="Order Shipped Alert"
                  desc="Notify me when an order leaves the warehouse"
                  initialState={false}
                />
                <ToggleRow
                  title="Order Delivered"
                  desc="Receive confirmation upon delivery"
                  initialState={true}
                />
              </div>
            </div>

            {/* --- Section 2: Inventory Alerts --- */}
            <div className="mb-10 border-t pt-8" style={{ borderColor: "var(--border)" }}>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-6" style={{ color: "var(--text)", opacity: 0.6 }}>
                Inventory Alerts
              </h4>
              <div className="space-y-6">
                <ToggleRow
                  title="Low Stock Warning"
                  desc="Alert when stock falls below threshold"
                  initialState={true}
                />
                <ToggleRow
                  title="Out of Stock Alert"
                  desc="Immediate notification for zero stock"
                  initialState={true}
                />
              </div>
            </div>

            {/* --- Section 3: Payment Alerts --- */}
            <div className="mb-10 border-t pt-8" style={{ borderColor: "var(--border)" }}>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-6" style={{ color: "var(--text)", opacity: 0.6 }}>
                Payment Alerts
              </h4>
              <div className="space-y-6">
                <ToggleRow
                  title="Payment Received"
                  desc="Notification for successful payments"
                  initialState={false}
                />
                <ToggleRow
                  title="Refund Processed"
                  desc="Alerts for any processed refunds"
                  initialState={false}
                />
              </div>
            </div>

            {/* --- Section 4: System Alerts (Placeholder) --- */}
            <div className="border-t pt-8" style={{ borderColor: "var(--border)" }}>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-6" style={{ color: "var(--text)", opacity: 0.6 }}>
                System Alerts
              </h4>
              {/* No items currently */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ToggleRow = ({ title, desc, initialState }) => {
  const [enabled, setEnabled] = useState(initialState);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h5 className="text-sm font-semibold" style={{ color: "var(--text)" }}>{title}</h5>
        <p className="text-xs mt-1" style={{ color: "var(--text)", opacity: 0.6 }}>{desc}</p>
      </div>

      {/* Toggle Switch */}
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
    </div>
  );
};

export default SettingsNotifications;