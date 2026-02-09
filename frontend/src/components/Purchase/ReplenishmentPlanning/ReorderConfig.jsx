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
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Header */}
                <DashboardHeader />

                {/* 3. Sub-header / Action Bar */}
                <div className="flex items-center gap-6 px-6 py-4 border-b border-gray-100 bg-white">
                    <h1 className="text-[16px] font-bold text-[#303e67]">Product Order Configuration</h1>
                    {/* Shift "All" and Filter button to the leftmost after title, rest remain right */}
                    <span className="bg-[#2b6cee] text-white text-xs font-bold px-3 py-1 rounded-full ml-4">All</span>
                    
                    <div className="flex-1" />
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#303d50] hover:bg-gray-50">
                        <Filter size={16} /> Filter
                    </button>
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 transition-colors">
                            <Upload size={18} />
                        </button>
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 transition-colors">
                            <Download size={18} />
                        </button>
                        <button
                            className="flex items-center gap-2 bg-[#2b6cee] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-colors"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={18} /> Add Reorder Config
                        </button>
                    </div>
                </div>

                {/* 4. Data Table Area */}
                <main className="flex-1 p-8 max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[1200px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {tableHeaders.map((header, idx) => (
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
                                {/* Empty State Body */}
                                <tr>
                                    <td colSpan={tableHeaders.length} className="py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-32 h-32 mb-4">
                                                {/* Empty state illustration (height/width like CreateRIS.jsx) */}
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-lg border border-gray-100 flex items-center justify-center">
                                                    <Search size={48} className="text-blue-100" />
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
            {/* Reorder Config Modal */}
            <ReorderConfigModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}