import React, { useState } from "react";
import { Search, Filter, Upload, Download } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */
const FILTER_TABS = [
    "Sync Enabled",
    "Sync Disabled",
    "Linked",
    "Unlinked",
    "Ignored",
];

const TABLE_COLUMNS = [
    "Channel",
    "SKU Name",
    "Product Name on Channel",
    "Listing Status",
    "Selling Price",
    "Price Update History",
    "Disabled Due To Errors",
    "Manually Disabled",
    "Synced From",
    "Next Inventory Update",
    "Blocked Inventory",
    "Last Inventory Update",
    "Inventory Update History",
    "Created"
];

export default function ListingsPage() {
    const [activeTab, setActiveTab] = useState("Sync Enabled");

    return (
        <div className="relative bg-white font-sans antialiased min-h-screen w-full">
            {/* Sidebar - same as other config pages */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="Products" />
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
                <DashboardHeader />

                {/* Sub-header: Title, Tabs, and Actions */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-2 sm:px-4 md:px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        <h1 className="text-[15px] md:text-[16px] font-bold text-[#303e67] whitespace-nowrap">
                            Listings
                        </h1>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {FILTER_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
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
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button className="flex items-center gap-2 border border-gray-300 px-4 md:px-5 py-2 rounded-lg text-xs md:text-sm font-semibold text-[#303d50] hover:bg-gray-50 transition-colors">
                            <Filter size={16} />
                            <span className="hidden xs:inline">Filter</span>
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

                {/* Table area: responsive container */}
                <main className="flex-1 px-1 sm:px-3 md:px-8 py-2 md:py-8 w-full max-w-full">
                    <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white">
                        <table className="w-full text-left min-w-[900px] md:min-w-[1200px] lg:min-w-[1400px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    <th className="px-2 md:px-6 py-4 w-10 md:w-12">
                                        {/* Selection Circle/Checkbox */}
                                        <div className="w-4 h-4 rounded-full border border-blue-200 bg-white" />
                                    </th>
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-2 md:px-4 py-4 text-[12px] md:text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State Body */}
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length + 1} className="py-14 md:py-32 lg:py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                                                    <div className="w-12 h-10 md:w-16 md:h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center">
                                                        <Search className="text-[#2b6cee]" size={24} mdsize={28} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[13px] md:text-[14px] text-gray-500 font-medium tracking-tight">
                                                No records to show
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            {/* Responsive sidebar paddings mimic Overview.jsx */}
            <style>{`
                @media (max-width: 1023px) {
                    .lg\\:pl-80 { padding-left: 4rem !important; }
                }
                @media (max-width: 767px) {
                    .md\\:pl-48 { padding-left: 4rem !important; }
                    .sm\\:pl-16 { padding-left: 4rem !important; }
                }
                @media (max-width: 640px) {
                    .sm\\:pl-16 { padding-left: 4rem !important; }
                }
                @media (max-width: 640px) {
                    /* Compact table font for smallest screens */
                    table, th, td { font-size: 11px; }
                }
            `}</style>
        </div>
    );
}