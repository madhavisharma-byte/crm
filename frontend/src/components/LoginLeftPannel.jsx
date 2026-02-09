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
    passwordResetSuccess = false, // <--- Add this prop to control state
} = {}) => {
    // Determine if business hub panel style should be used
    const isBusinessHub = mode === "login" || mode === "register";

    // Content for login/register (from image prompt)
    const businessHub = {
        icon: (
            <div className="bg-white w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center mb-6 md:mb-8 shadow-lg">
                <Box className="w-7 h-7 md:w-9 md:h-9 text-blue-700" strokeWidth={2} />
            </div>
        ),
        heading: (
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight text-white">
                Welcome to Your<br />Business Hub
            </h1>
        ),
        description: (
            <p className="text-blue-100 text-base mb-6 md:mb-10 font-normal leading-relaxed opacity-90 max-w-xs">
                Streamline your operations, manage orders,
                and grow your business with our
                comprehensive platform.
            </p>
        ),
        features: defaultFeatures,
    };

    // For password reset success state
    const resetSuccessConfig = {
        icon: (
            <div className="bg-white w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-6 md:mb-8 shadow-lg">
                <Check className="w-8 h-8 md:w-10 md:h-10 text-green-500" strokeWidth={3} />
            </div>
        ),
        heading: (
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight text-white">
                Your password<br />reset successfully
            </h1>
        ),
        description: (
            <p className="text-blue-100 text-base mb-6 md:mb-10 font-light leading-relaxed opacity-90">
                You can now log in with your new password.
            </p>
        ),
        features: [],
    };

    // Content for forgot password mode
    const forgotConfig = {
        icon: (
            <div className="bg-white w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-6 md:mb-8 shadow-lg">
                <Lock className="w-6 h-6 md:w-8 md:h-8 text-blue-600" strokeWidth={1.5} />
            </div>
        ),
        heading: (
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight text-white">
                {title || "Reset Your Password"}
            </h1>
        ),
        description: (
            <p className="text-blue-100 text-base mb-6 md:mb-10 font-light leading-relaxed opacity-90">
                {description || "Follow the steps to recover access to your account."}
            </p>
        ),
        features: features || [
            "Secure password recovery",
            "Email-based verification",
            "Fast and easy process",
        ],
    };

    let content;
    if (isBusinessHub) {
        content = businessHub;
    } else if (mode === "forgot" && passwordResetSuccess) {
        content = resetSuccessConfig;
    } else {
        content = forgotConfig;
    }

    return (
        <div
            className="min-h-screen flex flex-col justify-center items-start"
            style={{
                width: "100vw",
                maxWidth: "100%",
            }}
        >
            <div
                className={`
                    w-full
                    h-screen
                    lg:w-1/2
                    fixed
                    left-0
                    top-0
                    flex
                    flex-col
                    justify-center
                    items-center
                    bg-gradient-to-br
                    from-blue-600
                    to-blue-800
                    p-8 md:p-12
                    text-white
                    min-h-screen
                `}
                style={{
                    zIndex: 10,
                }}
            >
                <div className="w-full max-w-xs flex flex-col items-start mx-auto">
                    {content.icon}
                    {content.heading}
                    {content.description}
                    <div className="space-y-4">
                        {content.features && content.features.map((f) => (
                            <FeatureItem key={f} text={f} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftPanel;
