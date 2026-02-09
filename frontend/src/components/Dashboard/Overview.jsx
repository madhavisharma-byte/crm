import React from "react";
import {
    TrendingUp,
    ShoppingCart,
    ChevronRight,
    RefreshCcw,
    Wifi
} from "lucide-react";
import Sidebar from "../(website)/Sidebar";
import Header from "../(website)/header";

const STATS_DATA = [
    {
        title: "Today's Revenue",
        value: "₹73,680",
        subtext: "Yesterday's Revenue: ₹0.00",
        icon: (props) => <TrendingUp {...props} className="text-yellow-500" />,
        gradientClass: "bg-gradient-to-br from-blue-600 to-blue-800"
    },
    {
        title: "Today's Order Items",
        value: "0",
        subtext: "Yesterday's Order Items: 0",
        icon: (props) => <ShoppingCart {...props} className="text-blue-500" />,
        gradientClass: "bg-gradient-to-br from-blue-500 to-blue-700"
    }
];

const RETAIL_ORDER_ALERTS = [
    { label: "Pending Orders", count: 24 },
    { label: "SLA Breached", count: 0, isCritical: true },
    { label: "Near SLA Breach", count: 0, isCritical: true },
    { label: "Shipment Count error", count: 0, isCritical: true },
    { label: "Failed Notification Count", count: 0, isCritical: true },
    { label: "Failed Orders", count: 0, isCritical: true },
    { label: "Unverified Orders", count: 0, isCritical: true },
    { label: "Unfillfillable Retail Order Items", count: 0, isCritical: true }
];

const BUSINESS_ORDER_ALERTS = [
    { label: "Pending Orders", count: 24 },
    { label: "Unfillfillable Business Order Items", count: 0 },
    { label: "Unverified Orders", count: 0 },
    { label: "Unallocated Orders", count: 0 },
    { label: "Allocated Orders", count: 12, isCritical: true },
    { label: "Ready To Ship", count: 0 },
    { label: "Dispatched", count: 0 },
    { label: "Manifested", count: 0 }
];

const PENDING_RETAIL_ORDERS = [
    { label: "Pending Verification", count: 24 },
    { label: "Yet to be Packed", count: 0 },
    { label: "Label Generated", count: 0 }
];

const PRODUCT_ALERTS = [
    { label: "Failed Inventory", count: 24 },
    { label: "Disabled Inventory", count: 0, isCritical: true },
    { label: "Failed Price Sync", count: 0, isCritical: true }
];

/* =====================
   REUSABLE COMPONENTS
===================== */

// Improved square icon container for stat cards
const StatCard = ({ title, value, subtext, icon: Icon, gradientClass }) => (
    <div className={`rounded-xl p-6 text-white shadow-lg ${gradientClass} flex-1 min-w-[300px]`}>
        <div className="flex justify-between items-center">
            <div>
                <p className="text-lg opacity-90">{title}</p>
                <h3 className="text-3xl font-bold mt-3 mb-2">{value}</h3>
                <p className="text-sm opacity-75 mt-2">{subtext}</p>
            </div>
            <div
                className="flex items-center justify-center bg-white rounded-xl"
                style={{
                    width: 56,
                    height: 56,
                    minWidth: 56,
                    minHeight: 56,
                    aspectRatio: "1 / 1",
                }}
            >
                {/* To help perfectly center and square the icon */}
                <Icon size={32} />
            </div>
        </div>
        <div className="mt-4 flex justify-end text-xs opacity-70 gap-1">
            <span>Jan 7, 12:09 PM</span>
            <RefreshCcw size={12} />
        </div>
    </div>
);

const AlertItem = ({ label, count, isCritical }) => (
    <div className="flex justify-between px-4 py-3 hover:bg-slate-50 cursor-pointer">
        <span className="text-sm text-slate-600">{label}</span>
        <div className="flex items-center gap-3">
            <span
                className={`text-white text-[11px] font-bold px-3 rounded-full ${isCritical ? "bg-red-500" : "bg-blue-600"
                    }`}
            >
                {count}
            </span>
            <ChevronRight size={16} className="text-slate-300" />
        </div>
    </div>
);

const AlertBox = ({ title, items, extraHeader }) => (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between bg-slate-50">
            <h4 className="font-bold text-slate-700">{title}</h4>
            <div className="flex gap-2 text-xs text-slate-400">
                <span>Jan 7, 12:09 PM</span>
                <RefreshCcw size={12} />
            </div>
        </div>
        {extraHeader && <div className="p-3 border-b">{extraHeader}</div>}
        <div className="divide-y">
            {items.map((item, i) => (
                <AlertItem key={i} {...item} />
            ))}
        </div>
    </div>
);

const DashboardOverview = () => {
    return (
        <div className="flex bg-[#F8FAFC] min-h-screen h-screen max-h-screen">
            {/* Sidebar stays fixed on scroll using sticky */}
            <div className="sticky top-0 left-0 z-30 h-screen flex-shrink-0">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                {/* Scrollable content area */}
                <div
                    className="p-6 space-y-8 flex-1 min-h-0 overflow-y-auto custom-scrollbar"
                    style={{ maxHeight: "calc(100vh - 64px)" }} // adjust 64px if your Header height is different
                >
                    {/* Stats */}
                    <div className="flex flex-wrap gap-6">
                        {STATS_DATA.map((stat, i) => (
                            <StatCard key={i} {...stat} />
                        ))}
                    </div>

                    {/* Alerts */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        <AlertBox title="Retail Order Alerts" items={RETAIL_ORDER_ALERTS} />
                        <AlertBox title="Business Order Alerts" items={BUSINESS_ORDER_ALERTS} />
                        <AlertBox
                            title="Pending Retail Orders"
                            items={PENDING_RETAIL_ORDERS}
                            extraHeader={
                                <div className="flex gap-2">
                                    <select className="flex-1 text-xs border rounded p-1.5">
                                        <option>Today</option>
                                    </select>
                                    <select className="flex-1 text-xs border rounded p-1.5">
                                        <option>Select Channels</option>
                                    </select>
                                </div>
                            }
                        />
                    </div>

                    {/* Bottom */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        <AlertBox title="Product Alert" items={PRODUCT_ALERTS} />

                        <div className="bg-white border rounded-xl shadow-sm">
                            <div className="p-4 border-b flex justify-between bg-slate-50">
                                <h4 className="font-bold">Channel Alert</h4>
                                <RefreshCcw size={12} />
                            </div>

                            <div className="p-4 flex justify-between">
                                <div className="flex gap-3">
                                    <Wifi className="text-green-500" />
                                    <div>
                                        <p className="font-bold text-sm">Connectors</p>
                                        <p className="text-xs text-slate-400">Amazon</p>
                                    </div>
                                </div>
                                <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                                    connected
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
