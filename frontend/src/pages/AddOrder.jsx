import React, { useState } from 'react';
import { ShoppingCart, CreditCard, Banknote, Wallet, Plus, X, Box, Info, Loader } from 'lucide-react';
import api from '../utils/api';

// --- Reusable UI Components ---
const InputGroup = ({ label, type = "text", placeholder, value, onChange, icon, className = "", required = false, disabled = false }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <input
        type={type}
        className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${icon ? 'pl-9' : ''} ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}`}
        placeholder={placeholder}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  </div>
);

const SelectGroup = ({ label, options, value, onChange, className = "", required = false }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select 
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      value={value || ''}
      onChange={onChange}
    >
      <option value="">Select {label}</option>
      {options.map((opt, i) => (
        <option key={i} value={typeof opt === 'object' ? opt.value : opt}>
          {typeof opt === 'object' ? opt.label : opt}
        </option>
      ))}
    </select>
  </div>
);

const SectionHeader = ({ title }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="h-4 w-1 bg-blue-600 rounded-full"></div>
    <h3 className="text-sm font-bold text-gray-700 uppercase">{title}</h3>
  </div>
);

// --- Main Application Component ---
export default function AddOrder({ open, onClose, onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [sameAsBilling, setSameAsBilling] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    // Customer Details
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerGroup: '',
    
    // Order Details
    orderNumber: '',
    platform: 'other',
    orderDate: new Date().toISOString().split('T')[0],
    orderTime: new Date().toTimeString().slice(0, 5),
    paymentStatus: 'paid',
    
    // Status & Logistics
    status: 'pending',
    expectedDeliveryDate: '',
    internalNotes: '',
    
    // Billing & Shipping
    billingAddress: '',
    shippingAddress: '',
    tax: '0',
    shippingCost: '0',
    discountAmount: '0',
    
    // Order Items
    items: []
  });

  // Generate order number if not provided
  const generateOrderNumber = () => {
    const timestamp = Date.now();
    return `ORD-${timestamp}`;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.customerName || !formData.orderNumber) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      // Prepare order data for API
      const orderData = {
        orderNumber: formData.orderNumber || generateOrderNumber(),
        platform: formData.platform,
        status: formData.status,
        customer: {
          name: formData.customerName,
          email: formData.customerEmail,
          phone: formData.customerPhone,
          address: formData.billingAddress
        },
        items: formData.items.length > 0 ? formData.items : [],
        total: calculateTotal(),
        // Additional fields can be stored in notes or extended schema
      };

      // Call API to save order
      const response = await api.post('/orders', orderData);
      
      if (response.data && response.data.order) {
        // Reset form
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          customerGroup: '',
          orderNumber: '',
          platform: 'other',
          orderDate: new Date().toISOString().split('T')[0],
          orderTime: new Date().toTimeString().slice(0, 5),
          paymentStatus: 'paid',
          status: 'pending',
          expectedDeliveryDate: '',
          internalNotes: '',
          billingAddress: '',
          shippingAddress: '',
          tax: '0',
          shippingCost: '0',
          discountAmount: '0',
          items: []
        });
        
        // Call success callback
        if (onSuccess) {
          onSuccess(response.data.order);
        }
        
        // Close modal
        if (onClose) {
          onClose();
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save order. Please try again.');
      console.error('Error saving order:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = (subtotal * parseFloat(formData.tax || 0)) / 100;
    const shipping = parseFloat(formData.shippingCost || 0);
    const discount = parseFloat(formData.discountAmount || 0);
    return subtotal + taxAmount + shipping - discount;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        
        {/* Card Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-start">
          <div className="flex gap-3">
            <div className="mt-1 bg-blue-50 p-2 rounded-md text-blue-600">
              <Plus size={16} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Add New Order</h2>
              <p className="text-sm text-gray-500">Fill in the details below to create a new customer order.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X size={20} />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Scrollable Form Area */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">
              
              {/* Customer Details */}
              <section>
                <SectionHeader title="Customer Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup 
                    label="Customer Name" 
                    placeholder="John Doe" 
                    icon={<span className="text-gray-400">👤</span>}
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    required
                  />
                  <InputGroup 
                    label="Email Address" 
                    type="email" 
                    placeholder="john@example.com" 
                    icon={<span className="text-gray-400">✉️</span>}
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  />
                  <InputGroup 
                    label="Phone Number" 
                    placeholder="+1 (555) 000-0000" 
                    icon={<span className="text-gray-400">📞</span>}
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                  />
                  <InputGroup 
                    label="Customer Group" 
                    placeholder="Retail Customer"
                    value={formData.customerGroup}
                    onChange={(e) => handleInputChange('customerGroup', e.target.value)}
                  />
                </div>
              </section>

              {/* Order Details */}
              <section>
                <SectionHeader title="Order Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <InputGroup 
                    label="Order Number" 
                    value={formData.orderNumber || generateOrderNumber()} 
                    className="bg-gray-50"
                    onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                    required
                  />
                  <SelectGroup 
                    label="Platform Source" 
                    options={[
                      { value: 'amazon', label: 'Amazon' },
                      { value: 'flipkart', label: 'Flipkart' },
                      { value: 'shopify', label: 'Shopify' },
                      { value: 'other', label: 'Other' }
                    ]}
                    value={formData.platform}
                    onChange={(e) => handleInputChange('platform', e.target.value)}
                  />
                  <InputGroup 
                    label="Order Date" 
                    type="date"
                    value={formData.orderDate}
                    onChange={(e) => handleInputChange('orderDate', e.target.value)}
                  />
                  <InputGroup 
                    label="Order Time" 
                    type="time"
                    value={formData.orderTime}
                    onChange={(e) => handleInputChange('orderTime', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Payment Method <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <PaymentButton 
                        active={paymentMethod === 'card'} 
                        onClick={() => setPaymentMethod('card')} 
                        icon={<CreditCard size={16} />} 
                        label="Card" 
                      />
                      <PaymentButton 
                        active={paymentMethod === 'paypal'} 
                        onClick={() => setPaymentMethod('paypal')} 
                        icon={<Wallet size={16} />} 
                        label="PayPal" 
                      />
                      <PaymentButton 
                        active={paymentMethod === 'cash'} 
                        onClick={() => setPaymentMethod('cash')} 
                        icon={<Banknote size={16} />} 
                        label="Cash" 
                      />
                    </div>
                  </div>
                  <SelectGroup 
                    label="Payment Status" 
                    options={['Paid', 'Pending', 'Failed']}
                    value={formData.paymentStatus}
                    onChange={(e) => handleInputChange('paymentStatus', e.target.value)}
                  />
                </div>
              </section>

              {/* Order Items */}
              <section>
                <div className="flex justify-between items-center mb-2">
                   <SectionHeader title="Order Items" />
                   <button className="text-sm text-blue-600 font-medium hover:underline flex items-center gap-1">
                     <Plus size={14} /> Add Custom Item
                   </button>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-gray-50">
                  <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                    <Box className="text-gray-400" size={24} />
                  </div>
                  <p className="text-sm text-gray-500 mb-4">No items added yet</p>
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
                    Browse Products
                  </button>
                </div>
              </section>

              {/* Status & Logistics */}
              <section>
                <SectionHeader title="Status & Logistics" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <SelectGroup 
                      label="Order Status" 
                      options={[
                        { value: 'pending', label: 'Pending' },
                        { value: 'processing', label: 'Processing' },
                        { value: 'shipped', label: 'Shipped' },
                        { value: 'delivered', label: 'Delivered' },
                        { value: 'cancelled', label: 'Cancelled' }
                      ]}
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                    />
                    <InputGroup 
                      label="Expected Delivery Date" 
                      type="date"
                      value={formData.expectedDeliveryDate}
                      onChange={(e) => handleInputChange('expectedDeliveryDate', e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 h-full">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Internal Notes
                    </label>
                    <textarea 
                      className="w-full h-full min-h-[100px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Add any special instructions or notes about this order..."
                      value={formData.internalNotes}
                      onChange={(e) => handleInputChange('internalNotes', e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </section>

              {/* Billing & Shipping */}
              <section>
                <SectionHeader title="Billing & Shipping" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                   {/* Billing */}
                   <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Billing Address <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                      className="w-full h-24 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                      value={formData.billingAddress}
                      onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                      required
                    ></textarea>
                   </div>
                   {/* Shipping */}
                   <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Shipping Address
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Same as billing</span>
                        <button 
                          type="button"
                          onClick={() => {
                            setSameAsBilling(!sameAsBilling);
                            if (!sameAsBilling) {
                              handleInputChange('shippingAddress', formData.billingAddress);
                            }
                          }}
                          className={`w-8 h-4 rounded-full p-0.5 transition-colors ${sameAsBilling ? 'bg-blue-600' : 'bg-gray-300'}`}
                        >
                          <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${sameAsBilling ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                      </div>
                    </div>
                    <textarea 
                      disabled={sameAsBilling}
                      className={`w-full h-24 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none ${sameAsBilling ? 'bg-gray-50 text-gray-400' : 'bg-white'}`}
                      placeholder={sameAsBilling ? "Same as billing address" : ""}
                      value={sameAsBilling ? formData.billingAddress : formData.shippingAddress}
                      onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                    ></textarea>
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <InputGroup 
                    label="Tax (%)" 
                    placeholder="0%" 
                    type="number"
                    value={formData.tax}
                    onChange={(e) => handleInputChange('tax', e.target.value)}
                  />
                  <InputGroup 
                    label="Shipping Cost" 
                    placeholder="0.00" 
                    type="number"
                    value={formData.shippingCost}
                    onChange={(e) => handleInputChange('shippingCost', e.target.value)}
                  />
                  <InputGroup 
                    label="Discount Amount" 
                    placeholder="0.00" 
                    type="number"
                    value={formData.discountAmount}
                    onChange={(e) => handleInputChange('discountAmount', e.target.value)}
                  />
                </div>
              </section>

              {/* Footer Totals */}
              <div className="bg-gray-50 rounded-lg p-6 mt-8">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                  <div className="flex items-start gap-2 text-xs text-gray-500 max-w-sm">
                     <Info size={14} className="mt-0.5 text-gray-400 shrink-0" />
                     <p>Final amount includes all applicable taxes and shipping fees. Verify all details before creating the order.</p>
                  </div>
                  <div className="w-full md:w-64 space-y-2">
                    <SummaryRow label="Subtotal" value={`₹${(formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)).toFixed(2)}`} />
                    <SummaryRow label="Shipping" value={`₹${parseFloat(formData.shippingCost || 0).toFixed(2)}`} />
                    <SummaryRow label="Discount" value={`-₹${parseFloat(formData.discountAmount || 0).toFixed(2)}`} className="text-green-600" />
                    <SummaryRow label="Tax" value={`₹${((formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)) * parseFloat(formData.tax || 0) / 100).toFixed(2)}`} />
                    <div className="border-t border-gray-200 my-2 pt-2 flex justify-between items-center">
                      <span className="text-base font-bold text-gray-800">Grand Total</span>
                      <span className="text-lg font-bold text-gray-900">₹{calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </form>

          {/* Footer Actions */}
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Order'
              )}
            </button>
          </div>

        </div>
      </div>
  );
}

// --- Helper Components ---

const PaymentButton = ({ active, onClick, icon, label }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md border text-sm font-medium transition-all ${
      active 
      ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' 
      : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
    }`}
  >
    {icon}
    {label}
  </button>
);

const SummaryRow = ({ label, value, className = "text-gray-600" }) => (
  <div className={`flex justify-between text-sm ${className}`}>
    <span>{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);    
