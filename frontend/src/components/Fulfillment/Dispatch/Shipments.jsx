"use client";

import React, { useState } from "react";
import { Filter, Download, ChevronDown } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */

const FILTER_TABS = [
    "New", "Packed", "Ready to ship", "Manifested",
    "Putaway Pending", "Putback Pending", "All"
];

const TABLE_HEADERS = [
    "Shipment",
    "Channel Product Images",
    "Ready for Quick Packing",
    "Gift Message(s)",
    "Item Contains",
    "Products",
    "Channel",
    "Status",
    "Priority",
];

const EMPTY_STATE_IMG = "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

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

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-48 w-full">
        <div className="w-32 h-32 mb-4 opacity-40 grayscale flex items-center justify-center bg-slate-50 rounded-lg">
            <img src={EMPTY_STATE_IMG} alt="No data" className="w-20 h-20 object-contain" />
        </div>
        <p className="text-[14px] text-gray-500 font-medium">No records to show</p>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function ShipmentsPage() {
    const [activeTab, setActiveTab] = useState("New");

    return (
        <div className="relative bg-[#F8FAFC] min-h-screen w-full font-sans antialiased">
            {/* Fixed Sidebar */}
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
                {/* 2. Global Header Component */}
                <DashboardHeader />

                {/* 3. Sub-Header (Filters & Actions) */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-2 sm:px-4 md:px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-2 md:gap-6 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                        <h1 className="text-lg md:text-xl font-bold text-slate-800 whitespace-nowrap">Shipments</h1>
                        <div className="flex items-center gap-2">
                            {FILTER_TABS.map((tab) => (
                                <FilterPill
                                    key={tab}
                                    label={tab}
                                    isActive={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                />
                            ))}
                            {/* More Dropdown */}
                            <button className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
                                More <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-300 text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                            <Filter size={16} />
                            <span className="hidden xs:inline">Filter</span>
                        </button>
                        <button className="p-2.5 rounded-lg bg-[#e4ecfd] text-[#2b6cee] hover:bg-blue-100 transition-colors border border-transparent shadow-sm">
                            <Download size={18} />
                        </button>
                    </div>
                </div>

                {/* 4. Data Table Section */}
                <div
                    className="
                        flex-1
                        overflow-x-auto
                        overflow-y-auto
                        w-full
                        custom-scrollbar
                    "
                    style={{
                        maxHeight: "calc(100vh - 64px)",
                    }}
                >
                    <div className="min-w-max">
                        {/* Table Header Row */}
                        <div className="flex items-center bg-[#eef4ff] border-b border-blue-100">
                            {/* Left Spacer/Checkbox placeholder */}
                            <div className="w-12 sm:w-16 px-2 sm:px-6 py-4 flex items-center justify-center">
                                <div className="w-5 h-5 border-2 border-blue-200 rounded-full cursor-pointer hover:border-blue-500 transition-colors" />
                            </div>
                            {TABLE_HEADERS.map((header, idx) => (
                                <div
                                    key={idx}
                                    className="px-2 sm:px-4 py-4 text-[13px] sm:text-[14px] font-medium text-slate-600 whitespace-nowrap"
                                    style={{
                                        minWidth: header === "Channel Product Images" ? "160px" : "120px",
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
                .custom-scrollbar::-webkit-scrollbar { width: 6px; background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }

                @media (max-width: 1023px) {
                    /* When sidebar is collapsed on tablet/mobile, reserve only rail or collapsed width */
                    .lg\\:pl-80 { padding-left: 4rem !important; }
                }
                @media (max-width: 767px) {
                    .md\\:pl-48 { padding-left: 4rem !important; }
                    .sm\\:pl-16 { padding-left: 4rem !important; }
                }
                @media (max-width: 640px) {
                    .sm\\:pl-16 { padding-left: 4rem !important; }
                }
                @media (max-width: 600px) {
                    /* xs:hidden for filter button text */
                    .xs\\:inline { display: none !important; }
                }
            `}</style>
        </div>
    );
}