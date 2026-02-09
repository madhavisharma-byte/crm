import React, { useState } from 'react';
import { ChevronRight, Calendar, ChevronDown, Plus } from 'lucide-react';

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

// --- Sub-Components ---
const FormField = ({ field }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">
            {field.label} {field.required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative group">
            <input
                type="text"
                placeholder={field.placeholder}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            {field.type === 'date' && (
                <Calendar size={16} className="absolute right-3 top-2.5 text-slate-400" />
            )}
            {field.type === 'select' && (
                <ChevronDown size={16} className="absolute right-3 top-2.5 text-slate-400" />
            )}
        </div>
    </div>
);

const SectionHeader = ({ title, desc }) => (
    <div className="border-l-4 border-blue-600 pl-4 mb-6">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">{desc}</p>
    </div>
);

// --- Main Page ---
const CreateVendor = () => {
    return (
        <div className="flex min-h-screen bg-white">
            <div className="flex-1 flex flex-col">
                {/* Content Area */}
                <main className="flex-1 overflow-y-auto pt-[55px] pb-24">

                    {/* Breadcrumbs */}
                    <div className="px-8 py-4 flex items-center gap-2 text-sm border-b border-slate-200">
                        <span className="text-slate-500 cursor-pointer font-medium">Vendors</span>
                        <ChevronRight size={14} className="text-slate-400" />
                        <span className="text-slate-400">Create Vendor</span>
                    </div>

                    <div className="p-8 flex flex-col gap-12 max-w-[1600px]">
                        {FORM_DATA_CONFIG.map((section, idx) => (
                            <React.Fragment key={idx}>
                                <section>
                                    <SectionHeader title={section.sectionTitle} desc={section.description} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                                        {section.fields.map((f, i) => (
                                            <FormField key={i} field={f} />
                                        ))}
                                    </div>
                                </section>
                                {/* Visual Dividers */}
                                {idx < 2 && <hr className="border-slate-200" />}
                            </React.Fragment>
                        ))}

                        {/* Vendor Agreement Section */}
                        <section>
                            <SectionHeader title="VENDOR AGREEMENT" desc="Add Here The Agreement Details" />
                            <div className="border border-slate-300 rounded-lg overflow-hidden">
                                <table className="w-full text-sm text-left border-collapse">
                                    <thead className="bg-white border-b border-slate-300">
                                        <tr>
                                            {["No.", "Name", "Status", "Start Date", "End Date", "Description"].map((h) => (
                                                <th key={h} className="px-4 py-3 font-medium text-slate-400 border-r border-slate-300 last:border-0 text-center">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-slate-300">
                                            <td className="px-4 py-3 border-r border-slate-300 font-bold text-slate-700 text-center">1</td>
                                            <td className="px-4 py-3 border-r border-slate-300"></td>
                                            <td className="px-4 py-3 border-r border-slate-300"></td>
                                            <td className="px-4 py-3 border-r border-slate-300"></td>
                                            <td className="px-4 py-3 border-r border-slate-300"></td>
                                            <td className="px-4 py-3"></td>
                                        </tr>
                                        <tr className="cursor-pointer hover:bg-slate-50">
                                            <td colSpan="6" className="px-4 py-3 font-bold text-slate-700 text-center">
                                                Add Agreement
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>
                </main>

                {/* Footer Actions */}
                <footer className="fixed bottom-0 right-0 left-0 bg-slate-50 border-t border-slate-300 p-4 flex justify-end gap-4 z-20 shadow-lg">
                    <button className="px-6 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-400 hover:bg-white transition-all">
                        Cancel
                    </button>
                    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-sm transition-all">
                        Add Vendor
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default CreateVendor;