import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./slices/modal";
import { postSlice } from "./slices/post";

const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        post: postSlice.reducer,
    },
});

export default store;
