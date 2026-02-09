"use client";

import React, { useState } from "react";
import { Filter, Zap } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/header";

/* =======================
   CONSTANT DATA
======================= */

const FILTER_TABS = [
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
    { label: "All", value: "all" },
];

const TABLE_HEADERS = [
    "Manifest code",
    "Channel",
    "Shipping Provider",
    "Shipment Method",
    "No. of Items",
    "Quick Dispatch Group",
    "Created",
    "Status",
    "Created At",
    "Action",
];

const EMPTY_STATE_IMG = "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGF2YXRhcnxlbnwxfHx8fDE3Njk2MjA0ODF8MA&ixlib=rb-4.1.0&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const FilterPill = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-1 rounded-full text-[13px] font-medium border transition-all whitespace-nowrap ${isActive
                ? "bg-[#2b6cee] text-white border-[#2b6cee] shadow-sm"
                : "bg-white text-[#94a3b8] border-slate-200 hover:border-blue-400 hover:text-blue-500"
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
        <p className="text-[14px] text-gray-500 font-medium tracking-tight">No records to show</p>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function ManifestsPage() {
    const [activeTab, setActiveTab] = useState("open");

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar Component */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Header */}
                <DashboardHeader />

                {/* 3. Sub-Header (Filters & Actions) */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                        <h1 className="text-xl font-bold text-slate-800 whitespace-nowrap">Manifests</h1>
                        <div className="flex items-center gap-2">
                            {FILTER_TABS.map((tab) => (
                                <FilterPill
                                    key={tab.value}
                                    label={tab.label}
                                    isActive={activeTab === tab.value}
                                    onClick={() => setActiveTab(tab.value)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-300 text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <Filter size={16} />
                            Filter
                        </button>
                        <button className="flex items-center gap-2 bg-[#2b6cee] px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-all shadow-sm">
                            <Zap size={16} fill="white" />
                            <span className="text-[14px] font-semibold">Create Manifests with Quick Dispatch</span>
                        </button>
                    </div>
                </div>

                {/* 4. Table Area with Horizontal Scroll support */}
                <div className="flex-1 overflow-x-auto">
                    <div className="min-w-max">
                        {/* Table Header Row (matches the light blue background from the design) */}
                        <div className="flex items-center bg-[#2b6cee26] border-b border-blue-100">
                            {TABLE_HEADERS.map((header, idx) => (
                                <div
                                    key={idx}
                                    className="px-4 py-4 text-[14px] font-semibold text-[#303d50] whitespace-nowrap"
                                    style={{
                                        // Set specific widths for columns with longer titles
                                        minWidth: header === "Quick Dispatch Group" ? "200px" : "140px",
                                        flex: "1"
                                    }}
                                >
                                    {header}
                                </div>
                            ))}
                        </div>

                        {/* 5. Empty State */}
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