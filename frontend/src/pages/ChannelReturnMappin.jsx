import React, { useState } from 'react';
import { Search, Plus, Bell, ChevronDown, User, X } from 'lucide-react';
import Sidebar from '../components/website/Sidebar';

const ChannelReturnMapping = () => {
    const [activeFilter, setActiveFilter] = useState('RTO');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);

    const filters = ['RTO', 'CIR', 'ALL'];

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            <Sidebar activePage="settings" />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Navbar */}
                <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-[#f8fafc]">
                    <div className="relative w-96">
                        <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                        <input
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-1.5 border rounded-md text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                            Sale Order <ChevronDown size={14} />
                        </div>
                        <Bell size={20} className="text-gray-500" />

                        <div className="flex items-center gap-3 border-l pl-6">
                            <div className="text-right">
                                <p className="text-sm font-semibold">Gautam ch</p>
                                <p className="text-xs text-gray-400">Store Admin</p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
                                <User size={18} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Header */}
                <div className="p-4 flex items-center justify-between border-b">
                    <div className="flex items-center gap-6">
                        <h1 className="font-bold text-slate-700">
                            Channel Return Facility Mapping
                        </h1>

                        <div className="flex gap-3">
                            {filters.map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setActiveFilter(f)}
                                    className={`px-5 py-1 text-xs font-bold rounded-full border ${activeFilter === f
                                            ? 'bg-blue-600 text-white'
                                            : 'border-blue-400 text-blue-500'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-1.5 rounded-md flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Add Return Mapping
                    </button>
                </div>

                {/* Table */}
                <main className="flex-1 p-6 overflow-auto">
                    <div className="border rounded-lg">
                        <table className="w-full">
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
                                <tr className="h-[400px]">
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
        </div>
    );
};

export default ChannelReturnMapping;

/* ---------- TABLE HEADER ---------- */
const TableHeader = ({ label }) => (
    <th className="px-6 py-3 text-sm font-semibold text-slate-600 border-r last:border-r-0">
        {label}
    </th>
);

/* ---------- MODAL ---------- */
const ReturnMappingModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white w-[720px] rounded-lg shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold">Create Return Mapping</h2>
                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 grid grid-cols-2 gap-6">
                    <FormSelect label="Channel Code *" />
                    <FormSelect label="Dispatch Facility *" />
                    <FormSelect label="Return Facility *" />
                    <FormSelect label="Return Type *" />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-6 py-4 border-t">
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <select className="w-full border rounded-md px-3 py-2 text-sm text-gray-600">
            <option>Select Marketplace</option>
        </select>
    </div>
);
