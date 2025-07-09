import React from 'react';

const ModernCard = ({ 
  children, 
  variant = 'default',
  className = '',
  onClick,
  hover = true,
  animated = true
}) => {
  const baseClasses = 'rounded-2xl p-6 transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-xl hover:shadow-2xl',
    glass: 'bg-white/20 backdrop-blur-md border border-white/30 shadow-xl',
    neon: 'bg-white/95 backdrop-blur-sm border border-primary-200 shadow-glow hover:shadow-glow-lg',
    gradient: 'bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm border border-gray-200/50 shadow-xl',
    dark: 'bg-gray-800/95 backdrop-blur-sm border border-gray-700/50 shadow-xl text-white'
  };

  const hoverClasses = hover ? 'hover:scale-105 hover:shadow-2xl' : '';
  const animatedClasses = animated ? 'animate-fade-in' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div 
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${hoverClasses}
        ${animatedClasses}
        ${clickableClasses}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ModernCard; 