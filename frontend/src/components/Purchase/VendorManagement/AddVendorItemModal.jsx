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
            <div
                className={`
                    bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200
                    sm:max-w-lg
                    xs:max-w-full xs:mx-2
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100
                    xs:px-3 xs:py-3
                ">
                    <h2 className="text-xl font-bold text-[#303e67] xs:text-lg">Add Vendor Item Mapping</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-8 xs:p-3 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 xs:gap-x-0 xs:gap-y-4 sm:gap-x-6 sm:gap-y-5">

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
                <div className="flex justify-end gap-3 px-8 py-6 bg-white xs:px-3 xs:py-4 sm:px-6 sm:py-4">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors xs:px-4 xs:py-2"
                    >
                        Cancel
                    </button>
                    <button className="px-8 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-md xs:px-4 xs:py-2">
                        Submit
                    </button>
                </div>
            </div>
            {/* Style overrides for mobile responsiveness */}
            <style>{`
                @media (max-width: 640px) {
                    .xs\\:max-w-full { max-width: 100% !important; }
                    .xs\\:mx-2 { margin-left: 0.5rem !important; margin-right: 0.5rem !important; }
                    .xs\\:px-3 { padding-left: 0.75rem !important; padding-right: 0.75rem !important; }
                    .xs\\:py-3 { padding-top: 0.75rem !important; padding-bottom: 0.75rem !important; }
                    .xs\\:py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
                    .xs\\:p-3 { padding: 0.75rem !important; }
                    .xs\\:text-lg { font-size: 1.125rem !important; }
                    .xs\\:px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
                }
                @media (max-width: 768px) {
                    .sm\\:max-w-lg { max-width: 32rem !important; }
                    .sm\\:px-6 { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
                    .sm\\:py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
                    .sm\\:p-6 { padding: 1.5rem !important; }
                }
            `}</style>
        </div>
    );
};

export default AddVendorMappingModal;