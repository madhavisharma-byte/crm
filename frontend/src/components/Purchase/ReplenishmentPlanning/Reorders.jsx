import React, { useState } from 'react';
import Sidebar from '../../(website)/Sidebar';
import DashboardHeader from '../../(website)/Header';
import { Filter, Box, Search } from 'lucide-react';

export default function ReordersPage() {
    const [activeFilter, setActiveFilter] = useState('Enabled');

    const headers = [
        "Item Name", "SKU Code", "Category", "Vendor",
        "Available Quantity", "Quantity Deficit", "Quantity in Cart",
        "Item Bucket Size", "Quantity To Add"
    ];

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <DashboardHeader />

                {/* Sub-header Filter Bar */}
                <div className="flex items-center gap-8 px-6 py-4 border-b border-gray-100 bg-white">
                    <h1 className="text-lg font-bold text-[#303e67]">Reorders</h1>
                    <div className="flex gap-3">
                        {['Enabled', 'Disabled', 'All'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveFilter(tab)}
                                className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                                    activeFilter === tab
                                        ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                                        : "text-gray-400 border-gray-300 hover:border-gray-400"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1" />
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#303d50] hover:bg-gray-50">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>

                {/* Data Table Area */}
                <main className="flex-1 p-8 max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[1200px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {headers.map((header, i) => (
                                        <th
                                            key={i}
                                            className="px-6 py-4 text-sm font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State Body */}
                                <tr>
                                    <td colSpan={headers.length} className="py-40">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="relative w-32 h-32 mb-4">
                                                {/* Empty state illustration placeholder */}
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-lg border border-gray-100 flex items-center justify-center">
                                                    <Box size={48} className="text-blue-100" />
                                                    <Search size={24} className="absolute text-blue-400 bottom-6 right-6" />
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium text-gray-400">No records to show</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}