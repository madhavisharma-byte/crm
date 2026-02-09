import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Plus, MoreVertical, Check, Truck, Loader, XCircle, Trash2, Filter, Download, Upload, AlertTriangle } from 'lucide-react';
import Sidebar from '../components/website/Sidebar';
import Header from '../components/website/Header';
import AddOrder from '../components/AddSalesOrder';
import api from '../utils/api';
import FilterSidebar from '../components/FilterSidebar';

// Constants
const PAGE_TITLE = "Orders";
const PAGE_DESCRIPTION = "Manage all your orders from multiple platforms";

const ORDER_TYPE_TABS = [
  { name: 'Sales Orders', key: 'sales' },     // B2C
  { name: 'B2B Orders', key: 'b2b' },         // B2B
];

const DEFAULT_ORDERS = [];

function getOrderType(order) {
  if (order.orderType) {
    if (order.orderType.toLowerCase() === 'b2b') return 'B2B';
    if (order.orderType.toLowerCase() === 'sales' || order.orderType.toLowerCase() === 'b2c') return 'Sales';
  }
  if (order.companyName || ((order.customerType && order.customerType.toLowerCase() === 'b2b'))) return 'B2B';
  return 'Sales';
}

function getFilterParams(filter) {
  if (!filter) return {};
  const params = {};
  if (filter.orderId) params.orderId = filter.orderId;
  if (filter.date) params.date = filter.date;
  if (filter.marketplace && filter.marketplace.length > 0) params.marketplace = filter.marketplace;
  if (filter.status && filter.status.length > 0) params.status = filter.status;
  if (filter.paymentMethod && filter.paymentMethod.length > 0) params.paymentMethod = filter.paymentMethod;
  if (filter.onHold != null) params.onHold = filter.onHold;
  if (filter.itemName) params.itemName = filter.itemName;
  return params;
}

