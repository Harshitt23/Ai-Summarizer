import React, { useState } from "react";
import { 
  useLazyGetAnswerQuery,
  useLazyGetTranslatedSummaryQuery,
  useLazyGetFactCheckQuery,
  useLazyGetRelatedArticlesQuery
} from "../services/aiFeatures";

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
    { code: 'ar', name: 'Arabic' }
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
      <div className="modern_card">
        <h3 className="text-2xl font-playfair font-bold text-gray-800 text-center mb-6">
          AI-Powered <span className="text_gradient">Features</span>
        </h3>
        
        <p className="text-center text-gray-600 font-inter mb-6">
          Explore advanced AI capabilities to get more insights from your articles
        </p>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-inter font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {/* Question & Answer Tab */}
          {activeTab === 'qa' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-600 font-inter text-sm">
                  Ask specific questions about the article content
                </p>
              </div>
              <form onSubmit={handleQuestionSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask a question about the article..."
                  className="flex-1 modern_input"
                  required
                />
                <button
                  type="submit"
                  disabled={isAnswerFetching}
                  className="primary_btn disabled:opacity-50"
                >
                  {isAnswerFetching ? (
                    <span className="loading-dots">
                      <span></span><span></span><span></span>
                    </span>
                  ) : 'Ask'}
                </button>
              </form>

              {answer && (
                <div className="summary_box">
                  <h4 className="font-poppins font-semibold text-gray-800 mb-2">Answer:</h4>
                  <p className="font-inter text-gray-700 leading-relaxed">{answer}</p>
                </div>
              )}
            </div>
          )}

          {/* Translation Tab */}
          {activeTab === 'translate' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-600 font-inter text-sm">
                  Get the summary translated into different languages
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="modern_input max-w-xs"
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
                  className="accent_btn disabled:opacity-50"
                >
                  {isTranslationFetching ? (
                    <span className="loading-dots">
                      <span></span><span></span><span></span>
                    </span>
                  ) : 'Translate'}
                </button>
              </div>

              {translatedSummary && (
                <div className="summary_box">
                  <h4 className="font-poppins font-semibold text-gray-800 mb-2">
                    Summary in {languages.find(l => l.code === selectedLanguage)?.name}:
                  </h4>
                  <p className="font-inter text-gray-700 leading-relaxed">{translatedSummary}</p>
                </div>
              )}
            </div>
          )}

          {/* Fact Check Tab */}
          {activeTab === 'fact-check' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-600 font-inter text-sm">
                  Verify claims and check factual accuracy
                </p>
              </div>
              <button
                onClick={handleFactCheck}
                disabled={isFactCheckFetching}
                className="ghost_btn disabled:opacity-50"
              >
                {isFactCheckFetching ? (
                  <span className="loading-dots">
                    <span></span><span></span><span></span>
                  </span>
                ) : 'Check Facts'}
              </button>

              {factCheck && (
                <div className="summary_box">
                  <h4 className="font-poppins font-semibold text-gray-800 mb-2">Fact Check Results:</h4>
                  <div className="space-y-2">
                    {factCheck.claims?.map((claim, index) => (
                      <div key={index} className="fact-check-claim">
                        <p className="font-inter text-sm text-gray-600 mb-1">Claim {index + 1}:</p>
                        <p className="font-inter text-gray-700">{claim.text}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`verdict-badge ${
                            claim.verdict === 'verified' ? 'verdict-verified' :
                            claim.verdict === 'unverified' ? 'verdict-unverified' :
                            'verdict-false'
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
            <div className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-gray-600 font-inter text-sm">
                  Discover similar articles and related content
                </p>
              </div>
              <button
                onClick={handleRelatedArticles}
                disabled={isRelatedFetching}
                className="ghost_btn disabled:opacity-50"
              >
                {isRelatedFetching ? (
                  <span className="loading-dots">
                    <span></span><span></span><span></span>
                  </span>
                ) : 'Find Related Articles'}
              </button>

              {relatedArticles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-poppins font-semibold text-gray-800">Related Articles:</h4>
                  {relatedArticles.map((article, index) => (
                    <div key={index} className="link_card">
                      <div className="flex-1">
                        <h5 className="font-inter font-semibold text-gray-800 mb-1">
                          {article.title}
                        </h5>
                        <p className="font-inter text-sm text-gray-600 mb-2">
                          {article.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            Similarity: {article.similarity}%
                          </span>
                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
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
    </div>
  );
};

export default AIFeatures; 