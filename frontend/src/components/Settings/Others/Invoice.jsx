import React, { useState } from 'react';
import {
    Search, Bell, ChevronDown, User as UserIcon, Check
} from 'lucide-react';
import Sidebar from '../../website/Sidebar';
import Header from '../../website/Header'; // Import header component

const InvoiceTemplatePage = () => {
    const [activeTab, setActiveTab] = useState('Template Format');

    const tabs = [
        'Template Format',
        'Item Details',
        'Oder Details',
        'SellerBuyer Information'
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Template Format': return <TemplateFormatTab />;
            case 'Item Details': return <ItemDetailsTab />;
            case 'Oder Details': return <OrderDetailsTab />;
            case 'SellerBuyer Information': return <SellerBuyerInfoTab />;
            default: return null;
        }
    };

    return (
        <div className="relative bg-white min-h-screen w-full font-sans flex flex-col lg:flex-row">
            {/* Sidebar - Responsive: show/hide/collapse if needed */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 hidden lg:flex">
                <Sidebar activePage="invoice-templates" />
            </div>
            {/* Mobile sidebar placeholder: implement slide-over if needed */}
            {/* Empty for now */}

            {/* Responsive Content Layout */}
            <div
                className={`
                    flex flex-col min-h-screen flex-1
                    transition-all
                    lg:pl-80 pl-0
                    md:pl-48
                    sm:pl-16
                    bg-white
                `}
            >
                {/* 1. TOP NAVBAR */}
                <Header />

                {/* 2. PAGE HEADER */}
                <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex items-center bg-white flex-shrink-0">
                    <h1 className="text-base font-bold text-[#334155] tracking-tight">Invoice Template</h1>
                </div>

                {/* 3. TAB NAVIGATION */}
                <div className="px-4 sm:px-6 py-4 flex-shrink-0">
                    <div className="flex flex-wrap gap-2 sm:gap-0 sm:inline-flex items-center border border-blue-400 rounded-lg p-1 bg-white">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 sm:px-6 py-2 text-[13px] font-semibold rounded-md transition-all ${activeTab === tab ? 'bg-[#3b82f6] text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 4. CONTENT AREA */}
                <div className="flex-1 overflow-auto bg-white px-2 sm:px-6 pb-4 sm:pb-6">
                    {renderTabContent()}
                </div>
            </div>
            <style>{`
                @media (max-width: 1023px) {
                    /* Sidebar switches to overlay/drawer, main content pl-0 */
                    .lg\\:pl-80 { padding-left: 0 !important; }
                }
                @media (max-width: 767px) {
                    .md\\:pl-48, .sm\\:pl-16 { padding-left: 0 !important; }
                }
            `}</style>
        </div>
    );
};

// --- SUB-COMPONENTS FOR TABS ---

const TemplateFormatTab = () => (
    <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-10 h-full">
        <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
                { name: 'Type GST', variant: '(Portrait)' },
                { name: 'Type B', variant: '(Portrait)' },
                { name: 'Type A', variant: '(Portrait)' }
            ].map((type, i) => (
                <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                    <div className="border border-slate-200 rounded-sm overflow-hidden bg-white shadow-sm group-hover:border-blue-400 transition-all">
                        <img src={`https://via.placeholder.com/150x200?text=Invoice+${type.name}`} alt={type.name} className="w-full grayscale opacity-80" />
                    </div>
                    <div className="text-center">
                        <p className="text-[13px] font-bold text-slate-700">{type.name}</p>
                        <p className="text-[12px] text-slate-500">{type.variant}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="w-full lg:w-1/2 min-h-[200px] bg-[#0a0f18] rounded-xl p-4 sm:p-8 flex items-center justify-center mb-4 lg:mb-0">
            <div className="w-full h-full bg-white rounded shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px]">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
                <p className="text-slate-400 font-bold text-lg sm:text-xl relative z-10">Template Preview</p>
            </div>
        </div>
    </div>
);

const CheckboxGroup = ({ title, items }) => (
    <div className="space-y-6">
        {title && <h3 className="text-[15px] font-bold text-slate-800">{title}</h3>}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 sm:gap-x-12">
            {items.map((item, i) => (
                <label key={i} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-5 h-5 border-2 border-slate-300 rounded flex items-center justify-center group-hover:border-blue-400 transition-colors">
                        {/* Optional logic for checked state */}
                    </div>
                    <span className="text-[13px] font-medium text-slate-600">{item}</span>
                </label>
            ))}
        </div>
    </div>
);

const ItemDetailsTab = () => (
    <CheckboxGroup
        title="Fields to be shown"
        items={[
            "Product Name", "Total Discount", "Custom Field 1", "IMEI", "Gift Wrap Charges", "Custom Field 2",
            "Channel SKU Code", "Store Credit", "Custom Field 3", "Discount", "Show bundled items", "Declaration",
            "Tax", "Description", "Brand", "Part No", "Color", "Vendor Batch Code", "Size", "MFD",
            "Product Description", "Expiry", "Product SKU Code", "QTY", "Carrier Name", "Batch Code",
            "Channel Product ID", "Category"
        ]}
    />
);

const OrderDetailsTab = () => (
    <div className="space-y-8">
        <div className="w-full max-w-md space-y-2">
            <label className="text-[13px] font-bold text-slate-700">Invoice Label<span className="text-red-500">*</span></label>
            <div className="relative">
                <select className="w-full appearance-none bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] text-slate-400 focus:outline-none">
                    <option>Please Select</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
        </div>
        <CheckboxGroup items={[
            "Invoice Barcode", "Order Number Barcode", "Channel Name", "Shipping Charges", "COD Charges", "Prepaid Amount",
            "Total VAT/CST On Sale", "Amount In Words", "Shipping Charges Tax", "Ship Date", "Additional Tax", "Payment Method",
            "Display Tax Summary", "HSN Summary", "Payable Line", "Tax Payable", "Voucher Amount", "Routing Code",
            "Computer Generated Invoice", "Extra Details"
        ]} />
        <div className="w-full max-w-md space-y-2">
            <label className="text-[13px] font-bold text-slate-700">Page Size (Optional)</label>
            <div className="relative">
                <select className="w-full appearance-none bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2.5 text-[13px] text-slate-400 focus:outline-none">
                    <option>Please Select</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
        </div>
    </div>
);

const SellerBuyerInfoTab = () => (
    <CheckboxGroup items={[
        "Display Seller Logo", "Buyer VAT TIN Number", "Seller CIN Number", "Warehouse Name", "Warehouse Address", "Seller VAT TIN Number",
        "Seller CST TIN Number", "Show Notes", "Show Signature", "Show Terms and Conditions", "Prepared By", "GST Number",
        "Customer GSTIN", "QR", "B2C QR", "Bank Details", "Place of Supply", "Shipping Address", "Eway Bill No", "Custom Field 1",
        "Custom Field 2", "Show Email id"
    ]} />
);

export default InvoiceTemplatePage;