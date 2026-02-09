"use client";
import React from "react";
import { Search, Filter, Download } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

export default function ChannelInventoryPage() {
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
              Channel Inventory
            </h1>
          </div>
          {/* Action Buttons Group */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#303d50] hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              Filter
            </button>
            <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg border border-transparent hover:bg-blue-100 transition-colors">
              <Download size={18} />
            </button>
          </div>
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
                  {/* You can define channel inventory columns here if needed */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={2} className="py-40 text-center">
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
    </div>
  );
}