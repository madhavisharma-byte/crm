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

const TABLE_HEADERS = ["Facility Code", "Facility Name", "Report Month", "Created By", "Created At", "Status", "Action", "Generated At", "Available (ATP)"];

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
        <div className="flex gap-2 items-center">
            <input
                type="date"
                value={start}
                onChange={handleStart}
                className="w-full h-11 px-4 bg-[#f8fafc] border border-slate-200 rounded-lg text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="Start Date"
                max={end || undefined}
            />
            <span className="text-slate-400">to</span>
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
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-[#334155]">Create Ledger Report</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-5">
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
                        {/* If you want to show a textual range summary:
                        <div className="text-xs text-slate-400 mt-1">
                            {dateRange.start && dateRange.end
                                ? `${dateRange.start} to ${dateRange.end}`
                                : "Select a date range"}
                        </div>
                        */}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 flex justify-end gap-3">
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
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* Sidebar */}
            <Sidebar activePage="Products" />
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <DashboardHeader />

                {/* Page Toolbar */}
                <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-6">
                        <h1 className="text-lg font-bold text-slate-700">Inventory Ledger</h1>

                        <div className="flex items-center gap-2">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeTab === tab.id ? "bg-blue-600 border-blue-600 text-white" : "border-slate-300 text-slate-400"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-semibold transition-colors"
                    >
                        Create Report
                    </button>
                </div>

                {/* Table Header Row */}
                <div className="grid grid-cols-9 bg-[#eef4ff] px-6 py-3">
                    {TABLE_HEADERS.map((header) => (
                        <div key={header} className="text-[13px] font-semibold text-slate-600">{header}</div>
                    ))}
                </div>

                {/* Empty State Illustration */}
                <div className="flex-grow flex flex-col items-center justify-center py-32">
                    <div className="w-24 h-24 bg-blue-50 rounded-lg flex items-center justify-center border-b-4 border-orange-200 mb-4">
                        <div className="p-3 bg-white rounded shadow-sm border border-slate-100">
                            <Search className="w-10 h-10 text-slate-300" />
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
        </div>
    );
};

export default InventoryLedger;