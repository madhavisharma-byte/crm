import React from "react";
import { Filter, Upload, Download, Search } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/Header";

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
    <footer className="w-full border-t bg-slate-50 px-6 py-4 text-sm text-slate-500 text-center">
        © 2024 Inventory Management System. All rights reserved.
    </footer>
);

const InventorySnapshot = () => {
    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* Sidebar */}
            <Sidebar activePage="Products" />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <DashboardHeader />

                {/* Top Control Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
                    <div className="flex items-center gap-6">
                        <h2 className="text-lg font-bold text-slate-700">Inventory Snapshot</h2>
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
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium border border-slate-300 rounded-md hover:bg-slate-50">
                            <Filter className="w-4 h-4" /> Filter
                        </button>
                        <button className="p-2 border border-slate-300 rounded-md hover:bg-slate-50 text-blue-600">
                            <Upload className="w-4 h-4" />
                        </button>
                        <button className="p-2 border border-slate-300 rounded-md hover:bg-slate-50 text-blue-600">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Table Header Row */}
                <div className="grid grid-cols-8 bg-[#eef4ff] px-6 py-3 border-b border-slate-100">
                    {TABLE_HEADERS.map((header) => (
                        <div key={header} className="text-[13px] font-medium text-slate-600">
                            {header}
                        </div>
                    ))}
                </div>

                {/* Content Area */}
                <div className="w-full">
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
        </div>
    );
};

export default InventorySnapshot;