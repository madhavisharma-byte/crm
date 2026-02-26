import React, { useState } from 'react';
import {
    Search,
    Plus,
    Globe,
    Check
} from 'lucide-react';
import Sidebar from '../../website/Sidebar';
import AddChannels from './AddChannels';
import Header from '../../website/Header'; // Import header component

// Responsive Channels Table
const ChannelsTable = ({ channels }) => (
    <div className="border border-gray-200 rounded-lg overflow-x-auto shadow-sm bg-white">
        <table className="min-w-full w-full text-left border-collapse">
            <thead className="bg-[#eef2ff] border-b border-gray-200">
                <tr>
                    <th className="px-3 sm:px-4 md:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-600 w-2/5 sm:w-1/3">Channel</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap">Connector Status</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 text-xs sm:text-sm font-semibold text-gray-600 whitespace-nowrap">Enabled</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {channels.length > 0 ? channels.map((channel) => (
                    <tr key={channel.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 sm:px-4 md:px-6 py-4 flex items-center gap-2 sm:gap-4">
                            <div className="w-8 sm:w-12 h-8 border border-gray-200 rounded flex items-center justify-center bg-white overflow-hidden p-1">
                                <img
                                    src={channel.logo}
                                    alt={channel.name}
                                    className="max-h-full object-contain"
                                />
                            </div>
                            <span className="font-semibold text-gray-700 text-xs sm:text-sm tracking-tight">{channel.name}</span>
                            <Globe size={16} className="text-blue-500 ml-auto hidden sm:inline" />
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-4">
                            {channel.connectorStatus ? (
                                <Check size={18} className="text-gray-800 font-bold" />
                            ) : (
                                <span className="text-red-500 text-xs">Not Connected</span>
                            )}
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-4">
                            {channel.enabled ? (
                                <Check size={18} className="text-gray-800 font-bold" />
                            ) : (
                                <span className="text-red-500 text-xs">Disabled</span>
                            )}
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan={3} className="text-center text-gray-400 py-16">No channels found.</td>
                    </tr>
                )}
            </tbody>
        </table>
        {/* Filler for large screens, but only shown on lg+ */}
        <div className="h-24 md:h-40 bg-white hidden lg:block"></div>
    </div>
);

const ChannelsPage = () => {
    const [showAddChannel, setShowAddChannel] = useState(false);

    // Channels list mock data
    const channels = [
        {
            id: 1,
            name: 'FLIPKART',
            logo: 'https://logo.clearbit.com/flipkart.com',
            connectorStatus: true,
            enabled: true,
        },
        {
            id: 2,
            name: 'AMAZON',
            logo: 'https://logo.clearbit.com/amazon.in',
            connectorStatus: false,
            enabled: false,
        }
        // Add more channel objects as needed
    ];

    // Always show the channels list (table) when not adding a channel
    return showAddChannel ? (
        <div className="flex flex-col lg:flex-row min-h-screen bg-white">
            <div className="fixed lg:static top-0 left-0 w-full lg:w-auto z-30">
                <Sidebar />
            </div>
            <div className="flex-1 flex flex-col mt-16 lg:mt-0 lg:ml-0">
                <AddChannels />
            </div>
        </div>
    ) : (
        <div className="relative bg-white font-sans antialiased min-h-screen w-full">
            {/* 
                Sidebar is fixed on large screens, and static/relative on mobile/tablet 
                (hide overflow under the sidebar on mobile when open if necessary)
            */}
            <div className="fixed top-0 left-0 h-screen w-auto z-30 flex">
                <Sidebar />
            </div>
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
                {/* 1. Top NavBar */}
                <Header />

                {/* 2. Main content area */}
                <main className="flex-1 p-3 md:p-5 lg:p-8 overflow-x-auto w-full max-w-full">
                    {/* Page Title and Add Button */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                        <h1 className="text-base md:text-lg font-bold text-gray-800">Channels</h1>
                        <button
                            className="bg-[#2563eb] hover:bg-blue-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md text-xs md:text-sm font-medium flex items-center gap-2 transition-colors"
                            onClick={() => setShowAddChannel(true)}
                        >
                            <Plus size={16} className="md:size-18" />
                            <span className="hidden xs:inline">Add Channel</span>
                        </button>
                    </div>
                    {/* Table Search */}
                    <div className="flex justify-end mb-2 md:mb-4">
                        <div className="relative w-full max-w-xs">
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <Search size={16} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Responsive Channels Table (horizontal scroll on sm-) */}
                    <ChannelsTable channels={channels} />
                </main>
            </div>
            {/* Responsive adjustments for sidebar paddings */}
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

export default ChannelsPage;