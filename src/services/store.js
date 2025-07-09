import { configureStore } from "@reduxjs/toolkit";

import { articleApi } from "./article";
import { aiFeaturesApi } from "./aiFeatures";

export const store = configureStore({
    reducer: {
        [articleApi.reducerPath]: articleApi.reducer,
        [aiFeaturesApi.reducerPath]: aiFeaturesApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware, aiFeaturesApi.middleware)
})
