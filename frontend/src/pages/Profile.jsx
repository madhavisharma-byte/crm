import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import DashboardHeader from "../components/(website)/Header.jsx";
import DashboardSidebar from "../components/(website)/Sidebar";
import { Edit2, User2, X } from "lucide-react";
import api from "../utils/api";

const bgGradient = "bg-gradient-to-r from-blue-600 to-blue-400";

function getInitials(name, email) {
    if (!name && email) return email[0]?.toUpperCase();
    if (!name) return "?";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0][0]?.toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
}

function InfoRow({ label, value }) {
    return (
        <div className="flex justify-between items-center py-3 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
            <div className="font-semibold" style={{ color: "var(--text)", opacity: 0.7 }}>{label}</div>
            <div className="text-right" style={{ color: "var(--text)" }}>
                {value !== undefined && value !== null && value !== ""
                    ? value
                    : <span className="italic" style={{ color: "var(--text)", opacity: 0.4 }}>Not provided</span>}
            </div>
        </div>
    );
}

// Edit Profile Modal
function EditProfileModal({ open, onClose, initial, onSave, saving, error }) {
    const [form, setForm] = React.useState({
        fullName: initial.fullName || "",
        email: initial.email || "",
        phone: initial.phone || "",
        companyName: initial.companyName || ""
    });

    // Allow updating if initial changes
    React.useEffect(() => {
        setForm({
            fullName: initial.fullName || "",
            email: initial.email || "",
            phone: initial.phone || "",
            companyName: initial.companyName || "",
        });
    }, [initial]);

    const isReadonlyEmail = true;

    function handleChange(e) {
        setForm(f => ({
            ...f,
            [e.target.name]: e.target.value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSave(form);
    }

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl shadow-2xl border p-7 relative animate-in fade-in duration-200" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <X className="w-5 h-5" />
                </button>
                <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
                <form className="grid gap-5 mt-3" onSubmit={handleSubmit} autoComplete="off">
                    <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "var(--text)", opacity: 0.8 }}>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            autoFocus
                            value={form.fullName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg text-base"
                            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "var(--text)", opacity: 0.8 }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg text-base disabled:opacity-70"
                            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                            required
                            disabled={isReadonlyEmail}
                        />
                        {isReadonlyEmail && (
                            <div className="text-xs mt-1" style={{ color: "var(--text)", opacity: 0.5 }}>Email cannot be changed.</div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "var(--text)", opacity: 0.8 }}>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg text-base"
                            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "var(--text)", opacity: 0.8 }}>Company</label>
                        <input
                            type="text"
                            name="companyName"
                            value={form.companyName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg text-base"
                            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                        />
                    </div>
                    {error && (
                        <div className="text-red-600 text-sm text-center">{error}</div>
                    )}
                    <div className="flex justify-end mt-2">
                        <button
                            type="button"
                            className="mr-3 px-4 py-2 rounded-lg border font-medium transition"
                            style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                            onClick={onClose}
                            disabled={saving}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function Profile() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [editOpen, setEditOpen] = React.useState(false);
    const [editSaving, setEditSaving] = React.useState(false);
    const [editErr, setEditErr] = React.useState("");

    // Handle loading state
    if (user === undefined) {
        return (
            <div className="flex justify-center items-center min-h-[70vh]" style={{ backgroundColor: "var(--bg)" }}>
                <div className="flex flex-col items-center space-y-2">
                    <svg
                        className="animate-spin h-8 w-8 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                        />
                    </svg>
                    <div className="text-lg font-medium" style={{ color: "var(--text)", opacity: 0.6 }}>Loading your profile...</div>
                </div>
            </div>
        );
    }

    // Handle not-logged-in state
    if (!user) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[70vh]" style={{ backgroundColor: "var(--bg)" }}>
                <div className="p-8 rounded-xl shadow-lg flex flex-col items-center gap-2" style={{ backgroundColor: "var(--card)" }}>
                    <User2 className="w-10 h-10 text-blue-600 mb-2" />
                    <div className="text-lg font-semibold mb-1" style={{ color: "var(--text)" }}>Access Denied</div>
                    <div className="mb-4 text-center" style={{ color: "var(--text)", opacity: 0.6 }}>
                        You must be logged in to view your profile.
                    </div>
                    <button
                        className="px-6 py-2 rounded-lg bg-blue-600 text-white text-base font-semibold hover:bg-blue-700 transition"
                        onClick={() => navigate("/login")}
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    // Save handler
    async function handleSaveProfile(form) {
        setEditErr("");
        setEditSaving(true);
        try {
            const { data } = await api.put("/auth/profile", {
                fullName: form.fullName,
                phone: form.phone,
                companyName: form.companyName,
            });
            setEditSaving(false);
            setEditOpen(false);
            // Update the AuthContext user
            if (data && data.user) {
                // We need to merge because sometimes backend returns partial or wrapped user
                setUser(prev => ({ ...prev, ...data.user }));
            } else if (data) {
                setUser(prev => ({ ...prev, ...data }));
            }
        } catch (err) {
            setEditSaving(false);
            setEditErr(
                err.response?.data?.message ||
                (typeof err === "string" ? err : "Failed to update profile.")
            );
        }
    }

    return (
        <div className="flex min-h-screen pt-12 md:pt-20 transition-colors duration-300" style={{ backgroundColor: "var(--bg)" }}>
            <EditProfileModal
                open={editOpen}
                onClose={() => { setEditOpen(false); setEditErr(""); }}
                initial={user}
                saving={editSaving}
                error={editErr}
                onSave={handleSaveProfile}
            />
            {/* Sidebar is likely handled by layout but including here if needed per previous file structure */}
            <div className="fixed inset-y-0 left-0 w-64 hidden md:block">
                <DashboardSidebar />
            </div>

            <div className="flex flex-col flex-1 min-w-0 md:pl-64">
                <DashboardHeader profile={user} />
                <main className="flex-1 flex flex-col px-3 sm:px-6 py-6 mt-16" style={{ backgroundColor: "var(--bg)" }}>
                    <section className="max-w-2xl mx-auto w-full">
                        <div className="shadow-xl rounded-2xl overflow-hidden border" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                            {/* PROFILE HERO */}
                            <div className={`flex flex-col items-center justify-center pt-10 pb-6 px-8 ${bgGradient} relative`}>
                                <div className="absolute top-5 right-5">
                                    <button
                                        className="flex items-center gap-2 text-sm px-3 py-2 rounded-xl bg-white/70 hover:bg-white shadow text-blue-700 font-semibold transition"
                                        onClick={() => setEditOpen(true)}
                                    >
                                        <Edit2 className="w-4 h-4" />
                                        Edit
                                    </button>
                                </div>
                                <div className="rounded-full border-4 border-white shadow-lg w-28 h-28 flex items-center justify-center bg-blue-400 overflow-hidden mt-4">
                                    <span className="text-4xl font-extrabold text-white">
                                        {getInitials(user.fullName, user.email)}
                                    </span>
                                </div>
                                <div className="mt-6 flex flex-col items-center">
                                    <div className="text-2xl font-bold text-white drop-shadow">{user.fullName ?? "Unnamed User"}</div>
                                    <div className="text-white/90 font-medium text-base capitalize mt-2 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur">
                                        {user.role}
                                    </div>
                                </div>
                            </div>
                            {/* PROFILE DETAILS */}
                            <div className="p-8 pb-5">
                                <h3 className="text-lg font-medium mb-6 tracking-wide" style={{ color: "var(--text)" }}>Account Information</h3>
                                <div className="divide-y border rounded-lg px-6 py-4" style={{ backgroundColor: "rgba(0,0,0,0.02)", borderColor: "var(--border)" }}>
                                    <InfoRow label="Email" value={user.email} />
                                    <InfoRow label="Phone" value={user.phone} />
                                    <InfoRow label="Company" value={user.companyName} />
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Profile;
