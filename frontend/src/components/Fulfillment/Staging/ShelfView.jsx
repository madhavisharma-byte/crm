"use client";

import React, { useState } from "react";
import { Filter, Download, ChevronDown } from "lucide-react";
import Sidebar from "../../(website)/Sidebar"; 
import DashboardHeader from "../../(website)/header";

/* =======================
   CONSTANT DATA
======================= */

const FILTER_TABS = [
    { label: "Ready to Pick", value: "ready" },
    { label: "Partial", value: "partial" },
    { label: "Cancelled", value: "cancelled" },
];

const TABLE_HEADERS = [
    "Shelf",
    "Bundle SKU Code",
    "Shipping Package",
    "Total Item Count",
    "Received Item count",
];

const EMPTY_STATE_IMG = "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const TabPill = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-1 rounded-full text-[12px] font-semibold transition-all border shrink-0 ${isActive
                ? "bg-[#2b6cee] text-white border-[#2b6cee] shadow-sm"
                : "bg-white text-[#94a3b8] border-[#94a3b8] hover:bg-slate-50"
            }`}
    >
        {label}
    </button>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-48 w-full">
        <div className="w-32 h-32 mb-4 opacity-40 grayscale flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden">
            <img src={EMPTY_STATE_IMG} alt="No records" className="w-full h-full object-cover" />
        </div>
        <p className="text-[14px] text-gray-500 font-medium">No records to show</p>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function BundleOccupiedPage() {
    const [activeTab, setActiveTab] = useState("ready");

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar Component */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Header */}
                <DashboardHeader />

                {/* 3. Sub-Header (Title, Filter Tabs, Actions) */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                        <h1 className="text-xl font-bold text-slate-800 whitespace-nowrap">Bundle Occupied</h1>
                        <div className="flex items-center gap-2">
                            {FILTER_TABS.map((tab) => (
                                <TabPill
                                    key={tab.value}
                                    label={tab.label}
                                    isActive={activeTab === tab.value}
                                    onClick={() => setActiveTab(tab.value)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-300 text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <Filter size={16} />
                            Filter
                        </button>
                        <button className="p-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition-all">
                            <Download size={18} />
                        </button>
                        <button className="flex items-center gap-2 bg-[#2b6cee] px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-all shadow-sm">
                            <span className="text-[14px] font-semibold">Bundle Occupied</span>
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                {/* 4. Table Section */}
                <div className="flex-1 overflow-x-auto">
                    <div className="min-w-max">
                        {/* Light Blue Table Header (Matches UI style) */}
                        <div className="flex items-center bg-[#eef4ff] border-b border-blue-100">
                            {TABLE_HEADERS.map((header, idx) => (
                                <div
                                    key={idx}
                                    className="px-6 py-4 text-[14px] font-medium text-slate-600 whitespace-nowrap"
                                    style={{
                                        minWidth: "180px",
                                        flex: "1"
                                    }}
                                >
                                    {header}
                                </div>
                            ))}
                        </div>

                        {/* 5. Table Body / Empty State */}
                        <EmptyState />
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