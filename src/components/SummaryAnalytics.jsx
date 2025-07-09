import React from "react";
import ReadingTime from "./ReadingTime";
import KeywordExtractor from "./KeywordExtractor";

const SummaryAnalytics = ({ summary, originalText, type }) => {
  if (!summary || summary.trim() === "") return null;

  return (
    <div className="space-y-6">
      {/* Reading Time Analysis - Only show for URL and PDF types where we have original content */}
      {(type === "url" || type === "pdf") && (
        <ReadingTime 
          originalText={originalText || "Original content"}
          summaryText={summary}
        />
      )}

      {/* Keyword Extraction - Show for all types */}
      <KeywordExtractor text={summary} />
    </div>
  );
};

export default SummaryAnalytics; 