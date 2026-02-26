"use client";

import React, { useState } from "react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

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
  <div className="flex flex-col items-center justify-center py-24 md:py-48 w-full">
    <div className="w-20 h-20 md:w-32 md:h-32 mb-4 opacity-40 grayscale flex items-center justify-center bg-slate-50 rounded-lg overflow-hidden">
      <img src={EMPTY_STATE_IMG} alt="No data" className="w-full h-full object-cover" />
    </div>
    <p className="text-[13px] md:text-[14px] text-gray-500 font-medium tracking-tight">
      No records to show
    </p>
  </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function PurchaseCartPage() {
  const [activeTab] = useState("All");

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
        {/* 2. Global Header */}
        <DashboardHeader />

        {/* 3. Sub-header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 px-3 sm:px-4 md:px-6 py-3 border-b border-gray-100 bg-white">
          <h1 className="text-base md:text-lg font-bold text-[#303e67]">Purchase Cart</h1>
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#2b6cee] text-white shadow-sm border border-[#2b6cee]">
              All
            </button>
          </div>
        </div>

        {/* 4. Data Table Area */}
        <main className="flex-1 p-3 sm:p-6 md:p-8 max-w-[1600px] w-full">
          <div className="overflow-x-auto">
            <div className="min-w-[600px] md:min-w-max">
              {/* Table Header Row */}
              <div className="hidden md:flex items-center bg-[#2b6cee1a] border-b border-blue-100">
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