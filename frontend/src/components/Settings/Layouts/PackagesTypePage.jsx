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
import Header from '../../website/Header'; // Importing the Header component

// Dummy dropdowns for options; in future, get from backend
const PACKAGE_TYPE_FOR_OPTIONS = [
    { value: '', label: 'Select Package Type For' },
    { value: 'salesOrder', label: 'Sales Order' },
    { value: 'purchaseOrder', label: 'Purchase Order' },
];
const CHANNEL_OPTIONS = [
    { value: '', label: 'Select Channel Name' },
    { value: 'amazon', label: 'Amazon' },
    { value: 'flipkart', label: 'Flipkart' },
];
const SCANNABLE_OPTIONS = [
    { value: '', label: 'Select Scannable' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
];
const PACKAGE_CODE_OPTIONS = [
    { value: '', label: 'Select Package Code' },
    { value: 'BOX1', label: 'BOX1' },
    { value: 'BOX2', label: 'BOX2' },
];
const DEFAULT_OPTIONS = [
    { value: '', label: 'Select Default' },
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
];

const initialForm = {
    packageTypeFor: '',     // e.g., salesOrder/purchaseOrder
    channelName: '',        // e.g., amazon
    scannable: '',          // yes/no
    packageName: '',        // text
    packageCode: '',        // code option
    boxWeight: '',          // grams, number (string for input binding)
    packingCost: '',        // currency, string
    dimensionLength: '',    // mm, number (string for input binding)
    dimensionWidth: '',     // mm, number (string for input binding)
    dimensionHeight: '',    // mm, number (string for input binding)
    default: '',            // yes/no
};

const PackagesTypePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState(initialForm);

    const tableHeaders = [
        "Name", "Code", "Channel", "Box Length", "Box Width",
        "Box Height", "Box Weight", "Packing Cost",
        "Scannable", "Default", "Enabled", "Action"
    ];

    // For future: handle submit, save form to backend, etc.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Future: Save form to backend API
        // console.log(form);
        setIsModalOpen(false);
        setForm(initialForm);
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-white overflow-hidden font-sans">
            <div className="w-full lg:w-auto">
                <Sidebar activePage="packages-types" />
            </div>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
                {/* 1. TOP NAVBAR */}
                <Header /> {/* Using imported Header component */}

                {/* 2. PAGE HEADER */}
                <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white flex-shrink-0 gap-4">
                    <h1 className="text-base font-bold text-slate-700 tracking-tight">Packages Type</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-all shadow-sm"
                    >
                        <Plus size={18} />
                        Add Package Type
                    </button>
                </div>

                {/* 3. DATA TABLE AREA */}
                <div className="flex-1 p-2 sm:p-4 lg:p-6 overflow-auto">
                    <div className="border border-gray-200 rounded-lg overflow-x-auto shadow-sm bg-white">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead className="bg-[#eef2ff]">
                                <tr>
                                    {tableHeaders.map((header, index) => (
                                        <th key={index} className="px-2 sm:px-4 py-4 text-[12px] sm:text-[13px] font-semibold text-slate-600 truncate">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan={tableHeaders.length} className="h-[300px] sm:h-[400px] md:h-[500px] text-center text-gray-400 text-xs sm:text-sm italic">
                                        No package types configured.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* ADD PACKAGE TYPE MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] px-2 sm:px-4">
                    <div className="bg-white w-full max-w-[98vw] sm:max-w-[95vw] md:max-w-[850px] rounded-xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-y-auto max-h-[95vh]">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-4 sm:px-8 py-5 border-b border-gray-200">
                            <h2 className="text-lg sm:text-xl font-bold text-[#334155]">Create New Package Type</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Body / Form */}
                        <form className="p-4 sm:p-8" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-12 gap-y-6">
                                {/* Row 1 */}
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Package Type For <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="packageTypeFor"
                                            className="w-full appearance-none bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={form.packageTypeFor}
                                            onChange={handleInputChange}
                                        >
                                            {PACKAGE_TYPE_FOR_OPTIONS.map(opt =>
                                                <option value={opt.value} key={opt.value}>{opt.label}</option>
                                            )}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Channel Name <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="channelName"
                                            className="w-full appearance-none bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={form.channelName}
                                            onChange={handleInputChange}
                                        >
                                            {CHANNEL_OPTIONS.map(opt =>
                                                <option value={opt.value} key={opt.value}>{opt.label}</option>
                                            )}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Scannable <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="scannable"
                                            className="w-full appearance-none bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={form.scannable}
                                            onChange={handleInputChange}
                                        >
                                            {SCANNABLE_OPTIONS.map(opt =>
                                                <option value={opt.value} key={opt.value}>{opt.label}</option>
                                            )}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Package Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="packageName"
                                        value={form.packageName}
                                        onChange={handleInputChange}
                                        placeholder="Enter Package Name"
                                        className="w-full bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Row 3 */}
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Package Code <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="packageCode"
                                            className="w-full appearance-none bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={form.packageCode}
                                            onChange={handleInputChange}
                                        >
                                            {PACKAGE_CODE_OPTIONS.map(opt =>
                                                <option value={opt.value} key={opt.value}>{opt.label}</option>
                                            )}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Box Weight ( in gm) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="boxWeight"
                                        value={form.boxWeight}
                                        onChange={handleInputChange}
                                        placeholder="Enter Box Weight"
                                        className="w-full bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Row 4 */}
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Packing Cost <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        name="packingCost"
                                        value={form.packingCost}
                                        onChange={handleInputChange}
                                        placeholder="Enter Packing Cost"
                                        className="w-full bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Dimension (mm) <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 xs:gap-4">
                                        <input
                                            type="number"
                                            name="dimensionLength"
                                            value={form.dimensionLength}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            className="w-full bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-2.5 text-center text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                        <span className="font-bold text-gray-700 hidden xs:inline">X</span>
                                        <input
                                            type="number"
                                            name="dimensionWidth"
                                            value={form.dimensionWidth}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            className="w-full bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-2.5 text-center text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                        <span className="font-bold text-gray-700 hidden xs:inline">X</span>
                                        <input
                                            type="number"
                                            name="dimensionHeight"
                                            value={form.dimensionHeight}
                                            onChange={handleInputChange}
                                            placeholder="0"
                                            className="w-full bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-2.5 text-center text-[13px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Row 5 */}
                                <div className="space-y-2">
                                    <label className="block text-[13px] font-bold text-gray-700">
                                        Default <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="default"
                                            className="w-full appearance-none bg-[#f8fafc] border border-gray-300 rounded-lg px-4 py-2.5 text-[13px] text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={form.default}
                                            onChange={handleInputChange}
                                        >
                                            {DEFAULT_OPTIONS.map(opt =>
                                                <option value={opt.value} key={opt.value}>{opt.label}</option>
                                            )}
                                        </select>
                                        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"/>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer Buttons */}
                            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-8 sm:mt-12">
                                <button
                                    type="button"
                                    onClick={() => { setIsModalOpen(false); setForm(initialForm); }}
                                    className="px-8 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-2.5 bg-[#2563eb] rounded-lg text-sm font-semibold text-white hover:bg-blue-700 shadow-md transition-all"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PackagesTypePage;