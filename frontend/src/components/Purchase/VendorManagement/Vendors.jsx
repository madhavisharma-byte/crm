"use client";
import React, { useState } from 'react';
import Sidebar from '../../website/Sidebar';
import Header from '../../website/Header';
import { Plus, Filter, Upload, Download, Search as SearchIcon } from 'lucide-react';
import CreateVendor from './CreateVendor';

const PurchaseVendors = () => {
    const [currentView, setCurrentView] = useState('list'); // 'list' or 'create'

    const tableHeaders = [
        "Vendor Code", "Vendor Name", "Contact Name",
        "Email", "Phone", "Billing City", "Action"
    ];

    // Example empty data array, can be filled with real vendor data
    const vendorRows = []; // [{...}, {...}]

    return (
        <div className="relative bg-[#fcfcfc] min-h-screen w-full font-sans antialiased">
            {/* 1. Fixed Sidebar - Always accessible */}
            <aside className="fixed top-0 left-0 h-screen z-50">
                <Sidebar activePage="Vendors" />
            </aside>

            {/* 2. Main Content Wrapper */}
            <div className="flex flex-col min-h-screen transition-all duration-300 pl-16 lg:pl-80">
                <Header />

                {currentView === 'create' ? (
                    /* Render Create Form */
                    <CreateVendor onBack={() => setCurrentView('list')} />
                ) : (
                    /* Render List View */
                    <>
                        {/* Sub-header / Action Bar */}
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-4 md:px-6 py-4 border-b border-gray-100 bg-white sticky top-0 z-20">
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-[16px] md:text-[18px] font-bold text-[#303e67]">Vendor Management</h1>
                                <span className="bg-[#2b6cee] text-white text-[11px] font-bold px-3 py-1 rounded-full">All</span>
                                {/* Show only Filter icon not text on small screens */}
                                <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-[#303d50] hover:bg-gray-50 transition-colors">
                                    <span className="block md:hidden"><Filter size={14} /></span>
                                    <span className="hidden md:flex items-center gap-2"><Filter size={14} /> Filter</span>
                                </button>
                            </div>

                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 shrink-0" title="Upload">
                                    <Upload size={18} />
                                </button>
                                <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 shrink-0" title="Download">
                                    <Download size={18} />
                                </button>
                                <button
                                    className="flex flex-1 md:flex-none items-center justify-center gap-2 bg-[#2b6cee] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm"
                                    onClick={() => setCurrentView('create')}
                                >
                                    <Plus size={18} /> <span className="whitespace-nowrap">Add Vendor</span>
                                </button>
                            </div>
                        </div>

                        {/* Data Table Full Height Area */}
                        <main className="flex-1 px-0 py-0 w-full max-w-none">
                            <div className="overflow-x-auto custom-scrollbar h-full" style={{height: '100%'}}>
                                <table className="w-full text-left min-w-[900px] border-collapse h-full">
                                    <thead className="sticky top-0 z-10">
                                        <tr className="bg-[#e9f0fe]">
                                            {tableHeaders.map((header, idx) => (
                                                <th
                                                    key={idx}
                                                    className="px-4 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap border-b border-gray-100"
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="align-top" style={{height: "100%"}}>
                                        {vendorRows.length === 0 ? (
                                            <tr style={{height: 'calc(100vh - 260px)'}}>
                                                <td colSpan={tableHeaders.length} className="py-32 md:py-40 align-middle" style={{verticalAlign: 'middle', height: '100%'}}>
                                                    <div className="flex flex-col items-center justify-center text-center h-full">
                                                        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#f8fafc] rounded-2xl border border-gray-50 flex items-center justify-center mb-4">
                                                            <SearchIcon size={40} className="text-blue-100" />
                                                        </div>
                                                        <p className="text-[14px] text-gray-500 font-medium">No records to show</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            vendorRows.map((row, idx) => (
                                                <tr key={idx} className="border-b last:border-b-0 hover:bg-blue-50/50 transition-colors" style={{height: "48px"}}>
                                                    {/* Render your vendor data here */}
                                                    <td className="px-4 py-4">{row.vendorCode}</td>
                                                    <td className="px-4 py-4">{row.vendorName}</td>
                                                    <td className="px-4 py-4">{row.contactName}</td>
                                                    <td className="px-4 py-4">{row.email}</td>
                                                    <td className="px-4 py-4">{row.phone}</td>
                                                    <td className="px-4 py-4">{row.billingCity}</td>
                                                    <td className="px-4 py-4">{/* Actions go here */}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </main>
                    </>
                )}
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                @media (max-width: 1023px) {
                    .pl-16 { padding-left: 4rem !important; }
                }
                /* Make table expand to fill available vertical space */
                html, body, #__next {
                    height: 100%;
                }
            `}</style>
        </div>
    );
};

export default PurchaseVendors;