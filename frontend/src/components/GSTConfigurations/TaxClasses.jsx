"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import Sidebar from "../(website)/Sidebar";
import DashboardHeader from "../(website)/header";
import AddTaxClassModal from "./GSTAddTaxClassModal";
import AddNonGstTaxClassModal from "./NGSTAddTaxClassModal";

/* =======================
   CONSTANT DATA
======================= */
const FILTER_TABS = ["Non GST", "GST"];

const TABLE_COLUMNS = [
    "Tax class Name",
    "Tax Class Code",
    "Calculated On",
    "Tax Type",
    "Created On",
    "Last Updated on",
];

export default function TaxClasses() {
    const [activeTab, setActiveTab] = useState("Non GST");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showGstModal, setShowGstModal] = useState(false);
    const [showNonGstModal, setShowNonGstModal] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        if (!showDropdown) return;
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDropdown]);

    // Handler for Add Tax Class button
    const handleAddTaxClassClick = () => {
        setShowDropdown((v) => !v);
    };

    // Handler when selecting GST/NON GST from the dropdown
    const handleDropdownSelect = (type) => {
        setShowDropdown(false);
        if (type === "GST") {
            setShowGstModal(true);
        } else if (type === "Non GST") {
            setShowNonGstModal(true);
        }
    };

    // Handlers to close modals
    const closeGstModal = () => setShowGstModal(false);
    const closeNonGstModal = () => setShowNonGstModal(false);

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* Sidebar same as ReversePickup */}
            <Sidebar activePage="GST Configurations" />
            <div className="flex-1 flex flex-col min-w-0">
                <DashboardHeader />

                {/* Sub-header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-6">
                        <h1 className="text-[16px] font-bold text-[#303e67] whitespace-nowrap">
                            Tax Classes
                        </h1>
                        <div className="flex gap-3">
                            {FILTER_TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                                        activeTab === tab
                                            ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                                            : "text-gray-400 border-gray-300 hover:border-gray-400"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Button dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            className="flex items-center gap-2 bg-[#2b6cee] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm"
                            onClick={handleAddTaxClassClick}
                        >
                            <Plus size={16} />
                            Add Tax Class
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 z-50 animate-in fade-in duration-100">
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-[#f3f6ff] text-[#303e67] text-sm font-medium rounded-t-lg"
                                    onClick={() => handleDropdownSelect("GST")}
                                >
                                    GST
                                </button>
                                <button
                                    className="w-full text-left px-4 py-2 hover:bg-[#f3f6ff] text-[#303e67] text-sm font-medium rounded-b-lg"
                                    onClick={() => handleDropdownSelect("Non GST")}
                                >
                                    Non GST
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Table area: same width/height as ReversePickup */}
                <main className="flex-1 p-8 max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[1400px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-6 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State Body */}
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length} className="py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-32 h-32 mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                                                    <div className="w-16 h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center">
                                                        <Search className="text-[#2b6cee]" size={28} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[14px] text-gray-500 font-medium tracking-tight">
                                                No Data to Display
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
                {/* Render the corresponding modals */}
                {showGstModal && <AddTaxClassModal isOpen={showGstModal} onClose={closeGstModal} />}
                {showNonGstModal && <AddNonGstTaxClassModal isOpen={showNonGstModal} onClose={closeNonGstModal} />}
            </div>
        </div>
    );
}