import { createSlice } from "@reduxjs/toolkit";
import { ResetPasswordState } from "./types";
import { fetchResetCodeAsync, resetPasswordAsync } from "../thunk/resetPassword";

const initialState: Partial<ResetPasswordState> = {
    isResetPasswordLoading: false,
    isSuccessRequestResetPassword: false,
    isResetPasswordError: false,
    isResetCodeLoading: false,
    isSuccessRequestResetCode: false,
    isResetCodeError: false,
};

const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(resetPasswordAsync.fulfilled, (state, action) => {
            state.isResetPasswordLoading = false;
            state.isSuccessRequestResetPassword = true;
            state.isResetPasswordError = false;

            state.resetPasswordMessage = action.payload.message;
        });
        builder.addCase(resetPasswordAsync.pending, (state) => {
            state.isResetPasswordLoading = true;

        });
        builder.addCase(resetPasswordAsync.rejected, (state) => {
            state.isSuccessRequestResetPassword = false;
            state.isResetPasswordLoading = false;
            state.isResetPasswordError = true;
        });

        builder.addCase(fetchResetCodeAsync.fulfilled, (state, action) => {
            state.isResetCodeLoading = false;
            state.isSuccessRequestResetCode = true;
            state.isResetCodeError = false;

            state.resetCodeMessage = action.payload.message;
        });
        builder.addCase(fetchResetCodeAsync.pending, (state) => {
            state.isResetCodeLoading = true;
        });
        builder.addCase(fetchResetCodeAsync.rejected, (state) => {
            state.isSuccessRequestResetCode = false;
            state.isResetCodeLoading = false;
            state.isResetCodeError = true;
        });
    },
});

export const { } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;