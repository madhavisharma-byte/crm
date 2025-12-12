import React from 'react';
import {
  ShoppingCart, Truck, AlertTriangle, TrendingUp,
  Box, Wifi, WifiOff, CheckCircle2, Package, AlertCircle, Lightbulb
} from 'lucide-react';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/header';

// All dashboard details (simulate data from backend)
const profile = {
  name: "User Name",
  role: "Store Admin",
  img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};

const lastUpdated = "6:39:20 AM";

const statCardsData = [
  {
    title: "Orders Today",
    value: "24",
    trend: "+12% from yesterday",
    icon: <ShoppingCart className="w-6 h-6 text-white" />
  },
  {
    title: "Pending Shipments",
    value: "18",
    trend: "+3 from yesterday",
    icon: <Truck className="w-6 h-6 text-white" />
  },
  {
    title: "Low Stock Items",
    value: "5",
    trend: "2 critical levels",
    icon: <AlertTriangle className="w-6 h-6 text-white" />
  },
  {
    title: "Today's Revenue",
    value: "₹73,680",
    trend: "+18% from yesterday",
    icon: <TrendingUp className="w-6 h-6 text-white" />
  }
];

const pipelineData = [
  { number: "1", label: "Received", count: "24" },
  { number: "2", label: "Processing", count: "18" },
  { number: "3", label: "Shipped", count: "12" },
  { number: "4", label: "Delivered", count: "156" }
];

const totalOrders = 210; // Optional: can be derived from pipelineData

const platformHealthData = [
  {
    platform: "Amazon",
    stats: "156 orders • ₹45,230",
    status: "connected",
    icon: <Wifi className="w-4 h-4 text-green-600" />
  },
  {
    platform: "Flipkart",
    stats: "89 orders • ₹28,450",
    status: "connected",
    icon: <Wifi className="w-4 h-4 text-green-600" />
  },
  {
    platform: "Myntra",
    stats: "0 orders • ₹0",
    status: "disconnected",
    icon: <WifiOff className="w-4 h-4 text-red-500" />
  }
];

const activityData = [
  {
    icon: <Box className="w-4 h-4 text-blue-600" />,
    title: "New order #1234 from Amazon",
    time: "2 minutes ago"
  },
  {
    icon: <Truck className="w-4 h-4 text-green-600" />,
    title: "Order #1230 shipped via BlueDart",
    time: "15 minutes ago"
  },
  {
    icon: <AlertTriangle className="w-4 h-4 text-orange-500" />,
    title: "Low stock alert: iPhone Cases",
    time: "1 hour ago"
  },
  {
    icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
    title: "Order #1229 delivered successfully",
    time: "2 hours ago"
  }
];

const suggestionsData = [
  {
    icon: <Package className="text-blue-500 w-5 h-5" />,
    title: "Restock iPhone Cases",
    tag: "high",
    desc: "Based on recent sales trends, consider restocking in 3-5 days",
    btnText: "View Details"
  },
  {
    icon: <TrendingUp className="text-blue-500 w-5 h-5" />,
    title: "Price Optimization",
    tag: "medium",
    desc: "Increase Samsung Phone Cases price by 8% for better margins",
    btnText: "Apply"
  },
  {
    icon: <AlertCircle className="text-blue-500 w-5 h-5" />,
    title: "Slow Moving Items",
    tag: "low",
    desc: "5 products haven't sold in 30+ days. Consider promotion",
    btnText: "Review"
  }
];

