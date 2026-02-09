import React, { useState } from 'react';
import { X, ChevronDown, Plus } from 'lucide-react';

const AddNonGstTaxClassModal = ({ isOpen, onClose }) => {
    // State to manage dynamic table rows
    const [countryRows, setCountryRows] = useState([{ id: 1 }]);

    if (!isOpen) return null;

    const addCountryRow = () => {
        setCountryRows([...countryRows, { id: Date.now() }]);
    };

    const removeRow = (id) => {
        if (countryRows.length > 1) {
            setCountryRows(countryRows.filter(row => row.id !== id));
        }
    };

    // Reusable UI Components
    const Label = ({ children }) => (
        <label className="block text-[12px] font-bold text-slate-700 mb-2 uppercase tracking-tight">
            {children}
        </label>
    );

    const InputField = ({ placeholder, readOnly = false, value }) => (
        <input
            type="text"
            placeholder={placeholder}
            readOnly={readOnly}
            defaultValue={value}
            className={`w-full px-4 py-2 border border-slate-200 rounded-lg text-sm outline-none transition-all 
        ${readOnly ? 'bg-slate-50 text-slate-400 cursor-not-allowed' : 'bg-[#f8fafc] text-slate-600 focus:border-[#2b6cee]'}`}
        />
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-[95vw] lg:max-w-[1400px] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-[#303e67]">Add Tax Classes - Non GST</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8 space-y-12 overflow-y-auto max-h-[80vh]">

                    {/* SECTION 1: CONFIG DETAILS */}
                    <section>
                        <div className="border-l-4 border-[#2b6cee] pl-4 mb-8">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Tax Type Config Details</h3>
                            <p className="text-xs text-slate-500 mt-1">Tax Type</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <Label>Tax Class Code</Label>
                                <InputField placeholder="Enter Tax Code" />
                            </div>
                            <div>
                                <Label>Tax Type</Label>
                                <InputField value="Non GST" readOnly />
                            </div>
                            <div>
                                <Label>Tax Class Name</Label>
                                <InputField placeholder="Enter Tax Class Name" />
                            </div>
                        </div>

                        <div className="mt-8 w-full md:w-1/3">
                            <Label>Tax Calculated On</Label>
                            <div className="relative">
                                <select className="w-full px-4 py-2 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm outline-none appearance-none cursor-pointer text-slate-500 focus:border-[#2b6cee]">
                                    <option value="">Select Price</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: TABLE DETAILS */}
                    <section>
                        <div className="border-l-4 border-[#2b6cee] pl-4 mb-6">
                            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Tax Type Table Details</h3>
                        </div>

                        <div className="border border-slate-200 rounded-lg overflow-hidden max-w-4xl">
                            <table className="w-full text-sm text-center border-collapse">
                                <thead className="bg-white border-b border-slate-200">
                                    <tr className="text-slate-400">
                                        <th className="py-4 border-r border-slate-100 font-medium w-16"></th>
                                        <th className="py-4 border-r border-slate-100 font-medium">Country</th>
                                        <th className="py-4 border-r border-slate-100 font-medium">States</th>
                                        <th className="py-4 border-r border-slate-100 font-medium">Price Slabs</th>
                                        <th className="py-4 w-20"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {countryRows.map((row) => (
                                        <tr key={row.id}>
                                            <td className="py-4 border-r border-slate-100 text-slate-500 font-bold">+</td>
                                            <td className="border-r border-slate-100 p-2">
                                                <div className="relative">
                                                    <select className="w-full px-3 py-2 outline-none bg-transparent appearance-none text-slate-600">
                                                        <option>Select Country</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                                </div>
                                            </td>
                                            <td className="border-r border-slate-100 p-2">
                                                <div className="relative">
                                                    <select className="w-full px-3 py-2 outline-none bg-transparent appearance-none text-slate-600">
                                                        <option>Select State</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                                                </div>
                                            </td>
                                            <td className="border-r border-slate-100 p-2">
                                                <input type="text" className="w-full px-3 py-2 outline-none bg-transparent" />
                                            </td>
                                            <td>
                                                {countryRows.length > 1 && (
                                                    <button onClick={() => removeRow(row.id)} className="text-red-400 hover:text-red-600 text-xs">Delete</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                onClick={addCountryRow}
                                className="w-full text-left px-6 py-4 bg-white border-t border-slate-200 text-[#2b6cee] font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
                            >
                                <Plus size={14} /> Add Country
                            </button>
                        </div>
                    </section>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 px-8 py-6 bg-white border-t border-slate-50">
                    <button
                        onClick={() => setCountryRows([{ id: 1 }])}
                        className="px-8 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Reset
                    </button>
                    <button className="px-10 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-md active:scale-95">
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddNonGstTaxClassModal;