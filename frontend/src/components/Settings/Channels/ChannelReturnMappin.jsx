import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Sidebar from '../../website/Sidebar';
import Header from '../../website/Header';

const ChannelReturnMapping = () => {
    const [activeFilter, setActiveFilter] = useState('RTO');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    const filters = ['RTO', 'CIR', 'ALL'];

    return (
        <div className="relative bg-white min-h-screen w-full flex flex-col lg:flex-row font-sans antialiased overflow-x-hidden">
            {/* Sidebar Responsive */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="settings" />
            </div>
            {/* Responsive main content layout */}
            <div
                className={`
                    flex flex-col min-h-screen flex-1 transition-all
                    lg:pl-80 pl-16
                    md:pl-48
                    sm:pl-16
                    bg-white
                `}
            >
                {/* Top Navbar */}
                <Header />

                {/* Page Header */}
                <div className="
                    px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b
                ">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                        <h1 className="font-bold text-slate-700 text-lg">
                            Channel Return Facility Mapping
                        </h1>
                        <div className="flex gap-2 sm:gap-3">
                            {filters.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-4 sm:px-5 py-1 text-xs font-bold rounded-full border transition-colors
                                        ${activeFilter === f
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'border-blue-400 text-blue-500 bg-white'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm hover:bg-blue-700 transition-colors w-fit self-end md:self-auto"
                    >
                        <Plus size={16} />
                        Add Return Mapping
                    </button>
                </div>

                {/* Table */}
                <main className="flex-1 px-2 sm:px-6 py-4 sm:py-6 overflow-auto w-full">
                    <div className="border rounded-lg overflow-x-auto bg-white shadow-sm">
                        <table className="w-full min-w-[560px]">
                            <thead className="bg-[#eef2ff]">
                                <tr>
                                    <TableHeader label="Channel Code" />
                                    <TableHeader label="Dispatch Facility" />
                                    <TableHeader label="Return Facility" />
                                    <TableHeader label="Return Type" />
                                    <TableHeader label="Action" />
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="h-[200px] sm:h-[400px]">
                                    <td colSpan="5" className="text-center text-gray-400 italic">
                                        No mapping data found.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            {/* MODAL */}
            {showModal && <ReturnMappingModal onClose={() => setShowModal(false)} />}

            {/* Responsive style compensation for main content on mobile/tablet */}
            <style>{`
                @media (max-width: 1023px) {
                    .lg\\:pl-80 { padding-left: 4rem !important; }
                }
                @media (max-width: 767px) {
                    .md\\:pl-48 { padding-left: 4rem !important; }
                    .sm\\:pl-16 { padding-left: 4rem !important; }
                }
                @media (max-width: 640px) {
                    .sm\\:pl-16 { padding-left: 0 !important; }
                }
            `}</style>
        </div>
    );
};

export default ChannelReturnMapping;

/* ---------- TABLE HEADER ---------- */
const TableHeader = ({ label }) => (
    <th className="px-2 sm:px-6 py-3 text-xs sm:text-sm font-semibold text-slate-600 border-r last:border-r-0 whitespace-nowrap">
        {label}
    </th>
);

/* ---------- MODAL ---------- */
const ReturnMappingModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-2">
            <div className="bg-white w-full max-w-full sm:max-w-xl md:max-w-2xl rounded-lg shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b">
                    <h2 className="text-base sm:text-lg font-semibold">Create Return Mapping</h2>
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition">
                        <X size={22} />
                    </button>
                </div>

                {/* Form */}
                <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <FormSelect label="Channel Code *" />
                    <FormSelect label="Dispatch Facility *" />
                    <FormSelect label="Return Facility *" />
                    <FormSelect label="Return Type *" />
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md text-sm"
                    >
                        Cancel
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
                        Connect Marketplace
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ---------- FORM SELECT ---------- */
const FormSelect = ({ label }) => (
    <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <select className="w-full border rounded-md px-3 py-2 text-sm text-gray-600">
            <option>Select Marketplace</option>
        </select>
    </div>
);
