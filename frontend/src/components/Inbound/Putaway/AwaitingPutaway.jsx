import React, { useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/Header";
import CreatePutawayModal from "./CreatePutawayModal"; // Reusing the previously created modal

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
    "Grn Number",
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
    "QC Completed On"
];

export default function AwaitingPutaway() {
    const [activeTab, setActiveTab] = useState("GRN");
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar (same style as Putaway.jsx) */}
            <Sidebar activePage="Awaiting Putaway" />

            {/* 2. Main Content Area (matches dimensions/pattern from Putaway.jsx) */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Dashboard Header */}
                <DashboardHeader />

                {/* Sub-header: Title, Tabs, and Action Button */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-6">
                        <h1 className="text-[16px] font-bold text-[#303e67]">Awaiting Putaway</h1>
                        {/* Filter Tabs - match Putaway height/spacing */}
                        <div className="flex gap-3">
                            {FILTER_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all border uppercase tracking-wide
                                        ${activeTab === tab
                                            ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                                            : "text-gray-400 border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#2b6cee] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm"
                    >
                        Create Putaway
                    </button>
                </div>

                {/* 4. Table Section (main width/height pattern from Putaway.jsx) */}
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
                                {/* Empty State */}
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
            {/* 5. Create Putaway Modal */}
            <CreatePutawayModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}