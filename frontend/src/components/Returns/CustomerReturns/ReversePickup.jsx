"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */
const FILTER_TABS = [
    "Unapproved",
    "Unassigned Pickups",
    "Pickup Pendings",
    "Picked",
    "Received",
    "Completed",
    "Courier disputed",
    "All",
    "Pending CIR Return Invoice",
    "More"
];

const TABLE_COLUMNS = [
    "Reverse Pickup",
    "Order",
    "Required Action",
    "Tracking Status",
    "Status",
    "Pickup Provider",
    "Tracking",
    "Replacement SO",
    "Return Reason",
    "Return Date",
    "Reference Code",
    "Bulk Return ID",
    "Created Date",
];

export default function ReversePickups() {
    const [activeTab, setActiveTab] = useState("Unapproved");

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar */}
            <Sidebar activePage="Returns" />

            {/* 2. MAIN CONTENT AREA with standard width (no ml-[]), same as AwaitingActions.jsx */}
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader />

                {/* Title and Filter Tabs - standard header height and spacing */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-6">
                        <h1 className="text-[16px] font-bold text-[#303e67]">Reverse Pickups</h1>
                        {/* Filter Tabs */}
                        <div className="flex gap-3">
                            {FILTER_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                                        activeTab === tab
                                            ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                                            : "text-gray-400 border-gray-300 hover:border-gray-400"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* No create button for Reverse Pickups (similar to AwaitingActions) */}
                </div>

                {/* Table Area: matches width/height as AwaitingActions.jsx */}
                <main className="flex-1 p-8 max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[1400px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {/* No selection header for Reverse Pickups, just pure columns */}
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-6 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State */}
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length} className="py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-32 h-32 mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                                                    <div className="w-16 h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center">
                                                        <Search className="text-[#2b6cee]" size={28} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[14px] text-gray-500 font-medium tracking-tight">
                                                No records to show
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}