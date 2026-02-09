"use client";
import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/header";
import CreateCategoryModal from "./CreateCategoryModal"; // import create category modal

/* =======================
   CONSTANT DATA
======================= */
const TABLE_COLUMNS = [
  "Name",
  "Code",
  "Tax Type Code",
  "GST Tax Code",
  "Created At",
  "Updated At",
];

export default function CategoriesPage() {
  const [activeTab] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleOpenModal = () => setIsCreateModalOpen(true);
  const handleCloseModal = () => setIsCreateModalOpen(false);

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
              Categories
            </h1>
            <button className="bg-[#2b6cee] text-white px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
              {activeTab}
            </button>
          </div>
          {/* Action Button: Add Category */}
          <button
            className="flex items-center gap-2 bg-[#2b6cee] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm shrink-0"
            onClick={handleOpenModal}
          >
            <Plus size={16} />
            Add Category
          </button>
        </div>
        {/* 4. DATA AREA */}
        <main className="flex-1 p-8 max-w-[1600px]">
          <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white">
            <table className="w-full text-left min-w-[1000px] border-collapse">
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
      {/* Modal for Creating Category */}
      <CreateCategoryModal isOpen={isCreateModalOpen} onClose={handleCloseModal} />
    </div>
  );
}