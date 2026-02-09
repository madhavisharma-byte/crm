import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
    Search,
    Bell,
    LogOut,
    Menu,
    X,
    LayoutDashboard,
    ChevronRight
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

const FULFILLMENT_PATH_VARIATIONS = [
    "/dashboard/fulfilment",
    "/dashboard/fulfillment",
    "/dashboard/fulfilament"
];

// *** Add this sales order options array ***
const SALE_ORDER_OPTIONS = [
    "Sale Order",
    "Shipping Package",
    "Purchase Order",
    "SKU",
    "Manifest",
    "Invoice",
    "Vendor"
];

// Utility Functions
const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (
        (parts[0][0] || "").toUpperCase() +
        (parts[parts.length - 1][0] || "").toUpperCase()
    );
};

const AvatarCircle = React.memo(function AvatarCircle({
    src,
    name,
    size = 36,
    className = "",
    ...props
}) {
    if (src) {
        return (
            <img
                src={src}
                alt={name}
                className={`object-cover rounded-full border border-gray-200 shadow-sm ${className}`}
                style={{ width: size, height: size }}
                {...props}
            />
        );
    }

    return (
        <span
            className={`flex items-center justify-center rounded-full font-bold uppercase bg-blue-100 text-blue-700 border border-gray-200 shadow-sm ${className}`}
            style={{ width: size, height: size, fontSize: size / 2.8 }}
            {...props}
        >
            {getInitials(name)}
        </span>
    );
});

const LogoutConfirmation = React.memo(function LogoutConfirmation({
    open,
    onCancel,
    onConfirm
}) {
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") onCancel();
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onCancel]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-xl p-6 shadow-2xl border border-gray-100 w-72 flex flex-col items-center">
                <div className="mb-3 text-gray-900 font-bold text-lg flex flex-col items-center gap-2">
                    <div className="bg-red-50 p-3 rounded-full">
                        <LogOut className="w-6 h-6 text-red-600" />
                    </div>
                    Log out?
                </div>
                <p className="mb-6 text-sm text-gray-500 text-center">
                    Are you sure you want to log out?
                </p>
                <div className="flex gap-3 w-full">
                    <button
                        type="button"
                        className="flex-1 py-2.5 rounded-lg text-sm font-semibold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 shadow-sm transition-colors"
                        onClick={onConfirm}
                        autoFocus
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
});

// Hide header and subnav for these report pages (by prefix)
const HIDE_HEADER_PATHS_PREFIXES = [
    "/dashboard/reports/order-items",
    "/dashboard/reports/invoice",
    "/dashboard/reports/other"
];

const DashboardHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { token, logout } = useAuth();

    // UI State
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const [orderOpen, setOrderOpen] = useState(false);
    const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const darkMode = theme === "dark";

    // Profile State
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [errorProfile, setErrorProfile] = useState("");

    // Refs
    const orderDropdownRef = useRef(null);
    const dropdownRef = useRef(null);

    // Memoized Values
    const isDashboardActive = useMemo(() =>
        location.pathname.includes("/dashboard") || location.pathname === "/",
        [location.pathname]
    );

    // Hide the sub-header if on Order Items report, Invoice report, or Other report pages
    const hideDashboardSubNav = useMemo(() =>
        HIDE_HEADER_PATHS_PREFIXES.some((prefix) =>
            location.pathname === prefix ||
            location.pathname.startsWith(prefix + "/")
        ),
        [location.pathname]
    );

    const showProfile = useMemo(
        () => userProfile?.name && userProfile?.role ? userProfile : DEFAULT_PROFILE,
        [userProfile]
    );

    const actualImg = showProfile.img || null;

    // Get active sub tab
    const getActiveSubTab = useCallback((pathname) => {
        if (
            pathname === "/dashboard" ||
            pathname === "/dashboard/overview" ||
            pathname === "/"
        ) {
            return "Overview";
        }

        const lowerPath = pathname.toLowerCase();

        if (FULFILLMENT_PATH_VARIATIONS.some(path => lowerPath.includes(path))) {
            return "Fulfillment";
        }

        if (lowerPath.startsWith("/dashboard/purchase")) {
            return "Purchases";
        }

        const matchedItem = SUB_NAV_ITEMS.find(
            item => item.label !== "Fulfillment" &&
                item.label !== "Purchases" &&
                pathname.startsWith(item.path)
        );

        return matchedItem?.label || "";
    }, []);

    const activeSubTab = useMemo(
        () => getActiveSubTab(location.pathname),
        [getActiveSubTab, location.pathname]
    );

    // Navigation Actions
    const DASHBOARD_NAV_ACTIONS = useMemo(
        () => ({
            Overview: () => navigate("/dashboard/overview"),
            Sales: () => navigate("/dashboard/sales"),
            Fulfillment: () => navigate("/dashboard/fulfilment"),
            Purchases: () => navigate("/dashboard/purchase"),
            Returns: () => navigate("/dashboard/returns"),
            Inventory: () => navigate("/dashboard/inventory"),
            Payment: () => navigate("/dashboard/payment")
        }),
        [navigate]
    );

    // Effects
    // Theme handled globally by ThemeProvider; local UI reads `theme` from context.

    useEffect(() => {
        if (!orderOpen) return;

        const handleClickOutside = (event) => {
            if (orderDropdownRef.current && !orderDropdownRef.current.contains(event.target)) {
                setOrderOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [orderOpen]);

    useEffect(() => {
        if (!dropdownOpen) return;

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen]);

    // Fetch user profile
    useEffect(() => {
        let cancelled = false;

        const fetchProfile = async () => {
            setLoadingProfile(true);
            setErrorProfile("");

            try {
                if (!token) throw new Error("No auth token");

                const { data } = await api.get("/auth/me");

                if (!cancelled) {
                    setUserProfile({
                        name: data.user?.fullName || DEFAULT_PROFILE.name,
                        role: data.user?.role || DEFAULT_PROFILE.role,
                        img: data.user?.img || null
                    });
                }
            } catch {
                if (!cancelled) {
                    setUserProfile(null);
                    setErrorProfile("Failed to load profile.");
                }
            } finally {
                if (!cancelled) setLoadingProfile(false);
            }
        };

        fetchProfile();

        return () => {
            cancelled = true;
        };
    }, [token]);

    // Handlers
    const handleLogout = useCallback(() => {
        setDropdownOpen(false);
        setLogoutConfirmOpen(false);
        logout();
        navigate("/login", { replace: true });
    }, [logout, navigate]);

    const handleProfileNavigation = useCallback(async (e) => {
        try {
            e.preventDefault();
            setDropdownOpen(false);
            await Promise.resolve();
            navigate("/profile");
        } catch (err) {
            console.error("Error navigating to /profile:", err);
        }
    }, [navigate]);

    const isNavItemActive = useCallback((item) => {
        const lowerPath = location.pathname.toLowerCase();

        if (item.label === "Fulfillment") {
            return FULFILLMENT_PATH_VARIATIONS.some(path => lowerPath.includes(path));
        }

        if (item.label === "Purchases") {
            return lowerPath.startsWith("/dashboard/purchase");
        }

        return activeSubTab === item.label;
    }, [location.pathname, activeSubTab]);

    return (
        <>
            <LogoutConfirmation
                open={logoutConfirmOpen}
                onCancel={() => setLogoutConfirmOpen(false)}
                onConfirm={handleLogout}
            />

            <div
                className="flex flex-col w-full sticky top-0 z-30 shadow-sm transition-colors duration-300"
                style={{ backgroundColor: "var(--bg)" }}
            >
                {/* TOP HEADER ROW */}
                <header
                    className="flex items-center w-full py-3 px-4 sm:px-6 border-b transition-colors duration-300"
                    style={{ borderColor: "var(--border)" }}
                >
                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border mr-3 hover:opacity-80 transition-opacity"
                        style={{
                            backgroundColor: "var(--card)",
                            borderColor: "var(--border)",
                            color: "var(--text)"
                        }}
                        onClick={() => setMobileNavOpen(true)}
                    >
                        <Menu size={20} />
                    </button>

                    {/* Search Bar + Sale Order Button */}
                    <div className="relative flex-1 min-w-0 max-w-3xl flex items-center gap-0">

                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50"
                            style={{ color: "var(--text)" }}
                        />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 rounded-l-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all placeholder:opacity-50 border border-r-0"
                            style={{
                                backgroundColor: "var(--card)",
                                borderColor: "var(--border)",
                                color: "var(--text)"
                            }}
                        />
                        <div className="relative" ref={orderDropdownRef}>
                            <button
                                type="button"
                                onClick={() => setOrderOpen((prev) => !prev)}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#2b6cee] transition-all shadow-sm whitespace-nowrap ${
                                    orderOpen ? "rounded-t-lg" : "rounded-lg"
                                }`}
                            >
                                Sale Order
                                <ChevronRight
                                    className={`w-4 h-4 transition-transform duration-200 ${
                                        orderOpen ? "rotate-[270deg]" : "rotate-90"
                                    }`}
                                />
                            </button>
                            {/* CUSTOM BLUE DROPDOWN (Matches Image) */}
                            {orderOpen && (
                                <div className="absolute right-0 top-full w-full min-w-[180px] bg-[#2b6cee] shadow-xl z-50 rounded-b-xl overflow-hidden animate-in slide-in-from-top-1 duration-200">

                                    <div className="flex flex-col py-2">
                                        {SALE_ORDER_OPTIONS.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    // Logic to handle selection or navigation
                                                    console.log("Selected:", option);
                                                    setOrderOpen(false);
                                                }}
                                                className="w-full text-left px-5 py-3 text-[15px] font-medium text-white hover:bg-white/10 transition-colors"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1" />

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-6">
                        <button type="button" className="relative p-1 transition-colors">
                            <Bell className="text-gray-400 w-6 h-6" />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative flex items-center gap-3" ref={dropdownRef}>
                            <button
                                type="button"
                                className="flex items-center gap-3 focus:outline-none"
                                onClick={() => setDropdownOpen((prev) => !prev)}
                            >
                                <AvatarCircle
                                    src={actualImg}
                                    name={showProfile.name}
                                    size={40}
                                    className="rounded-full shadow-md"
                                />
                                <div className="hidden md:block text-left leading-tight">
                                    <p className="text-[15px] font-bold text-slate-700">
                                        {showProfile.name}
                                    </p>
                                    <p className="text-xs text-slate-400 font-medium">
                                        {showProfile.role}
                                    </p>
                                </div>
                            </button>

                            {dropdownOpen && (
                                <div
                                    className="absolute right-0 mt-3 w-72 rounded-xl shadow-xl border z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right"
                                    style={{
                                        backgroundColor: "var(--card)",
                                        borderColor: "var(--border)"
                                    }}
                                >
                                    {/* Dropdown Header */}
                                    <div
                                        className="flex items-center gap-3 px-5 py-4"
                                        style={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                                    >
                                        <AvatarCircle
                                            src={actualImg}
                                            name={showProfile.name}
                                            size={40}
                                            className="w-10 h-10"
                                        />
                                        <div>
                                            <div
                                                className="font-bold text-sm"
                                                style={{ color: "var(--text)" }}
                                            >
                                                {showProfile.name}
                                            </div>
                                            <div
                                                className="text-xs font-medium opacity-70"
                                                style={{ color: "var(--text)" }}
                                            >
                                                {showProfile.role}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="p-2 border-t"
                                        style={{ borderColor: "var(--border)" }}
                                    >
                                        {/* Edit Profile Button */}
                                        <button
                                            type="button"
                                            className="flex w-full items-center gap-2 px-3 py-2.5 text-sm rounded-lg transition-colors group hover:opacity-80 justify-start"
                                            style={{ color: "var(--text)" }}
                                            onClick={handleProfileNavigation}
                                        >
                                            <span className="font-medium">Edit Profile</span>
                                            <span className="flex-1" />
                                            <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                                        </button>

                                        {/* Dark Mode Toggle */}
                                        <div
                                            className="flex w-full items-center justify-between px-3 py-2.5 text-sm"
                                            style={{ color: "var(--text)" }}
                                        >
                                            <span className="font-medium">Dark Mode</span>
                                            <button
                                                type="button"
                                                className={`w-9 h-5 rounded-full relative transition-colors duration-200 focus:outline-none ${darkMode ? "bg-blue-600" : "bg-gray-200"
                                                    }`}
                                                onClick={toggleTheme}
                                            >
                                                <span
                                                    className={`block h-3.5 w-3.5 bg-white rounded-full shadow-sm absolute top-0.5 left-0.5 transition-transform duration-200 ${darkMode ? "translate-x-4" : ""
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        {/* Settings */}
                                        <button
                                            type="button"
                                            className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:opacity-80 rounded-lg transition-colors font-medium"
                                            style={{ color: "var(--text)" }}
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                navigate("/settings");
                                            }}
                                        >
                                            <span>Settings</span>
                                        </button>

                                        {/* Terms & Conditions */}
                                        <button
                                            type="button"
                                            className="flex w-full items-center gap-2 px-3 py-2.5 text-sm hover:opacity-80 rounded-lg transition-colors font-medium"
                                            style={{ color: "var(--text)" }}
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                navigate("/terms-conditions");
                                            }}
                                        >
                                            <span>Terms &amp; Conditions</span>
                                        </button>
                                    </div>

                                    {/* Logout Section */}
                                    <div
                                        className="p-2 border-t"
                                        style={{ borderColor: "var(--border)" }}
                                    >
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            onClick={() => setLogoutConfirmOpen(true)}
                                        >
                                            <span>Log Out</span>
                                            <LogOut className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* DASHBOARD SUB-NAVIGATION */}
                {isDashboardActive && !hideDashboardSubNav && (
                    <div
                        className="flex items-center gap-4 px-6 py-3 border-b overflow-x-auto no-scrollbar"
                        style={{ borderColor: "var(--border)" }}
                    >
                        <h2 className="text-lg font-bold text-slate-700 mr-4">Dashboard</h2>
                        <div className="flex items-center gap-3">
                            {SUB_NAV_ITEMS.map((item) => {
                                const isActive = isNavItemActive(item);

                                return (
                                    <button
                                        key={item.key}
                                        onClick={DASHBOARD_NAV_ACTIONS[item.label]}
                                        className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all border ${
                                            isActive
                                                ? "bg-[#3b82f6] text-white border-[#3b82f6] shadow-sm"
                                                : "bg-transparent text-slate-400 border-slate-300 hover:border-blue-400"
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

            {/* Mobile Nav Drawer */}
            {mobileNavOpen && (
                <div className="md:hidden fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setMobileNavOpen(false)}
                    />
                    <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
                        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="bg-blue-600 p-1.5 rounded-lg">
                                    <LayoutDashboard className="text-white w-5 h-5" />
                                </div>
                                <span className="font-bold text-gray-800">Inventory</span>
                            </div>
                            <button
                                type="button"
                                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                                onClick={() => setMobileNavOpen(false)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <nav className="p-4">
                            <button
                                type="button"
                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                onClick={() => {
                                    navigate("/dashboard");
                                    setMobileNavOpen(false);
                                }}
                            >
                                <LayoutDashboard className="w-5 h-5 text-gray-400" />
                                Dashboard
                            </button>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardHeader;