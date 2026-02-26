"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* === TABLE HEADERS === */
const FILTER_TABS = [
    "Returned Expected",
    "Return Acknowledged",
    "Returned",
    "Pending RTO Return Invoice",
];

const TABLE_COLUMNS = [
    "Return",
    "Shipment",
    "Order",
    "Shipping Provider",
    "Tracking",
    "Status",
    "Created Date",
];

export default function AwaitingActions() {
    const [activeTab, setActiveTab] = useState("Returned Expected");

    return (
        <div className="relative bg-white min-h-screen w-full font-sans antialiased">
            {/* 1. Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="Awaiting Actions" />
            </div>
            {/* Responsive content layout */}
            <div
                className={`
                    flex flex-col min-h-screen
                    transition-all
                    lg:pl-80 pl-16
                    md:pl-48
                    sm:pl-16
                `}
            >
                {/* 2. Global Header */}
                <DashboardHeader />

                {/* 3. Breadcrumb/Header (Title, Tabs) */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 border-b border-gray-100 bg-white gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <h1 className="text-base md:text-[16px] font-bold text-[#303e67]">Awaiting Actions</h1>
                        {/* Status Tabs */}
                        <div className="flex gap-2 sm:gap-3 overflow-x-auto">
                            {FILTER_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 md:px-5 py-1 md:py-1.5 rounded-full text-xs md:text-xs font-semibold transition-all border whitespace-nowrap ${
                                        activeTab === tab
                                            ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                                            : "text-gray-400 border-gray-300 hover:border-gray-400 bg-white"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* There is no create button for Awaiting Actions */}
                </div>

                {/* 4. Table Area (responsive padding/width) */}
                <main className="flex-1 p-3 sm:p-6 md:p-8 w-full max-w-full md:max-w-[1600px] mx-auto">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left min-w-[700px] md:min-w-[1400px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {/* Selection Circle Header */}
                                    <th className="px-2 md:px-6 py-3 md:py-4 w-8 md:w-12">
                                        <div className="w-4 h-4 rounded-full border border-blue-200 bg-white" />
                                    </th>
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-2 md:px-6 py-3 md:py-4 text-[12px] md:text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State Body */}
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length + 1} className="py-20 md:py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-20 h-20 md:w-32 md:h-32 mb-4 md:mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                                                    <div className="w-10 h-8 md:w-16 md:h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center">
                                                        <Search className="text-[#2b6cee]" size={22} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[13px] md:text-[14px] text-gray-500 font-medium tracking-tight">
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