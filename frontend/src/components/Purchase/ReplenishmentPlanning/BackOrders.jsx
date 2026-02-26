import React, { useState } from 'react';
import Sidebar from '../../website/Sidebar';
import DashboardHeader from '../../website/Header';
import { Box, Search } from 'lucide-react';

export default function BackOrdersPage() {
    const [filter, setFilter] = useState('Enabled');

    const tableHeaders = [
        "Product Name", "Product Code", "Category", "Vendor",
        "Quantity Waiting", "Quantity In Cart", "Quantity To Raise",
        "Unit Price", "Product Status"
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

                {/* 3. Sub-header (filter bar) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8 px-3 sm:px-4 md:px-6 py-3 border-b border-gray-100 bg-white">
                    <h1 className="text-base md:text-lg font-bold text-[#303e67]">Back Orders</h1>
                    <div className="flex gap-2 sm:gap-3">
                        {['Enabled', 'Disabled', 'All'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFilter(tab)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${filter === tab
                                    ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                                    : "text-gray-400 border-gray-300 hover:border-gray-400 bg-white"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 4. Data Table Area */}
                <main className="flex-1 p-2 sm:p-4 md:p-8 max-w-full md:max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[700px] md:min-w-[1200px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {tableHeaders.map((header, i) => (
                                        <th
                                            key={i}
                                            className="px-2 py-3 md:px-4 md:py-4 text-xs md:text-sm font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State */}
                                <tr>
                                    <td colSpan={tableHeaders.length} className="py-20 md:py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            {/* Empty State Illustration */}
                                            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-lg border border-gray-100 flex items-center justify-center">
                                                    <Box size={36} className="text-blue-100 md:text-[48px]" />
                                                    <Search size={18} className="absolute text-blue-400 bottom-4 right-4 md:size-24 md:bottom-6 md:right-6" />
                                                </div>
                                            </div>
                                            <p className="text-xs md:text-sm font-medium text-gray-400">No records to show</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
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