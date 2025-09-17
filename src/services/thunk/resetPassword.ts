import { FetchResetCodeResponse, ResetPasswordResponse } from "../../api/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPassword } from "../../api/auth-api";
import { fetchResetCode } from "../../api/auth-api";

export const resetPasswordAsync = createAsyncThunk<ResetPasswordResponse, { email: string }>(
    'auth/resetPassword',
    async ({ email }) => {
        const response = await resetPassword(email);
        return response;
    }
);

export const fetchResetCodeAsync = createAsyncThunk<FetchResetCodeResponse, { password: string, token: string }>(
    'auth/fetchResetCode',
    async ({ password, token }) => {
        const response = await fetchResetCode(password, token);
        return response;
    }
);