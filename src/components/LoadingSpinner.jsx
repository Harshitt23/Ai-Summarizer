import React from "react";

const LoadingSpinner = ({ 
  size = "medium", 
  variant = "default",
  text = "",
  progress = null 
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-4 h-4";
      case "large":
        return "w-12 h-12";
      default:
        return "w-8 h-8";
    }
  };

  const getVariantSpinner = () => {
    switch (variant) {
      case "dots":
        return (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        );
      case "pulse":
        return (
          <div className={`${getSizeClasses()} bg-blue-600 rounded-full animate-pulse`}></div>
        );
      case "bars":
        return (
          <div className="flex space-x-1">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-1 h-6 bg-blue-600 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        );
      default:
        return (
          <div className={`${getSizeClasses()} border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin`}></div>
        );
    }
  };

  if (progress !== null) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-xs bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">{text || `${Math.round(progress)}%`}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-3">
      {getVariantSpinner()}
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
};

// Skeleton Loading Component
export const Skeleton = ({ 
  className = "", 
  lines = 1,
  height = "h-4" 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`${height} bg-gray-200 rounded animate-pulse`}
          style={{ animationDelay: `${i * 0.1}s` }}
        ></div>
      ))}
    </div>
  );
};

// Shimmer Loading Component
export const Shimmer = ({ className = "" }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer h-full rounded"></div>
    </div>
  );
};

export default LoadingSpinner; 