"use client";
import React, { useState } from "react";
import { Search, Plus, X, ChevronDown } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/header";

/* =======================
   ASSEMBLE KIT MODAL
======================= */
const AssembleKitModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const Label = ({ children }) => (
    <label className="block text-sm font-semibold text-[#303d50] mb-2 uppercase tracking-tight">
      {children}
    </label>
  );

  const InputField = ({ placeholder }) => (
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm outline-none focus:border-[#2b6cee] transition-all placeholder:text-slate-400 text-slate-600 shadow-sm"
    />
  );

  const SelectField = ({ placeholder }) => (
    <div className="relative group">
      <select className="w-full px-4 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm outline-none appearance-none cursor-pointer text-slate-500 focus:border-[#2b6cee] transition-all shadow-sm">
        <option value="" disabled selected>
          {placeholder}
        </option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-[#2b6cee]" size={18} />
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-[#303e67]">Assemble Kit</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-gray-400">
            <X size={22} />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <Label>Kit Code</Label>
              <InputField placeholder="Select Kit Code" />
            </div>
            <div>
              <Label>Name</Label>
              <InputField placeholder="Enter Code" />
            </div>
            <div>
              <Label>Zone</Label>
              <SelectField placeholder="Select Zone" />
            </div>
            <div>
              <Label>Quantity</Label>
              <SelectField placeholder="Enter Quantity" />
            </div>
          </div>
          <button className="mt-8 text-[#2b6cee] text-sm font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
            Add Row
          </button>
        </div>
        {/* Modal Footer */}
        <div className="flex justify-end gap-3 px-8 py-6 mt-12 bg-white">
          <button
            onClick={onClose}
            className="px-8 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Reset
          </button>
          <button
            className="px-10 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-bold shadow-md hover:bg-[#1e5bc7] transition-all active:scale-95"
          >
            Submit
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
  "Kit Name",
  "SKU Code",
  "Category",
  "MRP",
  "Batch",
  "Quantity",
  "Batch Group",
  "Expirable",
  "Expiry Date",
];

export default function KittingPage() {
  const TAB_LIST = ["All", "Assembly", "Re-Kit", "De-Kit"];
  const [activeTab, setActiveTab] = useState(TAB_LIST[0]);
  const [isAssembleModalOpen, setIsAssembleModalOpen] = useState(false);

  const handleOpenModal = () => setIsAssembleModalOpen(true);
  const handleCloseModal = () => setIsAssembleModalOpen(false);

  return (
    <div className="flex min-h-screen bg-white font-sans antialiased">
      {/* 1. SIDEBAR */}
      <Sidebar activePage="Products" />
      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        {/* 3. SUB-HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-8">
            <h1 className="text-[18px] font-bold text-[#303e67] whitespace-nowrap tracking-tight">Kitting</h1>
            {/* Tabs */}
            <div className="flex gap-2.5">
              {TAB_LIST.map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm 
                    ${
                      activeTab === tab
                        ? "bg-[#2b6cee] text-white"
                        : "bg-[#e9f0fe] text-[#2b6cee] hover:bg-[#d0e3fc]"
                    }
                  `}
                  onClick={() => setActiveTab(tab)}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          {/* Action Button: Assemble Kit */}
          <button
            className="flex items-center gap-2 bg-[#2b6cee] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm shrink-0"
            onClick={handleOpenModal}
          >
            <Plus size={16} />
            Assemble Kit
          </button>
        </div>
        {/* 4. DATA AREA */}
        <main className="flex-1 p-8 max-w-[1600px]">
          <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white">
            <table className="w-full text-left min-w-[1400px] border-collapse">
              <thead>
                <tr className="bg-[#e9f0fe]">
                  <th className="px-6 py-4 w-12">
                    <div className="w-4 h-4 rounded-full border border-blue-200 bg-white" />
                  </th>
                  {TABLE_COLUMNS.map((header, idx) => (
                    <th key={idx} className="px-4 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={TABLE_COLUMNS.length + 1} className="py-40 text-center">
                    <div className="flex flex-col items-center">
                      <div className="relative w-32 h-32 mb-6">
                        <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center shadow-sm">
                          <div className="w-16 h-12 bg-[#ffd8b2] rounded-md shadow-sm relative flex items-center justify-center border border-orange-200">
                            <Search className="text-[#2b6cee]" size={28} />
                          </div>
                        </div>
                      </div>
                      <p className="text-[14px] text-gray-500 font-medium tracking-tight">No Data to Display</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {/* Modal for Assemble Kit */}
      <AssembleKitModal isOpen={isAssembleModalOpen} onClose={handleCloseModal} />
    </div>
  );
}