"use client";
import React from "react";
import { RefreshCcw, Search } from "lucide-react";
import Sidebar from "../website/Sidebar";
import DashboardHeader from "../website/Header";

// --- Data Constant ---
const PAYMENT_WIDGETS = [
    { id: 1, title: "Received Payment", timestamp: "Jan 7, 12:09 PM" },
    { id: 2, title: "Outstanding Payment", timestamp: "Jan 7, 12:09 PM" },
    { id: 3, title: "Channel Settlement Summary", timestamp: "Jan 7, 12:09 PM" },
    { id: 4, title: "Total Outstanding Order Value", timestamp: "Jan 7, 12:09 PM" }
];

// --- Sub-Component for the Card ---
const PaymentCard = ({ title, timestamp }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col h-full min-w-[220px] sm:min-w-[300px]">
            <div className="px-4 py-3 flex justify-between items-center">
                <h3 className="text-[13px] md:text-base font-bold text-[#44546a]">
                    {title}
                </h3>
                <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-[10px] md:text-xs font-medium">{timestamp}</span>
                    <RefreshCcw size={12} className="cursor-pointer hover:text-blue-500 transition-transform active:rotate-180" />
                </div>
            </div>
            <div className="px-4 pb-4 flex-grow">
                <div className="w-full h-full min-h-[180px] md:min-h-[260px] border border-gray-100 rounded flex flex-col items-center justify-center bg-white">
                    {/* Illustration mockup for no data */}
                    <div className="relative mb-3">
                        {/* The folder/box base */}
                        <div className="w-14 h-10 bg-[#ffe8d6] border border-[#f3d6bc] rounded-sm relative">
                            <div className="absolute -top-1 left-0 w-6 h-1.5 bg-[#f3d6bc] rounded-t-sm"></div>
                        </div>
                        {/* The magnifying glass icon */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/40 rounded-full flex items-center justify-center">
                            <div className="w-10 h-10 bg-[#dbeafe] rounded shadow-sm border border-blue-100 flex items-center justify-center">
                                <Search size={20} className="text-blue-400" strokeWidth={1.5} />
                            </div>
                        </div>
                    </div>
                    <p className="text-[11px] md:text-sm text-gray-400 font-medium">Data not available</p>
                </div>
            </div>
        </div>
    );
};

export default function PaymentDashboard() {
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
                        p-2 sm:p-4 md:p-6 space-y-4 md:space-y-8 flex-1 min-h-0
                        overflow-y-auto custom-scrollbar
                        w-full
                    "
                    style={{
                        maxHeight: "calc(100vh - 64px)",
                    }}
                >
                    <div className="grid gap-3 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                        {PAYMENT_WIDGETS.map((widget) => (
                            <PaymentCard
                                key={widget.id}
                                title={widget.title}
                                timestamp={widget.timestamp}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
                .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }
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