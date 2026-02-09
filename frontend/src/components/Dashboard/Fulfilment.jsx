import React from "react";

import DashboardHeader from "../(website)/Header";
import Sidebar from "../(website)/Sidebar";

import { RefreshCcw, Search, BarChart3, Package, Layers } from 'lucide-react';

// --- Data Constants ---

const FULFILLMENT_LEGENDS = [
  { label: 'PO RAISED', color: 'bg-indigo-800' },
  { label: 'PO TO BE RAISED', color: 'bg-red-700' },
  { label: 'PENDING PUTAWAYS', color: 'bg-emerald-600' }
];

const FULFILLMENT_HOURS_LEGEND = [
  { label: 'Pending since hours', color: 'bg-indigo-700' }
];

const SALE_ORDER_FLOW_LEGENDS = [...FULFILLMENT_LEGENDS];

const PENDING_SALE_ORDERS_LEGEND = [
  { label: 'Pending since hours', color: 'bg-indigo-700' }
];

const FULFILLMENT_HOURS_TICKS = ['0-6', '6-12', '12-18', '18-24', '24+'];

const PENDING_SALE_ORDERS_TICKS = [
  '0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14'
];

// --- Reusable Sub-Components ---

const RefreshHeader = ({ title }) => (
  <div className="flex justify-between items-center mb-4">
    <h3 className="text-lg font-bold text-slate-700">{title}</h3>
    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
      <span>Jan 7, 12:09 PM</span>
      <RefreshCcw size={12} className="cursor-pointer hover:rotate-180 transition-transform duration-500" />
    </div>
  </div>
);

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-5 h-3 rounded-full ${color}`} />
    <span className="text-[11px] font-semibold text-slate-600 uppercase">{label}</span>
  </div>
);

const ChartContainer = ({ title, legendItems, children }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col h-full">
    <RefreshHeader title={title} />
    {legendItems && (
      <div className="flex justify-end gap-6 mb-4 flex-wrap">
        {legendItems.map((item, idx) => (
          <LegendItem key={idx} color={item.color} label={item.label} />
        ))}
      </div>
    )}
    <div className="flex-1 flex flex-col items-center justify-center min-h-[250px] relative">
      {children}
    </div>
  </div>
);

const EmptyDataState = () => (
  <div className="flex flex-col items-center text-center py-10">
    <div className="bg-slate-100 p-4 rounded-lg mb-3">
       <Search className="text-slate-400" size={32} strokeWidth={1.5} />
    </div>
    <p className="text-sm font-medium text-slate-500">Data not available</p>
  </div>
);

const AxisGraphPlaceholder = ({ yLabel, xLabel, ticks }) => (
  <div className="w-full h-full flex flex-col">
    {/* Y-Axis Label and tick line */}
    <div className="flex-1 flex">
      <div className="w-10 relative">
         <span className="absolute -rotate-90 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 whitespace-nowrap">
           {yLabel}
         </span>
         <div className="absolute right-0 top-0 bottom-0 border-r border-slate-900" />
      </div>
      {/* Chart Plot Area */}
      <div className="flex-1 border-b border-slate-900 relative">
        <EmptyDataState />
      </div>
    </div>
    {/* X-Axis labels */}
    <div className="flex ml-10 pt-2 relative">
       {ticks.map((tick, i) => (
         <div key={i} className="flex-1 text-center text-[11px] font-bold text-slate-700">
           {tick}
         </div>
       ))}
       <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-bold text-slate-900">
         {xLabel}
       </span>
    </div>
  </div>
);

// --- Main Page Component ---

const DashboardFulfillment = () => {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="p-6 lg:p-8 space-y-8 font-sans antialiased">
          {/* 2x2 Responsive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Card 1: Fulfillment Empty State */}
            <ChartContainer 
              title="Fulfillment" 
              legendItems={FULFILLMENT_LEGENDS}
            >
              <div className="w-full border border-slate-100 rounded p-10 bg-slate-50/30">
                <EmptyDataState />
              </div>
            </ChartContainer>

            {/* Card 2: Fulfillment Hours Chart */}
            <ChartContainer 
              title="Fulfillment" 
              legendItems={FULFILLMENT_HOURS_LEGEND}
            >
              <AxisGraphPlaceholder 
                yLabel="Shipping Packages" 
                xLabel="Hours" 
                ticks={FULFILLMENT_HOURS_TICKS} 
              />
            </ChartContainer>

            {/* Card 3: Sale Order Flow */}
            <ChartContainer 
              title="Sale Order Flow" 
              legendItems={SALE_ORDER_FLOW_LEGENDS}
            >
              <div className="w-full border border-slate-100 rounded p-10 bg-slate-50/30">
                <EmptyDataState />
              </div>
            </ChartContainer>

            {/* Card 4: Pending Sale Orders Days Chart */}
            <ChartContainer 
              title="0 Pending Sale Orders" 
              legendItems={PENDING_SALE_ORDERS_LEGEND}
            >
              <AxisGraphPlaceholder 
                yLabel="Sale Orders" 
                xLabel="Days" 
                ticks={PENDING_SALE_ORDERS_TICKS} 
              />
            </ChartContainer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardFulfillment;