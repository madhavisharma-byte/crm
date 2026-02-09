import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Inventory from "./pages/Inventory.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useAuth } from "./state/AuthContext.jsx";
import ReportsPage from "./pages/Reports.jsx";
import SettingsPage from "./pages/Settings.jsx";
import SettingsCompanyPage from "./pages/SettingsCompany.jsx";
import SettingsNotifications from "./pages/SettingsNotification.jsx";
import SettingsShipping from "./pages/SettingsShipping.jsx";
import Profile from "./pages/Profile.jsx";
import TermsAndConditions from "./pages/TermsConditions.jsx";
import ChannelsPage from "./pages/Channels.jsx";
import ChannelReturnMapping from "./pages/ChannelReturnMappin.jsx";
import UsersPage from "./pages/Users.jsx";
import PackagesTypePage from "./pages/PackagesTypePage.jsx";
import DashboardOverview from "./components/Dashboard/Overview.jsx";
import DashboardSales from "./components/Dashboard/Sales.jsx";
import DashboardPurchase from "./components/Dashboard/Purchase.jsx";
import DashboardReturns from "./components/Dashboard/Returns.jsx";
import DashboardInventory from "./components/Dashboard/Inventory.jsx";
import DashboardPayment from "./components/Dashboard/Payment.jsx"
import DashboardReportOrderItems from "./components/Dashboard/Reports/OrderItems"
import DashboardReportInvoice from "./components/Dashboard/Reports/Invoice.jsx"
import DashboardReportOther   from "./components/Dashboard/Reports/OtherReports.jsx";
import SaleOrders from "./components/Order/SalesOrder/Orders.jsx";
import B2BOrdersPage from "./components/Order/SalesOrder/B2BOrder.jsx";
import CustomerPage from "./components/Order/Customers/Customers.jsx";
import CustomerDiscountGroupsPage from "./components/Order/Customers/CustomersDiscount.jsx";
import CustomerDispatchToleranceGroup from './components/Order/Customers/DispatchToleranceGroup.jsx';
import FulfillmentDispatchShipments from "./components/Fulfillment/Dispatch/Shipments.jsx";
import FulfillmentPackGroupPage from "./components/Fulfillment/Dispatch/PackGroup.jsx";
import FulfillmentDispatchGroupPage from "./components/Fulfillment/Dispatch/DispatchGroup.jsx";
import FulfillmentPicklistsPage from "./components/Fulfillment/Dispatch/Picklists.jsx";
import FulfillmentB2BPicklistsPage  from "./components/Fulfillment/Dispatch/B2bPicklists.jsx";
import FulfillmentManifestsPage from "./components/Fulfillment/Dispatch/Manifests.jsx";
import FulfillmentSelfViewPage from "./components/Fulfillment/Staging/ShelfView.jsx";
import PurchaseOrdersPage from "./components/Purchase/PurchaseOrders/PurchaseOrders.jsx";
import PurchaseSearchASNPage from "./components/Purchase/PurchaseOrders/SearchASN.jsx";
import PurchaseCreateRisPage from "./components/Purchase/PurchaseOrders/CreateRIS.jsx"
import AddToCart from "./components/Purchase/ReplenishmentPlanning/AddToCart.jsx";
import PurchaseCartPage from "./components/Purchase/ReplenishmentPlanning/PurchaseCart.jsx";
import BackOrdersPage from "./components/Purchase/ReplenishmentPlanning/BackOrders.jsx";
import ReordersPage from "./components/Purchase/ReplenishmentPlanning/Reorders.jsx";
import PurchaseReorderConfig from "./components/Purchase/ReplenishmentPlanning/ReorderConfig.jsx";
import PurchaseVendors from "./components/Purchase/VendorManagement/Vendors.jsx";
import VendorsCatalog from "./components/Purchase/VendorManagement/VendorCatalog.jsx";
import DashboardFulfillment from "./components/Dashboard/Fulfilment.jsx";
import InboundPutaway from "./components/Inbound/Putaway/Putaway.jsx";
import AwaitingPutaway from "./components/Inbound/Putaway/AwaitingPutaway.jsx";
import GRNsPage from "./components/Inbound/GoodsReceipt/Grns.jsx";
import CreatePoLabelsPage from "./components/Inbound/GoodsReceipt/CreatePoLabels.jsx";
import AwaitingActions from "./components/Returns/RTO/AwaitingActions.jsx";
import Reshipments from "./components/Returns/RTO/Reshipments.jsx";
import ReversePickups from "./components/Returns/CustomerReturns/ReversePickup.jsx";
import BulkReturn from "./components/Returns/CustomerReturns/BulkReturns.jsx";
import ReturnManifests from "./components/Returns/All/Manifest.jsx";
import TaxClasses from "./components/GSTConfigurations/TaxClasses.jsx";
import DiscountGroupItem from "./components/GSTConfigurations/DiscountGroupItem.jsx";
import ListingsPage from "./components/Products/Products/Listings.jsx";
import ProductsPage from "./components/Products/Products/Products.jsx";
import RollupSKUPage from "./components/Products/Products/RollupSku.jsx";
import CategoriesPage from "./components/Products/Products/Categories.jsx";
import KittingPage from "./components/Products/Products/Kit.jsx";
import InventoryPage from "./components/Products/Inventory/Inventory.jsx";
import ChannelInventoryPage from "./components/Products/Inventory/ChannelInventory.jsx";
import InventorySnapshot from "./components/Products/Inventory/InventorySnapshot.jsx";
import InventoryLedger from "./components/Products/Inventory/InventoryLedger.jsx";
import GatepassPage from "./components/Materials/Gatepass.jsx";
import SearchProduct from "./components/Materials/SearchProduct.jsx";



