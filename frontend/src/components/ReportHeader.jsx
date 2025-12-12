import React from 'react';
import { useNavigate } from "react-router-dom";

const SettingsHeader = ({ activeTab = 'Marketplaces' }) => {
    const navigate = useNavigate();
    const tabs = [
        { name: 'Sales Report', link: '/reports/sales' },
        { name: 'Inventory Report', link: '/reports/inventory' },
        { name: 'Shipping Analytics', link: '/reports/shipping' },
        { name: 'Platform Performance', link: '/reports/platform' },
    ];

    return (
        <div className="mb-8">
            {/* Tabs Section */}
            <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                    <button
                        key={tab.name}
                        className={`
                            mr-8 pb-3 text-sm font-medium transition-all relative
                            ${activeTab === tab.name ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}
                        `}
                        type="button"
                        onClick={() => {
                            if (tab.link && activeTab !== tab.name) {
                                navigate(tab.link);
                            }
                        }}
                    >
                        {tab.name}
                        {/* Active Blue Underline */}
                        {activeTab === tab.name && (
                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SettingsHeader;