// Optimized Dashboard Component
const Dashboard = () => {
  return (
    <div className="flex h-screen w-full bg-[#F3F4F6] font-sans text-gray-800 overflow-hidden">
      <Sidebar />
      <div className="flex-1 md:ml-64 h-full overflow-y-auto p-8">
        {/* Header */}
        <Header profile={profile} />
        {/* header height compensation for fixed header */}
        <div className="h-[96px]" />

        {/* Dashboard Title & Last Updated */}
        <div className="mb-6 flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>
          <p className="text-xs text-gray-400">Last updated: {lastUpdated}</p>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCardsData.map((stat, i) =>
            <StatCard key={stat.title} {...stat} />
          )}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Order Pipeline */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 mb-6">Order Pipeline</h3>
              <div className="space-y-5">
                {pipelineData.map((item) =>
                  <PipelineItem key={item.label} {...item} />
                )}
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>Progress Flow</span>
                <span>{totalOrders} Total Orders</span>
              </div>
              {/* The proportional width here is static; in a real app calculate from data */}
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex">
                <div className="h-full w-[15%] bg-blue-500"></div>
                <div className="h-full w-[20%] bg-blue-400"></div>
                <div className="h-full w-[25%] bg-yellow-400"></div>
                <div className="h-full w-[40%] bg-green-500"></div>
              </div>
            </div>
          </div>
          {/* Platform Health */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-6">Platform Health</h3>
            <div className="space-y-4">
              {platformHealthData.map((item) =>
                <HealthItem key={item.platform} {...item} />
              )}
            </div>
          </div>
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-6">Recent Activity</h3>
            <div className="space-y-6 relative pl-2">
              <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-gray-100"></div>
              {activityData.map((item, i) =>
                <ActivityItem key={item.title + i} {...item} />
              )}
            </div>
          </div>
        </div>

        {/* AI Stock Suggestions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="text-blue-600 w-5 h-5" />
            <h3 className="font-semibold text-gray-800">AI Stock Suggestions</h3>
          </div>
          <div className="space-y-4">
            {suggestionsData.map((item, i) =>
              <SuggestionItem key={item.title + i} {...item} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------- Reusable Components ------------------------- */

const StatCard = ({ title, value, trend, icon }) => (
  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl text-white shadow-lg shadow-blue-100 relative overflow-hidden group hover:shadow-blue-200 transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-blue-100 font-medium text-sm">{title}</h3>
      <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-colors">
        {icon}
      </div>
    </div>
    <div className="mb-1">
      <span className="text-3xl font-bold">{value}</span>
    </div>
    <p className="text-xs text-blue-100 opacity-80">{trend}</p>
  </div>
);

const PipelineItem = ({ number, label, count }) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 group-hover:border-blue-200 group-hover:text-blue-600 transition-colors">
        {number}
      </div>
      <span className="text-sm text-gray-600 font-medium">{label}</span>
    </div>
    <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-md min-w-[30px] text-center">
      {count}
    </span>
  </div>
);

const HealthItem = ({ platform, stats, status, icon }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <h4 className="font-semibold text-sm text-gray-800">{platform}</h4>
        <p className="text-xs text-gray-500">{stats}</p>
      </div>
    </div>
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${status === 'connected' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
      {status}
    </span>
  </div>
);

const ActivityItem = ({ icon, title, time }) => (
  <div className="flex gap-4 items-start relative z-10">
    <div className="bg-gray-50 p-2 rounded-full border border-gray-100 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-medium text-gray-800 leading-tight hover:text-blue-600 cursor-pointer transition-colors">
        {title}
      </h4>
      <p className="text-xs text-gray-400 mt-1.5">{time}</p>
    </div>
  </div>
);

const SuggestionItem = ({ icon, title, tag, desc, btnText }) => {
  const tagColor =
    tag === 'high' ? 'bg-blue-700' :
      tag === 'medium' ? 'bg-blue-600' : 'bg-blue-400';

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all">
      <div className="flex items-start gap-4 mb-4 md:mb-0">
        <div className="bg-blue-100 p-2.5 rounded-lg flex-shrink-0">
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-800 text-sm">{title}</h4>
            <span className={`${tagColor} text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wide`}>
              {tag}
            </span>
          </div>
          <p className="text-xs text-gray-500 max-w-lg leading-relaxed">{desc}</p>
        </div>
      </div>
      <button className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors">
        {btnText}
      </button>
    </div>
  );
};

export default Dashboard;