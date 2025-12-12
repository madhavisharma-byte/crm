import React, { useState, useMemo, useEffect } from 'react';
import { Upload, Download, Plus, Search, Filter, Package, AlertTriangle, TrendingDown, BarChart3, MoreHorizontal, Box, Layers, LineChart, Loader } from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/header';
import AddInventory from '../pages/AddInventory';
import api from '../utils/api';

const INVENTORY_STATUSES = [
  { label: 'All', value: 'all' },
  { label: 'In Stock', value: 'in_stock' },
  { label: 'Low Stock', value: 'low_stock' },
  { label: 'Out of Stock', value: 'out_of_stock' },
  { label: 'Categories', value: 'categories' },
  { label: 'Analytics', value: 'analytics' },
];

const INVENTORY_STATUS_MAP = {
  all: null,
  in_stock: ['In Stock'],
  low_stock: ['Low Stock'],
  out_of_stock: ['Out of Stock'],
};

const rawInventoryData = [
  {
    name: 'Nike Air Max 270',
    sku: 'SKU-001',
    category: 'Mens Footwear',
    stock: 45,
    price: '₹1,299',
    status: 'In Stock',
  },
  {
    name: 'Samsung Galaxy S24 Case',
    sku: 'SKU-002',
    category: 'Phone Cases',
    stock: 8,
    lowThreshold: 10,
    price: '₹999',
    status: 'Low Stock',
  },
  {
    name: 'Premium Leather Wallet',
    sku: 'SKU-003',
    category: 'Accessories',
    stock: 0,
    lowThreshold: 5,
    price: '₹2,499',
    status: 'Out of Stock',
  },
];

// Helper to get unique categories from raw data
const getUniqueCategories = (inventory) => {
  const set = new Set();
  inventory.forEach((item) => set.add(item.category));
  return Array.from(set);
};

// Generate counts for each status for tab badges
function getTabInventoryCount(inventory, key) {
  if (key === 'all') return inventory.length;
  if (key === 'categories') return getUniqueCategories(inventory).length;
  if (key === 'analytics') return ''; // Analytics might not need a badge
  if (INVENTORY_STATUS_MAP[key]) {
    return inventory.filter((itm) =>
      INVENTORY_STATUS_MAP[key].includes(itm.status)
    ).length;
  }
  return 0;
}

// Reusable action button, like in OrdersPage
const ActionButton = React.memo(({ icon, text }) => (
  <button className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors">
    {icon}
    {text}
  </button>
));

// TabButton styled to look like Orders tab (with option for icon)
const TabButton = React.memo(({ text, icon, active, count, onClick }) => (
  <button
    type="button"
    className={`mr-8 pb-3 text-sm font-medium transition-all relative flex items-center gap-2 ${
      active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
    }`}
    onClick={onClick}
  >
    {icon && <span className="mb-0.5">{icon}</span>}
    <span>{text}</span>
    {(count || count === 0) && (
      <span
        className={`inline-block px-2 py-0.5 text-xs font-semibold ml-1 ${
          active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        } rounded-full`}
      >
        {count}
      </span>
    )}
    {active && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-full" />
    )}
  </button>
));

