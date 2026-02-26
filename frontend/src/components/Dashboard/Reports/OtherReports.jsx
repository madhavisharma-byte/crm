"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */

const EXPORT_TYPES = [
    "Additional Scan Identifiers",
    "Available AWB",
    "B2B Order Item Batch Details",
    "B2B Picklist Export",
    "B2B Sale Orders",
    "Back Orders",
    "Additional Scan Identifiers",
    "Available AWB",
    "B2B Order Item Batch Details",
    "B2B Picklist Export",
    "B2B Sale Orders",
    "Back Orders",
];

const EMPTY_STATE_IMG =
    "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-28 md:py-32 w-full">
        <div className="relative w-32 h-32 mb-6">
            <img
                src={EMPTY_STATE_IMG}
                alt="No data"
                className="w-full h-full object-contain opacity-60 grayscale"
            />
        </div>
        <p className="text-[14px] text-gray-900 font-medium">No records to show</p>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function OtherReportsPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const dropdownRef = useRef(null);

    // Simulate data (empty by default)
    const [data, setData] = useState(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative bg-[#F8FAFC] min-h-screen w-full font-sans antialiased">
            {/* Fixed Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar />
            </div>
            {/* Responsive Content Layout */}
            <div
                className={`
                    flex flex-col min-h-screen
                    transition-all
                    lg:pl-80 pl-16
                    md:pl-48
                    sm:pl-16
                    bg-[#F8FAFC]
                `}
            >
                <DashboardHeader />

                {/* Page Sub-Header */}
                <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
                    <h1 className="text-[15px] md:text-[16px] font-bold text-[#303e67]">
                        Export Configurations
                    </h1>
                </div>

                {/* Responsive/Scrollable main content */}
                <main
                    className="
                        p-2 sm:p-4 md:p-6 space-y-4 md:space-y-8 flex-1 min-h-0
                        overflow-y-auto custom-scrollbar
                        w-full
                    "
                    style={{
                        maxHeight: "calc(100vh - 64px)"
                    }}
                >
                    {/* Configuration Card */}
                    <div className="bg-white border border-[#dfdfe2] rounded-xl shadow-sm max-w-full sm:max-w-[700px] md:max-w-[900px] xl:max-w-[1200px] mx-auto">
                        <div className="px-4 py-3 border-b border-[#dfdfe2] flex items-center">
                            <h2 className="text-[16px] md:text-[18px] font-semibold text-[#303d50] uppercase tracking-tight">
                                Choose Export Type
                            </h2>
                        </div>

                        <div className="p-4 md:p-6">
                            {/* Custom Dropdown Container */}
                            <div className="relative w-full max-w-[450px]" ref={dropdownRef}>
                                <label className="text-[12px] md:text-[13px] text-[#2b6cee] font-medium block mb-1">
                                    Export type
                                </label>

                                {/* Select Trigger */}
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center justify-between border-b-2 border-[#2b6cee] pb-1 cursor-pointer group"
                                >
                                    <span
                                        className={`text-[15px] ${selectedType ? "text-black" : "text-gray-400"}`}
                                    >
                                        {selectedType || "Select Export Type"}
                                    </span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-[#2b6cee] transition-transform ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </div>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div className="absolute left-0 right-0 mt-1 bg-white shadow-xl border border-gray-200 rounded-sm z-50 max-h-[280px] overflow-y-auto custom-scrollbar">
                                        {EXPORT_TYPES.map((type, idx) => (
                                            <div
                                                key={type + idx}
                                                onClick={() => {
                                                    setSelectedType(type);
                                                    setIsOpen(false);
                                                }}
                                                className={`px-4 py-3 text-[14px] cursor-pointer transition-colors hover:bg-gray-100 ${selectedType === type ? "bg-gray-50 font-medium text-[#2b6cee]" : "text-gray-700"
                                                    }`}
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Only show EmptyState if there is no data */}
                    {!data || (Array.isArray(data) && data.length === 0) ? (
                        <EmptyState />
                    ) : (
                        // Render table/list/etc here if data exists, for example:
                        <div className="p-8 bg-gray-50 rounded">
                            {"Data available. (Replace with real export records table)"}
                        </div>
                    )}
                </main>
            </div>

            {/* Responsive Scrollbar + Sidebar Padding Styles */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }
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