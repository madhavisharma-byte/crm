"use client";
import React, { useState } from "react";
import { Search, Plus, Upload, Download } from "lucide-react";
import Sidebar from "../website/Sidebar";
import DashboardHeader from "../website/Header";

/* =======================
   CONSTANT DATA
======================= */
const FILTER_TABS = ["All"];

const TABLE_COLUMNS = [
    "Discount Group Code",
    "Discount Group Item Code",
    "Entity Type",
    "Entity Code",
    "Discount Percentage",
    "Created",
    "Enabled",
    "Updated",
];

export default function DiscountGroupItem() {
    const [activeTab] = useState("All");

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* Sidebar - same as in TaxClasses */}
            <Sidebar activePage="GST Configurations" />

            {/* Main content area (no ml-[260px], flex-1 fill) */}
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader />

                {/* Sub-header: Title, Tabs, and Actions */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-6">
                        <h1 className="text-[16px] font-bold text-[#303e67] whitespace-nowrap">
                            Discount Group Item
                        </h1>
                        <div className="flex gap-3">
                            {FILTER_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                                        activeTab === tab
                                            ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                                            : "text-gray-400 border-gray-300 hover:border-gray-400"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Action Buttons Group */}
                    <div className="flex items-center gap-3">
                        <button
                            className="flex items-center gap-2 bg-[#2b6cee] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm"
                        >
                            <Plus size={16} />
                            Add Discount Group
                        </button>
                        {/* IconButton: Upload */}
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg border border-transparent hover:bg-blue-100 transition-colors">
                            <Upload size={18} />
                        </button>
                        {/* IconButton: Download */}
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg border border-transparent hover:bg-blue-100 transition-colors">
                            <Download size={18} />
                        </button>
                    </div>
                </div>

                {/* Table area - dimensions like TaxClasses (main p-8 max-w-[1600px], min-w-[1400px]) */}
                <main className="flex-1 p-8 max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[1400px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-6 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State - illustration like TaxClasses */}
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length} className="py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-32 h-32 mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                                                    <div className="w-16 h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center">
                                                        <Search className="text-[#2b6cee]" size={28} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[14px] text-gray-500 font-medium tracking-tight">
                                                No Data to Display
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}