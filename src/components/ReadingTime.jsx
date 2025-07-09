import React from "react";

const ReadingTime = ({ originalText, summaryText }) => {
  const calculateReadingTime = (text) => {
    if (!text || text.trim() === "") return 0;
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  };

  const calculateWordCount = (text) => {
    if (!text || text.trim() === "") return 0;
    return text.trim().split(/\s+/).length;
  };

  const originalTime = calculateReadingTime(originalText);
  const summaryTime = calculateReadingTime(summaryText);
  const originalWords = calculateWordCount(originalText);
  const summaryWords = calculateWordCount(summaryText);
  const timeSaved = Math.max(0, originalTime - summaryTime);
  const wordsSaved = Math.max(0, originalWords - summaryWords);

  const getTimeIcon = (minutes) => {
    if (minutes < 1) return "⚡";
    if (minutes < 3) return "📖";
    if (minutes < 5) return "📚";
    return "📖";
  };

  const getSavingsColor = (savings) => {
    if (savings > 80) return "text-green-600";
    if (savings > 60) return "text-blue-600";
    if (savings > 40) return "text-yellow-600";
    return "text-gray-600";
  };

  const timeSavingsPercentage = originalTime > 0 ? Math.round((timeSaved / originalTime) * 100) : 0;
  const wordSavingsPercentage = originalWords > 0 ? Math.round((wordsSaved / originalWords) * 100) : 0;

  // Don't render if no meaningful data
  if (!summaryText || summaryText.trim() === "") return null;

  // Check if we have meaningful original content (not placeholder text and has sufficient content)
  const hasOriginalContent = originalText && 
    originalText.trim() !== "" && 
    originalText !== "Original content" && 
    originalText !== "PDF Content (extracted)" &&
    originalWords >= 50; // Must have at least 50 words to be considered meaningful

  // Debug logging
  console.log('ReadingTime Debug:', {
    originalText: originalText?.substring(0, 100) + '...',
    originalWords,
    summaryWords,
    hasOriginalContent,
    timeSaved,
    wordsSaved
  });

  return (
    <div className="modern_card">
      <h3 className="text-lg font-playfair font-bold text-gray-800 mb-4">
        Reading Time Analysis
      </h3>
      
      {hasOriginalContent ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Original Content */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📄</span>
              <h4 className="font-semibold text-gray-800">Original Content</h4>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{originalWords}</span> words
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{originalTime}</span> min read
                <span className="ml-1">{getTimeIcon(originalTime)}</span>
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">📝</span>
              <h4 className="font-semibold text-gray-800">Summary</h4>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{summaryWords}</span> words
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{summaryTime}</span> min read
                <span className="ml-1">{getTimeIcon(summaryTime)}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">📝</span>
            <h4 className="font-semibold text-gray-800">Summary</h4>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              <span className="font-medium">{summaryWords}</span> words
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">{summaryTime}</span> min read
              <span className="ml-1">{getTimeIcon(summaryTime)}</span>
            </p>
          </div>
        </div>
      )}

      {/* Savings - Only show when we have meaningful original content and actual savings */}
      {hasOriginalContent && originalTime > 0 && timeSaved > 0 && wordsSaved > 0 && (
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⏱️</span>
            <h4 className="font-semibold text-gray-800">Time Saved</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-green-600">
                {timeSaved} min
              </p>
              <p className="text-sm text-gray-600">
                {timeSavingsPercentage}% faster
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {wordsSaved} words
              </p>
              <p className="text-sm text-gray-600">
                {wordSavingsPercentage}% shorter
              </p>
            </div>
          </div>
          
          <div className="mt-3 p-2 bg-white rounded border">
            <p className="text-xs text-gray-600">
              💡 You saved {timeSaved} minutes of reading time! 
              That's equivalent to {Math.round(timeSaved * 60 / 200)}% of your attention span.
            </p>
          </div>
        </div>
      )}

      {/* Show message when no savings are available */}
      {!hasOriginalContent && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            💡 Original content not available for comparison. Time saved and word count analysis requires the full article content.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReadingTime; 