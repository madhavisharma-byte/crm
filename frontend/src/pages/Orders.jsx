import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Filter, Calendar, Download, Plus, MoreVertical, Check, Truck, Loader, XCircle } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/header';
import AddOrder from './AddOrder'; // Import the AddOrder modal
import api from '../utils/api';

// -------------------------
// Constants for page details (update via backend API in future)
// -------------------------
const PAGE_TITLE = "Orders";
const PAGE_DESCRIPTION = "Manage all your orders from multiple platforms";

// Mimic the tab objects found in @file_context_0's SettingsHeader.jsx
const TABS = [
  { name: 'All Orders', key: 'all' },
  { name: 'Ready to Ship', key: 'ready' },
  { name: 'Shipped', key: 'shipped' },
  { name: 'Cancelled', key: 'cancelled' },
];

const DEFAULT_ORDERS = [
  {
    id: '#ORD-1234',
    product: 'iPhone Case, Screen Guard',
    customer: 'Rajesh Kumar',
    platform: 'Amazon',
    amount: '₹2,499',
    status: 'Pending',
    date: '2024-01-15',
  },
  {
    id: '#ORD-1235',
    product: 'Samsung Galaxy Case',
    customer: 'Priya Sharma',
    platform: 'Flipkart',
    amount: '₹1,899',
    status: 'Shipped',
    date: '2024-01-15',
  },
  {
    id: '#ORD-1236',
    product: 'Premium Leather Wallet',
    customer: 'Amit Patel',
    platform: 'Myntra',
    amount: '₹3,299',
    status: 'Delivered',
    date: '2024-01-14',
  },
  {
    id: '#ORD-1237',
    product: 'Red Formal Belt',
    customer: 'Sunita Rao',
    platform: 'Amazon',
    amount: '₹999',
    status: 'Cancelled',
    date: '2024-01-12',
  },
  {
    id: '#ORD-1238',
    product: 'iPhone 14 Cover',
    customer: 'Sumit Das',
    platform: 'Flipkart',
    amount: '₹1,299',
    status: 'Shipped',
    date: '2024-01-12',
  },
  {
    id: '#ORD-1239',
    product: 'Travel Backpack',
    customer: 'Abhishek Gupta',
    platform: 'Myntra',
    amount: '₹2,899',
    status: 'Pending',
    date: '2024-01-11',
  },
  {
    id: '#ORD-1240',
    product: 'Classic Sunglasses',
    customer: 'Meena Singh',
    platform: 'Amazon',
    amount: '₹1,299',
    status: 'Ready to Ship',
    date: '2024-01-11',
  },
  {
    id: '#ORD-1241',
    product: 'Apple Watch Band',
    customer: 'Rohit M.',
    platform: 'Flipkart',
    amount: '₹999',
    status: 'Ready to Ship',
    date: '2024-01-10',
  },
];

// NOTE: Map the filter keys to status values in order data
// Backend uses lowercase: pending, processing, shipped, delivered, cancelled
// Frontend displays capitalized versions
const TAB_STATUS_MAP = {
  all: null, // No filtering, show all.
  ready: ['Processing', 'Ready to Ship'],
  shipped: ['Shipped', 'Delivered'],
  cancelled: ['Cancelled'],
};

function getTabOrderCount(orders, key) {
  if (key === "all") return orders.length;
  if (TAB_STATUS_MAP[key]) {
    return orders.filter(order =>
      TAB_STATUS_MAP[key].includes(order.status)
    ).length;
  }
  return 0;
}

const STATUS_TRANSITIONS = {
  Pending: ['Ready to Ship', 'Cancelled'],
  'Ready to Ship': ['Shipped', 'Cancelled'],
  Shipped: ['Delivered', 'Cancelled'],
  Delivered: [],
  Cancelled: [],
};

const STATUS_ICONS = {
  'Ready to Ship': <Truck size={16} className="inline mr-1" />,
  Shipped: <Loader size={16} className="inline mr-1" />,
  Delivered: <Check size={16} className="inline mr-1" />,
  Cancelled: <XCircle size={16} className="inline mr-1" />,
};

