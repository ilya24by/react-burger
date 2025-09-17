import { createSlice } from "@reduxjs/toolkit";
import { ProfileState } from "./types";
import { getProfileAsync, updateProfileAsync } from "../thunk/profile";

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
        builder.addCase(updateProfileAsync.pending, (state) => {
            state.isUpdateProfileLoading = true;
        });
        builder.addCase(updateProfileAsync.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.isUpdateProfileLoading = false;
            state.isUpdateProfileError = false;
            state.isUpdateProfileSuccess = true;
        });
        builder.addCase(updateProfileAsync.rejected, (state) => {
            state.isUpdateProfileLoading = false;
            state.isUpdateProfileError = true;
            state.isUpdateProfileSuccess = false;
        });
    },
});

export const { } = profileSlice.actions;

export default profileSlice.reducer;        