import React, { useState } from 'react';
import Sidebar from '../../website/Sidebar';
import DashboardHeader from '../../website/Header';
import { Filter, Box, Search } from 'lucide-react';

export default function ReordersPage() {
    const [activeFilter, setActiveFilter] = useState('Enabled');

    const headers = [
        "Item Name", "SKU Code", "Category", "Vendor",
        "Available Quantity", "Quantity Deficit", "Quantity in Cart",
        "Item Bucket Size", "Quantity To Add"
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
                {/* Header */}
                <DashboardHeader />

                {/* Sub-header Filter Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8 px-3 sm:px-4 md:px-6 py-3 border-b border-gray-100 bg-white">
                    <h1 className="text-base md:text-lg font-bold text-[#303e67]">Reorders</h1>
                    <div className="flex gap-2 sm:gap-3">
                        {['Enabled', 'Disabled', 'All'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveFilter(tab)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                                    activeFilter === tab
                                    ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                                    : "text-gray-400 border-gray-300 hover:border-gray-400 bg-white"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1" />
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#303d50] hover:bg-gray-50 mt-2 sm:mt-0">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>

                {/* Data Table Area */}
                <main className="flex-1 p-2 sm:p-4 md:p-8 max-w-full md:max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[700px] md:min-w-[1200px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {headers.map((header, i) => (
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
                                {/* Empty State Body */}
                                <tr>
                                    <td colSpan={headers.length} className="py-20 md:py-40">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="relative w-20 h-20 md:w-32 md:h-32 mb-4">
                                                {/* Empty state illustration placeholder */}
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-lg border border-gray-100 flex items-center justify-center">
                                                    <Box size={32} md={undefined} className="text-blue-100 md:size-48" />
                                                    <Search size={16} className="absolute text-blue-400 bottom-2 right-2 md:bottom-6 md:right-6" />
                                                </div>
                                            </div>
                                            <p className="text-[13px] md:text-sm font-medium text-gray-400">No records to show</p>
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