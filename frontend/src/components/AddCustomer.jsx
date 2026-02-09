import React, { useState } from 'react';
import {
    ChevronDown,
    Upload,
    User,
    Mail,
    Phone,
    Globe,
    FileText,
    MapPin,
    Plus
} from 'lucide-react';

const AddCustomer = () => {
    const [isSameAddress, setIsSameAddress] = useState(true);

    // Helper Component for Section Headers
    const SectionHeader = ({ title }) => (
        <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {title}
            </h2>
        </div>
    );

    // Handler for Cancel button
    const handleCancel = () => {
        // Option 1: Reset all fields if you implement state for forms (not shown here)
        // Option 2: Simple redirect to previous page:
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = '/';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-700">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center">
                <h1 className="text-xl font-semibold">
                    <span className="text-slate-400">Customers/</span>Add Customers
                </h1>
                <button className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                    <Upload size={18} />
                </button>
            </div>

            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 space-y-10">

                    {/* SECTION 1: GENERAL DETAILS */}
                    <section>
                        <SectionHeader title="General Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Status</label>
                                <div className="relative">
                                    <select className="w-full px-3 py-2 border rounded-md text-sm appearance-none focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                                        <option>Enable</option>
                                        <option>Disable</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-3 text-blue-500 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Customer Name *</label>
                                <input
                                    type="text"
                                    placeholder="John Deo Pvt. Ltd"
                                    className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Code *</label>
                                <input
                                    type="text"
                                    placeholder="JOHN_DEO"
                                    className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Website URL</label>
                                <input
                                    type="text"
                                    placeholder="www.johndeo.com"
                                    className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: ACCOUNTING DETAILS */}
                    <section>
                        <SectionHeader title="Accounting Details" />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-medium">PAN*</label>
                                <input type="text" placeholder="ABC12345F" className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">TIN</label>
                                <input type="text" placeholder="072ABC12345F" className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Central Sale Tax</label>
                                <div className="relative">
                                    <Mail size={14} className="absolute left-3 top-3 text-slate-400" />
                                    <input type="text" placeholder="john@example.com" className="w-full pl-9 pr-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Service Tax</label>
                                <input type="text" placeholder="ABC12345F" className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">GSTIN</label>
                                <input type="text" placeholder="072ABC12345F" className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Tax Exempted</label>
                                <div className="relative">
                                    <select className="w-full px-3 py-2 border rounded-md text-sm appearance-none outline-none">
                                        <option>Select</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-3 text-blue-500 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Registered Dealer</label>
                                <div className="relative">
                                    <select className="w-full px-3 py-2 border rounded-md text-sm appearance-none outline-none">
                                        <option>Select</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-3 text-blue-500 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">TCS Addition Enabled</label>
                                <div className="relative">
                                    <select className="w-full px-3 py-2 border rounded-md text-sm appearance-none outline-none">
                                        <option>Select</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-3 text-blue-500 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Provides C Form</label>
                                <div className="relative">
                                    <select className="w-full px-3 py-2 border rounded-md text-sm appearance-none outline-none">
                                        <option>john@example.com</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-3 text-blue-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: POINT OF CONTACT DETAILS */}
                    <section>
                        <SectionHeader title="Point of Contact Details" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Contact Name</label>
                                <div className="relative">
                                    <select className="w-full px-3 py-2 border rounded-md text-sm appearance-none outline-none bg-white">
                                        <option>John Deo</option>
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-3 text-blue-500 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Contact Email</label>
                                <input type="email" placeholder="johndea@example.com" className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Contact Mobile</label>
                                <input type="text" placeholder="9876543210" className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium">Contact Fax</label>
                                <input type="text" placeholder="9876543210" className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                        </div>
                    </section>

                    {/* SECTION 4: BILLING & SHIPPING */}
                    <section>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Billing & Shipping
                                </h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">
                                    Shipping Address is Same As Billing Address
                                </span>
                                <button
                                    onClick={() => setIsSameAddress(!isSameAddress)}
                                    type="button"
                                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${isSameAddress ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isSameAddress ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">Address Line 1 *</label>
                                <input type="text" placeholder="Address Line 1" className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-400">Address Line 2 <span className="italic font-normal">(Optional)</span></label>
                                <input type="text" placeholder="Address Line 2" className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">Country *</label>
                                <div className="relative">
                                    <select className="w-full px-3 py-2 border rounded-md text-sm appearance-none outline-none">
                                        <option>India</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-3 top-3 text-blue-500" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">State *</label>
                                <div className="relative">
                                    <select className="w-full px-3 py-2 border rounded-md text-sm appearance-none outline-none">
                                        <option>Select state</option>
                                    </select>
                                    <ChevronDown size={12} className="absolute right-3 top-3 text-blue-500" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">City</label>
                                <input type="text" placeholder="City" className="w-full px-3 py-2 border rounded-md text-sm outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-400">District <span className="italic font-normal">(optional)</span></label>
                                <input type="text" placeholder="District" className="w-full px-3 py-2 border rounded-md text-sm outline-none" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">Pin Code *</label>
                                <input type="text" placeholder="Pin code" className="w-full px-3 py-2 border rounded-md text-sm outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">Latitude *</label>
                                <input type="text" placeholder="Latitude" className="w-full px-3 py-2 border rounded-md text-sm outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">Longitude *</label>
                                <input type="text" placeholder="Longitude" className="w-full px-3 py-2 border rounded-md text-sm outline-none" />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-400">Email <span className="italic font-normal">(optional)</span></label>
                                <input type="text" placeholder="Phone" className="w-full px-3 py-2 border rounded-md text-sm outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-slate-500">Phone</label>
                                <input type="text" placeholder="Phone" className="w-full px-3 py-2 border rounded-md text-sm outline-none" />
                            </div>
                        </div>
                    </section>
                </div>

                {/* FOOTER ACTIONS */}
                <div className="p-4 bg-slate-50 border-t flex justify-end gap-3">
                    <button
                        className="px-6 py-2 border rounded-md text-sm font-medium hover:bg-white transition-colors"
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors">
                        Create Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCustomer;