import React from "react";
import { RefreshCcw, Search } from "lucide-react";
import Sidebar from "../website/Sidebar";
import DashboardHeader from "../website/Header";

/* =======================
   CONSTANT DATA
======================= */

const LAST_UPDATED_AT = "Jan 7, 12:09 PM";

const DASHBOARD_CARDS = [
    {
        title: "Shipping Provider Returns",
        yLabel: "Count",
        xLabel: "Days",
        showGraph: true
    },
    {
        title: "Total Returns",
        yLabel: "Returns",
        xLabel: "Days",
        showGraph: true
    },
    {
        title: "Shipping Provider Returns Summary",
        showGraph: false
    },
    {
        title: "Channel Returns Summary",
        showGraph: false
    },
    {
        title: "Channel Wise Return Percent",
        showGraph: true
    },
    {
        title: "Top Returns SKU's Summary",
        showGraph: false
    },
    {
        title: "Returned Orders Details",
        showGraph: false
    }
];

const DAY_TICKS = ["0-6", "6-12", "12-18", "18-24", "24+"];

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

const DashboardCard = ({ title, yLabel, xLabel, showGraph }) => (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
        <CardHeader title={title} />
        <div className="flex-1">
            {showGraph ? (
                <div className="pb-8">
                    <GraphAxis
                        yLabel={yLabel || "Returns"}
                        xLabel={xLabel || "Days"}
                        ticks={DAY_TICKS}
                    />
                </div>
            ) : (
                <div className="h-[280px] flex items-center justify-center border border-dashed border-slate-100 rounded-lg bg-slate-50/30">
                    <EmptyDataState />
                </div>
            )}
        </div>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

/**
 * Responsive returns dashboard, sidebar fixed on all screens.
 * - Sidebar is always fixed (does not scroll with content)
 * - On small screens, content adapts below sidebar (vertical)
 * - On large screens, content is as before (sidebar left + content)
 */
const ReturnsDashboard = () => {
    return (
        <div className="min-h-screen font-sans antialiased bg-[#F1F5F9]">
            {/* Sidebar (fixed on all screens) */}
            <div
                className="
                    fixed
                    top-0
                    left-0
                    z-50
                    h-screen
                    w-16
                    lg:w-80
                    transition-all
                    duration-300
                "
                style={{
                    // shadow and background handled by Sidebar itself
                    // but needed for correct stacking
                }}
            >
                <Sidebar />
            </div>

            {/* Main Content wrapper */}
            <div
                className="
                    flex flex-col
                    min-h-screen
                    transition-all duration-300
                    relative
                    "
                // Responsive padding left
                style={{
                    paddingLeft: '4rem', // 16 in tailwind = 4rem, default sidebar width
                }}
            >
                {/* On large screens, increase the main container left padding to 20rem (w-80) */}
                <style>
                    {`
                    @media (min-width: 1024px) {
                        .main-content-padding {
                            padding-left: 20rem !important;
                        }
                    }
                    `}
                </style>

                {/* Trick: For easier CSS specificity, add a helper class */}
                <div className="main-content-padding flex flex-col min-h-screen">
                    <DashboardHeader />
                    <main
                        className="
                            flex-1
                            p-4
                            md:p-6
                            lg:p-10
                            space-y-8
                            md:space-y-10
                            w-full
                            max-w-[1600px]
                            mx-auto
                        "
                    >
                        <div
                            className="
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                xl:grid-cols-2
                                gap-6
                                md:gap-8
                            "
                        >
                            {DASHBOARD_CARDS.map((card, index) => (
                                <DashboardCard
                                    key={index}
                                    title={card.title}
                                    yLabel={card.yLabel}
                                    xLabel={card.xLabel}
                                    showGraph={card.showGraph}
                                />
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ReturnsDashboard;