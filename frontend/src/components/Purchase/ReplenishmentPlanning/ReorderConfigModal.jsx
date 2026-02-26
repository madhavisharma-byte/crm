import React from 'react';
import { X, ChevronDown } from 'lucide-react';

const skuOptions = [
    { value: 'sku1', label: 'SKU 1' },
    { value: 'sku2', label: 'SKU 2' },
    // Add more or fetch from backend
];

const statusOptions = [
    { value: 'enabled', label: 'Enabled' },
    { value: 'disabled', label: 'Disabled' },
];

const invoiceCodeOptions = [
    { value: 'invA', label: 'Invoice Code A' },
    { value: 'invB', label: 'Invoice Code B' },
];

// Responsive modal: keep layout for lg screens, responsive form/modal for md/sm/xs
const ReorderConfigModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const Label = ({ children, required }) => (
        <label className="block text-sm font-semibold text-[#303d50] mb-2">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );

    const InputField = ({ placeholder, type = "text" }) => (
        <input
            type={type}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-lg text-sm outline-none focus:border-[#2b6cee] transition-colors placeholder:text-gray-400"
        />
    );

    const SelectField = ({ placeholder, options }) => (
        <div className="relative">
            <select className="w-full px-4 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-lg text-sm outline-none appearance-none cursor-pointer text-gray-500 focus:border-[#2b6cee]">
                <option value="" disabled selected>{placeholder}</option>
                {options && options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        </div>
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div
                className="
                    bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200
                    sm:max-w-lg
                    xs:max-w-full xs:mx-2
                "
                style={{
                    // minWidth for large (default) screens is as before, otherwise use responsive width
                    // The classes above handle width priorities: max-w-3xl > sm:max-w-lg > xs:max-w-full
                }}
            >

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100
                    md:px-4
                    sm:px-3
                    xs:px-3
                    "
                >
                    <h2 className="text-xl font-bold text-[#303e67] xs:text-lg">Reorder Configuration</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-8 md:p-6 sm:p-4 xs:p-3">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6
                        md:grid-cols-2 md:gap-x-6 md:gap-y-5
                        sm:grid-cols-1 sm:gap-x-0 sm:gap-y-5
                        xs:grid-cols-1 xs:gap-y-4
                    ">
                        {/* SKU */}
                        <div>
                            <Label required>SKU</Label>
                            <SelectField placeholder="Enter SKU" options={skuOptions} />
                        </div>

                        {/* Threshold Quantity */}
                        <div>
                            <Label required>Threshold Quantity</Label>
                            <InputField placeholder="Enter Threshold Quantity" type="number" />
                        </div>

                        {/* Minimum Reorder Quantity */}
                        <div>
                            <Label required>Minimum Reorder Quantity</Label>
                            <InputField placeholder="Enter Minimum Reorder Quantity" type="number" />
                        </div>

                        {/* Maximum Reorder Quantity */}
                        <div>
                            <Label required>Maximum Reorder Quantity</Label>
                            <InputField placeholder="Enter Maximum Reorder Quantity" type="number" />
                        </div>

                        {/* Status */}
                        <div>
                            <Label>Status</Label>
                            <SelectField placeholder="Select Status" options={statusOptions} />
                        </div>

                        {/* Invoice Code */}
                        <div>
                            <Label>Invoice Code</Label>
                            <SelectField placeholder="Select Invoice Code" options={invoiceCodeOptions} />
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 px-8 py-6 bg-white
                    md:px-6 md:py-5
                    sm:px-4 sm:py-4
                    xs:px-3 xs:py-3
                    flex-wrap
                ">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors
                        md:px-5 md:py-2
                        sm:px-4 sm:py-2
                        xs:px-4 xs:py-2"
                    >
                        Cancel
                    </button>
                    <button className="px-6 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-md
                        md:px-5 md:py-2
                        sm:px-4 sm:py-2
                        xs:px-4 xs:py-2">
                        Add Configuration
                    </button>
                </div>

            </div>
            <style>{`
                @media (max-width: 640px) {
                    .sm\\:max-w-lg { max-width: 100% !important; }
                    .sm\\:grid-cols-1 { grid-template-columns: 1fr !important; }
                    .sm\\:gap-x-0 { column-gap: 0 !important; }
                    .sm\\:px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
                    .sm\\:py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
                    .sm\\:gap-y-5 { row-gap: 1.25rem !important; }
                }
                @media (max-width: 480px) {
                    .xs\\:max-w-full { max-width: 100vw !important; }
                    .xs\\:mx-2 { margin-left: 0.5rem !important; margin-right: 0.5rem !important; }
                    .xs\\:grid-cols-1 { grid-template-columns: 1fr !important; }
                    .xs\\:gap-y-4 { row-gap: 1rem !important; }
                    .xs\\:p-3 { padding: 0.75rem !important; }
                    .xs\\:px-3 { padding-left: 0.75rem !important; padding-right: 0.75rem !important; }
                    .xs\\:py-3 { padding-top: 0.75rem !important; padding-bottom: 0.75rem !important; }
                }
            `}</style>
        </div>
    );
};

export default ReorderConfigModal;