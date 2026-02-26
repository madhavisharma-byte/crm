import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, ShoppingCart, Wallet,
  ArrowDownToLine, RotateCcw, Box, Hammer,
  Settings, Menu, ChevronDown, Package, Receipt, Boxes, X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSubMenus, setOpenSubMenus] = useState({
    'Sale Orders': true, 'Customers': true, 'Reports': true, 'Dispatch': true,
    'Staging': true, 'Purchase Orders': true, 'Replenishment Planning': true,
    'Vendor Management': true, 'Putaway': true, 'Goods Receipt': true, 'All': true,
    'RTO': true, 'Customer Returns': true, 'Configurations': true,
    'Catalog': true, 'Products': true, 'Inventory': true, 'Transfers': true, 'Search': true,
    'Channels': true, 'Users': true, 'Layouts': true, 'Facilities': true, 'Others': true,
    'Management': true
  });

  const [activeItem, setActiveItem] = useState(null);
  const [hoveredText, setHoveredText] = useState(null);
  const [tooltipTop, setTooltipTop] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const MENU_DATA = [
    { id: 'dashboard', text: 'Dashboard', icon: <LayoutDashboard size={20} strokeWidth={1.5} />, subItems: [{ text: 'Overview', path: '/dashboard/overview' }, { text: 'Sales', path: '/dashboard/sales' }, { text: 'Fulfilment', path: '/dashboard/fulfilment' }, { text: 'Purchases', path: '/dashboard/purchase' }, { text: 'Returns', path: '/dashboard/returns' }, { text: 'Inventory', path: '/dashboard/inventory' }, { text: 'Payment', path: '/dashboard/payment' }, { text: 'Reports', type: 'dropdown', children: [{ text: 'Order Items', path: '/dashboard/reports/order-items' }, { text: 'Invoice', path: '/dashboard/reports/invoice' }, { text: 'Other Reports', path: '/dashboard/reports/other' }] }] },
    { id: 'orders', text: 'Order', icon: <ShoppingCart size={20} strokeWidth={1.5} />, subItems: [{ text: 'Sale Orders', type: 'dropdown', children: [{ text: 'Orders', path: '/sales-order' }, { text: 'B2B Orders', path: '/b2b-order' }] }, { text: 'Customers', type: 'dropdown', children: [{ text: 'Customers', path: '/orders/customers' }, { text: 'Customer Discount Groups', path: '/orders/customers/discount-group' }, { text: 'Dispatch Tolerance Groups', path: '/orders/customers/tolerance-groups' }] }] },
    { id: 'fulfillment', text: 'Fulfillment', icon: <Package size={20} strokeWidth={1.5} />, subItems: [{ text: 'Dispatch', type: 'dropdown', children: [{ text: 'Shipments', path: '/fulfillment/dispatch/shipments' }, { text: 'Pack Group', path: '/fulfillment/dispatch/pack-group' }, { text: 'Dispatch Group', path: '/fulfillment/dispatch/dispatch-group' }, { text: 'Picklists', path: '/fulfillment/dispatch/picklists' }, { text: 'B2B Picklists', path: '/fulfillment/dispatch/b2b-picklists' }, { text: 'Manifests', path: '/fulfillment/dispatch/manifests' }] }, { text: 'Staging', type: 'dropdown', children: [{ text: 'Shelf View', path: '/fulfillment/staging/shelf-view' }] }] },
    { id: 'purchase', text: 'Purchase', icon: <Wallet size={20} strokeWidth={1.5} />, subItems: [{ text: 'Purchase Orders', type: 'dropdown', children: [{ text: 'Purchase Orders', path: '/purchase-orders' }, { text: 'Search ASN', path: '/purchase/search-asn' }, { text: 'Create RIS', path: '/purchase/create-ris' }] }, { text: 'Replenishment Planning', type: 'dropdown', children: [{ text: 'Add to Cart', path: '/purchase/add-to-cart' }, { text: 'Purchase Cart', path: '/purchase/cart' }, { text: 'Back Orders', path: '/purchase/back-orders' }, { text: 'Reorders', path: '/purchase/reorders' }, { text: 'Reorder Config', path: '/purchase/reorder-config' }] }, { text: 'Vendor Management', type: 'dropdown', children: [{ text: 'Vendors', path: '/purchase/vendors' }, { text: 'Vendor Catalog', path: '/purchase/vendor-catalog' }] }] },
    { id: 'inbound', text: 'Inbound', icon: <ArrowDownToLine size={20} strokeWidth={1.5} />, subItems: [{ text: 'Putaway', type: 'dropdown', children: [{ text: 'Putaway', path: '/inbound/putaway' }, { text: 'Awaiting Putaway', path: '/inbound/awaiting' }] }, { text: 'Goods Receipt', type: 'dropdown', children: [{ text: 'GRNs', path: '/inbound/grns' }, { text: 'Create PO Labels', path: '/inbound/labels' }] }] },
    { id: 'returns', text: 'Returns', icon: <RotateCcw size={20} strokeWidth={1.5} />, subItems: [{ text: 'RTO', type: 'dropdown', children: [{ text: 'Awaiting Actions', path: '/returns/rto/awaiting' }, { text: 'Re-Shipments', path: '/returns/rto/reship' }] }, { text: 'Customer Returns', type: 'dropdown', children: [{ text: 'Reverse PickUps', path: '/returns/customer/pickups' }, { text: 'Bulk Return', path: '/returns/customer/bulk' }] }, { text: 'All', type: 'dropdown', children: [{ text: 'Manifest', path: '/returns/manifest' }] }] },
    { id: 'gstconfiguration', text: 'GST Configurations', icon: <Receipt size={20} strokeWidth={1.5} />, subItems: [{ text: 'Configurations', type: 'dropdown', children: [{ text: 'Tax Classes', path: '/gst/tax-classes' }, { text: 'Discount Group Item', path: '/gst/discount-groups' }] }] },
    { id: 'products', text: 'Products', icon: <Boxes size={20} strokeWidth={1.5} />, subItems: [{ text: 'Products', type: 'dropdown', children: [{ text: 'Listings', path: '/products/listings' }, { text: 'Products', path: '/products' }, { text: 'RollupSKU', path: '/products/rollup' }, { text: 'Categories', path: '/products/categories' }, { text: 'Kit', path: '/products/kit' }] }, { text: 'Inventory', type: 'dropdown', children: [{ text: 'Inventory', path: '/products/inventory' }, { text: 'Channel Inventory', path: '/products/inventory/channel' }, { text: 'Snapshot', path: '/products/inventory/snapshot' }, { text: 'Inventory Ledger', path: '/products/inventory/ledger' }] }] },
    { id: 'materialstools', text: 'Materials & Tools', icon: <Hammer size={20} strokeWidth={1.5} />, subItems: [{ text: 'Transfers', type: 'dropdown', children: [{ text: 'Gatepass', path: '/materials/gatepass' }] }, { text: 'Search', type: 'dropdown', children: [{ text: 'Search Product', path: '/materials/search' }] }] },
    { id: 'settings', text: 'Settings', icon: <Settings size={20} strokeWidth={1.5} />, subItems: [{ text: 'Channels', type: 'dropdown', children: [{ text: 'Channels', path: '/settings/channels' }, { text: 'Channels Return Facility Mapping', path: '/settings/channels-return' }] }, { text: 'Users', type: 'dropdown', children: [{ text: 'Users', path: '/settings/users' }] }, { text: 'Layouts', type: 'dropdown', children: [{ text: 'Packages Type', path: '/settings/layout/packages-types' }, { text: 'Search Shelf', path: '/settings/layout/search-shelf' }, { text: 'Create Shelf', path: '/settings/layout/create-shelf' }] }, { text: 'Facilities', type: 'dropdown', children: [{ text: 'Shipping Provider', path: '/settings/facilities/shipping-provider' }, { text: 'Service ability', path: '/settings/facilities/service-ability' }] }, { text: 'Others', type: 'dropdown', children: [{ text: 'Invoice Templates', path: '/settings/invoice' }] }] }
  ];

  const handleMouseEnter = (e, text) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipTop(rect.top + (rect.height / 2));
    setHoveredText(text);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const foundItem = MENU_DATA.find(item => {
      if (item.subItems) {
        return item.subItems.some(sub => {
          if (sub.path && currentPath.includes(sub.path)) return true;
          if (sub.children) return sub.children.some(child => currentPath.includes(child.path));
          return false;
        });
      }
      return false;
    });
    if (foundItem) setActiveItem(foundItem.id);
    if (window.innerWidth < 1024) setIsExpanded(false);
  }, [location.pathname]);

  const activeMenu = MENU_DATA.find((m) => m.id === activeItem);
  const toggleSubMenu = (text) => setOpenSubMenus((prev) => ({ ...prev, [text]: !prev[text] }));

  // --- NEW LOGIC FOR SMALL SCREENS ---
  const handleMainItemClick = (item) => {
    // On small screens, if clicking an already active item, close the sidebar
    if (window.innerWidth < 1024 && activeItem === item.id && isExpanded) {
      setIsExpanded(false);
    } else {
      setActiveItem(item.id);
      setIsExpanded(true);
    }
  };

  const handleMainItemDoubleClick = () => {
    // Specifically for the requested double-click feature to close sidebar
    setIsExpanded(false);
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <div className="font-sans antialiased select-none flex h-screen bg-slate-50 overflow-hidden">

      {/* 1. ICON RAIL */}
      <div className="w-16 flex-shrink-0 bg-[#2563eb] flex flex-col items-center py-6 space-y-8 z-[100] shadow-2xl fixed top-0 left-0 h-screen">
        <div className="bg-white/10 p-2 rounded-xl border border-white/20">
          <Box className="text-white" size={24} />
        </div>

        <div className="flex-1 flex flex-col space-y-4 w-full items-center overflow-y-auto no-scrollbar pb-4">
          {MENU_DATA.map((item) => (
            <div
              key={item.id}
              onClick={() => handleMainItemClick(item)}
              // Double click to close the panel as requested
              onDoubleClick={handleMainItemDoubleClick}
              onMouseEnter={(e) => handleMouseEnter(e, item.text)}
              onMouseLeave={() => setHoveredText(null)}
              className={`relative cursor-pointer p-3 rounded-xl transition-all duration-200 flex-shrink-0 ${activeItem === item.id ? "bg-white text-[#2563eb] shadow-lg" : "text-blue-100 hover:bg-white/10"}`}
            >
              {item.icon}

              {activeItem === item.id && (
                <div className="absolute -right-[12px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[8px] border-y-transparent border-r-[12px] border-r-white z-[110] hidden lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {hoveredText && (
        <div
          className="fixed left-16 z-[9999] flex items-center pointer-events-none animate-in fade-in slide-in-from-left-1 duration-150"
          style={{ top: `${tooltipTop}px`, transform: 'translateY(-50%)' }}
        >
          <div className="w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-slate-900" />
          <div className="bg-slate-900 text-white px-3 py-1.5 rounded-md shadow-2xl whitespace-nowrap font-medium text-[13px]">
            {hoveredText}
          </div>
        </div>
      )}

      {/* 2. EXPANDED PANEL */}
      <div className={`bg-white transition-all duration-300 border-r flex flex-col h-full shadow-sm fixed top-0 z-40 
          ${isExpanded ? 'w-64 translate-x-16 opacity-100' : 'w-0 -translate-x-full lg:opacity-0 overflow-hidden'} `}>

        {/* Mobile Close Button (X) - helpful for small screens */}
        <button
          onClick={() => setIsExpanded(false)}
          className="lg:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 flex flex-col h-full bg-white w-64">
          <div className="mb-8 px-2 py-3 bg-slate-50 rounded-xl border border-slate-100">
            <h2 className="text-[15px] font-bold text-slate-800 leading-tight">Super Admin</h2>
            <p className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider mt-0.5">Inventory Hub</p>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar">
            {activeMenu && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-400">
                <h3 className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-2">{activeMenu.text}</h3>
                <div className="space-y-1">
                  {activeMenu.subItems?.map((sub, idx) => (
                    <div key={idx}>
                      {sub.type === 'dropdown' ? (
                        <>
                          <div onClick={() => toggleSubMenu(sub.text)} className="flex items-center justify-between py-2.5 px-3 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors group">
                            <span className="text-[14px] font-semibold text-slate-700">{sub.text}</span>
                            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${openSubMenus[sub.text] ? 'rotate-180' : ''}`} />
                          </div>
                          {openSubMenus[sub.text] && (
                            <div className="mt-1 space-y-0.5 border-l-2 border-slate-100 ml-4">
                              {sub.children.map((child, cIdx) => (
                                <div key={cIdx} onClick={() => navigate(child.path)} className={`flex items-center gap-3 py-2 px-4 cursor-pointer transition-all duration-200 group rounded-r-lg ${isActivePath(child.path) ? 'bg-blue-50/50' : 'hover:translate-x-1'}`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${isActivePath(child.path) ? 'bg-blue-600 scale-125 shadow-[0_0_8px_rgba(37,99,235,0.4)]' : 'bg-slate-300'}`} />
                                  <span className={`text-[13px] font-medium ${isActivePath(child.path) ? 'text-blue-600' : 'text-slate-600 group-hover:text-slate-900'}`}>{child.text}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <div onClick={() => navigate(sub.path)} className={`flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded-lg transition-all ${isActivePath(sub.path) ? 'bg-blue-50/50' : 'hover:bg-slate-50 hover:translate-x-1'}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${isActivePath(sub.path) ? 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]' : 'bg-slate-300'}`} />
                          <span className={`text-[14px] font-semibold ${isActivePath(sub.path) ? 'text-blue-600' : 'text-slate-700'}`}>{sub.text}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button onClick={() => setIsExpanded(!isExpanded)} className="mt-6 p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center justify-center">
            <Menu size={18} />
          </button>
        </div>
      </div>

      <div className={`flex-1 h-screen overflow-y-auto transition-all duration-300 bg-slate-50 ${isExpanded ? 'lg:ml-80 ml-16' : 'ml-16'}`} style={{ minWidth: 0 }}>
        {/* Page Content */}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Sidebar;