import React, { useState } from 'react';
import {
    Search,
    Bell,
    ChevronDown,
    Plus,
    Globe,
    Check,
    User
} from 'lucide-react';
import Sidebar from '../components/website/Sidebar';
import AddChannels from './AddChannels';

const ChannelsTable = ({ channels }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
            <thead className="bg-[#eef2ff] border-b border-gray-200">
                <tr>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-600 w-1/3">Channel</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-600">Connector Status</th>
                    <th className="px-6 py-3 text-sm font-semibold text-gray-600">Enabled</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {channels.length > 0 ? channels.map((channel) => (
                    <tr key={channel.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-4">
                            <div className="w-12 h-8 border border-gray-200 rounded flex items-center justify-center bg-white overflow-hidden p-1">
                                <img
                                    src={channel.logo}
                                    alt={channel.name}
                                    className="max-h-full object-contain"
                                />
                            </div>
                            <span className="font-semibold text-gray-700 text-sm tracking-tight">{channel.name}</span>
                            <Globe size={18} className="text-blue-500 ml-auto" />
                        </td>
                        <td className="px-6 py-4">
                            {channel.connectorStatus ? (
                                <Check size={20} className="text-gray-800 font-bold" />
                            ) : (
                                <span className="text-red-500 text-xs">Not Connected</span>
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {channel.enabled ? (
                                <Check size={20} className="text-gray-800 font-bold" />
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
        {/* Empty space to mimic the large empty area in the screenshot */}
        <div className="h-64 bg-white"></div>
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
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <AddChannels />
            </div>
        </div>
    ) : (
        <div className="flex h-screen bg-white">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Main area (navbar + content) */}
            <div className="flex-1 flex flex-col">
                {/* 1. TOP NAVBAR */}
                <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-[#f8fafc]">
                    {/* Search Input */}
                    <div className="relative w-96">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full pl-10 pr-4 py-1.5 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Right side icons & Profile */}
                    <div className="flex items-center space-x-6">
                        <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer">
                            Sale Order <ChevronDown size={14} />
                        </div>

                        <div className="relative cursor-pointer">
                            <Bell size={20} className="text-gray-500" />
                            <span className="absolute -top-1 -right-1 bg-red-500 border-2 border-white w-3 h-3 rounded-full"></span>
                        </div>

                        <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-700 leading-none">Gautam ch</p>
                                <p className="text-xs text-gray-400">Store Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border border-gray-300 flex items-center justify-center">
                                <User className="text-gray-500" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* 2. MAIN CONTENT AREA */}
                <main className="p-6 overflow-auto flex-1">
                    {/* Page Title and Add Button */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-lg font-bold text-gray-800">Channels</h1>
                        <button
                            className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
                            onClick={() => setShowAddChannel(true)}
                        >
                            <Plus size={18} />
                            Add Channel
                        </button>
                    </div>

                    {/* Table Search */}
                    <div className="flex justify-end mb-4">
                        <div className="relative w-64">
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <Search size={16} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Channels Table */}
                    <ChannelsTable channels={channels} />
                </main>
            </div>
        </div>
    );
};

export default ChannelsPage;