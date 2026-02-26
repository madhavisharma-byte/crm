import React from "react";
import { Filter, Upload, Download, Search } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

const TABLE_HEADERS = [
    "SKU Code",
    "Updated At",
    "Category",
    "Inventory",
    "Inventory Not Synced",
    "Bad/QC Rejected",
    "Inventory Blocked",
    "Vendor Inventory",
];

// Page data constant (Empty to match image, but structured for usage)
const INVENTORY_DATA = [];

// --- Sub-Components ---
const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="relative mb-4">
            <div className="h-24 w-24 bg-blue-50 rounded-lg flex items-center justify-center border-b-4 border-orange-200">
                <div className="p-3 bg-white rounded shadow-sm border border-slate-100">
                    <Search className="w-10 h-10 text-slate-400" />
                </div>
            </div>
        </div>
        <p className="text-slate-500 font-medium">No Data to Display</p>
    </div>
);

const Footer = () => (
    <footer className="w-full border-t bg-slate-50 px-4 md:px-6 py-4 text-xs md:text-sm text-slate-500 text-center">
        © 2024 Inventory Management System. All rights reserved.
    </footer>
);

const InventorySnapshot = () => {
    return (
        <div className="relative min-h-screen w-full bg-white font-sans antialiased">
            {/* Sidebar - Responsive for all screens */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="Products" />
            </div>
            {/* Responsive Main Content */}
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

                {/* Top Control Bar - responsive wrapping */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 border-b border-slate-100 bg-white gap-3 md:gap-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <h2 className="text-base md:text-lg font-bold text-slate-700 whitespace-nowrap tracking-tight">Inventory Snapshot</h2>
                        {/* Tabs */}
                        <div className="flex gap-2">
                            <button className="px-4 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded-full">
                                All
                            </button>
                            <button className="px-4 py-1.5 text-xs font-semibold text-slate-400 border border-slate-300 rounded-full hover:bg-slate-50 transition-colors">
                                In Stock
                            </button>
                        </div>
                    </div>
                    {/* Action Buttons Group */}
                    <div className="flex gap-2 sm:gap-3 items-center flex-wrap">
                        <button className="flex items-center gap-2 px-4 sm:px-5 py-1.5 text-xs sm:text-sm font-medium border border-slate-300 rounded-md hover:bg-slate-50">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                        <button className="p-2 sm:p-2.5 border border-slate-300 rounded-md hover:bg-slate-50 text-blue-600">
                            <Upload className="w-4 h-4" />
                        </button>
                        <button className="p-2 sm:p-2.5 border border-slate-300 rounded-md hover:bg-slate-50 text-blue-600">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Table Header Row - responsive grid */}
                <div className="overflow-x-auto w-full">
                    <div className="grid min-w-[540px] sm:min-w-[900px] md:min-w-[1100px] lg:min-w-[1200px] grid-cols-8 bg-[#eef4ff] px-4 md:px-6 py-3 border-b border-slate-100">
                        {TABLE_HEADERS.map((header) => (
                            <div key={header} className="text-[12px] md:text-[13px] font-medium text-slate-600 whitespace-nowrap truncate">
                                {header}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 w-full px-1 md:px-0">
                    {INVENTORY_DATA.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                            {/* Map data here when available */}
                        </div>
                    ) : (
                        <EmptyState />
                    )}
                </div>

                <Footer />
            </div>
            <style>{`
                @media (max-width: 1023px) {
                    /* For medium screens, collapse sidebar padding */
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

export default InventorySnapshot;