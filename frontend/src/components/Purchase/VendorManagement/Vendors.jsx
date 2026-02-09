import React, { useState } from 'react';
import Sidebar from '../../(website)/Sidebar';
import Header from '../../(website)/Header';
import { Plus, Filter, Upload, Download, Search as SearchIcon } from 'lucide-react';
import CreateVendor from './CreateVendor';

const PurchaseVendors = () => {
    const [showCreateVendor, setShowCreateVendor] = useState(false);

    const tableHeaders = [
        "Vendor Code",
        "Vendor Name",
        "Contact Name",
        "Email",
        "Phone",
        "Billing City",
        "Action"
    ];

    // If showCreateVendor is true, show the CreateVendor page instead of this list/table view.
    if (showCreateVendor) {
        return (
            <div className="flex min-h-screen bg-white font-sans antialiased">
                <Sidebar activePage="Vendors" />
                <div className="flex-1 flex flex-col min-w-0">
                    <Header />
                    {/* Add a way to close/cancel CreateVendor: */}
                    <div className="flex-1">
                        <CreateVendor />
                        <div className="p-8">
                            <button
                                className="px-6 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-400 hover:bg-white transition-all"
                                onClick={() => setShowCreateVendor(false)}
                            >
                                Back to Vendor List
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar */}
            <Sidebar activePage="Vendors" />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Header */}
                <Header />

                {/* 3. Sub-header / Action Bar */}
                <div className="flex items-center gap-6 px-6 py-4 border-b border-gray-100 bg-white">
                    <h1 className="text-[16px] font-bold text-[#303e67]">Vendor Management</h1>
                    {/* "All" */}
                    <span className="bg-[#2b6cee] text-white text-xs font-bold px-3 py-1 rounded-full ml-4">All</span>
                    
                    <div className="flex-1" />
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#303d50] hover:bg-gray-50">
                        <Filter size={16} /> Filter
                    </button>
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 transition-colors" title="Upload Vendor List">
                            <Upload size={18} />
                        </button>
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 transition-colors" title="Download Vendor List">
                            <Download size={18} />
                        </button>
                        <button
                            className="flex items-center gap-2 bg-[#2b6cee] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-colors"
                            onClick={() => setShowCreateVendor(true)}
                        >
                            <Plus size={18} /> Add Vendor
                        </button>
                    </div>
                </div>

                {/* 4. Data Table Area */}
                <main className="flex-1 p-8 max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[1200px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {tableHeaders.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-4 py-4 text-sm font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty State Body */}
                                <tr>
                                    <td colSpan={tableHeaders.length} className="py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-32 h-32 mb-4">
                                                {/* Professional empty state illustration (height/width same as ReorderConfig) */}
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-lg border border-gray-100 flex items-center justify-center">
                                                    <SearchIcon size={48} className="text-blue-100" />
                                                </div>
                                            </div>
                                            <p className="text-[14px] text-gray-500 font-medium tracking-tight">
                                                No records to show
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PurchaseVendors;