import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Sidebar from '../website/Sidebar';
import DashboardHeader from '../website/Header';

// --- Page Data / Constants ---
const PRODUCT_CATEGORIES = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Apparel" },
    { id: 3, name: "Home & Garden" },
    { id: 4, name: "Stationery" }
];

const SearchProduct = () => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className="relative bg-white font-sans antialiased min-h-screen w-full">
            {/* Responsive Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="Materials" />
            </div>
            {/* Responsive main content layout */}
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

                {/* Section Header */}
                <div className="px-4 sm:px-6 py-4">
                    <h2 className="text-lg font-bold text-[#334155]">Search Product</h2>
                </div>

                {/* Top Border/Divider */}
                <div className="border-b border-slate-200 w-full" />

                {/* Search Form Area */}
                <div className="p-3 sm:p-6 w-full flex justify-center">
                    <div className="w-full max-w-md">
                        <div className="flex flex-col gap-2">
                            {/* Label */}
                            <label className="text-[13px] font-medium text-slate-500">
                                Search Item/SKU
                            </label>

                            {/* Custom Dropdown Input */}
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Enter Search Item/SKU"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    className="w-full h-11 px-4 pr-10 bg-[#f8fafc] border border-slate-300 rounded-lg 
                                 text-sm text-slate-600 placeholder:text-slate-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400
                                 transition-all duration-200 cursor-pointer"
                                />
                                {/* Dropdown Icon */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDown className="w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
};

export default SearchProduct;