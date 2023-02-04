import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isModalOpen: false,
    },
    reducers: {
        setIsModalOpen(state, action) {
            state.isModalOpen = action.payload;
        },
    },
});

export const { setIsModalOpen } = modalSlice.actions;
