"use client";
import React from "react";
import { RefreshCcw, Search } from "lucide-react";
import Sidebar from "../website/Sidebar";
import DashboardHeader from "../website/Header";

// --- Data Constants ---
const TOP_METRICS = [
    { id: 1, title: "Total Counts of SKU's", timestamp: "Jan 7, 12:09 PM" },
    { id: 2, title: "Cost of Inventory", timestamp: "Jan 7, 12:09 PM" },
    { id: 3, title: "Out of Stock % of SKU's", timestamp: "Jan 7, 12:09 PM" },
    { id: 4, title: "Total Inventory", timestamp: "Jan 7, 12:09 PM" },
];

const SUMMARY_WIDGETS = [
    { id: 5, title: "Inventory Availability of Fast Moving SKUs", timestamp: "Jan 7, 12:09 PM" },
    { id: 6, title: "Products With Zero Order", timestamp: "Jan 7, 12:09 PM" },
];

// --- Sub-Components ---
const CardHeader = ({ title, timestamp }) => (
    <div className="flex justify-between items-start mb-4">
        <h3 className="text-[13px] font-bold text-[#3a4b63] leading-tight max-w-[70%] sm:max-w-full break-words">
            {title}
        </h3>
        <div className="flex items-center gap-1.5 text-gray-400">
            <span className="text-[10px] whitespace-nowrap">{timestamp}</span>
            <RefreshCcw size={12} className="cursor-pointer hover:text-blue-500" />
        </div>
    </div>
);

export default function InventoryDashboard() {
    return (
        <div className="relative bg-[#fcfcfc] min-h-screen w-full font-sans antialiased">
            {/* Fixed Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar />
            </div>
            {/* Responsive Content Layout */}
            <div
                className={`
                    flex flex-col min-h-screen
                    transition-all
                    lg:pl-80 pl-16
                    md:pl-48
                    sm:pl-16
                    bg-[#fcfcfc]
                `}
            >
                <DashboardHeader />
                {/* Responsive/Scrollable main content */}
                <div
                    className="
                        p-2 sm:p-4 md:p-6 space-y-4 sm:space-y-6 flex-1 min-h-0
                        overflow-y-auto custom-scrollbar
                        w-full
                        max-w-full lg:max-w-[1600px]
                    "
                    style={{
                        maxHeight: "calc(100vh - 64px)",
                    }}
                >
                    {/* Top Row: 4 Metric Cards */}
                    <div className="w-full grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {TOP_METRICS.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border border-gray-100 shadow-sm rounded-sm p-3 sm:p-4 flex flex-col h-full min-w-0"
                            >
                                <CardHeader title={item.title} timestamp={item.timestamp} />
                                <div className="flex-grow border border-gray-50 rounded flex items-center justify-center min-h-[80px] sm:min-h-[120px]">
                                    <span className="text-2xl sm:text-3xl font-light text-gray-800">-</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Row: 2 Large Summary Cards */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        {SUMMARY_WIDGETS.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border border-gray-100 shadow-sm rounded-sm p-3 sm:p-4 flex flex-col h-full min-w-0"
                            >
                                <CardHeader title={item.title} timestamp={item.timestamp} />
                                <div className="flex-grow border border-gray-50 rounded flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px] md:min-h-[280px]">
                                    {/* Mock Illustration */}
                                    <div className="relative mb-3">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#e8f1f8] rounded-md flex items-center justify-center border border-blue-100">
                                            <Search size={20} className="sm:size-[22px] text-blue-300" strokeWidth={1.5} />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#fff4eb] rounded-sm border border-orange-100 flex items-center justify-center">
                                            <div className="w-2 h-[1px] sm:w-2.5 bg-orange-200 rotate-45"></div>
                                        </div>
                                    </div>
                                    <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium">
                                        Data not available
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
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