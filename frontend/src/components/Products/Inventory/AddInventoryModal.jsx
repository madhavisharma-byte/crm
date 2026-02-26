import React from 'react';
import { X, ChevronDown } from 'lucide-react';

// Responsive, mobile-friendly modal for all device sizes, large screens included.
const AddInventoryModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Reusable Label Component
    const Label = ({ children, required }) => (
        <label className="block text-[13px] md:text-[14px] font-bold text-slate-700 mb-2 uppercase tracking-tight">
            {children} {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
    );

    // Reusable Select Component
    const SelectField = ({ label, placeholder, required, defaultValue }) => (
        <div className="flex flex-col">
            <Label required={required}>{label}</Label>
            <div className="relative group">
                <select
                    className="w-full px-3 md:px-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm md:text-base outline-none appearance-none cursor-pointer text-slate-500 focus:border-[#2b6cee] transition-all shadow-sm"
                    defaultValue={defaultValue || ""}
                >
                    {defaultValue ? (
                        <option value={defaultValue}>{defaultValue}</option>
                    ) : (
                        <option value="" disabled>{placeholder}</option>
                    )}
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                </select>
                <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-[#2b6cee]"
                    size={18}
                />
            </div>
        </div>
    );

    // Reusable Input Component
    const InputField = ({ label, placeholder, required }) => (
        <div className="flex flex-col">
            <Label required={required}>{label}</Label>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full px-3 md:px-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm md:text-base outline-none focus:border-[#2b6cee] transition-all placeholder:text-slate-400 text-slate-600 shadow-sm"
            />
        </div>
    );

    return (
        <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm p-2 md:p-4">
            <div
                className="
                    bg-white w-full
                    max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl
                    rounded-xl shadow-2xl overflow-hidden
                    animate-in fade-in zoom-in duration-200
                    flex flex-col
                    max-h-[96vh]
                "
                style={{ minHeight: 'unset' }}
            >

                {/* Modal Header */}
                <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-100">
                    <h2 className="text-lg md:text-xl font-bold text-[#303e67]">Add Inventory</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-gray-400"
                        aria-label="Close Add Inventory Modal"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-12 gap-y-6 md:gap-y-8">

                        {/* Row 1 */}
                        <SelectField
                            label="Item SKU"
                            placeholder="Select Item SKU"
                            required
                        />
                        <SelectField
                            label="Inventory Type"
                            placeholder="Select Inventory Type"
                            required
                        />

                        {/* Row 2 */}
                        <SelectField
                            label="Shelf Code"
                            defaultValue="DEFAULT"
                            required
                        />
                        <InputField
                            label="Quantity"
                            placeholder="Enter Quantity"
                            required
                        />

                        {/* Row 3 - Full Width for Remarks */}
                        <div className="md:col-span-1">
                            <InputField
                                label="Remarks"
                                placeholder="Enter Remarks"
                            />
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex flex-col md:flex-row md:justify-end gap-3 px-4 md:px-8 py-4 md:py-6 bg-white">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 md:px-8 py-2 border border-slate-200 rounded-lg text-sm md:text-base font-semibold text-slate-600 hover:bg-gray-50 transition-colors"
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        className="px-6 md:px-8 py-2 bg-[#2b6cee] text-white rounded-lg text-sm md:text-base font-bold shadow-md hover:bg-[#1e5bc7] transition-all active:scale-95"
                    >
                        Add Inventory
                    </button>
                </div>

            </div>
            <style>{`
                @media (max-width: 640px) {
                    .modal-form-label { font-size: 13px !important; }
                }
            `}</style>
        </div>
    );
};

export default AddInventoryModal;