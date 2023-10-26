import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: undefined,
    username: "",
    id: "",
    isAdmin: false,
};

export const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.isLoggedIn = true;
            state.isAdmin = action.payload.isAdmin;
        },
        logout: (state) => {
            state.id = "";
            state.username = "";
            state.isLoggedIn = false;
            state.isAdmin = false;
        },
    },
});

export const { login, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
