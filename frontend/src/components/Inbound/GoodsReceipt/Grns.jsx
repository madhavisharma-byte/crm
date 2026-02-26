
import React, { useState } from "react";
import { Search, Filter as FilterIcon } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */
const FILTER_TABS = [
    "GRN",
    "Gatepass",
    "Putback Accepted",
    "Putback Pending",
    "Customer Return",
    "Courier Return"
];

const TABLE_COLUMNS = [
    "GRN Number",
    "Vendor Invoice",
    "PO Number",
    "Vendor Name",
    "Vendor Invoice Date",
    "QC Pending",
    "QC Complete",
    "Last Updated",
    "Created By",
    "Created On",
    "GRN Received Timestamp",
    "QC Completed On",
];

export default function GoodsReceiptNote() {
    const [activeTab, setActiveTab] = useState("GRN");

    return (
        <div className="relative bg-white min-h-screen w-full font-sans antialiased">
            {/* Sidebar - Fixed for all, adjusts via padding */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="Goods Receipt" />
            </div>
            {/* Responsive content layout */}
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
                {/* Global Header */}
                <DashboardHeader />

                {/* Header/Sub-header: Title, Tabs, Actions */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 px-3 sm:px-4 md:px-6 py-3 md:py-4 border-b border-gray-100 bg-white">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                        <h1 className="text-base sm:text-[16px] font-bold text-[#303e67]">Goods Receipt</h1>
                        {/* Responsive: Tabs wrap on xs, row on sm+ */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 mt-2 sm:mt-0">
                            {FILTER_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`
                                        px-4 sm:px-5 py-1.5 rounded-full text-xs font-semibold transition-all border uppercase tracking-wide
                                        ${activeTab === tab
                                            ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                                            : "text-gray-400 border-gray-300 hover:border-gray-400"
                                        }
                                    `}
                                    style={{ minWidth: 98 }}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filter Button Responsive */}
                    <div className="flex mt-2 md:mt-0 items-center">
                        <button className="flex items-center gap-2 px-4 sm:px-5 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-[#303d50] hover:bg-gray-50 transition-colors shadow-sm w-full md:w-auto">
                            <FilterIcon size={16} />
                            <span className="hidden sm:inline">Filter</span>
                            <span className="sm:hidden">Filter</span>
                        </button>
                    </div>
                </div>

                {/* Table Section - Responsive paddings */}
                <main className="flex-1 p-2 sm:p-4 md:p-8 max-w-full md:max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[700px] md:min-w-[1200px] lg:min-w-[1400px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-[12px] md:text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State Body */}
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length} className="py-16 sm:py-28 md:py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-20 h-20 sm:w-32 sm:h-32 mb-4 sm:mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                                                    <div className="w-10 h-8 sm:w-16 sm:h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center">
                                                        <Search className="text-[#2b6cee]" size={20} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[13px] sm:text-[14px] text-gray-500 font-medium tracking-tight">
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
            `}</style>
        </div>
    );
}
