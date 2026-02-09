"use client";

import React, { useState } from "react";
import { Filter } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/header";

/* =======================
   CONSTANT DATA
======================= */

const TABLE_HEADERS = [
    "Pack Group",
    "User",
    "Created At",
    "Channel",
    "Shipment Details",
    "Action",
];

const EMPTY_STATE_IMG = "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const TabPill = ({ label, isActive }) => (
    <button
        className={`px-4 py-1 rounded-full text-[12px] font-semibold transition-all ${isActive
                ? "bg-[#2b6cee] text-white shadow-sm"
                : "bg-white text-slate-400 border border-slate-200 hover:border-blue-400"
            }`}
    >
        {label}
    </button>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-48 w-full">
        <div className="w-32 h-32 mb-4 opacity-40 grayscale flex items-center justify-center bg-slate-50 rounded-lg">
            <img src={EMPTY_STATE_IMG} alt="No data" className="w-20 h-20 object-contain" />
        </div>
        <h2 className="text-[16px] text-gray-700 font-bold mb-1">No Pack Groups found</h2>
        <p className="text-[14px] text-gray-500 font-medium">
            This page is rendering successfully, but there are no records or errors to display.
        </p>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function PackGroupPage() {
    // Why is this page showing in your UI as if "everything is ok"?
    // It's because, with no errors thrown and no Pack Group data returned,
    // the page renders normally and simply shows the EmptyState component below.
    // That makes the UI appear "fine" to the user even if there's no real data.
    // The table header and styling remain as before.

    const [activeTab] = useState("New");

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar Component */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Header Component */}
                <DashboardHeader />

                {/* 3. Sub-Header (Filters & Actions) */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-6">
                        <h1 className="text-xl font-bold text-slate-800">Pack Group</h1>
                        <div className="flex items-center gap-2">
                            <TabPill label="New" isActive={activeTab === "New"} />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-300 text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <Filter size={16} />
                            Filter
                        </button>
                    </div>
                </div>

                {/* 4. Table Section */}
                <div className="flex-1 overflow-x-auto overflow-y-auto">
                    <div className="min-w-max">
                        {/* Light Blue Table Header Row */}
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
        </div>
    );
}