import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const textSummaryApi = createApi({
    reducerPath: 'textSummaryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',
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
