import React, { useState } from 'react';
import { ChevronDown, Calendar, X, Info } from 'lucide-react';

const CreateDiscountGroup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    discountGroupCode: '',
    customerCode: '',
    mappingCode: '',
    effectiveFrom: '',
    effectiveTo: '',
  });

  // Modal States
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isProcessingCancel, setIsProcessingCancel] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Cancel Button handler
  const handleCancel = () => {
    setShowCancelModal(true);
  };

  // Handler for cancel modal "Confirm"
  const handleConfirmCancel = () => {
    setIsProcessingCancel(true);
    setShowCancelModal(false);
    // If onClose prop exists, call it (for proper modal close in parent)
    if (typeof onClose === 'function') {
      onClose();
    } else {
      // Fallback: Navigate back or to customers page
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/orders/customers';
      }
    }
    setIsProcessingCancel(false);
  };

  // Handler for cancel modal "Dismiss"
  const handleDismissCancel = () => {
    setShowCancelModal(false);
    setIsProcessingCancel(false);
  };

  // Reusable confirmation modal
  const ConfirmationModal = ({
    isOpen,
    title,
    message,
    onCancel,
    onConfirm,
  }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-6 relative">
            <button
              onClick={onCancel}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="rounded-full bg-blue-50 p-3 mb-2">
                <Info className="text-blue-600" size={36} />
              </div>
              <h2 className="text-xl font-semibold text-slate-700">{title}</h2>
              <p className="text-slate-500 text-sm">{message}</p>
            </div>
            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={onCancel}
                className="px-6 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-sm"
                type="button"
              >
                No, Keep Editing
              </button>
              <button
                onClick={onConfirm}
                className="px-6 py-2 rounded-lg bg-[#2563eb] text-white hover:bg-blue-700 font-semibold text-sm"
                type="button"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Cancel confirmation modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        title="Discard changes?"
        message="Are you sure you want to cancel? All entered data will be lost."
        onCancel={handleDismissCancel}
        onConfirm={handleConfirmCancel}
      />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#1e293b] mb-10">
          Create Customer Discount Group
        </h1>

        <form className="space-y-8">
          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {/* Discount Group Code */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#334155]">
                Discount Group Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="discountGroupCode"
                  placeholder="Type to Search"
                  value={formData.discountGroupCode}
                  onChange={handleChange}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
                <ChevronDown className="absolute right-4 top-3.5 text-blue-600" size={18} />
              </div>
            </div>

            {/* Customer Code */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#334155]">
                Customer Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="customerCode"
                  value={formData.customerCode}
                  onChange={handleChange}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-3 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-500"
                >
                  <option value="">Select Customer Code</option>
                  <option value="C001">Customer 001</option>
                  <option value="C002">Customer 002</option>
                </select>
                <ChevronDown className="absolute right-4 top-3.5 text-blue-600 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Mapping Code */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#334155]">
                Mapping Code <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="mappingCode"
                  placeholder="Type to Search"
                  value={formData.mappingCode}
                  onChange={handleChange}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
                <ChevronDown className="absolute right-4 top-3.5 text-blue-600" size={18} />
              </div>
            </div>

            {/* Effective From */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#334155]">
                Effective From
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="effectiveFrom"
                  placeholder="DD/MM/YYYY"
                  value={formData.effectiveFrom}
                  onChange={handleChange}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
                <Calendar className="absolute right-4 top-3.5 text-slate-500" size={18} />
              </div>
            </div>

            {/* Effective To */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#334155]">
                Effective To
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="effectiveTo"
                  placeholder="DD/MM/YYYY"
                  value={formData.effectiveTo}
                  onChange={handleChange}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
                <Calendar className="absolute right-4 top-3.5 text-slate-500" size={18} />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-4 pt-8 mt-4 border-t border-slate-100">
            <button
              type="button"
              className="px-8 py-2.5 text-sm font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={handleCancel}
              disabled={isProcessingCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-2.5 text-sm font-semibold text-white bg-[#2563eb] rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
            >
              Create Customer Discount Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDiscountGroup;