// Status badge colors adapted from Orders style
const StatusBadge = ({ status }) => {
  let style = '';
  switch (status) {
    case 'In Stock':
      style = 'bg-blue-600 text-white';
      break;
    case 'Low Stock':
      style = 'bg-yellow-500 text-white';
      break;
    case 'Out of Stock':
      style = 'bg-red-500 text-white';
      break;
    default:
      style = 'bg-gray-200 text-gray-700';
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
};

const SummaryCard = ({ title, value, icon, bg }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
    </div>
  </div>
);

// Table row for inventory list
const InventoryRow = React.memo(({ item }) => (
  <tr className="hover:bg-gray-50/50 transition-colors group">
    <td className="p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
          <Box size={20} />
        </div>
        <span className="font-medium text-gray-900 text-sm">{item.name}</span>
      </div>
    </td>
    <td className="p-4 text-sm text-gray-500">{item.sku}</td>
    <td className="p-4">
      <span className="px-2.5 py-1 border border-gray-200 rounded-full text-xs font-medium text-gray-600">
        {item.category}
      </span>
    </td>
    <td className="p-4">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{item.stock} units</span>
        {item.lowThreshold && (
          <span className="text-[10px] text-orange-600">
            Low threshold: {item.lowThreshold}
          </span>
        )}
      </div>
    </td>
    <td className="p-4 text-sm font-bold text-gray-900">{item.price}</td>
    <td className="p-4">
      <StatusBadge status={item.status} />
    </td>
    <td className="p-4 text-center">
      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
        <MoreHorizontal size={16} />
      </button>
    </td>
  </tr>
));

// Simple Categories/Analytics views for new tabs
const CategoriesView = ({ inventory }) => {
  const categories = getUniqueCategories(inventory).map((cat) => ({
    name: cat,
    count: inventory.filter(i => i.category === cat).length,
  }));
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-600">
        <Layers size={20} /> Product Categories
      </h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.name} className="flex items-center py-3 border-b last:border-b-0">
            <span className="flex-1 font-medium text-gray-800">{cat.name}</span>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full ml-3">{cat.count} products</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AnalyticsView = ({ inventory }) => {
  // In a real app this would be more elaborate
  const totalStock = inventory.reduce((a, b) => a + (b.stock || 0), 0);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-600">
        <LineChart size={20} /> Analytics Overview
      </h2>
      <p className="mb-2">Total SKUs: <span className="font-bold">{inventory.length}</span></p>
      <p className="mb-2">Combined Stock: <span className="font-bold">{totalStock}</span></p>
      {/* You can add more analytics/charts here */}
      <div className="mt-4 italic text-gray-500">More analytics coming soon...</div>
    </div>
  );
};

