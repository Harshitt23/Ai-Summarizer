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

export default ResponsiveContainer; 