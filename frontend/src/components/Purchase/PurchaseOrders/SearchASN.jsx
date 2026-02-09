"use client";

import React from "react";
import { Download } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */

const TABLE_COLUMNS = [
    "ASN No",
    "Status",
    "ASN Created",
    "Expected Delivery",
    "Quantity",
    "Purchase Order",
    "Vendor Name",
    "Vendor Code",
];

const EMPTY_STATE_IMG = "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGF2YXRhcnxlbnwxfHx8fDE3Njk2MjA0ODF8MA&ixlib=rb-4.1.0&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const FilterPill = ({ label, active }) => (
    <button
        className={`px-4 py-1 rounded-full text-[12px] font-semibold transition-all border ${active
                ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                : "bg-white text-[#94a3b8] border-[#94a3b8] hover:bg-slate-50"
            }`}
    >
        {label}
    </button>
);

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

export default function PurchaseSearchASNPage() {
    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Dashboard Header */}
                <DashboardHeader />

                {/* 3. Sub-Header (Title, Pill, and Action) */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-6">
                        <h1 className="text-[18px] font-bold text-[#303e67]">
                            Advance Shipping Notices
                        </h1>
                        <div className="flex items-center gap-2">
                            <FilterPill label="All" active={true} />
                        </div>
                    </div>

                    <button className="p-2 rounded-lg bg-[#e4ecfd] text-[#2b6cee] hover:bg-[#dbeafe] transition-colors border border-transparent shadow-sm">
                        <Download size={18} />
                    </button>
                </div>

                {/* 4. Content Area / Table */}
                <div className="flex-1 overflow-auto bg-white">
                    <div className="min-w-max">
                        {/* Table Header Row (Matches design 15% blue opacity) */}
                        <div className="flex items-center bg-[#2b6cee1a] border-b border-blue-100">
                            {TABLE_COLUMNS.map((column, index) => (
                                <div
                                    key={index}
                                    className="px-6 py-4 text-[15px] font-semibold text-[#303d50] whitespace-nowrap"
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