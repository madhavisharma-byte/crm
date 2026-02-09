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
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#303e67]">Reorder Configuration</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} className="text-gray-500" />
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-8">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">

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
                <div className="flex justify-end gap-3 px-8 py-6 bg-white">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-6 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-md">
                        Add Configuration
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ReorderConfigModal;