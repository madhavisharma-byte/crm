"use client";

import React, { useState } from "react";
import { Filter, Upload, Download, Plus } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/Header";

/* =======================
   CONSTANT DATA
======================= */

const FILTER_TABS = [
    "Pending", "Unverified", "Cancelled", "All",
    "Failed", "Putback Pending", "All", "More"
];

const TABLE_HEADERS = [
    "Order", "Created At", "Channel", "Customer",
    "Status", "Payment", "on Hold", "Products", "Channel Created At"
];

/* =======================
   REUSABLE COMPONENTS
======================= */

const FilterPill = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all whitespace-nowrap ${isActive
            ? "bg-[#2b6cee] text-white border-[#2b6cee] shadow-sm"
            : "bg-white text-slate-400 border-slate-200 hover:border-blue-400 hover:text-blue-500"
            }`}
    >
        {label}
    </button>
);

const ActionButton = ({ icon: Icon, label, variant = "outline", onClick }) => {
    const styles = {
        outline: "border border-slate-300 text-slate-600 hover:bg-slate-50",
        primary: "bg-[#2b6cee] text-white hover:bg-blue-700 shadow-sm",
        ghost: "bg-slate-100 text-slate-600 hover:bg-slate-200"
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${styles[variant]}`}
        >
            {Icon && <Icon size={16} />}
            {label}
        </button>
    );
};

/* =======================
   MAIN PAGE
======================= */

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState("Pending");

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar Rail & Panel */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Header */}
                <DashboardHeader />

                {/* 3. Sub-Header (Title, Filters, and Actions) */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                        <h1 className="text-xl font-bold text-slate-800 mr-2">Orders</h1>
                        <div className="flex items-center gap-3">
                            {FILTER_TABS.map((tab, idx) => (
                                <FilterPill
                                    key={idx}
                                    label={tab}
                                    isActive={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ActionButton icon={Filter} label="Filter" />
                        <div className="flex gap-1">
                            <button className="p-2.5 rounded-lg border border-slate-300 text-blue-600 hover:bg-slate-50">
                                <Upload size={18} />
                            </button>
                            <button className="p-2.5 rounded-lg border border-slate-300 text-blue-600 hover:bg-slate-50">
                                <Download size={18} />
                            </button>
                        </div>
                        <ActionButton label="Create POS" variant="primary" />
                        <ActionButton label="Create" variant="primary" />
                    </div>
                </div>

                {/* 4. Table Section */}
                <div className="flex-1 overflow-x-auto">
                    {/* Light Blue Table Header */}
                    <div className="inline-flex min-w-full bg-[#eef4ff] border-b border-blue-100">
                        {/* Checkbox placeholder */}
                        <div className="w-16 px-6 py-4 flex items-center">
                            <div className="w-5 h-5 border-2 border-slate-300 rounded-full cursor-pointer hover:border-blue-500 transition-colors" />
                        </div>

                        {TABLE_HEADERS.map((header, idx) => (
                            <div
                                key={idx}
                                className="px-4 py-4 text-[14px] font-medium text-slate-600 whitespace-nowrap"
                                style={{
                                    // Dynamic width for specific columns
                                    minWidth: header === "Channel Created At" ? "200px" : "140px",
                                    flex: "1"
                                }}
                            >
                                {header}
                            </div>
                        ))}
                    </div>

                    {/* Empty State / Table Content */}
                    <div className="flex flex-col items-center justify-center py-40 opacity-40">
                        <div className="w-24 h-24 mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                            <Plus size={40} className="text-slate-400" />
                        </div>
                        <p className="text-slate-500 font-medium">No orders found</p>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
        </div>
    );
}