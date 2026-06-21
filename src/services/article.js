import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { callGroq, fetchArticle, lengthToSentences } from './groqClient'

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getSummary: builder.query({
            queryFn: async (params) => {
                try {
                    const articleText = await fetchArticle(params.articleUrl);
                    const sentences = lengthToSentences(params.length || 3);
                    const prompt = `Summarize the following article in ${sentences}. Return only the summary text, no labels or preamble.\n\n${articleText.slice(0, 10000)}`;
                    const summary = await callGroq(prompt);
                    return { data: { summary } };
                } catch (e) {
                    return { error: { data: { error: e.message } } };
                }
            },
        }),
        getArticleContent: builder.query({
            queryFn: async (params) => {
                try {
                    const article = await fetchArticle(params.articleUrl);
                    return { data: { article } };
                } catch (e) {
                    return { error: { data: { error: e.message } } };
                }
            },
        }),
    }),
})

export const { useLazyGetSummaryQuery, useLazyGetArticleContentQuery } = articleApi
