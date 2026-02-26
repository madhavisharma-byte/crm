import React, { useState } from "react";
import Sidebar from "../../website/Sidebar";
import Header from "../../website/Header";
import { Plus, Filter, Upload, Download, Search as SearchIcon } from "lucide-react";
import AddProduct from "./AddProductModal";

const TABLE_COLUMNS = [
    "Item Name",
    "SKU Code",
    "Category",
    "Color",
    "Brand",
    "HSN Code",
    "TAT",
    "Size",
    "Weight",
    "Cost Price",
    "Action"
];

const TABS = ["Enabled", "Disabled", "All"];

const PurchaseProducts = () => {
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [activeTab, setActiveTab] = useState("Enabled");

    if (showAddProduct) {
        return (
            <div className="relative min-h-screen w-full bg-white font-sans antialiased">
                {/* Responsive Sidebar */}
                <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                    <Sidebar activePage="Products" />
                </div>
                {/* Responsive main content */}
                <div
                    className={`
                        flex flex-col min-h-screen
                        transition-all
                        lg:pl-80 pl-16
                        md:pl-48
                        sm:pl-16
                        bg-white
                    `}
                >
                    <Header />
                    <div className="flex-1">
                        <AddProduct onBack={() => setShowAddProduct(false)} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-white font-sans antialiased">
            {/* Responsive Sidebar */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar activePage="Products" />
            </div>
            {/* Responsive main content */}
            <div
                className={`
                    flex flex-col min-h-screen
                    transition-all
                    lg:pl-80 pl-16
                    md:pl-48
                    sm:pl-16
                    bg-white
                `}
            >
                <Header />

                {/* Responsive Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 md:px-6 py-4 border-b border-gray-100 bg-white gap-2 sm:gap-0">
                    <div className="flex items-center gap-3 md:gap-6 mb-2 sm:mb-0">
                        <h1 className="text-base md:text-[16px] font-bold text-[#303e67] whitespace-nowrap tracking-tight">
                            Products
                        </h1>
                        <div className="flex gap-2 md:gap-3">
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 md:px-5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                                        activeTab === tab
                                            ? "bg-[#2b6cee] text-white border-[#2b6cee]"
                                            : "text-gray-400 border-gray-300 hover:border-gray-400"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3">
                        <button className="flex items-center gap-2 px-4 md:px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#303d50] hover:bg-gray-50">
                            <Filter size={16} /> Filter
                        </button>
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 transition-colors" title="Import Products">
                            <Upload size={18} />
                        </button>
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 transition-colors" title="Export Products">
                            <Download size={18} />
                        </button>
                        <button
                            className="flex items-center gap-2 bg-[#2b6cee] text-white px-4 md:px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm shrink-0"
                            onClick={() => setShowAddProduct(true)}
                        >
                            <Plus size={16} />
                            Add Product
                        </button>
                    </div>
                </div>

                {/* Table area - responsive */}
                <main className="flex-1 px-2 sm:px-4 md:px-8 py-6 max-w-full md:max-w-[1600px] mx-auto w-full">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[900px] md:min-w-[1400px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-3 md:px-6 py-3 md:py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty state */}
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length} className="py-24 md:py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                                                    <div className="w-12 h-10 md:w-16 md:h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center">
                                                        <SearchIcon className="text-[#2b6cee]" size={28} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[13px] md:text-[14px] text-gray-500 font-medium tracking-tight">
                                                No records to show
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
            <style>{`
                @media (max-width: 1023px) {
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
};

export default PurchaseProducts;