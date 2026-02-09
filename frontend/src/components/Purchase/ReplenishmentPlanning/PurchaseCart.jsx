"use client";

import React, { useState } from "react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/Header";

/* =======================
   CONSTANT DATA
======================= */

const TABLE_HEADERS = [
  "Product Name",
  "Product Code",
  "Category",
  "Vendor",
  "Quantity",
  "Unit Price",
  "Total",
];

const EMPTY_STATE_IMG =
  "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGF2YXRhcnxlbnwxfHx8fDE3Njk2MjA0ODF8MA&ixlib=rb-4.1.0&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-48 w-full">
    <div className="w-32 h-32 mb-4 opacity-40 grayscale flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden">
      <img src={EMPTY_STATE_IMG} alt="No data" className="w-full h-full object-cover" />
    </div>
    <p className="text-[14px] text-gray-500 font-medium tracking-tight">
      No records to show
    </p>
  </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function PurchaseCartPage() {
  const [activeTab] = useState("All");

  // Layout made compatible for project structure,
  // with responsive max-w, min-h-screen, flex 1, etc.
  return (
    <div className="flex min-h-screen bg-white font-sans antialiased">
      {/* 1. Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. Global Header */}
        <DashboardHeader />

        {/* 3. Sub-header */}
        <div className="flex items-center gap-6 px-6 py-4 border-b border-gray-100 bg-white">
          <h1 className="text-[16px] font-bold text-[#303e67]">Purchase Cart</h1>
          <div className="flex items-center gap-2">
            <button className="px-4 py-1 rounded-full text-[12px] font-bold bg-[#2b6cee] text-white shadow-sm border border-[#2b6cee]">
              All
            </button>
          </div>
        </div>

        {/* 4. Data Table Area */}
        <main className="flex-1 p-8 max-w-[1600px]">
          <div className="overflow-x-auto">
            <div className="min-w-max">
              {/* Table Header Row */}
              <div className="flex items-center bg-[#2b6cee1a] border-b border-blue-100">
                <div className="w-4" />
                {TABLE_HEADERS.map((header, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-4 text-[14px] font-semibold text-[#303d50] whitespace-nowrap"
                    style={{
                      minWidth: "160px",
                      flex: "1",
                    }}
                  >
                    {header}
                  </div>
                ))}
              </div>
              {/* Table Body / Empty State */}
              <EmptyState />
            </div>
          </div>
        </main>
      </div>
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}