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

export default function PurchaseOrdersPage() {
    const [activeTab, setActiveTab] = useState("approved");

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar Component */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Dashboard Header */}
                <DashboardHeader />

                {/* 3. Sub-Header (Title, Filters & Actions) */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
                        <h1 className="text-xl font-bold text-slate-800 whitespace-nowrap">Purchase Orders</h1>
                        <div className="flex items-center gap-3">
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

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 bg-[#2b6cee] px-5 py-2 rounded-lg text-white hover:bg-blue-700 transition-all shadow-sm">
                            <span className="text-[14px] font-semibold whitespace-nowrap text-white">Create PO</span>
                        </button>
                    </div>
                </div>

                {/* 4. Table Section with Horizontal Scroll */}
                <div className="flex-1 overflow-x-auto overflow-y-auto">
                    <div className="min-w-max">
                        {/* Light Blue Table Header Row */}
                        <div className="flex items-center bg-[#eef4ff] border-b border-blue-100">
                            {TABLE_HEADERS.map((header, idx) => (
                                <div
                                    key={idx}
                                    className="px-6 py-4 text-[14px] font-medium text-slate-600 whitespace-nowrap"
                                    style={{
                                        minWidth: "160px",
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
      `}</style>
        </div>
    );
}