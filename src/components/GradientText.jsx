import React from "react";

const GradientText = ({ 
  children, 
  variant = "primary",
  animated = false,
  className = "" 
}) => {
  const getGradientClasses = () => {
    switch (variant) {
      case "rainbow":
        return "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent";
      case "ocean":
        return "bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent";
      case "sunset":
        return "bg-gradient-to-r from-orange-400 via-pink-500 to-red-500 bg-clip-text text-transparent";
      case "forest":
        return "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent";
      case "neon":
        return "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent";
      default:
        return "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent";
    }
  };

  const getAnimationClasses = () => {
    if (!animated) return "";
    return "animate-pulse bg-[length:200%_100%] animate-shimmer";
  };

  return (
    <span 
      className={`
        font-bold
        ${getGradientClasses()}
        ${getAnimationClasses()}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default GradientText; 