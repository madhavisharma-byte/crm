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

const EMPTY_STATE_IMG = "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMGF2YXRhcnxlbnwxfHx8fDE3Njk2MjA0ODF8MA&ixlib=rb-4.1.0&q=80&w=1080";

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
    <div className="flex flex-col items-center justify-center py-24 md:py-40 w-full">
        <div className="w-20 h-20 md:w-32 md:h-32 mb-4 md:mb-6 overflow-hidden rounded-lg">
            <img
                src={EMPTY_STATE_IMG}
                alt="No data"
                className="w-full h-full object-cover opacity-40 grayscale"
            />
        </div>
        <p className="text-[13px] md:text-[14px] text-gray-500 font-medium">No records to show</p>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function PurchaseSearchASNPage() {
    return (
        <div className="relative bg-white min-h-screen w-full font-sans antialiased">
            {/* Fixed Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar />
            </div>
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
                {/* 2. Global Dashboard Header */}
                <DashboardHeader />

                {/* 3. Sub-Header (Title, Pill, and Action) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 md:px-6 py-3 border-b border-gray-200 bg-white gap-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                        <h1 className="text-[16px] md:text-[18px] font-bold text-[#303e67]">
                            Advance Shipping Notices
                        </h1>
                        <div className="flex items-center gap-2">
                            <FilterPill label="All" active={true} />
                        </div>
                    </div>

                    <button className="p-2 rounded-lg bg-[#e4ecfd] text-[#2b6cee] hover:bg-[#dbeafe] transition-colors border border-transparent shadow-sm self-start sm:self-auto">
                        <Download size={18} />
                    </button>
                </div>

                {/* 4. Content Area / Table */}
                <div className="flex-1 overflow-auto bg-white">
                    <div className="min-w-full">
                        {/* Table Header Row (Matches design 15% blue opacity) */}
                        <div className="hidden md:flex items-center bg-[#2b6cee1a] border-b border-blue-100">
                            {TABLE_COLUMNS.map((column, index) => (
                                <div
                                    key={index}
                                    className="px-3 md:px-6 py-3 md:py-4 text-[13px] md:text-[15px] font-semibold text-[#303d50] whitespace-nowrap"
                                    style={{ minWidth: "140px", flex: 1 }}
                                >
                                    {column}
                                </div>
                            ))}
                        </div>
                        {/* Responsive Table (Stacked for small screens) */}
                        <div className="md:hidden">
                            {/* Example placeholder row to show responsiveness */}
                            {/* In reality you will map your row data here */}
                            <EmptyState />
                        </div>
                        {/* Table Body - Empty State (desktop) */}
                        <div className="hidden md:block">
                            <EmptyState />
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .lg\\:pl-80 { padding-left: 20rem !important; }
                @media (max-width: 1023px) {
                    .lg\\:pl-80 { padding-left: 4rem !important; }
                }
                @media (max-width: 767px) {
                    .md\\:pl-48 { padding-left: 4rem !important; }
                    .sm\\:pl-16 { padding-left: 4rem !important; }
                }
                @media (max-width: 640px) {
                    .sm\\:pl-16 { padding-left: 1rem !important; }
                }
            `}</style>
        </div>
    );
}