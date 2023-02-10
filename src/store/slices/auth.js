import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        expireTime: 0,
    },
    reducers: {
        login(state, action) {
            state.currentUser = action.payload.authUser;
            const currentTime = Date.now();
            const timeout = 1000 * 60 * 60 * 24 * 7;
            state.expireTime =
                action.payload.expireTime || currentTime + timeout;
            localStorage.setItem("currentUser", JSON.stringify(action.payload.authUser));
            localStorage.setItem(
                "expireTime",
                JSON.stringify(state.expireTime)
            );
        },
        logout(state, action) {
            state.currentUser = null;
            localStorage.removeItem("currentUser");
            localStorage.removeItem("expireTime");
        },
    },
});

export const { login, logout } = authSlice.actions;
