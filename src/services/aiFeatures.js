import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const aiFeaturesApi = createApi({
    reducerPath: 'aiFeaturesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',
    }),
    endpoints: (builder) => ({
        // Question Answering — POST with url + question
        getAnswer: builder.query({
            query: (params) => ({
                url: 'qa',
                method: 'POST',
                body: { url: params.articleUrl, question: params.question },
            }),
        }),

        // Translation — fetch a short summary from our backend, then translate via MyMemory
        getTranslatedSummary: builder.query({
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=1`,
            transformResponse: async (response, meta, arg) => {
                try {
                    const trimmedSummary = response.summary.length > 500
                        ? response.summary.slice(0, 500)
                        : response.summary;
                    const translateResponse = await fetch(
                        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmedSummary)}&langpair=en|${arg.language}`
                    );
                    const translateData = await translateResponse.json();
                    if (translateData.responseData?.translatedText) {
                        return {
                            summary: translateData.responseData.translatedText,
                            originalLanguage: 'en',
                            targetLanguage: arg.language,
                            translated: true
                        };
                    }
                    return { summary: trimmedSummary, translated: false };
                } catch {
                    return { summary: response.summary, translated: false };
                }
            },
        }),

        // Fact Check — GET with url
        getFactCheck: builder.query({
            query: (params) => `fact-check?url=${encodeURIComponent(params.articleUrl)}`,
        }),

        // Related Topics — GET with url
        getRelatedArticles: builder.query({
            query: (params) => `related?url=${encodeURIComponent(params.articleUrl)}`,
        }),
    }),
})

export const {
    useLazyGetAnswerQuery,
    useLazyGetTranslatedSummaryQuery,
    useLazyGetFactCheckQuery,
    useLazyGetRelatedArticlesQuery
} = aiFeaturesApi
