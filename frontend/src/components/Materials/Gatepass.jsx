import React, { useState } from 'react';
import { Download, Plus, Search } from 'lucide-react';
import Sidebar from "../(website)/Sidebar";
import DashboardHeader from "../(website)/header";

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
    <div className="flex flex-col items-center justify-center py-32">
        <div className="w-24 h-24 bg-blue-50 rounded-lg flex items-center justify-center border-b-4 border-orange-200 mb-4 transition-transform hover:scale-105">
            <div className="p-3 bg-white rounded shadow-sm border border-slate-100">
                <Search className="w-10 h-10 text-slate-300" />
            </div>
        </div>
        <p className="text-slate-500 font-medium text-sm">No Data to Display</p>
    </div>
);

// --- Main Page Component ---

const GatepassPage = () => {
    const [activeTab, setActiveTab] = useState('pending');

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* Sidebar */}
            <Sidebar activePage="Materials" />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <DashboardHeader />

                {/* 1. Header/Toolbar Area */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-6">
                        <h1 className="text-lg font-bold text-[#334155]">Gatepass</h1>

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-2">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-1 rounded-full text-[12px] font-semibold border transition-all duration-200 ${activeTab === tab.id
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
                    <div className="flex items-center gap-3">
                        <button className="p-2 border border-slate-300 rounded-md hover:bg-slate-50 text-slate-500 bg-[#eff6ff]/50 transition-colors">
                            <Download className="w-4 h-4" />
                        </button>
                        <button className="bg-[#3b82f6] hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold transition-all shadow-sm flex items-center gap-2">
                            Create Gatepass
                        </button>
                    </div>
                </div>

                {/* 2. Table Header Row */}
                {/* Note: grid-cols-11 is used to match the 11 headers defined */}
                <div className="w-full overflow-x-auto">
                    <div className="grid grid-cols-11 bg-[#eef4ff] px-6 py-3 min-w-[1200px]">
                        {TABLE_HEADERS.map((header) => (
                            <div
                                key={header}
                                className="text-[13px] font-semibold text-[#475569] truncate pr-2"
                            >
                                {header}
                            </div>
                        ))}
                    </div>

                    {/* 3. Content Area */}
                    <div className="min-w-[1200px]">
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
    );
};

export default GatepassPage;