"use client";

import React, { useState } from "react";
import { Filter, Upload, Download, Plus, ChevronDown } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */

const FILTER_TABS = [
    "Pending", "Unverified", "Cancelled", "All",
    "Failed", "Putback Pending"
];

const TABLE_HEADERS = [
    "Order ID", "Customer", "Products Ordered",
    "Products Unallocated", "Channel", "State",
    "Status", "Expire Date", "Appointment Date"
];

/* =======================
   REUSABLE COMPONENTS
======================= */

const FilterPill = ({ label, isActive, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className={`px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium border transition-all whitespace-nowrap shrink-0 ${isActive
                ? "bg-[#2b6cee] text-white border-[#2b6cee] shadow-sm"
                : "bg-white text-slate-400 border-slate-200 hover:border-blue-400 hover:text-blue-500"
            }`}
    >
        {label}
    </button>
);

const ActionButton = ({ icon: Icon, label, variant = "outline", onClick, hideTextOnMobile = false }) => {
    const styles = {
        outline: "border border-slate-300 text-slate-600 hover:bg-slate-50",
        primary: "bg-[#2b6cee] text-white hover:bg-blue-700 shadow-sm",
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${styles[variant]}`}
        >
            {Icon && <Icon size={18} className={hideTextOnMobile ? "" : "sm:size-16"} />}
            <span className={hideTextOnMobile ? "hidden sm:inline" : ""}>{label}</span>
        </button>
    );
};

/* =======================
   MAIN PAGE
======================= */

export default function B2BOrdersPage() {
    const [activeTab, setActiveTab] = useState("Pending");

    return (
        <div className="relative min-h-screen bg-[#F8FAFC] font-sans antialiased">
            {/* 1. Fixed Sidebar - Stays put while page scrolls */}
            <aside className="fixed top-0 left-0 h-screen z-50">
                <Sidebar activePage="SalesOrder" />
            </aside>

            {/* 2. Main Content Wrapper */}
            <div className="flex flex-col min-h-screen pl-16 lg:pl-80 transition-all duration-300 bg-white">
                <DashboardHeader />

                {/* 3. Sub-Header (Scrollable Filters & Actions) */}
                <div className="sticky top-0 z-20 bg-white border-b border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 md:px-6 py-3">

                        {/* Title and Horizontal Scrollable Tabs */}
                        <div className="flex items-center gap-4 md:gap-6 min-w-0">
                            <h1 className="text-[16px] md:text-[18px] font-bold text-[#334155] whitespace-nowrap">
                                B2B Orders
                            </h1>

                            {/* Scrollable Array Container */}
                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-1 -mb-1">
                                {FILTER_TABS.map((tab, idx) => (
                                    <FilterPill
                                        key={idx}
                                        label={tab}
                                        isActive={activeTab === tab}
                                        onClick={() => setActiveTab(tab)}
                                    />
                                ))}
                                <button type="button" className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-medium border border-slate-200 text-slate-400 hover:bg-slate-50 whitespace-nowrap shrink-0">
                                    More <ChevronDown size={14} />
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons Container */}
                        <div className="flex items-center gap-2 overflow-x-auto sm:overflow-visible no-scrollbar">
                            <ActionButton icon={Filter} label="Filter" hideTextOnMobile={true} />
                            <div className="flex gap-1 shrink-0">
                                <button type="button" className="p-2 sm:p-2.5 rounded-lg border border-slate-300 text-blue-600 hover:bg-slate-50 shadow-sm">
                                    <Upload size={18} />
                                </button>
                                <button type="button" className="p-2 sm:p-2.5 rounded-lg border border-slate-300 text-blue-600 hover:bg-slate-50 shadow-sm">
                                    <Download size={18} />
                                </button>
                            </div>
                            <ActionButton icon={Plus} label="Create" variant="primary" hideTextOnMobile={true} />
                        </div>
                    </div>
                </div>

                {/* 4. Table Section */}
                <main className="flex-1 p-3 sm:p-6 md:p-8 w-full max-w-[1600px] bg-white">
                    <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white custom-scrollbar">
                        <table className="w-full text-left min-w-[1000px] border-collapse">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    <th className="px-6 py-4 w-12">
                                        <div className="w-4 h-4 rounded-full border border-blue-200 bg-white" />
                                    </th>
                                    {TABLE_HEADERS.map((header, idx) => (
                                        <th key={idx} className="px-4 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={TABLE_HEADERS.length + 1} className="py-24 md:py-40 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center shadow-sm">
                                                    <div className="w-12 h-10 md:w-16 md:h-12 bg-[#ffd8b2] rounded-md shadow-sm relative flex items-center justify-center border border-orange-200">
                                                        <Download className="text-[#2b6cee]" size={24} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[13px] md:text-[14px] text-gray-500 font-medium tracking-tight">
                                                No Data to Display
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            <style jsx global>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                /* Hide scrollbar for IE, Edge and Firefox */
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }

                .custom-scrollbar::-webkit-scrollbar { height: 6px; background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }

                /* Tablet/Mobile logic for sidebar spacing */
                @media (max-width: 1023px) {
                    .pl-16 { padding-left: 4rem !important; }
                }
                
                /* Large screen override to match your exact desktop requirement */
                @media (min-width: 1024px) {
                    .lg\\:pl-80 { padding-left: 20rem !important; }
                }
            `}</style>
        </div>
    );
}