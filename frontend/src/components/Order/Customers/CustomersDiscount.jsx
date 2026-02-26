"use client";

import React, { useState } from "react";
import { Plus, Upload, Download } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header.jsx";

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

const EMPTY_STATE_IMG =
    "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

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
    <tr>
      <td colSpan={TABLE_COLUMNS.length}>
        <div className="flex flex-col items-center justify-center py-16 md:py-32 w-full h-[60vh]">
            <div className="w-24 h-24 md:w-32 md:h-32 mb-6 overflow-hidden rounded-lg">
                <img
                    src={EMPTY_STATE_IMG}
                    alt="No data"
                    className="w-full h-full object-cover opacity-40 grayscale"
                />
            </div>
            <p className="text-[13px] md:text-[14px] text-gray-500 font-medium text-center px-4">
                No records to show
            </p>
        </div>
      </td>
    </tr>
);

/* =======================
   MAIN PAGE
======================= */

export default function CustomerDiscountGroupsPage() {
    const [activeTab] = useState("All");

    return (
        <div className="relative bg-[#F8FAFC] min-h-screen w-full font-sans antialiased overflow-x-hidden">
            {/* 1. Fixed Sidebar - Locked to viewport */}
            <aside className="fixed top-0 left-0 h-screen z-50">
                <Sidebar />
            </aside>

            {/* 2. Responsive Content Layout */}
            <div
                className={`
                    flex flex-col min-h-screen transition-all duration-300
                    pl-16 lg:pl-80
                    bg-white
                `}
            >
                {/* Global Header */}
                <DashboardHeader />

                {/* Sub-Header (Title, Pill, and Action) */}
                <div className="
                    flex flex-col sm:flex-row items-start sm:items-center 
                    justify-between gap-2 sm:gap-0
                    px-4 md:px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-10
                ">
                    <div className="flex items-center gap-3 md:gap-6 min-w-0">
                        <h1 className="text-[16px] md:text-[18px] font-bold text-[#303e67] truncate">
                            Customer Discount Groups
                        </h1>
                        <div className="flex items-center gap-2">
                            <button className="
                                px-3 py-1 sm:px-4 sm:py-1 rounded-full 
                                text-[11px] sm:text-[12px] font-semibold transition-all border shrink-0
                                bg-[#2b6cee] text-white border-[#2b6cee]
                                shadow-sm
                            ">
                                All
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2 mt-2 sm:mt-0 shrink-0">
                        <ActionButton icon={Upload} variant="icon" />
                        <ActionButton icon={Download} variant="icon" />
                        <div className="hidden sm:block"><ActionButton label="Add" /></div>
                        <div className="block sm:hidden">
                            <ActionButton label={<span className="sr-only">Add</span>} variant="icon" icon={Plus} />
                        </div>
                    </div>
                </div>

                {/* Content Area / Table */}
                <div className="flex-1 w-full overflow-hidden bg-white">
                    <div className="overflow-x-auto custom-scrollbar h-full">
                        <table className="min-w-full w-full h-full">
                            <thead>
                                <tr className="bg-[#2b6cee26] border-b border-blue-100">
                                    {TABLE_COLUMNS.map((column, index) => (
                                        <th
                                            key={index}
                                            className="px-2 sm:px-4 md:px-6 py-3 md:py-4 text-[13px] md:text-[14px] font-semibold text-[#303d50] whitespace-nowrap text-left"
                                            style={{
                                                minWidth: "120px",
                                                fontWeight: 600,
                                                ...(column === "Mapping Code" ? { minWidth: "140px" } : {}),
                                                ...(column === "Action" ? { minWidth: "100px" } : {}),
                                            }}
                                        >
                                            {column}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <EmptyState />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Responsive Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }

                @media (min-width: 1024px) {
                    .lg\\:pl-80 { padding-left: 20rem !important; }
                }

                @media (max-width: 1023px) {
                    .lg\\:pl-80 { padding-left: 4rem !important; }
                }

                @media (max-width: 767px) {
                    .md\\:pl-48 { padding-left: 4rem !important; }
                    .sm\\:pl-16 { padding-left: 4rem !important; }
                }

                @media (max-width: 640px) {
                    .sm\\:pl-16, .pl-16 { padding-left: 4rem !important; }
                    h1 {
                        font-size: 16px !important;
                    }
                }
            `}</style>
        </div>
    );
}