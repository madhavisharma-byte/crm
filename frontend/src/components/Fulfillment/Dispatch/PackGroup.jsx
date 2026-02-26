"use client";

import React, { useState } from "react";
import { Filter } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

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
        className={`px-4 py-1 rounded-full text-[12px] font-semibold transition-all ${
            isActive
                ? "bg-[#2b6cee] text-white shadow-sm"
                : "bg-white text-slate-400 border border-slate-200 hover:border-blue-400"
        }`}
    >
        {label}
    </button>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-24 md:py-48 w-full">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-4 opacity-40 grayscale flex items-center justify-center bg-slate-50 rounded-lg">
            <img src={EMPTY_STATE_IMG} alt="No data" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
        </div>
        <h2 className="text-[15px] md:text-[16px] text-gray-700 font-bold mb-1">No Pack Groups found</h2>
        <p className="text-[13px] md:text-[14px] text-gray-500 font-medium text-center px-3">
            This page is rendering successfully, but there are no records or errors to display.
        </p>
    </div>
);

/* =======================
   MAIN PAGE (Responsive for All Devices)
======================= */

export default function PackGroupPage() {
    const [activeTab] = useState("New");

    return (
        <div className="
            relative min-h-screen bg-[#F8FAFC] font-sans antialiased
            w-full flex
        ">
            {/* Responsive Sidebar: fixed for desktop, icon-rail for mobile/tablet */}
            {/* Sidebar for large screens */}
            <aside className="fixed top-0 left-0 h-screen z-50 hidden sm:block">
                <Sidebar />
            </aside>
            {/* Icon-rail Sidebar for mobile (shows only icons, similar to Overview.jsx) */}
            <aside className="fixed top-0 left-0 h-screen z-50 flex sm:hidden bg-white border-r border-slate-100 flex-col items-center justify-start w-16 py-4">
                <Sidebar sidebarType="icon" />
            </aside>

            <div
                className={`
                    flex-1 flex flex-col min-w-0
                    transition-all
                    pl-16
                    md:pl-48
                    lg:pl-80
                    bg-white
                    min-h-screen
                `}
            >
                {/* 2. Global Header Component */}
                <DashboardHeader />

                {/* 3. Sub-Header (Filters & Actions) */}
                <div className="sticky top-0 z-20 bg-white border-b border-gray-100 w-full">
                    {/* Responsive flex to match Overview style */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-3 md:px-6 py-3 w-full">
                        <div className="flex items-center gap-4 md:gap-6 min-w-0 flex-1">
                            <h1 className="text-[16px] md:text-xl font-bold text-slate-800 whitespace-nowrap">
                                Pack Group
                            </h1>
                            {/* Responsive group: tabpill and filter icon aligned for small screens */}
                            <div className="flex items-center gap-2 relative">
                                <TabPill label="New" isActive={activeTab === "New"} />
                                {/* On small screens, show filter button at end of pills */}
                                <button className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm font-semibold border border-slate-300 text-slate-600 hover:bg-slate-50 transition-all shadow-sm whitespace-nowrap sm:hidden ml-2">
                                    <Filter size={16} />
                                </button>
                            </div>
                        </div>
                        {/* On desktop, show original filter button on right */}
                        <div className="flex items-center gap-2 hidden sm:flex">
                            <button className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-semibold border border-slate-300 text-slate-600 hover:bg-slate-50 transition-all shadow-sm whitespace-nowrap">
                                <Filter size={16} />
                                <span className="hidden sm:inline">Filter</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4. Table Section */}
                <main className="flex-1 p-2 sm:p-4 md:p-8 w-full max-w-[1600px] bg-white">
                    <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white custom-scrollbar">
                        <table className="w-full text-left min-w-[900px] border-collapse">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {TABLE_HEADERS.map((header, idx) => (
                                        <th key={idx} className="px-4 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={TABLE_HEADERS.length} className="py-16 md:py-24 text-center">
                                        <EmptyState />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .custom-scrollbar::-webkit-scrollbar { height: 6px; background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }

                @media (max-width: 1023px) {
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