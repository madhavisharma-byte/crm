import React from "react";
import { Link } from "react-router-dom";
import { Box } from "lucide-react";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-6 transition-colors duration-300" style={{ backgroundColor: "var(--bg)" }}>
    <div className="rounded-2xl shadow-lg px-8 py-12 flex flex-col items-center border-t-8 border-blue-600 max-w-md w-full" style={{ backgroundColor: "var(--card)" }}>
      <div className="flex items-center mb-6">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Box className="text-white w-8 h-8" />
        </div>
        <span className="ml-3 text-xl font-bold tracking-tight" style={{ color: "var(--text)" }}>Inventory Hub</span>
      </div>
      <h1 className="text-7xl font-extrabold text-blue-600 mb-2">404</h1>
      <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>Page Not Found</h2>
      <p className="text-center mb-6" style={{ color: "var(--text)", opacity: 0.6 }}>
        Sorry, the page you are looking for doesn&apos;t exist.<br />
        Please check the URL or go back to the home page.
      </p>
      <Link
        to="/dashboard/overview"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium text-base shadow hover:bg-blue-700 transition-colors"
      >
        Go to Dashboard
      </Link>
    </div>
    <p className="mt-10 text-sm" style={{ color: "var(--text)", opacity: 0.4 }}>© {new Date().getFullYear()} Inventory Hub</p>
  </div>
);

export default NotFound;
