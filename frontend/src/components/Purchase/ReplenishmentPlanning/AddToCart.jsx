import React, { useState } from "react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/header";
import { Box, Search } from "lucide-react";

const FILTER_TABS = ["Enabled", "Disabled", "All"];
const TABLE_COLUMNS = [
  "Product Name", "Product Code", "Category", "Vendor",
  "Vendor SKU", "Quantity in Cart", "Item Bucket Size",
  "Quantity To Add", "Unit Price",
];

export default function AddToCart() {
  const [activeTab, setActiveTab] = useState("Enabled");

  return (
    <div className="flex min-h-screen bg-white font-sans antialiased">
      {/* Sidebar, fixed width of 260px */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard Header */}
        <DashboardHeader />

        {/* Sub-header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-8">
            <h1 className="text-lg font-bold text-[#303e67]">Purchase Orders</h1>
            <div className="flex gap-3">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    activeTab === tab
                      ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                      : "text-gray-400 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <main className="flex-1 p-8 max-w-[1600px]">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1200px]">
              <thead>
                <tr className="bg-[#e9f0fe]">
                  {TABLE_COLUMNS.map((header) => (
                    <th
                      key={header}
                      className="px-6 py-4 text-sm font-semibold text-[#303d50] whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={TABLE_COLUMNS.length} className="py-40">
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative w-32 h-32 mb-4">
                        {/* Empty state illustration placeholder */}
                        <div className="absolute inset-0 bg-[#f8fafc] rounded-lg border border-gray-100 flex items-center justify-center">
                          <Box size={48} className="text-blue-100" />
                          <Search size={24} className="absolute text-blue-400 bottom-6 right-6" />
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-400">No records to show</p>
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