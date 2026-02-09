"use client";

import React, { useState } from "react";
import { Filter, Upload, Download, Plus, ChevronDown } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */

const FILTER_TABS = [
    "Pending", "Unverified", "Cancelled", "All",
    "Failed", "Putback Pending"
];

const TABLE_HEADERS = [
    "Order ID", "Customer", "Products Ordered",
    "Products Unallocated", "Channel", "State",
    "Status", "Expire Date", "Appointment Date"
];

/* =======================
   REUSABLE COMPONENTS
======================= */

const FilterPill = ({ label, isActive, onClick }) => (
    <button
        type="button"
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

const ActionButton = ({ icon: Icon, label, variant = "outline", onClick }) => {
    const styles = {
        outline: "border border-slate-300 text-slate-600 hover:bg-slate-50",
        primary: "bg-[#2b6cee] text-white hover:bg-blue-700 shadow-sm",
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${styles[variant]}`}
        >
            {Icon && <Icon size={16} />}
            {label}
        </button>
    );
};

/* =======================
   MAIN PAGE
======================= */

export default function B2BOrdersPage() {
    const [activeTab, setActiveTab] = useState("Pending");

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar Component */}
            <Sidebar activePage="SalesOrder" />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Dashboard Header Component */}
                <DashboardHeader />

                {/* 3. Sub-Header (Filters & Actions) */}
                <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-20">
                    <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                        <h1 className="text-lg font-bold text-[#334155] whitespace-nowrap">B2B Orders</h1>
                        <div className="flex items-center gap-2">
                            {FILTER_TABS.map((tab, idx) => (
                                <FilterPill
                                    key={idx}
                                    label={tab}
                                    isActive={activeTab === tab}
                                    onClick={() => setActiveTab(tab)}
                                />
                            ))}
                            {/* More Dropdown */}
                            <button type="button" className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-medium border border-slate-200 text-slate-400 hover:bg-slate-50">
                                More <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <ActionButton icon={Filter} label="Filter" />
                        <div className="flex gap-1">
                            <button type="button" className="p-2.5 rounded-lg border border-slate-300 text-blue-600 hover:bg-slate-50 shadow-sm">
                                <Upload size={18} />
                            </button>
                            <button type="button" className="p-2.5 rounded-lg border border-slate-300 text-blue-600 hover:bg-slate-50 shadow-sm">
                                <Download size={18} />
                            </button>
                        </div>
                        <ActionButton icon={Plus} label="Create" variant="primary" />
                    </div>
                </div>

                {/* 4. Table Section */}
                <main className="flex-1 p-8 max-w-[1600px] bg-white">
                    <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white">
                        <table className="w-full text-left min-w-[1200px] border-collapse">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    <th className="px-6 py-4 w-12">
                                        <div className="w-4 h-4 rounded-full border border-blue-200 bg-white" />
                                    </th>
                                    {TABLE_HEADERS.map((header, idx) => (
                                        <th key={idx} className="px-4 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={TABLE_HEADERS.length + 1} className="py-40 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="relative w-32 h-32 mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center shadow-sm">
                                                    <div className="w-16 h-12 bg-[#ffd8b2] rounded-md shadow-sm relative flex items-center justify-center border border-orange-200">
                                                        <Download className="text-[#2b6cee]" size={28} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[14px] text-gray-500 font-medium tracking-tight">No Data to Display</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}