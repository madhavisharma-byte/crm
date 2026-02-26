"use client";

import React, { useState } from "react";
import { Calendar, ChevronDown, ChevronRight } from "lucide-react";
import Sidebar from "../../website/Sidebar";
import DashboardHeader from "../../website/Header";

/* =======================
   REUSABLE COMPONENTS
======================= */

const FormSectionHeader = ({ title, description }) => (
    <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-6 bg-[#2b6cee]" />
            <h2 className="text-[16px] font-bold text-[#303d50] uppercase tracking-tight">
                {title}
            </h2>
        </div>
        <p className="text-[13px] text-gray-500 ml-4">{description}</p>
    </div>
);

// Enhanced FormField to support "date" type with calendar
const FormField = ({
    label,
    placeholder,
    type = "text",
    icon: Icon,
    isRequired = false,
    isSelect = false,
    value,
    onChange,
}) => (
    <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[13px] font-semibold text-[#303d50]">
            {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        <div className="relative group">
            {type === "date" ? (
                <>
                    <input
                        type="date"
                        value={value}
                        onChange={onChange}
                        className="w-full px-3 py-2 text-[14px] border border-gray-200 rounded-lg outline-none focus:border-[#2b6cee] transition-colors placeholder:text-gray-300"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <Calendar size={16} className="text-gray-400" />
                    </div>
                </>
            ) : (
                <>
                    <input
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        className={`w-full px-3 py-2 text-[14px] border border-gray-200 rounded-lg outline-none focus:border-[#2b6cee] transition-colors placeholder:text-gray-300 ${isSelect ? "cursor-pointer bg-white" : ""
                            }`}
                        readOnly={isSelect}
                    />
                    {Icon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Icon size={16} className="text-gray-400" />
                        </div>
                    )}
                </>
            )}
        </div>
    </div>
);

/* =======================
   MAIN PAGE
======================= */

export default function CreateRisPage() {
    // State for date fields
    const [createdDate, setCreatedDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [deliveryDate, setDeliveryDate] = useState("");

    return (
        <div
            className="
                relative min-h-screen bg-white font-sans antialiased w-full flex
            "
        >
            {/* 1. Sidebar */}
            {/* Responsive Sidebar: fixed for desktop, icon-rail for mobile/tablet */}
            <div
                className="
                    hidden lg:flex
                    flex-shrink-0
                    flex-col
                    h-screen
                    z-30
                "
            >
                <Sidebar />
            </div>
            <div
                className="
                    lg:hidden
                    fixed left-0 top-0 z-30
                    w-16
                    h-screen
                    flex flex-col
                "
            >
                <Sidebar />
            </div>
            <div
                className="
                    flex-1 flex flex-col min-w-0
                    transition-all
                    lg:pl-80 pl-16
                    md:pl-48
                    sm:pl-16
                "
            >
                {/* 2. Global Header */}
                <DashboardHeader />

                {/* 3. Breadcrumb Header */}
                <div className="px-3 sm:px-4 md:px-6 py-3 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-2 text-[14px]">
                        <span className="text-[#303e67] font-bold">Purchase Orders</span>
                        <ChevronRight size={14} className="text-gray-400" />
                        <span className="text-gray-400">Create Purchase Order</span>
                    </div>
                </div>

                {/* 4. Form Content */}
                <main className="flex-1 px-2 sm:px-4 md:px-8 py-4 md:py-8 max-w-[1600px] mx-auto w-full">
                    <div className="space-y-12">

                        {/* Section 1: Basic Details */}
                        <section>
                            <FormSectionHeader
                                title="Basic Details"
                                description="Provide Expiry Date By Which This Purchase Order Is Valid. Additionally, You Can Provide Expected Delivery Date Too."
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-4 md:gap-y-6">
                                <FormField label="Purchase Order Code" placeholder="Enter Purchase order code" isRequired />
                                <FormField label="Type" placeholder="Enter SKU Code" isRequired />
                                <FormField label="From Party" placeholder="Enter Product Name" isRequired />
                                <FormField
                                    label="Created Date"
                                    type="date"
                                    value={createdDate}
                                    onChange={e => setCreatedDate(e.target.value)}
                                    isRequired
                                />

                                <FormField
                                    label="Expiry Date"
                                    type="date"
                                    value={expiryDate}
                                    onChange={e => setExpiryDate(e.target.value)}
                                    isRequired
                                />
                                <FormField
                                    label="Delivery Date"
                                    type="date"
                                    value={deliveryDate}
                                    onChange={e => setDeliveryDate(e.target.value)}
                                    isRequired
                                />
                                <FormField label="Currency" placeholder="Enter Product Name" icon={ChevronDown} isSelect />
                                <FormField label="Enabled" placeholder="Enter Product Category" icon={ChevronDown} isSelect isRequired />
                            </div>
                        </section>

                        <div className="h-px bg-gray-100 w-full" />

                        {/* Section 2: Vendor Details */}
                        <section>
                            <FormSectionHeader
                                title="Vendor Details"
                                description="Type Name Or Code Of The Vendor"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                                <FormField label="Vendor Name" placeholder="Select Product Type" icon={ChevronDown} isSelect isRequired />
                                <FormField label="Agreement" placeholder="Select Vendor Agreement" icon={ChevronDown} isSelect />
                            </div>
                        </section>

                    </div>
                </main>
            </div>
            {/* Responsive custom scrollbar and sidebar paddings */}
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