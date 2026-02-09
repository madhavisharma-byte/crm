import React from 'react';
import {
    Search,
    Plus,
    Bell,
    ChevronDown,
    User as UserIcon
} from 'lucide-react';
import Sidebar from '../components/(website)/Sidebar'; // Importing the sidebar

const PackagesTypePage = () => {
    // Define table headers based on the image
    const tableHeaders = [
        "Name", "Code", "Channel", "Box Length", "Box Width",
        "Box Height", "Box Weight", "Packing Cost",
        "Scannable", "Default", "Enabled", "Action"
    ];

    return (
        <div className="flex h-screen bg-white overflow-hidden font-sans">
            {/* Sidebar - Fixed Left */}
            <Sidebar activePage="packages-types" />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">

                {/* 1. TOP NAVBAR (Global) */}
                <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-[#f8fafc] flex-shrink-0">
                    <div className="relative w-96">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-1.5 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer">
                            Sale Order <ChevronDown size={14} />
                        </div>
                        <div className="relative cursor-pointer">
                            <Bell size={20} className="text-gray-500" />
                            <span className="absolute -top-1 -right-1 bg-red-500 border-2 border-white w-2.5 h-2.5 rounded-full"></span>
                        </div>
                        <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-700 leading-none">Gautam ch</p>
                                <p className="text-xs text-gray-400 mt-1">Store Admin</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden">
                                <UserIcon className="text-gray-500" size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* 2. PAGE HEADER (Title & Action Button) */}
                <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-white flex-shrink-0">
                    <h1 className="text-base font-bold text-slate-700 tracking-tight">Packages Type</h1>
                    <button className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-all shadow-sm">
                        <Plus size={18} />
                        Add Package Type
                    </button>
                </div>

                {/* 3. DATA TABLE AREA */}
                <div className="flex-1 p-6 overflow-auto">
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
                        <table className="w-full text-left border-collapse table-fixed">
                            <thead className="bg-[#eef2ff]">
                                <tr>
                                    {tableHeaders.map((header, index) => (
                                        <th
                                            key={index}
                                            className={`px-4 py-4 text-[13px] font-semibold text-slate-600 truncate ${header === "Action" ? "text-center" : ""
                                                }`}
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State / Placeholder Rows */}
                                <tr className="border-none">
                                    <td colSpan={tableHeaders.length} className="h-[500px] text-center text-gray-400 text-sm italic">
                                        No package types configured.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PackagesTypePage;