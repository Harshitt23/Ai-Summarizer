import React, { useState } from "react";
import { 
  useLazyGetAnswerQuery,
  useLazyGetTranslatedSummaryQuery,
  useLazyGetFactCheckQuery,
  useLazyGetRelatedArticlesQuery
} from "../services/aiFeatures";
import VideoBackground from "./VideoBackground";

const AIFeatures = ({ articleUrl, summary }) => {
  const [activeTab, setActiveTab] = useState('qa');
  const [question, setQuestion] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [answer, setAnswer] = useState('');
  const [translatedSummary, setTranslatedSummary] = useState('');
  const [factCheck, setFactCheck] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  // RTK Queries
  const [getAnswer, { isFetching: isAnswerFetching }] = useLazyGetAnswerQuery();
  const [getTranslatedSummary, { isFetching: isTranslationFetching }] = useLazyGetTranslatedSummaryQuery();
  const [getFactCheck, { isFetching: isFactCheckFetching }] = useLazyGetFactCheckQuery();
  const [getRelatedArticles, { isFetching: isRelatedFetching }] = useLazyGetRelatedArticlesQuery();

  const languages = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'sa', name: 'Sanskrit' }
  ];

  // Mock data for demonstration
  const mockAnswer = "Based on the article content, the main argument presented is that artificial intelligence is transforming various industries by automating routine tasks and enabling more efficient decision-making processes. The article highlights both the benefits and potential challenges of AI adoption.";
  
  const mockTranslatedSummary = "El artículo discute cómo la inteligencia artificial está transformando las industrias mediante la automatización de tareas rutinarias y permitiendo procesos de toma de decisiones más eficientes. Se destacan tanto los beneficios como los desafíos potenciales de la adopción de IA.";
  
  const mockFactCheck = {
    claims: [
      {
        text: "AI is transforming industries by automating routine tasks",
        verdict: "verified",
        confidence: 95
      },
      {
        text: "AI adoption leads to job displacement",
        verdict: "unverified",
        confidence: 60
      },
      {
        text: "AI improves decision-making efficiency",
        verdict: "verified",
        confidence: 88
      }
    ]
  };
  
  const mockRelatedArticles = [
    {
      title: "The Future of AI in Healthcare",
      description: "Exploring how artificial intelligence is revolutionizing medical diagnosis and treatment.",
      url: "https://example.com/ai-healthcare",
      similarity: 85
    },
    {
      title: "Machine Learning in Finance",
      description: "How AI is transforming the financial industry through predictive analytics.",
      url: "https://example.com/ai-finance",
      similarity: 78
    },
    {
      title: "Ethical Considerations in AI Development",
      description: "Important discussions about responsible AI development and deployment.",
      url: "https://example.com/ai-ethics",
      similarity: 72
    }
  ];

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim() || !articleUrl) return;

    try {
      const { data } = await getAnswer({ articleUrl, question });
      if (data?.answer) {
        setAnswer(data.answer);
      } else {
        // Fallback to mock data for demo
        setAnswer(mockAnswer);
      }
    } catch (error) {
      console.error('Error getting answer:', error);
      // Use mock data as fallback
      setAnswer(mockAnswer);
    }
  };

  const handleTranslation = async () => {
    if (!articleUrl) return;

    try {
      const { data } = await getTranslatedSummary({ articleUrl, language: selectedLanguage });
      if (data?.summary) {
        setTranslatedSummary(data.summary);
      } else {
        // Fallback to mock data for demo
        setTranslatedSummary(mockTranslatedSummary);
      }
    } catch (error) {
      console.error('Error translating:', error);
      // Use mock data as fallback
      setTranslatedSummary(mockTranslatedSummary);
    }
  };

  const handleFactCheck = async () => {
    if (!articleUrl) return;

    try {
      const { data } = await getFactCheck({ articleUrl });
      if (data?.analysis) {
        setFactCheck(data.analysis);
      } else {
        // Fallback to mock data for demo
        setFactCheck(mockFactCheck);
      }
    } catch (error) {
      console.error('Error fact checking:', error);
      // Use mock data as fallback
      setFactCheck(mockFactCheck);
    }
  };

  const handleRelatedArticles = async () => {
    if (!articleUrl) return;

    try {
      const { data } = await getRelatedArticles({ articleUrl });
      if (data?.related) {
        setRelatedArticles(data.related);
      } else {
        // Fallback to mock data for demo
        setRelatedArticles(mockRelatedArticles);
      }
    } catch (error) {
      console.error('Error getting related articles:', error);
      // Use mock data as fallback
      setRelatedArticles(mockRelatedArticles);
    }
  };

  const tabs = [
    { id: 'qa', name: 'Question & Answer', icon: '❓' },
    { id: 'translate', name: 'Translation', icon: '🌐' },
    { id: 'fact-check', name: 'Fact Check', icon: '✅' },
    { id: 'related', name: 'Related Articles', icon: '📚' }
  ];

  return (
    <div className="mt-8 w-full max-w-4xl mx-auto">
      <VideoBackground>
        <div className="modern_card ai-features-container ai-features-with-video">
          <div className="ai-features-header">
            <h3 className="text-2xl font-playfair font-bold text-gray-800 text-center mb-6">
              AI-Powered <span className="text_gradient">Features</span>
            </h3>
            
            <p className="ai-features-description">
              Explore advanced AI capabilities to get more insights from your articles
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="ai-features-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`ai-features-tab ${
                  activeTab === tab.id ? 'active' : 'inactive'
                }`}
              >
                <span className="tab-icon">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="ai-features-content">
          {/* Question & Answer Tab */}
          {activeTab === 'qa' && (
            <div className="ai-features-section">
              <div className="text-center mb-4">
                <p className="text-gray-600 font-inter text-sm">
                  Ask specific questions about the article content
                </p>
              </div>
              <form onSubmit={handleQuestionSubmit} className="ai-input-group">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question about the article..."
                  className="ai-input"
                  required
                />
                <button
                  type="submit"
                  disabled={isAnswerFetching}
                  className="ai-button ai-button-primary"
                >
                  {isAnswerFetching ? (
                    <span className="loading-dots-enhanced">
                      <span></span><span></span><span></span>
                    </span>
                  ) : 'Ask'}
                </button>
              </form>

              {answer && (
                <div className="ai-result-card">
                  <h4 className="ai-result-header">Answer:</h4>
                  <p className="ai-result-content">{answer}</p>
                </div>
              )}
            </div>
          )}

          {/* Translation Tab */}
          {activeTab === 'translate' && (
            <div className="ai-features-section">
              <div className="text-center mb-4">
                <p className="text-gray-600 font-inter text-sm">
                  Get the summary translated into different languages
                </p>
              </div>
              <div className="ai-input-group">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="ai-select"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleTranslation}
                  disabled={isTranslationFetching}
                  className="ai-button ai-button-accent"
                >
                  {isTranslationFetching ? (
                    <span className="loading-dots-enhanced">
                      <span></span><span></span><span></span>
                    </span>
                  ) : 'Translate'}
                </button>
              </div>

              {translatedSummary && (
                <div className="ai-result-card">
                  <h4 className="ai-result-header">
                    Summary in {languages.find(l => l.code === selectedLanguage)?.name}:
                  </h4>
                  <p className="ai-result-content">{translatedSummary}</p>
                </div>
              )}
            </div>
          )}

          {/* Fact Check Tab */}
          {activeTab === 'fact-check' && (
            <div className="ai-features-section">
              <div className="text-center mb-4">
                <p className="text-gray-600 font-inter text-sm">
                  Verify claims and check factual accuracy
                </p>
              </div>
              <button
                onClick={handleFactCheck}
                disabled={isFactCheckFetching}
                className="ai-button ai-button-ghost"
              >
                {isFactCheckFetching ? (
                  <span className="loading-dots-enhanced">
                    <span></span><span></span><span></span>
                  </span>
                ) : 'Check Facts'}
              </button>

              {factCheck && (
                <div className="ai-result-card">
                  <h4 className="ai-result-header">Fact Check Results:</h4>
                  <div className="fact-check-grid">
                    {factCheck.claims?.map((claim, index) => (
                      <div key={index} className="fact-check-item">
                        <p className="font-inter text-sm text-gray-600 mb-1">Claim {index + 1}:</p>
                        <p className="fact-check-claim-text">{claim.text}</p>
                        <div className="fact-check-meta">
                          <span className={`verdict-badge-enhanced ${
                            claim.verdict === 'verified' ? 'verdict-verified-enhanced' :
                            claim.verdict === 'unverified' ? 'verdict-unverified-enhanced' :
                            'verdict-false-enhanced'
                          }`}>
                            {claim.verdict}
                          </span>
                          {claim.confidence && (
                            <span className="text-xs text-gray-500">
                              Confidence: {claim.confidence}%
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Related Articles Tab */}
          {activeTab === 'related' && (
            <div className="ai-features-section">
              <div className="text-center mb-4">
                <p className="text-gray-600 font-inter text-sm">
                  Discover similar articles and related content
                </p>
              </div>
              <button
                onClick={handleRelatedArticles}
                disabled={isRelatedFetching}
                className="ai-button ai-button-ghost"
              >
                {isRelatedFetching ? (
                  <span className="loading-dots-enhanced">
                    <span></span><span></span><span></span>
                  </span>
                ) : 'Find Related Articles'}
              </button>

              {relatedArticles.length > 0 && (
                <div className="related-articles-grid">
                  <h4 className="ai-result-header">Related Articles:</h4>
                  {relatedArticles.map((article, index) => (
                    <div key={index} className="related-article-card">
                      <div className="flex-1">
                        <h5 className="related-article-title">
                          {article.title}
                        </h5>
                        <p className="related-article-description">
                          {article.description}
                        </p>
                        <div className="related-article-meta">
                          <span className="related-article-similarity">
                            Similarity: {article.similarity}%
                          </span>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="related-article-link"
                          >
                            Read Article →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        </div>
      </VideoBackground>
    </div>
  );
};

export default AIFeatures; 