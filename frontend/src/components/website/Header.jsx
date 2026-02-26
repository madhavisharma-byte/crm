import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
    Search,
    Bell,
    LogOut,
    X,
    ChevronRight,
    Moon,
    Sun,
    Settings,
    FileText,
    User
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../state/AuthContext";
import { useTheme } from "../../state/ThemeContext.jsx";
import api from "../../utils/api";

// Constants
const DEFAULT_PROFILE = Object.freeze({
    name: "User Name",
    role: "Store Admin"
});

const SUB_NAV_ITEMS = Object.freeze([
    { key: "Overview", label: "Overview", path: "/dashboard/overview" },
    { key: "Sales", label: "Sales", path: "/dashboard/sales" },
    { key: "Fulfillment", label: "Fulfillment", path: "/dashboard/fulfilment" },
    { key: "Purchases", label: "Purchases", path: "/dashboard/purchase" },
    { key: "Returns", label: "Returns", path: "/dashboard/returns" },
    { key: "Inventory", label: "Inventory", path: "/dashboard/inventory" },
    { key: "Payment", label: "Payment", path: "/dashboard/payment" }
]);

const SALE_ORDER_OPTIONS = [
    "Sale Order",
    "Shipping Package",
    "Purchase Order",
    "SKU",
    "Manifest",
    "Invoice",
    "Vendor"
];

const HIDE_HEADER_PATHS_PREFIXES = [
    "/dashboard/reports/order-items",
    "/dashboard/reports/invoice",
    "/dashboard/reports/other"
];

// Reusable Components
const AvatarCircle = React.memo(({ src, name, size = 36, className = "" }) => {
    const initials = name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "?";
    if (src) return <img src={src} alt={name} className={`rounded-full object-cover border border-gray-100 ${className}`} style={{ width: size, height: size }} />;
    return (
        <div className={`flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold border border-gray-100 ${className}`} style={{ width: size, height: size, fontSize: size / 2.5 }}>
            {initials}
        </div>
    );
});

const DashboardHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { token, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [orderOpen, setOrderOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    const orderRef = useRef(null);
    const profileRef = useRef(null);

    const isDashboardActive = location.pathname.includes("/dashboard") || location.pathname === "/";
    const hideSubNav = HIDE_HEADER_PATHS_PREFIXES.some(p => location.pathname.startsWith(p));
    const profile = userProfile || DEFAULT_PROFILE;

    // Close dropdowns on click outside
    useEffect(() => {
        const handler = (e) => {
            if (orderRef.current && !orderRef.current.contains(e.target)) setOrderOpen(false);
            if (profileRef.current && !profileRef.current.contains(e.target)) setDropdownOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="sticky top-0 z-40 w-full flex flex-col transition-colors duration-300 shadow-sm" style={{ backgroundColor: "var(--bg)" }}>

            {/* --- TOP ROW --- */}
            <header className="flex items-center justify-between w-full h-16 px-4 md:px-6 border-b transition-colors duration-300" style={{ borderColor: "var(--border)" }}>

                {/* Search & Action Container */}
                <div className="flex-1 max-w-2xl flex items-center mr-4 lg:mr-8">
                    <div className="relative flex w-full items-center group">
                        <Search className="absolute left-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-9 pr-2 md:pr-4 py-2 text-sm rounded-l-lg border-y border-l focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                            style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
                        />

                        {/* Sale Order Segmented Button */}
                        <div className="relative" ref={orderRef}>
                            <button
                                onClick={() => setOrderOpen(!orderOpen)}
                                className="flex items-center gap-1 md:gap-2 px-3 md:px-5 py-2 text-xs md:text-sm font-bold text-white bg-[#2b6cee] hover:bg-[#1e5bc7] transition-all rounded-r-lg whitespace-nowrap h-[38px]"
                            >
                                <span className="hidden xs:inline">Sale Order</span>
                                <span className="xs:hidden">Sale</span>
                                <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${orderOpen ? "-rotate-90" : "rotate-90"}`} />
                            </button>

                            {orderOpen && (
                                <div className="absolute right-0 top-[100%] w-48 md:w-full min-w-[160px] bg-[#2b6cee] shadow-xl z-50 rounded-b-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200">
                                    {SALE_ORDER_OPTIONS.map((opt) => (
                                        <button key={opt} className="w-full text-left px-5 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors border-t border-white/10 first:border-t-0">
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT ACTIONS --- */}
                <div className="flex items-center gap-3 md:gap-6">
                    {/* Notification Bell */}
                    <button className="relative p-1.5 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors group">
                        <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors focus:outline-none"
                        >
                            <AvatarCircle src={profile.img} name={profile.name} size={36} />
                            <div className="hidden lg:block text-left leading-tight pr-1">
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{profile.name}</p>
                                <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">{profile.role}</p>
                            </div>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-64 md:w-72 rounded-xl shadow-2xl border z-50 overflow-hidden animate-in zoom-in-95 duration-150 origin-top-right"
                                style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>

                                {/* Header */}
                                <div className="p-4 bg-gray-50/50 dark:bg-white/5 border-b" style={{ borderColor: "var(--border)" }}>
                                    <p className="text-sm font-bold" style={{ color: "var(--text)" }}>{profile.name}</p>
                                    <p className="text-xs opacity-60" style={{ color: "var(--text)" }}>{profile.role}</p>
                                </div>

                                {/* Links */}
                                <div className="p-2 space-y-0.5">
                                    <DropdownItem icon={<User size={16} />} label="Edit Profile" onClick={() => navigate("/profile")} />

                                    <div className="flex items-center justify-between px-3 py-2 text-sm font-medium" style={{ color: "var(--text)" }}>
                                        <div className="flex items-center gap-3">
                                            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                                            Dark Mode
                                        </div>
                                        <button onClick={toggleTheme} className={`w-9 h-5 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${theme === 'dark' ? 'translate-x-4' : ''}`} />
                                        </button>
                                    </div>

                                    <DropdownItem icon={<Settings size={16} />} label="Settings" onClick={() => navigate("/settings")} />
                                    <DropdownItem icon={<FileText size={16} />} label="Terms & Conditions" onClick={() => navigate("/terms-conditions")} />
                                </div>

                                {/* Logout */}
                                <div className="p-2 border-t mt-1" style={{ borderColor: "var(--border)" }}>
                                    <button onClick={handleLogout} className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors">
                                        <LogOut size={16} /> Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* --- DASHBOARD SUB-NAVIGATION --- */}
            {isDashboardActive && !hideSubNav && (
                <div className="flex items-center h-12 px-4 md:px-6 border-b overflow-x-auto no-scrollbar scroll-smooth" style={{ borderColor: "var(--border)" }}>
                    <h2 className="hidden sm:block text-[15px] font-bold text-slate-700 dark:text-slate-300 mr-6 whitespace-nowrap">Dashboard</h2>
                    <div className="flex items-center gap-2 md:gap-3 h-full">
                        {SUB_NAV_ITEMS.map((item) => {
                            const isActive = location.pathname.startsWith(item.path) || (item.key === 'Overview' && location.pathname === '/dashboard');
                            return (
                                <button
                                    key={item.key}
                                    onClick={() => navigate(item.path)}
                                    className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all border whitespace-nowrap ${isActive
                                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                            : "bg-transparent text-slate-400 border-gray-300 hover:border-blue-400"
                                        }`}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper Sub-component
const DropdownItem = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left" style={{ color: "var(--text)" }}>
        <span className="opacity-70">{icon}</span>
        {label}
    </button>
);

export default DashboardHeader;