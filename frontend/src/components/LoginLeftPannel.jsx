import React from "react";
import { Box, Check, Lock } from "lucide-react";

// Feature list for login and register modes
const defaultFeatures = [
    "Multi-platform order management",
    "Real-time analytics & insights",
    "AI-powered stock suggestions",
];

const FeatureItem = ({ text }) => (
    <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <Check size={14} className="text-blue-600" strokeWidth={3} />
        </div>
        <span className="text-sm font-medium text-blue-50">{text}</span>
    </div>
);

const LeftPanel = ({
    mode = "login",
    title,
    description,
    features,
} = {}) => {
    // Determine if business hub panel style should be used
    const isBusinessHub = mode === "login" || mode === "register";
    // Content for login/register (from image prompt)
    const businessHub = {
        icon: (
            <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mb-8 shadow-lg">
                <Box className="w-9 h-9 text-blue-700" strokeWidth={2} />
            </div>
        ),
        heading: (
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-white">
                Welcome to Your<br/>Business Hub
            </h1>
        ),
        description: (
            <p className="text-blue-100 text-base mb-10 font-normal leading-relaxed opacity-90 max-w-xs">
                Streamline your operations, manage orders,
                and grow your business with our
                comprehensive platform.
            </p>
        ),
        features: defaultFeatures,
    };

    // Content for forgot password mode
    const forgotConfig = {
        icon: (
            <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-8 shadow-lg">
                <Lock className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
            </div>
        ),
        heading: (
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-white">
                {title || "Reset Your Password"}
            </h1>
        ),
        description: (
            <p className="text-blue-100 text-base mb-10 font-light leading-relaxed opacity-90">
                {description || "Follow the steps to recover access to your account."}
            </p>
        ),
        features: features || [
            "Secure password recovery",
            "Email-based verification",
            "Fast and easy process",
        ],
    };

    const content = isBusinessHub ? businessHub : forgotConfig;

    return (
        <div className="w-full lg:w-5/12 bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 text-white flex flex-col justify-center relative min-h-[500px]">
            {content.icon}
            {content.heading}
            {content.description}
            <div className="space-y-4">
                {content.features.map((f) => (
                    <FeatureItem key={f} text={f} />
                ))}
            </div>
        </div>
    );
};

export default LeftPanel;
