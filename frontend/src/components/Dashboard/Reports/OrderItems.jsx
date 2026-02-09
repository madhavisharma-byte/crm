"use client";

import React, { useState } from "react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */

const TABS = [
    { label: "Unfulfilled", value: "unfulfilled" },
    { label: "Pending", value: "pending" },
    { label: "All", value: "all" },
];

const COLUMNS = [
    "Order",
    "Order Item",
    "Order Category",
    "Channel Created Date Time",
    "Created",
    "Item Name",
    "Item SKU",
    "Quantity",
    "Channel Product Code",
    "Transfer Price",
    "Status",
    "Pymt",
    "On Hold",
    "Channel",
    "Facility",
    "Updated",
    "Shipment Status",
];

// Image from your source file for the empty state
const EMPTY_STATE_IMAGE = "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const FilterTab = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all border shrink-0 ${isActive
                ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                : "bg-white text-[#94a3b8] border-[#94a3b8] hover:bg-slate-50"
            }`}
    >
        {label}
    </button>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-32 w-full">
        <div className="relative w-32 h-32 mb-6">
            <img
                src={EMPTY_STATE_IMAGE}
                alt="No data illustration"
                className="w-full h-full object-contain opacity-60 grayscale"
            />
        </div>
        <p className="text-[14px] text-gray-900 font-normal">No records to show</p>
    </div>
);

/* =======================
   MAIN PAGE COMPONENT
======================= */

export default function OrderItemsReport() {
    const [activeTab, setActiveTab] = useState("unfulfilled");

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar Component */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Header */}
                <DashboardHeader />

                {/* 3. Sub-Header (Page Title & Filter Tabs) */}
                <div className="flex items-center gap-8 px-4 py-3 border-b border-gray-200 bg-white">
                    <h1 className="text-[16px] font-bold text-[#303e67] whitespace-nowrap">
                        Order Items
                    </h1>
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                        {TABS.map((tab) => (
                            <FilterTab
                                key={tab.value}
                                label={tab.label}
                                isActive={activeTab === tab.value}
                                onClick={() => setActiveTab(tab.value)}
                            />
                        ))}
                    </div>
                </div>

                {/* 4. Table Area with Horizontal Scroll */}
                <div className="flex-1 overflow-auto bg-white">
                    <div className="min-w-max">
                        {/* Table Header Row */}
                        <div className="flex items-center bg-[#2b6cee26] border-b border-blue-100">
                            {COLUMNS.map((column, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-4 text-[14px] font-medium text-[#303d50] whitespace-nowrap"
                                    style={{
                                        // Set minimum widths for specific columns to match the UI look
                                        minWidth: column === "Channel Created Date Time" ? "220px" : "130px"
                                    }}
                                >
                                    {column}
                                </div>
                            ))}
                        </div>

                        {/* Table Body (Empty State) */}
                        <div className="relative">
                            <EmptyState />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}