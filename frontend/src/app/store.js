import { configureStore } from "@reduxjs/toolkit";

import { backendApi } from "../services/backend";
import sessionReducer from "./slices/session";

export const store = configureStore({
    reducer: {
        [backendApi.reducerPath]: backendApi.reducer,
        session: sessionReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendApi.middleware),
});
