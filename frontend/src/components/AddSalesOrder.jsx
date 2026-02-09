import React, { useState } from 'react';
import {
  ChevronDown,
  Upload,
  User,
  Mail,
  Phone,
  Plus,
  Trash2,
  Info,
  X,
  Save,
  CheckCircle2,
} from 'lucide-react';

/**
 * AddOrder
 * Props:
 *   onClose: function (optional) - if provided, will be called when the user cancels/close the form.
 */
const AddOrder = ({ onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('Prepaid');
  const [isSameAddress, setIsSameAddress] = useState(true);
  const [discountType, setDiscountType] = useState('₹');
  const [items, setItems] = useState([
    {
      id: 1,
      sku: '',
      inventory: 0,
      units: '',
      mrp: 0,
      sellingPrice: 0,
      discount: 0,
      netPrice: 0,
      subtotal: 0,
    },
  ]);

  // Modal States
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Flag to prevent double-callback for cancel modal
  const [isProcessingCancel, setIsProcessingCancel] = useState(false);

  // Confirmation Modal Component
  const ConfirmationModal = ({
    isOpen,
    type,
    title,
    message,
    onConfirm,
    onCancel,
  }) => {
    if (!isOpen) return null;
    const isSuccess = type === 'success';

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
          <div className="p-6 relative">
            <button
              onClick={onCancel}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                isSuccess ? 'bg-green-50' : 'bg-orange-50'
              }`}
            >
              {isSuccess ? (
                <CheckCircle2 className="text-green-500" size={24} />
              ) : (
                <Save className="text-orange-500" size={24} />
              )}
            </div>
            {/* Content */}
            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">{message}</p>
          </div>
          {/* Footer */}
          <div className="px-6 py-4 bg-white border-t flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-8 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now(),
        sku: '',
        inventory: 0,
        units: '',
        mrp: 0,
        sellingPrice: 0,
        discount: 0,
        netPrice: 0,
        subtotal: 0,
      },
    ]);
  };

  const removeItem = (id) => {
    if (items.length > 1) setItems(items.filter((item) => item.id !== id));
  };

  // Placeholder handler for successful order creation
  const handleCreateOrder = () => {
    setShowSuccessModal(true);
  };

  // This function closes the whole AddOrder form/component.
  // Called ONLY AFTER confirmation from modal.
  const handleClose = () => {
    setShowCancelModal(false);
    setIsProcessingCancel(false);
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
    // else remain as before (do nothing extra; modal closes).
  };

  // Open cancel confirmation modal (used in footer Cancel button)
  const handleShowCancelModal = () => {
    // Prevent opening modal if already processing cancel to avoid double open
    if (!isProcessingCancel) {
      setShowCancelModal(true);
      setIsProcessingCancel(true);
    }
  };

  // Dismiss/cancel the modal (either X button or Cancel button in modal)
  const handleCancelModalDismiss = () => {
    setShowCancelModal(false);
    setIsProcessingCancel(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-slate-700 relative">
      {/* Cancel Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        type="warning"
        title="Unsaved changes"
        message="You are about to leave this page without creating a Sale Order. All data will be lost if you leave this page. Do you wish to continue?"
        onCancel={handleCancelModalDismiss}
        onConfirm={handleClose}
      />
      {/* Success Modal */}
      <ConfirmationModal
        isOpen={showSuccessModal}
        type="success"
        title="Order Created Successfully"
        message="Your order has been created successfully and saved to the system."
        onCancel={() => setShowSuccessModal(false)}
        onConfirm={() => setShowSuccessModal(false)}
      />

      {/* Header */}
      <div className="max-w-8xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-xl font-semibold">
          <span className="text-slate-400">Order/</span>Add Order
        </h1>
        <button className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
          <Upload size={18} />
        </button>
      </div>

      <div className="max-w-9xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 space-y-10">
          {/* SECTION 1: ORDER DETAILS */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Order Details
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium">Order ID</label>
                <input
                  type="text"
                  defaultValue="#ORD-2024-8592"
                  className="w-full px-3 py-2 border rounded-md bg-gray-50 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">
                  Platform Source
                </label>
                <div className="relative">
                  <select className="w-full px-3 py-2 border rounded-md text-sm appearance-none focus:ring-1 focus:ring-blue-500 outline-none">
                    <option>Shopify Store</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-3 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">
                  Order Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Order Time</label>
                <input
                  type="text"
                  placeholder="Wed Dec 17 2025 15:18:18 GMT+0530"
                  className="w-full px-3 py-2 border rounded-md text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPaymentMethod('Prepaid')}
                    type="button"
                    className={`flex-1 flex items-center justify-center gap-2 py-2 border rounded-md text-sm font-medium transition-all ${
                      paymentMethod === 'Prepaid'
                        ? 'bg-blue-50 border-blue-500 text-blue-600 ring-1 ring-blue-500'
                        : 'bg-white text-slate-500'
                    }`}
                  >
                    <span className="text-lg">💳</span> Prepaid
                  </button>
                  <button
                    onClick={() => setPaymentMethod('COD')}
                    type="button"
                    className={`flex-1 flex items-center justify-center gap-2 py-2 border rounded-md text-sm font-medium transition-all ${
                      paymentMethod === 'COD'
                        ? 'bg-blue-50 border-blue-500 text-blue-600 ring-1 ring-blue-500'
                        : 'bg-white text-slate-500'
                    }`}
                  >
                    <span className="text-lg">💵</span> COD
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">
                  Currency{' '}
                  <span className="text-slate-400 font-normal">
                    (Optional)
                  </span>
                </label>
                <div className="relative">
                  <select className="w-full px-3 py-2 border rounded-md text-sm appearance-none outline-none">
                    <option>INR - Indian Rupee</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-3 top-3 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </section>
          {/* SECTION 2: CUSTOMER DETAILS */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Customer Details
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-9 pr-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full pl-9 pr-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Phone Number</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-9 pr-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium">Customer Group</label>
                <input
                  type="text"
                  placeholder="Retail Customer"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
          </section>
          {/* SECTION 3: BILLING & SHIPPING */}
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
                  className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${
                    isSameAddress ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      isSameAddress ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-500">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-500">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">
                  Address Line 2{' '}
                  <span className="text-slate-400 font-normal italic">
                    (Optional)
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-500">
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full px-3 py-2 border rounded-md text-sm appearance-none outline-none">
                    <option>India</option>
                  </select>
                  <ChevronDown
                    size={12}
                    className="absolute right-3 top-3 text-slate-400"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-500">
                  State <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select className="w-full px-3 py-2 border rounded-md text-sm appearance-none outline-none">
                    <option>Select state</option>
                  </select>
                  <ChevronDown
                    size={12}
                    className="absolute right-3 top-3 text-slate-400"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-500">
                  City
                </label>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">
                  District <span className="font-normal italic">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="District"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-500">
                  Pin Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Pin code"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-500">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-500">
                  Latitude <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Latitude"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-500">
                  Longitude <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Longitude"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">
                  Email <span className="font-normal italic">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full px-3 py-2 border rounded-md text-sm outline-none"
                />
              </div>
            </div>
          </section>
          {/* SECTION 4: ITEM DETAILS */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Item Details
                </h2>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-md">
                <span className="text-[10px] font-bold px-2">
                  Discount(₹)
                </span>
                <button
                  onClick={() =>
                    setDiscountType(discountType === '₹' ? '%' : '₹')
                  }
                  type="button"
                  className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none bg-slate-400`}
                >
                  <span
                    className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${
                      discountType === '%' ? 'translate-x-4.5' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className="text-[10px] font-bold px-2 text-slate-400">
                  Discount(%)
                </span>
                <button className="flex items-center gap-1 text-[10px] font-bold text-blue-600 ml-4">
                  <Upload size={10} /> Import Via CSV
                </button>
              </div>
            </div>

            <div className="border rounded-md overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="px-3 py-2 font-semibold text-slate-500">#</th>
                    <th className="px-3 py-2 font-semibold text-slate-500">
                      Item SKU Code
                    </th>
                    <th className="px-3 py-2 font-semibold text-slate-500 text-center">
                      Inventory
                    </th>
                    <th className="px-3 py-2 font-semibold text-slate-500">
                      Units
                    </th>
                    <th className="px-3 py-2 font-semibold text-slate-500">
                      MRP(₹)
                    </th>
                    <th className="px-3 py-2 font-semibold text-slate-500">
                      Selling Price(₹)
                    </th>
                    <th className="px-3 py-2 font-semibold text-slate-500">
                      Discount ({discountType})
                    </th>
                    <th className="px-3 py-2 font-semibold text-slate-500">
                      Net Selling Price (₹)
                    </th>
                    <th className="px-3 py-2 font-semibold text-slate-500">
                      Sub Total (₹)
                    </th>
                    <th className="px-3 py-2 font-semibold text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-3 py-3">{index + 1}</td>
                      <td className="px-3 py-3">
                        <select className="w-full border rounded px-2 py-1 outline-none">
                          <option>Name or SKU Code</option>
                        </select>
                      </td>
                      <td className="px-3 py-3 text-center">0</td>
                      <td className="px-3 py-3">
                        <input
                          type="text"
                          placeholder="Units"
                          className="w-16 border rounded px-2 py-1 outline-none"
                        />
                      </td>
                      <td className="px-3 py-3">0</td>
                      <td className="px-3 py-3">0</td>
                      <td className="px-3 py-3">0</td>
                      <td className="px-3 py-3">0</td>
                      <td className="px-3 py-3">0</td>
                      <td className="px-3 py-3">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                          type="button"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={addItem}
                type="button"
                className="w-full py-3 text-blue-600 text-xs font-bold border-t border-dashed hover:bg-blue-50 transition-colors"
              >
                + Add another Items
              </button>
            </div>
          </section>
          {/* SUMMARY SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 pt-6">
            <div className="flex gap-2 text-[11px] text-slate-400 max-w-xs">
              <Info size={14} className="shrink-0 mt-0.5" />
              <p>
                Final amount includes all applicable taxes and shipping fees.
                Verify all details before creating the order.
              </p>
            </div>
            <div className="w-full md:w-72 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-semibold">₹0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="font-semibold">₹0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Discount</span>
                <span className="font-semibold text-green-600">-₹0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Gift wrap Charge</span>
                <span className="font-semibold">₹0.00</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-base font-bold">Grand Total</span>
                <span className="text-xl font-bold">₹0.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-4 bg-slate-50 border-t flex justify-end gap-3">
          <button
            className="px-6 py-2 border rounded-md text-sm font-medium hover:bg-white transition-colors"
            type="button"
            onClick={handleShowCancelModal}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors"
            type="button"
            onClick={handleCreateOrder}
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrder;
