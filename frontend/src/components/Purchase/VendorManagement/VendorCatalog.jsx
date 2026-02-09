import React, { useState } from 'react';
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/Header";
import { Search as SearchIcon, Filter, Download, Plus } from "lucide-react";
import AddVendorItemModal from './AddVendorItemModal'; // Importing the Add Vendor Item Modal

/* === TABLE HEADERS === */
const TABLE_COLUMNS = [
    "Item Name",
    "Vendor Name",
    "SKU Code",
    "Vendor Code",
    "Vendor SKU Code",
    "Unit Price",
    "Brand",
    "Enabled",
    "Action"
];

export default function VendorsCatalog() {
    const [activeTab, setActiveTab] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar */}
            <Sidebar activePage="Vendor Catalog" />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Header */}
                <DashboardHeader />

                {/* 3. Sub-header / Action Bar */}
                <div className="flex items-center gap-6 px-6 py-4 border-b border-gray-100 bg-white">
                    <h1 className="text-[16px] font-bold text-[#303e67]">Vendor Catalog</h1>

                    <div className="flex gap-2 ml-4">
                        {["All", "Enabled"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={
                                    `text-xs font-bold px-3 py-1 rounded-full border
                                    ${activeTab === tab
                                        ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                                        : "text-gray-400 border-gray-300 hover:border-gray-400"
                                    }`
                                }
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1" />

                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#303d50] hover:bg-gray-50">
                        <Filter size={16} /> Filter
                    </button>

                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 transition-colors" title="Download Vendor Catalog">
                            <Download size={18} />
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)} // Open modal on click
                            className="flex items-center gap-2 bg-[#2b6cee] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-colors"
                        >
                            <Plus size={18} /> Add Vendor Item Mapping
                        </button>
                    </div>
                </div>

                {/* 4. Data Table Area */}
                <main className="flex-1 p-8 max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[1200px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-4 py-4 text-sm font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length} className="py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-32 h-32 mb-4">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-lg border border-gray-100 flex items-center justify-center">
                                                    <SearchIcon size={48} className="text-blue-100" />
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

            {/* 5. Add Vendor Item Modal */}
            <AddVendorItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}