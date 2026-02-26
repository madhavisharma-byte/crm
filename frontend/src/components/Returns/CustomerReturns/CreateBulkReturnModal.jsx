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
            <div
                className={`
                    bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200
                    sm:max-w-lg xs:max-w-xs
                `}
                style={{
                    // Make modal take nearly full width on xs/small screens while staying max-w-4xl on large
                    width: '100%',
                    maxWidth: '40rem',
                }}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#303e67]">
                        Create Return
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Modal Body / Grid Layout */}
                <div className="p-8 md:p-8 sm:p-6 xs:p-4">
                    <div
                        className={`
                            grid grid-cols-1
                            md:grid-cols-2
                            gap-x-12 md:gap-x-12
                            gap-y-8 md:gap-y-8
                            sm:gap-x-6 sm:gap-y-6
                            xs:gap-x-2 xs:gap-y-4
                        `}
                    >
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
                <div
                    className={`
                        flex justify-end gap-3
                        px-8 md:px-8 sm:px-6 xs:px-4
                        py-6 md:py-6 sm:py-5 xs:py-4
                        mt-12 md:mt-12 sm:mt-8 xs:mt-4
                        flex-wrap
                    `}
                >
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-8 sm:px-6 xs:px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        className="px-10 sm:px-8 xs:px-5 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-md active:scale-95"
                    >
                        Submit
                    </button>
                </div>
            </div>
            <style>{`
                @media (max-width: 640px) {
                    .xs\\:max-w-xs { max-width: 98vw !important; }
                    .xs\\:p-4 { padding: 1rem !important; }
                    .xs\\:gap-x-2 { column-gap: 0.5rem !important; }
                    .xs\\:gap-y-4 { row-gap: 1rem !important; }
                    .xs\\:px-4 { padding-left: 1rem !important; padding-right: 1rem !important }
                    .xs\\:py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important }
                    .xs\\:mt-4 { margin-top: 1rem !important; }
                    .xs\\:px-5 { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
                }
                @media (min-width: 641px) and (max-width: 767px) {
                    .sm\\:max-w-lg { max-width: 36rem !important; }
                    .sm\\:p-6 { padding: 1.5rem !important; }
                    .sm\\:gap-x-6 { column-gap: 1.5rem !important; }
                    .sm\\:gap-y-6 { row-gap: 1.5rem !important; }
                    .sm\\:px-6 { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
                    .sm\\:py-5 { padding-top: 1.25rem !important; padding-bottom: 1.25rem !important; }
                    .sm\\:mt-8 { margin-top: 2rem !important; }
                    .sm\\:px-6 { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
                    .sm\\:px-8 { padding-left: 2rem !important; padding-right: 2rem !important; }
                    .sm\\:px-5 { padding-left: 1.25rem !important; padding-right: 1.25rem !important; }
                }
                @media (min-width: 768px) {
                    /* md - keep original paddings/gaps, don't override for large */
                }
            `}</style>
        </div>
    );
};

export default CreateReturnModal;