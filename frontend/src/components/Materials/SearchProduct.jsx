import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Sidebar from '../(website)/Sidebar';
import DashboardHeader from '../(website)/header';

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
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* Sidebar */}
            <Sidebar activePage="Materials" />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <DashboardHeader />

                {/* 1. Section Header */}
                <div className="px-6 py-4">
                    <h2 className="text-lg font-bold text-[#334155]">Search Product</h2>
                </div>

                {/* 2. Top Border/Divider */}
                <div className="border-b border-slate-200 w-full" />

                {/* 3. Search Form Area */}
                <div className="p-6 max-w-md">
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
    );
};

export default SearchProduct;