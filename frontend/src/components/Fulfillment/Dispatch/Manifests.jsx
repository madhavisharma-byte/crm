"use client";

import React, { useState } from "react";
import { Filter, Zap } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

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

const EMPTY_STATE_IMG = "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGF2YXRhcnxlbnwxfHx8fDE3Njk2MjA0ODF8MA&ixlib=rb-4.1.0&q=80&w=1080";

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
        <div className="relative bg-[#F8FAFC] min-h-screen w-full font-sans antialiased">
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar />
            </div>
            {/* Responsive Content Layout */}
            <div
                className={`
                    flex flex-col min-h-screen
                    transition-all
                    lg:pl-80 pl-16
                    md:pl-48
                    sm:pl-16
                    bg-white
                `}
            >
                {/* 2. Global Header */}
                <DashboardHeader />

                {/* 3. Sub-Header (Filters & Actions) */}
                <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 md:px-6 py-3">
                        {/* Title and Filters */}
                        <div className="flex items-center gap-4 md:gap-6 min-w-0">
                            <h1 className="text-[16px] md:text-[18px] font-bold text-[#334155] whitespace-nowrap">
                                Manifests
                            </h1>
                            {/* Scrollable Tabs */}
                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-1 -mb-1">
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
                        {/* Actions */}
                        <div className="flex items-center gap-2 overflow-x-auto sm:overflow-visible no-scrollbar">
                            <button className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-semibold border border-slate-300 text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                                <Filter size={16} />
                                <span className="hidden sm:inline">Filter</span>
                            </button>
                            <button className="flex items-center gap-2 bg-[#2b6cee] px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-white hover:bg-blue-700 transition-all shadow-sm">
                                <Zap size={16} fill="white" />
                                <span className="text-[14px] font-semibold hidden sm:inline">Create Manifests with Quick Dispatch</span>
                                <span className="text-[14px] font-semibold sm:hidden">Create</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4. Table Section */}
                <main className="flex-1 p-3 sm:p-6 md:p-8 w-full max-w-[1600px] bg-white">
                    <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white custom-scrollbar">
                        <table className="w-full text-left min-w-[1000px] border-collapse">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {TABLE_HEADERS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-4 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                            style={{
                                                minWidth: header === "Quick Dispatch Group" ? "180px" : "110px"
                                            }}
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={TABLE_HEADERS.length} className="py-24 md:py-40 text-center">
                                        <EmptyState />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

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