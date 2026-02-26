"use client";
import React from "react";
import { Search, Filter, Download } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

export default function ChannelInventoryPage() {
  return (
    <div className="relative min-h-screen w-full bg-white font-sans antialiased">
      {/* Sidebar - responsive handling */}
      <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
        <Sidebar activePage="Products" />
      </div>
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
        {/* Responsive Sub-header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 border-b border-gray-100 bg-white gap-3 md:gap-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <h1 className="text-base md:text-[18px] font-bold text-[#303e67] whitespace-nowrap tracking-tight">
              Channel Inventory
            </h1>
          </div>
          {/* Action Buttons Group */}
          <div className="flex gap-2 sm:gap-3 items-center flex-wrap">
            <button className="flex items-center gap-2 px-4 sm:px-5 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-[#303d50] hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              Filter
            </button>
            <button className="p-2 sm:p-2.5 bg-blue-50 text-[#2b6cee] rounded-lg border border-transparent hover:bg-blue-100 transition-colors">
              <Download size={18} />
            </button>
          </div>
        </div>
        {/* Main Content/Data Area */}
        <main className="flex-1 w-full p-2 sm:p-4 md:p-8 max-w-[100vw] md:max-w-[1600px] xl:mx-auto">
          <div className="overflow-x-auto border border-gray-100 rounded-xl shadow-sm bg-white">
            <table className="w-full text-left min-w-[420px] sm:min-w-[900px] md:min-w-[1200px] lg:min-w-[1400px] border-collapse">
              <thead>
                <tr className="bg-[#e9f0fe]">
                  <th className="px-3 sm:px-4 md:px-6 py-4 w-10 md:w-12">
                    <div className="w-4 h-4 rounded-full border border-blue-200 bg-white" />
                  </th>
                  {/* You can define channel inventory columns here if needed */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2} className="py-20 md:py-40 text-center">
                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20 md:w-32 md:h-32 mb-6">
                        <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center shadow-sm">
                          <div className="w-10 h-8 md:w-16 md:h-12 bg-[#ffd8b2] rounded-md shadow-sm relative flex items-center justify-center border border-orange-200">
                            <Search className="text-[#2b6cee]" size={20} md:size={28} />
                          </div>
                        </div>
                      </div>
                      <p className="text-xs md:text-[14px] text-gray-500 font-medium tracking-tight">No Data to Display</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

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
      `}</style>
    </div>
  );
}