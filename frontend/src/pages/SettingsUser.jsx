
import React, { useState } from "react";
import { Users, Plus, Check, X } from "lucide-react";
import Sidebar from "../components/(website)/Sidebar";
import Header from "../components/(website)/header";
import SettingsHeader from "../components/SettingsHeader";

// --- Team members and role permissions data: Will be fetched from backend API in future ---
const initialTeamMembers = [
  {
    name: "Amit Kumar",
    email: "amit@example.com",
    mobile: "9123456789",
    role: "Admin",
    initials: "AK",
    color: "bg-red-500",
  },
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    mobile: "",
    role: "Manager",
    initials: "PS",
    color: "bg-purple-500",
  },
  {
    name: "Raj Verma",
    email: "raj@example.com",
    mobile: "",
    role: "Staff",
    initials: "RV",
    color: "bg-orange-400",
  },
];

const rolePermissions = [
  {
    role: "Admin",
    dotColor: "bg-red-500",
    permissions: [
      "Full system access",
      "User management",
      "Settings configuration",
    ],
  },
  {
    role: "Manager",
    dotColor: "bg-purple-500",
    permissions: ["Order management", "Inventory updates", "View reports"],
  },
  {
    role: "Staff",
    dotColor: "bg-orange-400",
    permissions: ["View orders", "Update order status"],
  },
];

const ROLE_COLORS = {
  Admin: "bg-red-500",
  Manager: "bg-purple-500",
  Staff: "bg-orange-400",
};

