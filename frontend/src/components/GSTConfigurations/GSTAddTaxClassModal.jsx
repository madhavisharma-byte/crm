import React, { useState } from 'react';
import { X, ChevronDown, Plus } from 'lucide-react';

const AddTaxClassModal = ({ isOpen, onClose }) => {
    const [slabs, setSlabs] = useState([{ id: 1 }]);

    if (!isOpen) return null;

    const addTaxSlab = () => {
        setSlabs([...slabs, { id: slabs.length + 1 }]);
    };

    const removeSlab = (id) => {
        if (slabs.length > 1) {
            setSlabs(slabs.filter((slab) => slab.id !== id));
        }
    };

    // Reusable Form components
    const Label = ({ children }) => (
        <label className="block text-[13px] font-semibold text-slate-700 mb-2 uppercase tracking-tight">
            {children}
        </label>
    );

    const InputField = ({ placeholder, defaultValue = "" }) => (
        <input
            type="text"
            placeholder={placeholder}
            defaultValue={defaultValue}
            className="w-full px-4 py-2 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm outline-none focus:border-[#2b6cee] transition-all placeholder:text-slate-400 text-slate-600"
        />
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-[95vw] lg:max-w-[1400px] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-[#303e67]">Add Tax Classes - GST</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8 space-y-12 overflow-y-auto max-h-[80vh]">

                    {/* SECTION 1: CONFIG DETAILS */}
                    <section>
                        <div className="border-l-4 border-[#2b6cee] pl-4 mb-8">
                            <h3 className="text-sm font-bold text-slate-800 uppercase">Tax Type Config Details</h3>
                            <p className="text-xs text-slate-500 mt-1">Tax Type</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <Label>Tax Class Code</Label>
                                <InputField placeholder="Enter Tax Code" />
                            </div>
                            <div>
                                <Label>Tax Type</Label>
                                <InputField defaultValue="GST" />
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

                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                            <table className="w-full text-sm text-center border-collapse">
                                <thead className="bg-white border-b border-slate-200">
                                    <tr className="text-slate-400">
                                        <th className="py-4 border-r border-slate-100 font-medium">Min Price</th>
                                        <th className="py-4 border-r border-slate-100 font-medium">Max Price</th>
                                        <th className="py-4 border-r border-slate-100 font-medium">Central GST (%)</th>
                                        <th className="py-4 border-r border-slate-100 font-medium">Integrated GST (%)</th>
                                        <th className="py-4 border-r border-slate-100 font-medium">Union Territory GST (%)</th>
                                        <th className="py-4 border-r border-slate-100 font-medium">Compensation Cess</th>
                                        <th className="py-4 w-24"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {slabs.map((slab, index) => (
                                        <tr key={slab.id}>
                                            <td className="py-4 border-r border-slate-100 font-bold text-slate-700">{index + 1}</td>
                                            <td className="border-r border-slate-100"><input type="text" className="w-full h-full p-4 outline-none bg-transparent" /></td>
                                            <td className="border-r border-slate-100"><input type="text" className="w-full h-full p-4 outline-none bg-transparent" /></td>
                                            <td className="border-r border-slate-100"><input type="text" className="w-full h-full p-4 outline-none bg-transparent" /></td>
                                            <td className="border-r border-slate-100"><input type="text" className="w-full h-full p-4 outline-none bg-transparent" /></td>
                                            <td className="border-r border-slate-100"><input type="text" className="w-full h-full p-4 outline-none bg-transparent" /></td>
                                            <td>
                                                <button
                                                    onClick={() => removeSlab(slab.id)}
                                                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Add Slab Link */}
                            <button
                                onClick={addTaxSlab}
                                className="w-full text-left px-6 py-4 bg-white border-t border-slate-200 text-[#2b6cee] font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
                            >
                                <Plus size={14} /> Add Tax Slab
                            </button>
                        </div>
                    </section>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 px-8 py-6 bg-white border-t border-slate-50">
                    <button
                        onClick={() => setSlabs([{ id: 1 }])}
                        className="px-8 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Reset
                    </button>
                    <button
                        className="px-10 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-md active:scale-95"
                    >
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AddTaxClassModal;