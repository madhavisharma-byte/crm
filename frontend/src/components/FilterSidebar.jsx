import React from 'react';
import { X } from 'lucide-react';

const FilterSidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="p-6 pb-4 flex justify-between items-center">
        <h2 className="text-[#334155] font-bold text-lg tracking-tight">FILTERS</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto px-6 space-y-5">
        {/* Order ID */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Order ID</label>
          <input
            type="text"
            placeholder="Enter Order ID"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#fbfcfd]"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Date</label>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#fbfcfd]"
          />
        </div>

        {/* Marketplace - Multi Select Mockup */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Marketplace</label>
          <div className="relative">
            <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-400 appearance-none bg-[#fbfcfd] focus:outline-none">
              <option>Select one or more options</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Status</label>
          <div className="relative">
            <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-400 appearance-none bg-[#fbfcfd] focus:outline-none">
              <option>Select one or more options</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Payment Method</label>
          <div className="relative">
            <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-400 appearance-none bg-[#fbfcfd] focus:outline-none">
              <option>Select one or more options</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* On Hold */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">On Hold</label>
          <div className="relative">
            <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-400 appearance-none bg-[#fbfcfd] focus:outline-none">
              <option>Select</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        {/* Item Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5">Item Name</label>
          <input
            type="text"
            placeholder="Enter Item Name"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-[#fbfcfd]"
          />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="p-6 border-t border-gray-100 flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Clear all
        </button>
        <button
          className="flex-1 px-4 py-2.5 bg-[#2563eb] text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
