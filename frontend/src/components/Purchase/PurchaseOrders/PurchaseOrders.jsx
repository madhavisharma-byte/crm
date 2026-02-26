"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */

const FILTER_TABS = [
    { label: "Approved", value: "approved" },
    { label: "Waiting For Approval", value: "waiting" },
    { label: "All", value: "all" },
];

const TABLE_HEADERS = [
    "Purchase Order",
    "Status",
    "Delivery Date",
    "Type",
    "Vendor",
    "SKU Units Ordered",
    "SKU Units Received",
    "PO Items total",
    "Logistic Charges",
    "TCS Amount",
    "Updated On",
    "Approved On",
    "Created By",
    "Created On",
    "Operations",
];

const EMPTY_STATE_IMG = "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const FilterPill = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-1.5 rounded-full text-[13px] font-medium border transition-all whitespace-nowrap ${
            isActive
                ? "bg-[#2b6cee] text-white border-[#2b6cee] shadow-sm"
                : "bg-white text-slate-400 border-slate-200 hover:border-blue-400 hover:text-blue-500"
        }`}
    >
        {label}
    </button>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-24 md:py-48 w-full">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-4 opacity-40 grayscale flex items-center justify-center bg-slate-50 rounded-lg">
            <img
                src={EMPTY_STATE_IMG}
                alt="No data"
                className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />
        </div>
        <p className="text-[13px] md:text-[14px] text-gray-500 font-medium">
            No records to show
        </p>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function PurchaseOrdersPage() {
    const [activeTab, setActiveTab] = useState("approved");

    return (
        <div className="relative min-h-screen bg-[#F8FAFC] font-sans antialiased w-full flex">
            {/* 1. Sidebar Component (Fixed on large, collapsible/rail on small) */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar />
            </div>

            {/* Responsive Content Layout */}
            <div
                className={`
                    flex flex-col min-h-screen
                    transition-all
                    flex-1
                    lg:pl-80 pl-16
                    md:pl-48
                    sm:pl-16
                    bg-white
                `}
            >
                {/* 2. Global Dashboard Header */}
                <DashboardHeader />

                {/* 3. Sub-Header (Title, Filters & Actions) */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-4 md:px-6 py-3 md:py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar">
                        <h1 className="text-lg md:text-xl font-bold text-slate-800 whitespace-nowrap">
                            Purchase Orders
                        </h1>
                        <div className="flex items-center gap-2 md:gap-3">
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

                    <div className="flex items-center gap-2 md:gap-3">
                        <button className="flex items-center gap-2 bg-[#2b6cee] px-4 md:px-5 py-1.5 md:py-2 rounded-lg text-white hover:bg-blue-700 transition-all shadow-sm text-[13px] md:text-[14px]">
                            <span className="font-semibold whitespace-nowrap text-white">
                                Create PO
                            </span>
                        </button>
                    </div>
                </div>

                {/* 4. Table Section with Responsive Horizontal Scroll */}
                <div
                    className="
                        flex-1 w-full
                        overflow-x-auto overflow-y-auto
                        custom-scrollbar
                    "
                    style={{
                        maxHeight: "calc(100vh - 128px)",
                    }}
                >
                    <div className="min-w-[900px] md:min-w-max">
                        {/* Table Header Row */}
                        <div className="flex items-center bg-[#eef4ff] border-b border-blue-100">
                            {TABLE_HEADERS.map((header, idx) => (
                                <div
                                    key={idx}
                                    className="
                                        px-3 md:px-6 py-3 md:py-4 text-[12px] md:text-[14px] 
                                        font-medium text-slate-600 whitespace-nowrap
                                    "
                                    style={{
                                        minWidth: "120px",
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