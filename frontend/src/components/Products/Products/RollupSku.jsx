"use client";

import React, { useState } from "react";
import { Search, Printer, X, ChevronDown } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   PRINT BARCODE MODAL (Same File)
======================= */
const PrintBarcodeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-[#303e67]">Print Barcode</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={22} />
          </button>
        </div>
        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Template Info */}
          <div className="flex justify-between items-center text-sm font-medium">
            <p className="text-slate-800">
              Template in use - <span className="font-bold">Custom Template</span>
            </p>
            <button className="text-[#2b6cee] hover:underline">Change Template</button>
          </div>
          {/* Form Fields */}
          <div className="flex gap-4">
            <div className="flex-1 relative group">
              <select className="w-full px-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm outline-none appearance-none cursor-pointer text-slate-500 focus:border-[#2b6cee] transition-all">
                <option value="">Select Carton</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Enter Quantity"
                className="w-full px-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm outline-none focus:border-[#2b6cee] transition-all placeholder:text-slate-400 text-slate-600"
              />
            </div>
          </div>
          {/* Add Item Link */}
          <div className="flex justify-center">
            <button className="text-[#2b6cee] text-sm font-semibold hover:underline">
              Add Another Item SKU
            </button>
          </div>
        </div>
        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-6 mt-12 bg-white">
          <div className="bg-[#f8fafc] px-4 py-2 rounded-lg border border-slate-50">
            <p className="text-xs text-slate-600">
              Printer Not Installed? <button className="text-[#2b6cee] font-semibold hover:underline">Install Now</button> in 2 minutes
            </p>
          </div>
          <button 
            className="px-10 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#1e5bc7] transition-all active:scale-95"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

/* =======================
   MAIN PAGE COMPONENT
======================= */
const TABLE_COLUMNS = [
  "Rollup Product",
  "SKU",
  "Quantity",
  "Created By",
  "Type",
  "Enabled",
  "Created On",
  "Updated On",
  "SPQ",
];

export default function RollupSKUPage() {
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white font-sans antialiased">
      {/* 1. SIDEBAR */}
      <Sidebar activePage="Products" />
      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        {/* 3. SUB-HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-6">
            <h1 className="text-[16px] font-bold text-[#303e67] whitespace-nowrap tracking-tight">
              Rollup SKU
            </h1>
            <button className="bg-[#2b6cee] text-white px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
              All
            </button>
          </div>
          {/* Action Button: Printer Icon opens the modal */}
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg border border-transparent hover:bg-blue-100 transition-colors shadow-sm"
          >
            <Printer size={18} />
          </button>
        </div>

        {/* 4. DATA AREA */}
        <main className="flex-1 p-8 max-w-[1600px]">
          <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white">
            <table className="w-full text-left min-w-[1400px] border-collapse">
              <thead>
                <tr className="bg-[#e9f0fe]">
                  {TABLE_COLUMNS.map((header, idx) => (
                    <th key={idx} className="px-6 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={TABLE_COLUMNS.length} className="py-40 text-center">
                    <div className="flex flex-col items-center">
                      <div className="relative w-32 h-32 mb-6">
                        <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                          <div className="w-16 h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center border border-orange-200">
                            <Search className="text-[#2b6cee]" size={28} />
                          </div>
                        </div>
                      </div>
                      <p className="text-[14px] text-gray-500 font-medium tracking-tight">
                        No Data to Display
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {/* 5. MODAL COMPONENT (Rendered conditionally) */}
      <PrintBarcodeModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />
    </div>
  );
}