import React from 'react';
import { X, ChevronDown } from 'lucide-react';

const CreateReturnModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Reusable Form Label Component
    const Label = ({ children, required }) => (
        <label className="block text-sm font-semibold text-[#303d50] mb-2">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );

    // Reusable Input Field Component
    const InputField = ({ placeholder }) => (
        <input
            type="text"
            placeholder={placeholder}
            className="w-full px-4 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2b6cee] transition-all placeholder:text-[#94a3b8]"
        />
    );

    // Reusable Select Dropdown Component
    const SelectField = ({ placeholder }) => (
        <div className="relative group">
            <select className="w-full px-4 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-lg text-sm outline-none appearance-none cursor-pointer text-[#94a3b8] focus:border-[#2b6cee] transition-all">
                <option value="" disabled selected>{placeholder}</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-[#2b6cee]" size={18} />
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#303e67]">Create Return</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Modal Body / Grid Layout */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                        {/* Row 1 */}
                        <div>
                            <Label required>Customer Code</Label>
                            <SelectField placeholder="Enter Customer Code" />
                        </div>
                        <div>
                            <Label required>Return Reason</Label>
                            <InputField placeholder="Enter Return Reason" />
                        </div>

                        {/* Row 2 */}
                        <div>
                            <Label>Reference Code</Label>
                            <InputField placeholder="Enter Reference Code" />
                        </div>
                        <div>
                            <Label>Channel Code</Label>
                            <SelectField placeholder="Select Channel Code" />
                        </div>

                        {/* Row 3 */}
                        <div>
                            <Label>Sale Order Code</Label>
                            <InputField placeholder="Select Sale Order Code" />
                        </div>
                        <div>
                            <Label>Invoice Code</Label>
                            <InputField placeholder="Select Invoice Code" />
                        </div>

                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 px-8 py-6 mt-12">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-8 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        className="px-10 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-md active:scale-95"
                    >
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CreateReturnModal;