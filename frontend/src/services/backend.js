import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backendApi = createApi({
    reducerPath: "backend",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api" }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (payload) => ({
                url: "/user/login",
                method: "POST",
                body: payload,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                credentials: "include",
            }),
        }),
        logout: builder.query({
            query: () => ({
                url: "user/logout",
                method: "GET",
                credentials: "include",
            }),
        }),
        register: builder.mutation({
            query: (payload) => ({
                url: "/user/register",
                method: "POST",
                body: payload,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                credentials: "include",
            }),
        }),
        verify: builder.query({
            query: ({ token, email }) => ({
                url: "/user/verify/" + token + "/" + email + "/",
                method: "GET",
            }),
        }),
        getRefreshToken: builder.query({
            query: () => ({
                url: "user/get-refresh-token",
                method: "GET",
                credentials: "include",
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useVerifyQuery, useGetRefreshTokenQuery, useLazyLogoutQuery } = backendApi;
