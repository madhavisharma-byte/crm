"use client";

import React from "react";
import { Plus } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */

const TABLE_COLUMNS = [
    "Customers",
    "Customer Code",
    "Name",
    "Email",
    "City",
    "Customers Phone",
];

const EMPTY_STATE_IMG = "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHBhdHRlcm58ZW58MXx8fHwxNzY5NTg5NDMyfDA&ixlib=rb-4.1.0&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const FilterPill = ({ label, active }) => (
    <button
        className={`px-3 py-1 sm:px-4 sm:py-1 rounded-full text-[11px] sm:text-[12px] font-semibold transition-all border shrink-0 ${active
            ? "bg-[#2b6cee] text-white border-[#2b6cee]"
            : "bg-white text-[#94a3b8] border-[#94a3b8] hover:bg-slate-50"
            }`}
    >
        {label}
    </button>
);

const AddButton = ({ label }) => (
    <button className="bg-[#2b6cee] flex items-center justify-center gap-2 p-2 sm:px-4 sm:py-2 rounded-[8px] sm:rounded-[10px] text-white hover:bg-blue-700 transition-colors shadow-sm shrink-0">
        <Plus size={18} strokeWidth={3} />
        {/* Hide text on small mobile, show on sm (640px) and up */}
        <span className="hidden sm:inline text-[14px] font-medium whitespace-nowrap">{label}</span>
    </button>
);

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 md:py-32 w-full">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-6 overflow-hidden rounded-lg">
            <img
                src={EMPTY_STATE_IMG}
                alt="No records"
                className="w-full h-full object-cover opacity-40 grayscale"
            />
        </div>
        <p className="text-[13px] md:text-[14px] text-gray-500 font-medium text-center px-4">No records to show</p>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function CustomersPage() {
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
                    /* Mobile/Tablet: Space for small sidebar (pl-16) */
                    /* Large Screen: Original pl-80 */
                    pl-16 lg:pl-80
                    bg-white
                `}
            >
                {/* Global Header */}
                <DashboardHeader />

                {/* Sub-Header (Title, Pill, and Action) */}
                <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3 md:gap-6 min-w-0">
                        <h1 className="text-[16px] md:text-[18px] font-bold text-[#303e67] truncate">
                            Customers
                        </h1>
                        <div className="flex items-center gap-2">
                            <FilterPill label="All" active={true} />
                        </div>
                    </div>
                    <AddButton label="Add Customer" />
                </div>

                {/* Content Area / Table */}
                <div className="flex-1 w-full overflow-hidden bg-white">
                    <div className="overflow-x-auto custom-scrollbar">
                        <div className="min-w-max">
                            {/* Table Header Row */}
                            <div className="flex items-center bg-[#2b6cee26] border-b border-blue-100">
                                {TABLE_COLUMNS.map((column, index) => (
                                    <div
                                        key={index}
                                        className="px-4 sm:px-6 py-3 md:py-4 text-[13px] md:text-[15px] font-semibold text-[#303d50] whitespace-nowrap"
                                        style={{
                                            minWidth: column === "Customers" ? "120px" : "180px"
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

            {/* Responsive Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }
                
                /* Ensure large screen padding remains exactly as requested */
                @media (min-width: 1024px) {
                    .lg\\:pl-80 { padding-left: 20rem !important; }
                }

                /* Mobile overrides to prevent button/header squishing */
                @media (max-width: 640px) {
                    .pl-16 { padding-left: 4rem !important; }
                }
            `}</style>
        </div>
    );
}