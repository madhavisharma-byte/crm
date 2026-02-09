"use client";

import React, { useState } from "react";
import { Plus, Upload, Download } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/Header.jsx";

/* =======================
   CONSTANT DATA
======================= */

const TABLE_COLUMNS = [
    "Mapping Code",
    "Customer Code",
    "Discount Group Code",
    "Effective From",
    "Effective To",
    "Enabled",
    "Created",
    "Updated",
    "Action",
];

const EMPTY_STATE_IMG = "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const ActionButton = ({ icon: Icon, label, variant = "primary" }) => {
    if (variant === "icon") {
        return (
            <button className="p-2 rounded-lg bg-[#e4ecfd] text-[#2b6cee] hover:bg-[#dbeafe] transition-colors border border-transparent shadow-sm">
                <Icon size={18} />
            </button>
        );
    }

    return (
        <button className="bg-[#2b6cee] flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition-all shadow-sm">
            <Plus size={18} strokeWidth={3} />
            <span className="text-[14px] font-semibold">{label}</span>
        </button>
    );
};

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-40 w-full">
        <div className="w-32 h-32 mb-6 overflow-hidden rounded-lg">
            <img
                src={EMPTY_STATE_IMG}
                alt="No data"
                className="w-full h-full object-cover opacity-40 grayscale"
            />
        </div>
        <p className="text-[14px] text-gray-500 font-medium">No records to show</p>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function CustomerDiscountGroupsPage() {
    const [activeTab] = useState("All");

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar Component */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Dashboard Header */}
                <DashboardHeader />

                {/* 3. Sub-Header (Title, Tabs, and Actions) */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-6">
                        <h1 className="text-[18px] font-bold text-[#303e67]">
                            Customer Discount Groups
                        </h1>
                        <div className="flex items-center gap-2">
                            <button className="px-4 py-1 rounded-full text-[12px] font-bold bg-[#2b6cee] text-white shadow-sm border border-[#2b6cee]">
                                All
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ActionButton icon={Upload} variant="icon" />
                        <ActionButton icon={Download} variant="icon" />
                        <ActionButton label="Add" />
                    </div>
                </div>

                {/* 4. Table Area with Horizontal Scroll support */}
                <div className="flex-1 overflow-auto bg-white">
                    <div className="min-w-max">
                        {/* Table Header Row */}
                        <div className="flex items-center bg-[#2b6cee1a] (rgba(43, 108, 238, 0.15)) border-b border-blue-100">
                            {TABLE_COLUMNS.map((column, index) => (
                                <div
                                    key={index}
                                    className="px-6 py-4 text-[14px] font-semibold text-[#303d50] whitespace-nowrap"
                                    style={{ minWidth: "160px", flex: 1 }}
                                >
                                    {column}
                                </div>
                            ))}
                        </div>

                        {/* Table Body - Empty State */}
                        <EmptyState />
                    </div>
                </div>
            </div>
        </div>
    );
}