const SettingsUserPage = () => {
  const [showModal, setShowModal] = useState(false); // Both for Add and Edit mode
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [editUser, setEditUser] = useState(null); // null for add, otherwise the user object for edit

  // Add user
  const handleAddUser = (user) => {
    setTeamMembers((prev) => [
      ...prev,
      {
        ...user,
        initials: getInitials(user.name),
        color: ROLE_COLORS[user.role] || "bg-gray-400",
      },
    ]);
  };

  // Update user
  const handleUpdateUser = (updatedUser) => {
    setTeamMembers((prev) =>
      prev.map((usr) =>
        usr.email === updatedUser.originalEmail
          ? {
            ...updatedUser,
            initials: getInitials(updatedUser.name),
            color: ROLE_COLORS[updatedUser.role] || "bg-gray-400",
          }
          : usr
      )
    );
  };

  // Open modal in add mode
  const openAddModal = () => {
    setEditUser(null);
    setShowModal(true);
  };
  // Open modal in edit mode
  const openEditModal = (user) => {
    setEditUser(user);
    setShowModal(true);
  };

  // Modal dismiss
  const handleModalClose = () => {
    setShowModal(false);
    setEditUser(null);
  };

  return (
    <div className="flex min-h-screen w-full font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-w-0 md:ml-64">
        <Header />
        <div className="pt-24 px-8 flex-1 overflow-y-auto">
          <SettingsHeader activeTab="Users" />

          <div className="flex items-center gap-2 mb-6">
            <Users className="text-blue-600 w-5 h-5" />
            <h3 className="font-bold text-gray-800">Team Member</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Team Members List */}
            <div className="rounded-xl shadow-sm border p-6 h-fit" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold" style={{ color: "var(--text)" }}>Team Members</h3>
                  <p className="text-xs mt-1" style={{ color: "var(--text)", opacity: 0.6 }}>
                    Manage users and their permissions
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openAddModal}
                  className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                >
                  <Plus size={14} />
                  Add User
                </button>
              </div>
              <div className="space-y-4">
                {teamMembers.map((user) => (
                  <UserRow
                    key={user.email}
                    name={user.name}
                    email={user.email}
                    mobile={user.mobile}
                    role={user.role}
                    initials={user.initials}
                    color={user.color}
                    onEdit={() => openEditModal(user)}
                  />
                ))}
              </div>
            </div>
            {/* Role Permissions Card */}
            <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              <div className="mb-6">
                <h3 className="font-bold" style={{ color: "var(--text)" }}>Role Permissions</h3>
                <p className="text-xs mt-1" style={{ color: "var(--text)", opacity: 0.6 }}>
                  Define what each role can access
                </p>
              </div>
              <div className="space-y-4">
                {rolePermissions.map((roleObj) => (
                  <RoleCard
                    key={roleObj.role}
                    role={roleObj.role}
                    dotColor={roleObj.dotColor}
                    permissions={roleObj.permissions}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Modal for Add/Edit User */}
          {showModal && (
            <AddUserModal
              onClose={handleModalClose}
              onAdd={handleAddUser}
              onUpdate={handleUpdateUser}
              editUser={editUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                           Sub Components                                   */
/* -------------------------------------------------------------------------- */

const UserRow = React.memo(function UserRow({
  name,
  email,
  mobile,
  role,
  initials,
  color,
  onEdit,
}) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg transition-colors" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white text-xs font-bold`}
        >
          {initials}
        </div>
        <div>
          <h4 className="text-sm font-bold" style={{ color: "var(--text)" }}>{name}</h4>
          <p className="text-xs" style={{ color: "var(--text)", opacity: 0.5 }}>{email}</p>
          {/* Mobile number removed from user card as per instructions */}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="bg-[#10B981] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
          {role}
        </span>
        <button
          className="text-gray-400 hover:text-gray-600 text-xs font-medium flex items-center gap-1"
          onClick={onEdit}
          type="button"
        >
          Edit
        </button>
      </div>
    </div>
  );
});

const RoleCard = React.memo(function RoleCard({ role, dotColor, permissions }) {
  return (
    <div className="border rounded-lg p-4" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
        <h4 className="font-bold text-sm text-gray-800">{role}</h4>
      </div>
      <ul className="space-y-2">
        {permissions.map((perm, index) => (
          <li key={index} className="flex items-center gap-2 text-xs" style={{ color: "var(--text)", opacity: 0.7 }}>
            <Check size={12} style={{ color: "var(--text)" }} strokeWidth={3} />
            {perm}
          </li>
        ))}
      </ul>
    </div>
  );
});

function getInitials(name = "") {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + (parts[1][0] || "")).toUpperCase();
}

// Add/Edit User Modal, enables edit and add user with dynamic button name and state
function AddUserModal({ onClose, onAdd, onUpdate, editUser }) {
  // If in edit mode, init form values to user; else to blank
  const [form, setForm] = useState(
    editUser
      ? {
        name: editUser.name || "",
        email: editUser.email || "",
        mobile: editUser.mobile || "",
        role: editUser.role || "",
        originalEmail: editUser.email, // Used for identifying which user to update
      }
      : {
        name: "",
        email: "",
        mobile: "",
        role: "",
      }
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const isEdit = !!editUser;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  const handleSelect = (e) => {
    setForm((prev) => ({ ...prev, role: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.role) {
      setError("Please fill all required fields.");
      return;
    }

    setSaving(true);

    setTimeout(() => {
      if (isEdit) {
        // Edit mode
        onUpdate(form);
      } else {
        // Add mode
        onAdd(form);
      }
      setSaving(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50">
      <div className="rounded-xl shadow-xl border w-full max-w-md mx-2 relative" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <form className="px-8 py-8" onSubmit={handleSubmit} autoComplete="off">
          <h2 className="text-xl font-bold text-center mb-2" style={{ color: "var(--text)" }}>{isEdit ? "Edit User" : "Add User"}</h2>
          <p className="text-sm text-center mb-7" style={{ color: "var(--text)", opacity: 0.5 }}>
            Download Full Or Filtered Data For External Use.
          </p>

          {/* User Name */}
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text)", opacity: 0.7 }}>
              User Name
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
              placeholder="Write user name"
              value={form.name}
              onChange={handleChange("name")}
              required
              autoFocus
            />
          </div>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text)", opacity: 0.7 }}>
              Email ID
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
              placeholder="eg. username@gmail.com"
              value={form.email}
              onChange={handleChange("email")}
              required
              disabled={isEdit} // Email not editable during edit
            />
          </div>
          {/* Mobile Number (optional) */}
          <div className="mb-4">
            <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text)", opacity: 0.7 }}>
              Mobile Number <span style={{ opacity: 0.6 }}>(Optional)</span>
            </label>
            <div className="flex">
              <span className="flex items-center px-3 border rounded-l-lg text-sm select-none" style={{ backgroundColor: "rgba(0,0,0,0.02)", borderColor: "var(--border)", color: "var(--text)", opacity: 0.7 }}>
                +91
              </span>
              <input
                type="tel"
                pattern="[0-9]{10}"
                className="w-full border border-l-0 rounded-r-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                placeholder="eg. 9988776655"
                value={form.mobile}
                onChange={handleChange("mobile")}
                maxLength={10}
              />
            </div>
          </div>
          {/* Select Permission */}
          <div className="mb-6">
            <label className="block text-xs font-semibold mb-1" style={{ color: "var(--text)", opacity: 0.7 }}>
              Select Permission
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
              style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
              value={form.role}
              onChange={handleSelect}
              required
            >
              <option value="">Select Permission</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          {error && (
            <div className="mb-3 text-xs text-red-500 text-center">{error}</div>
          )}

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-5 py-2 rounded-lg border transition-colors text-sm font-medium"
              style={{ borderColor: "var(--border)", color: "var(--text)", opacity: 0.8 }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-medium ${saving ? "opacity-60 cursor-wait" : ""}`}
              disabled={saving}
            >
              {saving ? (isEdit ? "Updating..." : "Saving...") : isEdit ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsUserPage;