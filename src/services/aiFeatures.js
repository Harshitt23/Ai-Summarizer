import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { callGroq, fetchArticle } from './groqClient'

export const aiFeaturesApi = createApi({
    reducerPath: 'aiFeaturesApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getAnswer: builder.query({
            queryFn: async (params) => {
                try {
                    const articleText = await fetchArticle(params.articleUrl);
                    const prompt = `Using only the article below, answer this question concisely: "${params.question}"\n\nArticle:\n${articleText.slice(0, 8000)}`;
                    const answer = await callGroq(prompt);
                    return { data: { answer } };
                } catch (e) {
                    return { error: { data: { error: e.message } } };
                }
            },
        }),

        getTranslatedSummary: builder.query({
            queryFn: async (params) => {
                try {
                    const articleText = await fetchArticle(params.articleUrl);
                    const prompt = `Summarize the following article in 2-3 sentences. Return only the summary text.\n\n${articleText.slice(0, 6000)}`;
                    const summary = await callGroq(prompt);

                    const trimmed = summary.length > 500 ? summary.slice(0, 500) : summary;
                    const translateRes = await fetch(
                        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=en|${params.language}`
                    );
                    const translateData = await translateRes.json();
                    if (translateData.responseData?.translatedText) {
                        return {
                            data: {
                                summary: translateData.responseData.translatedText,
                                originalLanguage: 'en',
                                targetLanguage: params.language,
                                translated: true,
                            },
                        };
                    }
                    return { data: { summary: trimmed, translated: false } };
                } catch (e) {
                    return { error: { data: { error: e.message } } };
                }
            },
        }),

        getFactCheck: builder.query({
            queryFn: async (params) => {
                try {
                    const articleText = await fetchArticle(params.articleUrl);
                    const prompt = `Extract 3 key factual claims from this article and assess each one. Return ONLY valid JSON with no markdown fences, in exactly this format:
{"claims":[{"text":"claim text","verdict":"verified","confidence":85}]}
Verdict must be one of: "verified", "unverified", "false". Confidence is 0-100.

Article:
${articleText.slice(0, 6000)}`;
                    const raw = await callGroq(prompt);
                    const jsonMatch = raw.match(/\{[\s\S]*\}/);
                    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : { claims: [] };
                    return { data: { analysis: result } };
                } catch (e) {
                    return { error: { data: { error: e.message } } };
                }
            },
        }),

        getRelatedArticles: builder.query({
            queryFn: async (params) => {
                try {
                    const articleText = await fetchArticle(params.articleUrl);
                    const prompt = `Based on this article, suggest 3 related topics the reader might want to explore. Return ONLY valid JSON with no markdown fences, in exactly this format:
{"related":[{"title":"Topic Title","description":"One sentence about this topic.","similarity":82}]}
Similarity is 0-100.

Article:
${articleText.slice(0, 4000)}`;
                    const raw = await callGroq(prompt);
                    const jsonMatch = raw.match(/\{[\s\S]*\}/);
                    const result = jsonMatch ? JSON.parse(jsonMatch[0]) : { related: [] };
                    return { data: result };
                } catch (e) {
                    return { error: { data: { error: e.message } } };
                }
            },
        }),
    }),
})

export const {
    useLazyGetAnswerQuery,
    useLazyGetTranslatedSummaryQuery,
    useLazyGetFactCheckQuery,
    useLazyGetRelatedArticlesQuery,
} = aiFeaturesApi
