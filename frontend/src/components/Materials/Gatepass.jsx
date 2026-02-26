import React, { useState } from 'react';
import { Download, Plus, Search } from 'lucide-react';
import Sidebar from "../website/Sidebar";
import DashboardHeader from "../website/Header";

// --- Constants & Data ---
const TABS = [
    { id: 'pending', label: 'Pending' },
    { id: 'all', label: 'All' }
];

const TABLE_HEADERS = [
    "Code",
    "Created by User",
    "Status",
    "Type",
    "Qty",
    "Received Qty",
    "Lost Qty",
    "Tp Party",
    "Reference",
    "Created At",
    "Updated At"
];

const GATEPASS_DATA = []; // Empty for initial state

// --- Sub-Components ---

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-24 md:py-32 px-4">
        <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-50 rounded-lg flex items-center justify-center border-b-4 border-orange-200 mb-4 transition-transform hover:scale-105">
            <div className="p-3 bg-white rounded shadow-sm border border-slate-100">
                <Search className="w-8 h-8 md:w-10 md:h-10 text-slate-300" />
            </div>
        </div>
        <p className="text-slate-500 font-medium text-sm">No Data to Display</p>
    </div>
);

// --- Main Page Component ---

const GatepassPage = () => {
    const [activeTab, setActiveTab] = useState('pending');

    return (
        <div className="relative bg-white font-sans antialiased min-h-screen w-full">
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="Materials" />
            </div>
            {/* Responsive main content */}
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
                {/* Header */}
                <DashboardHeader />

                {/* 1. Header/Toolbar Area */}
                <div className="px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 w-full sm:w-auto">
                        <h1 className="text-base sm:text-lg font-bold text-[#334155]">Gatepass</h1>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-2 mt-2 sm:mt-0">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-3 sm:px-4 py-1 rounded-full text-xs sm:text-[12px] font-semibold border transition-all duration-200 ${
                                        activeTab === tab.id
                                            ? "bg-[#3b82f6] border-[#3b82f6] text-white shadow-sm"
                                            : "border-slate-300 text-slate-400 hover:bg-slate-50"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <button className="p-2 border border-slate-300 rounded-md hover:bg-slate-50 text-slate-500 bg-[#eff6ff]/50 transition-colors flex-shrink-0">
                            <Download className="w-4 h-4" />
                        </button>
                        <button className="bg-[#3b82f6] hover:bg-blue-700 text-white px-4 sm:px-5 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center gap-2 flex-shrink-0">
                            Create Gatepass
                        </button>
                    </div>
                </div>

                {/* Table section */}
                <div className="w-full flex-1 overflow-auto">
                    <div className="w-full min-w-0 overflow-x-auto">
                        {/* Responsive Table Header Row */}
                        <div className="hidden lg:grid grid-cols-11 bg-[#eef4ff] px-6 py-3 min-w-[1200px]">
                            {TABLE_HEADERS.map((header) => (
                                <div
                                    key={header}
                                    className="text-[13px] font-semibold text-[#475569] truncate pr-2"
                                >
                                    {header}
                                </div>
                            ))}
                        </div>

                        {/* Responsive: Table Header Row for Smaller Screens */}
                        <div className="flex flex-row w-full lg:hidden bg-[#eef4ff] px-3 py-2 gap-1 overflow-x-auto">
                            {TABLE_HEADERS.map((header) => (
                                <div
                                    key={header}
                                    className="text-[12px] font-semibold text-[#475569] whitespace-nowrap pr-2 min-w-[100px]"
                                >
                                    {header}
                                </div>
                            ))}
                        </div>

                        {/* 3. Content Area */}
                        <div className="min-w-[360px] lg:min-w-[1200px]">
                            {GATEPASS_DATA.length > 0 ? (
                                <div className="divide-y divide-slate-100">
                                    {/* Row mapping would go here */}
                                </div>
                            ) : (
                                <EmptyState />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Responsive Scrollbar and Breakpoints Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }
                @media (max-width: 1023px) {
                    /* When sidebar is collapsed on tablet/mobile, reserve only rail or collapsed width */
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
};

export default GatepassPage;