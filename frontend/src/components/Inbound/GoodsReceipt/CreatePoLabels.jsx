import React from "react";
import { ScanBarcode } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

export default function POCreateLabel() {
    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar - Fixed Left, exactly as Putaway and Grns */}
            <Sidebar activePage="Goods Receipt" />

            {/* 2. Main Content Area (responsive height/width/spacing) */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* 2a. Global Header */}
                <DashboardHeader />

                {/* 3. Breadcrumb/Sub-header (responsive px/py) */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-3 sm:gap-6">
                        <h1 className="text-base sm:text-[16px] font-bold text-[#303e67]">PO Create Label</h1>
                    </div>
                </div>

                {/* 4. Main Section (responsive padding/width) */}
                <main className="flex-1 p-3 sm:p-6 md:p-8 w-full max-w-full md:max-w-[1600px]">
                    <div className="w-full max-w-sm xs:max-w-full sm:max-w-md md:max-w-lg mx-auto">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Scan Purchase Order"
                                className="
                                    w-full
                                    bg-[#f8fafc]
                                    border border-gray-200
                                    rounded-lg
                                    pl-4 pr-10 sm:pr-12
                                    py-2 sm:py-3
                                    text-sm text-gray-700
                                    outline-none
                                    focus:border-[#2b6cee]
                                    transition-all
                                    placeholder:text-[#94a3b8]
                                "
                            />

                            {/* Barcode / Scan Icon */}
                            <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none">
                                <ScanBarcode size={20} sm={undefined} strokeWidth={1.5} className="sm:size-[22px]" />
                            </div>
                        </div>
                        <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] text-gray-400 font-medium ml-0.5 sm:ml-1">
                            Focus here and use a barcode scanner or type manually.
                        </p>
                    </div>
                </main>
            </div>
            <style>{`
                @media (max-width: 640px) {
                    .sm\\:px-6 { padding-left: 1rem !important; padding-right: 1rem !important; }
                    .sm\\:py-4 { padding-top: 0.75rem !important; padding-bottom: 0.75rem !important; }
                    .sm\\:gap-6 { gap: 0.75rem !important; }
                    .sm\\:pr-12 { padding-right: 2.5rem !important; }
                    .sm\\:py-3 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
                    .sm\\:size-\\[22px\\] { width: 1.375rem; height: 1.375rem; }
                    .sm\\:text-\\[16px\\] { font-size: 1rem !important; }
                    .sm\\:mt-2 { margin-top: 0.5rem !important; }
                    .sm\\:ml-1 { margin-left: 0.25rem !important; }
                    .sm\\:text-\\[13px\\] { font-size: 13px !important; }
                    .sm\\:max-w-lg { max-width: 32rem !important; }
                }
                @media (max-width: 480px) {
                    .w-full.max-w-sm { max-width: 100% !important; }
                    .xs\\:max-w-full { max-width: 100% !important; }
                }
            `}</style>
        </div>
    );
}