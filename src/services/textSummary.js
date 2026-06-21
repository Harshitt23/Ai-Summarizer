import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { callGroq, lengthToSentences } from './groqClient'

export const textSummaryApi = createApi({
    reducerPath: 'textSummaryApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getTextSummary: builder.mutation({
            queryFn: async (params) => {
                try {
                    const sentences = lengthToSentences(params.length || 3);
                    const prompt = `Summarize the following text in ${sentences}. Return only the summary text, no labels or preamble.\n\n${params.text.slice(0, 10000)}`;
                    const summary = await callGroq(prompt);
                    return { data: { summary } };
                } catch (e) {
                    return { error: { data: { error: e.message } } };
                }
            },
        }),
    }),
})

export const { useGetTextSummaryMutation } = textSummaryApi
