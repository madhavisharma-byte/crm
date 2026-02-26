import React, { useState } from 'react';
import {
    Search,
    Plus,
    ChevronDown
} from 'lucide-react';
import Sidebar from '../../website/Sidebar';
import Header from '../../website/Header'; // Import Header component

const SearchShelfPage = () => {
    return (
        <div className="flex min-h-screen bg-white font-sans overflow-hidden">
            {/* Sidebar Component */}
            <Sidebar activePage="search-shelf" />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">

                {/* 1. TOP NAVBAR */}
                <Header />

                {/* 2. PAGE HEADER */}
                <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white flex-shrink-0 gap-3 sm:gap-0">
                    <h1 className="text-base sm:text-lg font-bold text-[#334155] tracking-tight">Search Shelf</h1>
                    <button className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-all shadow-sm w-full sm:w-auto justify-center">
                        <Plus size={18} />
                        Add Package Type
                    </button>
                </div>

                {/* 3. MAIN FORM AREA */}
                <div className="flex-1 p-4 sm:p-6 overflow-auto">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">

                        {/* Shelf Type Dropdown */}
                        <div className="space-y-2">
                            <label className="block text-[13px] font-bold text-gray-800">
                                Shelf Type <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select className="w-full appearance-none bg-[#f8fafc] border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select Shelf Type</option>
                                </select>
                                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Section Dropdown */}
                        <div className="space-y-2">
                            <label className="block text-[13px] font-bold text-gray-800">
                                Section <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select className="w-full appearance-none bg-[#f8fafc] border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select Section</option>
                                </select>
                                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Name Contain Input */}
                        <div className="space-y-2">
                            <label className="block text-[13px] font-bold text-gray-800">
                                Name Contain <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter name contain"
                                className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>

                    </div>
                </div>

                {/* 4. FOOTER ACTION BAR */}
                <div className="px-4 sm:px-6 py-4 bg-[#f8fafc] border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
                    <button className="bg-[#2563eb] hover:bg-blue-700 text-white w-full sm:w-auto px-10 py-2 rounded-lg text-sm font-semibold transition-all shadow-md">
                        Search
                    </button>
                </div>

            </div>
            {/* Responsive Styles for mobile/large screen */}
            <style>{`
                @media (min-width: 1024px) {
                    /* Sidebar paddings mimic Overview.jsx */
                    .lg\\:pl-80 { padding-left: 20rem !important; }
                }
            `}</style>
        </div>
    );
};

export default SearchShelfPage;