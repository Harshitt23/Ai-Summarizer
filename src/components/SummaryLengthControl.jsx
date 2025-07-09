import React from "react";

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
    <div className="modern_card">
      <h3 className="text-lg font-playfair font-bold text-gray-800 mb-4">
        Summary Length
      </h3>
      
      <div className="space-y-3">
        {lengthOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onLengthChange(option.value)}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
              selectedLength === option.value
                ? `${option.color} border-current`
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{option.icon}</span>
              <div className="text-left">
                <div className="font-semibold text-lg">{option.label}</div>
                <div className="text-sm opacity-75">{option.description}</div>
              </div>
              {selectedLength === option.value && (
                <div className="ml-auto">
                  <svg
                    className="w-6 h-6"
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
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="text-lg">💡</span>
          <span>
            Choose the length that best fits your needs. 
            {selectedLength === "short" && " Perfect for quick scanning."}
            {selectedLength === "medium" && " Great for general understanding."}
            {selectedLength === "long" && " Ideal for detailed analysis."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryLengthControl; 