"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/header";

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

const EMPTY_STATE_IMG = "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center mt-32 w-full">
        <div className="w-32 h-32 mb-4 overflow-hidden rounded-lg">
            <img
                src={EMPTY_STATE_IMG}
                alt="No data"
                className="object-cover w-full h-full opacity-40 grayscale"
            />
        </div>
        <p className="text-[14px] text-gray-500 font-medium tracking-tight">
            No records to show
        </p>
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
    const [data, setData] = useState(null); // or [] for list

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

    // Optional: Uncomment to simulate loaded data for testing (remove this block in production)
    // useEffect(() => {
    //     setTimeout(() => setData([{ id: 1, name: "Example Record" }]), 2000);
    // }, []);

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader />

                {/* Page Sub-Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-3">
                    <h1 className="text-[16px] font-bold text-[#303e67]">
                        Export Configurations
                    </h1>
                </div>

                <main className="flex-1 p-6 space-y-6">
                    {/* Configuration Card */}
                    <div className="bg-white border border-[#dfdfe2] rounded-sm shadow-sm max-w-[1600px]">
                        <div className="px-4 py-3 border-b border-[#dfdfe2]">
                            <h2 className="text-[18px] font-semibold text-[#303d50] uppercase tracking-tight">
                                Choose Export Type
                            </h2>
                        </div>

                        <div className="p-6">
                            {/* Custom Dropdown Container */}
                            <div className="relative w-full max-w-[450px]" ref={dropdownRef}>
                                <label className="text-[13px] text-[#2b6cee] font-medium block mb-1">
                                    Export type
                                </label>

                                {/* Select Trigger */}
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="flex items-center justify-between border-b-2 border-[#2b6cee] pb-1 cursor-pointer group"
                                >
                                    <span className={`text-[15px] ${selectedType ? "text-black" : "text-gray-400"}`}>
                                        {selectedType || "Select Export Type"}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-[#2b6cee] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                                </div>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div className="absolute left-0 right-0 mt-1 bg-white shadow-xl border border-gray-200 rounded-sm z-50 max-h-[280px] overflow-y-auto custom-scrollbar">
                                        {EXPORT_TYPES.map((type) => (
                                            <div
                                                key={type}
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
                        <div className="p-8 bg-gray-50 rounded">{"Data available. (Replace with real export records table)"}</div>
                    )}
                </main>
            </div>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
        </div>
    );
}