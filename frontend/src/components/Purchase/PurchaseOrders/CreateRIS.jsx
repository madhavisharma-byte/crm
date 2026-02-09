"use client";

import React, { useState } from "react";
import { Calendar, ChevronDown, ChevronRight } from "lucide-react";
import Sidebar from "../../(website)/Sidebar";
import DashboardHeader from "../../(website)/header";

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
        <div className="flex min-h-screen bg-white font-sans antialiased">
            {/* 1. Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                {/* 2. Global Header */}
                <DashboardHeader />

                {/* 3. Breadcrumb Header */}
                <div className="px-6 py-3 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-2 text-[14px]">
                        <span className="text-[#303e67] font-bold">Purchase Orders</span>
                        <ChevronRight size={14} className="text-gray-400" />
                        <span className="text-gray-400">Create Purchase Order</span>
                    </div>
                </div>

                {/* 4. Form Content */}
                <main className="flex-1 p-8 max-w-[1600px]">
                    <div className="space-y-12">

                        {/* Section 1: Basic Details */}
                        <section>
                            <FormSectionHeader
                                title="Basic Details"
                                description="Provide Expiry Date By Which This Purchase Order Is Valid. Additionally, You Can Provide Expected Delivery Date Too."
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <FormField label="Vendor Name" placeholder="Select Product Type" icon={ChevronDown} isSelect isRequired />
                                <FormField label="Agreement" placeholder="Select Vendor Agreement" icon={ChevronDown} isSelect />
                            </div>
                        </section>

                    </div>
                </main>
            </div>
        </div>
    );
}