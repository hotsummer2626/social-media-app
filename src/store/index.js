import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./slices/modal";
import { postSlice } from "./slices/post";
import { authSlice } from "./slices/auth";

const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        post: postSlice.reducer,
        auth: authSlice.reducer,
    },
});

export default store;
