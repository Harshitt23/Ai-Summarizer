import React, { useState, useEffect } from "react";

const KeywordExtractor = ({ text }) => {
  const [keywords, setKeywords] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simple keyword extraction algorithm
  const extractKeywords = (text) => {
    if (!text) return [];
    
    // Remove common stop words
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
      'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'his', 'hers', 'ours', 'theirs'
    ]);

    // Clean and tokenize text
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !stopWords.has(word));

    // Count word frequency
    const wordCount = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Sort by frequency and get top keywords
    const sortedWords = Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15)
      .map(([word, count]) => ({
        word,
        count,
        importance: Math.round((count / words.length) * 100)
      }));

    return sortedWords;
  };

  useEffect(() => {
    if (text && text.trim() !== "") {
      setIsProcessing(true);
      // Process immediately for better responsiveness
      const extractedKeywords = extractKeywords(text);
      setKeywords(extractedKeywords);
      setIsProcessing(false);
    } else {
      setKeywords([]);
      setIsProcessing(false);
    }
  }, [text]);

  const getImportanceColor = (importance) => {
    if (importance > 5) return "bg-red-100 text-red-800 border-red-200";
    if (importance > 3) return "bg-orange-100 text-orange-800 border-orange-200";
    if (importance > 1) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-blue-100 text-blue-800 border-blue-200";
  };

  const getImportanceSize = (importance) => {
    if (importance > 5) return "text-lg font-bold";
    if (importance > 3) return "text-base font-semibold";
    if (importance > 1) return "text-sm font-medium";
    return "text-xs";
  };

  if (!text || text.trim() === "") return null;

  // Don't show loading for very short texts
  const shouldShowLoading = text.length > 50;

  return (
    <div className="modern_card">
      <h3 className="text-lg font-playfair font-bold text-gray-800 mb-4">
        Key Terms & Concepts
      </h3>
      
      {isProcessing && shouldShowLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Extracting keywords...</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full border ${getImportanceColor(keyword.importance)} ${getImportanceSize(keyword.importance)}`}
                title={`Frequency: ${keyword.count} times (${keyword.importance}% importance)`}
              >
                {keyword.word}
                <span className="ml-1 text-xs opacity-75">
                  ({keyword.count})
                </span>
              </span>
            ))}
          </div>
          
          {keywords.length > 0 && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-800">Total Keywords</p>
                  <p className="text-2xl font-bold text-blue-600">{keywords.length}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Most Frequent</p>
                  <p className="text-lg font-bold text-green-600">
                    {keywords[0]?.word || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Avg. Importance</p>
                  <p className="text-lg font-bold text-purple-600">
                    {Math.round(keywords.reduce((sum, k) => sum + k.importance, 0) / keywords.length)}%
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-xs text-gray-500 mt-2">
            💡 Keywords are extracted based on frequency and relevance. 
            Larger, more colorful tags indicate higher importance.
          </div>
        </div>
      )}
    </div>
  );
};

export default KeywordExtractor; 