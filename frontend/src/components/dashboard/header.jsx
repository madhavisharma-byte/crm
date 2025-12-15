import React, { useState, useRef, useEffect } from "react";
import { Search, Bell, LogOut, User, Menu, X, LayoutDashboard, ShoppingCart, BarChart3, FileText, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Default profile fallback
const DEFAULT_PROFILE = {
    name: "User Name",
    role: "Store Admin",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};

const DashboardHeader = ({ profile }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Logout will also clear localStorage and relevant info from sessionStorage
    const handleLogout = () => {
        setDropdownOpen(false);

        // Remove tokens and user data (update these key names if your app uses different ones)
        try {
            localStorage.clear();
            sessionStorage.clear();
            // Optionally, for added security, you could remove specific keys instead of clear()
            // localStorage.removeItem('token');
            // localStorage.removeItem('profile');
        } catch (e) {
            // Ignore errors (e.g., private mode)
        }
        
        navigate("/login", { replace: true });
        // Optional: force reload to clear any lingering memory state and prevent dashboard access
        window.location.reload();
    };

    // Use provided profile or fall back to default
    const userProfile = profile || DEFAULT_PROFILE;

    // Go to profile
    const handleShowProfile = () => {
        setDropdownOpen(false);
        navigate("/profile"); // Adjust this route as needed
    };

    // Close dropdown on click outside
    useEffect(() => {
        if (!dropdownOpen) return;
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen]);

    const menuItems = [
        { text: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
        { text: "Orders", icon: <ShoppingCart size={18} />, path: "/orders" },
        { text: "Inventory", icon: <BarChart3 size={18} />, path: "/inventory" },
        { text: "Reports", icon: <FileText size={18} />, path: "/reports" },
        { text: "Settings", icon: <Settings size={18} />, path: "/settings" },
    ];

    return (
        <>
            <header className="flex items-center fixed top-0 left-0 md:left-64 right-0 z-30 bg-[#F3F4F6] py-3 px-4 sm:px-6 md:px-8 border-b border-gray-200">
                {/* Mobile menu button */}
                <button
                    className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                    onClick={() => setMobileNavOpen(true)}
                    aria-label="Open navigation"
                >
                    <Menu size={20} />
                </button>

                {/* Search Bar */}
                <div className="relative flex-1 min-w-0 max-w-md md:ml-0 ml-3">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search orders, products..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                    />
                </div>

                {/* Filler to push bell/profile right on large screen */}
                <div className="hidden md:flex flex-1" />

                {/* Notifications + Profile Dropdown */}
                <div className="flex items-center gap-4 sm:gap-6 ml-3 md:ml-0">
                    <div className="relative">
                        <Bell className="text-gray-500 w-5 h-5 cursor-pointer hover:text-gray-700" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </div>

                    <div className="relative" ref={dropdownRef}>
                        <div
                            className="flex items-center gap-3 cursor-pointer select-none"
                            onClick={() => setDropdownOpen((v) => !v)}
                        >
                            <img
                                src={userProfile.img}
                                alt="Profile"
                                className="w-9 h-9 rounded-full object-cover border border-gray-200"
                            />
                            <div className="hidden md:block">
                                <p className="text-sm font-semibold text-gray-800 leading-tight">
                                    {userProfile.name}
                                </p>
                                <p className="text-xs text-gray-500">{userProfile.role}</p>
                            </div>
                        </div>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <button
                                    className="flex w-full gap-2 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    onClick={handleShowProfile}
                                >
                                    <User className="w-4 h-4" />
                                    Show Profile
                                </button>
                                <button
                                    className="flex w-full gap-2 items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors border-t border-gray-100"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Mobile Nav Drawer */}
            {mobileNavOpen && (
                <div className="md:hidden fixed inset-0 z-40">
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setMobileNavOpen(false)}
                    />
                    <div className="relative h-full w-72 max-w-[80%] bg-white shadow-xl border-r border-gray-200">
                        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-600 p-1.5 rounded-lg">
                                    <LayoutDashboard className="text-white w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800 leading-tight">Dashboard</p>
                                    <p className="text-xs text-gray-500">Inventory Hub</p>
                                </div>
                            </div>
                            <button
                                className="p-2 rounded-md hover:bg-gray-100"
                                onClick={() => setMobileNavOpen(false)}
                                aria-label="Close navigation"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        <nav className="px-4 py-3 space-y-2">
                            {menuItems.map((item) => {
                                const isActive = location.pathname.startsWith(item.path);
                                return (
                                    <button
                                        key={item.text}
                                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left text-sm font-medium transition-colors ${
                                            isActive
                                                ? "bg-blue-50 text-blue-700 border border-blue-100"
                                                : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                        onClick={() => {
                                            navigate(item.path);
                                            setMobileNavOpen(false);
                                        }}
                                    >
                                        {item.icon}
                                        {item.text}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardHeader;
