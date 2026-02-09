import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, ShoppingCart, Wallet,
  ArrowDownToLine, RotateCcw, Box, Hammer,
  Settings, Menu, ChevronDown, ChevronUp, Package, Receipt, Boxes
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSubMenus, setOpenSubMenus] = useState({
    'Sale Orders': true,
    'Customers': true,
    'Reports': false,
    'Dispatch': true,
    'Staging': true,
    'Purchase Orders': true,
    'Replenishment Planning': true,
    'Vendor Management': true,
    'Putaway': true,
    'Goods Receipt': true,
    'RTO': true,
    'Customer Returns': true,
    'Configurations': true,
    'Catalog': true,
    'Inventory': true,
    'Transfers': true,
    'Channels': true,
    'Management': true
  });

  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const MENU_DATA = [
    {
      id: 'dashboard',
      text: 'Dashboard',
      icon: <LayoutDashboard size={22} />,
      subItems: [
        { text: 'Overview', path: '/dashboard/overview' },
        { text: 'Sales', path: '/dashboard/sales' },
        { text: 'Fulfilment', path: '/dashboard/fulfilment' },
        { text: 'Purchases', path: '/dashboard/purchase' },
        { text: 'Returns', path: '/dashboard/returns' },
        { text: 'Inventory', path: '/dashboard/inventory' },
        { text: 'Payment', path: '/dashboard/payment' },
        {
          text: 'Reports',
          type: 'dropdown',
          children: [
            { text: 'Order Items', path: '/dashboard/reports/order-items' },
            { text: 'Invoice', path: '/dashboard/reports/invoice' },
            { text: 'Other Reports', path: '/dashboard/reports/other' }
          ]
        }
      ]
    },
    {
      id: 'orders',
      text: 'Order',
      icon: <ShoppingCart size={22} />,
      subItems: [
        {
          text: 'Sale Orders',
          type: 'dropdown',
          children: [
            { text: 'Orders', path: '/sales-order' },
            { text: 'B2B Orders', path: '/b2b-order' }
          ]
        },
        {
          text: 'Customers',
          type: 'dropdown',
          children: [
            { text: 'Customers', path: '/orders/customers' },
            { text: 'Customer Discount Groups', path: '/orders/customers/discount-group' },
            { text: 'Dispatch Tolerance Groups', path: '/orders/customers/tolerance-groups' }
          ]
        }
      ]
    },
    {
      id: 'fulfillment',
      text: 'Fulfillment',
      icon: <Package size={22} />,
      subItems: [
        {
          text: 'Dispatch',
          type: 'dropdown',
          children: [
            { text: 'Shipments', path: '/fulfillment/dispatch/shipments' },
            { text: 'Pack Group', path: '/fulfillment/dispatch/pack-group' },
            { text: 'Dispatch Group', path: '/fulfillment/dispatch/dispatch-group' },
            { text: 'Picklists', path: '/fulfillment/dispatch/picklists' },
            { text: 'B2B Picklists', path: '/fulfillment/dispatch/b2b-picklists' },
            { text: 'Manifests', path: '/fulfillment/dispatch/manifests' }
          ]
        },
        {
          text: 'Staging',
          type: 'dropdown',
          children: [
            { text: 'Shelf View', path: '/fulfillment/staging/shelf-view' }
          ]
        }
      ]
    },
    {
      id: 'purchase',
      text: 'Purchase',
      icon: <Wallet size={22} />,
      subItems: [
        {
          text: 'Purchase Orders',
          type: 'dropdown',
          children: [
            { text: 'Purchase Orders', path: '/purchase-orders' },
            { text: 'Search ASN', path: '/purchase/search-asn' },
            { text: 'Create RIS', path: '/purchase/create-ris' },
          ]
        },
        {
          text: 'Replenishment Planning',
          type: 'dropdown',
          children: [
            { text: 'Add to Cart', path: '/purchase/add-to-cart' },
            { text: 'Purchase Cart', path: '/purchase/cart' },
            { text: 'Back Orders', path: '/purchase/back-orders' },
            { text: 'Reorders', path: '/purchase/reorders' },
            { text: 'Reorder Config', path: '/purchase/reorder-config' }
          ]
        },
        {
          text: 'Vendor Management',
          type: 'dropdown',
          children: [
            { text: 'Vendors', path: '/purchase/vendors' },
            { text: 'Vendor Catalog', path: '/purchase/vendor-catalog' },
          ]
        }
      ]
    },
    {
      id: 'inbound',
      text: 'Inbound',
      icon: <ArrowDownToLine size={22} />,
      subItems: [
        {
          text: 'Putaway',
          type: 'dropdown',
          children: [
            { text: 'Putaway', path: '/inbound/putaway' },
            { text: 'Awaiting Putaway', path: '/inbound/awaiting' },
          ]
        },
        {
          text: 'Goods Receipt',
          type: 'dropdown',
          children: [
            { text: 'GRNs', path: '/inbound/grns' },
            { text: 'Create PO Labels', path: '/inbound/labels' },
          ]
        }
      ]
    },
    {
      id: 'returns',
      text: 'Returns',
      icon: <RotateCcw size={22} />,
      subItems: [
        {
          text: 'RTO',
          type: 'dropdown',
          children: [
            { text: 'Awaiting Actions', path: '/returns/rto/awaiting' },
            { text: 'Re-Shipments', path: '/returns/rto/reship' },
          ]
        },
        {
          text: 'Customer Returns',
          type: 'dropdown',
          children: [
            { text: 'Reverse PickUps', path: '/returns/customer/pickups' },
            { text: 'Bulk Return', path: '/returns/customer/bulk' },
          ]
        }, {
          text: 'All',
          type: 'dropdown',
          children: [
            { text: 'Manifest', path: '/returns/manifest' },
          ]
        }
      ]
    },
    {
      id: 'gstconfiguration',
      text: 'GST Configurations',
      icon: <Receipt size={22} />,
      subItems: [
        {
          text: 'Configurations',
          type: 'dropdown',
          children: [
            { text: 'Tax Classes', path: '/gst/tax-classes' },
            { text: 'Discount Group Item', path: '/gst/discount-groups' },
          ]
        },
      ]
    },
    {
      id: 'products',
      text: 'Products',
      icon: <Boxes size={22} />,
      subItems: [
        {
          text: 'Products',
          type: 'dropdown',
          children: [
            { text: 'Listings', path: '/products/listings' },
            { text: 'Products', path: '/products' },
            { text: 'RollupSKU', path: '/products/rollup' },
            { text: 'Categories', path: '/products/categories' },
            { text: 'Kit', path: '/products/kit' },
          ]
        },
        {
          text: 'Inventory',
          type: 'dropdown',
          children: [
            { text: 'Inventory', path: '/products/inventory' },
            { text: 'Channel Inventory', path: '/products/inventory/channel' },
            { text: 'Snapshot', path: '/products/inventory/snapshot' },
            { text: 'Inventory Ledger', path: '/products/inventory/ledger' },
          ]
        }
      ]
    },
    {
      id: 'materialstools',
      text: 'Materials & Tools',
      icon: <Hammer size={22} />,
      subItems: [
        {
          text: 'Transfers',
          type: 'dropdown',
          children: [
            { text: 'Gatepass', path: '/materials/gatepass' },
          ]
        },
        {
          text: 'Search',
          type: 'dropdown',
          children: [
            { text: 'Search Product', path: '/materials/search' },
          ]
        }
      ]
    },
    {
      id: 'settings',
      text: 'Settings',
      icon: <Settings size={22} />,
      subItems: [
        {
          text: 'Channels',
          type: 'dropdown',
          children: [
            { text: 'Channels', path: '/settings/channels' },
            { text: 'Mapping', path: '/settings/mapping' },
          ]
        },
        {
          text: 'Management',
          type: 'dropdown',
          children: [
            { text: 'Users', path: '/settings/users' },
            { text: 'Layouts', path: '/settings/layouts' },
            { text: 'Shipping Provider', path: '/settings/shipping' },
            { text: 'Others', path: '/settings/others' },
          ]
        }
      ]
    }
  ];

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
  }, [location.pathname]);

  const activeMenu = MENU_DATA.find((m) => m.id === activeItem);

  const toggleSubMenu = (text) => {
    setOpenSubMenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  const handleMainItemClick = (item) => {
    setActiveItem(item.id);
    if (!isExpanded) setIsExpanded(true);
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    // Set outermost container to "relative" so fixed sidebar works correctly and inner content can scroll
    <div className="font-sans antialiased select-none flex h-screen">
      {/* Sidebar wrapper - fixed for lg and above */}
      <div className="relative flex">
        {/* 1. ICON RAIL - fixed for lg+ */}
        <div
          className={`
            w-16 flex-shrink-0 bg-[#2b6cee] flex flex-col items-center py-6 space-y-8 z-50 shadow-xl
            lg:fixed lg:top-0 lg:left-0 lg:h-screen
          `}
          style={{ zIndex: 50 }}
        >
          <div className="bg-white p-2 rounded-xl shadow-lg">
            <Box className="text-[#2b6cee]" size={24} />
          </div>
          <div className="flex flex-col space-y-6 w-full items-center">
            {MENU_DATA.map((item) => (
              <div
                key={item.id}
                onClick={() => handleMainItemClick(item)}
                className={`relative cursor-pointer p-2.5 rounded-xl transition-all duration-300 group ${activeItem === item.id ? "bg-white/20 text-white" : "text-blue-100 hover:bg-white/10"}`}
              >
                {item.icon}
                {activeItem === item.id && (
                  <div className={`absolute -right-[10px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[8px] border-y-transparent border-r-[10px] border-r-[#eef4ff]`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. EXPANDED PANEL - fixed for lg+ */}
        <div
          className={`
            bg-[#eef4ff] transition-all duration-300 border-r border-blue-100 flex flex-col h-full
            ${isExpanded ? 'w-64' : 'w-0 overflow-hidden'}
            lg:fixed lg:left-16 lg:top-0 lg:h-screen
          `}
          style={{ zIndex: 40 }}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="mb-6 px-1">
              <h2 className="text-[17px] font-bold text-slate-700 leading-tight">Super Admin</h2>
              <p className="text-xs text-slate-400 font-medium">Inventory Hub</p>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              {activeMenu && (
                <div className="animate-in fade-in slide-in-from-left-2 duration-300">
                  <h3 className="text-[15px] font-semibold text-[#303e67] mb-6 px-1">
                    {activeMenu.text}
                  </h3>

                  <div className="space-y-2">
                    {activeMenu.subItems?.map((sub, idx) => (
                      <div key={idx} className="mt-1">
                        {sub.type === 'dropdown' ? (
                          <>
                            <div
                              onClick={() => toggleSubMenu(sub.text)}
                              className="flex items-center justify-between py-2 px-1 cursor-pointer group select-none"
                            >
                              <span className="text-[14px] font-medium text-slate-600 group-hover:text-blue-600">
                                {sub.text}
                              </span>
                              {openSubMenus[sub.text] ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                            </div>
                            {openSubMenus[sub.text] && (
                              <div className="ml-1 mt-1 space-y-1">
                                {sub.children.map((child, cIdx) => {
                                  const isActive = isActivePath(child.path);
                                  return (
                                    <div
                                      key={cIdx}
                                      onClick={() => child.path && navigate(child.path)}
                                      className="flex items-center gap-4 py-2 px-3 cursor-pointer group"
                                    >
                                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]' : 'bg-slate-400'}`} />
                                      <span className={`text-[14px] font-medium ${isActive ? 'text-blue-600' : 'text-slate-600 group-hover:text-blue-500'}`}>
                                        {child.text}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        ) : (
                          <div
                            onClick={() => sub.path && navigate(sub.path)}
                            className="flex items-center gap-4 py-2 px-3 cursor-pointer group"
                          >
                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActivePath(sub.path) ? 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]' : 'bg-slate-400'}`} />
                            <span className={`text-[14px] font-medium ${isActivePath(sub.path) ? 'text-blue-600' : 'text-slate-600 group-hover:text-blue-500'}`}>
                              {sub.text}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-auto p-2 bg-white rounded-lg border border-blue-50 text-slate-400 hover:text-blue-600 hover:shadow-md transition-all self-end"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Right side content area: margin-left for both sidebars, scrollable */}
      <div
        className={`
          flex-1 bg-white h-screen overflow-y-auto
          ${isExpanded
            ? 'lg:ml-80'   // 16 (icon rail) + 64 (expanded panel) = 80
            : 'lg:ml-16'   // 16 (icon rail only)
          }
          ml-0  // fallback for small screens
          transition-all duration-300
        `}
        style={{
          minWidth: 0,
        }}
      >
        {/* 
          If you want to use React Router Outlet or children, replace below:
          e.g. <Outlet /> or {props.children}
        */}
      </div>
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Sidebar;