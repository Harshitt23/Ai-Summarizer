import React, { useState } from "react";

const ExportOptions = ({ summary, articleUrl, title = "Article Summary" }) => {
  const [exportFormat, setExportFormat] = useState("txt");

  const exportFormats = [
    { value: "txt", label: "Text File", icon: "📄" },
    { value: "pdf", label: "PDF", icon: "📑" },
    { value: "docx", label: "Word Document", icon: "📝" },
    { value: "json", label: "JSON", icon: "🔧" }
  ];

  const exportAsText = () => {
    const content = `Article Summary\n\n${summary}\n\nSource: ${articleUrl}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_summary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsPDF = () => {
    // For now, we'll use a simple approach
    // In a real app, you'd use a library like jsPDF
    const content = `
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #333; }
            .summary { line-height: 1.6; }
            .source { margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div class="summary">${summary}</div>
          <div class="source">Source: ${articleUrl}</div>
        </body>
      </html>
    `;
    
    const blob = new Blob([content], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_summary.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsWord = () => {
    // For now, we'll export as HTML that can be opened in Word
    const content = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
          <meta charset='utf-8'>
          <title>${title}</title>
        </head>
        <body>
          <h1>${title}</h1>
          <p>${summary}</p>
          <p><em>Source: ${articleUrl}</em></p>
        </body>
      </html>
    `;
    
    const blob = new Blob([content], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_summary.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsJSON = () => {
    const data = {
      title: title,
      summary: summary,
      source: articleUrl,
      exportedAt: new Date().toISOString()
    };
    
    const content = JSON.stringify(data, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_summary.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    switch (exportFormat) {
      case "txt":
        exportAsText();
        break;
      case "pdf":
        exportAsPDF();
        break;
      case "docx":
        exportAsWord();
        break;
      case "json":
        exportAsJSON();
        break;
      default:
        exportAsText();
    }
  };

  if (!summary) return null;

  return (
    <div className="modern_card">
      <h3 className="text-lg font-playfair font-bold text-gray-800 mb-4">
        Export Summary
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Export Format
          </label>
          <div className="grid grid-cols-2 gap-2">
            {exportFormats.map((format) => (
              <button
                key={format.value}
                onClick={() => setExportFormat(format.value)}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  exportFormat === format.value
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{format.icon}</span>
                  <span className="text-sm font-medium">{format.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={handleExport}
          className="w-full black_btn"
        >
          Export Summary
        </button>
      </div>
    </div>
  );
};

export default ExportOptions; 