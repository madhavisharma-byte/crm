import React, { useState } from 'react';
import {
    Search, Plus, ChevronDown, ChevronRight
} from 'lucide-react';
import Sidebar from '../../website/Sidebar';
import Header from '../../website/Header'; 

const ShippingProvidersWorkflow = () => {
    // 'list' | 'marketplace' | 'config'
    const [view, setView] = useState('list');
    const [activeTab, setActiveTab] = useState('Enable');
    const [configTab, setConfigTab] = useState('Settings');

    // Headers for the list view
    const listHeaders = ["Code", "Shipping Method", "Serviceability", "AwbCount", "Tracking Status", "Status"];

    // Marketplace Data
    const marketplaceItems = Array(14).fill({ name: "DELHIVERY", logo: "https://via.placeholder.com/60x30?text=Delhivery" });

    return (
        <div className="flex min-h-screen h-screen bg-white overflow-hidden font-sans">
            <Sidebar activePage="shipping-providers" />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">

                {/* GLOBAL HEADER */}
                <Header />

                {/* VIEW CONDITIONAL RENDERING */}
                {view === 'list' && (
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="px-4 md:px-6 py-3 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white flex-shrink-0 gap-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8">
                                <h1 className="text-base font-bold text-slate-700 tracking-tight">Shipping Providers</h1>
                                <div className="flex items-center gap-2">
                                    {["Enable", "Disabled", "All"].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setActiveTab(t)}
                                            className={`px-4 py-1 text-[11px] font-semibold rounded-full border transition-all ${activeTab === t
                                                ? "bg-[#3b82f6] text-white border-[#3b82f6] shadow-sm"
                                                : "bg-white text-gray-400 border-gray-300 hover:border-blue-400"
                                            }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => setView('marketplace')}
                                className="w-full sm:w-auto bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
                            >
                                <Plus size={18} />Add Shipping Provider
                            </button>
                        </div>
                        <div className="flex-1 p-0 overflow-auto">
                            {/* Responsive Table Container */}
                            <div className="w-full h-full overflow-x-auto">
                                <table className="min-w-full w-full h-full text-left border-collapse table-fixed">
                                    <thead className="bg-[#eef2ff]">
                                        <tr>
                                            {listHeaders.map((h, i) => (
                                                <th key={i} className="px-3 md:px-6 py-3 md:py-4 text-[12px] md:text-[13px] font-semibold text-slate-600">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Empty row for full height in the placeholder */}
                                        <tr>
                                            <td colSpan={6} className="h-[calc(60vh)] md:h-[calc(100vh-206px)]"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'marketplace' && (
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="px-4 md:px-6 py-2 border-b border-gray-100 flex items-center bg-white flex-shrink-0">
                            <div className="flex items-center text-xs font-medium text-slate-500 gap-2">
                                <span className="cursor-pointer hover:text-blue-600" onClick={() => setView('list')}>Shipping Providers</span>
                                <ChevronRight size={14} />
                                <span className="text-slate-400">Add Shipping Provider</span>
                            </div>
                        </div>
                        <div className="p-3 md:p-8 flex-1 overflow-auto bg-white">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-10 gap-3">
                                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Marketplace</h2>
                                <div className="relative w-full md:w-80">
                                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400"><Search size={16} /></span>
                                    <input type="text" placeholder="Search Shipping Provider" className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-y-8 md:gap-y-12 gap-x-4 md:gap-x-6">
                                {marketplaceItems.map((item, i) => (
                                    <div key={i} onClick={() => setView('config')} className="flex flex-col items-center gap-2 md:gap-4 cursor-pointer group">
                                        <img src={item.logo} alt={item.name} className="h-8 md:h-10 object-contain grayscale group-hover:grayscale-0 transition-all" />
                                        <span className="text-[10px] md:text-[11px] font-bold text-slate-600 group-hover:text-blue-600">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {view === 'config' && (
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="px-4 md:px-6 py-2 border-b border-gray-100 flex items-center bg-white flex-shrink-0">
                            <div className="flex items-center text-xs font-medium text-slate-500 gap-2">
                                <span className="cursor-pointer hover:text-blue-600" onClick={() => setView('list')}>Channels</span>
                                <ChevronRight size={14} />
                                <span className="text-slate-400">Add Channel</span>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
                            {/* Left Summary Sidebar */}
                            <div className="w-full md:w-64 border-r border-slate-100 p-6 md:p-8 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 bg-white">
                                <div>
                                    <p className="text-sm font-bold text-slate-700 mb-2 md:mb-6">Shipping Provider</p>
                                    <img src="https://via.placeholder.com/100x40?text=Delhivery" alt="Delhivery" className="mb-2 md:mb-4" />
                                    <p className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest">DELHIVERY</p>
                                </div>
                            </div>
                            {/* Main Config Form */}
                            <div className="flex-1 overflow-auto bg-white p-4 md:p-8">
                                <div className="flex gap-6 md:gap-8 border-b border-slate-100 mb-6 md:mb-8 flex-wrap">
                                    {["Settings", "Connectors"].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setConfigTab(t)}
                                            className={`pb-2 text-[13px] font-bold transition-all border-b-2 ${
                                                configTab === t
                                                    ? "border-blue-600 text-blue-600"
                                                    : "border-transparent text-slate-400"
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>

                                <ConfigSection title="General Information">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                                        <Input label="Shipping Provider Name" placeholder="Enter Name" required />
                                        <Select label="Enabled" options={["Select Enabled"]} />
                                        <Select label="Tracking Enabled" options={["yes", "no"]} />
                                        <Select label="Enable Unship Tracking" options={["Select"]} />
                                        <Input label="Unship Tracking Link" placeholder="Enter Link" />
                                    </div>
                                </ConfigSection>

                                <ConfigSection title="Forward Shipment">
                                    <Select label="Serviceability" options={["Any facility to Any Place"]} required className="max-w-full md:max-w-md mb-4" />
                                    <ShipmentTable />
                                </ConfigSection>

                                <ConfigSection title="Reverse Shipment">
                                    <Select label="Serviceability" options={["Any facility to Any Place"]} required className="max-w-full md:max-w-md mb-4" />
                                    <ShipmentTable />
                                </ConfigSection>
                            </div>
                        </div>
                        {/* Footer Actions */}
                        <div className="p-4 border-t border-slate-100 bg-white flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 flex-shrink-0">
                            <button onClick={() => setView('marketplace')} className="px-6 sm:px-8 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-500 hover:bg-slate-50">Cancel</button>
                            <button className="px-6 sm:px-8 py-2 bg-[#2563eb] text-white rounded-lg text-sm font-semibold shadow-md">Save</button>
                        </div>
                    </div>
                )}
            </div>
            {/* RESPONSIVE TAILWIND OVERRIDES */}
            <style>{`
                @media (max-width: 768px) {
                    .table-fixed th, .table-fixed td { padding-left: 8px !important; padding-right: 8px !important; }
                    .table-fixed th, .table-fixed { font-size: 12px !important; }
                }
            `}</style>
        </div>
    );
};

// Helper components
const ConfigSection = ({ title, children }) => (
    <div className="mb-8 md:mb-12">
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h3 className="text-[14px] md:text-[15px] font-bold text-slate-800">{title}</h3>
        </div>
        {children}
    </div>
);

const Input = ({ label, placeholder, required }) => (
    <div className="space-y-1.5">
        <label className="text-[12px] font-bold text-slate-700">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
        <input type="text" placeholder={placeholder} className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2 text-[12px] focus:outline-none" />
    </div>
);

const Select = ({ label, options, required, className }) => (
    <div className={`space-y-1.5 ${className}`}>
        <label className="text-[12px] font-bold text-slate-700">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
        <div className="relative">
            <select className="w-full appearance-none bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-2 text-[12px] text-slate-500 focus:outline-none">
                {options.map((o, i) => <option key={i}>{o}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
    </div>
);

const ShipmentTable = () => (
    <div className="border border-slate-200 rounded-lg overflow-x-auto">
        <table className="w-full min-w-[400px] text-left border-collapse text-[11px] font-bold">
            <thead className="bg-[#f8fafc] border-b border-slate-200 text-slate-400">
                <tr>
                    <th className="px-3 md:px-4 py-3 border-r border-slate-100">Shipping Method</th>
                    <th className="px-3 md:px-4 py-3 border-r border-slate-100">Enabled</th>
                    <th className="px-3 md:px-4 py-3 border-r border-slate-100">AWB Generation</th>
                    <th className="px-3 md:px-4 py-3 border-r border-slate-100">Row Action</th>
                    <th className="px-3 md:px-4 py-3"></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                <tr className="bg-white">
                    <td className="px-3 md:px-4 py-3 border-r border-slate-100"><Select options={["Standard-COD"]} className="!space-y-0" /></td>
                    <td className="px-3 md:px-4 py-3 border-r border-slate-100"><Select options={["YES"]} className="!space-y-0" /></td>
                    <td className="px-3 md:px-4 py-3 border-r border-slate-100"><Select options={["Select AWB Generation"]} className="!space-y-0" /></td>
                    <td className="px-3 md:px-4 py-3 border-r border-slate-100 text-slate-800 uppercase pl-4 md:pl-8 font-bold">Delete</td>
                    <td className="px-3 md:px-4 py-3"></td>
                </tr>
            </tbody>
        </table>
        <div className="p-2 md:p-3 bg-white text-blue-600 font-bold text-[11px] cursor-pointer hover:underline">Add Shipping Method</div>
    </div>
);

export default ShippingProvidersWorkflow;