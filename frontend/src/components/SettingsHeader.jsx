import React from 'react';
import { useNavigate } from "react-router-dom";

const SettingsHeader = ({ activeTab = 'Marketplaces' }) => {
    const navigate = useNavigate();
    const tabs = [
        { name: 'Marketplaces', link: '/settings' },
        { name: 'Users', link: '/settings/users' },
        { name: 'Company', link: '/settings/company' },
        { name: 'Notifications', link: '/settings/notifications' },
        { name: 'Shipping', link: '/settings/shipping' },
    ];

    return (
        <div className="mb-8">
            {/* Title Section */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage your account and platform configurations
                </p>
            </div>

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