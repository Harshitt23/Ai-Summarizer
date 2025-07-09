import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const textSummaryApi = createApi({
    reducerPath: 'textSummaryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTextSummary: builder.mutation({
            query: (params) => ({
                url: 'summarize',
                method: 'POST',
                body: {
                    text: params.text,
                    length: params.length || 3
                },
            }),
        }),
    }),
})

export const { useGetTextSummaryMutation } = textSummaryApi 