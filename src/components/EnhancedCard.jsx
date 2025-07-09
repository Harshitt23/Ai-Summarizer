import React from "react";

const EnhancedCard = ({ 
  children, 
  className = "", 
  variant = "default",
  hover = true,
  glow = false,
  gradient = false 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "glass":
        return "bg-white/10 backdrop-blur-md border border-white/20 shadow-xl";
      case "neon":
        return "bg-gray-900/90 backdrop-blur-md border border-cyan-400/30 shadow-2xl shadow-cyan-400/20";
      case "gradient":
        return "bg-gradient-to-br from-blue-50/90 to-purple-50/90 backdrop-blur-md border border-blue-200/50 shadow-xl";
      case "dark":
        return "bg-gray-800/95 backdrop-blur-md border border-gray-700/50 shadow-xl";
      default:
        return "bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-xl";
    }
  };

  const getHoverClasses = () => {
    if (!hover) return "";
    return "hover:shadow-2xl hover:scale-[1.02] transition-all duration-300";
  };

  const getGlowClasses = () => {
    if (!glow) return "";
    return "hover:shadow-2xl hover:shadow-blue-400/20 transition-all duration-300";
  };

  return (
    <div 
      className={`
        rounded-2xl p-6 
        ${getVariantClasses()}
        ${getHoverClasses()}
        ${getGlowClasses()}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default EnhancedCard; 