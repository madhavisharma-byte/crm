import React, { useState } from 'react';
import {
    Search,
    Plus,
    Bell,
    ChevronDown,
    User as UserIcon,
    X
} from 'lucide-react';
import Sidebar from '../../website/Sidebar';
import Header from '../../website/Header'; // Imported header component

const ServiceabilityPage = () => {
    const [activeFilter, setActiveFilter] = useState('Currently Enabled');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const tableHeaders = [
        "Shipping Provider", "Shipping Method", "Pincode", "Enabled",
        "Priority", "Routing Code", "Created", "Action"
    ];

    const filters = ["Currently Enabled", "All"];

    return (
        <>
            <div className="relative bg-white font-sans min-h-screen w-full">
                {/* Sidebar Component - responsive for desktop, hidden/collapsible for mobile */}
                <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                    <Sidebar activePage="serviceability" />
                </div>
                {/* Responsive padding to avoid sidebar overlap on different screen sizes */}
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
                    {/* 1. TOP NAVBAR */}
                    <Header />

                    {/* 2. PAGE HEADER */}
                    <div className="px-3 sm:px-4 md:px-6 py-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 bg-white flex-shrink-0">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                            <h1 className="text-base font-bold text-slate-700 tracking-tight">Serviceability</h1>
                            <div className="flex items-center gap-2">
                                {filters.map((filter) => (
                                    <button
                                        key={filter}
                                        onClick={() => setActiveFilter(filter)}
                                        className={`px-4 py-1.5 text-[11px] font-semibold rounded-full border transition-all ${activeFilter === filter
                                                ? "bg-[#3b82f6] text-white border-[#3b82f6] shadow-sm"
                                                : "bg-white text-gray-400 border-gray-300 hover:border-blue-400"
                                            }`}
                                    >
                                        {filter}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#3b82f6] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-all shadow-sm w-full sm:w-auto justify-center"
                        >
                            <Plus size={18} />
                            Add New Location
                        </button>
                    </div>

                    {/* Search + Actions Row */}
                    <div className="px-3 sm:px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 bg-white">
                        <div className="relative w-full md:w-96">
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <Search size={18} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-1.5 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-6">
                            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer self-start md:self-auto">
                                Sale Order <ChevronDown size={14} />
                            </div>
                            <div className="relative cursor-pointer self-start md:self-auto">
                                <Bell size={20} className="text-gray-500" />
                                <span className="absolute -top-1 -right-1 bg-red-500 border-2 border-white w-2.5 h-2.5 rounded-full"></span>
                            </div>
                            <div className="flex items-center gap-3 border-l md:pl-6 border-gray-200 self-start md:self-auto mt-3 md:mt-0 pt-3 md:pt-0">
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-700 leading-none">Gautam ch</p>
                                    <p className="text-xs text-gray-400 mt-1">Store Admin</p>
                                </div>
                                <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
                                    <UserIcon className="text-gray-500" size={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. DATA TABLE AREA */}
                    <div className="flex-1 p-2 sm:p-4 md:p-6 overflow-auto">
                        <div className="border border-gray-200 rounded-lg overflow-x-auto overflow-y-visible shadow-sm bg-white">
                            <table className="min-w-full text-left border-collapse">
                                <thead className="bg-[#eef2ff]">
                                    <tr>
                                        {tableHeaders.map((header, index) => (
                                            <th
                                                key={index}
                                                className="px-2 xs:px-3 sm:px-6 py-3 sm:py-4 text-[12px] sm:text-[13px] font-semibold text-slate-600 truncate"
                                            >
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan={tableHeaders.length} className="h-[180px] xs:h-[250px] sm:h-[350px] md:h-[450px] bg-white"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* CREATE SHIPPING PROVIDER LOCATION MODAL (responsive) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] overflow-y-auto">
                    <div className="bg-white w-full max-w-[95vw] sm:max-w-[650px] md:max-w-[800px] lg:max-w-[850px] rounded-xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden mx-2 my-8">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-gray-200">
                            <h2 className="text-lg sm:text-xl font-bold text-[#334155]">Create Shipping Provider Location</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Body / Form */}
                        <div className="p-4 sm:p-6 md:p-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-12 gap-y-6 md:gap-y-8">
                                {/* Row 1 */}
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Shipping Provider <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-3 text-[13px] text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                            <option>Select an option</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Shipping Method <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-3 text-[13px] text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                                            <option>Select an option</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Pincode <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-3 text-[13px] text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500">
                                            <option>Enter Pincode</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Priority <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Priority"
                                        className="w-full bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-3 text-[13px] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Row 3 */}
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Routing Code <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select className="w-full appearance-none bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-3 text-[13px] text-gray-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500">
                                            <option>Select Scannable</option>
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 sm:mt-12 md:mt-16">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-full sm:w-auto px-10 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Reset
                                </button>
                                <button className="w-full sm:w-auto px-10 py-2.5 bg-[#3b82f6] rounded-lg text-sm font-semibold text-white hover:bg-blue-700 shadow-md transition-all">
                                    Sumbit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Responsive custom CSS for consistent sidebar padding */}
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
                @media (max-width: 500px) {
                    th, td { font-size: 11px !important; padding-left: 0.3rem !important; padding-right: 0.3rem !important; }
                }
            `}</style>
        </>
    );
};

export default ServiceabilityPage;