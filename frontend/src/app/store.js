import { configureStore } from "@reduxjs/toolkit";

import { backendApi } from "../services/backend";

export const store = configureStore({
    reducer: {
        [backendApi.reducerPath]: backendApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendApi.middleware),
});
