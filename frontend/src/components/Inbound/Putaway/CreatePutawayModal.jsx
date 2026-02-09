import React from 'react';
import { X, ChevronDown } from 'lucide-react';

const CreatePutawayModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#303e67]">Create Putaway</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#303d50]">
                            Putaway Type <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <select className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2b6cee] appearance-none cursor-pointer text-gray-500 transition-all">
                                <option value="">Select</option>
                                <option value="standard">Standard Putaway</option>
                                <option value="express">Express Putaway</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-8 py-6 border-t border-gray-50">
                    <button
                        onClick={onClose}
                        className="px-8 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Reset
                    </button>
                    <button className="px-8 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-md">
                        Create Putaway
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePutawayModal;