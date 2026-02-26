import React, { useState } from 'react';
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";
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
        <div className="relative min-h-screen w-full bg-white font-sans antialiased">
            {/* Responsive Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="Vendor Catalog" />
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
                {/* Global Header */}
                <DashboardHeader />

                {/* Responsive Sub-header / Action Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
                        <h1 className="text-[16px] font-bold text-[#303e67]">Vendor Catalog</h1>
                        <div className="flex gap-2 ml-0 sm:ml-4 mt-2 sm:mt-0">
                            {["All", "Enabled"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={
                                        `text-xs font-bold px-3 py-1 rounded-full border
                                        ${activeTab === tab
                                            ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                                            : "text-gray-400 border-gray-300 hover:border-gray-400 bg-white"
                                        }`
                                    }
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#303d50] hover:bg-gray-50 mt-2 sm:mt-0">
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center mt-3 sm:mt-0 gap-2">
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 transition-colors" title="Download Vendor Catalog">
                            <Download size={18} />
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-[#2b6cee] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-colors"
                        >
                            <Plus size={18} /> Add Vendor Item Mapping
                        </button>
                    </div>
                </div>

                {/* Table Responsive Layout */}
                <main className="flex-1 p-2 sm:p-4 md:p-8 max-w-[1600px] w-full">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[800px] md:min-w-[1200px]">
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
                                    <td colSpan={TABLE_COLUMNS.length} className="py-24 sm:py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-20 h-20 sm:w-32 sm:h-32 mb-4">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-lg border border-gray-100 flex items-center justify-center">
                                                    <SearchIcon size={40} className="text-blue-100 sm:hidden" />
                                                    <SearchIcon size={48} className="text-blue-100 hidden sm:block" />
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

                {/* Modal */}
                <AddVendorItemModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
            {/* Responsive custom scrollbar and paddings for smaller screens */}
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