import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

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
        
        // Translation
        getTranslatedSummary: builder.query({
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3&language=${params.language}`,
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
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=${params.length || 3}&format=${params.format || 'paragraph'}`,
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