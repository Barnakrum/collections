import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backendApi = createApi({
    reducerPath: "backend",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL }),
    endpoints: (builder) => ({
        //AUTH
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
        //COLLECTIONS
        postCollection: builder.mutation({
            query: (payload) => ({
                url: "/collection/",
                method: "POST",
                body: payload,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                credentials: "include",
            }),
        }),
        postCollectionImage: builder.mutation({
            query: ({ id, payload }) => {
                return {
                    url: "/collection/" + id + "/image",
                    method: "POST",
                    body: payload,
                    credentials: "include",
                    formData: true,
                };
            },
        }),
        deleteCollectionImage: builder.mutation({
            query: (id) => ({
                url: "/collection/" + id + "/image",
                method: "DELETE",
                credentials: "include",
            }),
        }),
        getCollection: builder.query({
            query: (id) => ({
                url: "/collection/" + id,
                method: "GET",
            }),
        }),
        getAllColections: builder.query({
            query: (arg) => {
                const { user } = arg;

                return {
                    url: "/collection",
                    params: { user },
                };
            },
        }),
        //ITEM
        postItem: builder.mutation({
            query: ({ id, payload }) => ({
                url: "/item/" + id,
                method: "POST",
                body: payload,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                credentials: "include",
            }),
        }),
        getItem: builder.query({
            query: (id) => ({
                url: "/item/" + id,
                method: "GET",
            }),
        }),

        //USER
        getUser: builder.query({
            query: (id) => ({
                url: "/user/" + id,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useVerifyQuery,
    useGetRefreshTokenQuery,
    useLazyLogoutQuery,
    usePostCollectionMutation,
    useGetCollectionQuery,
    usePostCollectionImageMutation,
    useDeleteCollectionImageMutation,
    useGetUserQuery,
    useLazyGetUserQuery,
    useGetAllColectionsQuery,
    usePostItemMutation,
    useGetItemQuery,
} = backendApi;
