import React from "react";

const ResponsiveContainer = ({ 
  children, 
  className = "",
  maxWidth = "7xl",
  padding = true,
  center = true 
}) => {
  const getMaxWidthClasses = () => {
    switch (maxWidth) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "2xl":
        return "max-w-2xl";
      case "3xl":
        return "max-w-3xl";
      case "4xl":
        return "max-w-4xl";
      case "5xl":
        return "max-w-5xl";
      case "6xl":
        return "max-w-6xl";
      case "7xl":
      default:
        return "max-w-7xl";
    }
  };

  const getPaddingClasses = () => {
    if (!padding) return "";
    return "px-4 sm:px-6 lg:px-8";
  };

  const getCenterClasses = () => {
    if (!center) return "";
    return "mx-auto";
  };

  return (
    <div 
      className={`
        w-full
        ${getMaxWidthClasses()}
        ${getCenterClasses()}
        ${getPaddingClasses()}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Mobile-first grid component
export const ResponsiveGrid = ({ 
  children, 
  cols = { sm: 1, md: 2, lg: 3 },
  gap = 4,
  className = "" 
}) => {
  const getGridClasses = () => {
    const baseCols = cols.sm || 1;
    const mdCols = cols.md || baseCols;
    const lgCols = cols.lg || mdCols;
    
    return `grid grid-cols-${baseCols} md:grid-cols-${mdCols} lg:grid-cols-${lgCols}`;
  };

  return (
    <div 
      className={`
        ${getGridClasses()}
        gap-${gap}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

// Touch-friendly button wrapper
export const TouchButton = ({ 
  children, 
  onClick, 
  className = "",
  disabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        min-h-[44px] min-w-[44px] // Touch-friendly minimum size
        flex items-center justify-center
        rounded-lg
        transition-all duration-200
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default ResponsiveContainer; 