"use client";

import React, { useState } from "react";
import {
    Filter, Upload, Download, Plus,
    ChevronDown, ChevronRight, Calendar,
    Trash2, Info, Search, Bell
} from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   CONSTANT DATA
======================= */
const FILTER_TABS = ["Pending", "Unverified", "Cancelled", "All", "Failed", "Putback Pending"];
const TABLE_HEADERS = ["Order", "Created At", "Channel", "Customer", "Status", "Payment", "on Hold", "Products", "Channel Created At"];

export default function OrdersPage() {
    // Views: 'list', 'create-order', 'create-pos'
    const [view, setView] = useState("list");
    const [activeTab, setActiveTab] = useState("Pending");

    // For date fields
    const [orderDate, setOrderDate] = useState("");
    const [channelProcessingDate, setChannelProcessingDate] = useState("");

    // --- REUSABLE UI COMPONENTS ---

    const SectionHeader = ({ title, subtitle }) => (
        <div className="mb-6">
            <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-[#2b6cee] rounded-full" />
                <h2 className="text-[15px] font-bold text-[#303e67] uppercase tracking-wide">{title}</h2>
            </div>
            {subtitle && <p className="text-[12px] text-gray-400 mt-1 ml-4 font-medium">{subtitle}</p>}
        </div>
    );

    const FormInput = ({ label, required, placeholder, type = "text", icon: Icon, isSelect, ...rest }) => (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-[12px] font-bold text-slate-500">
                {label} {required && <span className="text-red-500 font-bold">*</span>}
            </label>
            <div className="relative">
                {isSelect ? (
                    <select className="w-full h-[38px] border border-slate-200 rounded-lg px-3 text-[13px] bg-white appearance-none outline-none focus:border-[#2b6cee] text-slate-400 font-medium">
                        <option>{placeholder}</option>
                    </select>
                ) : (
                    <input
                        type={type}
                        placeholder={placeholder}
                        className="w-full h-[38px] border border-slate-200 rounded-lg px-3 text-[13px] outline-none focus:border-[#2b6cee] placeholder:text-slate-300 font-medium text-slate-600"
                        {...rest}
                    />
                )}
                {(Icon || isSelect) && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        {isSelect ? <ChevronDown size={14} /> : <Icon size={16} />}
                    </div>
                )}
            </div>
        </div>
    );

    // --- VIEW: LIST PAGE ---
    const ListView = () => (
        <div className="flex flex-col animate-in fade-in duration-300">
            <div className="sticky top-0 z-20 bg-white border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 md:px-6 py-3">
                <div className="flex items-center gap-4 min-w-0">
                    <h1 className="text-lg font-bold text-slate-800">Orders</h1>
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                        {FILTER_TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap transition-all ${activeTab === tab ? "bg-[#2b6cee] text-white border-[#2b6cee]" : "bg-white text-slate-400 border-slate-200 hover:border-[#2b6cee]"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                    <button className="flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50"><Filter size={16} /> Filter</button>
                    <div className="flex gap-1">
                        <button className="p-2 border rounded-lg text-[#2b6cee] hover:bg-blue-50"><Upload size={18} /></button>
                        <button className="p-2 border rounded-lg text-[#2b6cee] hover:bg-blue-50"><Download size={18} /></button>
                    </div>
                    <button onClick={() => setView("create-pos")} className="bg-[#2b6cee] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all">Create POS</button>
                    <button onClick={() => setView("create-order")} className="bg-[#2b6cee] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm flex items-center gap-1 transition-all">
                        <Plus size={18} /> Create
                    </button>
                </div>
            </div>

            <main className="p-4 md:p-6">
                <div className="overflow-x-auto border border-slate-100 rounded-xl bg-white shadow-sm">
                    <table className="w-full text-left min-w-[1000px]">
                        <thead className="bg-[#e9f0fe]">
                            <tr>
                                <th className="p-4 w-12"><div className="w-4 h-4 rounded-full border bg-white" /></th>
                                {TABLE_HEADERS.map((h, i) => (
                                    <th key={i} className="px-4 py-4 text-xs font-bold text-[#303d50] uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={10} className="py-32 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="w-32 h-32 bg-slate-50 rounded-2xl border flex items-center justify-center mb-4">
                                            <div className="w-16 h-12 bg-orange-100 border border-orange-200 rounded flex items-center justify-center">
                                                <Plus className="text-[#2b6cee]" size={24} />
                                            </div>
                                        </div>
                                        <p className="text-slate-400 font-medium">No records to show</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );

    // --- CREATE POS / CREATE ORDER FORM VIEW ---
    const FormView = () => {
        const isPOS = view === 'create-pos';

        return (
            <div className="flex flex-col bg-[#F8FAFC] min-h-screen animate-in slide-in-from-right duration-300">
                {/* Breadcrumb Header */}
                <div className="px-6 py-4 bg-white border-b flex items-center gap-2 text-[13px]">
                    <span className="text-slate-400 cursor-pointer font-medium hover:text-[#2b6cee]" onClick={() => setView("list")}>Orders</span>
                    <ChevronRight size={14} className="text-slate-300" />
                    <span className="font-bold text-slate-700">{isPOS ? "Create POS" : "Create Order"}</span>
                </div>

                <div className="p-4 md:p-8 space-y-8 max-w-[1500px]">

                    {/* 1. BASIC DETAILS - Logic adjusted for POS image */}
                    <section className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <SectionHeader title="Basic Details" subtitle="Auto Generated Code Is For Your Internal Purpose, While The Other Code Is Displayed To Customer" />

                        {!isPOS && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="flex items-center gap-2 text-[12px] font-bold text-slate-500">
                                        <input type="checkbox" className="rounded w-4 h-4 accent-[#2b6cee]" /> Auto Generated Order Code
                                    </label>
                                    <input placeholder="e.g alpha/numeric" className="h-[38px] border rounded-lg px-3 text-[13px] outline-none focus:border-[#2b6cee] text-slate-600 font-medium" />
                                </div>
                                <FormInput label="Display Order Code(Optional)" placeholder="e.g alpha/numeric" />
                                <FormInput label="Channel" required placeholder="CUSTOM" isSelect />
                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-[12px] font-bold text-slate-500">Order date <span className="text-red-500 font-bold">*</span></label>
                                    <div className="relative">
                                        <input type="date" value={orderDate} onChange={e => setOrderDate(e.target.value)} className="w-full h-[38px] border border-slate-200 rounded-lg px-3 pr-10 text-[13px] outline-none focus:border-[#2b6cee] font-medium text-slate-600 bg-white" />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Calendar size={16} /></div>
                                    </div>
                                </div>
                                <FormInput label="Payment Mode" required placeholder="Select an option" isSelect />
                                <FormInput label="Currency(Optional)" placeholder="INR - Indian Rupee" />
                                <div className="flex flex-col gap-1.5 w-full">
                                    <label className="text-[12px] font-bold text-slate-500">Channel Processing Time (Optional)</label>
                                    <div className="relative">
                                        <input type="date" value={channelProcessingDate} onChange={e => setChannelProcessingDate(e.target.value)} className="w-full h-[38px] border border-slate-200 rounded-lg px-3 pr-10 text-[13px] outline-none focus:border-[#2b6cee] font-medium text-slate-600 bg-white" />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Calendar size={16} /></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>

                    {/* 2. CUSTOMER DETAILS - Adjusted for Create POS image (6 fields + Checkbox) */}
                    <section className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <SectionHeader title="Customer Details" subtitle="Type Name Or Code Of Customer. Rest Of The Fields Will Be Populated Automatically, This Address, Email & Phone No. Is Used To Communicate Order Information To Customer." />

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <FormInput label="Customer Code" placeholder="e.g. name or code" isSelect />
                            <FormInput label="Customer Name(Optional)" placeholder="e.g. name" />
                            <FormInput label="Notification Email (Optional)" placeholder="e.g. abc@xyz.com" />
                            <FormInput label="Notification Mobile (Optional)" placeholder="e.g. 9999999999" />
                            <FormInput label="Payment By (Optional)" placeholder="Select option" isSelect />
                            <FormInput label="GSTIN (Optional)" placeholder="GSTIN" />
                        </div>

                        <label className="flex items-center gap-3 mt-8 text-sm text-slate-500 font-medium">
                            <input type="checkbox" className="w-[18px] h-[18px] rounded border-slate-300 accent-[#2b6cee]" />
                            Uncheck to fill the address details manually
                        </label>
                    </section>

                    {/* 3. BILLING ADDRESS - Completely removed for POS as per image */}
                    {!isPOS && (
                        <section className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                            <SectionHeader title="Billing Address" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <FormInput label="Name" placeholder="Select Product Type" isSelect />
                                <FormInput label="Address Line 1" placeholder="Address Line 1" />
                                <FormInput label="Address Line 2 (optional)" placeholder="Address Line 1" />
                                <FormInput label="Country" required placeholder="India" isSelect />
                                <FormInput label="State" required placeholder="Select State" isSelect />
                                <FormInput label="City" required placeholder="City" />
                                <FormInput label="District (Optional)" placeholder="City" />
                                <FormInput label="Pin Code" required placeholder="City" />
                                <FormInput label="Phone" required placeholder="Select State" isSelect />
                                <FormInput label="Latitude" required placeholder="City" />
                                <FormInput label="Longitude" required placeholder="City" />
                                <FormInput label="Email (Optional)" placeholder="City" />
                            </div>
                        </section>
                    )}

                    {/* 4. ITEM DETAILS */}
                    <section className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                            <SectionHeader title="Item Details" subtitle="Type First 2 Characters Of Name Or Item Sku Of Order Item In Order-Item Dropdown And Fill Rest Of Details Or You Can Also Import The List Of Order Items By Clicking Import Via CSV Link." />
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 uppercase tracking-tighter">
                                    <span>Discount(₹)</span>
                                    <div className="w-10 h-[22px] bg-slate-300/50 rounded-full relative cursor-pointer"><div className="w-[18px] h-[18px] bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" /></div>
                                    <span>Discount(%)</span>
                                </div>
                                <button className="flex items-center gap-1.5 text-[#2b6cee] text-[11px] font-bold uppercase hover:underline transition-all"><Upload size={14} /> Import via CSV</button>
                            </div>
                        </div>

                        <div className="overflow-x-auto rounded-lg border border-slate-100">
                            <table className="w-full text-[13px] text-slate-600">
                                <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[11px] border-b">
                                    <tr>
                                        <th className="p-3 border-r w-12 text-center">#</th>
                                        <th className="p-3 border-r text-left min-w-[220px]">Item SKU Code</th>
                                        <th className="p-3 border-r text-center">Inventory</th>
                                        <th className="p-3 border-r text-center">Units</th>
                                        <th className="p-3 border-r text-center">MRP (₹)</th>
                                        <th className="p-3 border-r text-center">Selling Price (₹)</th>
                                        <th className="p-3 border-r text-center">Discount (₹)</th>
                                        <th className="p-3 border-r text-center">Net Selling Price (₹)</th>
                                        <th className="p-3 border-r text-center">Sub-Total (₹)</th>
                                        <th className="p-3 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                        <td className="p-3 border-r text-center font-bold text-slate-400">1</td>
                                        <td className="p-3 border-r"><div className="border border-slate-200 rounded-lg h-[36px] flex justify-between items-center px-3 text-slate-400"><span>Name Or SKU Code</span><ChevronDown size={14} /></div></td>
                                        <td className="p-3 border-r text-center">0</td>
                                        <td className="p-3 border-r"><div className="border border-slate-200 rounded-lg h-[36px] flex justify-between items-center px-3 text-slate-400"><span>Units</span><ChevronDown size={14} /></div></td>
                                        <td className="p-3 border-r text-center">0</td>
                                        <td className="p-3 border-r"><input className="border border-slate-200 rounded-lg h-[36px] w-full px-2 text-center" defaultValue="0" /></td>
                                        <td className="p-3 border-r"><input className="border border-slate-200 rounded-lg h-[36px] w-full px-2 text-center" defaultValue="0" /></td>
                                        <td className="p-3 border-r text-center">0</td>
                                        <td className="p-3 border-r text-center">0</td>
                                        <td className="p-3 text-center text-red-500 font-bold cursor-pointer hover:bg-red-50 transition-colors">Delete</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="w-full py-3.5 text-[#2b6cee] font-bold text-[13px] border-t bg-white transition-colors">+ Add Another Item</button>
                        </div>

                        {/* Summary Area */}
                        <div className="mt-12 flex flex-col lg:flex-row justify-between items-start gap-12">
                            <div className="flex items-start gap-3 bg-blue-50/50 p-5 rounded-xl max-w-lg border border-blue-100/50">
                                <Info size={18} className="text-[#2b6cee] shrink-0 mt-1" />
                                <p className="text-[12px] text-slate-500 leading-relaxed font-medium italic">Final amount includes all applicable taxes and shipping fees. Verify all details before creating the order.</p>
                            </div>
                            <div className="w-full lg:w-[320px] space-y-4">
                                <div className="flex justify-between text-[14px] text-slate-500 font-medium"><span>Subtotal</span><span>₹0.00</span></div>
                                <div className="flex justify-between text-[14px] text-green-500 font-bold"><span>Discount</span><span>-₹0.00</span></div>
                                <div className="flex justify-between text-[14px] text-slate-500 font-medium"><span>Gift wrap Charge</span><span>₹0.00</span></div>
                                <div className="flex justify-between text-[14px] text-slate-500 font-medium"><span>Shipping Charges</span><span>₹0.00</span></div>
                                <div className="flex justify-between text-[18px] font-black text-slate-800 border-t pt-4 mt-2"><span>Payable</span><span>₹0.00</span></div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sticky Form Footer */}
                <div className="sticky bottom-0 w-full bg-[#f1f5f9] border-t border-slate-200 p-4 flex justify-end gap-3 px-10 z-30">
                    <button onClick={() => setView("list")} className="px-10 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-500 bg-white hover:bg-slate-50">Cancel</button>
                    <button className="px-10 py-2 bg-[#2b6cee] text-white rounded-lg text-sm font-bold shadow-lg">
                        {isPOS ? "Create Invoice" : "Create Order"}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="relative min-h-screen bg-white font-sans antialiased">
            <aside className="fixed top-0 left-0 h-screen z-50 overflow-hidden"><Sidebar activePage="orders" /></aside>
            <div className="flex flex-col min-h-screen pl-16 lg:pl-80 transition-all duration-300">
                <DashboardHeader />
                {view === "list" ? <ListView /> : <FormView />}
            </div>
            <style jsx global>{`.no-scrollbar::-webkit-scrollbar { display: none; }.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </div>
    );
}