"use client";
import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";
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
    <div className="relative min-h-screen w-full bg-white font-sans antialiased">
      {/* SIDEBAR - Responsive for all devices */}
      <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
        <Sidebar activePage="Products" />
      </div>
      {/* MAIN CONTENT */}
      <div
        className={`
          flex flex-col min-h-screen
          transition-all
          lg:pl-80 pl-16
          md:pl-48
          sm:pl-16
          bg-white
        `}
      >
        <DashboardHeader />
        {/* SUB-HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 md:px-6 py-4 border-b border-gray-100 bg-white gap-2 sm:gap-0">
          <div className="flex items-center gap-3 md:gap-6 mb-2 sm:mb-0">
            <h1 className="text-base md:text-[16px] font-bold text-[#303e67] whitespace-nowrap tracking-tight">
              Categories
            </h1>
            <button className="bg-[#2b6cee] text-white px-3 md:px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm">
              {activeTab}
            </button>
          </div>
          {/* Action Button: Add Category */}
          <button
            className="flex items-center gap-2 bg-[#2b6cee] text-white px-4 md:px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm shrink-0"
            onClick={handleOpenModal}
          >
            <Plus size={16} />
            <span className="hidden xs:inline">Add Category</span>
          </button>
        </div>
        {/* DATA AREA */}
        <main className="flex-1 p-2 xs:p-4 md:p-8 w-full max-w-full xl:max-w-[1600px] mx-auto">
          <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white min-w-0">
            <table className="w-full text-left min-w-[600px] md:min-w-[1000px] border-collapse">
              <thead>
                <tr className="bg-[#e9f0fe]">
                  {TABLE_COLUMNS.map((header, idx) => (
                    <th
                      key={idx}
                      className="px-3 md:px-6 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={TABLE_COLUMNS.length}
                    className="py-20 md:py-40 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20 md:w-32 md:h-32 mb-6">
                        <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                          <div className="w-10 h-8 md:w-16 md:h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center border border-orange-200">
                            <Search className="text-[#2b6cee]" size={28} />
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
      </div>
      {/* Modal for Creating Category */}
      <CreateCategoryModal isOpen={isCreateModalOpen} onClose={handleCloseModal} />
      {/* Responsive adjustments for padding - matches Overview.jsx */}
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
        @media (max-width: 639px) {
          .xs\\:inline { display: inline !important; }
          .xs\\:p-4 { padding: 1rem !important; }
        }
      `}</style>
    </div>
  );
}