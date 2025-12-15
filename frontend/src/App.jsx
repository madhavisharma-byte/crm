import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Inventory from "./pages/Inventory.jsx";
import Orders from "./pages/Orders.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useAuth } from "./state/AuthContext.jsx";
import ReportsPage from "./pages/Reports.jsx";
import SettingsPage from "./pages/Settings.jsx";
import SettingsUserPage from "./pages/SettingsUser.jsx";
import SettingsCompanyPage from "./pages/SettingsCompany.jsx";
import SettingsNotifications from "./pages/SettingsNotification.jsx";
import SettingsShipping from "./pages/SettingsShipping.jsx";
import AddOrderPage from "./pages/AddOrder.jsx";

// Ensure Dashboard is also available at "/dashboard"
const PrivateRoute = ({ children, role }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (role && user.role !== role) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <div className="app-shell">
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/inventory" element={<PrivateRoute><Inventory /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
          <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
          <Route path="/settings/users" element={<PrivateRoute><SettingsUserPage /></PrivateRoute>} />
          <Route path="/settings/company" element={<PrivateRoute><SettingsCompanyPage /></PrivateRoute>} />
          <Route path="/settings/notifications" element={<PrivateRoute><SettingsNotifications /></PrivateRoute>} />
          <Route path="/settings/shipping" element={<PrivateRoute><SettingsShipping /></PrivateRoute>} />
          <Route
            path="/reports/sales"
            element={<ReportsPage activeTab="Sales Report" />}
          />
          <Route
            path="/reports/inventory"
            element={<ReportsPage activeTab="Inventory Report" />}
          />
          <Route
            path="/reports/shipping"
            element={<ReportsPage activeTab="Shipping Analytics" />}
          />
          <Route
            path="/reports/platform"
            element={<ReportsPage activeTab="Platform Performance" />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
