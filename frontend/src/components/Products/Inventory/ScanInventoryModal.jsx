import React from 'react';
import { X, ChevronDown } from 'lucide-react';

const ScanInventoryModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Reusable label component for consistency
    const Label = ({ children, required }) => (
        <label className="block text-[13px] font-semibold text-slate-700 mb-2">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-[#303e67]">Scan Inventory</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                        {/* Inventory Type */}
                        <div>
                            <Label required>Inventory Type</Label>
                            <div className="relative group">
                                <select className="w-full px-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm outline-none appearance-none cursor-pointer text-slate-400 focus:border-[#2b6cee] transition-all">
                                    <option value="" disabled selected>Select Inventory Type</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-[#2b6cee]" size={18} />
                            </div>
                        </div>

                        {/* Shelf Code */}
                        <div>
                            <Label required>Shelf Code</Label>
                            <div className="relative group">
                                <select className="w-full px-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm outline-none appearance-none cursor-pointer text-slate-600 focus:border-[#2b6cee] transition-all">
                                    <option value="DEFAULT">DEFAULT</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-[#2b6cee]" size={18} />
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <Label required>Quantity</Label>
                            <input
                                type="text"
                                placeholder="Enter Quantity"
                                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2b6cee] transition-all placeholder:text-slate-400 text-slate-600"
                            />
                        </div>

                        {/* Remarks */}
                        <div>
                            <Label>Remarks</Label>
                            <input
                                type="text"
                                placeholder="Enter Remarks"
                                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2b6cee] transition-all placeholder:text-slate-400 text-slate-600"
                            />
                        </div>

                    </div>

                    {/* Success Count Text */}
                    <div className="mt-8">
                        <p className="text-sm font-semibold text-[#303d50]">
                            No. Of Items Successfully Scanned - 0
                        </p>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end px-8 py-6 bg-white">
                    <button
                        onClick={onClose}
                        className="px-10 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#1e5bc7] transition-all active:scale-95"
                    >
                        Done
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ScanInventoryModal;