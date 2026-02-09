"use client";
import React, { useState, useRef } from "react";
import {
  Search,
  Filter,
  Upload,
  Download,
  Plus,
  Scan,
  X
} from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/Header";
import AddInventoryModal from "./AddInventoryModal";
import ScanInventoryModal from "./ScanInventoryModal";

/* =======================
   CONSTANT DATA
======================= */
const FILTER_TABS = ["Good Inventory", "Bad Inventory", "All"];

const TABLE_COLUMNS = [
  "SKU Code",
  "Item Name",
  "Shelf",
  "Shelf Attributes",
  "Batch",
  "BatchStatus",
  "Type",
  "Total (Stock on hand)",
  "Available (ATP)",
  "Blocked",
];

/* =======================
   Import File Modal
======================= */
function ImportFileModal({ isOpen, onClose }) {
  const inputRef = useRef(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-[#303e67]">Import File</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>
        <div className="p-6 pt-4">
          <div>
            {/* File Upload Button */}
            <button
              className="flex items-center gap-2 px-4 py-2 bg-[#f2f7fc] border border-[#3c82f6] text-[#316fd8] rounded-md font-semibold text-sm transition-all hover:bg-[#e2effe] mb-3"
              onClick={() => inputRef.current && inputRef.current.click()}
              type="button"
            >
              <Upload size={18} />
              Choose File
            </button>
            <input
              ref={inputRef}
              type="file"
              style={{ display: "none" }}
            />
          </div>
          <div className="mb-3 text-[13px]">
            Download{" "}
            <a
              href="#"
              className="text-[#fb923c] font-medium underline underline-offset-2 hover:text-orange-600"
            >
              Template &amp; Instructions
            </a>
          </div>
          <div className="flex items-end justify-between mt-10">
            <a
              href="#"
              className="text-[12px] text-[#397de2] font-medium hover:underline"
            >
              Need Help ?
            </a>
            <button
              className="px-7 py-2 bg-[#387aff] text-white rounded-lg text-sm font-semibold shadow-md hover:bg-[#2264da] transition-all"
              onClick={onClose}
              type="button"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InventoryPage() {
  const TAB_LIST = FILTER_TABS;
  const [activeTab, setActiveTab] = useState(TAB_LIST[0]);
  const [showImportModal, setShowImportModal] = useState(false);

  // Manage Add Inventory modal state
  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);
  // Manage Scan Inventory modal state
  const [showScanInventoryModal, setShowScanInventoryModal] = useState(false);

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
            <h1 className="text-[18px] font-bold text-[#303e67] whitespace-nowrap tracking-tight">
              Inventory
            </h1>
            {/* Filter Tabs - Pill style */}
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
          {/* Action Buttons Group */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#303d50] hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              Filter
            </button>
            <button
              className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg border border-transparent hover:bg-blue-100 transition-colors"
              onClick={() => setShowImportModal(true)}
              type="button"
            >
              <Upload size={18} />
            </button>
            <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg border border-transparent hover:bg-blue-100 transition-colors">
              <Download size={18} />
            </button>
            <button
              className="flex items-center gap-2 bg-[#2b6cee] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm"
              onClick={() => setShowAddInventoryModal(true)}
              type="button"
            >
              <Plus size={16} />
              Add Inventory
            </button>
            <button
              className="flex items-center gap-2 bg-[#2b6cee] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm"
              onClick={() => setShowScanInventoryModal(true)}
              type="button"
            >
              <Scan size={16} />
              Scan Inventory
            </button>
          </div>
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
                        <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center shadow-sm">
                          <div className="w-16 h-12 bg-[#ffd8b2] rounded-md shadow-sm relative flex items-center justify-center border border-orange-200">
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
        {/* 5. PAGE FOOTER */}
        <footer className="fixed bottom-0 right-0 left-0 bg-white border-t border-gray-200 p-4 flex justify-end px-8 z-20">
          <button className="bg-[#2b6cee] text-white px-8 py-2 rounded-lg text-sm font-bold hover:bg-[#1e5bc7] transition-all shadow-md active:scale-95">
            Generate
          </button>
        </footer>
      </div>

      {/* Import Modal */}
      <ImportFileModal isOpen={showImportModal} onClose={() => setShowImportModal(false)} />

      {/* Add Inventory Modal */}
      <AddInventoryModal isOpen={showAddInventoryModal} onClose={() => setShowAddInventoryModal(false)} />

      {/* Scan Inventory Modal */}
      <ScanInventoryModal isOpen={showScanInventoryModal} onClose={() => setShowScanInventoryModal(false)} />
    </div>
  );
}