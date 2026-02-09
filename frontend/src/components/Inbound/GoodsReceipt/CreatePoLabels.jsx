import React from "react";
import { ScanBarcode } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/header";

export default function POCreateLabel() {
    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar - Fixed Left, exactly as Putaway and Grns */}
            <Sidebar activePage="Goods Receipt" />

            {/* 2. Main Content Area (height/width/spacing same as Grns.jsx) */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* 2a. Global Header */}
                <DashboardHeader />

                {/* 3. Breadcrumb/Sub-header (Title, matching Grns.jsx style) */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-6">
                        <h1 className="text-[16px] font-bold text-[#303e67]">PO Create Label</h1>
                    </div>
                </div>

                {/* 4. Main Section (width/height/spacing from Grns.jsx) */}
                <main className="flex-1 p-8 max-w-[1600px]">
                    <div className="w-full max-w-lg">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Scan Purchase Order"
                                className="w-full bg-[#f8fafc] border border-gray-200 rounded-lg pl-4 pr-12 py-3 text-sm text-gray-700 outline-none focus:border-[#2b6cee] transition-all placeholder:text-[#94a3b8]"
                            />

                            {/* Barcode / Scan Icon */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none">
                                <ScanBarcode size={22} strokeWidth={1.5} />
                            </div>
                        </div>
                        <p className="mt-2 text-[13px] text-gray-400 font-medium ml-1">
                            Focus here and use a barcode scanner or type manually.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}