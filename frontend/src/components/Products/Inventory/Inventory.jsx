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
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";
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
    <div className="relative min-h-screen bg-white font-sans antialiased w-full">
      {/* Responsive Sidebar */}
      <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
        <Sidebar activePage="Products" />
      </div>
      {/* Main Content - responsive padding for sidebar */}
      <div
        className={`
          flex flex-col min-h-screen flex-1 transition-all
          lg:pl-80 pl-16 md:pl-48 sm:pl-16 w-full
          bg-white
        `}
      >
        <DashboardHeader />
        {/* SUB-HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 border-b border-gray-100 bg-white gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
            <h1 className="text-base md:text-[18px] font-bold text-[#303e67] whitespace-nowrap tracking-tight">
              Inventory
            </h1>
            {/* Filter Tabs - Pill style */}
            <div className="flex gap-2 sm:gap-2.5 flex-wrap">
              {TAB_LIST.map((tab) => (
                <button
                  key={tab}
                  className={`px-3 sm:px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm ${activeTab === tab
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
          <div className="flex flex-wrap items-center gap-2 md:gap-3 shrink-0">
            <button className="flex items-center gap-2 bg-white px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#303d50] hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              <span className="hidden sm:inline">Filter</span>
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
              className="flex items-center gap-2 bg-[#2b6cee] text-white px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm"
              onClick={() => setShowAddInventoryModal(true)}
              type="button"
            >
              <Plus size={16} />
              <span className="hidden xs:inline">Add Inventory</span>
            </button>
            <button
              className="flex items-center gap-2 bg-[#2b6cee] text-white px-4 sm:px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm"
              onClick={() => setShowScanInventoryModal(true)}
              type="button"
            >
              <Scan size={16} />
              <span className="hidden xs:inline">Scan Inventory</span>
            </button>
          </div>
        </div>
        {/* DATA AREA */}
        <main className="flex-1 p-2 sm:p-4 md:p-8 max-w-full overflow-x-auto">
          <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white">
            <table className="w-full text-left min-w-[600px] md:min-w-[1000px] lg:min-w-[1400px] border-collapse">
              <thead>
                <tr className="bg-[#e9f0fe]">
                  {TABLE_COLUMNS.map((header, idx) => (
                    <th
                      key={idx}
                      className="px-2 sm:px-4 md:px-6 py-3 md:py-4 text-[12px] md:text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={TABLE_COLUMNS.length} className="py-16 md:py-40 text-center">
                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20 md:w-32 md:h-32 mb-5 md:mb-6">
                        <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center shadow-sm">
                          <div className="w-10 h-8 md:w-16 md:h-12 bg-[#ffd8b2] rounded-md shadow-sm relative flex items-center justify-center border border-orange-200">
                            <Search className="text-[#2b6cee]" size={22} md:size={28} />
                          </div>
                        </div>
                      </div>
                      <p className="text-[13px] md:text-[14px] text-gray-500 font-medium tracking-tight">
                        No Data to Display
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
        {/* PAGE FOOTER */}
        <footer className="fixed bottom-0 right-0 left-0 bg-white border-t border-gray-200 p-3 md:p-4 flex justify-end px-4 md:px-8 z-20">
          <button className="bg-[#2b6cee] text-white px-5 md:px-8 py-2 rounded-lg text-sm font-bold hover:bg-[#1e5bc7] transition-all shadow-md active:scale-95">
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

      {/* Custom scrollbar styles for responsive scrolling */}
      <style>{`
        @media (max-width: 1023px) {
          .lg\\:pl-80 { padding-left: 4rem !important; }
        }
        @media (max-width: 767px) {
          .md\\:pl-48 { padding-left: 4rem !important; }
          .sm\\:pl-16 { padding-left: 4rem !important; }
        }
        @media (max-width: 640px) {
          .sm\\:pl-16 { padding-left: 4rem !important; }
        }
        ::-webkit-scrollbar {
          width: 6px;
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #e6e7ee;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}