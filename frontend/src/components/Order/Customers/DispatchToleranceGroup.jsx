"use client";

import React from "react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */

const TABLE_COLUMNS = [
    "Dispatch Tolerance Group Code",
    "Mapping Code",
    "Mapped with Customers",
    "Mapped with Channels",
    "Effective From",
    "Effective To",
    "Enabled",
    "Created",
    "Updated",
    "Action",
];

const EMPTY_STATE_IMG =
    "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHBhdHRlcm58ZW58MXx8fHwxNzY5NTg5NDMyfDA&ixlib=rb-4.1.0&q=80&w=1080";

/* =======================
   REUSABLE COMPONENTS
======================= */

const EmptyState = () => (
    <tr>
        <td colSpan={TABLE_COLUMNS.length}>
            <div className="flex flex-col items-center justify-center py-20 md:py-40 w-full h-[60vh]">
                <div className="w-24 h-24 md:w-32 md:h-32 mb-6 overflow-hidden rounded-lg">
                    <img
                        src={EMPTY_STATE_IMG}
                        alt="No records"
                        className="w-full h-full object-cover opacity-40 grayscale"
                    />
                </div>
                <p className="text-[13px] md:text-[14px] text-gray-500 font-medium text-center px-4">
                    No records to show
                </p>
            </div>
        </td>
    </tr>
);

/* =======================
   MAIN PAGE (Full Height Table)
======================= */

export default function DispatchToleranceGroupsPage() {
    return (
        <div className="relative bg-[#F8FAFC] min-h-screen w-full font-sans antialiased overflow-x-hidden">
            {/* Sidebar */}
            <aside className="fixed top-0 left-0 h-screen z-50">
                <Sidebar />
            </aside>

            {/* Content */}
            <div
                className={`
                    flex flex-col min-h-screen transition-all duration-300
                    pl-16 lg:pl-80
                    bg-white
                `}
            >
                {/* Global Header */}
                <DashboardHeader />

                {/* Sub-Header */}
                <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-200 bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3 md:gap-6 min-w-0">
                        <h1 className="text-[16px] md:text-[18px] font-bold text-[#303e67] truncate">
                            Dispatch Tolerance Groups
                        </h1>
                        <button className="px-3 py-1 md:px-4 md:py-1 rounded-full text-[11px] md:text-[12px] font-bold bg-[#2b6cee] text-white shadow-sm border border-[#2b6cee]">
                            All
                        </button>
                    </div>
                </div>

                {/* Table: Full Height, not in Card */}
                <div className="flex-1 w-full overflow-auto custom-scrollbar bg-white">
                    <table className="min-w-max w-full border-collapse">
                        <thead>
                            <tr className="bg-[#2b6cee1a] border-b border-blue-100">
                                {TABLE_COLUMNS.map((column, index) => (
                                    <th
                                        key={index}
                                        className="px-2 sm:px-4 md:px-6 py-3 md:py-4 text-[12px] md:text-[14px] font-semibold text-[#303d50] whitespace-nowrap text-left"
                                        style={{
                                            minWidth: column.length > 20 ? "180px" : "120px",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <EmptyState />
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Responsive Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }
                
                @media (min-width: 1024px) {
                    .lg\\:pl-80 { padding-left: 20rem !important; }
                }
                @media (max-width: 1023px) {
                    .lg\\:pl-80 { padding-left: 4rem !important; }
                }
                @media (max-width: 767px) {
                    .md\\:pl-48 { padding-left: 4rem !important; }
                    .sm\\:pl-16 { padding-left: 4rem !important; }
                }
                @media (max-width: 640px) {
                    .pl-16 { padding-left: 4rem !important; }
                    .sm\\:pl-16 { padding-left: 4rem !important; }
                }
            `}</style>
        </div>
    );
}