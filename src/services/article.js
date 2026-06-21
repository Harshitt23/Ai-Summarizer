import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=${params.length || 3}`,
        }),
        getArticleContent: builder.query({
            query: (params) => `extract?url=${encodeURIComponent(params.articleUrl)}`,
        }),
    }),
})

export const { useLazyGetSummaryQuery, useLazyGetArticleContentQuery } = articleApi
