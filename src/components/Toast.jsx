import React, { useState, useEffect } from "react";

const Toast = ({ 
  message, 
  type = "info", 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeClasses = () => {
    switch (type) {
      case "success":
        return "bg-green-500 border-green-400 text-white";
      case "error":
        return "bg-red-500 border-red-400 text-white";
      case "warning":
        return "bg-yellow-500 border-yellow-400 text-white";
      case "info":
      default:
        return "bg-blue-500 border-blue-400 text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
      default:
        return "ℹ️";
    }
  };

  return (
    <div
      className={`
        fixed top-4 right-4 z-50
        max-w-sm w-full
        border rounded-lg shadow-lg
        transform transition-all duration-300 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        ${getTypeClasses()}
      `}
    >
      <div className="flex items-center p-4">
        <span className="text-lg mr-3">{getIcon()}</span>
        <p className="flex-1 font-medium">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => onClose?.(), 300);
          }}
          className="ml-3 text-white/80 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// Toast Container
export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast; 