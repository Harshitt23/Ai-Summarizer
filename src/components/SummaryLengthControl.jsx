import React from "react";
import ModernCard from "./ModernCard";

const SummaryLengthControl = ({ selectedLength, onLengthChange }) => {
  const lengthOptions = [
    {
      value: "short",
      label: "Short",
      description: "Quick overview (1-2 sentences)",
      icon: "⚡",
      color: "bg-green-100 text-green-800 border-green-200"
    },
    {
      value: "medium",
      label: "Medium",
      description: "Balanced summary (3-4 sentences)",
      icon: "📝",
      color: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      value: "long",
      label: "Detailed",
      description: "Comprehensive summary (5+ sentences)",
      icon: "📚",
      color: "bg-purple-100 text-purple-800 border-purple-200"
    }
  ];

  return (
    <ModernCard variant="glass" animated className="max-w-xl mx-auto py-4 px-4">
      <h3 className="text-lg font-bold text-gray-800 mb-2 tracking-tight flex items-center gap-2">
        <span className="inline-block bg-gradient-to-r from-blue-400 to-purple-500 text-white px-2 py-0.5 rounded-lg text-sm shadow-sm">Summary Length</span>
      </h3>
      
      <div className="space-y-2">
        {lengthOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onLengthChange(option.value)}
            aria-pressed={selectedLength === option.value}
            className={`w-full py-2 px-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-2 group shadow-sm hover:scale-[1.02] hover:shadow-md
              ${selectedLength === option.value
                ? `${option.color} border-2 border-blue-400 ring-2 ring-blue-200`
                : "border-gray-200 hover:border-blue-200 bg-white/80"}
            `}
          >
            <span className="text-xl drop-shadow-sm group-hover:scale-105 transition-transform duration-200">{option.icon}</span>
            <div className="text-left">
              <div className="font-semibold text-base">{option.label}</div>
              <div className="text-xs opacity-75">{option.description}</div>
            </div>
            {selectedLength === option.value && (
              <div className="ml-auto">
                <svg
                  className="w-5 h-5 text-blue-500 animate-bounce"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
      
      <div className="mt-3 p-2 bg-gradient-to-r from-gray-50 to-white/80 rounded-lg shadow-inner flex items-center gap-2 text-xs text-gray-700">
        <span className="text-base">💡</span>
        <span>
          Choose the length that best fits your needs. 
          {selectedLength === "short" && " Perfect for quick scanning."}
          {selectedLength === "medium" && " Great for general understanding."}
          {selectedLength === "long" && " Ideal for detailed analysis."}
        </span>
      </div>
    </ModernCard>
  );
};

export default SummaryLengthControl; 