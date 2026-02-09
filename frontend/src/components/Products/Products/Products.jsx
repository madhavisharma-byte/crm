import React, { useState } from "react";
import Sidebar from "../../(website)/Sidebar";
import Header from "../../(website)/header";
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
            <div className="flex min-h-screen bg-white font-sans antialiased">
                <Sidebar activePage="Products" />
                <div className="flex-1 flex flex-col min-w-0">
                    <Header />
                    <div className="flex-1">
                        <AddProduct onBack={() => setShowAddProduct(false)} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-white font-sans antialiased">
            <Sidebar activePage="Products" />
            <div className="flex-1 flex flex-col min-w-0">
                <Header />

                {/* Action Bar */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <div className="flex items-center gap-6">
                        <h1 className="text-[16px] font-bold text-[#303e67] whitespace-nowrap">Products</h1>
                        <div className="flex gap-3">
                            {TABS.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
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
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-[#303d50] hover:bg-gray-50">
                            <Filter size={16} /> Filter
                        </button>
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 transition-colors" title="Import Products">
                            <Upload size={18} />
                        </button>
                        <button className="p-2 bg-blue-50 text-[#2b6cee] rounded-lg hover:bg-blue-100 transition-colors" title="Export Products">
                            <Download size={18} />
                        </button>
                        <button
                            className="flex items-center gap-2 bg-[#2b6cee] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1e5bc7] transition-all shadow-sm"
                            onClick={() => setShowAddProduct(true)}
                        >
                            <Plus size={16} />
                            Add Product
                        </button>
                    </div>
                </div>

                {/* Table area: same width/height as GST Configurations */}
                <main className="flex-1 p-8 max-w-[1600px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[1400px]">
                            <thead>
                                <tr className="bg-[#e9f0fe]">
                                    {TABLE_COLUMNS.map((header, idx) => (
                                        <th
                                            key={idx}
                                            className="px-6 py-4 text-[13px] font-semibold text-[#303d50] whitespace-nowrap"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {/* Empty state */}
                                <tr>
                                    <td colSpan={TABLE_COLUMNS.length} className="py-40">
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <div className="relative w-32 h-32 mb-6">
                                                <div className="absolute inset-0 bg-[#f8fafc] rounded-2xl border border-gray-100 flex items-center justify-center">
                                                    <div className="w-16 h-12 bg-[#ffd8b2] rounded shadow-sm relative flex items-center justify-center">
                                                        <SearchIcon className="text-[#2b6cee]" size={28} />
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[14px] text-gray-500 font-medium tracking-tight">
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
        </div>
    );
};

export default PurchaseProducts;