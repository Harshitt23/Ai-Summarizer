import React, { useState } from "react";

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
        return "bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-300";
      case "success":
        return "bg-green-600 text-white hover:bg-green-700 border-green-600";
      case "danger":
        return "bg-red-600 text-white hover:bg-red-700 border-red-600";
      case "warning":
        return "bg-yellow-500 text-white hover:bg-yellow-600 border-yellow-500";
      case "outline":
        return "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white";
      case "ghost":
        return "bg-transparent text-gray-700 hover:bg-gray-100 border-transparent";
      default:
        return "bg-blue-600 text-white hover:bg-blue-700 border-blue-600";
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
        border-2 rounded-lg font-medium
        transition-all duration-200 ease-out
        transform ${isPressed ? 'scale-95' : 'hover:scale-105'}
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${loading ? 'cursor-wait' : ''}
        ${className}
      `}
    >
      {/* Ripple Effect */}
      <div className="absolute inset-0 bg-white/20 transform scale-0 transition-transform duration-200 ease-out" />
      
      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {loading && (
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
        )}
        {icon && !loading && <span>{icon}</span>}
        <span>{children}</span>
      </div>
    </button>
  );
};

export default AnimatedButton; 