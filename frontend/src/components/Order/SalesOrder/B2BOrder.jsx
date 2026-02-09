"use client";

import React, { useState } from "react";
import { Filter, Upload, Download, Plus, ChevronDown } from "lucide-react";
import Sidebar from "../../(website)/Sidebar"; 
import DashboardHeader from "../../(website)/header";

/* =======================
   CONSTANT DATA
======================= */

const FILTER_TABS = [
    "Pending", "Unverified", "Cancelled", "All",
    "Failed", "Putback Pending", "All"
];

const TABLE_HEADERS = [
    "Order ID", "Customer", "Products Orders",
    "Products Unallocated", "Channel", "State",
    "Status", "Expire Date", "Appointment Date"
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

export default function B2BOrdersPage() {
    const [activeTab, setActiveTab] = useState("Pending");

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar Component */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Dashboard Header Component */}
                <DashboardHeader />

                {/* 3. Sub-Header (Filters & Actions) */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-gray-100 bg-white sticky top-[header-height] z-20">
                    <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                        <h1 className="text-xl font-bold text-slate-800 whitespace-nowrap">B2B Orders</h1>
                        <div className="flex items-center gap-2">
                            {FILTER_TABS.map((tab, idx) => (
                                <FilterPill
                                    key={idx}
                                    label={tab}
                                    isActive={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                />
                            ))}
                            {/* More Dropdown */}
                            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium border border-slate-200 text-slate-400 hover:bg-slate-50">
                                More <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ActionButton icon={Filter} label="Filter" />
                        <div className="flex gap-1">
                            <button className="p-2.5 rounded-lg border border-slate-300 text-blue-600 hover:bg-slate-50 shadow-sm">
                                <Upload size={18} />
                            </button>
                            <button className="p-2.5 rounded-lg border border-slate-300 text-blue-600 hover:bg-slate-50 shadow-sm">
                                <Download size={18} />
                            </button>
                        </div>
                        <ActionButton label="Create" variant="primary" />
                    </div>
                </div>

                {/* 4. Table Section */}
                <div className="flex-1 overflow-x-auto">
                    {/* Light Blue Table Header Row */}
                    <div className="inline-flex min-w-full bg-[#eef4ff] border-b border-blue-100">
                        {/* Checkbox Placeholder */}
                        <div className="w-16 px-6 py-4 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-blue-200 rounded-full cursor-pointer hover:border-blue-500 transition-colors" />
                        </div>

                        {TABLE_HEADERS.map((header, idx) => (
                            <div
                                key={idx}
                                className="px-4 py-4 text-[14px] font-medium text-slate-600 whitespace-nowrap"
                                style={{
                                    minWidth: header === "Products Unallocated" ? "180px" : "140px",
                                    flex: "1"
                                }}
                            >
                                {header}
                            </div>
                        ))}
                    </div>

                    {/* 5. Empty Data State */}
                    <div className="flex flex-col items-center justify-center py-48">
                        <div className="w-32 h-32 mb-6 opacity-40 grayscale flex items-center justify-center bg-slate-50 rounded-lg">
                            <img
                                src="https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                                alt="Empty data"
                                className="w-20 h-20 object-contain"
                            />
                        </div>
                        <p className="text-slate-500 font-medium text-sm">No records to show</p>
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