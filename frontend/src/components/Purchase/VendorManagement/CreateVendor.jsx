import React from 'react';
import { ChevronRight, Calendar, ChevronDown } from 'lucide-react';

// --- Constants ---
const FORM_DATA_CONFIG = [
    {
        sectionTitle: "GENERAL DETAILS",
        description: "Enter Basic Details Of The Vendor.",
        fields: [
            { label: "Vendor Code", placeholder: "Enter Purchase order code", required: true, type: "text" },
            { label: "Vendor Name", placeholder: "Enter SKU Code", required: true, type: "text" },
            { label: "Website URL", placeholder: "Enter Product Name", type: "text" },
            { label: "Status", placeholder: "26/01/26", type: "date" },
            { label: "Tolerance", placeholder: "FLIPKART", type: "select" },
        ]
    },
    {
        sectionTitle: "ACCOUNTING DETAILS",
        description: "Specify Accounting Details Of The Vendor For Tax And Invoicing Purposes.",
        fields: [
            { label: "PAN", placeholder: "Select Product Type", type: "text" },
            { label: "TIN", placeholder: "Select Vendor Agreement", type: "text" },
            { label: "GSTIN", placeholder: "Select Vendor Agreement", type: "text" },
            { label: "Central Sale Tax", placeholder: "Select Vendor Agreement", type: "text" },
            { label: "Service Tax", placeholder: "Select Product Type", type: "text" },
            { label: "Tax Exempted", placeholder: "Select Vendor Agreement", type: "select" },
            { label: "Registered Dealer", placeholder: "Select Vendor Agreement", type: "select" },
            { label: "Accepts CForm", placeholder: "Select Vendor Agreement", type: "select" },
            { label: "Purchase Expiry Period", placeholder: "Select Product Type", type: "text" },
            { label: "TCS Addition Enabled", placeholder: "Select Vendor Agreement", type: "select" },
        ]
    },
    {
        sectionTitle: "CONTACT DETAILS",
        description: "Name And Other Details Of The Vendor Contact.",
        fields: [
            { label: "Contact Name", placeholder: "Select Product Type", type: "text" },
            { label: "Email ID", placeholder: "Select Vendor Agreement", type: "text" },
            { label: "Phone Number", placeholder: "Select Vendor Agreement", type: "text" },
        ]
    },
    {
        sectionTitle: "BILLING ADDRESS",
        description: "Configure The Billing Address Of The Vendor.",
        fields: [
            { label: "Address Line 1", placeholder: "Select Product Type", type: "text" },
            { label: "Address Line 2", placeholder: "Select Vendor Agreement", type: "text" },
            { label: "Country", placeholder: "Select Vendor Agreement", type: "text" },
            { label: "Pin Code", placeholder: "Select Vendor Agreement", type: "text" },
            { label: "State", placeholder: "Select Product Type", type: "text" },
            { label: "City", placeholder: "Select Vendor Agreement", type: "text" },
            { label: "Phone", placeholder: "Select Vendor Agreement", type: "text" },
            { label: "Latitude", placeholder: "Select Vendor Agreement", type: "text" },
            { label: "Longitude", placeholder: "Select Product Type", type: "text" },
        ]
    }
];

const FormField = ({ field }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-slate-700">
            {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative group">
            {field.type === 'select' ? (
                <div className="relative">
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm appearance-none focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                        <option>{field.placeholder}</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
                </div>
            ) : (
                <div className="relative">
                    <input
                        type={field.type === 'date' ? 'date' : 'text'}
                        placeholder={field.placeholder}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                </div>
            )}
        </div>
    </div>
);

const SectionHeader = ({ title, desc }) => (
    <div className="border-l-4 border-blue-600 pl-4 mb-6">
        <h3 className="text-[16px] font-bold text-slate-800 tracking-tight">{title}</h3>
        <p className="text-[12px] text-slate-500 mt-1">{desc}</p>
    </div>
);

const CreateVendor = ({ onBack }) => {
    return (
        <div className="flex flex-col min-h-[calc(100vh-64px)] bg-white relative">
            {/* Breadcrumbs */}
            <div className="px-4 md:px-8 py-3 flex items-center gap-2 text-sm border-b border-slate-100 sticky top-0 bg-white z-10">
                <span
                    className="text-slate-500 cursor-pointer font-medium hover:text-blue-600 transition-colors"
                    onClick={onBack}
                >
                    Vendors
                </span>
                <ChevronRight size={14} className="text-slate-400" />
                <span className="text-slate-400">Create Vendor</span>
            </div>

            <main className="flex-1 p-4 md:p-8 pb-32 max-w-[1600px] mx-auto w-full">
                <div className="space-y-10">
                    {FORM_DATA_CONFIG.map((section, idx) => (
                        <section key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SectionHeader title={section.sectionTitle} desc={section.description} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
                                {section.fields.map((f, i) => (
                                    <FormField key={i} field={f} />
                                ))}
                            </div>
                        </section>
                    ))}

                    {/* Vendor Agreement Table Section */}
                    <section className="pb-10">
                        <SectionHeader title="VENDOR AGREEMENT" desc="Add Here The Agreement Details" />
                        <div className="border border-slate-200 rounded-xl overflow-x-auto shadow-sm">
                            <table className="w-full text-sm text-left min-w-[600px]">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        {["No.", "Name", "Status", "Start Date", "End Date"].map((h) => (
                                            <th key={h} className="px-4 py-3 font-semibold text-slate-500 text-center">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-blue-50/50 cursor-pointer transition-colors">
                                        <td colSpan="5" className="px-4 py-6 font-bold text-blue-600 text-center text-[13px]">
                                            + Add New Agreement
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>

            {/* Fixed Footer Actions - Adjusted to not overlap sidebar */}
            <footer className="fixed bottom-0 right-0 left-0 lg:left-80 pl-16 lg:pl-0 bg-white border-t border-slate-200 p-4 flex justify-end gap-3 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.03)] transition-all duration-300">
                <button
                    onClick={onBack}
                    className="px-6 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
                >
                    Cancel
                </button>
                <button className="px-6 py-2 bg-[#2b6cee] hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-md transition-all">
                    Save Vendor
                </button>
            </footer>
        </div>
    );
};

export default CreateVendor;