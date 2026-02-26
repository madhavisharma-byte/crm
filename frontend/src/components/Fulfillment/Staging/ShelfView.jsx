"use client";

import React, { useState } from "react";
import { Filter, Download, ChevronDown } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

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
        className={`px-4 py-1 rounded-full text-[12px] font-semibold transition-all border shrink-0 ${
            isActive
                ? "bg-[#2b6cee] text-white border-[#2b6cee] shadow-sm"
                : "bg-white text-[#94a3b8] border-[#94a3b8] hover:bg-slate-50"
        }`}
    >
        {label}
    </button>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-24 md:py-48 w-full">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-4 opacity-40 grayscale flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden">
            <img src={EMPTY_STATE_IMG} alt="No records" className="w-16 h-16 md:w-20 md:h-20 object-cover" />
        </div>
        <p className="text-[13px] md:text-[14px] text-gray-500 font-medium">No records to show</p>
    </div>
);

/* =======================
   MAIN PAGE (Responsive for All Devices)
======================= */

export default function BundleOccupiedPage() {
    const [activeTab, setActiveTab] = useState("ready");

    return (
        <div
            className={`
                relative min-h-screen bg-white font-sans antialiased w-full flex
            `}
        >
            {/* 1. Sidebar Component */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar />
            </div>

            {/* Responsive Content Layout */}
            <div
                className={`
                    flex flex-col min-h-screen
                    transition-all
                    w-full
                    lg:pl-80 pl-16
                    md:pl-48
                    sm:pl-16
                    bg-white
                `}
            >
                {/* 2. Global Header */}
                <DashboardHeader />

                {/* 3. Sub-Header (Title, Filter Tabs, Actions) */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-2 sm:px-4 md:px-6 py-3 md:py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-2 md:gap-6 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                        <h1 className="text-base md:text-xl font-bold text-slate-800 whitespace-nowrap">Bundle Occupied</h1>
                        <div className="flex items-center gap-1 md:gap-2">
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
                        <button className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold border border-slate-300 text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <Filter size={16} />
                            <span className="hidden sm:inline">Filter</span>
                        </button>
                        <button className="p-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 transition-all">
                            <Download size={18} />
                        </button>
                        <button className="flex items-center gap-2 bg-[#2b6cee] px-3 md:px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-all shadow-sm">
                            <span className="text-xs md:text-[14px] font-semibold">Bundle Occupied</span>
                            <ChevronDown size={14} />
                        </button>
                    </div>
                </div>

                {/* 4. Table Section */}
                <div className="flex-1 overflow-x-auto custom-scrollbar">
                    <div className="min-w-max">
                        {/* Light Blue Table Header (Matches UI style) */}
                        <div className="flex items-center bg-[#eef4ff] border-b border-blue-100">
                            {TABLE_HEADERS.map((header, idx) => (
                                <div
                                    key={idx}
                                    className="px-3 md:px-6 py-3 md:py-4 text-[12px] md:text-[14px] font-medium text-slate-600 whitespace-nowrap"
                                    style={{
                                        minWidth: "120px",
                                        flex: 1,
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
                .custom-scrollbar::-webkit-scrollbar { width: 6px; background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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