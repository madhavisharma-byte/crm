import React, { useState } from 'react';
import { Filter, Plus } from 'lucide-react';
import Sidebar from '../components/(website)/Sidebar';
import Header from '../components/(website)/header';
import AddCustomer from '../components/AddCustomer';
import AddDiscountCustomer from '../components/AddDiscountCustomer'; // Import AddDiscountCustomer

// Columns for main Customers table
const CUSTOMER_COLUMNS = [
    { key: 'customer', label: 'Customer' },
    { key: 'code', label: 'Customer Code' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'city', label: 'City' },
    { key: 'phone', label: 'Customer Phone' },
];

// Columns for Customers Discount Group table (matches image)
const DISCOUNT_GROUP_COLUMNS = [
    { key: 'mappingCode', label: 'Mapping Code' },
    { key: 'customerCode', label: 'Customer Code' },
    { key: 'discountGroupCode', label: 'Discount Group Code' },
    { key: 'effectiveFrom', label: 'Effective From' },
    { key: 'effectiveTo', label: 'Effective To' },
    { key: 'created', label: 'Created' },
    { key: 'updated', label: 'Updated' },
    { key: 'action', label: 'Action' },
];

const CustomerPage = () => {
    const [activeTab, setActiveTab] = useState('Customers');
    const [data] = useState([]); // No customer data
    const [discountGroupData] = useState([]); // No discount group data
    const [showAddCustomer, setShowAddCustomer] = useState(false);
    const [showAddDiscountGroup, setShowAddDiscountGroup] = useState(false);

    // Button text based on tab
    const actionButtonText =
        activeTab === 'Customers Discount Group'
            ? 'Create Customers Discount Group'
            : 'Add Customer';

    // Handler for Add Customer or Add Discount Group button
    const handleAddCustomerClick = () => {
        if (activeTab === 'Customers') {
            setShowAddCustomer(true);
        } else if (activeTab === 'Customers Discount Group') {
            setShowAddDiscountGroup(true);
        }
    };

    // Close AddCustomer form
    const handleCloseAddCustomer = () => {
        setShowAddCustomer(false);
    };

    // Close AddDiscountCustomer form
    const handleCloseAddDiscountGroup = () => {
        setShowAddDiscountGroup(false);
    };

    if (showAddCustomer && activeTab === 'Customers') {
        // Show the AddCustomer page in place
        return (
            <div className="flex min-h-screen w-full bg-[#FBFCFE] font-sans text-[#111927]">
                <Sidebar activePage="customers" />
                <div className="flex-1 min-h-screen flex flex-col">
                    <Header />
                    {/* Show Back button after the header */}
                    <div className="px-8 pt-6 pb-2">
                        <button
                            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                            onClick={handleCloseAddCustomer}
                        >
                            &larr; Back to Customers
                        </button>
                    </div>
                    <div className="p-4 md:p-0">
                        <AddCustomer />
                    </div>
                </div>
            </div>
        );
    }

    if (showAddDiscountGroup && activeTab === 'Customers Discount Group') {
        // Show the AddDiscountCustomer page in place
        return (
            <div className="flex min-h-screen w-full bg-[#FBFCFE] font-sans text-[#111927]">
                <Sidebar activePage="customers" />
                <div className="flex-1 min-h-screen flex flex-col">
                    <Header />
                    {/* Show Back button after the header */}
                    <div className="px-8 pt-6 pb-2">
                        <button
                            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                            onClick={handleCloseAddDiscountGroup}
                        >
                            &larr; Back to Customers Discount Group
                        </button>
                    </div>
                    <div className="p-4 md:p-0">
                        <AddDiscountCustomer />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full bg-[#FBFCFE] font-sans text-[#111927]">
            {/* Sidebar */}
            <Sidebar activePage="customers" />

            <div className="flex-1 min-h-screen flex flex-col">
                {/* Header */}
                <Header />

                {/* Main Page Content */}
                <main className="p-8">
                    <h1 className="text-3xl font-bold text-[#111927] mb-6">Customers</h1>

                    <div className="flex items-center justify-between border-b border-gray-200 mb-8">
                        {/* Tab Switcher */}
                        <div className="flex gap-8">
                            {['Customers', 'Customers Discount Group'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-3 text-sm font-semibold transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 mb-2">
                            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
                                <Filter size={16} /> Filter
                            </button>
                            <button
                                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#3B82F6] rounded-lg hover:bg-blue-600 shadow-md transition"
                                onClick={handleAddCustomerClick}
                            >
                                <Plus size={18} />
                                {actionButtonText}
                            </button>
                        </div>
                    </div>

                    {/* TABLE AREA */}
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead>
                                {activeTab === 'Customers' ? (
                                    <tr className="bg-[#E9F0FD] border-b border-gray-100">
                                        <th className="p-4 w-14">
                                            <div className="flex justify-center">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 border-2 border-blue-400 rounded-full appearance-none cursor-pointer checked:bg-blue-500 transition-all relative before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-blue-400"
                                                />
                                            </div>
                                        </th>
                                        {CUSTOMER_COLUMNS.map((col) => (
                                            <th key={col.key} className="p-4 text-sm font-bold text-gray-600">
                                                {col.label}
                                            </th>
                                        ))}
                                    </tr>
                                ) : (
                                    <tr className="bg-[#E9F0FD] border-b border-gray-100">
                                        {DISCOUNT_GROUP_COLUMNS.map(col => (
                                            <th
                                                key={col.key}
                                                className="p-4 text-xs font-semibold text-gray-500 whitespace-nowrap"
                                            >
                                                {col.label}
                                            </th>
                                        ))}
                                    </tr>
                                )}
                            </thead>
                            <tbody>
                                {/* No Data state for both tables */}
                                {activeTab === 'Customers' ? (
                                    data.length === 0 ? (
                                        <tr>
                                            <td colSpan={CUSTOMER_COLUMNS.length + 1} className="py-24">
                                                <div className="flex flex-col items-center justify-center text-center">
                                                    <p className="text-sm font-semibold text-gray-400">
                                                        No data to Display
                                                    </p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        data.map((row, idx) => (
                                            <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                                <td className="p-4 text-center">
                                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                                                </td>
                                                <td className="p-4 text-sm">{row.customer}</td>
                                                <td className="p-4 text-sm text-gray-500 font-mono">{row.code}</td>
                                                <td className="p-4 text-sm font-medium">{row.name}</td>
                                                <td className="p-4 text-sm text-blue-600 underline cursor-pointer">{row.email}</td>
                                                <td className="p-4 text-sm text-gray-500">{row.city}</td>
                                                <td className="p-4 text-sm font-medium">{row.phone}</td>
                                            </tr>
                                        ))
                                    )
                                ) : (
                                    discountGroupData.length === 0 ? (
                                        <tr>
                                            <td colSpan={DISCOUNT_GROUP_COLUMNS.length} className="py-8">
                                                <div className="flex flex-col items-center justify-center text-center">
                                                    <p className="text-sm font-semibold text-gray-400">No data to Display</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        discountGroupData.map((row, idx) => (
                                            <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition">
                                                {DISCOUNT_GROUP_COLUMNS.map(col => (
                                                    <td key={col.key} className="p-4 text-sm">
                                                        {row[col.key]}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CustomerPage;