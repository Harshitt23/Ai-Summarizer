import React, { useState, useEffect } from "react";

const SimpleAnalytics = ({ text }) => {
  const [analytics, setAnalytics] = useState({
    wordCount: 0,
    charCount: 0,
    sentenceCount: 0,
    readingTime: 0
  });

  useEffect(() => {
    if (!text || text.trim() === "") return;

    const trimmedText = text.trim();
    const words = trimmedText.split(/\s+/).filter(word => word.length > 0);
    const sentences = trimmedText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    
    setAnalytics({
      wordCount: words.length,
      charCount: trimmedText.length,
      sentenceCount: sentences.length,
      readingTime: Math.max(1, Math.ceil(words.length / 200))
    });
  }, [text]);

  if (!text || text.trim() === "") return null;

  return (
    <div className="modern_card">
      <h3 className="text-lg font-playfair font-bold text-gray-800 mb-4">
        Text Analysis
      </h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
          <span className="font-medium text-gray-700">Words:</span>
          <span className="text-2xl font-bold text-blue-600">{analytics.wordCount}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
          <span className="font-medium text-gray-700">Characters:</span>
          <span className="text-2xl font-bold text-green-600">{analytics.charCount}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
          <span className="font-medium text-gray-700">Sentences:</span>
          <span className="text-2xl font-bold text-purple-600">{analytics.sentenceCount}</span>
        </div>
        
        <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
          <span className="font-medium text-gray-700">Reading Time:</span>
          <span className="text-2xl font-bold text-orange-600">{analytics.readingTime} min</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleAnalytics; 