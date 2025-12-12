import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
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
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />
          <Route
            path="/inventory"
            element={
                <Inventory />
            }
          />
          <Route
            path="/orders"
            element={
                <Orders />

            }
          />
          <Route
            path="/reports"
            element={
              <ReportsPage />
            }
          />
          <Route
            path="/settings"
            element={
              <SettingsPage />
            }
          />
          <Route
            path="/settings/users"
            element={
              <SettingsUserPage />
            }
          />
          <Route
            path="/settings/company"
            element={
              <SettingsCompanyPage />
            }
          />
          <Route
            path="/settings/notifications"
            element={
              <SettingsNotifications />
            }
          />
          <Route
            path="/settings/shipping"
            element={
              <SettingsShipping />
            }
          />
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
