"use client";

import React from "react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/header";

/* =======================
   CONSTANT DATA
======================= */

const TABLE_COLUMNS = [
    "Dispatch Tolerance Group Code",
    "Mapping Code",
    "Mapped with Customers",
    "Mapped with Channels",
    "Effective From",
    "Effective To",
    "Enabled",
    "Created",
    "Updated",
    "Action",
];

const EMPTY_STATE_IMG = "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHBhdHRlcm58ZW58MXx8fHwxNzY5NTg5NDMyfDA&ixlib=rb-4.1.0&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-40 w-full">
        <div className="w-32 h-32 mb-6 overflow-hidden rounded-lg">
            <img
                src={EMPTY_STATE_IMG}
                alt="No records"
                className="w-full h-full object-cover opacity-40 grayscale"
            />
        </div>
        <p className="text-[14px] text-gray-500 font-medium">No records to show</p>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function DispatchToleranceGroupsPage() {
    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar Component */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Dashboard Header */}
                <DashboardHeader />

                {/* 3. Sub-Header (Title and "All" Pill) */}
                <div className="flex items-center gap-6 px-6 py-3 border-b border-gray-200 bg-white">
                    <h1 className="text-[18px] font-bold text-[#303e67]">
                        Dispatch Tolerance Groups
                    </h1>
                    <button className="px-4 py-1 rounded-full text-[12px] font-bold bg-[#2b6cee] text-white shadow-sm border border-[#2b6cee]">
                        All
                    </button>
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
                                    style={{
                                        // Set specific widths for columns with long names to match UI
                                        minWidth: column.length > 20 ? "240px" : "160px",
                                        flex: 1
                                    }}
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