import React from 'react';

const FloatingActionButton = ({ 
  icon, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  tooltip = '',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  const variantClasses = {
    primary: 'bg-primary-500 hover:bg-primary-600 shadow-glow hover:shadow-glow-lg',
    accent: 'bg-accent-500 hover:bg-accent-600 shadow-glow hover:shadow-glow-lg',
    secondary: 'bg-gray-500 hover:bg-gray-600 shadow-lg hover:shadow-xl'
  };

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          rounded-full
          text-white
          flex
          items-center
          justify-center
          transition-all
          duration-300
          hover:scale-110
          animate-float
          ${className}
        `}
        title={tooltip}
      >
        <span className="text-xl">{icon}</span>
      </button>
      
      {tooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          {tooltip}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton; 