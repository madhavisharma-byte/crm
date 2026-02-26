import React from 'react';
import {
    ChevronDown,
    User as UserIcon
} from 'lucide-react';
import Sidebar from '../../website/Sidebar';
import Header from '../../website/Header'; // Import Header component

const CreateShelfPage = () => {
    return (
        <div className="flex bg-white overflow-hidden font-sans min-h-screen">
            {/* Sidebar - Fixed Left (responsive: hide on small screens, show on md+) */}
            <div className="hidden sm:block">
                <Sidebar activePage="create-shelf" />
            </div>
            {/* Sidebar toggle for mobile */}
            <div className="sm:hidden fixed left-0 top-0 w-full z-40">
                {/* You can add a mobile drawer here if desired */}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
                {/* 1. TOP NAVBAR (Consistent with your dashboard theme) */}
                <Header />

                {/* 2. PAGE HEADER */}
                <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center bg-white flex-shrink-0">
                    <h1 className="text-base sm:text-lg font-bold text-[#334155] tracking-tight">Create Shelf</h1>
                </div>

                {/* 3. FORM CONTENT AREA */}
                <div className="flex-1 p-4 sm:p-6 overflow-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {/* Shelf Type Field */}
                        <div className="space-y-2">
                            <label className="block text-[13px] sm:text-sm font-bold text-gray-800">
                                Shelf Type <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select className="w-full appearance-none bg-[#f8fafc] border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] sm:text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select Shelf Type</option>
                                </select>
                                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        {/* Section Field */}
                        <div className="space-y-2">
                            <label className="block text-[13px] sm:text-sm font-bold text-gray-800">
                                Section <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select className="w-full appearance-none bg-[#f8fafc] border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] sm:text-sm text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                    <option>Select Section</option>
                                </select>
                                <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        {/* Shelf Codes Field */}
                        <div className="space-y-2 md:col-span-2 lg:col-span-1">
                            <label className="block text-[13px] sm:text-sm font-bold text-gray-800">
                                Shelf Codes <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="eg. 646578"
                                className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-4 py-2.5 text-[13px] sm:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* 4. FOOTER ACTION BAR */}
                <div className="px-4 sm:px-6 py-4 bg-[#f8fafc] border-t border-gray-200 flex justify-end">
                    <button className="bg-[#3b82f6] hover:bg-blue-700 text-white px-6 sm:px-10 py-2 rounded-lg text-sm font-semibold transition-all shadow-md">
                        Generate
                    </button>
                </div>
            </div>
            {/* Responsive adjustments for sidebar */}
            <style>
                {`
                @media (min-width: 1024px) {
                    /* For large screens, reserve more space for sidebar if needed */
                    .lg\\:pl-80 { padding-left: 20rem !important; }
                }
                `}
            </style>
        </div>
    );
};

export default CreateShelfPage;