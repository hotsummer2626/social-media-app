import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "post",
    initialState: {
        postId: "",
    },
    reducers: {
        setPostId(state, action) {
            state.postId = action.payload;
        },
    },
});

export const { setPostId } = postSlice.actions;
