import React from 'react';

const ProgressBar = ({ 
  progress = 0, 
  variant = 'primary', 
  size = 'md',
  showPercentage = false,
  animated = true,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4'
  };

  const variantClasses = {
    primary: 'bg-primary-500',
    accent: 'bg-accent-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  const progressClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
    accent: 'bg-gradient-to-r from-accent-500 to-accent-600',
    success: 'bg-gradient-to-r from-green-500 to-green-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
    error: 'bg-gradient-to-r from-red-500 to-red-600'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]} overflow-hidden`}>
        <div 
          className={`
            ${progressClasses[variant]}
            ${sizeClasses[size]}
            rounded-full
            transition-all
            duration-1000
            ease-out
            ${animated ? 'animate-pulse-slow' : ''}
          `}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        ></div>
      </div>
      
      {showPercentage && (
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm font-inter text-gray-600">Progress</span>
          <span className="text-sm font-inter font-semibold text-gray-800">
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar; 