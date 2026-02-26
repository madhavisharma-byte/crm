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
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-2 xs:p-1 sm:p-2 md:p-4">
            <div className="bg-white w-full max-w-[98vw] sm:max-w-[95vw] lg:max-w-[1400px] rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

                {/* Modal Header */}
                <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-0 px-3 xs:px-4 sm:px-6 py-3 xs:py-4 border-b border-slate-100">
                    <h2 className="text-base xs:text-lg sm:text-xl font-bold text-[#303e67]">Add Tax Classes - GST</h2>
                    <button onClick={onClose} className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 self-end xs:self-auto">
                        <X size={22} />
                    </button>
                </div>

                <div className="p-2 xs:p-3 sm:p-5 md:p-8 space-y-8 sm:space-y-10 md:space-y-12 overflow-y-auto max-h-[86vh] xs:max-h-[82vh] sm:max-h-[80vh]">

                    {/* SECTION 1: CONFIG DETAILS */}
                    <section>
                        <div className="border-l-4 border-[#2b6cee] pl-2 xs:pl-4 mb-6 xs:mb-8">
                            <h3 className="text-xs xs:text-sm font-bold text-slate-800 uppercase">Tax Type Config Details</h3>
                            <p className="text-[10px] xs:text-xs text-slate-500 mt-0.5 xs:mt-1">Tax Type</p>
                        </div>

                        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 xs:gap-6 md:gap-8">
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

                        <div className="mt-6 xs:mt-8 w-full xs:w-2/3 md:w-1/3">
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
                        <div className="border-l-4 border-[#2b6cee] pl-2 xs:pl-4 mb-4 xs:mb-6">
                            <h3 className="text-xs xs:text-sm font-bold text-slate-800 uppercase tracking-tight">Tax Type Table Details</h3>
                        </div>

                        <div className="border border-slate-200 rounded-lg overflow-x-auto">
                            <table className="w-full text-xs xs:text-sm text-center border-collapse min-w-[650px]">
                                <thead className="bg-white border-b border-slate-200">
                                    <tr className="text-slate-400">
                                        <th className="py-2 xs:py-3 sm:py-4 border-r border-slate-100 font-medium min-w-[80px]">Min Price</th>
                                        <th className="py-2 xs:py-3 sm:py-4 border-r border-slate-100 font-medium min-w-[80px]">Max Price</th>
                                        <th className="py-2 xs:py-3 sm:py-4 border-r border-slate-100 font-medium min-w-[110px]">Central GST (%)</th>
                                        <th className="py-2 xs:py-3 sm:py-4 border-r border-slate-100 font-medium min-w-[110px]">Integrated GST (%)</th>
                                        <th className="py-2 xs:py-3 sm:py-4 border-r border-slate-100 font-medium min-w-[140px]">Union Territory GST (%)</th>
                                        <th className="py-2 xs:py-3 sm:py-4 border-r border-slate-100 font-medium min-w-[130px]">Compensation Cess</th>
                                        <th className="py-2 xs:py-3 sm:py-4 w-12 xs:w-20 sm:w-24"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {slabs.map((slab, index) => (
                                        <tr key={slab.id}>
                                            <td className="py-2 xs:py-3 sm:py-4 border-r border-slate-100 font-bold text-slate-700">{index + 1}</td>
                                            <td className="border-r border-slate-100"><input type="text" className="w-full h-full p-2 xs:p-3 sm:p-4 outline-none bg-transparent" /></td>
                                            <td className="border-r border-slate-100"><input type="text" className="w-full h-full p-2 xs:p-3 sm:p-4 outline-none bg-transparent" /></td>
                                            <td className="border-r border-slate-100"><input type="text" className="w-full h-full p-2 xs:p-3 sm:p-4 outline-none bg-transparent" /></td>
                                            <td className="border-r border-slate-100"><input type="text" className="w-full h-full p-2 xs:p-3 sm:p-4 outline-none bg-transparent" /></td>
                                            <td className="border-r border-slate-100"><input type="text" className="w-full h-full p-2 xs:p-3 sm:p-4 outline-none bg-transparent" /></td>
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
                                className="w-full text-left px-3 xs:px-4 sm:px-6 py-3 xs:py-4 bg-white border-t border-slate-200 text-[#2b6cee] font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
                            >
                                <Plus size={14} /> Add Tax Slab
                            </button>
                        </div>
                    </section>
                </div>

                {/* Modal Footer */}
                <div className="flex flex-col-reverse xs:flex-row justify-end gap-2 sm:gap-3 px-3 xs:px-6 sm:px-8 py-4 sm:py-6 bg-white border-t border-slate-50">
                    <button
                        onClick={() => setSlabs([{ id: 1 }])}
                        className="w-full xs:w-auto px-5 sm:px-8 py-2 border border-slate-300 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        Reset
                    </button>
                    <button
                        className="w-full xs:w-auto px-6 sm:px-10 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-md active:scale-95"
                    >
                        Submit
                    </button>
                </div>

            </div>
            {/* Responsive styles for mobile/tablet without changing large/desktop */}
            <style>{`
                @media (max-width: 640px) {
                    .sm\\:max-w-\\[95vw\\] { max-width: 95vw !important; }
                    .sm\\:max-h-\\[80vh\\] { max-height: 80vh !important; }
                    .sm\\:space-y-10 { margin-bottom: 2.5rem !important; }
                    .sm\\:space-y-12 { margin-bottom: 3rem !important; }
                    /* xs: for <500px (mobile) */
                    .xs\\:max-w-\\[98vw\\] { max-width: 98vw !important; }
                    .xs\\:p-1 { padding: 0.25rem !important; }
                    .xs\\:px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
                    .xs\\:py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
                    .xs\\:pl-4 { padding-left: 1rem !important; }
                    .xs\\:mb-8 { margin-bottom: 2rem !important; }
                    .xs\\:mt-8 { margin-top: 2rem !important; }
                    .xs\\:gap-0 { gap: 0 !important; }
                    .xs\\:flex-row { flex-direction: row !important; }
                    .xs\\:self-auto { align-self: auto !important; }
                    .xs\\:py-3 { padding-top: 0.75rem !important; padding-bottom: 0.75rem !important; }
                    .xs\\:space-y-10 { margin-bottom: 2.5rem !important; }
                    .xs\\:space-y-8 { margin-bottom: 2rem !important; }
                }
                @media (max-width: 900px) {
                    .md\\:max-w-\\[1400px\\] { max-width: 100vw !important; }
                }
            `}</style>
        </div>
    );
};

export default AddTaxClassModal;