"use client";
import React from "react";
import { RefreshCcw, Search } from "lucide-react";
import Sidebar from "../(website)/Sidebar";
import DashboardHeader from "../(website)/Header";

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
        <h3 className="text-[13px] font-bold text-[#3a4b63] leading-tight max-w-[70%]">
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
        <div className="flex min-h-screen bg-[#fcfcfc] font-sans antialiased">
            <Sidebar />

            <div className="flex-1 flex flex-col min-h-screen">
                <DashboardHeader />

                <main className="p-6 space-y-6 max-w-[1600px]">
                    {/* Top Row: 4 Metric Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {TOP_METRICS.map((item) => (
                            <div key={item.id} className="bg-white border border-gray-100 shadow-sm rounded-sm p-4 flex flex-col h-full">
                                <CardHeader title={item.title} timestamp={item.timestamp} />
                                <div className="flex-grow border border-gray-50 rounded flex items-center justify-center min-h-[120px]">
                                    <span className="text-3xl font-light text-gray-800">-</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Row: 2 Large Summary Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {SUMMARY_WIDGETS.map((item) => (
                            <div key={item.id} className="bg-white border border-gray-100 shadow-sm rounded-sm p-4 flex flex-col h-full">
                                <CardHeader title={item.title} timestamp={item.timestamp} />
                                <div className="flex-grow border border-gray-50 rounded flex flex-col items-center justify-center min-h-[280px]">
                                    {/* Mock Illustration */}
                                    <div className="relative mb-3">
                                        <div className="w-14 h-14 bg-[#e8f1f8] rounded-md flex items-center justify-center border border-blue-100">
                                            <Search size={22} className="text-blue-300" strokeWidth={1.5} />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#fff4eb] rounded-sm border border-orange-100 flex items-center justify-center">
                                            <div className="w-2.5 h-[1px] bg-orange-200 rotate-45"></div>
                                        </div>
                                    </div>
                                    <p className="text-[11px] text-gray-400 font-medium">Data not available</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}