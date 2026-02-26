import React, { useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

// --- Constants ---
const TABS = [
    { id: 'good', label: 'Good Inventory' },
    { id: 'bad', label: 'Bad Inventory' },
    { id: 'all', label: 'All' }
];

const TABLE_HEADERS = [
    "Facility Code",
    "Facility Name",
    "Report Month",
    "Created By",
    "Created At",
    "Status",
    "Action",
    "Generated At",
    "Available (ATP)"
];

// Date range picker - Minimal, inline for simplicity (no external deps)
function DateRangePicker({ value, onChange }) {
    const [start, setStart] = useState(value?.start || "");
    const [end, setEnd] = useState(value?.end || "");

    const handleStart = (e) => {
        setStart(e.target.value);
        if (onChange) onChange({ start: e.target.value, end });
    };

    const handleEnd = (e) => {
        setEnd(e.target.value);
        if (onChange) onChange({ start, end: e.target.value });
    };

    return (
        <div className="flex gap-2 items-center flex-col sm:flex-row">
            <input
                type="date"
                value={start}
                onChange={handleStart}
                className="w-full h-11 px-4 bg-[#f8fafc] border border-slate-200 rounded-lg text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Start Date"
                max={end || undefined}
            />
            <span className="text-slate-400 hidden sm:inline block">to</span>
            <span className="text-slate-400 block sm:hidden">to</span>
            <input
                type="date"
                value={end}
                onChange={handleEnd}
                className="w-full h-11 px-4 bg-[#f8fafc] border border-slate-200 rounded-lg text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="End Date"
                min={start || undefined}
            />
        </div>
    );
}

/**
 * Modal Component for Creating Ledger Report
 */
const CreateReportModal = ({ isOpen, onClose }) => {
    const [dateRange, setDateRange] = useState({ start: "", end: "" });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 mx-2">
                {/* Modal Header */}
                <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg sm:text-xl font-bold text-[#334155]">Create Ledger Report</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 sm:p-6 space-y-5">
                    {/* Report Name Field */}
                    <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-slate-700">
                            Report Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select className="w-full h-11 px-4 bg-[#f8fafc] border border-slate-200 rounded-lg text-slate-600 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                <option>Inventory Ledger</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Select Date Field - Now with Calendar */}
                    <div className="space-y-1.5">
                        <label className="text-[13px] font-bold text-slate-700">
                            Select Date <span className="text-red-500">*</span>
                        </label>
                        <DateRangePicker
                            value={dateRange}
                            onChange={setDateRange}
                        />
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-4 sm:px-6 py-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        className="px-6 py-2 bg-[#2563eb] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                    >
                        Create Report
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Main Page Component ---

const InventoryLedger = () => {
    const [activeTab, setActiveTab] = useState('good');
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="relative min-h-screen w-full bg-white font-sans antialiased">
            {/* Sidebar - responsive handling */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="Products" />
            </div>

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
                <DashboardHeader />

                {/* Responsive Sub-header & Actions */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 border-b border-slate-100 bg-white gap-3 md:gap-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                        <h1 className="text-base md:text-lg font-bold text-slate-700 whitespace-nowrap tracking-tight">
                            Inventory Ledger
                        </h1>
                        <div className="flex items-center gap-2">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={
                                        `px-4 py-1.5 rounded-full text-xs font-semibold border transition-all
                                        ${activeTab === tab.id
                                            ? "bg-blue-600 border-blue-600 text-white"
                                            : "border-slate-300 text-slate-400"
                                        }`
                                    }
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold transition-colors"
                        >
                            Create Report
                        </button>
                    </div>
                </div>

                {/* Table Header Row */}
                <div className="
                    hidden
                    min-w-[520px]
                    sm:min-w-[900px]
                    md:min-w-[1200px]
                    lg:min-w-[1400px]
                    border-collapse
                    md:grid
                    grid-cols-9
                    bg-[#eef4ff] px-4 md:px-6 py-3
                ">
                    {TABLE_HEADERS.map((header) => (
                        <div key={header} className="text-[13px] font-semibold text-slate-600 truncate">{header}</div>
                    ))}
                </div>
                {/* Responsive table header for mobile/small screens */}
                <div className="grid grid-cols-2 gap-2 md:hidden bg-[#eef4ff] px-4 py-3">
                    {TABLE_HEADERS.slice(0, 2).map((header) => (
                        <div key={header} className="text-[13px] font-semibold text-slate-600 truncate">
                            {header}
                        </div>
                    ))}
                </div>

                {/* Empty State Illustration */}
                <div className="flex-grow flex flex-col items-center justify-center py-12 sm:py-24 md:py-32">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 bg-blue-50 rounded-lg flex items-center justify-center border-b-4 border-orange-200 mb-4">
                        <div className="p-3 bg-white rounded shadow-sm border border-slate-100">
                            <Search className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300" />
                        </div>
                    </div>
                    <p className="text-slate-500 font-medium text-sm">No Data to Display</p>
                </div>

                {/* --- Modal Component --- */}
                <CreateReportModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
            {/* Responsive scrollbars & sidebar paddings */}
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

export default InventoryLedger;