// Helper to read the correct user from localStorage, returns null if not set or corrupted
function getUserFromLocalStorage() {
  try {
    // Use the app's namespaced user object, but fallback to "user" if you want
    const userRaw = localStorage.getItem("user") || localStorage.getItem("user");
    if (!userRaw) return null;
    return JSON.parse(userRaw);
  } catch (err) {
    return null;
  }
}

// PrivateRoute Component
const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  // Fallback: If context somehow doesn't have a user, try localStorage before redirecting
  const effectiveUser = user ?? getUserFromLocalStorage();

  if (loading) return <div>Loading...</div>;

  if (!effectiveUser) return <Navigate to="/login" replace />;
  if (role && effectiveUser.role !== role) return <Navigate to="/login" replace />;

  return children;
};

const App = () => {
  return (
    <div className="app-shell">
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/terms-conditions"
            element={
              <PrivateRoute>
                <TermsAndConditions />
              </PrivateRoute>
            }
          />

       
          <Route path="/dashboard/overview" element={<PrivateRoute><DashboardOverview /></PrivateRoute>} />
          <Route path="/dashboard/sales" element={<PrivateRoute><DashboardSales /></PrivateRoute>} />
          <Route path="/dashboard/fulfilment" element={<PrivateRoute><DashboardFulfillment /></PrivateRoute>} />
          <Route path="/dashboard/purchase" element={<PrivateRoute><DashboardPurchase /></PrivateRoute>} />
         
          <Route path="/dashboard/returns" element={<PrivateRoute><DashboardReturns /></PrivateRoute>} />
          <Route path="/dashboard/inventory" element={<PrivateRoute><DashboardInventory /></PrivateRoute>} />
          <Route path="/dashboard/payment" element={<PrivateRoute><DashboardPayment /></PrivateRoute>} />
          <Route path="/dashboard/reports/order-items" element={<PrivateRoute><DashboardReportOrderItems /></PrivateRoute>} />
          <Route path="/dashboard/reports/invoice" element={<PrivateRoute><DashboardReportInvoice /></PrivateRoute>} />
          <Route path="/dashboard/reports/other" element={<PrivateRoute><DashboardReportOther /></PrivateRoute>} />
         
          <Route path="/sales-order" element={<PrivateRoute><SaleOrders /></PrivateRoute>} />
          <Route path="/b2b-order" element={<PrivateRoute><B2BOrdersPage /></PrivateRoute>} />
          <Route path="/orders/customers" element={<PrivateRoute><CustomerPage /></PrivateRoute>} />
          <Route path="/orders/customers/discount-group" element={<PrivateRoute><CustomerDiscountGroupsPage /></PrivateRoute>} />
          <Route path="/orders/customers/tolerance-groups" element={<PrivateRoute><CustomerDispatchToleranceGroup /></PrivateRoute>} />

          <Route path="/fulfillment/dispatch/shipments" element={<PrivateRoute><FulfillmentDispatchShipments /></PrivateRoute>} />
          <Route path="/fulfillment/dispatch/pack-group" element={<PrivateRoute><FulfillmentPackGroupPage /></PrivateRoute>} />
          <Route path="/fulfillment/dispatch/dispatch-group" element={<PrivateRoute><FulfillmentDispatchGroupPage /></PrivateRoute>} />
          <Route path="/fulfillment/dispatch/picklists" element={<PrivateRoute><FulfillmentPicklistsPage /></PrivateRoute>} />
          <Route path="/fulfillment/dispatch/b2b-picklists" element={<PrivateRoute><FulfillmentB2BPicklistsPage /></PrivateRoute>} />
          <Route path="/fulfillment/dispatch/manifests" element={<PrivateRoute><FulfillmentManifestsPage /></PrivateRoute>} />
          <Route path="/fulfillment/staging/shelf-view" element={<PrivateRoute><FulfillmentSelfViewPage /></PrivateRoute>} />

          <Route path="/purchase-orders" element={<PrivateRoute><PurchaseOrdersPage /></PrivateRoute>} />
          <Route path="/purchase/search-asn" element={<PrivateRoute><PurchaseSearchASNPage /></PrivateRoute>} />
          <Route path="/purchase/create-ris" element={<PrivateRoute><PurchaseCreateRisPage /></PrivateRoute>} />
          <Route path="/purchase/add-to-cart" element={<PrivateRoute><AddToCart /></PrivateRoute>} />
          <Route path="/purchase/cart" element={<PrivateRoute><PurchaseCartPage /></PrivateRoute>} />
          <Route path="/purchase/back-orders" element={<PrivateRoute><BackOrdersPage /></PrivateRoute>} />
          <Route path="/purchase/reorders" element={<PrivateRoute><ReordersPage /></PrivateRoute>} />
          <Route path="/purchase/reorder-config" element={<PrivateRoute><PurchaseReorderConfig /></PrivateRoute>} />
          <Route path="/purchase/vendors" element={<PrivateRoute><PurchaseVendors /></PrivateRoute>} />
          <Route path="/purchase/vendor-catalog" element={<PrivateRoute><VendorsCatalog /></PrivateRoute>} />

          <Route path="/inbound/putaway" element={<PrivateRoute><InboundPutaway /></PrivateRoute>} />
          <Route path="/inbound/awaiting" element={<PrivateRoute><AwaitingPutaway /></PrivateRoute>} />
          <Route path="/inbound/grns" element={<PrivateRoute><GRNsPage /></PrivateRoute>} />
          <Route path="/inbound/labels" element={<PrivateRoute><CreatePoLabelsPage /></PrivateRoute>} />
          
          
          <Route path="/returns/rto/awaiting" element={<PrivateRoute><AwaitingActions /></PrivateRoute>} />
          <Route path="/returns/rto/reship" element={<PrivateRoute><Reshipments /></PrivateRoute>} />
          <Route path="/returns/customer/pickups" element={<PrivateRoute><ReversePickups /></PrivateRoute>} />
          <Route path="/returns/customer/bulk" element={<PrivateRoute><BulkReturn /></PrivateRoute>} />
          <Route path="/returns/manifest" element={<PrivateRoute><ReturnManifests /></PrivateRoute>} />



          <Route path="/gst/tax-classes" element={<PrivateRoute><TaxClasses /></PrivateRoute>} />
          <Route path="/gst/discount-groups" element={<PrivateRoute><DiscountGroupItem /></PrivateRoute>} />

          <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
          <Route path="/products/listings" element={<PrivateRoute><ListingsPage /></PrivateRoute>} />
          <Route path="/products/rollup" element={<PrivateRoute><RollupSKUPage /></PrivateRoute>} />
          <Route path="/products/categories" element={<PrivateRoute><CategoriesPage /></PrivateRoute>} />
          <Route path="/products/kit" element={<PrivateRoute><KittingPage /></PrivateRoute>} />
          <Route path="/products/inventory" element={<PrivateRoute><InventoryPage /></PrivateRoute>} />
          <Route path="/products/inventory/channel" element={<PrivateRoute><ChannelInventoryPage /></PrivateRoute>} />
          <Route path="/products/inventory/snapshot" element={<PrivateRoute><InventorySnapshot /></PrivateRoute>} />
          <Route path="/products/inventory/ledger" element={<PrivateRoute><InventoryLedger /></PrivateRoute>} />


          <Route path="materials/gatepass" element={<PrivateRoute><GatepassPage /></PrivateRoute>} />
          <Route path="materials/search" element={<PrivateRoute><SearchProduct /></PrivateRoute>} />
          
         
          
          <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />
          

          <Route path="/reports" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
          <Route path="/reports/sales" element={<PrivateRoute><ReportsPage activeTab="Sales Report" /></PrivateRoute>} />
          <Route path="/reports/inventory" element={<PrivateRoute><ReportsPage activeTab="Inventory Report" /></PrivateRoute>} />
          <Route path="/reports/shipping" element={<PrivateRoute><ReportsPage activeTab="Shipping Analytics" /></PrivateRoute>} />
          <Route path="/reports/platform" element={<PrivateRoute><ReportsPage activeTab="Platform Performance" /></PrivateRoute>} />

          <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
          <Route path="/settings/company" element={<PrivateRoute><SettingsCompanyPage /></PrivateRoute>} />
          <Route path="/settings/notifications" element={<PrivateRoute><SettingsNotifications /></PrivateRoute>} />
          <Route path="/settings/shipping" element={<PrivateRoute><SettingsShipping /></PrivateRoute>} />

          <Route path="/settings/channels" element={<PrivateRoute><ChannelsPage /></PrivateRoute>} />
          <Route path="/settings/channelsReturn" element={<PrivateRoute><ChannelReturnMapping /></PrivateRoute>} />
          <Route path="/settings/users" element={<PrivateRoute><UsersPage /></PrivateRoute>} />
          <Route path="/settings/layout/packagesTypes" element={<PrivateRoute><PackagesTypePage /></PrivateRoute>} />


          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;