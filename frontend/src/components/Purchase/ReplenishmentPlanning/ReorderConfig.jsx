import React, { useState } from 'react';
import Sidebar from '../../website/Sidebar';
import DashboardHeader from '../../website/Header';
import { Search, Filter, Upload, Download, Plus } from 'lucide-react';
import ReorderConfigModal from './ReorderConfigModal';

export default function PurchaseReorderConfig() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tableHeaders = [
        "Item Name", "SKU Code", "Facility", "Reorder Threshold",
        "Min Order Qty", "Max Order Qty", "Enabled", "Last Updated At", "Action"
    ];

    return (
        <div className="relative bg-white min-h-screen w-full font-sans antialiased">
            {/* Fixed Sidebar for all screens, but adjust width via padding */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar />
            </div>
            {/* Responsive content layout, like Overview.jsx */}
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
                {/* 2. Global Header */}
                <DashboardHeader />

                {/* 3. Sub-header / Action Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
                        <h1 className="text-[16px] font-bold text-[#303e67]">Product Order Configuration</h1>
                        <span className="bg-[#2b6cee] text-white text-xs font-bold px-3 py-1 rounded-full ml-0 sm:ml-4 mt-2 sm:mt-0">All</span>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#303d50] hover:bg-gray-50 mt-2 sm:mt-0">
                            <Filter size={16} /> Filter
                        </button>
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center mt-3 sm:mt-0 gap-2">
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 transition-colors" aria-label="Upload">
                            <Upload size={18} />
                        </button>
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 transition-colors" aria-label="Download">
                            <Download size={18} />
                        </button>
                        <button
                            className="flex items-center gap-2 bg-[#2b6cee] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-colors"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={18} /> <span className="hidden xs:inline">Add Reorder Config</span>
                        </button>
                    </div>
                </div>

                {/* 4. Data Table Area */}
                <main className="flex-1 p-2 sm:p-4 md:p-8 max-w-full md:max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[700px] md:min-w-[1200px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {tableHeaders.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-2 md:px-4 py-3 md:py-4 text-xs md:text-sm font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State Body */}
                                <tr>
                                    <td colSpan={tableHeaders.length} className="py-20 md:py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-20 h-20 md:w-32 md:h-32 mb-4">
                                                {/* Empty state illustration (responsive size) */}
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-lg border border-gray-100 flex items-center justify-center">
                                                    <Search size={32} className="md:size-48 text-blue-100" />
                                                </div>
                                            </div>
                                            <p className="text-[13px] md:text-[14px] text-gray-500 font-medium tracking-tight">
                                                No records to show
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
                {/* Reorder Config Modal */}
                <ReorderConfigModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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