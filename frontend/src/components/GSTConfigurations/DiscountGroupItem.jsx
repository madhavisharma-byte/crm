"use client";
import React, { useState } from "react";
import { Search, Plus, Upload, Download, ChevronRight, ChevronDown } from "lucide-react";
import Sidebar from "../website/Sidebar";
import DashboardHeader from "../website/Header";

/* =======================
   CONSTANT DATA
======================= */
const FILTER_TABS = ["All"];
const FORM_TABS = ["Summary", "Category Level", "SKU Level", "Activity Details"];

const TABLE_COLUMNS = [
    "Discount Group Code",
    "Discount Group Item Code",
    "Entity Type",
    "Entity Code",
    "Discount Percentage",
    "Created",
    "Enabled",
    "Updated",
];

export default function DiscountGroupManagement() {
    // 'list' for the table view, 'form' for the Add Discount Group view
    const [view, setView] = useState("list");
    const [activeTab] = useState("All");
    const [activeFormTab, setActiveFormTab] = useState("Summary");

    return (
        <div className="relative min-h-screen bg-white font-sans antialiased w-full">
            {/* Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="GST Configurations" />
            </div>

            <div className={`flex flex-col min-h-screen transition-all lg:pl-80 pl-16 md:pl-48 sm:pl-16 w-full`}>
                <DashboardHeader />

                {/* --- VIEW 1: LIST PAGE --- */}
                {view === "list" && (
                    <>
                        {/* Sub-header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 border-b border-gray-100 bg-white gap-3 md:gap-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                                <h1 className="text-base md:text-[16px] font-bold text-[#303e67] whitespace-nowrap">
                                    Discount Group Item
                                </h1>
                                <div className="flex gap-2 sm:gap-3 flex-wrap">
                                    {FILTER_TABS.map((tab) => (
                                        <button
                                            key={tab}
                                            className="px-4 sm:px-5 py-1 sm:py-1.5 rounded-full text-xs font-semibold bg-[#2b6cee] text-white border border-[#2b6cee]"
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2 sm:gap-3 items-center flex-wrap">
                                <button
                                    onClick={() => setView("form")}
                                    className="flex items-center gap-2 bg-[#2b6cee] text-white px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm"
                                >
                                    <Plus size={16} />
                                    <span>Add Discount Group</span>
                                </button>
                                <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg border border-transparent hover:bg-blue-100 transition-colors">
                                    <Upload size={18} />
                                </button>
                                <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg border border-transparent hover:bg-blue-100 transition-colors">
                                    <Download size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Table area */}
                        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-full xl:max-w-[1600px]">
                            <div className="overflow-x-auto custom-scrollbar">
                                <table className="w-full text-left min-w-[1000px] md:min-w-[1400px]">
                                    <thead>
                                        <tr className="bg-[#e9f0fe]">
                                            {TABLE_COLUMNS.map((header, idx) => (
                                                <th key={idx} className="px-4 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan={TABLE_COLUMNS.length} className="py-20 md:py-40">
                                                <div className="flex flex-col items-center justify-center text-center">
                                                    <div className="relative w-32 h-32 mb-6">
                                                        <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                                                            <div className="w-16 h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center">
                                                                <Search className="text-[#2b6cee]" size={24} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="text-[14px] text-gray-500 font-medium">No Data to Display</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </main>
                    </>
                )}

                {/* --- VIEW 2: ADD/FORM PAGE --- */}
                {view === "form" && (
                    <div className="flex flex-col flex-1 bg-[#fcfcfd]">
                        {/* Form Breadcrumbs & Navigation */}
                        <div className="flex flex-wrap items-center px-4 md:px-6 py-4 border-b border-gray-100 bg-white gap-4">
                            <div className="flex items-center text-sm font-medium">
                                <span
                                    className="text-gray-400 cursor-pointer hover:text-[#2b6cee]"
                                    onClick={() => setView("list")}
                                >
                                    Discount Groups
                                </span>
                                <ChevronRight size={16} className="text-gray-400 mx-1" />
                                <span className="text-[#303e67]">Discount Group Details</span>
                            </div>

                            <div className="flex gap-2 ml-auto md:ml-4 overflow-x-auto no-scrollbar py-1">
                                {FORM_TABS.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveFormTab(tab)}
                                        className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-all ${activeFormTab === tab
                                                ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                                                : "text-gray-500 border-gray-300 bg-white hover:bg-gray-50"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <main className="flex-1 p-4 md:p-8 space-y-10 max-w-7xl">
                            {/* General Details Section */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-6 bg-[#2b6cee] rounded-full"></div>
                                    <h2 className="text-lg font-bold text-[#303e67]">General Details</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-4xl">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[12px] font-bold text-[#4a5568]">
                                            Discount Group Code <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Discount Group Code"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#2b6cee] focus:border-[#2b6cee] outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[12px] font-bold text-[#4a5568]">Discount Group Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Discount Group Name"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#2b6cee] focus:border-[#2b6cee] outline-none"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[12px] font-bold text-[#4a5568]">Enable Unship Tracking</label>
                                        <div className="relative">
                                            <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm appearance-none bg-white text-gray-500 outline-none">
                                                <option>Select Enable Unship Tracking</option>
                                            </select>
                                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Catalogue Level Discount Section */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-6 bg-[#2b6cee] rounded-full"></div>
                                    <h2 className="text-lg font-bold text-[#303e67]">Catalogue Level Discount</h2>
                                </div>

                                <div className="flex max-w-3xl border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                                    {/* Left Enabled Column */}
                                    <div className="w-32 md:w-48 bg-gray-50/50 border-r border-gray-200 p-6 flex flex-col items-center justify-center gap-2">
                                        <span className="text-[13px] font-medium text-gray-400">Enabled</span>
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 accent-[#2b6cee] cursor-pointer rounded"
                                        />
                                    </div>
                                    {/* Right Input Column */}
                                    <div className="flex-1 p-6 md:p-8">
                                        <label className="text-[12px] font-bold text-[#4a5568] mb-2 block">Discount Percentage</label>
                                        <input
                                            type="number"
                                            defaultValue="0"
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-1 focus:ring-[#2b6cee] focus:border-[#2b6cee] outline-none"
                                        />
                                    </div>
                                </div>
                            </section>
                        </main>

                        {/* Sticky Bottom Actions */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 flex justify-end gap-3 px-6 md:px-10">
                            <button
                                onClick={() => setView("list")}
                                className="px-8 py-2 border border-gray-300 text-gray-600 rounded-lg text-[13px] font-bold hover:bg-gray-50 transition-colors"
                            >
                                Reset
                            </button>
                            <button className="px-8 py-2 bg-[#2b6cee] text-white rounded-lg text-[13px] font-bold hover:bg-[#1e5bc7] transition-all shadow-md">
                                Save Details
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @media (max-width: 1023px) {
            .lg\\:pl-80 { padding-left: 4rem !important; }
        }
        @media (max-width: 767px) {
            .md\\:pl-48 { padding-left: 4rem !important; }
            .sm\\:pl-16 { padding-left: 4rem !important; }
        }
      `}</style>
        </div>
    );
}