import React from 'react';

const LoadingSpinner = ({ size = 'md', variant = 'primary', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const variantClasses = {
    primary: 'border-primary-500',
    accent: 'border-accent-500',
    white: 'border-white'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-200 border-t-2 ${variantClasses[variant]} border-t-current`}></div>
      {text && (
        <p className="text-gray-600 font-inter text-sm animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner; 