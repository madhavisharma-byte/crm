
import React, { useState, useMemo, useEffect } from 'react';
import { Upload, Download, Plus, Filter, Package, AlertTriangle, TrendingDown, BarChart3, MoreHorizontal, Box, Layers, LineChart, Loader } from 'lucide-react';
import Sidebar from '../components/website/Sidebar';
import Header from '../components/website/Header';
import AddInventory from '../components/AddInventory';
import api from '../utils/api';

// Fallback data removed per instructions.

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

const getUniqueCategories = (inventory) => {
  const set = new Set();
  inventory.forEach((item) => set.add(item.category));
  return Array.from(set);
};

function getTabInventoryCount(inventory, key) {
  if (key === 'all') return inventory.length;
  if (key === 'categories') return getUniqueCategories(inventory).length;
  if (key === 'analytics') return '';
  if (INVENTORY_STATUS_MAP[key]) {
    return inventory.filter((itm) =>
      INVENTORY_STATUS_MAP[key].includes(itm.status)
    ).length;
  }
  return 0;
}

const ActionButton = React.memo(({ icon, text }) => (
  <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}>
    {icon}
    {text}
  </button>
));

const TabButton = React.memo(({ text, icon, active, count, onClick }) => (
  <button
    type="button"
    className={`mr-8 pb-3 text-sm font-medium transition-all relative flex items-center gap-2 ${active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
      }`}
    onClick={onClick}
  >
    {icon && <span className="mb-0.5">{icon}</span>}
    <span>{text}</span>
    {(count || count === 0) && (
      <span
        className={`inline-block px-2 py-0.5 text-xs font-semibold ml-1 ${active ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
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
  <div className="p-5 rounded-xl border shadow-sm flex items-center gap-4" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium" style={{ color: "var(--text)", opacity: 0.6 }}>{title}</p>
      <h3 className="text-2xl font-bold" style={{ color: "var(--text)" }}>{value}</h3>
    </div>
  </div>
);

const InventoryRow = React.memo(({ item }) => (
  <tr className="hover:bg-gray-50/50 transition-colors group">
    <td className="p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
          <Box size={20} />
        </div>
        <span className="font-medium text-sm" style={{ color: "var(--text)" }}>{item.name}</span>
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
        <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{item.stock} units</span>
        {item.lowThreshold && item.stock < 10 && (
          <span className="text-[10px] text-orange-600">
            Low threshold: {item.lowThreshold}
          </span>
        )}
      </div>
    </td>
    <td className="p-4 text-sm font-bold" style={{ color: "var(--text)" }}>{item.price}</td>
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

const CategoriesView = ({ inventory }) => {
  const categories = getUniqueCategories(inventory).map((cat) => ({
    name: cat,
    count: inventory.filter(i => i.category === cat).length,
  }));
  return (
    <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-600">
        <Layers size={20} /> Product Categories
      </h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.name} className="flex items-center py-3 border-b last:border-b-0">
            <span className="flex-1 font-medium" style={{ color: "var(--text)" }}>{cat.name}</span>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full ml-3">{cat.count} products</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const AnalyticsView = ({ inventory }) => {
  const totalStock = inventory.reduce((a, b) => a + (b.stock || 0), 0);
  return (
    <div className="rounded-xl shadow-sm border p-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-600">
        <LineChart size={20} /> Analytics Overview
      </h2>
      <p className="mb-2">Total SKUs: <span className="font-bold">{inventory.length}</span></p>
      <p className="mb-2">Combined Stock: <span className="font-bold">{totalStock}</span></p>
      <div className="mt-4 italic text-gray-500">More analytics coming soon...</div>
    </div>
  );
};

// Utility function to parse price string and get unit price as number
function parseUnitPrice(priceStr) {
  if (!priceStr) return 0;
  if (typeof priceStr === 'number') return priceStr;
  const numeric = priceStr.replace(/[^\d.]/g, '');
  const value = Number(numeric);
  return isNaN(value) ? 0 : value;
}

// Calculates stats for inventory array: totalSkus, lowStock, outOfStock, totalValue
function calculateStats(items) {
  return {
    totalSkus: items.length,
    lowStock: items.filter(item => item.status === 'Low Stock').length,
    outOfStock: items.filter(item => item.status === 'Out of Stock').length,
    totalValue: items.reduce((sum, item) => {
      const unitPrice = parseUnitPrice(item.price);
      return sum + unitPrice * (item.stock || 0);
    }, 0)
  };
}

const InventoryPage = React.memo(() => {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [showAddInventoryForm, setShowAddInventoryForm] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSkus: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0,
  });

  // Fetch inventory products from backend only, do not fallback to fallback data
  const fetchInventory = async () => {
    setLoading(true);

    try {
      // Remove protected for get the inventory (i.e. call the non-protected endpoint)
      const res = await api.get("/inventory");

      const items = Array.isArray(res.data)
        ? res.data
        : res.data.items || [];

      const mapped = items.map(item => ({
        _id: item._id,            // ✅ NOW IT EXISTS
        name: item.title,
        sku: item.sku,
        category: item.category || "Uncategorized",
        stock: item.quantity || 0,
        price: item.price ?? 0,
        status:
          item.quantity === 0
            ? "Out of Stock"
            : item.quantity <= (item.lowStockThreshold ?? 10)
              ? "Low Stock"
              : "In Stock",
        lowThreshold: item.lowStockThreshold,
      }));

      setInventory(mapped);
      setStats(calculateStats(mapped));
    } catch (error) {
      console.error("Inventory fetch failed:", error);
      setInventory([]);
      setStats(calculateStats([]));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
    // eslint-disable-next-line
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  function handleInventoryCreated(newItem) {
    fetchInventory();
    setShowAddInventoryForm(false);
  }

  // Filtered inventory according to tab and search
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
  }, [activeTab, search, inventory]);

  return (
    <div className="flex min-h-screen w-full font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-w-0">
        <Header />
        <div className="pt-8 px-8 flex-1 overflow-y-auto">
          {showAddInventoryForm ? (
            <div className="w-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    Add New Inventory Item
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Fill in the details to add a new product to inventory
                  </p>
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
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Inventory</h1>
                  <p className="text-sm mt-1" style={{ color: "var(--text)", opacity: 0.6 }}>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <SummaryCard
                  title="Total Products"
                  value={stats.totalSkus ? stats.totalSkus.toLocaleString() : '0'}
                  icon={<Package className="text-blue-600 w-6 h-6" />}
                  bg="bg-blue-50"
                />
                <SummaryCard
                  title="Low Stock"
                  value={stats.lowStock}
                  icon={<AlertTriangle className="text-orange-500 w-6 h-6" />}
                  bg="bg-orange-50"
                />
                <SummaryCard
                  title="Out of Stock"
                  value={stats.outOfStock}
                  icon={<TrendingDown className="text-red-500 w-6 h-6" />}
                  bg="bg-red-50"
                />
                <SummaryCard
                  title="Total Inventory Value"
                  value={formatCurrency(stats.totalValue)}
                  icon={<BarChart3 className="text-green-600 w-6 h-6" />}
                  bg="bg-green-50"
                />
              </div>
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
              {activeTab === 'categories' ? (
                <CategoriesView inventory={inventory} />
              ) : activeTab === 'analytics' ? (
                <AnalyticsView inventory={inventory} />
              ) : (
                <>
                  {loading ? (
                    <div className="rounded-xl shadow-sm border flex items-center justify-center p-16" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                      <Loader size={24} className="animate-spin text-blue-600" />
                      <span className="ml-3 text-gray-600">Loading inventory...</span>
                    </div>
                  ) : (
                    <div className="rounded-xl shadow-sm border overflow-hidden" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b text-xs font-semibold uppercase tracking-wider" style={{ borderColor: "var(--border)", backgroundColor: "rgba(0,0,0,0.02)", color: "var(--text)", opacity: 0.7 }}>
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
                                <InventoryRow key={item._id || item.sku || idx} item={item} />
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
                      <div className="p-4 border-t text-xs flex justify-between items-center" style={{ borderColor: "var(--border)", color: "var(--text)", opacity: 0.6 }}>
                        <span>
                          Showing {filteredInventory.length} of {inventory.length} products
                        </span>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 border rounded hover:opacity-80" style={{ borderColor: "var(--border)" }}>
                            Prev
                          </button>
                          <button className="px-3 py-1 border rounded hover:opacity-80" style={{ borderColor: "var(--border)" }}>
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