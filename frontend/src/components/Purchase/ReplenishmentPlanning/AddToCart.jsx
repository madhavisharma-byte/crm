import React, { useState } from "react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";
import { Box, Search } from "lucide-react";

const FILTER_TABS = ["Enabled", "Disabled", "All"];
const TABLE_COLUMNS = [
  "Product Name",
  "Product Code",
  "Category",
  "Vendor",
  "Vendor SKU",
  "Quantity in Cart",
  "Item Bucket Size",
  "Quantity To Add",
  "Unit Price",
];

export default function AddToCart() {
  const [activeTab, setActiveTab] = useState("Enabled");

  return (
    <div className="relative bg-white min-h-screen w-full font-sans antialiased">
      {/* Fixed Sidebar for all screens, but adjust width via padding */}
      <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
        <Sidebar />
      </div>
      {/* Responsive content layout, like Overview.jsx */}
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
        {/* Dashboard Header */}
        <DashboardHeader />

        {/* Sub-header */}
        <div className="px-3 sm:px-4 md:px-6 py-3 border-b border-gray-100 bg-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-8">
            <h1 className="text-base md:text-lg font-bold text-[#303e67]">Purchase Orders</h1>
            <div className="flex gap-2 sm:gap-3">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    activeTab === tab
                      ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                      : "text-gray-400 border-gray-300 hover:border-gray-400 bg-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Responsive paddings and scrolling */}
        <main className="flex-1 p-2 sm:p-4 md:p-8 max-w-[1600px] mx-auto w-full">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left min-w-[900px] md:min-w-[1200px]">
              <thead>
                <tr className="bg-[#e9f0fe]">
                  {TABLE_COLUMNS.map((header) => (
                    <th
                      key={header}
                      className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm font-semibold text-[#303d50] whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={TABLE_COLUMNS.length} className="py-24 md:py-40">
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative w-20 h-20 md:w-32 md:h-32 mb-4 md:mb-6">
                        {/* Empty state illustration placeholder */}
                        <div className="absolute inset-0 bg-[#f8fafc] rounded-lg border border-gray-100 flex items-center justify-center">
                          <Box size={40} className="text-blue-100 md:size-48" />
                          <Search size={20} className="absolute text-blue-400 bottom-3 right-3 md:bottom-6 md:right-6" />
                        </div>
                      </div>
                      <p className="text-xs md:text-sm font-medium text-gray-400">No records to show</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {/* Custom Scrollbar - for nice look as Overview.jsx */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }
        @media (max-width: 1023px) {
          /* When sidebar is collapsed on tablet/mobile, reserve only rail or collapsed width */
          .lg\\:pl-80 { padding-left: 4rem !important; }
        }
        @media (max-width: 767px) {
          .md\\:pl-48 { padding-left: 4rem !important; }
          .sm\\:pl-16 { padding-left: 4rem !important; }
        }
        @media (max-width: 640px) {
          .sm\\:pl-16 { padding-left: 4rem !important; }
        }
      `}</style>
    </div>
  );
}