const InventoryPage = React.memo(() => {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [showAddInventoryForm, setShowAddInventoryForm] = useState(false);
  const [inventory, setInventory] = useState(rawInventoryData);
  const [loading, setLoading] = useState(false);

  // Fetch inventory from backend
  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await api.get('/inventory');
      if (response.data && response.data.items) {
        // Transform backend inventory to frontend format
        const transformedInventory = response.data.items.map(item => {
          const metadata = item.metadata || {};
          // Determine status based on quantity
          let status = 'Out of Stock';
          if (item.quantity > 10) {
            status = 'In Stock';
          } else if (item.quantity > 0) {
            status = 'Low Stock';
          }
          
          return {
            name: item.title,
            sku: item.sku,
            category: metadata.category || 'Uncategorized',
            stock: item.quantity || 0,
            price: `₹${item.price?.toLocaleString('en-IN') || '0'}`,
            status: status,
            lowThreshold: 10,
            _id: item._id // Keep backend ID
          };
        });
        setInventory(transformedInventory);
      }
    } catch (err) {
      console.error('Error fetching inventory:', err);
      // Keep default inventory on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch inventory on component mount
  useEffect(() => {
    fetchInventory();
  }, []);

  // Handler when inventory item is successfully created
  function handleInventoryCreated(newItem) {
    // Refresh inventory from backend
    fetchInventory();
    // Close the form and show inventory list
    setShowAddInventoryForm(false);
  }

  // Derived filtered inventory based on search & status
  const filteredInventory = useMemo(() => {
    let res = inventory;
    if (
      activeTab !== 'all' &&
      activeTab !== 'categories' &&
      activeTab !== 'analytics' &&
      INVENTORY_STATUS_MAP[activeTab]
    ) {
      res = res.filter((item) =>
        INVENTORY_STATUS_MAP[activeTab].includes(item.status)
      );
    }
    if (search.trim()) {
      const query = search.trim().toLowerCase();
      res = res.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(query)) ||
          (item.sku && item.sku.toLowerCase().includes(query))
      );
    }
    return res;
  }, [activeTab, search]);

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F6] font-sans text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-w-0 md:ml-64">
        <Header />
        <div className="pt-24 px-8 flex-1 overflow-y-auto">
          {showAddInventoryForm ? (
            // Show Add Inventory Form
            <div className="w-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Add New Inventory Item</h1>
                  <p className="text-sm text-gray-500 mt-1">Fill in the details to add a new product to inventory</p>
                </div>
                <button
                  onClick={() => setShowAddInventoryForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back to Inventory
                </button>
              </div>
              <AddInventory
                open={true}
                onClose={() => setShowAddInventoryForm(false)}
                onSuccess={handleInventoryCreated}
              />
            </div>
          ) : (
            // Show Inventory List
            <>
              {/* Header with title & description and action buttons */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage your product catalog and stock levels
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <ActionButton icon={<Filter size={18} />} text="Filters" />
                  <ActionButton icon={<Upload size={16} />} text="Import CSV" />
                  <ActionButton icon={<Download size={16} />} text="Export" />
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                    onClick={() => setShowAddInventoryForm(true)}
                    aria-label="Add Product"
                  >
                    <Plus size={16} />
                    Add Product
                  </button>
                </div>
              </div>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <SummaryCard
                  title="Total Products"
                  value="2,456"
                  icon={<Package className="text-blue-600 w-6 h-6" />}
                  bg="bg-blue-50"
                />
                <SummaryCard
                  title="Low Stock"
                  value="23"
                  icon={<AlertTriangle className="text-orange-500 w-6 h-6" />}
                  bg="bg-orange-50"
                />
                <SummaryCard
                  title="Out of Stock"
                  value="5"
                  icon={<TrendingDown className="text-red-500 w-6 h-6" />}
                  bg="bg-red-50"
                />
                <SummaryCard
                  title="Total Value"
                  value="₹18.5L"
                  icon={<BarChart3 className="text-green-600 w-6 h-6" />}
                  bg="bg-green-50"
                />
              </div>
              {/* Tab navigation as in OrdersPage */}
              <div className="flex flex-row border-b border-gray-100 mb-6 overflow-x-auto">
                {INVENTORY_STATUSES.map((tab, idx) => {
                  let icon = null;
                  if (tab.value === 'categories') icon = <Layers size={16} />;
                  if (tab.value === 'analytics') icon = <LineChart size={16} />;
                  return (
                    <TabButton
                      key={tab.value}
                      icon={icon}
                      text={
                        tab.value === 'all'
                          ? tab.label + ' Products'
                          : tab.value === 'categories'
                          ? 'Categories'
                          : tab.value === 'analytics'
                          ? 'Analytics'
                          : tab.label + ' Stock'
                      }
                      active={activeTab === tab.value}
                      count={
                        tab.value !== 'analytics'
                          ? getTabInventoryCount(inventory, tab.value)
                          : undefined
                      }
                      onClick={() => setActiveTab(tab.value)}
                    />
                  );
                })}
              </div>
              {/* Render different view if categories or analytics tab selected */}
              {activeTab === 'categories' ? (
                <CategoriesView inventory={inventory} />
              ) : activeTab === 'analytics' ? (
                <AnalyticsView inventory={inventory} />
              ) : (
                <>
                  {/* Inventory Table */}
                  {loading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 flex items-center justify-center">
                      <Loader size={24} className="animate-spin text-blue-600" />
                      <span className="ml-3 text-gray-600">Loading inventory...</span>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              <th className="p-4">Product</th>
                              <th className="p-4">SKU</th>
                              <th className="p-4">Category</th>
                              <th className="p-4">Stock</th>
                              <th className="p-4">Price</th>
                              <th className="p-4">Status</th>
                              <th className="p-4 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {filteredInventory.length > 0 ? (
                              filteredInventory.map((item, idx) => (
                                <InventoryRow key={item.sku || item._id || idx} item={item} />
                              ))
                            ) : (
                              <tr>
                                <td colSpan={7} className="py-16 text-center text-gray-400 text-sm">
                                  No products found.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      {/* Pagination / Footer */}
                      <div className="p-4 border-t border-gray-100 text-xs text-gray-400 flex justify-between items-center">
                        <span>
                          Showing {filteredInventory.length} of {inventory.length} products
                        </span>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">
                            Prev
                          </button>
                          <button className="px-3 py-1 border border-gray-200 rounded hover:bg-gray-50">
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
});

export default InventoryPage;