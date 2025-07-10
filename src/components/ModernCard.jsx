import React from 'react';
import './ModernCard.css';

const ModernCard = ({ 
  children, 
  variant = 'default',
  className = '',
  onClick,
  hover = true,
  animated = true
}) => {
  const baseClasses = 'rounded-3xl p-8 transition-all duration-300 shadow-lg';
  
  const variantClasses = {
    default: 'bg-white/80 backdrop-blur-lg border border-gray-200/60 shadow-2xl hover:shadow-3xl',
    glass: 'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl glass-effect',
    neon: 'bg-white/90 backdrop-blur-md border border-primary-200 shadow-glow neon-effect',
    gradient: 'bg-gradient-to-br from-white/90 via-gray-100 to-gray-50/90 backdrop-blur-lg border border-gray-200/60 shadow-2xl',
    dark: 'bg-gray-900/90 backdrop-blur-lg border border-gray-700/60 shadow-2xl text-white dark-effect'
  };

  const hoverClasses = hover ? 'hover:scale-105 hover:shadow-3xl' : '';
  const animatedClasses = animated ? 'moderncard-fade-in' : '';
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