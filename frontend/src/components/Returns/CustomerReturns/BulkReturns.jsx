"use client";

import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";
import CreateBulkReturnModal from "./CreateBulkReturnModal";

/* ===== TABLE HEADERS ===== */
const TABLE_COLUMNS = [
    "Bulk Return Id",
    "Reference Code",
    "Customer",
    "Number of Items",
    "Return Reason",
    "Return Date",
    "Action",
];

const FILTER_TABS = ["ALL"];

export default function BulkReturn() {
    const [activeTab, setActiveTab] = useState("ALL");
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar */}
            {/* Make sidebar fixed and content responsive, so it acts like Overview.jsx's system */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="Returns" />
            </div>

            {/* Main content layout: responsive paddings for devices */}
            <div
                className={`
                    flex flex-col min-h-screen
                    transition-all
                    lg:pl-80 pl-16
                    md:pl-48
                    sm:pl-16
                `}
            >
                {/* Header */}
                <DashboardHeader />

                {/* Sub-header: Title, Filter Tabs, and Create Button */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 py-4 border-b border-gray-100 bg-white gap-3 sm:gap-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <h1 className="text-base sm:text-[16px] font-bold text-[#303e67] whitespace-nowrap">
                            Bulk Return
                        </h1>

                        {/* Filter Tabs - follows Putaway styling */}
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

                    {/* Create Button - matches Putaway style */}
                    <button
                        className="flex items-center gap-2 bg-[#2b6cee] text-white px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm w-full sm:w-auto justify-center"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus size={16} />
                        <span className="hidden xs:inline">Add New Return</span>
                        <span className="inline xs:hidden">Add</span>
                    </button>
                </div>

                {/* Table Area -- responsive padding and x-scroll */}
                <main className="flex-1 p-2 sm:p-4 md:p-8 max-w-[1600px] w-full">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[720px] sm:min-w-[1024px] md:min-w-[1400px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-2 sm:px-4 md:px-6 py-4 text-[12px] sm:text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State Body */}
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length} className="py-24 sm:py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4 sm:mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                                                    <div className="w-12 h-9 sm:w-16 sm:h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center">
                                                        <Search className="text-[#2b6cee]" size={24} sm:size={28} />
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
            {/* Modal: unchanged */}
            <CreateBulkReturnModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            {/* Responsive tweaks, same as Overview.jsx */}
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
                @media (max-width: 430px) {
                    .xs\\:inline { display: none !important; }
                    .xs\\:hidden { display: inline !important; }
                }
                @media (min-width: 431px) {
                    .xs\\:inline { display: inline !important; }
                    .xs\\:hidden { display: none !important; }
                }
            `}</style>
        </div>
    );
}