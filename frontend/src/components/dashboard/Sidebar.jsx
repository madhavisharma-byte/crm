import React from 'react';
import {
    LayoutDashboard,
    ShoppingCart,
    BarChart3,
    FileText,
    Settings,
    Box,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
const Sidebar = ({ activePage }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isSettingsPath = location.pathname.startsWith('/settings');
    const menuItems = [
        { text: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard', key: 'dashboard' },
        { text: 'Orders', icon: <ShoppingCart size={20} />, path: '/orders', key: 'orders' },
        { text: 'Inventory', icon: <BarChart3 size={20} />, path: '/inventory', key: 'inventory' },
        { text: 'Reports', icon: <FileText size={20} />, path: '/reports', key: 'reports' },
        { text: 'Settings', icon: <Settings size={20} />, path: '/settings', key: 'settings' },
    ];

    return (
        <aside className="hidden md:flex fixed left-0 top-0 w-64 h-screen bg-white border-r border-gray-200 flex-col z-20">
            {/* Logo */}
            <div className="p-6 flex items-center gap-3">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                    <Box className="text-white w-5 h-5" />
                </div>
                <div>
                    <h1 className="font-bold text-lg leading-none">Dashboard</h1>
                    <p className="text-xs text-gray-500">Inventory Hub</p>
                </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                {menuItems.map((item) => {
                    // Highlight Settings tab if pathname starts with /settings OR activePage value equals item.key (for explicit activePage from parent)
                    const isActive =
                        item.key === 'settings'
                            ? isSettingsPath || activePage === 'settings'
                            : location.pathname === item.path || activePage === item.key;

                    return (
                        <SidebarItem
                            key={item.text}
                            icon={item.icon}
                            text={item.text}
                            active={isActive}
                            onClick={() => navigate(item.path)}
                        />
                    );
                })}
            </nav>
        </aside>
    );
};

const SidebarItem = ({ icon, text, active, onClick }) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
    >
        {icon}
        <span className="font-medium text-sm">{text}</span>
    </div>
);

export default Sidebar;
