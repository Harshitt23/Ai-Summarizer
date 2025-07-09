import React, { useState } from "react";
import SimpleAnalytics from "./SimpleAnalytics";

const TextInput = ({ onTextSubmit, isProcessing }) => {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setText(value);
    setCharCount(value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 50) {
      onTextSubmit(text.trim());
    } else {
      alert("Please enter at least 50 characters for summarization");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            placeholder="Paste your article text here... (Minimum 50 characters)"
            className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-inter text-sm"
            disabled={isProcessing}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {charCount} characters
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {charCount < 50 ? (
              <span className="text-red-500">
                Need {50 - charCount} more characters
              </span>
            ) : (
              <span className="text-green-600">
                ✓ Ready to summarize
              </span>
            )}
          </div>
          
          <button
            type="submit"
            disabled={charCount < 50 || isProcessing}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              charCount >= 50 && !isProcessing
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isProcessing ? "Processing..." : "Summarize Text"}
          </button>
        </div>
        
        <div className="text-xs text-gray-500">
          💡 Tip: Press Ctrl+Enter to submit quickly
        </div>
      </form>

      {/* Text Analysis - Only show when there's meaningful text */}
      {text.length > 10 && (
        <SimpleAnalytics text={text} />
      )}
    </div>
  );
};

export default TextInput; 