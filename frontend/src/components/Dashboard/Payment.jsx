"use client";
import React from 'react';
import { RefreshCcw, Search } from 'lucide-react';
import Sidebar from '../website/Sidebar';
import DashboardHeader from '../website/Header';

// --- Data Constant ---
const PAYMENT_WIDGETS = [
    { id: 1, title: "Received Payment", timestamp: "Jan 7, 12:09 PM" },
    { id: 2, title: "Outstanding Payment", timestamp: "Jan 7, 12:09 PM" },
    { id: 3, title: "Channel Settlement Summary", timestamp: "Jan 7, 12:09 PM" },
    { id: 4, title: "Total Outstanding Order Value", timestamp: "Jan 7, 12:09 PM" },
];

// --- Sub-Component for the Card ---
const PaymentCard = ({ title, timestamp }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm flex flex-col h-full">
            {/* Header Area */}
            <div className="px-4 py-3 flex justify-between items-center">
                <h3 className="text-[13px] font-bold text-[#44546a]">
                    {title}
                </h3>
                <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-[10px] font-medium">{timestamp}</span>
                    <RefreshCcw size={12} className="cursor-pointer hover:text-blue-500 transition-transform active:rotate-180" />
                </div>
            </div>

            {/* Content Area with Inner Border */}
            <div className="px-4 pb-4 flex-grow">
                <div className="w-full h-full min-h-[260px] border border-gray-100 rounded flex flex-col items-center justify-center bg-white">

                    {/* Illustration Mockup (Folder + Magnifying Glass) */}
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

                    <p className="text-[11px] text-gray-400 font-medium">Data not available</p>
                </div>
            </div>
        </div>
    );
};

export default function PaymentDashboard() {
    return (
        <div className="flex min-h-screen bg-[#fcfcfc] font-sans antialiased">
            <Sidebar />

            <div className="flex-1 flex flex-col min-h-screen">
                {/* Use DashboardHeader to align with project style */}
                <DashboardHeader />

                <main className="p-6 space-y-6 max-w-[1600px]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {PAYMENT_WIDGETS.map((widget) => (
                            <PaymentCard
                                key={widget.id}
                                title={widget.title}
                                timestamp={widget.timestamp}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}