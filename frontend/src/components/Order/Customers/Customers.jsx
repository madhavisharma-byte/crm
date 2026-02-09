"use client";

import React from "react";
import { Plus } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/Header";

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
        className={`px-4 py-1 rounded-full text-[12px] font-semibold transition-all border ${active
                ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                : "bg-white text-[#94a3b8] border-[#94a3b8] hover:bg-slate-50"
            }`}
    >
        {label}
    </button>
);

const AddButton = ({ label }) => (
    <button className="bg-[#2b6cee] flex items-center gap-2 px-4 py-2 rounded-[10px] text-white hover:bg-blue-700 transition-colors shadow-sm">
        <Plus size={16} strokeWidth={3} />
        <span className="text-[14px] font-medium">{label}</span>
    </button>
);

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

export default function CustomersPage() {
    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Header */}
                <DashboardHeader />

                {/* 3. Sub-Header (Title, Pill, and Action) */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-6">
                        <h1 className="text-[18px] font-bold text-[#303e67]">Customers</h1>
                        <div className="flex items-center gap-2">
                            <FilterPill label="All" active={true} />
                        </div>
                    </div>
                    <AddButton label="Add Customer" />
                </div>

                {/* 4. Content Area / Table */}
                <div className="flex-1 overflow-auto bg-white">
                    <div className="min-w-max">
                        {/* Table Header Row */}
                        <div className="flex items-center bg-[#2b6cee26] border-b border-blue-100">
                            {TABLE_COLUMNS.map((column, index) => (
                                <div
                                    key={index}
                                    className="px-6 py-4 text-[15px] font-semibold text-[#303d50] whitespace-nowrap"
                                    style={{ minWidth: "180px", flex: 1 }}
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