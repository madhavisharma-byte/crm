import React from 'react';
import { Calendar, Download, TrendingUp, Package, Users, BarChart3, IndianRupee } from 'lucide-react';
import Sidebar from '../components/(website)/Sidebar';
import Header from '../components/(website)/header';
import ReportHeader from '../components/ReportHeader';

const SUMMARY_CARDS = [
  {
    title: "Total Revenue",
    value: "₹2,45,680",
    trend: "+18% this month",
    trendColor: "text-green-600",
    icon: <IndianRupee className="text-green-600 w-6 h-6" />,
    bg: "bg-green-100",
  },
  {
    title: "Orders Processed",
    value: "1,247",
    trend: "+12% this month",
    trendColor: "text-blue-600",
    icon: <Package className="text-blue-600 w-6 h-6" />,
    bg: "bg-blue-100",
  },
  {
    title: "Active Customers",
    value: "856",
    trend: "+5% this month",
    trendColor: "text-orange-600",
    icon: <Users className="text-orange-600 w-6 h-6" />,
    bg: "bg-orange-100",
  },
  {
    title: "Avg Order Value",
    value: "₹1,970",
    trend: "+8% this month",
    trendColor: "text-green-600",
    icon: <TrendingUp className="text-green-600 w-6 h-6" />,
    bg: "bg-green-100",
  },
];

// Chart Y-axis and X-axis demo data (will be updated from backend)
const CHART_Y_LABELS = [200000, 150000, 100000, 50000, 0];
const CHART_X_LABELS = [
  "01 Dec", "02 Dec", "03 Dec", "04 Dec", "05 Dec", "06 Dec", "07 Dec"
];

// Top selling products demo data
const TOP_SELLING_PRODUCTS = [
  {
    name: "iPhone 15 Pro Case",
    units: "156 units",
    price: "₹45,230",
  },
  {
    name: "Samsung Galaxy Case",
    units: "89 units",
    price: "₹28,450",
  },
  {
    name: "Premium Wallet",
    units: "67 units",
    price: "₹22,180",
  },
];

const ACTION_BUTTONS = [
  {
    icon: <Calendar size={16} />,
    text: "Last 7 Days",
  },
  {
    icon: <Download size={16} />,
    text: "Export PDF",
  },
];

// ---------------------------
// Reusable components
// ---------------------------
const ActionButton = ({ icon, text }) => (
  <button className="flex items-center gap-2 border px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}>
    {icon}
    {text}
  </button>
);

const ReportCard = ({ title, value, trend, trendColor, icon, bg }) => (
  <div className="p-5 rounded-xl border shadow flex items-center gap-4" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bg}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium" style={{ color: "var(--text)", opacity: 0.6 }}>{title}</p>
      <h3 className="text-2xl font-bold" style={{ color: "var(--text)" }}>{value}</h3>
      <p className={`text-xs font-semibold mt-1 ${trendColor}`}>{trend}</p>
    </div>
  </div>
);

const ProductItem = ({ name, units, price }) => (
  <div className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0" style={{ borderColor: "var(--border)" }}>
    <div>
      <h4 className="text-sm font-semibold" style={{ color: "var(--text)" }}>{name}</h4>
      <p className="text-xs mt-1" style={{ color: "var(--text)", opacity: 0.6 }}>{units}</p>
    </div>
    <span className="text-sm font-bold text-green-600">{price}</span>
  </div>
);

const ReportsPage = () => {
  return (
    <div className="flex min-h-screen w-full font-sans transition-colors duration-300" style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-w-0 md:ml-64">
        <Header />
        <div className="pt-24 px-8 flex-1 overflow-y-auto">
          {/* Title Section with Actions to the right */}
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Report</h1>
              <p className="text-sm mt-1" style={{ color: "var(--text)", opacity: 0.6 }}>
                Manage your account and platform configurations
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-3 md:mt-0">
              {ACTION_BUTTONS.map((btn, idx) => (
                <ActionButton key={btn.text} icon={btn.icon} text={btn.text} />
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {SUMMARY_CARDS.map((card, i) => (
              <ReportCard key={card.title} {...card} />
            ))}
          </div>
          {/* Insert ReportHeader just below the summary cards */}
          <ReportHeader activeTab="Sales Report" />
          {/* Main Chart & Top Selling Products */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Trend Chart */}
            <div className="lg:col-span-2 p-6 rounded-xl border shadow" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="text-blue-500 w-5 h-5" />
                <h3 className="font-bold" style={{ color: "var(--text)" }}>Revenue Trend</h3>
              </div>
              <div className="relative h-64 w-full mt-4">
                {/* Y-Axis Labels */}
                <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs font-medium" style={{ color: "var(--text)", opacity: 0.4 }}>
                  {CHART_Y_LABELS.map((label, i) => (
                    <span key={i}>{label}</span>
                  ))}
                </div>
                {/* Chart Canvas */}
                <div className="ml-12 h-full relative">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pb-6">
                    {[...Array(CHART_Y_LABELS.length)].map((_, i) => (
                      <div key={i} className="w-full h-px border-t border-dashed" style={{ backgroundColor: "var(--border)", borderColor: "var(--border)" }}></div>
                    ))}
                  </div>
                  {/* SVG Chart Path (static demo) */}
                  <svg className="absolute inset-0 h-[calc(100%-24px)] w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,100 C150,90 300,110 450,80 C600,50 750,60 900,20 L900,150 L0,150 Z"
                      fill="url(#blueGradient)"
                    />
                    <rect x="0" y="145" width="100%" height="5" fill="#F59E0B" />
                  </svg>
                  {/* X-Axis Labels */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs font-medium pt-2" style={{ color: "var(--text)", opacity: 0.4 }}>
                    {CHART_X_LABELS.map((label, i) => (
                      <span key={i}>{label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Top Selling Products */}
            <div className="p-6 rounded-xl border shadow flex flex-col" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
              <h3 className="font-bold mb-6" style={{ color: "var(--text)" }}>Top Selling Products</h3>
              <div className="space-y-6 flex-1">
                {TOP_SELLING_PRODUCTS.map((product) => (
                  <ProductItem
                    key={product.name}
                    name={product.name}
                    units={product.units}
                    price={product.price}
                  />
                ))}
              </div>
              {/* Pagination Dot Placeholder */}
              <div className="flex justify-center mt-12">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
