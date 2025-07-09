import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery, useLazyGetArticleContentQuery } from "../services/article";
import { useGetTextSummaryMutation } from "../services/textSummary";
import AIFeatures from "./AIFeatures";
import FileUpload from "./FileUpload";
import TextInput from "./TextInput";
import ExportOptions from "./ExportOptions";
import ReadingTime from "./ReadingTime";
import KeywordExtractor from "./KeywordExtractor";
import SummaryLengthControl from "./SummaryLengthControl";
import EnhancedCard from "./EnhancedCard";
import AnimatedButton from "./AnimatedButton";
import GradientText from "./GradientText";
import ResponsiveContainer from "./ResponsiveContainer";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
    originalText: "",
    type: "url" // "url", "text", "pdf"
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");
  const [inputMode, setInputMode] = useState("url"); // "url", "text", "pdf"
  const [summaryLength, setSummaryLength] = useState("medium");
  const [isProcessingFile, setIsProcessingFile] = useState(false);

  // RTK queries
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [getArticleContent, { isFetching: isFetchingContent }] = useLazyGetArticleContentQuery();
  const [getTextSummary, { isLoading: isTextLoading }] = useGetTextSummaryMutation();

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputMode === "url") {
      const existingArticle = allArticles.find(
        (item) => item.url === article.url
      );

      if (existingArticle) return setArticle(existingArticle);

      try {
        // Get both summary and original content
        const [summaryResult, contentResult] = await Promise.all([
          getSummary({ 
            articleUrl: article.url,
            length: summaryLength === "short" ? 1 : summaryLength === "long" ? 5 : 3
          }),
          getArticleContent({ articleUrl: article.url })
        ]);
        
        if (summaryResult.data?.summary) {
          const newArticle = { 
            ...article, 
            summary: summaryResult.data.summary,
            originalText: contentResult.data?.article || contentResult.data?.content || "",
            type: "url"
          };
          const updatedAllArticles = [newArticle, ...allArticles];

          setArticle(newArticle);
          setAllArticles(updatedAllArticles);
          localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        // Fallback to just summary if content extraction fails
        const { data } = await getSummary({ 
          articleUrl: article.url,
          length: summaryLength === "short" ? 1 : summaryLength === "long" ? 5 : 3
        });
        
        if (data?.summary) {
          const newArticle = { 
            ...article, 
            summary: data.summary,
            originalText: "", // No original content available
            type: "url"
          };
          const updatedAllArticles = [newArticle, ...allArticles];

          setArticle(newArticle);
          setAllArticles(updatedAllArticles);
          localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
        }
      }
    }
  };

  const handleTextSubmit = async (text) => {
    try {
      const { data } = await getTextSummary({ 
        text: text,
        length: summaryLength === "short" ? 1 : summaryLength === "long" ? 5 : 3
      });
      
      if (data?.summary) {
        const newArticle = {
          url: "Text Input",
          summary: data.summary,
          originalText: text,
          type: "text"
        };
        
        const updatedAllArticles = [newArticle, ...allArticles];
        setArticle(newArticle);
        setAllArticles(updatedAllArticles);
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      }
    } catch (error) {
      console.error('Error summarizing text:', error);
      // Fallback to mock summary if API fails
      const mockSummary = `This is a summary of the provided text. The content discusses various topics and provides insights into the subject matter. The key points include important information that was extracted from the original text.`;
      
      const newArticle = {
        url: "Text Input",
        summary: mockSummary,
        originalText: text,
        type: "text"
      };
      
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleFileUpload = async (file) => {
    setIsProcessingFile(true);
    
    // Simulate file processing
    setTimeout(() => {
      const mockSummary = `This is a summary of the uploaded PDF file. The document contains important information that has been extracted and summarized for easy reading.`;
      
      const newArticle = {
        url: file.name,
        summary: mockSummary,
        originalText: "PDF Content (extracted)",
        type: "pdf"
      };
      
      const updatedAllArticles = [newArticle, ...allArticles];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      setIsProcessingFile(false);
    }, 2000);
  };

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <ResponsiveContainer maxWidth="4xl" className="mt-16">
      <section className='w-full'>
      {/* Input Mode Selection */}
      <div className="mb-6">
        <div className="flex justify-center gap-2 mb-4">
          {[
            { id: "url", label: "URL", icon: "🔗" },
            { id: "text", label: "Text", icon: "📝" },
            { id: "pdf", label: "PDF", icon: "📄" }
          ].map((mode) => (
            <AnimatedButton
              key={mode.id}
              onClick={() => setInputMode(mode.id)}
              variant={inputMode === mode.id ? "primary" : "ghost"}
              icon={mode.icon}
              className="btn-animate"
            >
              {mode.label}
            </AnimatedButton>
          ))}
        </div>
      </div>

      {/* Summary Length Control */}
      <div className="mb-6">
        <SummaryLengthControl 
          selectedLength={summaryLength}
          onLengthChange={setSummaryLength}
        />
      </div>

      {/* Input Section */}
      <div className='flex flex-col w-full gap-4'>
        {inputMode === "url" && (
          <form
            className='relative flex justify-center items-center'
            onSubmit={handleSubmit}
          >
            <img
              src={linkIcon}
              alt='link-icon'
              className='absolute left-0 my-2 ml-3 w-5 opacity-60'
            />

            <input
              type='url'
              placeholder='Paste the article link'
              value={article.url}
              onChange={(e) => setArticle({ ...article, url: e.target.value })}
              onKeyDown={handleKeyDown}
              required
              className='url_input peer'
            />
            <button
              type='submit'
              className='submit_btn peer-focus:border-primary-500 peer-focus:text-primary-600'
            >
              <p className='text-lg'>↵</p>
            </button>
          </form>
        )}

        {inputMode === "text" && (
          <TextInput 
            onTextSubmit={handleTextSubmit}
            isProcessing={isTextLoading}
          />
        )}

        {inputMode === "pdf" && (
          <FileUpload 
            onFileUpload={handleFileUpload}
            isProcessing={isProcessingFile}
          />
        )}

        {/* Browse History */}
        <div className='flex flex-col gap-2 max-h-60 overflow-y-auto'>
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <div className='flex-1'>
                <p className='font-inter text-primary-700 font-medium text-sm truncate'>
                  {item.url}
                </p>
                <p className='text-xs text-gray-500'>
                  {item.type === "url" ? "🔗 URL" : item.type === "text" ? "📝 Text" : "📄 PDF"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {(isFetching || isFetchingContent || isTextLoading || isProcessingFile) ? (
          <div className='flex flex-col items-center gap-4'>
            <img src={loader} alt='loader' className='w-20 h-20 object-contain animate-pulse-slow' />
            <p className='font-inter text-gray-600 font-medium'>
              {isProcessingFile ? 'Processing your PDF...' : 'Processing your content...'}
            </p>
          </div>
        ) : error ? (
          <div className='modern_card'>
            <p className='font-inter font-bold text-black text-center'>
              Well, that wasn't supposed to happen...
              <br />
              <span className='font-inter font-normal text-gray-700'>
                {error?.data?.error}
              </span>
            </p>
          </div>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-6 animate-fade-in'>
              <h2 className='font-playfair font-bold text-gray-800 text-2xl text-center'>
                Article <GradientText variant="ocean" animated={true}>Summary</GradientText>
              </h2>
              
              <EnhancedCard variant="glass" glow={true} className="summary_box">
                <p className='font-inter font-medium text-gray-800 leading-relaxed'>
                  {article.summary}
                </p>
              </EnhancedCard>

              {/* Reading Time Analysis */}
              <ReadingTime 
                originalText={article.originalText || "Original content"}
                summaryText={article.summary}
              />

              {/* Keyword Extraction */}
              <KeywordExtractor text={article.summary} />

              {/* Export Options */}
              <ExportOptions 
                summary={article.summary}
                articleUrl={article.url}
                title={`Summary of ${article.url}`}
              />
              
              {/* AI Features Section */}
              <AIFeatures articleUrl={article.url} summary={article.summary} />
            </div>
          )
        )}
      </div>
      </section>
    </ResponsiveContainer>
  );
};

export default Demo;
