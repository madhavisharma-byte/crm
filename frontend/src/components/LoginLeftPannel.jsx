import React from "react";
import { Box, Check } from "lucide-react";

const FeatureItem = ({ text }) => (
    <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <Check size={12} className="text-orange-400" strokeWidth={4} />
        </div>
        <span className="text-sm font-medium">{text}</span>
    </div>
);

const LeftPanel = () => {
    return (
        <div className="w-full lg:w-5/12 bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 text-white flex flex-col justify-center relative min-h-[500px]">

            {/* Logo Box */}
            <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-8 shadow-lg">
                <Box className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
            </div>

            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Welcome to Your<br />Business Hub
            </h1>

            {/* Description */}
            <p className="text-blue-100 text-base mb-10 font-light leading-relaxed opacity-90">
                Streamline your operations, manage orders, and grow your business with our comprehensive platform.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
                <FeatureItem text="Multi-platform order management" />
                <FeatureItem text="Real-time analytics & insights" />
                <FeatureItem text="AI-powered stock suggestions" />
            </div>
        </div>
    );
};

export default LeftPanel;
