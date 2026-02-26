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
        <div className="relative min-h-screen bg-white font-sans antialiased w-full">
            {/* 1. Sidebar */}
            {/* Fixed for large, collapses for sm/md, as in Overview.jsx */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="Returns" />
            </div>

            {/* 2. Responsive MAIN CONTENT AREA (left padding for sidebar on large, collapses on mobile/tablet) */}
            <div
                className={`
                    flex flex-col min-h-screen
                    transition-all
                    lg:pl-80 pl-16
                    md:pl-48
                    sm:pl-16
                    w-full
                `}
            >
                <DashboardHeader />

                {/* Header: Title and Filter Tabs - responsive stack for mobile */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 border-b border-gray-100 bg-white gap-3 md:gap-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <h1 className="text-base md:text-[16px] font-bold text-[#303e67] whitespace-nowrap">
                            Reverse Pickups
                        </h1>
                        {/* Filter Tabs */}
                        <div className="flex gap-2 sm:gap-3 flex-wrap">
                            {FILTER_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 sm:px-5 py-1 sm:py-1.5 rounded-full text-xs font-semibold transition-all border ${
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

                {/* Responsive Table Area */}
                <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-full xl:max-w-[1600px]">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left min-w-[1000px] md:min-w-[1400px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {/* No selection header for Reverse Pickups, just pure columns */}
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-[12px] sm:text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State */}
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length} className="py-20 sm:py-32 md:py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                                                    <div className="w-12 h-10 sm:w-16 sm:h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center">
                                                        <Search className="text-[#2b6cee]" size={24} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[13px] sm:text-[14px] text-gray-500 font-medium tracking-tight">
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
            {/* Responsive scrollbar styling for smaller devices */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }
                @media (max-width: 1023px) {
                    /* Adjust sidebar space like Overview.jsx on tablet */
                    .lg\\:pl-80 { padding-left: 4rem !important; }
                }
                @media (max-width: 767px) {
                    .md\\:pl-48 { padding-left: 4rem !important; }
                    .sm\\:pl-16 { padding-left: 4rem !important; }
                }
                @media (max-width: 640px) {
                    .sm\\:pl-16 { padding-left: 4rem !important; }
                }
            `}</style>
        </div>
    );
}