"use client";

import React, { useState } from "react";
import { Filter } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/Header";

/* =======================
   CONSTANT DATA
======================= */

const STATUS_TABS = [
    { label: "Complete", value: "complete" },
    { label: "Processing", value: "processing" },
    { label: "All", value: "all" },
];

const TABLE_HEADERS = [
    "Dispatch Group",
    "State",
    "Created At",
    "Shipment Details",
    "Channel",
    "Action",
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
            <img src={EMPTY_STATE_IMG} alt="No data" className="w-full h-full object-cover" />
        </div>
        <p className="text-[14px] text-gray-500 font-medium">No records to show</p>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function DispatchGroupPage() {
    const [activeTab, setActiveTab] = useState("complete");

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar Component */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Header Component */}
                <DashboardHeader />

                {/* 3. Sub-Header (Filters & Tabs) */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-6">
                        <h1 className="text-[16px] font-bold text-[#303e67]">Dispatch Group</h1>
                        <div className="flex items-center gap-3">
                            {STATUS_TABS.map((tab) => (
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
                    </div>
                </div>

                {/* 4. Table Section with Horizontal Scroll */}
                <div className="flex-1 overflow-x-auto">
                    <div className="min-w-max">
                        {/* Light Blue Table Header Row (Matches design opacity) */}
                        <div className="flex items-center bg-[#2b6cee26] border-b border-blue-100">
                            {TABLE_HEADERS.map((header, idx) => (
                                <div
                                    key={idx}
                                    className="px-6 py-4 text-[14px] font-medium text-[#303d50] whitespace-nowrap"
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
        </div>
    );
}