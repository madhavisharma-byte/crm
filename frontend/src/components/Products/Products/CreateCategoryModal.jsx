import React from 'react';
import { X, ChevronDown } from 'lucide-react';

const CreateCategoryModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Reusable Form Label Component
    const Label = ({ children, required }) => (
        <label className="block text-[13px] md:text-[14px] font-semibold text-[#303d50] mb-2 uppercase tracking-tight">
            {children} {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
    );

    // Reusable Input Field Component
    const InputField = ({ placeholder }) => (
        <input
            type="text"
            placeholder={placeholder}
            className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 md:px-4 py-2.5 text-sm md:text-base outline-none focus:border-[#2b6cee] transition-all placeholder:text-slate-400 text-slate-600"
        />
    );

    // Reusable Select Field Component
    const SelectField = ({ placeholder }) => (
        <div className="relative group">
            <select className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg px-3 md:px-4 py-2.5 text-sm md:text-base outline-none appearance-none cursor-pointer text-slate-400 focus:border-[#2b6cee] transition-all">
                <option value="" disabled selected>{placeholder}</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-[#2b6cee]" size={18} />
        </div>
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
                    width: '100%',
                }}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-gray-100 bg-white">
                    <h2 className="text-lg md:text-xl font-bold text-[#303e67]">Create Category</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto px-3 py-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-12 gap-y-6 md:gap-y-8">

                        {/* Row 1 */}
                        <div>
                            <Label required>Name</Label>
                            <InputField placeholder="Enter Name" />
                        </div>
                        <div>
                            <Label required>Code</Label>
                            <InputField placeholder="Enter Code" />
                        </div>

                        {/* Row 2 */}
                        <div>
                            <Label required>GST Tax Type Code</Label>
                            <SelectField placeholder="Select GST Tax Type Code" />
                        </div>
                        <div>
                            <Label>Tax Type Code</Label>
                            <SelectField placeholder="Select Tax type Code" />
                        </div>

                        {/* Row 3 */}
                        <div className="md:col-span-1">
                            <Label>Item Detail Fields</Label>
                            <InputField placeholder="Enter Item Detail Fields" />
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-2 md:gap-3 px-4 md:px-8 py-4 md:py-6 bg-white">
                    <button
                        type="button"
                        className="px-6 md:px-8 py-2 border border-gray-200 rounded-lg text-sm md:text-base font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        className="px-6 md:px-8 py-2 bg-[#2b6cee] text-white rounded-lg text-sm md:text-base font-semibold hover:bg-[#1e5bc7] transition-all shadow-md active:scale-95"
                    >
                        Connect Category
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateCategoryModal;