import { configureStore } from "@reduxjs/toolkit";

import { articleApi } from "./article";
import { aiFeaturesApi } from "./aiFeatures";
import { textSummaryApi } from "./textSummary";

export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer,
        [aiFeaturesApi.reducerPath]: aiFeaturesApi.reducer,
        [textSummaryApi.reducerPath]: textSummaryApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware, aiFeaturesApi.middleware, textSummaryApi.middleware)
})
