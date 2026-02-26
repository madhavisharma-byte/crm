import React, { useState } from "react";
import { Search } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";
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
            {/* 1. Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="Awaiting Putaway" />
            </div>
            {/* 2. Main Content Area */}
            <div
                className={`
                    flex flex-col min-h-screen flex-1 min-w-0
                    transition-all
                    lg:pl-80 pl-16
                    md:pl-48
                    sm:pl-16
                    bg-white
                `}
            >
                <DashboardHeader />

                {/* Sub-header: Title, Tabs, and Action Button */}
                <div className="
                    flex flex-col sm:flex-row sm:items-center sm:justify-between 
                    px-2 sm:px-4 md:px-6 py-3 sm:py-4 border-b border-gray-100 bg-white
                    gap-3 sm:gap-0
                ">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        <h1 className="text-base md:text-[16px] font-bold text-[#303e67]">Awaiting Putaway</h1>
                        <div className="flex gap-2 sm:gap-3 overflow-x-auto custom-scrollbar pb-1">
                            {FILTER_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 sm:px-5 py-1.5 rounded-full text-xs font-semibold transition-all border uppercase tracking-wide
                                    ${
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
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#2b6cee] text-white px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm w-full sm:w-auto"
                    >
                        Create Putaway
                    </button>
                </div>

                {/* Table Section */}
                <main className="flex-1 p-2 sm:p-4 md:p-8 max-w-full md:max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[900px] md:min-w-[1400px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-3 md:px-6 py-3 md:py-4 text-[12px] md:text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State */}
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length} className="py-20 sm:py-32 md:py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-20 h-20 sm:w-32 sm:h-32 mb-4 sm:mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                                                    <div className="w-10 h-8 sm:w-16 sm:h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center">
                                                        <Search className="text-[#2b6cee]" size={22} sm-size={28} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-xs sm:text-[14px] text-gray-500 font-medium tracking-tight">
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
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }
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