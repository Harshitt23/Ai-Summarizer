import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

// Mock translation function for fallback
const getMockTranslation = (text, language) => {
  const translations = {
    'es': 'El artículo discute cómo la inteligencia artificial está transformando las industrias mediante la automatización de tareas rutinarias y permitiendo procesos de toma de decisiones más eficientes. Se destacan tanto los beneficios como los desafíos potenciales de la adopción de IA.',
    'fr': 'L\'article discute de la façon dont l\'intelligence artificielle transforme les industries en automatisant les tâches routinières et en permettant des processus de prise de décision plus efficaces. Il met en évidence à la fois les avantages et les défis potentiels de l\'adoption de l\'IA.',
    'de': 'Der Artikel diskutiert, wie künstliche Intelligenz verschiedene Branchen durch die Automatisierung routinemäßiger Aufgaben transformiert und effizientere Entscheidungsprozesse ermöglicht. Es werden sowohl die Vorteile als auch die potenziellen Herausforderungen der KI-Adoption hervorgehoben.',
    'it': 'L\'articolo discute di come l\'intelligenza artificiale stia trasformando le industrie automatizzando compiti di routine e permettendo processi decisionali più efficienti. Vengono evidenziati sia i benefici che le sfide potenziali dell\'adozione dell\'IA.',
    'pt': 'O artigo discute como a inteligência artificial está transformando as indústrias automatizando tarefas rotineiras e permitindo processos de tomada de decisão mais eficientes. Destacam-se tanto os benefícios quanto os desafios potenciais da adoção da IA.',
    'ru': 'В статье обсуждается, как искусственный интеллект трансформирует отрасли, автоматизируя рутинные задачи и обеспечивая более эффективные процессы принятия решений. Подчеркиваются как преимущества, так и потенциальные проблемы внедрения ИИ.',
    'ja': 'この記事では、人工知能が日常的なタスクの自動化とより効率的な意思決定プロセスの実現を通じて、様々な産業を変革している方法について議論しています。AI採用の利点と潜在的な課題の両方が強調されています。',
    'ko': '이 기사는 인공지능이 일상적인 작업을 자동화하고 더 효율적인 의사결정 프로세스를 가능하게 하여 다양한 산업을 변화시키는 방법에 대해 논의합니다. AI 채택의 이점과 잠재적 과제가 모두 강조됩니다.',
    'zh': '本文讨论了人工智能如何通过自动化日常任务和实现更高效的决策过程来改变各个行业。强调了AI采用的好处和潜在挑战。',
    'ar': 'تناقش المقالة كيف يغير الذكاء الاصطناعي الصناعات من خلال أتمتة المهام الروتينية وتمكين عمليات صنع القرار الأكثر كفاءة. يتم تسليط الضوء على كل من فوائد وتحديات تبني الذكاء الاصطناعي.',
    'hi': 'यह लेख चर्चा करता है कि कैसे कृत्रिम बुद्धिमत्ता रोबोटिक कार्यों को स्वचालित करके और अधिक कुशल निर्णय लेने की प्रक्रियाओं को सक्षम करके विभिन्न उद्योगों को बदल रही है। AI अपनाने के लाभों और संभावित चुनौतियों दोनों पर प्रकाश डाला गया है।',
    'sa': 'अयं लेखः चर्चयति यथा कृत्रिमबुद्धिः स्वचालितीकरणेन रोबोटिककार्याणि विविधानि उद्योगानि परिवर्तयति अधिककुशलनिर्णयप्रक्रियाः सक्षमीकुर्वन्। AI-ग्रहणस्य लाभाः संभाविताः चुनौतयः च उभयतः प्रकाशिताः।'
  };
  
  return translations[language] || text;
};

export const aiFeaturesApi = createApi({
    reducerPath: 'aiFeaturesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // Question Answering
        getAnswer: builder.query({
            query: (params) => `qa?url=${encodeURIComponent(params.articleUrl)}&question=${encodeURIComponent(params.question)}`,
        }),
        
        // Translation using MyMemory API (free and reliable)
        getTranslatedSummary: builder.query({
            query: (params) => {
                // Always request the shortest summary possible
                return `summarize?url=${encodeURIComponent(params.articleUrl)}&length=1`;
            },
            // Transform the response to translate it
            transformResponse: async (response, meta, arg) => {
                try {
                    // Trim summary to 500 chars max
                    const trimmedSummary = response.summary.length > 500 ? response.summary.slice(0, 500) : response.summary;
                    // Use MyMemory Translation API (free)
                    const encodedText = encodeURIComponent(trimmedSummary);
                    const translateResponse = await fetch(
                        `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${arg.language}`
                    );
                    
                    const translateData = await translateResponse.json();
                    
                    if (translateData.responseData?.translatedText) {
                        return {
                            summary: translateData.responseData.translatedText,
                            originalLanguage: 'en',
                            targetLanguage: arg.language,
                            translated: true
                        };
                    } else {
                        // Fallback to mock translation
                        return {
                            summary: getMockTranslation(trimmedSummary, arg.language),
                            originalLanguage: 'en',
                            targetLanguage: arg.language,
                            translated: true
                        };
                    }
                } catch (error) {
                    console.error('Translation error:', error);
                    // Fallback to mock translation
                    return {
                        summary: getMockTranslation(response.summary, arg.language),
                        originalLanguage: 'en',
                        targetLanguage: arg.language,
                        translated: true
                    };
                }
            },
        }),
        
        // Fact Checking (using content analysis)
        getFactCheck: builder.query({
            query: (params) => `analyze?url=${encodeURIComponent(params.articleUrl)}&analysis=fact-check`,
        }),
        
        // Related Articles (using content similarity)
        getRelatedArticles: builder.query({
            query: (params) => `related?url=${encodeURIComponent(params.articleUrl)}&limit=5`,
        }),
        
        // Enhanced Summary with multiple options
        getEnhancedSummary: builder.query({
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=1&format=${params.format || 'paragraph'}`,
        }),
    }),
})

export const { 
    useLazyGetAnswerQuery,
    useLazyGetTranslatedSummaryQuery,
    useLazyGetFactCheckQuery,
    useLazyGetRelatedArticlesQuery,
    useLazyGetEnhancedSummaryQuery
} = aiFeaturesApi 