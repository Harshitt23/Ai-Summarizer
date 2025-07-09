import React from 'react';

const StatusBadge = ({ status, message, icon }) => {
  const statusConfig = {
    success: {
      classes: 'success_indicator',
      icon: '✓',
      color: 'text-green-600'
    },
    error: {
      classes: 'error_indicator',
      icon: '✗',
      color: 'text-red-600'
    },
    warning: {
      classes: 'warning_indicator',
      icon: '⚠',
      color: 'text-yellow-600'
    },
    info: {
      classes: 'bg-blue-100 border border-blue-200 text-blue-800 px-4 py-2 rounded-lg flex items-center gap-2',
      icon: 'ℹ',
      color: 'text-blue-600'
    }
  };

  const config = statusConfig[status] || statusConfig.info;

  return (
    <div className={`${config.classes} animate-fade-in`}>
      <span className={`text-lg ${config.color}`}>{icon || config.icon}</span>
      <span className="font-inter font-medium">{message}</span>
    </div>
  );
};

export default StatusBadge; 