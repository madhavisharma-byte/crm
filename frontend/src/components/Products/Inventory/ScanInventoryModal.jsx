import React from 'react';
import { X, ChevronDown } from 'lucide-react';

const ScanInventoryModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Reusable label component for consistency
    const Label = ({ children, required }) => (
        <label className="block text-[13px] md:text-[14px] font-semibold text-slate-700 mb-2 uppercase tracking-tight">
            {children} {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-2 md:p-4">
            <div
                className="
                    bg-white w-full
                    max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl
                    rounded-xl shadow-2xl overflow-hidden
                    animate-in fade-in zoom-in duration-200
                    flex flex-col
                    max-h-[96vh]
                "
                style={{
                    // Ensures modal doesn't overflow on very large screens and handles responsiveness
                    width: '100%',
                }}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-slate-100 bg-white">
                    <h2 className="text-lg md:text-xl font-bold text-[#303e67]">Scan Inventory</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                        aria-label="Close"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto px-3 py-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-12 gap-y-6 md:gap-y-8">
                        {/* Inventory Type */}
                        <div>
                            <Label required>Inventory Type</Label>
                            <div className="relative group">
                                <select className="w-full px-3 md:px-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm md:text-base outline-none appearance-none cursor-pointer text-slate-400 focus:border-[#2b6cee] transition-all">
                                    <option value="" disabled selected>
                                        Select Inventory Type
                                    </option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-[#2b6cee]" size={18} />
                            </div>
                        </div>
                        {/* Shelf Code */}
                        <div>
                            <Label required>Shelf Code</Label>
                            <div className="relative group">
                                <select className="w-full px-3 md:px-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm md:text-base outline-none appearance-none cursor-pointer text-slate-600 focus:border-[#2b6cee] transition-all">
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
                                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-3 md:px-4 py-2.5 text-sm md:text-base outline-none focus:border-[#2b6cee] transition-all placeholder:text-slate-400 text-slate-600"
                            />
                        </div>
                        {/* Remarks */}
                        <div>
                            <Label>Remarks</Label>
                            <input
                                type="text"
                                placeholder="Enter Remarks"
                                className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-3 md:px-4 py-2.5 text-sm md:text-base outline-none focus:border-[#2b6cee] transition-all placeholder:text-slate-400 text-slate-600"
                            />
                        </div>
                    </div>
                    {/* Success Count Text */}
                    <div className="mt-6 md:mt-8">
                        <p className="text-sm md:text-base font-semibold text-[#303d50]">
                            No. Of Items Successfully Scanned - 0
                        </p>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end px-4 md:px-8 py-4 md:py-6 bg-white">
                    <button
                        onClick={onClose}
                        className="px-7 md:px-10 py-2 bg-[#2b6cee] text-white rounded-lg text-sm md:text-base font-bold shadow-md hover:bg-[#1e5bc7] transition-all active:scale-95"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScanInventoryModal;