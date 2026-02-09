import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Bell,
  ChevronDown,
  User as UserIcon,
  X,
  Trash2
} from 'lucide-react';
import Sidebar from '../components/(website)/Sidebar';

const UsersPage = () => {
  const [view, setView] = useState('list'); // 'list' or 'create'

  // Mock data for the table
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
        {/* Top Global Navbar */}
        <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-[#f8fafc] flex-shrink-0">
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
          <div className="flex items-center space-x-6">
            <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer">
              Sale Order <ChevronDown size={14} />
            </div>
            <div className="relative cursor-pointer">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute -top-1 -right-1 bg-red-500 border-2 border-white w-2.5 h-2.5 rounded-full"></span>
            </div>
            <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700 leading-none">Gautam ch</p>
                <p className="text-xs text-gray-400 mt-1">Store Admin</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
                <UserIcon className="text-gray-500" size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Conditional Rendering */}
        <div className="flex-1 overflow-y-auto">
          {view === 'list' ? (
            <UserList users={users} onAddUser={() => setView('create')} />
          ) : (
            <CreateUserForm onClose={() => setView('list')} />
          )}
        </div>
      </div>
    </div>
  );
};

/* --- SUB-COMPONENT: USER LIST TABLE --- */
const UserList = ({ users, onAddUser }) => (
  <>
    <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
      <h1 className="text-lg font-bold text-slate-700">Users</h1>
      <button
        onClick={onAddUser}
        className="bg-[#2563eb] hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-sm"
      >
        <Plus size={18} /> Add User
      </button>
    </div>

    <div className="px-6 py-4 flex justify-end gap-3">
      <div className="relative w-72">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <Search size={16} />
        </span>
        <input type="text" placeholder="Search" className="w-full pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
      </div>
      <button className="flex items-center gap-2 px-4 py-1.5 border border-gray-200 rounded-lg text-sm text-slate-600 hover:bg-gray-50 transition-colors">
        <Filter size={16} /> Filter
      </button>
    </div>

    <div className="px-6 pb-6">
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#eef2ff]">
            <tr>
              <th className="px-4 py-4 text-[13px] font-semibold text-slate-600">Name</th>
              <th className="px-4 py-4 text-[13px] font-semibold text-slate-600">User Name</th>
              <th className="px-4 py-4 text-[13px] font-semibold text-slate-600">Email</th>
              <th className="px-4 py-4 text-[13px] font-semibold text-slate-600 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-5 text-sm text-slate-600">{user.name}</td>
                <td className="px-4 py-5 text-sm text-slate-600">{user.userName}</td>
                <td className="px-4 py-5 text-sm text-slate-600">{user.email}</td>
                <td className="px-4 py-5 text-center">
                  <button className="text-[#3b82f6] font-bold text-xs uppercase tracking-widest hover:underline">EDIT</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

/* --- SUB-COMPONENT: CREATE USER FORM --- */
const CreateUserForm = ({ onClose }) => {
  const [rows, setRows] = useState([{ id: Date.now() }]);

  const addRow = () => setRows([...rows, { id: Date.now() }]);

  return (
    <div className="bg-white flex flex-col min-h-full">
      {/* Form Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-20">
        <h2 className="text-xl font-bold text-slate-800">Create User</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="p-8 space-y-12">
        {/* Section 1: Contact Details */}
        <section className="relative">
          <div className="flex gap-4 mb-6">
            <div className="w-1 h-12 bg-blue-600 rounded-full" />
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">Contact Details</h3>
              <p className="text-xs text-gray-500 mt-1 font-medium italic">
                Enter Basic Warehouse Details And Upload Logo Image File To Be Used On Invoice.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FormGroup label="Name" placeholder="Enter Name" required />
            <FormGroup label="Mobile" placeholder="Enter Mobile" required />
            <FormGroup label="Email (Username)" placeholder="Enter Email (Username)" required />
            <div className="md:col-span-1">
              <FormSelect label="Active Status" required options={['Enabled', 'Disabled']} />
            </div>
          </div>
        </section>

        {/* Section 2: User Roles */}
        <section className="relative">
          <div className="flex gap-4 mb-6">
            <div className="w-1 h-12 bg-blue-600 rounded-full" />
            <div>
              <h3 className="text-xl font-bold text-slate-800 leading-tight">User Roles</h3>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                This Section Will Help You Assign Roles (One Or Multiple) To A User. If You Are Operating With More Than 1 Facility, You Can Assign Roles As Per Facility As Well.
              </p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-sm overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="px-4 py-3 text-sm font-medium text-slate-400 text-left border-r border-gray-200 w-1/4">Level</th>
                  <th className="px-4 py-3 text-sm font-medium text-slate-400 text-left border-r border-gray-200 w-1/4">Roles</th>
                  <th className="px-4 py-3 text-sm font-medium text-slate-400 text-left border-r border-gray-200 w-1/4">Facilities Code</th>
                  <th className="px-4 py-3 text-sm font-medium text-slate-400 text-left w-12">Action</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 last:border-none">
                    <td className="p-3 border-r border-gray-200">
                      <TableSelect placeholder="Facility" options={['Facility', 'Organization']} />
                    </td>
                    <td className="p-3 border-r border-gray-200">
                      <TableSelect placeholder="Choose Role" />
                    </td>
                    <td className="p-3 border-r border-gray-200">
                      <TableSelect placeholder="Choose Facilities" />
                    </td>
                    <td className="p-3 text-center">
                      {rows.length > 1 && (
                        <button onClick={() => setRows(rows.filter(r => r.id !== row.id))} className="text-red-400 hover:text-red-600">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-3 border-t border-gray-100 bg-white">
              <button onClick={addRow} className="text-[#2563eb] text-sm font-bold hover:underline">
                Add Row
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Form Footer */}
      <div className="mt-auto p-6 border-t border-gray-200 flex justify-end gap-3 bg-white sticky bottom-0">
        <button onClick={onClose} className="px-8 py-2 border border-gray-300 rounded-md text-sm font-medium text-slate-600 hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-8 py-2 bg-[#2563eb] text-white rounded-md text-sm font-medium hover:bg-blue-700 shadow-sm">
          Add User
        </button>
      </div>
    </div>
  );
};

/* --- SHARED HELPER COMPONENTS --- */

const FormGroup = ({ label, placeholder, required }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
    />
  </div>
);

const FormSelect = ({ label, required, options }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <select className="w-full appearance-none px-4 py-2.5 bg-[#f8fafc] border border-gray-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
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