import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  ChevronDown,
  User as UserIcon,
  X,
  Trash2
} from 'lucide-react';
import Sidebar from '../../website/Sidebar';
import Header from '../../website/Header'; // Import Header component

const UsersPage = () => {
  const [view, setView] = useState('list');

  const [users] = useState([
    {
      id: 1,
      name: 'spacetotech',
      userName: 'testinguser',
      email: 'spacetotech@gmail.com',
      phone: '9988776655',
      addedOn: '24 dec 2025, 02:23',
      lastLogin: '24 dec 2025, 02:23',
      lastLoggedFrom: '2406:400:6845:5785',
      status: 'Enabled'
    }
  ]);

  return (
    <div className="flex h-screen bg-white overflow-hidden font-sans">
      <Sidebar activePage="users" />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        <Header />
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {view === 'list' ? (
            <UserList users={users} onAddUser={() => setView('create')} />
          ) : (
            <CreateUserForm onClose={() => setView('list')} />
          )}
        </div>
      </div>
      {/* Responsive Tailwind style for custom scrollbars and layout tweaks */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e6e7ee; border-radius: 10px; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #e6e7ee transparent; }
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

/* --- SUB-COMPONENT: USER LIST TABLE --- */
const UserList = ({ users, onAddUser }) => (
  <>
    <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white sticky top-0 z-10 gap-2">
      <h1 className="text-lg font-bold text-slate-700">Users</h1>
      <button
        onClick={onAddUser}
        className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-sm"
      >
        <Plus size={18} /> Add User
      </button>
    </div>

    {/* Search and Filter Row */}
    <div className="px-4 sm:px-6 py-4 flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
      <div className="relative w-full sm:w-64">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <Search size={16} />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-lg text-sm text-slate-600 hover:bg-gray-50 transition-colors">
        <Filter size={16} /> Filter
      </button>
    </div>

    {/* Responsive Table Container */}
    <div className="px-2 sm:px-6 pb-6 overflow-x-auto">
      <div className="border border-gray-200 rounded-sm overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-[#eef2ff]">
            <tr>
              <th className="px-2 sm:px-4 py-3 text-[13px] font-medium text-slate-600 border-b border-gray-200 whitespace-nowrap">
                Name
              </th>
              <th className="px-2 sm:px-4 py-3 text-[13px] font-medium text-slate-600 border-b border-gray-200 whitespace-nowrap">
                User Name
              </th>
              <th className="px-2 sm:px-4 py-3 text-[13px] font-medium text-slate-600 border-b border-gray-200 whitespace-nowrap">
                Email
              </th>
              <th className="px-2 sm:px-4 py-3 text-[13px] font-medium text-slate-600 border-b border-gray-200 whitespace-nowrap">
                Phone
              </th>
              <th className="px-2 sm:px-4 py-3 text-[13px] font-medium text-slate-600 border-b border-gray-200 whitespace-nowrap">
                Added on
              </th>
              <th className="px-2 sm:px-4 py-3 text-[13px] font-medium text-slate-600 border-b border-gray-200 whitespace-nowrap">
                Last Login
              </th>
              <th className="px-2 sm:px-4 py-3 text-[13px] font-medium text-slate-600 border-b border-gray-200 whitespace-nowrap">
                Last Logged from
              </th>
              <th className="px-2 sm:px-4 py-3 text-[13px] font-medium text-slate-600 border-b border-gray-200 whitespace-nowrap">
                Enabled
              </th>
              <th className="px-2 sm:px-4 py-3 text-[13px] font-medium text-slate-600 border-b border-gray-200 text-center whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-2 sm:px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{user.name}</td>
                <td className="px-2 sm:px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{user.userName}</td>
                <td className="px-2 sm:px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{user.email}</td>
                <td className="px-2 sm:px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{user.phone}</td>
                <td className="px-2 sm:px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{user.addedOn}</td>
                <td className="px-2 sm:px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{user.lastLogin}</td>
                <td className="px-2 sm:px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{user.lastLoggedFrom}</td>
                <td className="px-2 sm:px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{user.status}</td>
                <td className="px-2 sm:px-4 py-4 text-center whitespace-nowrap">
                  <button className="text-[#3b82f6] font-bold text-xs uppercase hover:underline">EDIT</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Mobile Card View: Show on small screens */}
        <div className="sm:hidden">
          {users.map((user) => (
            <div key={user.id} className="p-4 border-b last:border-b-0 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-blue-500">
                  <UserIcon size={20} />
                </span>
                <span className="font-semibold">{user.name}</span>
                <button className="ml-auto text-[#3b82f6] font-bold text-xs uppercase hover:underline">
                  EDIT
                </button>
              </div>
              <div className="text-xs text-slate-500">
                <div>
                  <span className="font-semibold">Username:</span> {user.userName}
                </div>
                <div>
                  <span className="font-semibold">Email:</span> {user.email}
                </div>
                <div>
                  <span className="font-semibold">Phone:</span> {user.phone}
                </div>
                <div>
                  <span className="font-semibold">Added on:</span> {user.addedOn}
                </div>
                <div>
                  <span className="font-semibold">Last Login:</span> {user.lastLogin}
                </div>
                <div>
                  <span className="font-semibold">Last Logged from:</span> {user.lastLoggedFrom}
                </div>
                <div>
                  <span className="font-semibold">Status:</span> {user.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
);

/* --- SUB-COMPONENT: CREATE USER FORM (Unchanged logic, with responsive improvements) --- */
const CreateUserForm = ({ onClose }) => {
  const [rows, setRows] = useState([{ id: Date.now() }]);
  const addRow = () => setRows([...rows, { id: Date.now() }]);

  return (
    <div className="bg-white flex flex-col min-h-full">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white sticky top-0 z-20 gap-2">
        <h2 className="text-xl font-bold text-slate-800">Create User</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-auto">
          <X size={24} />
        </button>
      </div>

      <div className="px-2 sm:p-8 space-y-12">
        <section>
          <div className="flex gap-3 sm:gap-4 mb-6">
            <div className="w-1 h-12 bg-blue-600 rounded-full" />
            <div>
              <h3 className="text-xl font-bold text-slate-800">Contact Details</h3>
              <p className="text-xs text-gray-500 mt-1">Enter Basic Details and Username.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            <FormGroup label="Name" placeholder="Enter Name" required />
            <FormGroup label="Mobile" placeholder="Enter Mobile" required />
            <FormGroup label="Email (Username)" placeholder="Enter Email" required />
            <FormGroup label="Filed" placeholder="Enter Filed" required />
            <div className="md:col-span-1">
              <FormSelect label="Active Status" required options={['Enabled', 'Disabled']} />
            </div>
          </div>
        </section>

        <section>
          <div className="flex gap-3 sm:gap-4 mb-6 items-center">
            <div className="w-1 h-12 bg-blue-600 rounded-full" />
            <h3 className="text-xl font-bold text-slate-800">User Roles</h3>
          </div>
          {/* ... Role Table ... */}
          <div className="border border-gray-200 rounded-sm overflow-x-auto">
            <table className="min-w-[600px] w-full border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="px-3 sm:px-4 py-3 text-sm font-medium text-slate-400 text-left w-1/4">Level</th>
                  <th className="px-3 sm:px-4 py-3 text-sm font-medium text-slate-400 text-left w-1/4">Roles</th>
                  <th className="px-3 sm:px-4 py-3 text-sm font-medium text-slate-400 text-left w-1/4">Facilities Code</th>
                  <th className="px-3 sm:px-4 py-3 text-sm font-medium text-slate-400 text-left w-12">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 last:border-none">
                    <td className="p-2 sm:p-3 border-r border-gray-200">
                      <TableSelect placeholder="Facility" options={['Facility', 'Organization']} />
                    </td>
                    <td className="p-2 sm:p-3 border-r border-gray-200">
                      <TableSelect placeholder="Choose Role" />
                    </td>
                    <td className="p-2 sm:p-3 border-r border-gray-200">
                      <TableSelect placeholder="Choose Facilities" />
                    </td>
                    <td className="p-2 sm:p-3 text-center">
                      {rows.length > 1 && (
                        <button
                          onClick={() => setRows(rows.filter(r => r.id !== row.id))}
                          className="text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-2 sm:p-3 border-t border-gray-100">
              <button onClick={addRow} className="text-[#2563eb] text-sm font-bold">Add Row</button>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-auto px-4 sm:px-6 py-4 sm:py-6 border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={onClose}
          className="px-6 sm:px-8 py-2 border border-gray-300 rounded-md text-sm">
          Cancel
        </button>
        <button className="px-6 sm:px-8 py-2 bg-[#2563eb] text-white rounded-md text-sm">
          Add User
        </button>
      </div>
    </div>
  );
};

/* --- SHARED COMPONENTS --- */
const FormGroup = ({ label, placeholder, required }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

const FormSelect = ({ label, required, options }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select className="w-full appearance-none px-4 py-2 bg-[#f8fafc] border border-gray-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
    </div>
  </div>
);

const TableSelect = ({ placeholder, options = [] }) => (
  <div className="relative">
    <select className="w-full appearance-none px-3 py-1.5 bg-white text-sm text-slate-400 focus:outline-none">
      <option value="">{placeholder}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" size={14} />
  </div>
);

export default UsersPage;