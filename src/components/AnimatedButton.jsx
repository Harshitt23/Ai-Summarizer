import React, { useState } from "react";
import "./AnimatedButton.css";

const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  icon = null,
  className = ""
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-gray-200/80 text-gray-800 hover:bg-gray-300/90 border-gray-300";
      case "success":
        return "bg-green-600/90 text-white hover:bg-green-700 border-green-600 shadow-success";
      case "danger":
        return "bg-red-600/90 text-white hover:bg-red-700 border-red-600 shadow-danger";
      case "warning":
        return "bg-yellow-500/90 text-white hover:bg-yellow-600 border-yellow-500 shadow-warning";
      case "outline":
        return "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white";
      case "ghost":
        return "bg-white/30 backdrop-blur-md text-blue-700 hover:bg-blue-50 border-transparent shadow-glass";
      default:
        return "bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white hover:from-blue-600 hover:to-purple-600 border-blue-600 shadow-primary";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-3 py-1.5 text-sm";
      case "large":
        return "px-6 py-3 text-lg";
      default:
        return "px-4 py-2 text-base";
    }
  };

  const handleClick = (e) => {
    if (disabled || loading) return;
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading}
      className={`
        relative overflow-hidden
        border-2 rounded-xl font-semibold
        transition-all duration-200 ease-out
        transform ${isPressed ? 'scale-97 ring-2 ring-blue-300' : 'hover:scale-105'}
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${loading ? 'cursor-wait' : ''}
        animated-btn
        ${className}
      `}
    >
      {/* Ripple/Glow Effect */}
      <span className={`animated-btn-glow ${isPressed ? 'active' : ''}`} />
      {/* Content */}
      <span className="relative flex items-center justify-center gap-2 z-10">
        {loading && (
          <span className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        )}
        {icon && !loading && <span>{icon}</span>}
        <span>{children}</span>
      </span>
    </button>
  );
};

export default AnimatedButton; 