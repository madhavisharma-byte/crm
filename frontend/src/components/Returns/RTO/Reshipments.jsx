"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */
const FILTER_TABS = ["All", "Pending"];

const TABLE_COLUMNS = [
    "Reshipment",
    "Order",
    "Shipment",
    "Required Action",
    "Created",
    "Status",
    "Reshipment SO",
    "Shipping Provider",
    "Tracking",
    "Created Date"
];

export default function Reshipments() {
    const [activeTab, setActiveTab] = useState("All");

    return (
        <div className="relative bg-white min-h-screen w-full font-sans antialiased">
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="Reshipments" />
            </div>
            {/* Responsive Content Layout */}
            <div
                className={`
                    flex flex-col min-h-screen
                    transition-all
                    lg:pl-80 pl-16
                    md:pl-48
                    sm:pl-16
                `}
            >
                {/* Global Header */}
                <DashboardHeader />

                {/* Breadcrumb/Header (Title & Tabs) - Responsive */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-b border-gray-100 bg-white gap-3 sm:gap-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <h1 className="text-base sm:text-[16px] font-bold text-[#303e67]">Reshipments</h1>
                        {/* Status Tabs */}
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
                    {/* No create button for Reshipments */}
                </div>

                {/* Table Area - Responsive */}
                <main className="flex-1 px-2 sm:px-4 md:px-8 py-3 sm:py-6 md:py-8 w-full max-w-full md:max-w-[1600px]">
                    <div className="w-full overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left min-w-[700px] sm:min-w-[1100px] md:min-w-[1400px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {/* Selection Circle Header */}
                                    <th className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 w-8 sm:w-12">
                                        <div className="w-4 h-4 rounded-full border border-blue-200 bg-white" />
                                    </th>
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-2 sm:px-4 md:px-6 py-3 sm:py-4 text-[12px] sm:text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State Body */}
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length + 1} className="py-24 sm:py-32 md:py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4 sm:mb-6">
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
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }
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