const OrdersPage = React.memo(() => {
  const [orders, setOrders] = useState(DEFAULT_ORDERS);
  const [activeTab, setActiveTab] = useState('sales');
  const [openMenuOrderId, setOpenMenuOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [showAddOrderForm, setShowAddOrderForm] = useState(false);
  const menuRefs = useRef({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  // Filter as modal
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterValues, setFilterValues] = useState(null);
  // Add: Cancel confirmation for AddOrder
  const [showAddOrderCancelModal, setShowAddOrderCancelModal] = useState(false);

  const fetchOrders = async (filters = null) => {
    try {
      setLoading(true);
      let params = filters ? getFilterParams(filters) : {};
      let query = '';
      if (Object.keys(params).length) {
        query = '?' + Object.entries(params)
          .flatMap(([k, v]) =>
            Array.isArray(v) ? v.map((i) => `${encodeURIComponent(k)}=${encodeURIComponent(i)}`) : [`${encodeURIComponent(k)}=${encodeURIComponent(v)}`]
          ).join('&');
      }
      const response = await api.get('/orders' + query);
      if (response.data && Array.isArray(response.data.orders)) {
        if (response.data.orders.length === 0) {
          setOrders([]);
          setFetchError(false);
          return;
        }
        const transformedOrders = response.data.orders.map(order => {
          const b2b = getOrderType(order) === "B2B";
          return {
            id: order.orderNumber ? `#${order.orderNumber}` : (order.id || ''),
            createdAt: order.createdAt ? new Date(order.createdAt) : null,
            customer: (order.customer && order.customer.name) ? order.customer.name : (order.customer || 'N/A'),
            platform: order.platform
              ? order.platform.charAt(0).toUpperCase() + order.platform.slice(1)
              : 'Other',
            status: (() => {
              if (!order.status) return "Pending";
              const s = order.status.toLowerCase();
              if (s === 'pending') return "Pending";
              if (s === 'processing') return "Ready to Ship";
              if (s === 'shipped') return "Shipped";
              if (s === 'delivered') return "Delivered";
              if (s === 'cancelled') return "Cancelled";
              return order.status.charAt(0).toUpperCase() + order.status.slice(1);
            })(),
            payment: order.paymentStatus || order.paymentMethod || 'N/A',
            onHold: (typeof order.onHold === "boolean" ? order.onHold : false),
            products: Array.isArray(order.items) && order.items.length > 0
              ? order.items.map(item => item && item.sku ? item.sku : 'Item').join(', ')
              : (order.product || 'No items'),
            productsUnallocated: b2b && Array.isArray(order.items) && order.items.length > 0
              ? order.items
                .filter(item => item && typeof item.unallocated === 'number' && item.unallocated > 0)
                .map(item => `${item.sku || 'Item'} (${item.unallocated})`)
                .join(', ')
              : "",
            channelCreated: order.channelCreatedAt ? new Date(order.channelCreatedAt) : null,
            expireDate: b2b && order.expireDate ? new Date(order.expireDate) : null,
            appointmentDate: b2b && order.appointmentDate ? new Date(order.appointmentDate) : null,
            _id: order._id,
            orderType: order.orderType || null,
            companyName: order.companyName || null,
            customerType: order.customerType || null,
            original: order,
            isB2B: b2b,
          };
        });
        setOrders(transformedOrders);
        setFetchError(false);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(filterValues);
    // eslint-disable-next-line
  }, [filterValues]);

  const displayedOrders = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    if (activeTab === "all") return orders;
    if (activeTab === "sales")
      return orders.filter(order => getOrderType(order) === "Sales");
    if (activeTab === "b2b")
      return orders.filter(order => getOrderType(order) === "B2B");
    return orders;
  }, [activeTab, orders]);

  useEffect(() => {
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

  async function handleUpdateStatus(orderId, newStatus) {
    const order = Array.isArray(orders) ? orders.find(o => o.id === orderId) : null;
    const backendId = order && order._id;
    const previousStatus = order && order.status;
    setOrders(prev =>
      Array.isArray(prev)
        ? prev.map(o =>
          o.id === orderId ? { ...o, status: newStatus } : o
        )
        : prev
    );
    setOpenMenuOrderId(null);

    if (backendId) {
      try {
        const statusMap = {
          'Pending': 'pending',
          'Ready to Ship': 'processing',
          'Shipped': 'shipped',
          'Delivered': 'delivered',
          'Cancelled': 'cancelled',
        };
        const backendStatus = statusMap[newStatus];
        if (!backendStatus) throw new Error("Invalid status");
        await api.put(`/orders/${backendId}`, { status: backendStatus });
      } catch (err) {
        console.error("Update failed:", err);
        alert('Failed to update order status.');
        setOrders(prev =>
          Array.isArray(prev)
            ? prev.map(o =>
              o.id === orderId ? { ...o, status: previousStatus } : o
            )
            : prev
        );
      }
    }
  }

  function confirmDelete(orderId) {
    const toDelete = orders.find(o => o.id === orderId);
    setOrderToDelete(toDelete);
    setDeleteModalOpen(true);
    setOpenMenuOrderId(null);
  }

  async function handleExecuteDelete() {
    if (!orderToDelete) return;
    const backendId = orderToDelete._id;
    setOrders(prev => prev.filter(o => o.id !== orderToDelete.id));
    setDeleteModalOpen(false);
    setOrderToDelete(null);
    if (backendId) {
      try {
        await api.delete(`/orders/${backendId}`);
      } catch (err) {
        console.error("Delete failed:", err);
        if (err.response && err.response.status === 403) {
          alert("Permission Denied: Only Admins can delete orders.");
        } else {
          alert("Failed to delete order from server.");
        }
        fetchOrders(filterValues);
      }
    }
  }

  function handleOrderCreated() {
    fetchOrders(filterValues);
    setShowAddOrderForm(false);
  }

  // Cancel AddOrder: Show confirm modal
  function handleAddOrderCancel() {
    setShowAddOrderCancelModal(true);
  }
  function handleAddOrderCancelConfirm() {
    setShowAddOrderForm(false);
    setShowAddOrderCancelModal(false);
  }
  function handleAddOrderCancelDismiss() {
    setShowAddOrderCancelModal(false);
  }

  // Filter Modal Controls
  const handleOpenFilterModal = () => setShowFilterModal(true);
  const handleCloseFilterModal = () => setShowFilterModal(false);
  const handleApplyFilterModal = (filters) => {
    setFilterValues(filters);
    setShowFilterModal(false);
  };
  const handleClearAllFilters = () => {
    setFilterValues(null);
    setShowFilterModal(false);
  };

  return (
    <div className="flex min-h-screen w-full font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-w-0">
        <Header />
        <div className="pt-8 px-8 flex-1 overflow-y-auto pb-10">
          {/* TOGGLE VIEW: ADD ORDER FORM vs LIST */}
          {showAddOrderForm ? (
            <div className="w-full max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Add New Order</h1>
                  <p className="text-sm text-gray-500 mt-1">Create a manual order entry</p>
                </div>
                <button
                  onClick={handleAddOrderCancel}
                  className="px-4 py-2 border border-gray-300 bg-white rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel & Go Back
                </button>
              </div>
              {/* Use the same AddOrder component regardless of B2B or Sales */}
              <AddOrder open={true} onClose={handleAddOrderCancel} onSuccess={handleOrderCreated} />
              {/* Confirmation modal for cancelling add order */}
              {showAddOrderCancelModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                  <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="p-6 relative">
                      <button
                        onClick={handleAddOrderCancelDismiss}
                        className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <XCircle size={20} />
                      </button>
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-orange-50">
                        <AlertTriangle className="text-orange-500" size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">Unsaved changes</h3>
                      <p className="text-sm text-slate-500 leading-relaxed mb-6">
                        You are about to leave this page without creating a Sale Order. All data will be lost if you leave this page. Do you wish to continue?
                      </p>
                    </div>
                    <div className="px-6 py-4 bg-white border-t flex justify-end gap-3">
                      <button
                        onClick={handleAddOrderCancelDismiss}
                        className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddOrderCancelConfirm}
                        className="px-8 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* PAGE HEADER & ACTION BUTTONS */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>{PAGE_TITLE}</h1>
                  <p className="text-sm mt-1" style={{ color: "var(--text)", opacity: 0.6 }}>{PAGE_DESCRIPTION}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {/* Filter as modal trigger */}
                  <button
                    onClick={handleOpenFilterModal}
                    className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm"
                    style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
                  >
                    <Filter size={16} />
                    <span>Filter</span>
                  </button>
                  <ToolbarButton icon={<Upload size={16} />} />
                  <ToolbarButton icon={<Download size={16} />} />
                  <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm hover:shadow-md ml-2"
                    onClick={() => setShowAddOrderForm(true)}
                  >
                    <Plus size={18} />
                    Add Order
                  </button>
                </div>
              </div>
              {/* NEW ORDER TYPE TABS */}
              <div className="flex border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
                {ORDER_TYPE_TABS.map((tab) => {
                  let count = 0;
                  if (tab.key === 'all') {
                    count = orders.length;
                  } else if (tab.key === 'sales') {
                    count = orders.filter(order => getOrderType(order) === "Sales").length;
                  } else if (tab.key === 'b2b') {
                    count = orders.filter(order => getOrderType(order) === "B2B").length;
                  }
                  return (
                    <TabButton
                      key={tab.key}
                      text={tab.name}
                      active={activeTab === tab.key}
                      count={count}
                      onClick={() => setActiveTab(tab.key)}
                    />
                  );
                })}
              </div>
              {/* TABLE AREA */}
              {loading ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-96 flex flex-col items-center justify-center">
                  <Loader size={32} className="animate-spin text-blue-600 mb-4" />
                  <span className="text-gray-500 font-medium">Loading orders...</span>
                </div>
              ) : (
                <div className="rounded-xl shadow-sm border overflow-hidden min-h-[400px]" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        {/* Render table headers according to tab */}
                        {activeTab === "b2b" ? (
                          <tr className="border-b text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: "rgba(0,0,0,0.02)", borderColor: "var(--border)", color: "var(--text)", opacity: 0.7 }}>
                            <th className="p-4 w-12 text-center">
                              <input type="checkbox" className="rounded w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                            </th>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Product Ordered</th>
                            <th className="p-4">Product Unallocated</th>
                            <th className="p-4">Channel</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Expire Date</th>
                            <th className="p-4">Appointment Date</th>
                            <th className="p-4">Created At</th>
                            <th className="p-4 text-center">Actions</th>
                          </tr>
                        ) : (
                          <tr className="border-b text-xs font-semibold uppercase tracking-wider" style={{ backgroundColor: "rgba(0,0,0,0.02)", borderColor: "var(--border)", color: "var(--text)", opacity: 0.7 }}>
                            <th className="p-4 w-12 text-center">
                              <input type="checkbox" className="rounded w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                            </th>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Created At</th>
                            <th className="p-4">Channel</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Payment</th>
                            <th className="p-4">On Hold</th>
                            <th className="p-4">Products</th>
                            <th className="p-4">Channel Created</th>
                            <th className="p-4 text-center">Actions</th>
                          </tr>
                        )}
                      </thead>
                      <tbody className="divide-y" style={{ divideColor: "var(--border)" }}>
                        {displayedOrders.length > 0 ? (
                          displayedOrders.map((order) => (
                            <OrderRow
                              key={order.id}
                              order={order}
                              viewMode={activeTab}
                              onActionMenuOpen={(id) => setOpenMenuOrderId(id)}
                              isMenuOpen={openMenuOrderId === order.id}
                              menuRef={(el) => (menuRefs.current[order.id] = el)}
                              onUpdateStatus={handleUpdateStatus}
                              onDelete={confirmDelete}
                            />
                          ))
                        ) : (
                          <tr>
                            <td colSpan={activeTab === 'b2b' ? 11 : 11} className="py-20 text-center">
                              <div className="flex flex-col items-center justify-center text-gray-400">
                                <div className="bg-gray-100 p-4 rounded-full mb-3">
                                  <Filter size={24} />
                                </div>
                                <p className="text-sm font-medium text-gray-600">No orders found</p>
                                <p className="text-xs">Try adjusting your filters or add a new order.</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  {/* FOOTER / PAGINATION */}
                  {displayedOrders.length > 0 && (
                    <div className="p-4 border-t text-xs flex justify-between items-center" style={{ borderColor: "var(--border)", backgroundColor: "rgba(0,0,0,0.02)", color: "var(--text)", opacity: 0.7 }}>
                      <span>Showing {displayedOrders.length} orders</span>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded disabled:opacity-50" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }} disabled>Prev</button>
                        <button className="px-3 py-1 border rounded disabled:opacity-50" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }} disabled>Prev</button>
                        <button className="px-3 py-1 border rounded disabled:opacity-50" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }} disabled>Next</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* PROFESSIONAL DELETE MODAL */}
      {deleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={deleteModalOpen}
          orderId={orderToDelete?.id}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleExecuteDelete}
        />
      )}
      {/* FILTER MODAL: show when showFilterModal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/30">
          <div
            className="bg-white max-w-md w-full rounded-xl shadow-lg relative animate-in fade-in zoom-in-95 duration-150"
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
          >
            {/* FilterSidebar expected to be a form-like component */}
            <FilterSidebar
              isOpen={showFilterModal}
              onApply={handleApplyFilterModal}
              onClear={handleClearAllFilters}
              onClose={handleCloseFilterModal}
              initialValues={filterValues}
            />
          </div>
        </div>
      )}
    </div>
  );
});

export default OrdersPage;

// ------------------------------------------------------------------

// SUB-COMPONENTS

// ------------------------------------------------------------------

const ToolbarButton = React.memo(({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm"
    style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
  >
    {icon}
    <span>{text}</span>
  </button>
));

const TabButton = React.memo(({ text, active, count, onClick }) => (
  <button
    type="button"
    className={`mr-8 pb-3 text-sm font-medium transition-all relative flex items-center gap-2 whitespace-nowrap ${active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
      }`}
    onClick={onClick}
  >
    {text}
    <span className={`inline-block px-2 py-0.5 text-xs font-semibold ml-1 ${active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
      } rounded-full`}>
      {count}
    </span>
    {active && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
    )}
  </button>
));

const DeleteConfirmationModal = ({ isOpen, orderId, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all scale-100">
        <div className="flex items-start gap-4">
          <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Delete Order?</h3>
            <p className="text-sm text-gray-500 mt-2">
              You are about to permanently delete order <span className="font-mono font-medium text-gray-700">{orderId}</span>.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              This action cannot be undone and will remove all customer and payment data associated with this order.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 rounded-lg text-sm font-medium text-white hover:bg-red-700 shadow-sm transition-colors flex items-center gap-2"
          >
            <Trash2 size={16} />
            Delete Order
          </button>
        </div>
      </div>
    </div>
  );
};

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

function OnHoldBadge({ value }) {
  const isYes = value === true;
  return (
    <span
      className={
        `px-3 py-1 rounded-full text-xs font-bold
         ${isYes
          ? 'bg-green-600 text-white border border-green-600'
          : 'bg-red-600 text-white border border-red-600'
        }`
      }
    >
      {isYes ? "Yes" : "No"}
    </span>
  );
}

/**
 * OrderRow will render different layouts based on tab:
 * - For B2B: Order ID, Customer, Product Ordered, Product Unallocated, Channel, Status, Expire Date, Appointment Date, Created At, Actions
 * - For Sales: previous columns (the default from before)
 */
const OrderRow = React.memo(({ order, onActionMenuOpen, isMenuOpen, menuRef, onUpdateStatus, onDelete, viewMode }) => {
  const getPlatformStyle = (platform) => {
    switch (platform) {
      case 'Amazon': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Flipkart': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Myntra': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'Shopify': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Ready to Ship': return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border border-red-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
    }
  };

  const availableTransitions = STATUS_TRANSITIONS[order.status] || [];

  const formatDateTime = (dateObj) =>
    dateObj ? `${dateObj.toLocaleDateString('en-IN')} ${dateObj.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}` : '—';

  const formatDate = (dateObj) =>
    dateObj ? `${dateObj.toLocaleDateString('en-IN')}` : '—';

  if (order.isB2B && (viewMode === 'b2b')) {
    return (
      <tr className="hover:bg-blue-50/30 transition-colors group">
        {/* Checkbox */}
        <td className="p-4 text-center">
          <input type="checkbox" className="rounded w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
        </td>
        {/* Order ID */}
        <td className="p-4">
          <div className="font-semibold text-blue-600 text-sm hover:underline cursor-pointer">{order.id}</div>
        </td>
        {/* Customer */}
        <td className="p-4">
          <div className="text-sm font-medium" style={{ color: "var(--text)" }}>{order.customer}</div>
        </td>
        {/* Product Ordered */}
        <td className="p-4">
          <div className="text-sm text-gray-700" style={{ maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={order.products}>
            {order.products}
          </div>
        </td>
        {/* Product Unallocated */}
        <td className="p-4">
          <div className="text-sm text-gray-700" style={{ maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={order.productsUnallocated}>
            {order.productsUnallocated || "—"}
          </div>
        </td>
        {/* Channel */}
        <td className="p-4">
          <span className={`px-2.5 py-1 rounded text-xs font-semibold border ${getPlatformStyle(order.platform)}`}>
            {order.platform}
          </span>
        </td>
        {/* Status */}
        <td className="p-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusStyle(order.status)}`}>
            {order.status}
          </span>
        </td>
        {/* Expire Date */}
        <td className="p-4">
          <div className="text-xs text-gray-500">{formatDate(order.expireDate)}</div>
        </td>
        {/* Appointment Date */}
        <td className="p-4">
          <div className="text-xs text-gray-500">{formatDate(order.appointmentDate)}</div>
        </td>
        {/* Created At */}
        <td className="p-4">
          <div className="text-xs text-gray-500">{formatDateTime(order.createdAt)}</div>
        </td>
        {/* Action Menu */}
        <td className="p-4 text-center relative">
          <button
            className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onActionMenuOpen(order.id);
            }}
          >
            <MoreVertical size={16} />
          </button>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="absolute z-50 right-6 top-8 w-48 bg-white border border-gray-200 shadow-xl rounded-lg py-1 text-left flex flex-col animate-in fade-in zoom-in-95 duration-100"
            >
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
                Update Status
              </div>
              <div className="p-1">
                {availableTransitions.length > 0 ? (
                  availableTransitions.map((status) => (
                    <button
                      key={status}
                      className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
                      onClick={() => onUpdateStatus(order.id, status)}
                    >
                      {STATUS_ICONS[status]}
                      {status}
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-xs text-gray-400 italic">No updates available</div>
                )}
              </div>
              <div className="border-t border-gray-100 my-1"></div>
              <div className="p-1">
                <button
                  className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors group"
                  onClick={() => onDelete(order.id)}
                >
                  <Trash2 size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                  Delete Order
                </button>
              </div>
            </div>
          )}
        </td>
      </tr>
    );
  }

  // Fallback to previous: SALES/B2C
  return (
    <tr className="hover:bg-blue-50/30 transition-colors group">
      {/* Checkbox */}
      <td className="p-4 text-center">
        <input type="checkbox" className="rounded w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
      </td>
      {/* Order ID */}
      <td className="p-4">
        <div className="font-semibold text-blue-600 text-sm hover:underline cursor-pointer">{order.id}</div>
      </td>
      {/* Created At */}
      <td className="p-4">
        <div className="text-xs text-gray-500">{formatDateTime(order.createdAt)}</div>
      </td>
      {/* Channel */}
      <td className="p-4">
        <span className={`px-2.5 py-1 rounded text-xs font-semibold border ${getPlatformStyle(order.platform)}`}>
          {order.platform}
        </span>
      </td>
      {/* Customer */}
      <td className="p-4">
        <div className="text-sm font-medium" style={{ color: "var(--text)" }}>{order.customer}</div>
      </td>
      {/* Status */}
      <td className="p-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusStyle(order.status)}`}>
          {order.status}
        </span>
      </td>
      {/* Payment */}
      <td className="p-4">
        <div className="text-xs text-gray-700">{order.payment}</div>
      </td>
      {/* On Hold */}
      <td className="p-4">
        <OnHoldBadge value={order.onHold} />
      </td>
      {/* Products */}
      <td className="p-4">
        <div className="text-sm text-gray-700" style={{ maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={order.products}>
          {order.products}
        </div>
      </td>
      {/* Channel Created */}
      <td className="p-4">
        <div className="text-xs text-gray-500">{formatDateTime(order.channelCreated)}</div>
      </td>
      {/* Action Menu */}
      <td className="p-4 text-center relative">
        <button
          className="text-gray-400 hover:text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onActionMenuOpen(order.id);
          }}
        >
          <MoreVertical size={16} />
        </button>
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute z-50 right-6 top-8 w-48 bg-white border border-gray-200 shadow-xl rounded-lg py-1 text-left flex flex-col animate-in fade-in zoom-in-95 duration-100"
          >
            <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100">
              Update Status
            </div>
            <div className="p-1">
              {availableTransitions.length > 0 ? (
                availableTransitions.map((status) => (
                  <button
                    key={status}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors"
                    onClick={() => onUpdateStatus(order.id, status)}
                  >
                    {STATUS_ICONS[status]}
                    {status}
                  </button>
                ))
              ) : (
                <div className="px-3 py-2 text-xs text-gray-400 italic">No updates available</div>
              )}
            </div>
            <div className="border-t border-gray-100 my-1"></div>
            <div className="p-1">
              <button
                className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors group"
                onClick={() => onDelete(order.id)}
              >
                <Trash2 size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                Delete Order
              </button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
});
