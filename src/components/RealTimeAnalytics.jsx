import React, { useState, useEffect } from "react";

const RealTimeAnalytics = ({ text, isVisible = true }) => {
  const [analytics, setAnalytics] = useState({
    wordCount: 0,
    charCount: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    estimatedReadingTime: 0,
    complexity: "Easy"
  });

  useEffect(() => {
    if (!text || !isVisible) return;

    const calculateAnalytics = () => {
      const trimmedText = text.trim();
      const words = trimmedText.split(/\s+/).filter(word => word.length > 0);
      const sentences = trimmedText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
      const paragraphs = trimmedText.split(/\n\s*\n/).filter(para => para.trim().length > 0);
      
      const wordCount = words.length;
      const charCount = trimmedText.length;
      const sentenceCount = sentences.length;
      const paragraphCount = paragraphs.length;
      const estimatedReadingTime = Math.max(1, Math.ceil(wordCount / 200)); // 200 words per minute
      
      // Calculate complexity based on average word length and sentence length
      const avgWordLength = wordCount > 0 ? words.reduce((sum, word) => sum + word.length, 0) / wordCount : 0;
      const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;
      
      let complexity = "Easy";
      if (avgWordLength > 6 || avgSentenceLength > 20) {
        complexity = "Complex";
      } else if (avgWordLength > 5 || avgSentenceLength > 15) {
        complexity = "Moderate";
      }

      const newAnalytics = {
        wordCount,
        charCount,
        sentenceCount,
        paragraphCount,
        estimatedReadingTime,
        complexity
      };

      setAnalytics(newAnalytics);
    };

    // Calculate immediately for better responsiveness
    calculateAnalytics();
  }, [text, isVisible]);

  if (!isVisible || !text || text.trim() === "") return null;

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "Easy": return "text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-900/40";
      case "Moderate": return "text-yellow-600 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/40";
      case "Complex": return "text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900/40";
      default: return "text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700";
    }
  };

  const getReadingTimeIcon = (minutes) => {
    if (minutes < 1) return "⚡";
    if (minutes < 3) return "📖";
    if (minutes < 5) return "📚";
    return "📖";
  };

  return (
    <div className="modern_card">
      <h3 className="text-lg font-playfair font-bold text-gray-800 dark:text-white mb-4">
        Text Analysis
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{analytics.wordCount}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
        </div>

        <div className="text-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{analytics.charCount}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Characters</div>
        </div>

        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{analytics.sentenceCount}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Sentences</div>
        </div>

        <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg border border-orange-200 dark:border-orange-700">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{analytics.paragraphCount}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Paragraphs</div>
        </div>

        <div className="text-center p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-200 dark:border-indigo-700">
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            {analytics.estimatedReadingTime} {getReadingTimeIcon(analytics.estimatedReadingTime)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Reading Time</div>
        </div>

        <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/60 rounded-lg border border-gray-200 dark:border-gray-600">
          <div className={`text-lg font-bold px-3 py-1 rounded-full ${getComplexityColor(analytics.complexity)}`}>
            {analytics.complexity}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Complexity</div>
        </div>
      </div>

      {analytics.wordCount > 0 && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            💡 This text has {analytics.wordCount} words and will take approximately {analytics.estimatedReadingTime} minute{analytics.estimatedReadingTime !== 1 ? 's' : ''} to read.
            {analytics.complexity === "Complex" && " Consider breaking it into smaller sections for better readability."}
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeAnalytics; 