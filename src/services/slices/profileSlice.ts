import { createSlice } from "@reduxjs/toolkit";
import { ProfileState } from "./types";
import { getProfileAsync } from "../thunk/profile";

const initialState: Partial<ProfileState> = {};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfileAsync.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getProfileAsync.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isLoading = false;
            state.isError = false;
        });
        builder.addCase(getProfileAsync.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export const { } = profileSlice.actions;

export default profileSlice.reducer;        