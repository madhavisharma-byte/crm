import React from 'react';
import { X, ChevronDown } from "lucide-react";

const AddVendorMappingModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Reusable label component for consistency
    const Label = ({ children, required }) => (
        <label className="text-sm font-semibold text-[#303d50] mb-2 block">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#303e67]">Add Vendor Item Mapping</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                        {/* Vendor Name */}
                        <div>
                            <Label required>Vendor Name</Label>
                            <div className="relative">
                                <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2b6cee] appearance-none cursor-pointer text-gray-400">
                                    <option value="">Enter Vendor Name</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </div>

                        {/* Vendor SKU Code */}
                        <div>
                            <Label required>Vendor SKU Code</Label>
                            <input
                                type="text"
                                placeholder="Enter Vendor SKU Code"
                                className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2b6cee] transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Vendor Unit Price */}
                        <div>
                            <Label required>Vendor Unit Price</Label>
                            <input
                                type="text"
                                placeholder="Enter Vendor Unit Price"
                                className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2b6cee] transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Item Type SKU Code */}
                        <div>
                            <Label required>Item Type SKU Code</Label>
                            <div className="relative">
                                <select className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2b6cee] appearance-none cursor-pointer text-gray-400">
                                    <option value="">Enter Item Type SKU Code</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 px-8 py-6 bg-white">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-8 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-md">
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddVendorMappingModal;