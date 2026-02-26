import React from "react";
import { RefreshCcw, Search } from "lucide-react";
import Sidebar from "../website/Sidebar";
import DashboardHeader from "../website/Header";

/* =======================
   CONSTANT DATA
======================= */

const LAST_UPDATED_AT = "Jan 7, 12:09 PM";

const DAY_TICKS = ["0-6", "6-12", "12-18", "18-24", "24+"];

const DASHBOARD_CARDS = [
    {
        title: "0 Pending Purchase Order Items",
        yLabel: "Sale Order Items",
        xLabel: "Days",
        showGraph: true
    },
    {
        title: "0 Pending Purchase Order Items",
        yLabel: "Purchase Order Items",
        xLabel: "Days",
        showGraph: true
    },
    {
        title: "Top Performing Vendors",
        showGraph: false
    },
    {
        title: "Worst Performing Vendors",
        showGraph: false
    }
];

/* =======================
   REUSABLE COMPONENTS
======================= */

const CardHeader = ({ title }) => (
    <div className="flex justify-between items-center mb-6">
        <h3 className="text-[15px] font-bold text-slate-700 tracking-tight">
            {title}
        </h3>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <span>{LAST_UPDATED_AT}</span>
            <RefreshCcw
                size={12}
                className="cursor-pointer hover:rotate-180 transition-transform duration-500 text-slate-500"
            />
        </div>
    </div>
);

const EmptyDataState = () => (
    <div className="flex flex-col items-center justify-center py-10 opacity-60">
        <div className="bg-slate-100 p-3 rounded-lg mb-3 shadow-inner">
            <Search className="text-slate-400" size={28} strokeWidth={1.5} />
        </div>
        <p className="text-[13px] font-medium text-slate-500">
            Data not available
        </p>
    </div>
);

const GraphAxis = ({ yLabel, xLabel, ticks }) => (
    <div className="w-full h-[220px] flex flex-col mt-2">
        <div className="flex-1 flex">
            <div className="w-10 relative flex items-center justify-center">
                <span className="absolute -rotate-90 text-[10px] font-bold text-slate-400 whitespace-nowrap">
                    {yLabel}
                </span>
                <div className="absolute right-0 top-0 bottom-0 border-r border-slate-300" />
            </div>

            <div className="flex-1 border-b border-slate-300 relative flex items-center justify-center">
                <EmptyDataState />
            </div>
        </div>

        <div className="flex ml-10 pt-3 relative">
            {ticks.map((tick, i) => (
                <div
                    key={i}
                    className="flex-1 text-center text-[10px] font-bold text-slate-500"
                >
                    {tick}
                </div>
            ))}
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-bold text-slate-800 tracking-wide uppercase">
                {xLabel}
            </span>
        </div>
    </div>
);

const DashboardCard = ({ title, children }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
        <CardHeader title={title} />
        <div className="flex-1">{children}</div>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

const PurchaseDashboard = () => {
    return (
        <div className="relative min-h-screen font-sans antialiased bg-[#F1F5F9]">
            {/* Fixed Sidebar for all screen sizes */}
            <div className="fixed inset-y-0 left-0 z-40">
                <Sidebar />
            </div>

            {/* Main content wrapper with left margin (responsive to sidebar) */}
            <div
                className={`
                    flex flex-col min-h-screen transition-all
                    // Large screen: keep space as before, small screen: adapt
                    lg:ml-80 ml-16
                `}
            >
                <DashboardHeader />

                <main
                    className={`
                        flex-1 p-3 xs:p-4 sm:p-6 lg:p-10 space-y-8 sm:space-y-10
                        w-full
                        transition-all
                    `}
                    style={{
                        minHeight: 0,
                        // extra right space for stretch in xs, mobile
                        // overflow scrolling enabled here for mobile/tablet etc.
                        overflow: "auto",
                        // keep sidebar always visible by scrolling only content
                        // sidebar is fixed, this scrolls under it
                    }}
                >
                    <div
                        className="
                            grid grid-cols-1 
                            lg:grid-cols-2
                            gap-6 sm:gap-8 
                            max-w-full lg:max-w-[1600px] mx-auto
                        "
                    >
                        {DASHBOARD_CARDS.map((card, index) => (
                            <DashboardCard key={index} title={card.title}>
                                {card.showGraph ? (
                                    <div className="pb-8">
                                        <GraphAxis
                                            yLabel={card.yLabel}
                                            xLabel={card.xLabel}
                                            ticks={DAY_TICKS}
                                        />
                                    </div>
                                ) : (
                                    <div className="h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px] flex items-center justify-center border border-dashed border-slate-100 rounded-lg bg-slate-50/30">
                                        <EmptyDataState />
                                    </div>
                                )}
                            </DashboardCard>
                        ))}
                    </div>
                </main>
            </div>
            {/* Responsive Styles */}
            <style>{`
                /* xs: mobile, sm: small tablets */
                @media (max-width: 1024px) {
                    /* main content should have margin-left as sidebar width for small screens */
                    .ml-16 { margin-left: 4rem !important; }
                }
                @media (max-width: 640px) {
                    .p-3 { padding: 0.75rem !important; }
                    .xs\\:p-4 { padding: 1rem !important; }
                }
                @media (max-width: 390px) {
                    .p-3, .xs\\:p-4, .sm\\:p-6, .lg\\:p-10  { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
                }
            `}</style>
        </div>
    );
};

export default PurchaseDashboard;