function generateNextOrderId(existingOrders) {
  // Extract numbers, get max, format as #ORD-xxxx
  const idNumbers = existingOrders
    .map(order => {
      const match = order.id && order.id.match(/^#ORD-(\d+)$/);
      return match ? parseInt(match[1], 10) : null;
    })
    .filter(n => n != null);
  const maxNum = idNumbers.length ? Math.max(...idNumbers) : 1241;
  const nextNum = maxNum + 1;
  return `#ORD-${nextNum}`;
}

const OrdersPage = React.memo(() => {
  // Local state for order data so updates/edits are possible
  const [orders, setOrders] = useState(DEFAULT_ORDERS);
  const [activeTab, setActiveTab] = useState('all');
  const [openMenuOrderId, setOpenMenuOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showAddOrderForm, setShowAddOrderForm] = useState(false); // Show form instead of orders list

  // For closing status menu on outside click
  const menuRefs = useRef({});

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/orders');
      if (response.data && response.data.orders) {
        // Transform backend orders to frontend format
        const transformedOrders = response.data.orders.map(order => ({
          id: `#${order.orderNumber}`,
          product: order.items && order.items.length > 0 
            ? order.items.map(item => item.sku || 'Item').join(', ')
            : 'No items',
          customer: order.customer?.name || 'N/A',
          platform: order.platform ? order.platform.charAt(0).toUpperCase() + order.platform.slice(1) : 'Other',
          amount: `₹${order.total?.toLocaleString('en-IN') || '0'}`,
          status: order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending',
          date: order.createdAt ? new Date(order.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          _id: order._id // Keep backend ID for updates
        }));
        setOrders(transformedOrders);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      // Keep default orders on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Derived filtered orders based on tab
  const displayedOrders = useMemo(() => {
    if (activeTab === "all") return orders;
    if (TAB_STATUS_MAP[activeTab]) {
      // For 'shipped', include both "Shipped" and "Delivered"
      return orders.filter(order =>
        TAB_STATUS_MAP[activeTab].includes(order.status)
      );
    }
    return orders;
  }, [activeTab, orders]);

  const PAGINATION = {
    showing: displayedOrders.length,
    total: orders.length,
  };

  // Close status menu if clicking outside
  React.useEffect(() => {
    function handleClick(e) {
      if (openMenuOrderId && menuRefs.current[openMenuOrderId]) {
        if (!menuRefs.current[openMenuOrderId].contains(e.target)) {
          setOpenMenuOrderId(null);
        }
      }
    }
    if (openMenuOrderId) {
      document.addEventListener('mousedown', handleClick);
      return () => document.removeEventListener('mousedown', handleClick);
    }
  }, [openMenuOrderId]);

  // Handler to update order status
  function updateOrderStatus(orderId, newStatus) {
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId ? { ...o, status: newStatus } : o
      )
    );
    setOpenMenuOrderId(null);
  }

  // Handler when order is successfully created
  function handleOrderCreated(newOrder) {
    // Refresh orders from backend
    fetchOrders();
    // Close the form and show orders list
    setShowAddOrderForm(false);
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F6] font-sans text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-w-0 md:ml-64">
        <Header />

        {/* Orders Section below Header */}
        <div className="pt-24 px-8 flex-1 overflow-y-auto">
          {showAddOrderForm ? (
            // Show Add Order Form
            <div className="w-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Add New Order</h1>
                  <p className="text-sm text-gray-500 mt-1">Fill in the details to create a new order</p>
                </div>
                <button
                  onClick={() => setShowAddOrderForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back to Orders
                </button>
              </div>
              <AddOrder
                open={true}
                onClose={() => setShowAddOrderForm(false)}
                onSuccess={handleOrderCreated}
              />
            </div>
          ) : (
            // Show Orders List
            <>
              {/* Page Title & Actions */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{PAGE_TITLE}</h1>
                  <p className="text-sm text-gray-500 mt-1">{PAGE_DESCRIPTION}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <ActionButton icon={<Filter size={16} />} text="Filter" />
                  <ActionButton icon={<Calendar size={16} />} text="Date Range" />
                  <ActionButton icon={<Download size={16} />} text="Export" />
                  <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                    onClick={() => setShowAddOrderForm(true)}
                  >
                    <Plus size={16} />
                    Add Order
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                {TABS.map((tab) => (
                  <TabButton
                    key={tab.key}
                    text={tab.name}
                    active={activeTab === tab.key}
                    count={getTabOrderCount(orders, tab.key)}
                    onClick={() => setActiveTab(tab.key)}
                  />
                ))}
              </div>

              {/* Orders Table */}
              {loading ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 flex items-center justify-center">
                  <Loader size={24} className="animate-spin text-blue-600" />
                  <span className="ml-3 text-gray-600">Loading orders...</span>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          <th className="p-4 w-12 text-center">
                            <input type="checkbox" className="rounded-full w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                          </th>
                          <th className="p-4">Order ID</th>
                          <th className="p-4">Customer</th>
                          <th className="p-4">Platform</th>
                          <th className="p-4">Amount</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Date</th>
                          <th className="p-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {displayedOrders.length > 0 ? (
                          displayedOrders.map((order) => (
                            <OrderRow
                              key={order.id}
                              order={order}
                              onActionMenuOpen={(id) => setOpenMenuOrderId(id)}
                              isMenuOpen={openMenuOrderId === order.id}
                              menuRef={el => (menuRefs.current[order.id] = el)}
                              onStatusSelect={updateOrderStatus}
                            />
                          ))
                        ) : (
                          <tr>
                            <td colSpan={8} className="py-16 text-center text-gray-400 text-sm">No orders found.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination / Footer */}
                  <div className="p-4 border-t border-gray-100 text-xs text-gray-400 flex justify-between items-center">
                    <span>
                      Showing {PAGINATION.showing} of {PAGINATION.total} orders
                    </span>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Prev</button>
                      <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">Next</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
});

const ActionButton = React.memo(({ icon, text }) => (
  <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
    {icon}
    {text}
  </button>
));

// TabButton matches the style logic seen in SettingsHeader.jsx tabs, but simplified and horizontal
const TabButton = React.memo(({ text, active, count, onClick }) => (
  <button
    type="button"
    className={`mr-8 pb-3 text-sm font-medium transition-all relative flex items-center gap-2 ${
      active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
    }`}
    onClick={onClick}
  >
    {text}
    <span className={`inline-block px-2 py-0.5 text-xs font-semibold ml-1 ${
      active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
    } rounded-full`}>
      {count}
    </span>
    {active && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
    )}
  </button>
));

const OrderRow = React.memo(({ order, onActionMenuOpen, isMenuOpen, menuRef, onStatusSelect }) => {
  const getPlatformStyle = (platform) => {
    switch (platform) {
      case 'Amazon': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Flipkart': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Myntra': return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // You can optimize status style based on the value if required
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-500 text-white';
      case 'Ready to Ship': return 'bg-indigo-500 text-white';
      case 'Shipped': return 'bg-blue-600 text-white';
      case 'Delivered': return 'bg-green-600 text-white';
      case 'Cancelled': return 'bg-red-500 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  // Render status dropdown if actions are available
  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
      <td className="p-4 text-center">
        <div className="w-4 h-4 rounded-full border border-gray-300 mx-auto cursor-pointer hover:border-blue-500 relative">
            {/* Use state to toggle check if functional */}
        </div>
      </td>
      <td className="p-4">
        <div className="font-semibold text-blue-600 text-sm">{order.id}</div>
        <div className="text-xs text-gray-400 mt-0.5">{order.product}</div>
      </td>
      <td className="p-4">
        <div className="text-sm font-medium text-gray-900">{order.customer}</div>
      </td>
      <td className="p-4">
        <span className={`px-2.5 py-1 rounded text-xs font-semibold border ${getPlatformStyle(order.platform)}`}>
          {order.platform}
        </span>
      </td>
      <td className="p-4">
        <div className="text-sm font-bold text-gray-900">{order.amount}</div>
      </td>
      <td className="p-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
          {order.status}
        </span>
      </td>
      <td className="p-4">
        <div className="text-sm text-gray-500">{order.date}</div>
      </td>
      <td className="p-4 text-center relative">
        <button
          className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onActionMenuOpen(order.id);
          }}
          aria-label="Update status"
          tabIndex={0}
        >
          <MoreVertical size={16} />
        </button>
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute z-50 right-0 mt-2 min-w-[164px] bg-white border border-gray-100 shadow-xl rounded-xl py-2 text-left"
            style={{
              boxShadow:
                "0 8px 24px rgba(30,34,40,0.10), 0 1.5px 2px 0 rgba(49,49,55,0.02)"
            }}
          >
            <div className="px-3 pb-1 pt-1.5 text-xs text-gray-500 font-medium border-b border-gray-100">
              Update Status
            </div>
            <div>
              {STATUS_TRANSITIONS[order.status].length === 0 ? (
                <div className="px-4 py-2 text-sm text-gray-400">No further action</div>
              ) : (
                STATUS_TRANSITIONS[order.status].map((status) => (
                  <button
                    key={status}
                    className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-50 text-gray-700 transition"
                    onClick={() => onStatusSelect(order.id, status)}
                  >
                    {STATUS_ICONS[status] || null}
                    {status}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </td>
    </tr>
  );
});

export default OrdersPage;
