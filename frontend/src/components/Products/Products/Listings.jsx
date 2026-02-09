import React, { useState } from "react";
import { Search, Filter, Upload, Download } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/header";

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
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* Sidebar - same as other config pages */}
            <Sidebar activePage="Products" />
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader />

                {/* Sub-header: Title, Tabs, and Actions */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-6">
                        <h1 className="text-[16px] font-bold text-[#303e67] whitespace-nowrap">
                            Listings
                        </h1>
                        <div className="flex gap-3">
                            {FILTER_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
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
                        <button className="flex items-center gap-2 border border-gray-300 px-5 py-2 rounded-lg text-sm font-semibold text-[#303d50] hover:bg-gray-50 transition-colors">
                            <Filter size={16} />
                            Filter
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

                {/* Table area: same width/height as TaxClasses */}
                <main className="flex-1 p-8 max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[1400px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    <th className="px-6 py-4 w-12">
                                        {/* Selection Circle/Checkbox */}
                                        <div className="w-4 h-4 rounded-full border border-blue-200 bg-white" />
                                    </th>
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-4 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State Body */}
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length + 1} className="py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-32 h-32 mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                                                    <div className="w-16 h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center">
                                                        <Search className="text-[#2b6cee]" size={28} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[14px] text-gray-500 font-medium tracking-tight">
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
        </div>
    );
}