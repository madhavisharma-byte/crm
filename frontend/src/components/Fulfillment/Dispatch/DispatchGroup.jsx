"use client";

import React, { useState } from "react";
import { Filter } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */

const STATUS_TABS = [
    { label: "Complete", value: "complete" },
    { label: "Processing", value: "processing" },
    { label: "All", value: "all" },
];

const TABLE_HEADERS = [
    "Dispatch Group",
    "State",
    "Created At",
    "Shipment Details",
    "Channel",
    "Action",
];

const EMPTY_STATE_IMG =
    "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const TabPill = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-1.5 rounded-full text-[12px] md:text-[13px] font-semibold transition-all border shrink-0 ${
            isActive
                ? "bg-[#2b6cee] text-white border-[#2b6cee] shadow-sm"
                : "bg-white text-[#94a3b8] border-[#94a3b8] hover:bg-slate-50 hover:text-blue-500"
        }`}
    >
        {label}
    </button>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 md:py-40 w-full h-[60vh]">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-6 overflow-hidden rounded-lg">
            <img
                src={EMPTY_STATE_IMG}
                alt="No records"
                className="w-full h-full object-cover opacity-40 grayscale"
            />
        </div>
        <p className="text-[13px] md:text-[14px] text-gray-500 font-medium text-center px-4">
            No records to show
        </p>
    </div>
);

/* =======================
   MAIN PAGE (Responsive)
======================= */

export default function DispatchGroupPage() {
    const [activeTab, setActiveTab] = useState("complete");

    return (
        <div className="relative bg-[#F8FAFC] min-h-screen w-full font-sans antialiased overflow-x-hidden">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 h-screen z-50">
                <Sidebar />
            </aside>

            {/* Content (Responsive padding for sidebar on all devices) */}
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
                <DashboardHeader />

                {/* Responsive Subheader for Tabs and Filter */}
                <div className="sticky top-0 z-20 bg-white border-b border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 md:px-6 py-3">
                        {/* Title and Horizontal Scrollable Tabs */}
                        <div className="flex items-center gap-4 md:gap-6 min-w-0">
                            <h1 className="text-[16px] md:text-[18px] font-bold text-[#303e67] whitespace-nowrap">
                                Dispatch Group
                            </h1>
                            {/* Scrollable Tabs */}
                            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-1 -mb-1">
                                {STATUS_TABS.map((tab) => (
                                    <TabPill
                                        key={tab.value}
                                        label={tab.label}
                                        isActive={activeTab === tab.value}
                                        onClick={() => setActiveTab(tab.value)}
                                    />
                                ))}
                            </div>
                        </div>
                        {/* Filter Button */}
                        <div className="flex items-center gap-2 overflow-x-auto sm:overflow-visible no-scrollbar">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-300 text-slate-600 hover:bg-slate-50 transition-all shadow-sm whitespace-nowrap">
                                <Filter size={16} />
                                Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* 4. Table Section with Horizontal Scroll */}
                <main className="flex-1 p-3 sm:p-6 md:p-8 w-full max-w-[1600px] bg-white">
                    <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white custom-scrollbar">
                        <table className="w-full text-left min-w-[1000px] border-collapse">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {TABLE_HEADERS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-4 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
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

                {/* Responsive/Sidebar spacing logic */}
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
        </div>
    );
}